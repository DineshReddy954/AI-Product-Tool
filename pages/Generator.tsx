import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BrainCircuit, ShieldCheck, PenTool, LayoutTemplate, Box, Loader2 } from 'lucide-react';
import { DocType, ProjectInputs, AgentType } from '../types';
import { generateDocument } from '../services/geminiService';

interface GeneratorProps {
  onSuccess: (doc: any) => void;
  initialData?: Partial<ProjectInputs> & { docType?: DocType };
}

const Generator: React.FC<GeneratorProps> = ({ onSuccess, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('');
  const [docType, setDocType] = useState<DocType>(DocType.PRD);
  const [inputs, setInputs] = useState<ProjectInputs>({
    projectName: '',
    featureName: '',
    problemStatement: '',
    businessGoal: '',
    userSegment: '',
    kpis: '',
    techConstraints: '',
  });

  useEffect(() => {
    if (initialData) {
      setInputs(prev => ({ ...prev, ...initialData }));
      if (initialData.docType) {
        setDocType(initialData.docType);
      }
    }
  }, [initialData]);

  const handleGenerate = async () => {
    if (!inputs.projectName || !inputs.problemStatement) {
      alert("Please fill in the required fields.");
      return;
    }

    setLoading(true);

    // Simulate Agent Workflow Visualization
    const agents = [AgentType.RESEARCHER, AgentType.UX, AgentType.TECH, AgentType.WRITER];
    for (const agent of agents) {
      setActiveAgent(agent);
      await new Promise(r => setTimeout(r, 800)); // Fake delay for UX
    }

    try {
      const content = await generateDocument(docType, inputs);
      onSuccess({
        id: Date.now().toString(),
        type: docType,
        title: inputs.featureName || inputs.projectName,
        content: content,
        createdAt: new Date().toISOString(),
        version: 1,
      });
    } catch (error) {
      alert("Failed to generate. Please check API Key.");
    } finally {
      setLoading(false);
      setActiveAgent('');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8 animate-in fade-in duration-500">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-4 border-purple-500 animate-spin animation-delay-200"></div>
          <div className="absolute inset-4 rounded-full border-b-4 border-pink-500 animate-spin animation-delay-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">AI Agents at Work</h2>
          <p className="text-blue-400 font-medium flex items-center justify-center gap-2">
             {activeAgent === AgentType.RESEARCHER && <LayoutTemplate className="w-4 h-4" />}
             {activeAgent === AgentType.UX && <Box className="w-4 h-4" />}
             {activeAgent === AgentType.TECH && <ShieldCheck className="w-4 h-4" />}
             {activeAgent === AgentType.WRITER && <PenTool className="w-4 h-4" />}
             {activeAgent}...
          </p>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Analyzing requirements, checking constraints, and synthesizing structured documentation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          AI Document Generator
        </h1>
        <p className="text-slate-400">Provide the context, and our multi-agent system will do the rest.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Document Type</label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value as DocType)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
            >
              {Object.values(DocType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Name</label>
              <input 
                type="text" 
                placeholder="e.g. ProductOS"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600"
                value={inputs.projectName}
                onChange={(e) => setInputs({...inputs, projectName: e.target.value})}
              />
            </div>
             <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Feature Name</label>
              <input 
                type="text" 
                placeholder="e.g. Multi-Agent Workflow"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600"
                value={inputs.featureName}
                onChange={(e) => setInputs({...inputs, featureName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Users</label>
              <input 
                type="text" 
                placeholder="e.g. Product Managers in SaaS"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600"
                value={inputs.userSegment}
                onChange={(e) => setInputs({...inputs, userSegment: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
             <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Problem Statement</label>
              <textarea 
                placeholder="What problem are we solving?"
                className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600 resize-none"
                value={inputs.problemStatement}
                onChange={(e) => setInputs({...inputs, problemStatement: e.target.value})}
              />
            </div>
             <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business Goal</label>
              <input 
                type="text" 
                placeholder="e.g. Increase user retention by 20%"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600"
                value={inputs.businessGoal}
                onChange={(e) => setInputs({...inputs, businessGoal: e.target.value})}
              />
            </div>
          </div>
          
           <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technical Constraints & Notes</label>
            <textarea 
              placeholder="e.g. Must use React, Mobile-first, GDPR compliant..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600"
              value={inputs.techConstraints}
              onChange={(e) => setInputs({...inputs, techConstraints: e.target.value})}
            />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
        >
          <Sparkles className="w-5 h-5" />
          Generate with AI Agents
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Generator;