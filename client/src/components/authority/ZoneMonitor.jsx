import React from 'react';
import { Layers, Users, TrendingUp, TrendingDown } from 'lucide-react';

const layerLabels = {
    1: { name: 'Core / Critical', color: 'bg-red-100 text-red-700' },
    2: { name: 'Buffer / Controlled', color: 'bg-amber-100 text-amber-700' },
    3: { name: 'Outer / Perimeter', color: 'bg-blue-100 text-blue-700' }
};

const riskColors = {
    SAFE: 'bg-emerald-500',
    MODERATE: 'bg-amber-500',
    HIGH: 'bg-orange-500',
    CRITICAL: 'bg-red-500'
};

const riskTextColors = {
    SAFE: 'text-emerald-700 bg-emerald-50',
    MODERATE: 'text-amber-700 bg-amber-50',
    HIGH: 'text-orange-700 bg-orange-50',
    CRITICAL: 'text-red-700 bg-red-50'
};

export default function ZoneMonitor({ zones }) {
    if (!zones || zones.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8">
                <div className="text-center text-slate-500">
                    <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p>Zone data temporarily unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Zone Monitoring</h2>
                <p className="text-sm text-slate-500 mt-1">Real-time status of all monitored zones</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-left text-sm text-slate-600">
                            <th className="px-4 py-3 font-medium">Zone</th>
                            <th className="px-4 py-3 font-medium">Layer</th>
                            <th className="px-4 py-3 font-medium">People</th>
                            <th className="px-4 py-3 font-medium">Density</th>
                            <th className="px-4 py-3 font-medium">Entry</th>
                            <th className="px-4 py-3 font-medium">Exit</th>
                            <th className="px-4 py-3 font-medium">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {zones.map((zone, index) => {
                            const layer = layerLabels[zone.layer] || layerLabels[3];
                            return (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${riskColors[zone.risk]}`} />
                                            <span className="font-medium text-slate-900">{zone.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${layer.color}`}>
                                            L{zone.layer}: {layer.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-slate-700">
                                            <Users className="w-4 h-4 text-slate-400" />
                                            {zone.peopleCount?.toLocaleString() ?? '—'}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-slate-700">{zone.density ?? '—'} p/m²</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-emerald-600">
                                            <TrendingUp className="w-4 h-4" />
                                            {zone.entryRate ?? '—'}/min
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-slate-600">
                                            <TrendingDown className="w-4 h-4" />
                                            {zone.exitRate ?? '—'}/min
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${riskTextColors[zone.risk]}`}>
                                            {zone.risk}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
