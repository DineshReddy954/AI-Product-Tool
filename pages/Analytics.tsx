import React from 'react';
import { BarChart3, TrendingUp, Users, MousePointer, ArrowUpRight } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Product Analytics</h1>
          <p className="text-slate-400">AI-driven insights on product performance.</p>
        </div>
        <select className="bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
          <option>YTD</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Active Users', val: '12.4k', change: '+18%', icon: Users, color: 'text-blue-400' },
          { label: 'Feature Adoption', val: '45%', change: '+5%', icon: MousePointer, color: 'text-purple-400' },
          { label: 'Avg Session Time', val: '14m', change: '-2%', icon: Clock, color: 'text-emerald-400' },
          { label: 'Retention Rate', val: '68%', change: '+1.2%', icon: TrendingUp, color: 'text-pink-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                   <Icon className="w-5 h-5" />
                 </div>
                 <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{stat.val}</h3>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention Chart (Visual Mock) */}
        <div className="glass-panel p-6 rounded-xl border border-white/5">
           <h3 className="text-lg font-bold text-white mb-6">User Retention by Cohort</h3>
           <div className="space-y-4">
              {[100, 85, 70, 65, 62, 60].map((val, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 w-16">Week {i}</span>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: `${val}%` }}></div>
                  </div>
                  <span className="text-xs text-white w-8">{val}%</span>
                </div>
              ))}
           </div>
        </div>

        {/* AI Insights */}
        <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> AI Strategic Insights</h3>
           <div className="space-y-4">
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
               <p className="text-sm text-slate-200 leading-relaxed">
                 <span className="font-bold text-blue-400">Recommendation:</span> Based on the 5% drop in checkout conversion, consider simplifying the "Address Input" step. The UX Agent suggests enabling "Auto-fill via Google Maps".
               </p>
               <button className="mt-3 text-xs text-blue-400 font-bold flex items-center gap-1 hover:underline">
                 Generate Experiment <ArrowUpRight className="w-3 h-3" />
               </button>
             </div>

             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
               <p className="text-sm text-slate-200 leading-relaxed">
                 <span className="font-bold text-purple-400">Growth Alert:</span> Feature "Dark Mode" has 85% adoption within 24 hours. Users are engaging 12% longer in dark mode.
               </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Quick helper icon import
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 5H5" />
      <path d="M3 7h4" />
    </svg>
  )
}

export default Analytics;