import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle, Sparkles, Loader } from 'lucide-react';
import { AgentType, AgentMessage } from '../types';
import { generateAgentDiscussion } from '../services/geminiService';

const AgentAvatar = ({ type }: { type: AgentType }) => {
  const colors = {
    [AgentType.PM]: 'bg-blue-600',
    [AgentType.UX]: 'bg-purple-600',
    [AgentType.TECH]: 'bg-emerald-600',
    [AgentType.QA]: 'bg-pink-600',
    [AgentType.RELEASE]: 'bg-orange-600',
    [AgentType.ANALYST]: 'bg-cyan-600',
    [AgentType.RESEARCHER]: 'bg-indigo-600',
    [AgentType.WRITER]: 'bg-slate-600',
  };
  
  const initials = type.split(' ')[0].substring(0, 2).toUpperCase();

  return (
    <div className={`w-8 h-8 rounded-lg ${colors[type] || 'bg-slate-600'} flex items-center justify-center shadow-lg border border-white/10 text-xs font-bold text-white shrink-0`}>
      {initials}
    </div>
  );
};

const ControlRoom = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: AgentMessage = {
      id: Date.now().toString(),
      agent: 'User' as any,
      message: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    try {
      const agentResponses = await generateAgentDiscussion(input);
      
      // Simulate typing delay for each agent
      for (const response of agentResponses) {
        await new Promise(r => setTimeout(r, 1500));
        setMessages(prev => [...prev, response]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold text-white">Agent Control Room</h1>
           <p className="text-slate-400">Collaborate with your AI product team in real-time.</p>
         </div>
         <div className="flex gap-2">
           {Object.values(AgentType).slice(0, 4).map(agent => (
             <div key={agent} className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-slate-300">
               <div className={`w-2 h-2 rounded-full ${agent.includes('PM') ? 'bg-blue-500' : 'bg-green-500'} animate-pulse`}></div>
               {agent.split(' ')[0]}
             </div>
           ))}
         </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          {messages.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 opacity-50 pointer-events-none">
              <Bot className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">State your goal...</p>
              <p className="text-sm">e.g., "Plan a new referral system feature"</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.agent === 'User' as any ? 'flex-row-reverse' : ''}`}>
              {msg.agent !== 'User' as any && <AgentAvatar type={msg.agent} />}
              
              <div className={`max-w-[70%] p-4 rounded-2xl ${
                msg.agent === 'User' as any 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-none'
              }`}>
                {msg.agent !== 'User' as any && (
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">{msg.agent}</p>
                )}
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-4 items-center">
               <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                 <Loader className="w-4 h-4 animate-spin text-slate-500" />
               </div>
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-slate-500 rounded-full agent-typing-dot"></div>
                 <div className="w-2 h-2 bg-slate-500 rounded-full agent-typing-dot"></div>
                 <div className="w-2 h-2 bg-slate-500 rounded-full agent-typing-dot"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Give a task to the team..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlRoom;