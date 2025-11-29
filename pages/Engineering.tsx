import React, { useState } from 'react';
import { Network, Download, Maximize2, Cpu, Code2, Database } from 'lucide-react';

const Engineering = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'schema'>('architecture');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Engineering Hub</h1>
          <p className="text-slate-400">System architecture, API contracts, and database schemas.</p>
        </div>
         <div className="flex gap-3">
           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20">
             <Download className="w-4 h-4" /> Export Config
          </button>
         </div>
      </div>

      {/* Tab Nav */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-1">
        {[
          { id: 'architecture', label: 'Architecture', icon: Network },
          { id: 'api', label: 'API Specs', icon: Code2 },
          { id: 'schema', label: 'Data Schema', icon: Database },
        ].map((tab) => {
           const Icon = tab.icon;
           return (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`px-4 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 transition ${
                 activeTab === tab.id 
                 ? 'bg-white/10 text-white border-b-2 border-blue-500' 
                 : 'text-slate-400 hover:text-white hover:bg-white/5'
               }`}
             >
               <Icon className="w-4 h-4" /> {tab.label}
             </button>
           )
        })}
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 p-1 min-h-[600px] flex flex-col">
         {activeTab === 'architecture' && (
           <div className="bg-slate-950/50 flex-1 rounded-xl relative overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-5">
                {Array.from({length: 1600}).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white"></div>
                ))}
              </div>

              {/* Mock Diagram */}
              <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl animate-in zoom-in-95 duration-700">
                 
                 {/* Frontend Layer */}
                 <div className="flex gap-8 relative">
                   <div className="w-40 h-24 rounded-xl border border-blue-500/30 bg-blue-900/10 backdrop-blur-sm flex flex-col items-center justify-center text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                      <Code2 className="w-6 h-6 mb-2 opacity-80" />
                      <span className="font-mono text-xs font-bold">Web Client</span>
                      <span className="text-[10px] opacity-50 mt-1">Next.js / React</span>
                   </div>
                    <div className="w-40 h-24 rounded-xl border border-blue-500/30 bg-blue-900/10 backdrop-blur-sm flex flex-col items-center justify-center text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                      <Cpu className="w-6 h-6 mb-2 opacity-80" />
                      <span className="font-mono text-xs font-bold">Mobile App</span>
                      <span className="text-[10px] opacity-50 mt-1">React Native</span>
                   </div>
                   {/* Connector Line */}
                   <div className="absolute top-full left-1/2 w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent transform -translate-x-1/2"></div>
                 </div>

                 {/* API Gateway */}
                 <div className="w-64 h-20 rounded-xl border border-purple-500/50 bg-purple-900/20 backdrop-blur-md flex items-center justify-between px-6 text-purple-300 shadow-[0_0_40px_rgba(168,85,247,0.15)] z-20">
                    <div className="flex flex-col">
                       <span className="font-mono text-sm font-bold">API Gateway</span>
                       <span className="text-[10px] opacity-50">GraphQL / REST</span>
                    </div>
                    <Network className="w-6 h-6" />
                 </div>

                 {/* Microservices */}
                 <div className="flex gap-6 relative">
                    {/* Connector Lines from Gateway */}
                    <div className="absolute bottom-full left-1/2 w-full h-12 border-t border-l border-r border-slate-600/30 rounded-t-xl transform -translate-x-1/2 -translate-y-2"></div>

                    {['Auth Service', 'Product Core', 'AI Engine', 'Payment'].map((service, i) => (
                       <div key={i} className="w-32 h-32 rounded-xl border border-emerald-500/30 bg-emerald-900/10 flex flex-col items-center justify-center text-emerald-300 gap-2 hover:border-emerald-500/60 transition cursor-pointer">
                          <Cpu className="w-5 h-5 opacity-60" />
                          <span className="font-mono text-xs text-center px-2">{service}</span>
                       </div>
                    ))}
                 </div>

                 {/* Database Layer */}
                 <div className="flex gap-12 mt-4">
                     <div className="w-32 h-20 rounded-full border border-orange-500/30 bg-orange-900/10 flex flex-col items-center justify-center text-orange-300 relative shadow-lg">
                        <div className="absolute top-1 w-24 h-3 rounded-full border border-orange-500/20"></div>
                        <Database className="w-4 h-4 mb-1 opacity-70" />
                        <span className="font-mono text-[10px] font-bold">PostgreSQL</span>
                     </div>
                      <div className="w-32 h-20 rounded-full border border-orange-500/30 bg-orange-900/10 flex flex-col items-center justify-center text-orange-300 relative shadow-lg">
                        <div className="absolute top-1 w-24 h-3 rounded-full border border-orange-500/20"></div>
                        <Database className="w-4 h-4 mb-1 opacity-70" />
                        <span className="font-mono text-[10px] font-bold">Redis Cache</span>
                     </div>
                 </div>

              </div>
           </div>
         )}

         {activeTab === 'api' && (
           <div className="flex-1 p-6 bg-slate-900/50 overflow-auto font-mono text-sm">
             <div className="space-y-6 max-w-4xl mx-auto">
               <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                 <div className="flex gap-3 mb-2">
                   <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold text-xs">GET</span>
                   <span className="text-slate-300">/v1/projects</span>
                 </div>
                 <p className="text-slate-500 text-xs mb-4">Retrieve list of active projects for the authenticated user.</p>
                 <div className="bg-black/40 p-3 rounded text-slate-400 text-xs overflow-x-auto">
                   {`{
  "projects": [
    {
      "id": "prj_123",
      "name": "ChatPRD Pro",
      "status": "active"
    }
  ]
}`}
                 </div>
               </div>

               <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                 <div className="flex gap-3 mb-2">
                   <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-xs">POST</span>
                   <span className="text-slate-300">/v1/agents/generate</span>
                 </div>
                 <p className="text-slate-500 text-xs mb-4">Trigger AI agent workflow generation.</p>
                 <div className="bg-black/40 p-3 rounded text-slate-400 text-xs overflow-x-auto">
                   {`{
  "agentType": "UX_DESIGNER",
  "context": "Login Flow",
  "parameters": { "theme": "dark" }
}`}
                 </div>
               </div>
             </div>
           </div>
         )}
         
         <div className="p-4 bg-slate-950 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
           <span>Autogenerated by Tech Agent (v2.4)</span>
           <button className="flex items-center gap-1 hover:text-white transition"><Maximize2 className="w-3 h-3" /> Full Screen</button>
         </div>
      </div>
    </div>
  );
};

export default Engineering;