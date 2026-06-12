import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, UserCheck, AlertOctagon, HelpCircle, UserPlus, FilePlus2, Megaphone } from 'lucide-react';

import { TabType, Student, Notice, DirectMessage, Announcement, Course, Assignment } from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_NOTICES, 
  INITIAL_DIRECT_MESSAGES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_COURSES, 
  INITIAL_ASSIGNMENTS 
} from './initialData';

// Subcomponents
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import ViewDashboard from './components/ViewDashboard';
import ViewAttendance from './components/ViewAttendance';
import ViewMessages from './components/ViewMessages';
import ViewGrades from './components/ViewGrades';
import ViewNotifications, { NotificationItem } from './components/ViewNotifications';
import ViewContacts from './components/ViewContacts';
import ViewFAQ from './components/ViewFAQ';
import ViewProfile from './components/ViewProfile';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'noti-1',
    title: 'CS402 Exam Grades Released',
    description: 'The grading ledger for Paxos Consensus Assignment has been updated. Class GPA increased by +0.04.',
    time: '2 hours ago',
    category: 'academic',
    isUnread: true,
    sender: 'Academic Board',
    detailText: 'The Paxos Consensus Lab scores have been finalized. 24 students have been successfully evaluated. Cumulative GPA rose to 3.78 vs previous term. Please approve the grade distribution ledger.'
  },
  {
    id: 'noti-2',
    title: 'Backup Server S3 Sync Error',
    description: 'System detected a warning in mirroring task to AWS Singapore S3 bucket.',
    time: '4 hours ago',
    category: 'system',
    isUnread: true,
    sender: 'Core Cron Daemon',
    detailText: 'Warning: SSL Handshake timeout during execution of scheduled full database backup at 04:00 AM. Retry scheduled in next cycle. No data loss recorded.'
  },
  {
    id: 'noti-3',
    title: 'Unauthorized API Access Attempted',
    description: 'IP 192.168.1.185 attempted to connect using expired bearer token credentials.',
    time: 'Yesterday',
    category: 'security',
    isUnread: false,
    sender: 'Gatekeeper NGFW',
    detailText: 'Firewall flagged 12 unauthorized calls to /api/roster over 1.4 seconds. Source IP from Student Wi-Fi segment has been throttled.'
  },
  {
    id: 'noti-4',
    title: 'Principal Meeting Insights Generated',
    description: 'Smart Summaries AI finished parsing board meeting notes and flagged 3 high-priority threads.',
    time: 'Yesterday',
    category: 'social',
    isUnread: false,
    sender: 'AI Engine',
    detailText: 'AI summaries generated successfully. Highlights: proposed changes to computer science pathways and lab equipment budgeting consensus. Ready for review in your Smart Summaries panel.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Core dynamic states
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(INITIAL_DIRECT_MESSAGES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // FAB Dialog Controller
  const [fabOpen, setFabOpen] = useState(false);
  const [fabChoice, setFabChoice] = useState<'student' | 'notice' | 'announcement' | null>(null);

  // Quick addition state controls
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentGroup, setNewStudentGroup] = useState('CS-A1');
  const [newStudentStatus, setNewStudentStatus] = useState<'Present' | 'Absent' | 'Late'>('Present');

  const [newNoticeCategory, setNewNoticeCategory] = useState<'Academic' | 'System' | 'Event'>('Academic');
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnRole, setNewAnnRole] = useState('Faculty');
  const [newAnnContent, setNewAnnContent] = useState('');

  // Derived metrics
  const totalUnreadMessages = directMessages.reduce((sum, msg) => sum + (msg.sender.isUnread ? (msg.sender.unreadCount || 1) : 0), 0);
  const totalUnreadNotifications = notifications.filter(n => n.isUnread).length;
  const pendingGradesCount = 24 - (assignments.length - INITIAL_ASSIGNMENTS.length); // decreases as we grade

  const [, forceUpdate] = useState({});
  const triggerUnreadRecalculation = () => {
    forceUpdate({});
  };

  // State mutators
  const handleUpdateStudentStatus = (id: string, newStatus: 'Present' | 'Absent' | 'Late') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSendMessage = (chatId: string, text: string) => {
    setDirectMessages(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessage: text,
          time: 'Just now',
          chatHistory: [
            ...chat.chatHistory,
            { sender: 'user' as const, text, timestamp: 'Just now' }
          ]
        };
      }
      return chat;
    }));
  };

  const handleClearUnread = (chatId: string) => {
    setDirectMessages(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          sender: {
            ...chat.sender,
            isUnread: false,
            unreadCount: 0
          }
        };
      }
      return chat;
    }));
  };

  const handleAddAssignment = (newAsg: Omit<Assignment, 'id'>) => {
    setAssignments(prev => [
      {
        id: `asg-${Date.now()}`,
        ...newAsg
      },
      ...prev
    ]);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => [
      newCourse,
      ...prev
    ]);
  };

  // Add handlers for new items from floating overlays
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentId.trim()) return;

    const email = newStudentEmail.trim() || `${newStudentName.toLowerCase().replace(/ /g, '.')}@eduadmin.io`;

    setStudents(prev => [
      {
        id: newStudentId,
        name: newStudentName,
        email,
        classGroup: newStudentGroup,
        status: newStudentStatus
      },
      ...prev
    ]);

    // reset states
    setNewStudentName('');
    setNewStudentId('');
    setNewStudentEmail('');
    setFabChoice(null);
    setFabOpen(false);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeDesc.trim()) return;

    setNotices(prev => [
      {
        id: `notice-${Date.now()}`,
        date: 'OCT 24',
        category: newNoticeCategory,
        title: newNoticeTitle,
        description: newNoticeDesc
      },
      ...prev
    ]);

    // reset states
    setNewNoticeTitle('');
    setNewNoticeDesc('');
    setFabChoice(null);
    setFabOpen(false);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    setAnnouncements(prev => [
      {
        id: `ann-${Date.now()}`,
        senderName: 'Dr. Aris',
        senderRole: newAnnRole,
        title: newAnnTitle,
        content: newAnnContent,
        time: 'Just now'
      },
      ...prev
    ]);

    // reset states
    setNewAnnTitle('');
    setNewAnnContent('');
    setFabChoice(null);
    setFabOpen(false);
  };

  const getFabTargetChoice = () => {
    if (activeTab === 'attendance') return 'student';
    if (activeTab === 'messages') return 'announcement';
    return 'notice';
  };

  const triggerFabOverlay = () => {
    setFabChoice(getFabTargetChoice());
    setFabOpen(true);
  };

  return (
    <div className="min-h-screen text-zinc-100 bg-black pb-28 md:pb-12 relative flex flex-col">
      
      {/* Header bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={totalUnreadNotifications} />

      {/* Main Container Stage */}
      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 md:px-12 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeTab === 'dashboard' && (
              <ViewDashboard 
                students={students}
                notices={notices}
                setActiveTab={setActiveTab}
                pendingGradesCount={pendingGradesCount}
                unreadCount={totalUnreadMessages}
              />
            )}

            {activeTab === 'attendance' && (
              <ViewAttendance 
                students={students}
                onUpdateStatus={handleUpdateStudentStatus}
                onAddStudent={(std) => {
                  setStudents(p => [{ id: `std-${Date.now()}`, ...std }, ...p]);
                }}
              />
            )}

            {activeTab === 'messages' && (
              <ViewMessages 
                directMessages={directMessages}
                announcements={announcements}
                onSendMessage={handleSendMessage}
                onClearUnread={handleClearUnread}
              />
            )}

            {activeTab === 'grades' && (
              <ViewGrades 
                courses={courses}
                assignments={assignments}
                onAddAssignment={handleAddAssignment}
                onAddCourse={handleAddCourse}
              />
            )}

            {activeTab === 'notifications' && (
              <ViewNotifications 
                notifications={notifications}
                setNotifications={setNotifications}
                onMarkUnreadChange={triggerUnreadRecalculation}
              />
            )}

            {activeTab === 'contacts' && (
              <ViewContacts students={students} />
            )}

            {activeTab === 'faq' && (
              <ViewFAQ />
            )}

            {activeTab === 'profile' && (
              <ViewProfile userEmail="randomuserfromnull@gmail.com" />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Responsive Bottom Navigation bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={totalUnreadMessages} />

      {/* Universal Sticky FAB floating button */}
      <button 
        onClick={triggerFabOverlay}
        className="fixed bottom-24 right-5 md:bottom-8 md:right-12 bg-blue-600 hover:bg-blue-500 text-white w-14 h-14 flex items-center justify-center shadow-2xl rounded-xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.45)] border border-blue-500/30"
        aria-label="Create Action"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* DYNAMIC UNIVERSAL OVERLAY FORM BUILDERS */}
      <AnimatePresence>
        {fabOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-blue-955/85 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl shadow-blue-950/40"
            >
              <div className="flex justify-between items-center border-b border-blue-955/40 pb-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400">EdView Ledger Assistant</span>
                <button 
                  onClick={() => { setFabOpen(false); setFabChoice(null); }}
                  className="p-1 px-1.5 border border-transparent hover:border-blue-955/50 hover:bg-slate-900 rounded-lg text-blue-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step Choice Menu */}
              {fabChoice === null ? (
                <div className="space-y-3">
                  <p className="text-xs text-blue-400 font-semibold mb-4">Choose an academic action to register:</p>
                  
                  <button 
                    onClick={() => setFabChoice('student')}
                    className="w-full flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 rounded-xl text-left border border-blue-955/40 hover:border-blue-500 transition-all cursor-pointer text-xs font-semibold group"
                  >
                    <div className="p-2 rounded-lg bg-blue-950/50 border border-blue-900/40 text-blue-405 group-hover:scale-105 transition-transform">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold group-hover:text-blue-350 transition-colors">New Student Roster Entry</p>
                      <p className="text-[10px] text-blue-500 font-mono font-medium mt-0.5">Add to class groups</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setFabChoice('notice')}
                    className="w-full flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 rounded-xl text-left border border-blue-955/40 hover:border-blue-500 transition-all cursor-pointer text-xs font-semibold group"
                  >
                    <div className="p-2 rounded-lg bg-blue-950/50 border border-blue-900/40 text-blue-405 group-hover:scale-105 transition-transform">
                      <FilePlus2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold group-hover:text-blue-350 transition-colors">Publish Notice Board Item</p>
                      <p className="text-[10px] text-blue-500 font-mono font-medium mt-0.5">Faculty updates and maintenance alerts</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setFabChoice('announcement')}
                    className="w-full flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 rounded-xl text-left border border-blue-955/40 hover:border-blue-500 transition-all cursor-pointer text-xs font-semibold group"
                  >
                    <div className="p-2 rounded-lg bg-blue-950/50 border border-blue-900/40 text-blue-405 group-hover:scale-105 transition-transform">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold group-hover:text-blue-350 transition-colors">Broadcaster Announcement</p>
                      <p className="text-[10px] text-blue-500 font-mono font-medium mt-0.5">Push global mail bulletin message</p>
                    </div>
                  </button>
                </div>
              ) : fabChoice === 'student' ? (
                
                /* CREATE STUDENT REGISTRY FORM */
                <form onSubmit={handleCreateStudent} className="space-y-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <UserPlus className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-extrabold tracking-wider uppercase text-blue-300">New Student Account</span>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="e.g. Marie Curie" 
                      className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Student ID</label>
                      <input 
                        type="text" 
                        required
                        value={newStudentId}
                        onChange={(e) => setNewStudentId(e.target.value)}
                        placeholder="e.g. 88312" 
                        maxLength={5}
                        className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl text-center font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Class Group</label>
                      <select 
                        value={newStudentGroup}
                        onChange={(e) => setNewStudentGroup(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-955 text-blue-350 text-xs p-3.5 rounded-xl font-mono font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="CS-A1">CS-A1</option>
                        <option value="MA-B2">MA-B2</option>
                        <option value="PH-A2">PH-A2</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                      placeholder="e.g. m.curie@eduadmin.io" 
                      className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Log Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Present', 'Absent', 'Late'] as const).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setNewStudentStatus(status)}
                          className={`py-2 px-3 text-[10px] uppercase font-extrabold tracking-wider border rounded-xl transition-all ${
                            newStudentStatus === status 
                              ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.4)]' 
                              : 'bg-slate-900 text-blue-400 border-blue-955/50 hover:border-blue-500 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                  >
                    REGISTER STUDENT
                  </button>
                </form>
              ) : fabChoice === 'notice' ? (
                
                /* CREATE BOARD NOTICE BOARD Item */
                <form onSubmit={handleCreateNotice} className="space-y-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <FilePlus2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-extrabold tracking-wider uppercase text-blue-300">Publish Notice board item</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(['Academic', 'System', 'Event'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewNoticeCategory(cat)}
                        className={`py-2 px-3 text-[10px] uppercase font-extrabold tracking-wider border rounded-xl transition-all ${
                          newNoticeCategory === cat 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.4)]' 
                            : 'bg-slate-900 text-blue-400 border-blue-955/50 hover:border-blue-500 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Notice Title</label>
                    <input 
                      type="text" 
                      required
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="e.g. Faculty Senate Rescheduling" 
                      className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Description details</label>
                    <textarea 
                      required
                      value={newNoticeDesc}
                      onChange={(e) => setNewNoticeDesc(e.target.value)}
                      placeholder="Specify requirements, venue dates or schedule shifts details..." 
                      rows={4}
                      className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl resize-none font-semibold"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                  >
                    PUBLISH NOTICE BOARD
                  </button>
                </form>
              ) : (
                
                /* BROADCAST ANNOUNCEMENT */
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Megaphone className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-extrabold tracking-wider uppercase text-blue-300">Send Global Announcement</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Title header</label>
                      <input 
                        type="text" 
                        required
                        value={newAnnTitle}
                        onChange={(e) => setNewAnnTitle(e.target.value)}
                        placeholder="e.g. Science Fair registrations" 
                        className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Sender Role</label>
                      <select 
                        value={newAnnRole}
                        onChange={(e) => setNewAnnRole(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-955 text-blue-350 text-xs p-3.5 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="Dean's Office">Dean's Office</option>
                        <option value="Faculty Hub">Faculty Hub</option>
                        <option value="System">System</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Bulletins bulletin description</label>
                    <textarea 
                      required
                      value={newAnnContent}
                      onChange={(e) => setNewAnnContent(e.target.value)}
                      placeholder="Write global broadcast updates..." 
                      rows={4}
                      className="w-full bg-slate-900 border border-blue-955 text-blue-200 placeholder-blue-600/70 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl resize-none font-semibold"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                  >
                    BROADCAST MESSAGE
                  </button>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
