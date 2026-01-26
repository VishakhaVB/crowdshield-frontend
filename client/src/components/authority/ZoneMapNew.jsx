import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet'; // Standard Leaflet

const riskColors = {
    SAFE: { color: '#10B981', fillColor: '#10B981' }, // Green
    MODERATE: { color: '#F59E0B', fillColor: '#F59E0B' }, // Yellow/Orange
    BUSY: { color: '#F97316', fillColor: '#F97316' }, // Orange
    AVOID: { color: '#EF4444', fillColor: '#EF4444' } // Red
};

// Helper to center map if needed
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function ZoneMapNew({ zones, onZoneSelect, selectedZone }) {
    const defaultCenter = [20.0059, 73.7947]; // Ramkund, Nashik
    const zoomLevel = selectedZone ? 16 : 15;

    // Memoize center to avoid jitter
    const mapCenter = useMemo(() => {
        if (selectedZone && selectedZone.center) {
            return [selectedZone.center.lat, selectedZone.center.lng];
        }
        return defaultCenter;
    }, [selectedZone]);

    return (
        <div className="h-full w-full z-0 relative">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <ChangeView center={mapCenter} zoom={zoomLevel} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {zones.map((zone) => {
                    if (!zone.center) return null; // Skip if no geo data

                    // Get color props based on risk
                    // Backend sends: SAFE, MODERATE, BUSY, AVOID
                    // Frontend 'risk' prop matches this directly now
                    const riskStyle = riskColors[zone.risk] || riskColors.SAFE;

                    return (
                        <Circle
                            key={zone.id}
                            center={[zone.center.lat, zone.center.lng]}
                            radius={zone.radius || 150}
                            pathOptions={{
                                color: riskStyle.color,
                                fillColor: riskStyle.fillColor,
                                fillOpacity: 0.4,
                                weight: 2
                            }}
                            eventHandlers={{
                                click: () => onZoneSelect && onZoneSelect(zone)
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                <div className="text-center">
                                    <div className="font-bold text-sm">{zone.name}</div>
                                    <div className="text-xs">
                                        Density: {zone.density} | Risk: {zone.risk}<br />
                                        Crowd: {zone.peopleCount}
                                    </div>
                                </div>
                            </Tooltip>
                        </Circle>
                    );
                })}
            </MapContainer>

            {/* Floating Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-md border border-slate-200 z-[400] text-xs">
                <h4 className="font-bold mb-1 text-slate-700">Risk Levels</h4>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#10B981]"></span> Safe
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span> Moderate
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#F97316]"></span> Busy
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Avoid
                    </div>
                </div>
            </div>
        </div>
    );
}

