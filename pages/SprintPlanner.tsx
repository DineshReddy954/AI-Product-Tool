import React, { useState } from 'react';
import { Kanban, Sparkles, CheckCircle, Circle, AlertCircle, ArrowRight } from 'lucide-react';
import { generateSprintTasks } from '../services/geminiService';
import { SprintTask } from '../types';

const SprintPlanner = () => {
  const [context, setContext] = useState('');
  const [tasks, setTasks] = useState<SprintTask[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context) return;
    setLoading(true);
    const result = await generateSprintTasks(context);
    setTasks(result);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-3xl font-bold text-white">Sprint Planner</h1>
           <p className="text-slate-400">Convert PRDs or feature lists into actionable Jira/Linear tickets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Input Pane */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Context Source
          </h2>
          <textarea
            className="flex-1 w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Paste your PRD content, feature requirements, or acceptance criteria here..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
          <button 
            onClick={handleGenerate}
            disabled={loading || !context}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span className="animate-spin">⏳</span> : <Kanban className="w-4 h-4" />}
            Generate Sprint Plan
          </button>
        </div>

        {/* Board Pane */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-6 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-white">Generated Backlog</h2>
             <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Total Points: {tasks.reduce((acc, t) => acc + (t.points || 0), 0)}</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">{tasks.length} items</span>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
             {tasks.length === 0 && !loading && (
               <div className="flex flex-col items-center justify-center h-full text-slate-500">
                 <Kanban className="w-12 h-12 mb-3 opacity-20" />
                 <p>No tasks generated yet.</p>
               </div>
             )}

             {loading && (
               <div className="space-y-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse"></div>
                 ))}
               </div>
             )}

             {tasks.map((task, i) => (
               <div key={i} className="p-4 bg-slate-800/40 border border-white/5 hover:border-blue-500/30 rounded-xl flex items-center justify-between group transition">
                 <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      task.type === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      task.type === 'Bug' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.type === 'Epic' ? <Sparkles className="w-4 h-4" /> : 
                       task.type === 'Bug' ? <AlertCircle className="w-4 h-4" /> : 
                       <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span className="uppercase tracking-wider font-bold text-[10px]">{task.type}</span>
                        <span>•</span>
                        <span>{task.status}</span>
                      </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    {task.points && (
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center text-slate-300 font-mono">
                        {task.points}
                      </span>
                    )}
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SprintPlanner;