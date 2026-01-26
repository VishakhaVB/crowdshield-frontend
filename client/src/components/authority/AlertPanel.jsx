import React from 'react';
import { AlertTriangle, CheckCircle, Bell, Route, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const riskColors = {
    MODERATE: 'border-amber-200 bg-amber-50',
    HIGH: 'border-orange-200 bg-orange-50',
    CRITICAL: 'border-red-200 bg-red-50'
};

const riskIconColors = {
    MODERATE: 'text-amber-600 bg-amber-100',
    HIGH: 'text-orange-600 bg-orange-100',
    CRITICAL: 'text-red-600 bg-red-100'
};

export default function AlertPanel({ alerts, onAcknowledge, onTriggerManual, onActivateRoute }) {
    const activeAlerts = alerts?.filter(a => !a.acknowledged) || [];
    const acknowledgedAlerts = alerts?.filter(a => a.acknowledged) || [];

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-slate-900">Alert & Control Panel</h2>
                    {activeAlerts.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            {activeAlerts.length} active
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={onTriggerManual}
                    >
                        <Bell className="w-4 h-4" />
                        Manual Alert
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={onActivateRoute}
                    >
                        <Route className="w-4 h-4" />
                        Alt. Route
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {activeAlerts.length === 0 && acknowledgedAlerts.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-medium">All Clear</p>
                        <p className="text-sm mt-1">No active alerts at this time</p>
                    </div>
                )}

                {/* Active Alerts */}
                {activeAlerts.map((alert, index) => (
                    <div
                        key={index}
                        className={`rounded-lg border p-4 ${riskColors[alert.risk]}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${riskIconColors[alert.risk]}`}>
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-slate-900">{alert.zone}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${riskIconColors[alert.risk]}`}>
                                        {alert.risk}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-700 mb-2">{alert.suggestedAction}</p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-xs text-slate-500">
                                        <Clock className="w-3 h-3" />
                                        {alert.time}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 text-xs gap-1"
                                        onClick={() => onAcknowledge?.(alert.id)}
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Acknowledge
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Acknowledged Alerts */}
                {acknowledgedAlerts.length > 0 && (
                    <>
                        <div className="pt-2 pb-1">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                Acknowledged
                            </span>
                        </div>
                        {acknowledgedAlerts.map((alert, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm text-slate-600">{alert.zone}</span>
                                        <span className="text-xs text-slate-400">• {alert.risk}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">{alert.time}</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
