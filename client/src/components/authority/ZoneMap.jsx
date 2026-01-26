import React, { useState } from 'react';
import { Map, Layers } from 'lucide-react';

const riskColors = {
    SAFE: '#10b981',
    MODERATE: '#f59e0b',
    HIGH: '#f97316',
    CRITICAL: '#ef4444'
};

const riskBgColors = {
    SAFE: 'rgba(16, 185, 129, 0.15)',
    MODERATE: 'rgba(245, 158, 11, 0.15)',
    HIGH: 'rgba(249, 115, 22, 0.15)',
    CRITICAL: 'rgba(239, 68, 68, 0.2)'
};

export default function ZoneMap({ zones, showDetails = true }) {
    const [selectedZone, setSelectedZone] = useState(null);

    // Schematic layout positions for zones
    const zonePositions = {
        'Main Ghat': { x: 45, y: 35, width: 25, height: 20 },
        'North Entry': { x: 40, y: 10, width: 18, height: 15 },
        'South Entry': { x: 40, y: 65, width: 18, height: 15 },
        'East Corridor': { x: 72, y: 30, width: 15, height: 30 },
        'West Corridor': { x: 15, y: 30, width: 15, height: 30 },
        'Temple Area': { x: 45, y: 45, width: 20, height: 15 },
        'Medical Zone': { x: 78, y: 70, width: 12, height: 12 },
        'Parking Area': { x: 10, y: 75, width: 20, height: 15 }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">Zone Map</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Color-coded by risk level</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    {Object.entries(riskColors).map(([risk, color]) => (
                        <div key={risk} className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                            <span className="text-slate-600">{risk}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <div className="relative bg-slate-100 rounded-xl aspect-[16/10] overflow-hidden">
                    {/* Grid Background */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* River/Water Feature */}
                    <div
                        className="absolute"
                        style={{
                            left: '35%',
                            top: '55%',
                            width: '30%',
                            height: '40%',
                            background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.4) 100%)',
                            borderRadius: '0 0 100px 100px'
                        }}
                    />
                    <div
                        className="absolute text-blue-400 text-xs font-medium"
                        style={{ left: '47%', top: '80%' }}
                    >
                        River
                    </div>

                    {/* Zone Rectangles */}
                    {zones?.map((zone, index) => {
                        const position = zonePositions[zone.name] || {
                            x: 10 + (index % 3) * 30,
                            y: 10 + Math.floor(index / 3) * 25,
                            width: 18,
                            height: 18
                        };
                        const isSelected = selectedZone?.name === zone.name;

                        return (
                            <div
                                key={zone.name}
                                className="absolute cursor-pointer transition-all duration-200"
                                style={{
                                    left: `${position.x}%`,
                                    top: `${position.y}%`,
                                    width: `${position.width}%`,
                                    height: `${position.height}%`,
                                    backgroundColor: riskBgColors[zone.risk],
                                    border: `2px solid ${riskColors[zone.risk]}`,
                                    borderRadius: '8px',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                                    zIndex: isSelected ? 10 : 1
                                }}
                                onClick={() => setSelectedZone(isSelected ? null : zone)}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                    <span className="text-xs font-semibold text-slate-800 text-center leading-tight">
                                        {zone.name}
                                    </span>
                                    {showDetails && (
                                        <>
                                            <span
                                                className="text-[10px] font-medium mt-1 px-1.5 py-0.5 rounded"
                                                style={{ backgroundColor: riskColors[zone.risk], color: 'white' }}
                                            >
                                                {zone.risk}
                                            </span>
                                            <span className="text-[10px] text-slate-600 mt-0.5">
                                                L{zone.layer}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Compass */}
                    <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-2 shadow-sm">
                        <div className="w-8 h-8 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-0.5 h-full bg-slate-300" />
                                <div className="absolute w-full h-0.5 bg-slate-300" />
                            </div>
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700">N</span>
                        </div>
                    </div>
                </div>

                {/* Selected Zone Details */}
                {selectedZone && showDetails && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-semibold text-slate-900 mb-2">{selectedZone.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500">Layer</span>
                                <p className="font-medium text-slate-900">Layer {selectedZone.layer}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">People</span>
                                <p className="font-medium text-slate-900">{selectedZone.peopleCount?.toLocaleString()}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Density</span>
                                <p className="font-medium text-slate-900">{selectedZone.density} p/m²</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Risk Level</span>
                                <p
                                    className="font-semibold"
                                    style={{ color: riskColors[selectedZone.risk] }}
                                >
                                    {selectedZone.risk}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
