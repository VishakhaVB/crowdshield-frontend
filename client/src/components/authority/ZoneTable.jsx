import React from 'react';

const riskBadgeStyles = {
    SAFE: 'bg-emerald-100 text-emerald-700',
    MODERATE: 'bg-amber-100 text-amber-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700'
};

const layerLabels = {
    1: 'L1 - Core / Critical',
    2: 'L2 - Buffer / Controlled',
    3: 'L3 - Outer / Perimeter'
};

export default function ZoneTable({ zones }) {
    if (!zones || zones.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                Zone data temporarily unavailable
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Zone Monitoring</h2>
                <p className="text-sm text-slate-500 mt-0.5">Real-time zone status overview</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                            <th className="px-4 py-3 font-medium">Zone</th>
                            <th className="px-4 py-3 font-medium">Layer</th>
                            <th className="px-4 py-3 font-medium">People</th>
                            <th className="px-4 py-3 font-medium">Density</th>
                            <th className="px-4 py-3 font-medium">Entry Rate</th>
                            <th className="px-4 py-3 font-medium">Exit Rate</th>
                            <th className="px-4 py-3 font-medium">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {zones.map((zone, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors text-sm">
                                <td className="px-4 py-3">
                                    <span className="font-medium text-slate-900">{zone.name}</span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                    {layerLabels[zone.layer] || `L${zone.layer}`}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="font-medium text-slate-900">
                                        {zone.peopleCount?.toLocaleString() ?? '—'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                    {zone.density ?? '—'} p/m²
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-emerald-600 font-medium">
                                        +{zone.entryRate ?? '—'}/min
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-slate-600">
                                        -{zone.exitRate ?? '—'}/min
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold ${riskBadgeStyles[zone.risk]}`}>
                                        {zone.risk}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
