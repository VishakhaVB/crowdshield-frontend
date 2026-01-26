import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import config from '@/config';
import { getDashboardSummary } from '@/services/api';
import { Shield, LogOut, RefreshCw, Clock, Eye, Camera, AlertTriangle, Bell, Route, Check, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafetyOverview from '@/components/authority/SafetyOverview';
import ZoneMapNew from '@/components/authority/ZoneMapNew';
import ZoneTable from '@/components/authority/ZoneTable';
import FieldOfficersNew from '@/components/authority/FieldOfficersNew';
import CameraStatusNew from '@/components/authority/CameraStatusNew';
import AlertPanelNew from '@/components/authority/AlertPanelNew';
import AlertsTab from '@/components/authority/AlertsTab';

export default function AuthorityDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Initial State
    const [overviewData, setOverviewData] = useState({
        totalCrowd: 0,
        avgDensity: 0,
        netFlow: 0,
        activeAlerts: 0,
        lastUpdated: '-'
    });

    const [zones, setZones] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [cameras, setCameras] = useState([]); // Dynamic

    // Static officers
    const [officers] = useState([
        { id: 1, name: 'Insp. Rajesh Kumar', phone: '+91 98765 43210', zone: 'Zone A' },
        { id: 2, name: 'SI Priya Sharma', phone: '+91 98765 43211', zone: 'Zone B' },
        { id: 3, name: 'Const. Amit Singh', phone: '+91 98765 43212', zone: 'Zone C-D' },
        { id: 4, name: 'SI Neha Patel', phone: '+91 98765 43213', zone: 'Zone E-F' },
        { id: 5, name: 'Insp. Vikram Rao', phone: '+91 98765 43214', zone: 'Perimeter' }
    ]);

    const [selectedZone, setSelectedZone] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // API URL
    const API_URL = config.API_BASE_URL;

    // --- MAIN DATA FETCHING LOGIC ---
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (isMounted) setIsRefreshing(true);
            try {
                // 1. Fetch Summary
                const summaryData = await getDashboardSummary();
                if (isMounted && summaryData && summaryData.success) {
                    setOverviewData({
                        ...summaryData.data,
                        lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    });
                }

                // 2. Fetch Zones
                const zoneRes = await fetch(`${API_URL}/zones/live`);
                const zoneData = await zoneRes.json();
                if (isMounted && zoneData.success) {
                    const mappedZones = zoneData.data.map(z => ({
                        id: z.zoneId,
                        name: z.zoneName,
                        layer: z.layer === 'L1' ? 1 : z.layer === 'L2' ? 2 : 3,
                        peopleCount: z.currentPeople,
                        density: z.density,
                        entryRate: z.entryRatePerMin,
                        exitRate: z.exitRatePerMin,
                        risk: z.riskLevel,
                        center: z.center,
                        radius: z.radiusInMeters
                    }));
                    setZones(mappedZones);
                }

                // 3. Fetch Alerts
                const alertsRes = await fetch(`${API_URL}/alerts/active`);
                const alertsData = await alertsRes.json();
                if (isMounted && alertsData.success) {
                    const mappedAlerts = alertsData.data.map(a => ({
                        id: a.id,
                        zone: a.zoneName,
                        risk: a.severity,
                        time: a.timestamp,
                        message: a.cause,
                        suggestedAction: a.suggestedAction,
                        acknowledged: a.acknowledged
                    }));
                    setAlerts(mappedAlerts);
                }

                // 4. Fetch Cameras
                const camRes = await fetch(`${API_URL}/cameras`);
                const camData = await camRes.json();
                if (isMounted && camData.success) {
                    const mappedCameras = camData.data.map(c => ({
                        id: c.id,
                        zone: c.zoneName,
                        layer: c.layer === 'L1' ? 1 : c.layer === 'L2' ? 2 : 3, // Safe fallback
                        status: c.status,
                        lastUpdated: c.lastUpdated,
                        lastCount: Math.floor(Math.random() * 2000)
                    }));
                    setCameras(mappedCameras);
                }

            } catch (error) {
                console.error("❌ Data Fetch Failed:", error);
            } finally {
                if (isMounted) setIsRefreshing(false);
            }
        };

        // Initial Load
        loadData();

        // Polling (every 5s)
        const interval = setInterval(loadData, 5000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);


    const handleRefresh = () => {
        window.location.reload();
    };

    // --- ACTIONS ---
    const handleAcknowledgeAlert = async (alertId) => {
        // Optimistic
        setAlerts(alerts.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
        try {
            await fetch(`${API_URL}/alerts/acknowledge`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alertId })
            });
        } catch (e) { console.error(e); }
    };

    const handleTriggerManualAlert = async () => {
        try {
            await fetch(`${API_URL}/control/alert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zoneId: 'Z01', message: 'Manual Control Room Alert' })
            });
        } catch (e) { console.error(e); }
    };

    const handleActivateAltRoute = async () => {
        try {
            await fetch(`${API_URL}/control/alt-route`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zoneId: 'Z01' })
            });
            alert('Alt Routes Activated');
        } catch (e) { console.error(e); }
    };

    const handleAddCamera = (camera) => setCameras([...cameras, camera]);
    const handleDeleteCamera = (id) => setCameras(cameras.filter(c => c.id !== id));

    const handleToggleCamera = async (id) => {
        setCameras(cameras.map(c => c.id === id ? { ...c, status: c.status === 'Online' ? 'Offline' : 'Online' } : c));
        try {
            await fetch(`${API_URL}/control/camera`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cameraId: id })
            });
        } catch (e) { console.error(e); }
    };

    const handleEvacuation = async () => {
        if (!window.confirm("CRITICAL: TRIGGER EVACUATION?")) return;
        try {
            await fetch(`${API_URL}/simulation/trigger`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'EVACUATION' })
            });
            alert('EVACUATION INITIATED');
        } catch (e) { console.error(e); }
    };

    return (
        <div className="min-h-screen bg-white font-sans relative">
            <DashboardHeader />

            {/* Connection Error Alert */}
            {(!overviewData.lastUpdated || overviewData.lastUpdated === '-') && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                <strong>Backend Disconnected:</strong> Cannot reach the server at <code className="bg-red-100 px-1 py-0.5 rounded">{API_URL}</code>.
                                Please ensure the backend is running on port 5000.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-[1920px] mx-auto px-6 py-8 space-y-6">
                <section>
                    <SafetyOverview data={overviewData} loading={isRefreshing} />
                </section>

                <section className="flex flex-col min-h-[600px]">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                        <div className="px-0 py-4 bg-white border-b border-[var(--dashboard-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <TabsList className="bg-white border border-[var(--dashboard-border)] p-1 rounded-lg shadow-sm">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" /> Map & Zones
                                </TabsTrigger>
                                <TabsTrigger value="cameras" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 text-sm">
                                    <Camera className="w-4 h-4 mr-2" /> Cameras
                                </TabsTrigger>
                                <TabsTrigger value="alerts" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 text-sm">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Alerts
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-4">
                                <div className="text-xs text-gray-500 font-medium">Last Updated: {overviewData.lastUpdated}</div>
                                <Button variant="outline" size="sm" onClick={handleRefresh}>
                                    <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 bg-white pt-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <div className="grid lg:grid-cols-12 gap-6 h-full">
                                        <div className="lg:col-span-8 h-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
                                            <ZoneMapNew zones={zones} selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
                                        </div>
                                        <div className="lg:col-span-4 h-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <AlertPanelNew alerts={alerts} onAcknowledge={handleAcknowledgeAlert} onTriggerManual={handleTriggerManualAlert} onActivateRoute={handleActivateAltRoute} onEvacuation={handleEvacuation} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                            <h3 className="font-bold mb-4">Zone Performance</h3>
                                            <ZoneTable zones={zones} />
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                            <h3 className="font-bold mb-4">Field Officers</h3>
                                            <FieldOfficersNew officers={officers} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'cameras' && (
                                <CameraStatusNew cameras={cameras} zones={zones} onAddCamera={handleAddCamera} onToggleCamera={handleToggleCamera} onDeleteCamera={handleDeleteCamera} />
                            )}
                            {activeTab === 'alerts' && (
                                <AlertsTab alerts={alerts} onAcknowledge={handleAcknowledgeAlert} onTriggerManual={handleTriggerManualAlert} onActivateRoute={handleActivateAltRoute} />
                            )}
                        </div>
                    </Tabs>
                </section>
            </main>
        </div>
    );
}
