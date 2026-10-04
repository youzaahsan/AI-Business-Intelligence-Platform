import React, { useState } from 'react';
import { Search, Bell, Sun, ChevronDown, Menu, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenMobileSidebar?: () => void;
  onSearchSelect?: (query: string) => void;
  onQuickRunHero?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  setUserRole,
  onOpenMobileSidebar,
  onSearchSelect,
  onQuickRunHero
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() && onSearchSelect) {
      onSearchSelect(searchValue.trim());
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile menu toggle + Global search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Matches Reference Screenshot) */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search anything... (reports, datasets, agents, etc.)"
            className="w-full pl-9 pr-12 py-2 bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-[10px] text-slate-400 bg-white border border-slate-200/80 px-1.5 py-0.5 rounded font-mono font-medium shadow-2xs">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Diagnostic Launch (clean minimal badge/button) */}
        {onQuickRunHero && (
          <button
            onClick={onQuickRunHero}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100/80 text-blue-700 border border-blue-200/60 text-xs font-medium transition cursor-pointer"
            title="Execute Autonomous Multi-Agent Pipeline"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Multi-Agent Run</span>
          </button>
        )}

        {/* Sun / Theme Icon */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          title="Light Theme Active"
        >
          <Sun className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </button>

        {/* Notifications Bell with '1' badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative"
            title="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              1
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>System Notifications</span>
                <span className="text-[10px] text-blue-600 font-medium">Mark all read</span>
              </div>
              <div className="py-2.5 space-y-2">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/80 space-y-1">
                  <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                    <span>Q3 September Profit Alert</span>
                    <span className="text-[10px] text-slate-400">10m ago</span>
                  </div>
                  <p className="text-[11.5px] text-slate-600">
                    September net profit contracted by -29.3%. Multi-agent diagnosis ready for review.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Block (Matches Reference Screenshot) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200/80 hover:opacity-90 transition cursor-pointer"
          >
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center overflow-hidden border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                alt="Ahsan Khan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback avatar
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span>AK</span>
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-[13px] font-semibold text-slate-900 leading-tight">
                Ahsan Khan
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                {userRole}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Role Switcher Menu */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-100 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Select Active Role
              </div>
              {(['Admin', 'Manager', 'Analyst', 'User'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    setShowRoleMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{role}</span>
                  </div>
                  {userRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
