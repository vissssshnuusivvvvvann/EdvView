import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, AlertCircle, Clock, ChevronLeft, ChevronRight, MessageSquare, Megaphone, Calendar as CalendarIcon, Info } from 'lucide-react';
import { Student, Notice, TabType } from '../types';

interface ViewDashboardProps {
  students: Student[];
  notices: Notice[];
  setActiveTab: (tab: TabType) => void;
  pendingGradesCount: number;
  unreadCount: number;
}

export default function ViewDashboard({ 
  students, 
  notices, 
  setActiveTab, 
  pendingGradesCount, 
  unreadCount 
}: ViewDashboardProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [activeLectureStatus, setActiveLectureStatus] = useState<string>('Join Lecture');
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<number>(9); // 9 for October (0-indexed normally, let's keep simple index for representation)
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  // Stats
  const activeClasses = 8;
  
  // Custom expandable notification drawer handler
  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(selectedNotice?.id === notice.id ? null : notice);
  };

  const handleJoinLecture = () => {
    if (joinedRoom) {
      setJoinedRoom(false);
      setActiveLectureStatus('Join Lecture');
      return;
    }
    setActiveLectureStatus('Connecting...');
    setTimeout(() => {
      setActiveLectureStatus('In Session • Leave');
      setJoinedRoom(true);
    }, 1000);
  };

  // Static calendar days representing October 2026. October starting on a Thursday (1st)
  // 1 to 31
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const blankDays = [28, 29, 30]; // previous month placeholders

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <section className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-2 tracking-tight"
        >
          Welcome back, Dr. Aris.
        </motion.h2>
        <p className="text-sm md:text-base text-blue-450 font-light">
          Your academic overview for Monday, October 24th, 2026.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Quick Stats Section (Col 1-8) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Active Classes Card */}
          <motion.div 
            whileHover={{ y: -4, borderColor: '#3b82f6' }}
            onClick={() => setActiveTab('attendance')}
            className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between rounded-xl cursor-pointer group transition-all duration-300 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-500">Active Classes</span>
              <LayoutGrid className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="mt-8">
              <span className="text-5xl font-mono font-medium tracking-tighter text-blue-300 group-hover:text-blue-400 transition-colors">08</span>
              <p className="text-[11px] text-blue-400 mt-2 font-light">+2 from last week</p>
            </div>
          </motion.div>

          {/* Pending Grades Card */}
          <motion.div 
            whileHover={{ y: -4, borderColor: '#3b82f6' }}
            onClick={() => setActiveTab('grades')}
            className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between rounded-xl cursor-pointer group transition-all duration-300 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-500">Pending Grades</span>
              <AlertCircle className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="mt-8">
              <span className="text-5xl font-mono font-medium tracking-tighter text-blue-300 group-hover:text-blue-400 transition-colors">{pendingGradesCount}</span>
              <p className="text-[11px] text-blue-400 mt-2 font-medium">Due in 48 hours</p>
            </div>
          </motion.div>

          {/* Messages Card */}
          <motion.div 
            whileHover={{ y: -4, borderColor: '#3b82f6' }}
            onClick={() => setActiveTab('messages')}
            className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between rounded-xl cursor-pointer group transition-all duration-300 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-500">Messages</span>
              <MessageSquare className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="mt-8">
              <span className="text-5xl font-mono font-medium tracking-tighter text-blue-300 group-hover:text-blue-400 transition-colors">{unreadCount}</span>
              <p className="text-[11px] text-blue-400 mt-2 font-light">Unread direct messages</p>
            </div>
          </motion.div>
        </div>

        {/* Next Session Preview (Col 9-12) */}
        <div className="md:col-span-4 bg-slate-950 border border-blue-950 p-6 flex flex-col relative overflow-hidden rounded-xl group transition-all duration-300 shadow-2xl">
          <div className="absolute top-0 left-0 w-[4px] h-full bg-blue-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-500 mb-8 block">Next Session</span>
          
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-blue-300 group-hover:text-blue-400 transition-colors">Advanced Algorithms</h3>
              <p className="text-[13px] font-medium text-blue-400 mt-1">CS-402 • Room 304B</p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-blue-400 opacity-90">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-[13px] font-mono tracking-tight font-medium">14:00 — 15:30</span>
            </div>

            {joinedRoom && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-950/55 border border-blue-900 p-3 rounded-lg text-xs font-mono text-blue-300 mt-2 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Lecture connected successfully on Port 3000.</span>
              </motion.div>
            )}

            <button 
              onClick={handleJoinLecture}
              className={`mt-4 w-full text-[11px] font-bold tracking-widest uppercase py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer ${
                joinedRoom 
                  ? 'bg-slate-900 text-blue-300 hover:bg-slate-800 border border-blue-950/70' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {activeLectureStatus}
            </button>
          </div>
        </div>

        {/* Notice Board (Col 1-7) */}
        <div className="md:col-span-7 bg-slate-950 border border-blue-950 p-6 rounded-xl shadow-2xl">
          <div className="flex justify-between items-baseline mb-6 border-b border-blue-950 pb-3">
            <h3 className="text-lg font-bold tracking-tight text-blue-300 flex items-center gap-2">
              Notice Board
            </h3>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 cursor-pointer hover:text-blue-300 transition-colors">
              Stay Informed
            </span>
          </div>

          <div className="divide-y divide-blue-950/50">
            {notices.map((notice) => {
              const isExpanded = selectedNotice?.id === notice.id;
              return (
                <div 
                  key={notice.id} 
                  onClick={() => handleNoticeClick(notice)}
                  className="py-4 hover:bg-slate-900/30 px-2 rounded-lg transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2 text-xs">
                    <span className="font-mono text-blue-500 font-medium">{notice.date}</span>
                    <span className="px-2 py-0.5 border border-blue-900/50 text-blue-400 rounded text-[9px] uppercase tracking-widest bg-slate-900/40 font-bold">
                      {notice.category}
                    </span>
                  </div>
                  <h4 className="text-[14px] text-blue-300 font-semibold group-hover:translate-x-1 hover:text-blue-400 transition-transform duration-300 flex items-center gap-2">
                    {notice.title}
                  </h4>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] text-blue-400 font-light leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-blue-900/40">
                          {notice.description}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="text-[13px] text-blue-400/80 font-light leading-relaxed truncate mt-1">
                        {notice.description}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Calendar (Col 8-12) */}
        <div className="md:col-span-5 bg-slate-950 border border-blue-950 p-6 rounded-xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold tracking-tight text-blue-300 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-400" />
              Calendar
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentCalendarMonth((m) => Math.max(0, m - 1))}
                disabled={currentCalendarMonth === 9}
                className="p-1 hover:bg-slate-900 rounded text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentCalendarMonth((m) => Math.min(11, m + 1))}
                disabled={currentCalendarMonth === 9}
                className="p-1 hover:bg-slate-900 rounded text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center font-bold text-xs tracking-wider text-blue-400 mb-4 select-none">
            {currentCalendarMonth === 9 ? 'OCTOBER 2026' : currentCalendarMonth === 8 ? 'SEPTEMBER 2026' : 'NOVEMBER 2026'}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-3 select-none">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className="text-[9px] font-extrabold text-blue-500 uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {blankDays.map((val) => (
              <div key={`prev-${val}`} className="p-2 text-blue-900 text-[11px] font-medium font-mono">{val}</div>
            ))}
            {calendarDays.map((day) => {
              const isToday = day === 24;
              const dayOfWeek = (day - 1 + blankDays.length) % 7; // 5 for Saturday, 6 for Sunday
              const isSaturday = dayOfWeek === 5;
              const isSunday = dayOfWeek === 6;

              let styleClasses = 'text-blue-400 hover:bg-slate-900 font-medium';
              if (isToday) {
                styleClasses = 'bg-white text-slate-950 font-bold shadow-lg shadow-white/15';
              } else if (isSaturday) {
                styleClasses = 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.9)] hover:bg-green-950/40 font-extrabold hover:text-green-300';
              } else if (isSunday) {
                styleClasses = 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] hover:bg-red-950/40 font-extrabold hover:text-red-300';
              }

              return (
                <div 
                  key={day} 
                  className={`p-2 text-[11px] rounded-md font-mono transition-all duration-200 cursor-pointer ${styleClasses}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-blue-950">
            <div className="flex items-start gap-4 p-3 rounded-lg bg-slate-900/50 border border-blue-950/80">
              <div className="w-1.5 h-1.5 bg-blue-500 mt-1.5 rounded-full ring-4 ring-blue-950"></div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-blue-300 tracking-tight">Departmental Sync</p>
                <p className="text-[11px] text-blue-450 font-light mt-0.5">09:00 AM • Dean's Boardroom</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
