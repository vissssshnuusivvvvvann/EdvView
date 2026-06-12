import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Award, Clock, FileText, ChevronRight, X, Brain, HelpCircle, Check, Plus } from 'lucide-react';
import { Course, Assignment } from '../types';

interface ViewGradesProps {
  courses: Course[];
  assignments: Assignment[];
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  onAddCourse: (course: Course) => void;
}

export default function ViewGrades({ 
  courses, 
  assignments, 
  onAddAssignment,
  onAddCourse
}: ViewGradesProps) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [addingAssignmentOpen, setAddingAssignmentOpen] = useState(false);
  const [addingCourseOpen, setAddingCourseOpen] = useState(false);

  // Form states
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgCourse, setNewAsgCourse] = useState('CS402');
  const [newAsgScore, setNewAsgScore] = useState(90);
  const [newAsgOutOf, setNewAsgOutOf] = useState(100);

  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('A');
  const [newCoursePercent, setNewCoursePercent] = useState(95);

  // Dynamic state list derived helpers
  const handleAddAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsgTitle.trim()) return;

    onAddAssignment({
      title: newAsgTitle,
      courseCode: newAsgCourse,
      dateAgo: 'Just now',
      score: Number(newAsgScore),
      outOf: Number(newAsgOutOf)
    });

    setNewAsgTitle('');
    setAddingAssignmentOpen(false);
  };

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseName.trim()) return;

    onAddCourse({
      id: newCourseCode.toUpperCase(),
      name: newCourseName,
      instructor: 'Dr. Aris',
      grade: newCourseGrade,
      percentage: Number(newCoursePercent)
    });

    setNewCourseCode('');
    setNewCourseName('');
    setAddingCourseOpen(false);
  };

  // Dynamically calculate overall GPA based on courses list
  const getGpaFromPercent = (pct: number): number => {
    if (pct >= 95) return 4.0;
    if (pct >= 90) return 3.7;
    if (pct >= 85) return 3.3;
    if (pct >= 80) return 3.0;
    if (pct >= 75) return 2.7;
    return 2.0;
  };

  const totalGpaSum = courses.reduce((sum, c) => sum + getGpaFromPercent(c.percentage), 0);
  const calculatedGpa = courses.length > 0 ? (totalGpaSum / courses.length).toFixed(2) : '0.00';

  // GPA chart values (represented dynamically)
  const chartValues = ['30%', '50%', '45%', '70%', '80%', '90%', '100%'];

  return (
    <div className="space-y-12">
      {/* GPA Overview stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* GPA Title & Chart Banner */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-6">Cumulative Score</p>
              <div className="flex items-baseline gap-6 mb-8 select-none">
                <h2 className="text-[80px] font-extrabold leading-none tracking-tighter text-blue-300">
                  {calculatedGpa}
                </h2>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono tracking-wider">+0.04</span>
                  </div>
                  <span className="text-xs text-blue-500 font-medium">vs last term</span>
                </div>
              </div>
            </div>

            {/* GPA Column Bar Visualizer */}
            <div className="h-32 w-full flex items-end gap-2 border-b border-blue-950 pb-1">
              {chartValues.map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: h }}
                  className={`flex-1 rounded-t-sm transition-all duration-300 cursor-pointer ${
                    i === chartValues.length - 1 
                      ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' 
                      : i === chartValues.length - 2
                        ? 'bg-blue-600/80 hover:bg-blue-600'
                        : 'bg-blue-950/60 hover:bg-blue-900/40 border border-blue-900/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Spotlight student widget card */}
          <div className="md:col-span-4 flex flex-col justify-end">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-4">Spotlight</p>
              
              <div className="flex items-center gap-4 mb-6 select-none">
                <img 
                  alt="Julianna Drago" 
                  className="w-12 h-12 rounded-2xl object-cover border border-zinc-800"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq6gq2tirvOynt80ts7VOgZbRya_7_UekeTeF6K1_AbEo3KFj0aZevuN_4FxtnBi76XNZKKLfT9LyQtf2tmKMcUuV84Cyq843UvJbYlPF775dvczDlE-CleRsc2eqmde2xmrDetYVesTH776m8zz57uNzXV2fUm7sQEXB8FTcSvEWxduWbnJA0cukl6G-8bMIh664aIP3AeEa67cH5ENdx7Xm8e1cGdUoppQrRI2a8NYzG5bnMmMSSQIyz1nvTIIYBIAIKRrF6Pz4"
                />
                <div>
                  <h3 className="text-sm font-semibold text-white">Julianna Drago</h3>
                  <p className="text-[11px] text-zinc-500 font-mono tracking-tight">Cryptography</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500 font-medium">Class Rank</span>
                  <span className="text-white font-mono font-bold">1 / 142</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Completion rate</span>
                  <span className="text-white font-mono font-bold">98.4%</span>
                </div>
              </div>

              <button 
                onClick={() => setProfileModalOpen(true)}
                className="w-full mt-6 bg-white text-black text-xs font-bold py-3 px-4 rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                FULL PROFILE
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Course List & Recent Assignments Stack */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Course Stack (Col 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-lg font-semibold tracking-tight text-white">Academic Stack</h3>
            <span className="text-[10px] text-zinc-500 tracking-widest font-mono uppercase">SPRING '26</span>
          </div>

          <div className="space-y-3">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="group flex items-center justify-between p-6 bg-zinc-950 hover:bg-zinc-900/60 transition-colors border border-zinc-900 hover:border-zinc-800 rounded-2xl cursor-pointer"
              >
                <div className="flex items-center gap-6 md:gap-8 min-w-0">
                  <span className="text-[11px] font-mono font-bold text-zinc-500 w-12 md:w-14">
                    {course.id}
                  </span>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-white truncate">{course.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{course.instructor}</p>
                  </div>
                </div>

                <div className="text-right select-none ml-4">
                  <div className="text-base font-bold text-white font-mono">{course.grade}</div>
                  <div className="text-xs text-zinc-500 font-mono mt-0.5">{course.percentage}%</div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setAddingCourseOpen(true)}
            className="flex items-center gap-2 mt-4 px-4 py-3 border border-dashed border-zinc-800 hover:border-zinc-500 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer w-full justify-center bg-zinc-950/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course Pathway</span>
          </button>
        </div>

        {/* Assignments Stack (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
            <h3 className="text-lg font-semibold tracking-tight text-white">Assignments</h3>
            <span className="text-[10px] text-zinc-500 tracking-widest font-mono">LATEST TASKS</span>
          </div>

          <div className="divide-y divide-zinc-900">
            {assignments.map((asg) => (
              <div 
                key={asg.id}
                className="py-4.5 flex justify-between items-center group cursor-pointer hover:bg-zinc-900/10 transition-colors rounded-xl px-2"
              >
                <div className="flex gap-4">
                  <FileText className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors">
                      {asg.title}
                    </h5>
                    <p className="text-[10px] text-zinc-500 font-mono mt-1">
                      {asg.courseCode} • {asg.dateAgo}
                    </p>
                  </div>
                </div>
                
                <div className="text-[11px] font-bold font-mono text-zinc-300 border border-zinc-900 rounded-xl px-4 py-1.5 bg-zinc-950 group-hover:border-zinc-700 transition-colors select-none">
                  {asg.score} / {asg.outOf}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setAddingAssignmentOpen(true)}
            className="flex items-center gap-2 mt-4 px-4 py-3 border border-dashed border-zinc-800 hover:border-zinc-500 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer w-full justify-center bg-zinc-950/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assignment Record</span>
          </button>
        </div>

      </section>

      {/* SPOTLIGHT FULL INTERACTIVE DETAIL PROFILE MODAL */}
      <AnimatePresence>
        {profileModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-6 overflow-hidden relative"
            >
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-white animate-pulse" />
                  <h3 className="text-sm font-bold tracking-widest text-white uppercase">Student Academic Card</h3>
                </div>
                <button 
                  onClick={() => setProfileModalOpen(false)}
                  className="text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile body */}
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-850">
                  <img 
                    alt="Julianna Drago" 
                    className="w-20 h-20 rounded-full object-cover border border-zinc-700 mb-3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq6gq2tirvOynt80ts7VOgZbRya_7_UekeTeF6K1_AbEo3KFj0aZevuN_4FxtnBi76XNZKKLfT9LyQtf2tmKMcUuV84Cyq843UvJbYlPF775dvczDlE-CleRsc2eqmde2xmrDetYVesTH776m8zz57uNzXV2fUm7sQEXB8FTcSvEWxduWbnJA0cukl6G-8bMIh664aIP3AeEa67cH5ENdx7Xm8e1cGdUoppQrRI2a8NYzG5bnMmMSSQIyz1nvTIIYBIAIKRrF6Pz4"
                  />
                  <h4 className="text-base font-bold text-white">Julianna Drago</h4>
                  <p className="text-xs text-zinc-500 font-mono">Department of Computer Science</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between p-2.5 bg-zinc-900/20 rounded">
                    <span className="text-zinc-500">Academic Major</span>
                    <span className="text-zinc-300 font-semibold">Cryptography & Security</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-zinc-900/20 rounded">
                    <span className="text-zinc-500">Student ID</span>
                    <span className="text-zinc-300 font-semibold">88250</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-zinc-900/20 rounded">
                    <span className="text-zinc-500">Current GPA</span>
                    <span className="text-green-400 font-extrabold">3.98</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-zinc-900/20 rounded">
                    <span className="text-zinc-500">Registered Classes</span>
                    <span className="text-zinc-300 font-semibold">CS402, MA310, PH204</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setProfileModalOpen(false)}
                className="w-full bg-white text-black font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer"
              >
                CLOSE ACCOUNT PROFILE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC ADD ASSIGNMENT DIAGRAM FORM MODAL */}
      <AnimatePresence>
        {addingAssignmentOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-6"
            >
              <div className="flex justify-between items-start border-b border-zinc-900 pb-3">
                <h3 className="text-base font-bold text-white">Add Assignment Entry</h3>
                <button onClick={() => setAddingAssignmentOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Task Title</label>
                  <input 
                    type="text" 
                    value={newAsgTitle}
                    onChange={(e) => setNewAsgTitle(e.target.value)}
                    placeholder="e.g. Byzantine generals memo" 
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-zinc-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Track Course</label>
                    <select 
                      value={newAsgCourse}
                      onChange={(e) => setNewAsgCourse(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.id} - {c.name.split(' ')[0]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Score</label>
                    <input 
                      type="number" 
                      value={newAsgScore}
                      onChange={(e) => setNewAsgScore(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl text-center font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!newAsgTitle.trim()}
                  className="w-full bg-white text-black font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer hover:bg-zinc-200"
                >
                  SAVE ASSIGNMENT
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC ADD COURSE MODAL Form */}
      <AnimatePresence>
        {addingCourseOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 space-y-6"
            >
              <div className="flex justify-between items-start border-b border-zinc-900 pb-3 font-semibold">
                <h3 className="text-base text-white">Join Course Stack</h3>
                <button onClick={() => setAddingCourseOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCourseSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Code</label>
                    <input 
                      type="text" 
                      value={newCourseCode}
                      onChange={(e) => setNewCourseCode(e.target.value)}
                      placeholder="e.g. PH204" 
                      maxLength={6}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 text-center rounded-xl font-mono uppercase"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Course Name</label>
                    <input 
                      type="text" 
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      placeholder="Quantum Computing" 
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Grade</label>
                    <select 
                      value={newCourseGrade}
                      onChange={(e) => setNewCourseGrade(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl font-mono"
                    >
                      {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Percentage %</label>
                    <input 
                      type="number" 
                      value={newCoursePercent}
                      onChange={(e) => setNewCoursePercent(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-3 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!newCourseCode.trim() || !newCourseName.trim()}
                  className="w-full bg-white text-black font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer hover:bg-zinc-200"
                >
                  SAVE COURSE
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
