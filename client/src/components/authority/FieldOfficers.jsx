import React from 'react';
import { User, Phone, MapPin, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FieldOfficers({ officers }) {
    if (!officers || officers.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-900">Field Officers</h2>
                </div>
                <div className="p-8 text-center text-slate-500">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p>No officers registered</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">Field Officers</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{officers.length} officers on duty</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5">
                    <Radio className="w-4 h-4" />
                    Broadcast
                </Button>
            </div>

            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                {officers.map((officer, index) => (
                    <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-slate-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{officer.name}</div>
                                    <div className="flex items-center gap-3 mt-0.5 text-sm text-slate-500">
                                        {officer.zone && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {officer.zone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <a
                                href={`tel:${officer.phone}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-medium">{officer.phone}</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
