import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Navigation, Clock, ArrowRight } from 'lucide-react';

export default function GuidancePanel({ zones }) {
    // Generate guidance messages based on zone data
    const generateGuidance = () => {
        if (!zones || zones.length === 0) {
            return [{
                type: 'info',
                message: 'Guidance information is temporarily unavailable. Please follow on-site instructions.',
                icon: Clock
            }];
        }

        const guidance = [];

        // Find safe zones
        const safeZones = zones.filter(z => z.risk === 'SAFE');
        const crowdedZones = zones.filter(z => z.risk === 'CRITICAL' || z.risk === 'HIGH');
        const moderateZones = zones.filter(z => z.risk === 'MODERATE');

        if (crowdedZones.length > 0) {
            guidance.push({
                type: 'warning',
                title: 'Areas to Avoid',
                message: `${crowdedZones.map(z => z.name).join(', ')} ${crowdedZones.length === 1 ? 'is' : 'are'} currently experiencing high crowd density. Please consider using alternate routes.`,
                icon: XCircle
            });
        }

        if (safeZones.length > 0) {
            guidance.push({
                type: 'safe',
                title: 'Recommended Areas',
                message: `${safeZones.map(z => z.name).join(', ')} ${safeZones.length === 1 ? 'is' : 'are'} currently safe and less crowded. These routes are recommended.`,
                icon: CheckCircle
            });
        }

        if (moderateZones.length > 0) {
            guidance.push({
                type: 'moderate',
                title: 'Moderate Crowd Areas',
                message: `${moderateZones.map(z => z.name).join(', ')} ${moderateZones.length === 1 ? 'has' : 'have'} moderate crowd levels. Please proceed with patience.`,
                icon: AlertTriangle
            });
        }

        // Always add general guidance
        guidance.push({
            type: 'info',
            title: 'General Safety Tips',
            message: 'Stay with your group. Follow directions from officials. Keep hydrated. Avoid rushing.',
            icon: Navigation
        });

        return guidance;
    };

    const guidance = generateGuidance();

    const typeStyles = {
        safe: 'bg-[var(--status-safe-bg)] border-[var(--status-safe)] text-[var(--status-safe-text)]',
        warning: 'bg-[var(--status-critical-bg)] border-[var(--status-critical)] text-[var(--status-critical)]',
        moderate: 'bg-[var(--status-moderate-bg)] border-[var(--status-moderate)] text-[var(--status-moderate)]',
        info: 'bg-blue-50 border-blue-200 text-[var(--primary-blue)]'
    };

    const iconStyles = {
        safe: 'text-[var(--status-safe)] bg-white',
        warning: 'text-[var(--status-critical)] bg-white',
        moderate: 'text-[var(--status-moderate)] bg-white',
        info: 'text-[var(--accent-blue)] bg-white'
    };

    return (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] shadow-sm overflow-hidden h-full">
            <div className="p-4 border-b border-[var(--border-light)] bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[var(--primary-blue)]" />
                    <h2 className="font-semibold text-[var(--text-main)]">Route Guidance</h2>
                </div>
            </div>

            <div className="p-4 space-y-3 max-h-[450px] overflow-y-auto">
                {guidance.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`rounded-lg border p-3 ${typeStyles[item.type]}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-1.5 rounded-full flex-shrink-0 shadow-sm ${iconStyles[item.type]}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                    {item.title && (
                                        <h3 className="font-bold text-sm mb-0.5 opacity-90">{item.title}</h3>
                                    )}
                                    <p className="text-sm font-medium leading-snug opacity-90">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Route Suggestions */}
            <div className="p-4 pt-0">
                <div className="bg-slate-50 rounded-lg p-3 border border-[var(--border-light)]">
                    <h3 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider mb-2">Safe Corridors</h3>
                    <div className="space-y-2">
                        {zones?.filter(z => z.risk === 'SAFE').slice(0, 3).map((zone, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white rounded border border-[var(--border-light)] hover:border-[var(--status-safe)] transition-colors cursor-default"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--status-safe)]" />
                                    <span className="text-sm font-semibold text-[var(--text-main)]">{zone.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[var(--status-safe)] text-xs font-medium">
                                    <span>Open</span>
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
