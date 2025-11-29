import React from 'react';
import { FileText, Rocket, Code2, Users, ArrowRight, BookOpen, Target, ShieldCheck } from 'lucide-react';
import { DocType, ProjectInputs } from '../types';

interface TemplatesProps {
  onSelect: (data: Partial<ProjectInputs> & { docType: DocType }) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelect }) => {
  const templates = [
    {
      title: 'SaaS PRD (Standard)',
      desc: 'Complete requirements for B2B SaaS features.',
      icon: FileText,
      color: 'bg-blue-500',
      type: DocType.PRD,
      prefill: {
        projectName: 'SaaS Platform Feature',
        userSegment: 'Enterprise Users',
        kpis: 'Adoption Rate, Churn Reduction'
      }
    },
    {
      title: 'Mobile App Launch',
      desc: 'Go-to-market and technical specs for iOS/Android.',
      icon: Rocket,
      color: 'bg-purple-500',
      type: DocType.PRD,
      prefill: {
        projectName: 'Mobile App v1.0',
        techConstraints: 'React Native, Firebase, Offline-first'
      }
    },
    {
      title: 'API Specification',
      desc: 'Technical documentation for REST/GraphQL endpoints.',
      icon: Code2,
      color: 'bg-emerald-500',
      type: DocType.API_SPEC,
      prefill: {
        problemStatement: 'Need to expose internal data to 3rd party developers securely.',
        techConstraints: 'RESTful, OAuth2, Rate Limiting'
      }
    },
    {
      title: 'User Persona Study',
      desc: 'Deep dive into user demographics and pain points.',
      icon: Users,
      color: 'bg-pink-500',
      type: DocType.PERSONAS,
      prefill: {
        businessGoal: 'Improve User Empathy in Design Team'
      }
    },
    {
      title: 'Security Compliance',
      desc: 'Risk assessment and compliance requirements (SOC2/GDPR).',
      icon: ShieldCheck,
      color: 'bg-red-500',
      type: DocType.SRS,
      prefill: {
        projectName: 'Security Audit',
        techConstraints: 'GDPR, SOC2 Type II, Encryption at rest'
      }
    },
    {
      title: 'Agile Sprint Plan',
      desc: 'Two-week sprint structure with user stories.',
      icon: Target,
      color: 'bg-orange-500',
      type: DocType.SPRINT_PLAN,
      prefill: {
        projectName: 'Sprint 24',
        problemStatement: 'Deliver core features for Q3 roadmap.'
      }
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Document Templates</h1>
        <p className="text-slate-400">Jumpstart your documentation with industry-standard formats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t, i) => {
          const Icon = t.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden flex flex-col h-full">
              <div className={`absolute top-0 right-0 w-24 h-24 ${t.color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
              
              <div className={`w-12 h-12 rounded-xl ${t.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${t.color.replace('bg-', 'text-').replace('500', '400')}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{t.desc}</p>

              <button 
                onClick={() => onSelect({ ...t.prefill, docType: t.type })}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-white font-medium transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-900/20"
              >
                Use Template
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
        <BookOpen className="w-10 h-10 text-slate-600 mb-4" />
        <h3 className="text-lg font-bold text-white">Create Custom Template</h3>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          Enterprise plans can define custom document structures enforced by the AI Writer Agent.
        </p>
        <button className="mt-4 text-blue-400 font-bold hover:underline">Contact Sales</button>
      </div>
    </div>
  );
};

export default Templates;