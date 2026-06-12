import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, UserCheck, UserX, Clock, MoreHorizontal, UserPlus, SlidersHorizontal } from 'lucide-react';
import { Student } from '../types';

interface ViewAttendanceProps {
  students: Student[];
  onUpdateStatus: (studentId: string, newStatus: 'Present' | 'Absent' | 'Late') => void;
  onAddStudent: (student: Omit<Student, 'id'>) => void;
}

export default function ViewAttendance({ students, onUpdateStatus }: ViewAttendanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRange, setActiveRange] = useState<'week' | 'month'>('week');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeGroupFilter, setActiveGroupFilter] = useState<string>('ALL');
  const [activeStatusSwitcher, setActiveStatusSwitcher] = useState<string | null>(null);

  // Filter students based on search query AND group filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.id.includes(searchQuery) || 
                          student.classGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = activeGroupFilter === 'ALL' || student.classGroup === activeGroupFilter;
    return matchesSearch && matchesGroup;
  });

  // Pagination parameters
  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Dynamic values calculated from our actual list
  const totalInList = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const lateCount = students.filter(s => s.status === 'Late').length;
  const percentagePresent = ((presentCount + (lateCount * 0.5)) / totalInList * 100).toFixed(1);

  // Base numbers modeled on high standard values
  const displayTotalStudents = 1240 + (students.length - 10);
  const displayPresentCount = Math.round(displayTotalStudents * (Number(percentagePresent) / 100));
  const displayPresentPercent = percentagePresent;

  // Chart data
  const baseWeekData = [
    { day: 'MON', height: '88%', val: '91.2%' },
    { day: 'TUE', height: '92%', val: '92.4%' },
    { day: 'WED', height: '95%', val: '94.8%' },
    { day: 'THU', height: '98%', val: '96.2%' },
    { day: 'FRI', height: '85%', val: '86.5%' }
  ];

  const baseMonthData = [
    { day: 'WK 1', height: '94%', val: '94.1%' },
    { day: 'WK 2', height: '96%', val: '95.5%' },
    { day: 'WK 3', height: '91%', val: '91.0%' },
    { day: 'WK 4', height: '98%', val: '96.8%' },
    { day: 'WK 5', height: '93%', val: '92.9%' }
  ];

  const visibleChartData = activeRange === 'week' ? baseWeekData : baseMonthData;

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    onUpdateStatus(studentId, status);
    setActiveStatusSwitcher(null);
  };

  return (
    <div className="space-y-12">
      {/* Summary Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Stats Column */}
        <div className="md:col-span-4 grid grid-cols-1 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between rounded-xl shadow-2xl hover:border-blue-500 transition-all duration-300"
          >
            <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold">Total Students</span>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-5xl font-mono font-bold tracking-tighter text-blue-300">
                {displayTotalStudents.toLocaleString()}
              </span>
              <span className="text-emerald-400 text-xs font-bold">+12%</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between rounded-xl shadow-2xl hover:border-blue-500 transition-all duration-300"
          >
            <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold">Marked Present</span>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-5xl font-mono font-bold tracking-tighter text-blue-300">
                {displayPresentCount.toLocaleString()}
              </span>
              <span className="text-blue-400/80 text-xs font-bold">/ {displayPresentPercent}%</span>
            </div>
          </motion.div>
        </div>

        {/* Attendance Bar Chart Column */}
        <div className="md:col-span-8 bg-slate-950 border border-blue-950 p-6 rounded-xl relative overflow-hidden shadow-2xl hover:border-blue-500 transition-all duration-300">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-blue-300">Weekly Attendance</h2>
              <p className="text-sm font-medium text-blue-400 mt-1">Average rate: {percentagePresent}%</p>
            </div>
            
            <div className="flex bg-slate-900 p-1 rounded-lg border border-blue-950">
              <button 
                onClick={() => setActiveRange('week')}
                className={`px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                  activeRange === 'week' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-blue-450 hover:text-blue-300'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setActiveRange('month')}
                className={`px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                  activeRange === 'month' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-blue-450 hover:text-blue-300'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="h-44 flex items-end justify-between gap-4 md:gap-6 px-2">
            {visibleChartData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full bg-slate-900/60 relative h-32 rounded-t-lg overflow-hidden border border-blue-950/50">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: data.height }}
                    transition={{ type: 'spring', stiffness: 80, delay: index * 0.05 }}
                    className="absolute bottom-0 w-full bg-blue-650/80 group-hover:bg-blue-500 rounded-t-sm transition-all flex items-start justify-center pt-2"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] font-mono font-bold text-white bg-slate-900 border border-blue-900 px-1.5 py-0.5 rounded transition-opacity duration-300 shadow-md">
                      {data.val}
                    </span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-extrabold text-blue-500 tracking-widest">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Roster Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-blue-950 pb-4">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-blue-300 flex items-center gap-3">
              Student Roster
            </h3>
            <p className="text-sm font-medium text-blue-400 mt-1">Manage individual records, trace daily presence log status.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Quick Filter buttons */}
            <div className="flex items-center bg-slate-950 p-1 border border-blue-950 rounded-lg text-xs font-bold">
              {['ALL', 'CS-A1', 'MA-B2', 'PH-A2'].map((group) => (
                <button
                  key={group}
                  onClick={() => {
                    setActiveGroupFilter(group);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeGroupFilter === group ? 'bg-blue-900 text-blue-200 shadow-sm font-bold border border-blue-850' : 'text-blue-500 hover:text-blue-300'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Match style search */}
            <div className="relative flex-1 md:w-72">
              <input 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-950 border border-blue-950 px-10 py-3 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-900 rounded-xl placeholder:text-blue-500 placeholder:uppercase placeholder:tracking-widest text-blue-200 transition-all shadow-md" 
                placeholder="Search students..." 
                type="text"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Student Records List */}
        <div className="overflow-hidden border border-blue-950 bg-slate-950 rounded-xl relative shadow-2xl">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 px-8 py-4 bg-slate-900/40 border-b border-blue-950">
            <div className="col-span-5 text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold">Student</div>
            <div className="col-span-2 text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold text-center">ID</div>
            <div className="col-span-2 text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold text-center">Class</div>
            <div className="col-span-3 text-[10px] text-blue-400 uppercase tracking-[0.2em] font-extrabold text-right">Status</div>
          </div>

          {/* Student Items */}
          <div className="divide-y divide-blue-950/40">
            {paginatedStudents.length === 0 ? (
              <div className="p-12 text-center text-blue-400 font-medium">
                No students found matching current filter or search parameters.
              </div>
            ) : (
              paginatedStudents.map((student) => (
                <div 
                  key={student.id}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-8 py-4.5 hover:bg-slate-900/30 transition-colors group relative"
                >
                  {/* Student profile info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-11 h-11 bg-slate-900 border border-blue-950 flex items-center justify-center text-xs font-bold tracking-tighter text-blue-300 rounded-lg uppercase">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-blue-200 tracking-tight">{student.name}</p>
                      <p className="text-xs text-blue-400 mt-0.5 font-medium">{student.email}</p>
                    </div>
                  </div>

                  {/* ID */}
                  <div className="hidden md:block col-span-2 text-center text-xs font-mono tracking-widest text-blue-400 font-bold">
                    {student.id}
                  </div>

                  {/* Class Group */}
                  <div className="hidden md:block col-span-2 text-center text-xs font-bold tracking-tight text-blue-350 bg-slate-905 border border-blue-950/80 w-fit mx-auto px-2.5 py-1 rounded-md">
                    {student.classGroup}
                  </div>

                  {/* Dynamic Status Swapping Trigger */}
                  <div className="col-span-3 flex justify-between md:justify-end items-center gap-4 mt-3 md:mt-0">
                    {/* Mobile Only Metadata labels */}
                    <div className="md:hidden flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-blue-400 font-bold">ID: {student.id}</span>
                      <span className="text-[10px] font-bold text-blue-400 bg-slate-900 border border-blue-950 px-2 py-0.5 rounded">
                        Class: {student.classGroup}
                      </span>
                    </div>

                    <div className="relative">
                      {activeStatusSwitcher === student.id ? (
                        <div className="absolute right-0 bottom-full mb-2 bg-slate-950 border border-blue-900 shadow-2xl rounded-lg overflow-hidden flex flex-col z-50 min-w-28 animate-in fade-in slide-in-from-bottom-2 duration-150">
                          <button 
                            onClick={() => handleStatusChange(student.id, 'Present')}
                            className="px-4 py-2.5 text-[10px] font-bold text-left hover:bg-slate-900 text-blue-300 uppercase tracking-wider flex items-center gap-2 border-b border-blue-950"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                            Present
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                            className="px-4 py-2.5 text-[10px] font-bold text-left hover:bg-slate-900 text-blue-300 uppercase tracking-wider flex items-center gap-2 border-b border-blue-950"
                          >
                            <UserX className="w-3.5 h-3.5 text-rose-400" />
                            Absent
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'Late')}
                            className="px-4 py-2.5 text-[10px] font-bold text-left hover:bg-slate-900 text-blue-300 uppercase tracking-wider flex items-center gap-2"
                          >
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            Late
                          </button>
                        </div>
                      ) : null}

                      <button 
                        onClick={() => setActiveStatusSwitcher(activeStatusSwitcher === student.id ? null : student.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.1em] uppercase rounded-full transition-all cursor-pointer border shadow-xs ${
                          student.status === 'Present' 
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-900/60 hover:bg-emerald-900/40' 
                            : student.status === 'Absent'
                              ? 'bg-rose-950/60 text-rose-300 border-rose-900/60 hover:bg-rose-900/40'
                              : 'bg-amber-950/60 text-amber-300 border-amber-900/60 hover:bg-amber-900/40'
                        }`}
                      >
                        {student.status === 'Present' && <UserCheck className="w-3.5 h-3.5" />}
                        {student.status === 'Absent' && <UserX className="w-3.5 h-3.5" />}
                        {student.status === 'Late' && <Clock className="w-3.5 h-3.5" />}
                        <span>{student.status}</span>
                      </button>
                    </div>

                    <button className="text-blue-400 hover:text-blue-200 transition-colors py-1 cursor-pointer" aria-label="Action triggers">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Roster Pagination Controls */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
          <p className="text-xs font-bold text-blue-450 uppercase tracking-widest leading-none">
            Showing {startIndex + 1} - {Math.min(filteredStudents.length, startIndex + itemsPerPage)} of {filteredStudents.length} records
          </p>
          
          <div className="flex items-center gap-1.5 select-none font-mono">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-10 h-10 border border-blue-950 bg-slate-950 flex items-center justify-center hover:bg-slate-900 hover:text-blue-300 disabled:opacity-30 duration-200 rounded-lg text-blue-400 cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-lg border text-xs font-extrabold transition-all cursor-pointer ${
                  currentPage === pageNum 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'border-blue-950 text-blue-400 bg-slate-950 hover:bg-slate-900 hover:text-blue-300'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="w-10 h-10 border border-blue-950 bg-slate-950 flex items-center justify-center hover:bg-slate-900 hover:text-blue-300 disabled:opacity-30 duration-200 rounded-lg text-blue-400 cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
