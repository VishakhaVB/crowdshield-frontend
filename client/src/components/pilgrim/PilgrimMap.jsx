import React from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in leaflet (though we use Circles mainly)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const riskColors = {
    SAFE: '#059669',      // Green-600
    MODERATE: '#d97706',  // Amber-600
    BUSY: '#ea580c',      // Orange-600
    AVOID: '#dc2626',     // Red-600
    CRITICAL: '#991b1b'   // Red-800
};

const riskFillColors = {
    SAFE: '#10b981',      // Green-500
    MODERATE: '#f59e0b',  // Amber-500
    BUSY: '#f97316',      // Orange-500
    AVOID: '#ef4444',     // Red-500
    CRITICAL: '#b91c1c'   // Red-700
};

// Component to auto-fit bounds (Optional, but nice for UX)
function FitBounds({ zones }) {
    const map = useMap();
    React.useEffect(() => {
        if (!map) return;
        try {
            if (zones && zones.length > 0) {
                const validLayers = zones
                    .filter(z => z.center && Array.isArray(z.center) && z.center.length === 2)
                    .map(z => L.circle(z.center, { radius: z.radius || 50 }));

                if (validLayers.length > 0) {
                    const group = new L.FeatureGroup(validLayers);
                    if (group.getBounds().isValid()) {
                        map.fitBounds(group.getBounds(), { padding: [20, 20] });
                    }
                }
            }
        } catch (err) {
            console.error("Error in FitBounds:", err);
        }
    }, [zones, map]);
    return null;
}

import { useTranslation } from 'react-i18next';

// ... (previous code)

export default function PilgrimMap({ zones }) {
    const { t } = useTranslation();
    // Default Nashik Center
    const defaultPosition = [20.005, 73.790];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                <div>
                    <h2 className="font-semibold text-slate-900 text-lg">{t('pilgrim.map.title')}</h2>
                    <p className="text-xs text-slate-500">Real-time crowd density view</p>
                </div>
                <div className="flex gap-2 text-[10px] font-medium">
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>{t('pilgrim.map.legend.safe')}</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span>{t('pilgrim.map.legend.busy')}</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>{t('pilgrim.map.legend.avoid')}</div>
                </div>
            </div>

            <div className="flex-1 relative z-0">
                <MapContainer
                    center={defaultPosition}
                    zoom={14}
                    style={{ height: '100%', width: '100%', background: '#f8fafc' }}
                    scrollWheelZoom={true} // Allow zooming for better exploration
                    attributionControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {zones && zones.map((zone) => {
                        // Fallback if center is missing (should not happen with updated backend)
                        const center = zone.center || [20.0, 73.8];
                        const color = riskColors[zone.risk] || riskColors.SAFE;
                        const fillColor = riskFillColors[zone.risk] || riskFillColors.SAFE;

                        return (
                            <Circle
                                key={zone.name || Math.random()}
                                center={center}
                                radius={zone.radius || 100}
                                pathOptions={{
                                    color: color,
                                    fillColor: fillColor,
                                    fillOpacity: 0.4,
                                    weight: 2
                                }}
                            >
                                <Popup>
                                    <div className="text-center p-1">
                                        <h3 className="font-bold text-slate-800">{zone.name}</h3>
                                        <div className={`text-xs font-bold mt-1 px-2 py-1 rounded-full inline-block text-white`}
                                            style={{ backgroundColor: color }}>
                                            {zone.risk}
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1">
                                            {zone.density ? `${zone.density.toFixed(1)} people/m²` : 'Est. data'}
                                        </p>
                                    </div>
                                </Popup>
                            </Circle>
                        );
                    })}

                    {/* Auto-focus the map on the zones */}
                    <FitBounds zones={zones} />
                </MapContainer>
            </div>

            {/* Trust Footer internal to map */}
            <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-400 text-center border-t border-slate-100">
                Map Data © OpenStreetMap • Zone Data Source: Historical Pattern Engine
            </div>
        </div>
    );
}
