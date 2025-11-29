import React, { useState } from 'react';
import { Users, Map, Layout, Palette, Download, Plus, MoveRight, Smile, Frown, Meh } from 'lucide-react';

const UxSystem = () => {
  const [activeTab, setActiveTab] = useState<'personas' | 'journeys' | 'wireframes' | 'design'>('personas');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">UX System</h1>
          <p className="text-slate-400">Manage personas, user journeys, wireframes, and design standards.</p>
        </div>
         <div className="flex gap-3">
           <button className="px-4 py-2 border border-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/5 flex items-center gap-2">
             <Plus className="w-4 h-4" /> New Artifact
           </button>
           <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-purple-500/20">
             <Download className="w-4 h-4" /> Export to Figma
          </button>
         </div>
      </div>

      {/* Tab Nav */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-1">
        {[
          { id: 'personas', label: 'Personas', icon: Users },
          { id: 'journeys', label: 'Journey Maps', icon: Map },
          { id: 'wireframes', label: 'Wireframes', icon: Layout },
          { id: 'design', label: 'Design System', icon: Palette },
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

      <div className="min-h-[600px] flex flex-col">
         
         {/* Personas Tab */}
         {activeTab === 'personas' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
              {[
                { name: 'Sarah Strategy', role: 'Product Manager', age: 34, quote: "I need to align stakeholders quickly.", color: 'bg-blue-500' },
                { name: 'Devin Dev', role: 'Senior Engineer', age: 29, quote: "Give me clear specs, not vague ideas.", color: 'bg-emerald-500' },
                { name: 'Exec Eric', role: 'VP of Product', age: 45, quote: "Show me the ROI and roadmap impact.", color: 'bg-purple-500' },
              ].map((p, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition group">
                   <div className="flex items-center gap-4 mb-6">
                     <div className={`w-16 h-16 rounded-full ${p.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                       {p.name.charAt(0)}
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white">{p.name}</h3>
                       <p className="text-sm text-slate-400">{p.role} • {p.age}y</p>
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-slate-300">
                       "{p.quote}"
                     </div>
                     
                     <div>
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Goals</h4>
                       <ul className="text-sm text-slate-300 space-y-1">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Increase team velocity</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Reduce documentation drift</li>
                       </ul>
                     </div>

                     <div>
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frustrations</h4>
                       <ul className="text-sm text-slate-300 space-y-1">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> Outdated Jira tickets</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> Misaligned designs</li>
                       </ul>
                     </div>
                   </div>
                </div>
              ))}
              
              <button className="glass-panel rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition p-6 min-h-[300px]">
                <Plus className="w-12 h-12 mb-4 opacity-50" />
                <span className="font-medium">Generate New Persona</span>
              </button>
           </div>
         )}

         {/* Journeys Tab */}
         {activeTab === 'journeys' && (
           <div className="glass-panel p-8 rounded-2xl border border-white/10 animate-in slide-in-from-bottom-2 duration-500 overflow-x-auto">
              <h3 className="text-xl font-bold text-white mb-8">User Journey: "Creating a New Project"</h3>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded opacity-20"></div>

                <div className="flex gap-8 min-w-[800px]">
                  {[
                    { step: 'Discovery', action: 'User lands on dashboard', emotion: 'neutral' },
                    { step: 'Intent', action: 'Clicks "New Project"', emotion: 'happy' },
                    { step: 'Input', action: 'Fills out project details', emotion: 'neutral' },
                    { step: 'Generation', action: 'Waits for AI Agents', emotion: 'neutral' },
                    { step: 'Success', action: 'Views generated PRD', emotion: 'happy' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 relative">
                       <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10 relative mb-4">
                         <span className="text-xl font-bold text-slate-500">{i + 1}</span>
                       </div>
                       
                       <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition">
                         <h4 className="font-bold text-white mb-1">{s.step}</h4>
                         <p className="text-xs text-slate-400 mb-3">{s.action}</p>
                         <div className="flex justify-center">
                           {s.emotion === 'happy' ? <Smile className="w-5 h-5 text-emerald-400" /> : 
                            s.emotion === 'neutral' ? <Meh className="w-5 h-5 text-amber-400" /> : 
                            <Frown className="w-5 h-5 text-red-400" />}
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
         )}

         {/* Wireframes Tab */}
         {activeTab === 'wireframes' && (
           <div className="glass-panel p-1 rounded-2xl border border-white/10 min-h-[500px] animate-in slide-in-from-bottom-2 duration-500 flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-slate-500">Auto-Generated Wireframe v1.0</span>
                <div className="w-16"></div>
              </div>
              
              <div className="flex-1 bg-slate-900/50 p-8 flex justify-center items-center">
                 {/* Mock Wireframe */}
                 <div className="w-[375px] h-[667px] bg-white rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
                    {/* Header */}
                    <div className="h-16 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4">
                      <div className="w-6 h-6 bg-slate-300 rounded"></div>
                      <div className="w-24 h-4 bg-slate-300 rounded"></div>
                      <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                    </div>
                    {/* Hero */}
                    <div className="h-48 bg-slate-50 flex items-center justify-center flex-col gap-2 p-6">
                       <div className="w-full h-4 bg-slate-200 rounded"></div>
                       <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                       <div className="mt-4 w-32 h-10 bg-blue-500 rounded-lg opacity-50"></div>
                    </div>
                    {/* Grid */}
                    <div className="p-4 grid grid-cols-2 gap-4">
                       <div className="aspect-square bg-slate-100 rounded-lg"></div>
                       <div className="aspect-square bg-slate-100 rounded-lg"></div>
                       <div className="aspect-square bg-slate-100 rounded-lg"></div>
                       <div className="aspect-square bg-slate-100 rounded-lg"></div>
                    </div>
                    
                    {/* Floating Action */}
                    <div className="absolute bottom-6 right-6 w-14 h-14 bg-purple-500 rounded-full shadow-lg opacity-50"></div>
                 </div>
              </div>
           </div>
         )}

         {/* Design System Tab */}
         {activeTab === 'design' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
              {/* Colors */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                 <h3 className="text-lg font-bold text-white mb-4">Color Palette</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      { n: 'Primary Blue', c: 'bg-blue-600', hex: '#2563EB' },
                      { n: 'Secondary Purple', c: 'bg-purple-600', hex: '#9333EA' },
                      { n: 'Success Emerald', c: 'bg-emerald-500', hex: '#10B981' },
                      { n: 'Warning Amber', c: 'bg-amber-500', hex: '#F59E0B' },
                      { n: 'Surface Dark', c: 'bg-slate-900', hex: '#0F172A' },
                      { n: 'Text Slate', c: 'bg-slate-400', hex: '#94A3B8' },
                    ].map((swatch, i) => (
                      <div key={i} className="space-y-2">
                        <div className={`h-20 rounded-xl ${swatch.c} shadow-lg border border-white/5`}></div>
                        <div>
                          <p className="text-sm font-bold text-white">{swatch.n}</p>
                          <p className="text-xs text-slate-500 font-mono">{swatch.hex}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Typography */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                 <h3 className="text-lg font-bold text-white mb-4">Typography</h3>
                 <div className="space-y-4">
                    <div className="flex items-baseline gap-8">
                       <span className="text-xs text-slate-500 w-20">Display</span>
                       <h1 className="text-4xl font-bold text-white">Inter Display Bold</h1>
                    </div>
                    <div className="flex items-baseline gap-8">
                       <span className="text-xs text-slate-500 w-20">Heading 2</span>
                       <h2 className="text-2xl font-bold text-white">Inter Display Bold</h2>
                    </div>
                    <div className="flex items-baseline gap-8">
                       <span className="text-xs text-slate-500 w-20">Body</span>
                       <p className="text-base text-slate-300">Inter Regular. The quick brown fox jumps over the lazy dog.</p>
                    </div>
                    <div className="flex items-baseline gap-8">
                       <span className="text-xs text-slate-500 w-20">Monospace</span>
                       <p className="text-sm font-mono text-slate-400">JetBrains Mono. const ui = 'modern';</p>
                    </div>
                 </div>
              </div>
            </div>
         )}

      </div>
    </div>
  );
};

export default UxSystem;