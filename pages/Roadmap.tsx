import React, { useState } from 'react';
import { Plus, GripVertical, Calendar } from 'lucide-react';

const Roadmap = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'AI Core Integration', quarter: 'Q1', type: 'Backend', status: 'In Progress' },
    { id: 2, title: 'User Auth System', quarter: 'Q1', type: 'Security', status: 'Done' },
    { id: 3, title: 'Mobile App Beta', quarter: 'Q2', type: 'Frontend', status: 'Planned' },
    { id: 4, title: 'Analytics Dashboard', quarter: 'Q2', type: 'Frontend', status: 'Planned' },
    { id: 5, title: 'Enterprise SSO', quarter: 'Q3', type: 'Security', status: 'Planned' },
  ]);

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Strategic Roadmap</h1>
          <p className="text-slate-400">Drag and drop features to prioritize.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quarters.map((q) => (
          <div key={q} className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col gap-4 min-h-[400px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-bold text-white text-lg">{q} 2024</h3>
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>
            
            <div className="space-y-3 flex-1">
              {items.filter(i => i.quarter === q).map(item => (
                <div key={item.id} className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-white/5 cursor-move group transition flex gap-3 shadow-sm">
                   <div className="text-slate-600 group-hover:text-slate-400">
                     <GripVertical className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-medium text-white">{item.title}</h4>
                     <div className="flex gap-2 mt-2">
                       <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                         item.type === 'Backend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                         item.type === 'Frontend' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                         'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                       }`}>{item.type}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                         {item.status}
                       </span>
                     </div>
                   </div>
                </div>
              ))}
              
              <button className="w-full py-2 border border-dashed border-white/10 rounded-lg text-slate-500 text-sm hover:bg-white/5 hover:text-white transition flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> Add to {q}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;