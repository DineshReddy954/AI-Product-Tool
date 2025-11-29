import React from 'react';
import { Rocket, GitCommit, CheckCircle, Clock } from 'lucide-react';

const ReleaseHub = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Release Center</h1>
          <p className="text-slate-400">Manage deployments, changelogs, and version history.</p>
        </div>
         <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 rounded-xl text-white font-bold flex items-center gap-2 shadow-lg">
           <Rocket className="w-4 h-4" /> Ship Release v2.1
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Release Card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-6">
           <div className="flex justify-between items-start mb-6">
             <div>
               <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Staged for Production</span>
               <h2 className="text-2xl font-bold text-white">Version 2.1.0 (Super Pro)</h2>
             </div>
             <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
               Ready to Deploy
             </div>
           </div>

           <div className="space-y-6">
             <div>
               <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><GitCommit className="w-4 h-4" /> Changelog Summary</h3>
               <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-sm space-y-2 text-slate-400">
                 <p className="flex items-start gap-2"><span className="text-blue-400 font-bold">• Feature:</span> Added Multi-Agent Control Room</p>
                 <p className="flex items-start gap-2"><span className="text-blue-400 font-bold">• Feature:</span> New Analytics Dashboard</p>
                 <p className="flex items-start gap-2"><span className="text-purple-400 font-bold">• Improvement:</span> 30% faster generation speeds</p>
                 <p className="flex items-start gap-2"><span className="text-red-400 font-bold">• Fix:</span> Resolved dark mode flickering on mobile</p>
               </div>
             </div>

             <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Deployment Checklist (AI Generated)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {['Database Migration (v21)', 'Unit Tests Passed (142/142)', 'E2E Tests Passed', 'Security Scan Clean', 'CDN Cache Purged', 'Feature Flags Updated'].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">
                       <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-offset-slate-900" />
                       {item}
                     </div>
                   ))}
                </div>
             </div>
           </div>
        </div>

        {/* History */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400" /> Release History</h2>
          <div className="space-y-4 relative flex-1">
             <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-800"></div>
             {[
               { v: 'v2.0.0', date: '2 days ago', status: 'Deployed', color: 'bg-blue-500' },
               { v: 'v1.9.4', date: '1 week ago', status: 'Deployed', color: 'bg-slate-600' },
               { v: 'v1.9.3', date: '2 weeks ago', status: 'Rolled Back', color: 'bg-red-500' },
               { v: 'v1.9.0', date: '1 month ago', status: 'Deployed', color: 'bg-slate-600' },
             ].map((rel, i) => (
               <div key={i} className="relative pl-8">
                 <div className={`absolute left-[0.15rem] top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 ${rel.color}`}></div>
                 <h4 className="text-white font-bold text-sm">{rel.v}</h4>
                 <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">{rel.date}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${rel.status === 'Deployed' ? 'bg-blue-900/30 text-blue-300 border-blue-500/20' : rel.status === 'Rolled Back' ? 'bg-red-900/30 text-red-300 border-red-500/20' : 'bg-slate-800 text-slate-400'}`}>{rel.status}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseHub;