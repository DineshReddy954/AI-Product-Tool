import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  Settings, 
  Menu, 
  Sparkles, 
  Network,
  Users,
  Map,
  MessageSquare,
  Kanban,
  Rocket,
  BarChart3,
  Cpu
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'control-room', label: 'Agent Control Room', icon: MessageSquare }, 
    { id: 'generator', label: 'Doc Generator', icon: Sparkles },
    { id: 'sprint', label: 'Sprint Planner', icon: Kanban }, 
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'engineering', label: 'Engineering Hub', icon: Cpu }, 
    { id: 'ux-system', label: 'UX System', icon: Users },
    { id: 'release', label: 'Release Center', icon: Rocket }, 
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }, 
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-slate-300 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r border-white/10 transition-transform duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        xl:relative xl:translate-x-0 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">ProductOS</h1>
            <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-widest">Enterprise AI</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workspace</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/10 border-l-2 border-blue-500"></div>
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400 transition-colors'}`} />
                <span className="font-medium relative z-10 text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 border-2 border-black"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Alex Product</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative bg-background">
        {/* Mobile Header */}
        <header className="xl:hidden flex items-center justify-between p-4 border-b border-white/10 glass-panel z-40">
          <div className="flex items-center gap-2">
            <Bot className="text-blue-500 w-6 h-6" />
            <span className="font-bold text-white">ProductOS</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
            <Menu />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full transform -translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full transform translate-y-1/4 translate-x-1/4"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;