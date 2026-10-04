import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Search,
  FileText,
  Database,
  TrendingUp,
  LineChart,
  AlertTriangle,
  Users,
  Package,
  FileSpreadsheet,
  Cpu,
  Settings,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'forecast', label: 'Forecast', icon: LineChart },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'agent-runs', label: 'Agent Runs', icon: Cpu },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            {/* Minimalist Blue Geometric Logo */}
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-slate-900 tracking-tight text-[15px] leading-tight">
                Multi-Agent AI
              </div>
              <div className="text-[11px] text-slate-500 font-normal">
                Research & BI Platform
              </div>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="pt-3 pb-2">
            <div className="border-t border-slate-100" />
          </div>

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Upgrade Card at Bottom (Matches Reference Screenshot) */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="rounded-xl bg-gradient-to-br from-indigo-50/60 to-blue-50/70 border border-indigo-100/70 p-3.5 space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900">Unlock More Power</div>
              <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                Upgrade to Pro for advanced agents, more data sources and premium features.
              </p>
            </div>
            <button
              onClick={() => handleNavClick('settings')}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
