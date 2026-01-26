import React from 'react';
import { AlertTriangle, Bell, Route, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const riskStyles = {
    CRITICAL: {
        badge: 'bg-red-100 text-red-700',
        icon: 'text-red-500',
        dot: 'bg-red-500'
    },
    HIGH: {
        badge: 'bg-orange-100 text-orange-700',
        icon: 'text-orange-500',
        dot: 'bg-orange-500'
    },
    MODERATE: {
        badge: 'bg-amber-100 text-amber-700',
        icon: 'text-amber-500',
        dot: 'bg-amber-500'
    }
};

export default function AlertPanelNew({ alerts, onAcknowledge, onTriggerManual, onActivateRoute, onEvacuation }) {
    const activeAlerts = alerts?.filter(a => !a.acknowledged) || [];

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-slate-700" />
                        <div>
                            <h2 className="font-semibold text-slate-900">Alert & Control Panel</h2>
                            <p className="text-sm text-slate-500">{activeAlerts.length} active alerts</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        onClick={onActivateRoute}
                    >
                        <Route className="w-3.5 h-3.5" />
                        Alt Route
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs gap-1.5 bg-red-500 hover:bg-red-600 text-white"
                        onClick={onTriggerManual}
                    >
                        <Bell className="w-3.5 h-3.5" />
                        Manual Alert
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs gap-1.5 bg-slate-900 text-white hover:bg-slate-800"
                        onClick={onEvacuation}
                    >
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
                        EVAC DRILL
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
                {activeAlerts.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <Check className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                        <p className="font-medium">All Clear</p>
                        <p className="text-sm">No active alerts</p>
                    </div>
                ) : (
                    activeAlerts.map((alert, index) => {
                        const styles = riskStyles[alert.risk] || riskStyles.MODERATE;
                        return (
                            <div key={index} className="border border-slate-200 rounded-lg p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${styles.icon}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${styles.badge}`}>
                                                    {alert.risk}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {alert.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                <span className="font-medium text-slate-900 text-sm">{alert.zone}</span>
                                            </div>
                                            <p className="text-xs text-slate-600">{alert.message}</p>
                                            {alert.suggestedAction && (
                                                <p className="text-xs text-slate-400 mt-1 italic">
                                                    Suggested: {alert.suggestedAction}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs gap-1 shrink-0"
                                        onClick={() => onAcknowledge?.(alert.id)}
                                    >
                                        <Check className="w-3 h-3" />
                                        Acknowledge
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
