import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  LayoutGrid, 
  Calendar, 
  Award, 
  Mail, 
  Users, 
  HelpCircle, 
  X,
  Sparkles,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount: number;
}

export default function Header({ activeTab, setActiveTab, unreadCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOptions: { tab: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    { 
      tab: 'dashboard', 
      label: 'Dash', 
      icon: <LayoutGrid className="w-5 h-5 text-blue-400" />,
      desc: 'School overview and metrics console' 
    },
    { 
      tab: 'attendance', 
      label: 'Logs', 
      icon: <Calendar className="w-5 h-5 text-emerald-400" />,
      desc: 'Student rosters and roll-call histories' 
    },
    { 
      tab: 'grades', 
      label: 'Grades', 
      icon: <Award className="w-5 h-5 text-amber-400" />,
      desc: 'Academic scoring stack and distribution' 
    },
    { 
      tab: 'messages', 
      label: 'Inbox', 
      icon: <Mail className="w-5 h-5 text-rose-400" />,
      desc: 'Secure faculty messaging threads' 
    },
    { 
      tab: 'contacts', 
      label: 'Contacts', 
      icon: <Users className="w-5 h-5 text-pink-400" />,
      desc: 'Staff directory & dynamic rosters' 
    },
    { 
      tab: 'faq', 
      label: 'FAQ', 
      icon: <HelpCircle className="w-5 h-5 text-violet-400" />,
      desc: 'System guidelines & help directives' 
    },
  ];

  return (
    <>
      <header className="w-full top-0 sticky bg-slate-950/95 border-b border-blue-950/80 z-50 flex justify-between items-center px-4 md:px-12 h-16 backdrop-blur-md shadow-lg select-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 text-blue-400 hover:text-sky-300 transition-colors cursor-pointer rounded-lg hover:bg-slate-900" 
            aria-label="Open directory menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 
            className="text-blue-300 hover:text-blue-200 cursor-pointer font-bold tracking-tight text-xl transition-all flex items-center gap-2"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-[0_0_10px_rgba(37,99,235,0.4)]">E</div>
            <span>EdView</span>
          </h1>
        </div>

        <div className="flex items-center gap-6 h-full">
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8 h-full">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center px-1 border-b-2 ${activeTab === 'dashboard' ? 'text-blue-400 border-blue-400 font-extrabold' : 'text-blue-500 hover:text-blue-300 border-transparent hover:border-blue-900'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('attendance')} 
              className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center px-1 border-b-2 ${activeTab === 'attendance' ? 'text-blue-400 border-blue-400 font-extrabold' : 'text-blue-500 hover:text-blue-300 border-transparent hover:border-blue-900'}`}
            >
              Roster
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center px-1 border-b-2 ${activeTab === 'messages' ? 'text-blue-400 border-blue-400 font-extrabold' : 'text-blue-500 hover:text-blue-300 border-transparent hover:border-blue-900'}`}
            >
              Inbox
            </button>
            <button 
              onClick={() => setActiveTab('grades')} 
              className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center px-1 border-b-2 ${activeTab === 'grades' ? 'text-blue-400 border-blue-400 font-extrabold' : 'text-blue-500 hover:text-blue-300 border-transparent hover:border-blue-900'}`}
            >
              Academic Stack
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`relative cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-slate-900 ${
                activeTab === 'notifications' ? 'text-blue-300 bg-slate-900 ring-1 ring-blue-500/30' : 'text-blue-400 hover:text-sky-300'
              }`}
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-8 h-8 rounded-full border overflow-hidden bg-slate-900 group cursor-pointer transition-all duration-300 hover:scale-110 shadow-md ${
                activeTab === 'profile' ? 'border-blue-400 ring-2 ring-blue-500/40' : 'border-blue-900/50 hover:border-blue-500'
              }`}
              aria-label="User Profile"
            >
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGKb1lucsp-2IaE9J6Xfn_fpxP7fj1ulXFctmPW-HA52MgW29h7bt3XtLbNBtwxfYnO_9QxFWjYOeLZhNBYB4rXxoXZtKiLeQQo_yafAzP9oKXIdJuzLRYrlwjSv2eLEAbLIomE5cxwSYgq8QMH7NhAuHws8zKhJen1dOB-XR0NzWIppix6Fe8m0pEWxSpP4-Nu4OGIxyhwAsZS_3IXSe4AB-5Or92juMblZ0v9ooxoJZQVM9-P7n2LFn2r8dGn4NIxLwmJUxWm-U"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Capture filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 h-full w-80 md:w-96 bg-slate-950 border-r border-blue-955 z-50 shadow-2xl p-6 flex flex-col justify-between select-none overflow-y-auto scrollbar-thin scrollbar-thumb-blue-950/80 scrollbar-track-slate-950"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Header Info */}
                  <div className="flex items-center justify-between pb-5 border-b border-blue-955/40 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm font-sans shadow-[0_0_12px_rgba(37,99,235,0.5)]">E</div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white leading-none">EdView Navigation</h3>
                        <p className="text-[9px] text-blue-500 font-mono tracking-wider mt-0.5 font-bold">DIRECTORY HUB v2.4</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1.5 rounded-lg border border-blue-955 bg-slate-900/60 text-blue-400 hover:text-white hover:border-blue-500 hover:bg-slate-900 transition-all cursor-pointer"
                      aria-label="Close menu drawer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Navigation Options List */}
                  <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-[0.2em] block mb-3.5 pl-1.5">Operational Indexes</span>
                  
                  <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-955/70 scrollbar-track-transparent">
                    {menuOptions.map((opt) => {
                      const isSelected = activeTab === opt.tab || (opt.tab === 'attendance' && activeTab === 'attendance');
                      return (
                        <button
                          key={opt.tab}
                          onClick={() => {
                            setActiveTab(opt.tab);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-4 transition-all duration-300 cursor-pointer group hover:translate-x-1.5 ${
                            isSelected
                              ? 'bg-blue-950/40 border-blue-500 text-blue-250 shadow-lg shadow-blue-950/25 ring-1 ring-blue-500/10'
                              : 'bg-slate-950 border-blue-955/40 text-blue-405 hover:border-blue-900 hover:bg-slate-900/40'
                          }`}
                        >
                          <div className={`p-2 rounded-lg bg-slate-900 border transition-transform duration-200 group-hover:scale-110 ${
                            isSelected ? 'border-blue-800' : 'border-blue-955'
                          }`}>
                            {opt.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-black tracking-wide ${isSelected ? 'text-blue-105' : 'text-blue-300'}`}>
                              {opt.label}
                            </p>
                            <p className="text-[10px] text-blue-500/80 font-semibold truncate mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-blue-955/40 pt-5 mt-6 space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-blue-600 px-1">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                      <span>AI Cloud Ledger</span>
                    </div>
                    <span className="text-[8px] uppercase px-1.5 py-0.5 bg-blue-950 border border-blue-900/40 rounded text-blue-300">Active Sec</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900/45 border border-blue-955 p-3 rounded-xl select-none">
                    <div className="p-1.5 bg-blue-950 border border-blue-900/50 rounded-lg text-blue-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-300 leading-tight">Secured Token Auth</p>
                      <p className="text-[9px] text-blue-550 font-mono font-bold leading-none mt-0.5">SHA-256 TLS Core</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
