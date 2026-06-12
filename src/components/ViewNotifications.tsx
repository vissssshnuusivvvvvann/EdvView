import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  Search, 
  UserPlus, 
  ChevronRight, 
  Plus, 
  X,
  Mail,
  BellRing
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'academic' | 'system' | 'security' | 'social';
  isUnread: boolean;
  sender?: string;
  detailText?: string;
}

interface ViewNotificationsProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  onMarkUnreadChange: () => void;
}

export default function ViewNotifications({ 
  notifications, 
  setNotifications, 
  onMarkUnreadChange 
}: ViewNotificationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'system' | 'security' | 'social'>('all');
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  // Simulation form states
  const [showSimulateDialog, setShowSimulateDialog] = useState(false);
  const [simTitle, setSimTitle] = useState('');
  const [simDesc, setSimDesc] = useState('');
  const [simCategory, setSimCategory] = useState<'academic' | 'system' | 'security' | 'social'>('academic');
  const [simSender, setSimSender] = useState('');

  // Handle marking single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(noti => noti.id === id ? { ...noti, isUnread: false } : noti)
    );
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Handle toggling read/unread state
  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => 
      prev.map(noti => noti.id === id ? { ...noti, isUnread: !noti.isUnread } : noti)
    );
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Delete notification
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(noti => noti.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(noti => ({ ...noti, isUnread: false })));
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Clear all
  const handleClearAll = () => {
    setNotifications([]);
    setSelectedNotification(null);
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Simulate notification submit
  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim() || !simDesc.trim()) return;

    const newNoti: NotificationItem = {
      id: `noti-${Date.now()}`,
      title: simTitle,
      description: simDesc,
      time: 'Just now',
      category: simCategory,
      isUnread: true,
      sender: simSender.trim() || undefined,
      detailText: `This simulated ${simCategory} alert was raised automatically to notify the administration level. Details: "${simDesc}" triggered at local instance.`
    };

    setNotifications(prev => [newNoti, ...prev]);
    setShowSimulateDialog(false);
    
    // Reset fields
    setSimTitle('');
    setSimDesc('');
    setSimSender('');
    setTimeout(() => onMarkUnreadChange(), 10);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(noti => {
    const matchesSearch = 
      noti.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      noti.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || noti.category === selectedCategory;
    const matchesUnread = !filterUnreadOnly || noti.isUnread;

    return matchesSearch && matchesCategory && matchesUnread;
  });

  // Category Icon configuration
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'system':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'social':
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  // Category specific styles
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-emerald-950/55 border-emerald-900/40 text-emerald-400';
      case 'system':
        return 'bg-amber-950/55 border-amber-900/40 text-amber-400';
      case 'security':
        return 'bg-rose-950/55 border-rose-900/40 text-rose-400';
      case 'social':
      default:
        return 'bg-blue-950 border-blue-900/40 text-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="space-y-6">
      
      {/* Upper Title Segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none pb-2 border-b border-blue-950/80">
        <div>
          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em]">Operational Alerts</span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2.5">
            <BellRing className="w-6 h-6 text-blue-400 animate-pulse" />
            Notification Center
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => setShowSimulateDialog(true)}
            className="px-3.5 py-2 bg-slate-900 border border-blue-950 text-blue-300 hover:text-white hover:border-blue-500 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Simulate Alert
          </button>
          
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="px-3.5 py-2 bg-blue-950/40 border border-blue-900/50 text-blue-300 hover:bg-blue-900/60 transition-all rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}

          {notifications.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-slate-950 border border-red-950 text-red-400 hover:bg-red-950/30 transition-all rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Filter Panel (Col 1-4) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Active Counters Status Card */}
          <section className="bg-slate-950 border border-blue-950/85 p-5 rounded-2xl relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-950/20 rounded-full blur-2xl group-hover:scale-110 duration-500 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Active Ledger Alerts</span>
              <Bell className="w-4 h-4 text-blue-400" />
            </div>
            
            <div className="flex items-baseline gap-2.5 mb-2 select-none">
              <span className="text-4xl font-extrabold text-blue-300 tracking-tight">{unreadCount}</span>
              <span className="text-xs text-blue-500 font-bold">Unread Items</span>
            </div>
            <p className="text-blue-400/80 text-xs leading-relaxed font-semibold">
              {unreadCount > 0 
                ? `You have ${unreadCount} alerts that need verification in this system console registry.` 
                : 'All system and academic notifications have been approved and reconciled.'}
            </p>
          </section>

          {/* Quick Category Filters */}
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => { setSelectedCategory('all'); }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 text-xs font-bold shadow-xs ${
                selectedCategory === 'all' 
                  ? 'bg-blue-950/80 border-blue-500 text-blue-200' 
                  : 'bg-slate-950 border-blue-955 text-blue-400 hover:border-blue-900 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                All Activities
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-450 border border-blue-950">
                {notifications.length}
              </span>
            </button>

            <button 
              onClick={() => { setSelectedCategory('academic'); }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 text-xs font-bold shadow-xs ${
                selectedCategory === 'academic' 
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
                  : 'bg-slate-950 border-blue-955 text-blue-400 hover:border-blue-900 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Academic Updates
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-450 border border-blue-950">
                {notifications.filter(n => n.category === 'academic').length}
              </span>
            </button>

            <button 
              onClick={() => { setSelectedCategory('system'); }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 text-xs font-bold shadow-xs ${
                selectedCategory === 'system' 
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300' 
                  : 'bg-slate-950 border-blue-955 text-blue-400 hover:border-blue-900 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                System Audits
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-450 border border-blue-950">
                {notifications.filter(n => n.category === 'system').length}
              </span>
            </button>

            <button 
              onClick={() => { setSelectedCategory('security'); }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 text-xs font-bold shadow-xs ${
                selectedCategory === 'security' 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                  : 'bg-slate-950 border-blue-955 text-blue-400 hover:border-blue-900 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                Security Alerts
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-450 border border-blue-950">
                {notifications.filter(n => n.category === 'security').length}
              </span>
            </button>

            <button 
              onClick={() => { setSelectedCategory('social'); }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 text-xs font-bold shadow-xs ${
                selectedCategory === 'social' 
                  ? 'bg-blue-950/80 border-blue-500 text-blue-300' 
                  : 'bg-slate-950 border-blue-955 text-blue-400 hover:border-blue-900 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Social & Smart AI
              </span>
              <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-450 border border-blue-950">
                {notifications.filter(n => n.category === 'social').length}
              </span>
            </button>
          </nav>

          {/* Unread Only Toggle */}
          <div className="p-4 rounded-xl border border-blue-950 bg-slate-950 flex items-center justify-between select-none">
            <span className="text-xs font-bold text-blue-400">Filter Unread Only</span>
            <button 
              onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
              className={`w-9 h-5 rounded-full p-0.5 flex transition-all cursor-pointer ${
                filterUnreadOnly ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

        </aside>

        {/* Notifications Listing View (Col 5-12) */}
        <section className="lg:col-span-8 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-blue-500" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full bg-slate-950 border border-blue-950 text-blue-200 pl-11 pr-4 py-3 text-xs rounded-xl placeholder-blue-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-955"
            />
          </div>

          <div className="space-y-3.5">
            <AnimatePresence initial={false}>
              {filteredNotifications.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 border border-dashed border-blue-950 bg-slate-950/40 rounded-2xl text-center select-none"
                >
                  <Bell className="w-10 h-10 text-blue-600 mx-auto mb-4 stroke-1 animate-bounce" />
                  <h4 className="text-sm font-bold text-blue-300">No Notifications Found</h4>
                  <p className="text-xs text-blue-500 mt-1 max-w-sm mx-auto">
                    No active notifications correspond to the search criteria or chosen classification filter guidelines.
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((noti) => (
                  <motion.div
                    key={noti.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => {
                      setSelectedNotification(noti);
                      handleMarkAsRead(noti.id);
                    }}
                    className={`p-4 border rounded-xl flex gap-4 hover:border-blue-500 hover:bg-slate-900/40 cursor-pointer transition-all group ${
                      noti.isUnread 
                        ? 'bg-blue-950/20 border-blue-900/60 shadow-lg' 
                        : 'bg-slate-950 border-blue-955'
                    }`}
                  >
                    {/* Category icon with custom badge */}
                    <div className="mt-0.5 select-none">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-blue-950 flex items-center justify-center">
                        {getCategoryIcon(noti.category)}
                      </div>
                    </div>

                    {/* text content and info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] px-2 py-0.5 font-bold rounded-md font-mono border uppercase tracking-wider ${getCategoryBadgeClass(noti.category)}`}>
                            {noti.category}
                          </span>
                          {noti.sender && (
                            <span className="text-[10px] font-bold text-blue-400">
                              by {noti.sender}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] font-mono font-bold text-blue-500">
                          {noti.time}
                        </span>
                      </div>

                      <h4 className={`text-xs font-bold leading-snug truncate ${noti.isUnread ? 'text-blue-100 font-bold' : 'text-blue-300 font-semibold'}`}>
                        {noti.title}
                      </h4>
                      <p className="text-[11px] text-blue-450 mt-1 truncate font-medium">
                        {noti.description}
                      </p>
                    </div>

                    {/* interactive toggle operations */}
                    <div className="flex items-center gap-2 select-none">
                      <button 
                        onClick={(e) => handleToggleRead(noti.id, e)}
                        className={`p-1.5 rounded-lg border hover:text-white transition-colors cursor-pointer ${
                          noti.isUnread 
                            ? 'bg-blue-900/50 border-blue-800 text-blue-200' 
                            : 'bg-slate-900 border-blue-950 text-blue-500 hover:border-blue-900'
                        }`}
                        title={noti.isUnread ? 'Mark Read' : 'Mark Unread'}
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(noti.id, e)}
                        className="p-1.5 rounded-lg border border-red-950 bg-slate-950 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

        </section>

      </div>

      {/* RENDER NOTIFICATION DETAIL DIALOG MODAL Overlay */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-blue-900 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-blue-955 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-900 border border-blue-950 rounded-lg">
                    {getCategoryIcon(selectedNotification.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white uppercase">Notification Log</h3>
                    <p className="text-[10px] text-blue-450 font-mono">ID: {selectedNotification.id} • {selectedNotification.time}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={`text-[9px] px-2 py-0.5 font-bold rounded-md font-mono border uppercase tracking-wider ${getCategoryBadgeClass(selectedNotification.category)}`}>
                    {selectedNotification.category}
                  </span>
                  <h4 className="text-base font-bold text-blue-250 mt-2.5 tracking-tight">
                    {selectedNotification.title}
                  </h4>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-blue-955/70 text-xs text-blue-400 font-semibold space-y-3 leading-relaxed">
                  <p>{selectedNotification.description}</p>
                  {selectedNotification.detailText && (
                    <div className="pt-2 border-t border-blue-955 text-blue-450 text-[11px] font-medium italic">
                      {selectedNotification.detailText}
                    </div>
                  )}
                </div>

                {selectedNotification.sender && (
                  <div className="flex items-center gap-2.5 text-xs text-blue-450 font-bold select-none">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Dispatched Authority: {selectedNotification.sender}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pb-1">
                <button 
                  onClick={() => {
                    setNotifications(prev => 
                      prev.map(noti => noti.id === selectedNotification.id ? { ...noti, isUnread: !noti.isUnread } : noti)
                    );
                    setSelectedNotification(null);
                  }}
                  className="bg-slate-900 hover:bg-slate-850 border border-blue-950 text-blue-300 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  MARK AS {selectedNotification.isUnread ? 'READ' : 'UNREAD'}
                </button>
                <button 
                  onClick={() => {
                    setNotifications(prev => prev.filter(noti => noti.id !== selectedNotification.id));
                    setSelectedNotification(null);
                  }}
                  className="bg-red-950/40 border border-red-900/50 hover:bg-red-900/20 text-red-400 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  DELETE ALERT
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER SIMULATE DIALOG MODAL Overlay */}
      <AnimatePresence>
        {showSimulateDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-blue-900 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-blue-955 pb-3 select-none">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400">EdView Alert Simulator</span>
                <button 
                  onClick={() => setShowSimulateDialog(false)}
                  className="p-1 hover:bg-slate-900 rounded text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSimulateSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-white mb-2 select-none">
                  <Bell className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider uppercase">Raise Custom System Alert</span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Alert Source / Sender</label>
                  <input 
                    type="text" 
                    value={simSender}
                    onChange={(e) => setSimSender(e.target.value)}
                    placeholder="e.g. Security Monitor Node 4, Dean's Desk" 
                    className="w-full bg-slate-900 border border-blue-955 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Alert Title</label>
                    <input 
                      type="text" 
                      required
                      value={simTitle}
                      onChange={(e) => setSimTitle(e.target.value)}
                      placeholder="e.g. Lab 4 Heatwave Detected" 
                      className="w-full bg-slate-900 border border-blue-955 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Classification Type</label>
                    <select 
                      value={simCategory}
                      onChange={(e) => setSimCategory(e.target.value as any)}
                      className="w-full bg-slate-900 border border-blue-955 text-xs p-3.5 rounded-xl text-white font-semibold"
                    >
                      <option value="academic">Academic Update</option>
                      <option value="system">System Audit</option>
                      <option value="security">Security Alert</option>
                      <option value="social">Social & AI Spark</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-blue-500 mb-1.5">Alert Description Details</label>
                  <textarea 
                    required
                    value={simDesc}
                    onChange={(e) => setSimDesc(e.target.value)}
                    placeholder="Provide details about compliance, alerts raised, or system exceptions recorded..." 
                    rows={4}
                    className="w-full bg-slate-900 border border-blue-955 text-xs p-3.5 focus:outline-none focus:border-blue-500 rounded-xl text-white resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 bg-white text-black font-extrabold text-xs py-3.5 rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  DISPATCH TO ACTIVE LEDGER
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
