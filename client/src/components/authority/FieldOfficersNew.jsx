import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';

export default function FieldOfficersNew({ officers }) {
    if (!officers || officers.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                No officers registered
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Field Officer Contacts</h2>
                <p className="text-sm text-slate-500 mt-0.5">Quick access for coordination</p>
            </div>

            <div className="divide-y divide-slate-100">
                {officers.map((officer, index) => (
                    <div key={index} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <div className="font-medium text-slate-900 text-sm">{officer.name}</div>
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <MapPin className="w-3 h-3" />
                                    {officer.zone}
                                </div>
                            </div>
                        </div>
                        <a
                            href={`tel:${officer.phone}`}
                            className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                            <Phone className="w-4 h-4" />
                            {officer.phone}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
