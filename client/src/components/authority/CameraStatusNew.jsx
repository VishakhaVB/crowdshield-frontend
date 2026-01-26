import React, { useState } from 'react';
import { Camera, Plus, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CameraStatusNew({ cameras, zones, onAddCamera, onToggleCamera, onDeleteCamera }) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newCamera, setNewCamera] = useState({
        id: '',
        zone: '',
        layer: '1'
    });

    const handleAddCamera = () => {
        if (newCamera.id && newCamera.zone) {
            onAddCamera?.({
                ...newCamera,
                layer: parseInt(newCamera.layer),
                status: 'Online',
                lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
                lastCount: 0
            });
            setNewCamera({ id: '', zone: '', layer: '1' });
            setIsAddDialogOpen(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">Camera Status</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Monitor and manage camera network</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1.5 bg-slate-900 hover:bg-slate-800">
                            <Plus className="w-4 h-4" />
                            Add Camera
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Camera</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div>
                                <Label>Camera ID</Label>
                                <Input
                                    placeholder="e.g., CAM-007"
                                    value={newCamera.id}
                                    onChange={(e) => setNewCamera({ ...newCamera, id: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>Assign to Zone</Label>
                                <Select
                                    value={newCamera.zone}
                                    onValueChange={(value) => setNewCamera({ ...newCamera, zone: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {zones?.map((zone) => (
                                            <SelectItem key={zone.name} value={zone.name}>{zone.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Layer</Label>
                                <Select
                                    value={newCamera.layer}
                                    onValueChange={(value) => setNewCamera({ ...newCamera, layer: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">L1</SelectItem>
                                        <SelectItem value="2">L2</SelectItem>
                                        <SelectItem value="3">L3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-full" onClick={handleAddCamera}>
                                Add Camera
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                            <th className="px-4 py-3 font-medium">Camera ID</th>
                            <th className="px-4 py-3 font-medium">Zone</th>
                            <th className="px-4 py-3 font-medium">Layer</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Last Updated</th>
                            <th className="px-4 py-3 font-medium text-right">Last Count</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {cameras?.map((camera, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors text-sm">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium text-slate-900">{camera.id}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-slate-600">{camera.zone}</td>
                                <td className="px-4 py-3 text-slate-600">L{camera.layer}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${camera.status === 'Online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        <span className={camera.status === 'Online' ? 'text-emerald-600' : 'text-red-600'}>
                                            {camera.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-slate-500">{camera.lastUpdated}</td>
                                <td className="px-4 py-3 text-right font-medium text-slate-900">
                                    {camera.lastCount?.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                            onClick={() => onToggleCamera?.(camera.id)}
                                        >
                                            <Settings className="w-4 h-4 text-slate-400" />
                                        </button>
                                        <button
                                            className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                            onClick={() => onDeleteCamera?.(camera.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {(!cameras || cameras.length === 0) && (
                <div className="p-8 text-center text-slate-500">
                    <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p>No cameras configured</p>
                </div>
            )}
        </div>
    );
}
