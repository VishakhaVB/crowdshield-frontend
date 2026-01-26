import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import config from '@/config';
import { Shield, Clock, MapPin, Navigation, AlertTriangle, CheckCircle, Info, ArrowRight, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PilgrimMap from '@/components/pilgrim/PilgrimMap';

// Pilgrim-Friendly Zone Mapping
// Maps Backend IDs (Z01...) to Visual Map Spots
const zoneMapping = {
    'Z01': 'Main Ghat',       // Ramkund
    'Z02': 'Temple Area',     // Kalaram
    'Z03': 'Temple Area',     // Sita Gufa (Merged)
    'Z04': 'North Entry',     // Kapaleshwar
    'Z05': 'East Corridor',   // Sadhugram
    'Z06': 'West Corridor',   // Panchavati
    'Z07': 'East Corridor',   // Goda Park
    'Z08': 'South Entry',     // Dwarka
    'Z09': 'Parking Area',    // CBS
    'Z10': 'South Entry'      // Nashik Road
};

export default function PilgrimGuidance() {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [connectionError, setConnectionError] = useState(false);
    const [systemStatus, setSystemStatus] = useState('NORMAL'); // NEW: For global alerts
    const [zones, setZones] = useState([]);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    // Data Loading Logic
    const loadData = async () => {
        try {
            // Priority 1: Fetch Live Crowd Data
            const res = await fetch(`${config.API_BASE_URL}/zones/live`);
            const data = await res.json();

            if (data.success) {
                // Priority 2: Fetch System Status (for Evacuation/Emergency checks)
                try {
                    const summaryRes = await fetch(`${config.API_BASE_URL}/dashboard/summary`);
                    const summaryData = await summaryRes.json();
                    if (summaryData.success) {
                        setSystemStatus(summaryData.data.systemStatus || 'NORMAL');
                    }
                } catch (e) {
                    console.warn("System status fetch skipped, defaulting to NORMAL");
                }

                // Transform Backend Data to Frontend Model
                const rawZones = data.data;
                const visualZones = rawZones.map(z => ({
                    name: z.zoneName || zoneMapping[z.zoneId] || z.zoneId,
                    risk: z.riskLevel || 'SAFE',
                    density: z.density || 0,
                    center: z.center, // Passed from backend (via zonesGeo.js)
                    radius: z.radiusInMeters
                }));

                // FAIL-SAFE: Cache valid data
                localStorage.setItem('pilgrim_safe_data', JSON.stringify(visualZones));
                localStorage.setItem('pilgrim_last_updated', new Date().toISOString());

                setZones(visualZones);
                setLastUpdated(new Date());
                setConnectionError(false);
            }
        } catch (err) {
            console.error("Pilgrim data fetch failed", err);
            setConnectionError(true);

            // DATA FREEZING: In case of error, show last known good state
            const savedData = localStorage.getItem('pilgrim_safe_data');
            const savedTime = localStorage.getItem('pilgrim_last_updated');

            if (savedData) {
                console.log("Restoring frozen data from cache");
                setZones(JSON.parse(savedData));
                if (savedTime) setLastUpdated(new Date(savedTime));
            }
        } finally {
            setLoading(false);
        }
    };

    // (Data loading logic unified above)

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleLogoClick = () => {
        navigate(createPageUrl('Home'));
    };

    const handleEmergencyCall = (number) => {
        if (window.confirm(t('pilgrim.emergency.confirm', { number }))) {
            window.location.href = `tel:${number}`;
        }
    };

    // Logic for guidance display
    const safeZones = zones.filter(z => z.risk === 'SAFE');
    const crowdedZones = zones.filter(z => z.risk === 'BUSY' || z.risk === 'AVOID');

    // Determine overall primary status
    const isCritical = crowdedZones.length > 2;
    const primaryStatus = isCritical ? t('pilgrim.status.busy.title') : t('pilgrim.status.safe.title');
    const primaryMessage = isCritical
        ? t('pilgrim.status.busy.message')
        : t('pilgrim.status.safe.message');

    // EMERGENCY OVERRIDE
    const isEvacuation = systemStatus === 'CRITICAL' || systemStatus === 'EVENT PEAK'; // 'EVENT PEAK' usually means Shahi Snan
    const displayStatus = isEvacuation ? t('pilgrim.status.critical.title') : primaryStatus;
    const displayMessage = isEvacuation ? t('pilgrim.status.critical.message') : primaryMessage;
    const StatusIcon = isEvacuation ? AlertTriangle : (isCritical ? Info : CheckCircle);
    const statusColor = isEvacuation ? 'bg-red-50 text-red-700 border-red-200' : (isCritical ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600');

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans relative pb-32">
            {/* 1. Header (System Identity) */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    {/* Left: Brand */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
                        <div className="w-9 h-9 bg-[#003366] rounded-lg flex items-center justify-center shadow-sm">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#003366] font-bold text-lg leading-tight tracking-tight">{t('pilgrim.header.title')}</h1>
                            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{t('pilgrim.header.subtitle')}</span>
                        </div>
                    </div>

                    {/* Right: Language Toggle */}
                    <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200">
                        {[
                            { code: 'hi', label: 'Hindi' },
                            { code: 'mr', label: 'Marathi' },
                            { code: 'en', label: 'English' }
                        ].map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${i18n.language === lang.code ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {lang.label === 'English' ? 'ENG' : lang.label.substr(0, 2).toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* ERROR BANNER */}
            {connectionError && (
                <div className="bg-red-600 text-white text-xs font-bold text-center py-2 animate-pulse">
                    {t('pilgrim.connectionError')}
                </div>
            )}

            {/* TRUST BANNER */}
            <div className="bg-[#003366] text-white text-xs text-center py-2 px-4 shadow-sm">
                <span className="opacity-90 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    {t('pilgrim.trust.banner')}
                </span>
            </div>

            {/* 2. Main Content Grid */}
            <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 space-y-6">
                <div className="grid lg:grid-cols-12 gap-6">

                    {/* Left Column: Visual Context (65%) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px] lg:h-[680px]">
                            {/* Card Header */}
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                                <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                    <MapPin className="w-5 h-5 text-[#003366]" /> {t('pilgrim.map.title')}
                                </h2>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <Clock className="w-3.5 h-3.5" />
                                    {t('pilgrim.map.updated')}: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            {/* Map Container */}
                            <div className="flex-1 relative bg-slate-50">
                                <PilgrimMap zones={zones} />
                            </div>

                            {/* Legend Footer */}
                            <div className="px-5 py-4 bg-white border-t border-slate-100 flex flex-wrap gap-4 text-sm">
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-semibold border border-green-100 text-xs"><span className="w-2 h-2 rounded-full bg-green-500"></span>{t('pilgrim.map.legend.safe')}</span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 font-semibold border border-yellow-100 text-xs"><span className="w-2 h-2 rounded-full bg-yellow-400"></span>{t('pilgrim.map.legend.moderate')}</span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 font-semibold border border-orange-100 text-xs"><span className="w-2 h-2 rounded-full bg-orange-500"></span>{t('pilgrim.map.legend.busy')}</span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 font-semibold border border-red-100 text-xs"><span className="w-2 h-2 rounded-full bg-red-500"></span>{t('pilgrim.map.legend.avoid')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actionable Guidance (35%) */}
                    <div className="lg:col-span-4 flex flex-col gap-5">

                        {/* A. Primary Situation Card */}
                        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 border-l-4 ${isEvacuation ? 'border-l-red-600' : (isCritical ? 'border-l-orange-500' : 'border-l-green-500')}`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-full flex-shrink-0 ${statusColor}`}>
                                    <StatusIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{displayStatus}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{displayMessage}</p>
                                </div>
                            </div>
                        </div>

                        {/* B. Safe Movement Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
                            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Navigation className="w-4 h-4 text-[#003366]" /> {t('pilgrim.guidance.suggested')}
                                </h3>
                            </div>
                            <div className="p-3 space-y-2 overflow-y-auto max-h-[300px]">
                                {safeZones.length > 0 ? safeZones.map((zone, i) => (
                                    <div key={i} className="p-3 bg-white rounded-lg flex items-center justify-between border border-slate-100 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shadow-inner">
                                                {zone.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{zone.name}</p>
                                                <p className="text-[10px] uppercase font-bold text-green-600 tracking-wide">{t('pilgrim.guidance.flowSmooth')}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">
                                            {Math.max(2, Math.ceil((zone.density || 0.5) * 2))} {t('pilgrim.guidance.wait')}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-4 text-center text-slate-500 italic text-sm">Please wait for official announcements.</div>
                                )}
                            </div>
                        </div>

                        {/* C. Areas to Avoid */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="px-5 py-3 border-b border-slate-200/60">
                                <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <Info className="w-4 h-4 text-slate-400" /> {t('pilgrim.guidance.avoid')}
                                </h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {crowdedZones.length > 0 ? crowdedZones.map((zone, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            <span className="font-medium text-slate-700">{zone.name}</span>
                                        </div>
                                        <span className="text-[10px] text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase">
                                            Wait &gt; {Math.max(15, Math.ceil((zone.density || 3) * 5))} {t('pilgrim.guidance.wait')}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-500 text-center py-2">Crowd flow is balanced.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* 3. Footer Section (Emergency & Trust) */}
            <div className="fixed bottom-6 w-full px-4 md:px-6 z-40 pointer-events-none">
                <div className="max-w-[700px] mx-auto pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md border border-red-100 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 pr-3 pl-6 flex items-center justify-between transition-transform hover:scale-[1.01]">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-50 p-1.5 rounded-full">
                                <Phone className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-1 text-sm">
                                <span className="font-semibold text-slate-800">{t('pilgrim.emergency.title')}</span>
                                <span className="hidden md:inline text-slate-400">•</span>
                                <span className="text-slate-500">{t('pilgrim.emergency.subtitle')}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEmergencyCall('108')} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                                {t('pilgrim.emergency.call')} 108
                            </button>
                            <button onClick={() => handleEmergencyCall('100')} className="bg-red-600 hover:bg-red-700 text-white border border-red-600 px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-red-600/20 transition-all">
                                {t('pilgrim.emergency.call')} 100
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
