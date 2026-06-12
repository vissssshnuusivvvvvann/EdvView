import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Star, Archive, Users, BarChart3, Zap, Send, Check, X, ThumbsUp, SendHorizontal, Megaphone } from 'lucide-react';
import { DirectMessage, Announcement } from '../types';

interface ViewMessagesProps {
  directMessages: DirectMessage[];
  announcements: Announcement[];
  onSendMessage: (chatId: string, text: string) => void;
  onClearUnread: (chatId: string) => void;
}

export default function ViewMessages({ 
  directMessages, 
  announcements, 
  onSendMessage, 
  onClearUnread 
}: ViewMessagesProps) {
  const [activeTab, setActiveTab] = useState<'dm' | 'announcements'>('dm');
  const [selectedChat, setSelectedChat] = useState<DirectMessage | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [smartSummaryOpen, setSmartSummaryOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside active chat session
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.chatHistory]);

  const handleChatSelect = (chat: DirectMessage) => {
    setSelectedChat(chat);
    onClearUnread(chat.id);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChat) return;

    const sentText = messageInput;
    onSendMessage(selectedChat.id, sentText);

    // Sync selectedChat local object representation
    const updatedHistory = [
      ...selectedChat.chatHistory,
      { sender: 'user' as const, text: sentText, timestamp: 'Just now' }
    ];
    
    setSelectedChat({
      ...selectedChat,
      chatHistory: updatedHistory,
      lastMessage: sentText,
      time: 'Just now'
    });

    setMessageInput('');

    // Trigger smart conversational simulation simulation response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let responderMsg = '';
      if (selectedChat.id === 'msg-1') {
        responderMsg = "Understood. Let's sync today at 2:00 PM right before the lecture in your office. I'll print the syllabus copies.";
      } else if (selectedChat.id === 'msg-2') {
        responderMsg = 'Thank you, Dr. Aris. I will check the records and make sure standard logs are signed off by the registrar.';
      } else if (selectedChat.id === 'msg-3') {
        responderMsg = 'Marcus: Labs look clean, we are ready for audits!';
      } else {
        responderMsg = 'Sounds excellent. I am wrapping up the final edits and will submit the preprint to the journal hub.';
      }

      onSendMessage(selectedChat.id, responderMsg);

      // Re-update chat visual state
      setSelectedChat(prev => {
        if (!prev) return null;
        return {
          ...prev,
          chatHistory: [
            ...prev.chatHistory,
            { sender: 'other' as const, text: responderMsg, timestamp: 'Just now' }
          ],
          lastMessage: responderMsg,
          time: 'Just now'
        };
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
      
      {/* Sidebar Navigation / Quick Actions (Col 1-3) */}
      <aside className="hidden md:flex md:col-span-3 flex-col gap-6 select-none">
        {/* Smart Summaries AI Assistant Card */}
        <section className="bg-slate-950 border border-blue-950 p-5 rounded-2xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-950/30 rounded-full blur-2xl group-hover:scale-110 duration-500 transition-transform"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Smart Summaries</span>
            <Sparkles className="w-4 h-4 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer animate-pulse" />
          </div>
          <p className="text-blue-450 text-xs leading-relaxed mb-6 font-semibold">
            3 active threads require your attention. Principal's board meeting notes are ready to review.
          </p>
          <button 
            onClick={() => setSmartSummaryOpen(true)}
            className="w-full bg-blue-950 border border-blue-900/40 text-blue-300 hover:bg-blue-900 text-[11px] font-extrabold tracking-widest py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            REVIEW ALL
          </button>
        </section>

        {/* Quick Action Navigation links */}
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-4 px-4 py-4 bg-slate-950 border border-blue-950 hover:border-blue-500 hover:bg-slate-900 rounded-xl transition-all duration-200 text-left cursor-pointer group shadow-2xl">
            <Calendar className="w-4 h-4 text-blue-500 group-hover:text-blue-300 transition-colors" />
            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-200">Scheduled Syncs</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-4 bg-slate-950 border border-blue-950 hover:border-blue-500 hover:bg-slate-900 rounded-xl transition-all duration-200 text-left cursor-pointer group shadow-2xl">
            <Star className="w-4 h-4 text-blue-500 group-hover:text-blue-300 transition-colors" />
            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-200">Starred Chats</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-4 bg-slate-950 border border-blue-950 hover:border-blue-500 hover:bg-slate-900 rounded-xl transition-all duration-200 text-left cursor-pointer group shadow-2xl">
            <Archive className="w-4 h-4 text-blue-500 group-hover:text-blue-300 transition-colors" />
            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-200">Archive Ledger</span>
          </button>
        </nav>
      </aside>

      {/* Main Messaging Interface (Col 4-12) */}
      <section className="md:col-span-9 flex flex-col gap-6">
        
        {/* Toggle DM vs Announcements Component */}
        <div className="relative flex border-b border-blue-950 w-full select-none">
          <button 
            onClick={() => { setActiveTab('dm'); setSelectedChat(null); }}
            className={`flex-1 py-4 text-xs font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'dm' ? 'text-blue-300 font-bold' : 'text-blue-500 hover:text-blue-300'
            }`}
          >
            Direct Messages
          </button>
          <button 
            onClick={() => { setActiveTab('announcements'); setSelectedChat(null); }}
            className={`flex-1 py-4 text-xs font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'announcements' ? 'text-blue-300 font-bold' : 'text-blue-500 hover:text-blue-300'
            }`}
          >
            Announcements
          </button>
          <motion.div 
            layoutId="activeTabIndicator"
            className="absolute bottom-0 h-[2px] bg-blue-650 w-1/2"
            animate={{ left: activeTab === 'dm' ? '0%' : '50%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        </div>

        {/* Content switch */}
        {activeTab === 'dm' ? (
          <div className="space-y-4">
            <h3 className="text-[10px] font-extrabold text-blue-450 mb-2 uppercase tracking-[0.15em] px-1 select-none">
              Recent Chats (Click to Open)
            </h3>

            {/* List Chats mapping */}
            <div className="flex flex-col gap-3">
              {directMessages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => handleChatSelect(msg)}
                  className={`border flex items-center p-5 gap-4 hover:bg-slate-900/40 cursor-pointer group rounded-xl transition-all ${
                    selectedChat?.id === msg.id 
                      ? 'bg-blue-950 border-blue-900 shadow-xl' 
                      : 'bg-slate-950 border-blue-950/80 hover:border-blue-500 shadow-2xl'
                  }`}
                >
                  <div className="relative select-none">
                    {msg.sender.avatar.startsWith('http') ? (
                      <img 
                        alt={msg.sender.name} 
                        className="w-14 h-14 rounded-xl transition-all duration-500 object-cover border border-blue-900/60" 
                        src={msg.sender.avatar}
                      />
                    ) : (
                      <div className="w-14 h-14 bg-slate-900 flex items-center justify-center text-blue-300 border border-blue-950 rounded-xl">
                        <Users className="w-7 h-7 text-blue-500" />
                      </div>
                    )}
                    {msg.sender.isUnread && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full ring-2 ring-slate-950 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-bold text-blue-200 truncate max-w-[70%]">
                        {msg.sender.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-blue-450">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-semibold truncate">
                      {msg.lastMessage}
                    </p>
                  </div>

                  {msg.sender.isUnread && msg.sender.unreadCount ? (
                    <div className="flex flex-col items-end select-none">
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold shadow-md">
                        {msg.sender.unreadCount}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Desktop Statistics layout widgets */}
            <div className="hidden md:grid grid-cols-2 gap-6 mt-6 select-none">
              <div className="bg-slate-950 border border-blue-950 p-6 flex flex-col justify-between aspect-video rounded-2xl group hover:border-blue-500 transition-all shadow-2xl">
                <BarChart3 className="w-8 h-8 text-blue-450 mb-8" />
                <div>
                  <h4 className="text-lg font-bold text-blue-350 mb-2 tracking-tight">Engagement</h4>
                  <p className="text-xs font-semibold text-blue-400/80 leading-relaxed">
                    98% of departmental announcements were parsed and read within 1 hour this session.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-blue-950 p-6 overflow-hidden relative group aspect-video rounded-2xl hover:border-blue-500 transition-all shadow-2xl">
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
                  <div className="h-full w-full bg-[radial-gradient(#3B82F6_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <Zap className="w-8 h-8 text-blue-450 mb-8" />
                  <div>
                    <h4 className="text-lg font-bold text-blue-350 mb-2 tracking-tight">AI Insights</h4>
                    <p className="text-xs font-semibold text-blue-400/80 leading-relaxed">
                      Detecting heightened communication volume in "CS-402 Exam Prep" threads. Suggesting automated response modules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ANNOUNCEMENTS LIST */
          <div className="flex flex-col gap-4">
            {announcements.map((ann) => (
              <div 
                key={ann.id}
                className="bg-slate-950 border border-blue-950 hover:border-blue-500 p-6 rounded-2xl transition-all shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4 select-none">
                  <div>
                    <h4 className="text-sm font-bold text-blue-300 tracking-tight">{ann.senderName}</h4>
                    <p className="text-[10px] text-blue-450 font-extrabold uppercase mt-0.5">{ann.senderRole}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 bg-slate-900 border border-blue-950 px-2.5 py-1 rounded">
                    {ann.time}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-blue-400" />
                  {ann.title}
                </h5>
                <p className="text-xs text-blue-400/80 leading-relaxed font-semibold">{ann.content}</p>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* FULL CONVERSATIONAL CHAT OVERLAY DRAWER */}
      <AnimatePresence>
        {selectedChat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-blue-900 rounded-2xl w-full max-w-2xl h-[550px] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-slate-900 px-6 py-4 border-b border-blue-950 flex justify-between items-center select-none">
                <div className="flex items-center gap-3">
                  {selectedChat.sender.avatar.startsWith('http') ? (
                    <img 
                      alt={selectedChat.sender.name} 
                      className="w-10 h-10 rounded-lg object-cover border border-blue-900/60" 
                      src={selectedChat.sender.avatar}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-slate-900 border border-blue-950 flex items-center justify-center text-blue-300 rounded-lg">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-blue-200">{selectedChat.sender.name}</h3>
                    <p className="text-[10px] text-blue-400 font-mono tracking-tight">Active Conversation Thread</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="p-1 px-3 bg-slate-900 border border-blue-950 text-blue-300 hover:text-blue-100 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>

              {/* Chat Body Scroll container */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-900/25">
                {selectedChat.chatHistory.map((chatMsg, idx) => {
                  const isUser = chatMsg.sender === 'user';
                  return (
                    <div 
                      key={idx}
                      className={`flex flex-col max-w-[80%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isUser 
                          ? 'bg-blue-600 text-white font-bold rounded-tr-none shadow-md' 
                          : 'bg-slate-900 text-blue-300 font-semibold rounded-tl-none border border-blue-950/80'
                      }`}>
                        {chatMsg.text}
                      </div>
                      <span className="text-[9px] font-mono text-blue-400/80 mt-1 px-1">{chatMsg.timestamp}</span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex flex-col items-start mr-auto max-w-[80%]">
                    <div className="bg-slate-900 border border-blue-950 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Footer Input sender */}
              <form 
                onSubmit={handleSendMessageSubmit}
                className="bg-slate-905 p-4 border-t border-blue-950 flex gap-2 items-center"
              >
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a response message..."
                  className="flex-1 bg-slate-950 border border-blue-950 text-blue-200 px-4 py-3.5 text-xs placeholder-blue-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-950 rounded-xl"
                />
                <button 
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-3.5 bg-blue-600 text-white disabled:bg-slate-900 disabled:text-blue-600 rounded-xl transition-all cursor-pointer flex items-center justify-center hover:bg-blue-700 shadow-md"
                  aria-label="Send message"
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SMART SUMMARIES REVIEW MODAL DRAWER */}
      <AnimatePresence>
        {smartSummaryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-950 border border-blue-900 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                  <h3 className="text-sm font-bold tracking-tight text-blue-300 uppercase">AI Meeting Assistant Summaries</h3>
                </div>
                <button 
                  onClick={() => setSmartSummaryOpen(false)}
                  className="text-blue-500 hover:text-blue-350 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-blue-400 text-xs leading-relaxed space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-blue-950/80 shadow-3xs">
                  <h4 className="font-bold text-blue-300 mb-1">Academic Board sync:</h4>
                  <p className="font-semibold text-blue-450">Proposed changes to CS curricular pathways have achieved consensus. Focus turned to optimizing laboratory logistics and equipment funding rounds.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-blue-950/80 shadow-3xs">
                  <h4 className="font-bold text-blue-300 mb-1">Research Publication prep:</h4>
                  <p className="font-semibold text-blue-450">Elena Rodriguez's publishing draft has been approved for peer review submissions. Academic Board requested minor edits to diagrams on Page 4.</p>
                </div>
              </div>

              <button 
                onClick={() => setSmartSummaryOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                DISMISS SUMMARY
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
