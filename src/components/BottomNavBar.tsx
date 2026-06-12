import React from 'react';
import { LayoutGrid, Calendar, Award, Mail } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount: number;
}

export default function BottomNavBar({ activeTab, setActiveTab, unreadCount }: BottomNavBarProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-slate-950/95 backdrop-blur-xl border-t border-blue-950 px-6 shadow-2xl">
      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center gap-1.5 px-4 h-full relative transition-colors ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-blue-500/70 hover:text-blue-300'}`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Dash</span>
        {activeTab === 'dashboard' && (
          <div className="absolute bottom-1 left-1/4 w-1/2 h-[3px] bg-blue-500 rounded-full" />
        )}
      </button>

      <button 
        onClick={() => setActiveTab('attendance')}
        className={`flex flex-col items-center justify-center gap-1.5 px-4 h-full relative transition-colors ${activeTab === 'attendance' ? 'text-blue-400' : 'text-blue-500/70 hover:text-blue-300'}`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Logs</span>
        {activeTab === 'attendance' && (
          <div className="absolute bottom-1 left-1/4 w-1/2 h-[3px] bg-blue-500 rounded-full" />
        )}
      </button>

      <button 
        onClick={() => setActiveTab('grades')}
        className={`flex flex-col items-center justify-center gap-1.5 px-4 h-full relative transition-colors ${activeTab === 'grades' ? 'text-blue-400' : 'text-blue-500/70 hover:text-blue-300'}`}
      >
        <Award className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Grades</span>
        {activeTab === 'grades' && (
          <div className="absolute bottom-1 left-1/4 w-1/2 h-[3px] bg-blue-500 rounded-full" />
        )}
      </button>

      <button 
        onClick={() => setActiveTab('messages')}
        className={`flex flex-col items-center justify-center gap-1.5 px-4 h-full relative transition-colors ${activeTab === 'messages' ? 'text-blue-400' : 'text-blue-500/70 hover:text-blue-300'}`}
      >
        <div className="relative">
          <Mail className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase">Inbox</span>
        {activeTab === 'messages' && (
          <div className="absolute bottom-1 left-1/4 w-1/2 h-[3px] bg-blue-500 rounded-full" />
        )}
      </button>
    </nav>
  );
}
