import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Clock, Plus, Settings, Power, RotateCw, AlertOctagon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CameraStatus({ cameras, zones, onAddCamera, onToggleCamera }) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newCamera, setNewCamera] = useState({
        id: '',
        zone: '',
        layer: '1',
        enabled: true
    });

    const handleAddCamera = () => {
        if (newCamera.id && newCamera.zone) {
            onAddCamera?.({
                ...newCamera,
                layer: parseInt(newCamera.layer),
                status: 'Online',
                lastUpdated: new Date().toLocaleTimeString(),
                lastCount: 0
            });
            setNewCamera({ id: '', zone: '', layer: '1', enabled: true });
            setIsAddDialogOpen(false);
        }
    };

    const handleCameraAction = (action, cameraId) => {
        // This would ideally call a parent handler or API directly
        // primarily for demo visual feedback
        if (action === 'toggle') {
            onToggleCamera?.(cameraId);
        } else {
            alert(`Executed '${action}' on ${cameraId}`);
            // Force refresh could happen here
        }
    };

    if (!cameras || cameras.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Camera Status</h2>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1.5">
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
                                        placeholder="e.g., CAM-001"
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
                                <Button className="w-full" onClick={handleAddCamera}>
                                    Add Camera
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="p-8 text-center text-slate-500">
                    <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p>No cameras configured</p>
                    <p className="text-sm mt-1">Add cameras to start monitoring</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">Camera Status</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {cameras.filter(c => c.status === 'Online').length} of {cameras.length} online
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1.5">
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
                                    placeholder="e.g., CAM-001"
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
                            <Button className="w-full" onClick={handleAddCamera}>
                                Add Camera
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                {cameras.map((camera, index) => (
                    <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${camera.status === 'Online' ? 'bg-emerald-50' : (camera.status === 'Maintenance' ? 'bg-amber-50' : 'bg-red-50')}`}>
                                    <Camera className={`w-5 h-5 ${camera.status === 'Online' ? 'text-emerald-600' : (camera.status === 'Maintenance' ? 'text-amber-500' : 'text-red-500')}`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-900">{camera.id}</span>
                                        {camera.status === 'Online' ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                                <CheckCircle className="w-3 h-3" /> Online
                                            </span>
                                        ) : camera.status === 'Maintenance' ? ( // Check Maintenance
                                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                                <Activity className="w-3 h-3" /> Maintenance
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                                <XCircle className="w-3 h-3" /> Offline
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        Zone: {camera.zone} • Layer {camera.layer}
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {camera.lastUpdated}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Device Settings</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleCameraAction('toggle', camera.id)}>
                                            <Power className="w-4 h-4 mr-2" />
                                            {camera.status === 'Online' ? 'Disable Camera' : 'Enable Camera'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCameraAction('Reboot Device', camera.id)}>
                                            <RotateCw className="w-4 h-4 mr-2" />
                                            Reboot Device
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCameraAction('Mark as Faulty', camera.id)} className="text-red-600">
                                            <AlertOctagon className="w-4 h-4 mr-2" />
                                            Mark as Faulty
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
