import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import DocViewer from './components/DocViewer';
import Roadmap from './pages/Roadmap';
import Engineering from './pages/Engineering';
import ControlRoom from './pages/ControlRoom';
import SprintPlanner from './pages/SprintPlanner';
import ReleaseHub from './pages/ReleaseHub';
import Analytics from './pages/Analytics';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import UxSystem from './pages/UxSystem';
import { GeneratedDoc, ProjectInputs, DocType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDoc | null>(null);
  const [recentDocs, setRecentDocs] = useState<any[]>([]);
  const [templateData, setTemplateData] = useState<(Partial<ProjectInputs> & { docType?: DocType }) | undefined>(undefined);

  const handleDocGenerated = (doc: GeneratedDoc) => {
    setGeneratedDoc(doc);
    setRecentDocs([doc, ...recentDocs]);
    setCurrentView('editor');
  };

  const handleTemplateSelect = (data: Partial<ProjectInputs> & { docType: DocType }) => {
    setTemplateData(data);
    setCurrentView('generator');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} recentDocs={recentDocs} />;
      case 'control-room':
        return <ControlRoom />;
      case 'generator':
        return <Generator onSuccess={handleDocGenerated} initialData={templateData} />;
      case 'editor':
        return generatedDoc ? (
          <DocViewer 
            doc={generatedDoc} 
            onUpdate={(content) => setGeneratedDoc({...generatedDoc, content})} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
             <div className="p-6 rounded-full bg-white/5 animate-pulse">
               <span className="text-4xl">📄</span>
             </div>
             <p>No document selected. Start by creating one.</p>
             <button onClick={() => setCurrentView('generator')} className="text-blue-400 hover:text-blue-300 font-medium">Create New Doc</button>
          </div>
        );
      case 'sprint':
        return <SprintPlanner />;
      case 'roadmap':
        return <Roadmap />;
      case 'engineering':
        return <Engineering />;
      case 'ux-system':
        return <UxSystem />;
      case 'release':
        return <ReleaseHub />;
      case 'analytics':
        return <Analytics />;
      case 'templates':
        return <Templates onSelect={handleTemplateSelect} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
              <p className="text-slate-500">This module is under development by our Tech Agents.</p>
              <button onClick={() => setCurrentView('dashboard')} className="mt-4 text-blue-400 hover:underline">Back to Dashboard</button>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={(view) => {
      // Clear template data if navigating away from generator explicitly, 
      // but if we are going to generator from templates, we want to keep it.
      if (view !== 'generator') setTemplateData(undefined);
      setCurrentView(view);
    }}>
      {renderView()}
    </Layout>
  );
}