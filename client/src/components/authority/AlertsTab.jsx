import React from 'react';
import { AlertTriangle, Bell, Route, Check, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const riskStyles = {
    CRITICAL: {
        badge: 'bg-red-100 text-red-700 border border-red-200',
        icon: 'text-red-500 bg-red-50',
        dot: 'bg-red-500'
    },
    HIGH: {
        badge: 'bg-orange-100 text-orange-700 border border-orange-200',
        icon: 'text-orange-500 bg-orange-50',
        dot: 'bg-orange-500'
    },
    MODERATE: {
        badge: 'bg-amber-100 text-amber-700 border border-amber-200',
        icon: 'text-amber-500 bg-amber-50',
        dot: 'bg-amber-500'
    }
};

export default function AlertsTab({ alerts, onAcknowledge, onTriggerManual, onActivateRoute }) {
    const activeAlerts = alerts?.filter(a => !a.acknowledged) || [];

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <Bell className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-slate-900">Alert & Control Panel</h2>
                            <p className="text-sm text-slate-500">{activeAlerts.length} active alerts</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            onClick={onActivateRoute}
                        >
                            <Route className="w-4 h-4" />
                            Alternate Route
                        </Button>
                        <Button
                            size="sm"
                            className="gap-1.5 bg-red-500 hover:bg-red-600 text-white"
                            onClick={onTriggerManual}
                        >
                            <Bell className="w-4 h-4" />
                            Manual Alert
                        </Button>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-slate-100">
                {activeAlerts.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Check className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-medium">All Clear</p>
                        <p className="text-sm mt-1">No active alerts at this time</p>
                    </div>
                ) : (
                    activeAlerts.map((alert, index) => {
                        const styles = riskStyles[alert.risk] || riskStyles.MODERATE;
                        return (
                            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${styles.icon}`}>
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${styles.badge}`}>
                                                {alert.risk}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {alert.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="font-semibold text-slate-900">{alert.zone}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-1">{alert.message}</p>
                                        {alert.suggestedAction && (
                                            <p className="text-sm text-emerald-600">
                                                Suggested: {alert.suggestedAction}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5 shrink-0"
                                        onClick={() => onAcknowledge?.(alert.id)}
                                    >
                                        <Check className="w-4 h-4" />
                                        Acknowledge
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Field Officers Section */}
            <div className="border-t border-slate-200">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-900">Field Officer Contacts</h3>
                    <p className="text-sm text-slate-500">Quick access for coordination</p>
                </div>
            </div>
        </div>
    );
}
