export default function SafetyOverview({ data, loading }) {
  // Safety check for null data
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Crowd */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="text-sm font-medium text-slate-500">Total Crowd</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">
            {data.totalCrowd ? data.totalCrowd.toLocaleString() : '0'}
          </span>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            Live
          </span>
        </div>
      </div>

      {/* Average Density */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
        <div className="text-sm font-medium text-slate-500">Avg Density</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">
            {data.avgDensity || '0.0'}
          </span>
          <span className="text-sm text-slate-500">p/m²</span>
        </div>
        {/* Visual Indicator */}
        <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${data.avgDensity > 2.5 ? 'bg-red-500' :
                data.avgDensity > 1.5 ? 'bg-orange-500' : 'bg-emerald-500'
              }`}
            style={{ width: `${Math.min((data.avgDensity / 4) * 100, 100)}%` }} // Max 4 p/m2
          />
        </div>
      </div>

      {/* Net Flow */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
        <div className="text-sm font-medium text-slate-500">Net Flow Rate</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${data.netFlow > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {data.netFlow > 0 ? '+' : ''}{data.netFlow || '0'}
          </span>
          <span className="text-sm text-slate-500">/min</span>
        </div>
      </div>

      {/* Active Alerts */}
      <div className={`rounded-xl border p-4 shadow-sm relative overflow-hidden transition-colors ${data.activeAlerts > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'
        }`}>
        <div className="text-sm font-medium text-slate-500">Active Alerts</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${data.activeAlerts > 0 ? 'text-red-600' : 'text-slate-900'}`}>
            {data.activeAlerts || '0'}
          </span>
          {data.activeAlerts > 0 && (
            <span className="text-xs font-bold text-red-600 animate-pulse">
              CRITICAL
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
