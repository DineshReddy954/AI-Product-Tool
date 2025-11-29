import React from 'react';
import { 
  Plus, 
  FileText, 
  Clock, 
  TrendingUp, 
  Activity,
  Users,
  Zap,
  CheckCircle2,
  AlertCircle,
  Kanban,
  Rocket,
  Cpu
} from 'lucide-react';
import { DocType } from '../types';

interface DashboardProps {
  onNavigate: (view: string) => void;
  recentDocs: { type: DocType; title: string; date: string }[];
}

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all hover:translate-y-[-2px]">
    <div className={`absolute -right-6 -top-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color} rounded-full bg-current w-32 h-32 blur-xl`}></div>
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
        {trend && <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {trend}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-white/5 ${color} text-white`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, recentDocs }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-slate-400 mt-2 text-lg">Your AI Product Workforce is online and ready.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('control-room')}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium transition flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Agent Room
          </button>
          <button 
            onClick={() => onNavigate('generator')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Sprints" value="3" icon={Zap} color="bg-blue-500" trend="+12% velocity" />
        <StatCard label="Tasks Completed" value="128" icon={CheckCircle2} color="bg-emerald-500" trend="+24 this week" />
        <StatCard label="Docs Generated" value="45" icon={FileText} color="bg-purple-500" trend="8 new today" />
        <StatCard label="Critical Risks" value="2" icon={AlertCircle} color="bg-pink-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Files */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> Recent Artifacts
            </h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          
          <div className="space-y-3 flex-1">
            {recentDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 border border-dashed border-white/10 rounded-xl">
                 <FileText className="w-8 h-8 text-slate-600 mb-2" />
                 <p className="text-slate-500">No documents yet. Launch a new project.</p>
              </div>
            ) : (
              recentDocs.slice(0, 5).map((doc, idx) => (
                <div key={idx} onClick={() => onNavigate('editor')} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer group border border-transparent hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition
                      ${doc.type.includes('Requirements') ? 'bg-blue-900/30 text-blue-400' : 
                        doc.type.includes('Test') ? 'bg-emerald-900/30 text-emerald-400' :
                        'bg-purple-900/30 text-purple-400'}
                    `}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-blue-200 transition">{doc.title}</h4>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 hidden md:block">{doc.date}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Center */}
        <div className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" /> Quick Actions
          </h2>
          <div className="space-y-3">
             {[
               { label: 'Sprint Planning', desc: 'Convert PRD to User Stories', color: 'from-blue-600 to-cyan-600', icon: Kanban, target: 'sprint' },
               { label: 'Release Notes', desc: 'Draft changelog for v2.0', color: 'from-emerald-600 to-teal-600', icon: Rocket, target: 'release' },
               { label: 'API Specs', desc: 'Generate Swagger / OpenAPI', color: 'from-purple-600 to-pink-600', icon: Cpu, target: 'engineering' },
               { label: 'Market Research', desc: 'Competitive Analysis', color: 'from-amber-600 to-orange-600', icon: TrendingUp, target: 'generator' },
             ].map((action, i) => {
               const Icon = action.icon;
               return (
                 <button 
                  key={i}
                  onClick={() => onNavigate(action.target)}
                  className="w-full text-left p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-white/20 transition relative overflow-hidden group flex items-center gap-4"
                 >
                   <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white shadow-lg`}>
                     <Icon className="w-4 h-4" />
                   </div>
                   <div className="relative z-10">
                     <h4 className="font-bold text-white text-sm">{action.label}</h4>
                     <p className="text-xs text-slate-400">{action.desc}</p>
                   </div>
                 </button>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;