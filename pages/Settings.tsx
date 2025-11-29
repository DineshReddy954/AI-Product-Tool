import React, { useState } from 'react';
import { User, Bell, Shield, Wallet, Link, Monitor, Moon, Sun, Key } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Monitor },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: Wallet },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === 'general' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Appearance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 rounded-xl border border-blue-500 bg-blue-900/20 flex flex-col items-center gap-2">
                    <Moon className="w-6 h-6 text-blue-400" />
                    <span className="text-sm font-medium text-white">Dark</span>
                  </button>
                  <button className="p-4 rounded-xl border border-white/10 bg-slate-800/50 flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                    <Sun className="w-6 h-6 text-slate-400" />
                    <span className="text-sm font-medium text-slate-400">Light</span>
                  </button>
                  <button className="p-4 rounded-xl border border-white/10 bg-slate-800/50 flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                    <Monitor className="w-6 h-6 text-slate-400" />
                    <span className="text-sm font-medium text-slate-400">System</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Workspace Language</h3>
                 <select className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white">
                   <option>English (US)</option>
                   <option>Spanish</option>
                   <option>French</option>
                 </select>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
             <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
               <div className="flex items-center gap-6">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 border-4 border-slate-900 shadow-xl"></div>
                 <div>
                   <h3 className="text-xl font-bold text-white">Alex Product</h3>
                   <p className="text-slate-400">Senior Product Manager</p>
                   <button className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition">Change Avatar</button>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                   <input type="text" value="Alex Product" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white" />
                 </div>
                 <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                   <input type="email" value="alex@example.com" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white" />
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'integrations' && (
             <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
               {[
                 { name: 'Jira Software', desc: 'Sync tickets and sprints', connected: true },
                 { name: 'Slack', desc: 'Agent notifications in channels', connected: true },
                 { name: 'GitHub', desc: 'Link PRs to features', connected: false },
                 { name: 'Figma', desc: 'Embed wireframes', connected: false },
               ].map((app, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                       <Link className="w-5 h-5 text-slate-300" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">{app.name}</h4>
                       <p className="text-xs text-slate-400">{app.desc}</p>
                     </div>
                   </div>
                   <button className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                     app.connected 
                     ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                     : 'bg-white/10 text-white hover:bg-white/20'
                   }`}>
                     {app.connected ? 'Connected' : 'Connect'}
                   </button>
                 </div>
               ))}
             </div>
          )}

           {activeTab === 'security' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
               <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
                  <Key className="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-400">API Key Configuration</h4>
                    <p className="text-sm text-red-200/70 mt-1">Your Gemini API key is managed via environment variables for security.</p>
                  </div>
               </div>
               
               <div>
                  <h3 className="text-lg font-bold text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-white font-medium">Authenticator App</p>
                      <p className="text-xs text-slate-400">Use Google Authenticator or Authy</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
          )}
          
          {activeTab === 'billing' && (
             <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 text-center py-12">
                <Wallet className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Enterprise Plan</h3>
                <p className="text-slate-400">Your organization is on the ProductOS Enterprise Tier.</p>
                <button className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">Manage Subscription</button>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;