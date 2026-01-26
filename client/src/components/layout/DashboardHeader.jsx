import React from 'react';
import { Shield, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('crowdshield_token');
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16 shadow-sm">
            <div className="max-w-[1920px] mx-auto px-6 h-full flex items-center justify-between">

                {/* Left: Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#003366] rounded-lg flex items-center justify-center shadow-sm">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[#003366] font-bold text-lg leading-tight tracking-tight">CrowdShield</h1>
                        <span className="text-xs text-gray-500 font-medium">Smart Crowd Management System</span>
                    </div>
                    <div className="hidden md:flex ml-3 items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Live System</span>
                    </div>
                </div>

                {/* Center: Context */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <span className="text-[#111827] font-semibold text-base leading-tight">Authority Dashboard</span>
                    <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Central Command • Nashik Region</span>
                </div>

                {/* Right: Admin Profile */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="flex flex-col items-end mr-1">
                            <span className="text-sm font-semibold text-gray-800">Admin</span>
                            <span className="text-[10px] text-gray-500 font-medium">Nashik Authority</span>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[#003366] font-bold text-xs ring-2 ring-transparent group-hover:ring-gray-100 transition-all">
                                AD
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
