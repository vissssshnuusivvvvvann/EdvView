import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Settings, 
  RefreshCw, 
  ShieldAlert, 
  Sparkles,
  Info 
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'operational' | 'academic' | 'hardware';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'operational',
    question: 'How are Saturday and Sunday highlights configured in the Calendar view?',
    answer: 'Weekend days are automatically highlighted using specific color indicators: Saturdays feature a vibrant green drop-shadow neon glow text, while Sundays are highlighted with a bright red neon-glow layout to guarantee fast visual scanning of attendance and operations logs.'
  },
  {
    id: 'faq-2',
    category: 'academic',
    question: 'How is the Cumulative Score GPA calculated?',
    answer: 'The Cumulative Score leverages student exam performance weighted against cohort assignments. The column bar visualizer on the dashboard utilizes neon blue theme accents, matching the unified deep dark theme profile of the EdView terminal.'
  },
  {
    id: 'faq-3',
    category: 'operational',
    question: 'How do I authorize late student logs or register exceptions?',
    answer: 'Navigate to the Roster index (Logs) page, identify the student record, and click on the "Present", "Absent", or "Late" status pill box. The ledger updates instantly in memory and reflects across all dependent administrative panels.'
  },
  {
    id: 'faq-4',
    category: 'hardware',
    question: 'What is the warning SSL Sync Handshake timeout on the backups?',
    answer: 'The backup system attempts automated full database mirroring to AWS Singapore S3 buckets. If a brief routing timeout occurs, the system triggers a secure rollback, records an Operation Audit log, and queues a subsequent retry. No developer intervention is required.'
  },
  {
    id: 'faq-5',
    category: 'academic',
    question: 'How do I issue global bulletin boards / Broadcaster announcements?',
    answer: 'Click the "+" floating action button at the bottom-right corner of the interface. Select "Publish Notice Board Item" or "Broadcaster Announcement", specify notice parameters, and click send. It instantly propagates to all faculty and administrator accounts.'
  }
];

export default function ViewFAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'operational' | 'academic' | 'hardware'>('all');

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-blue-950/80">
        <div>
          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em]">Operational Guidelines</span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            Support Directive & FAQ
          </h2>
        </div>

        <div className="flex bg-slate-950 p-1 border border-blue-955 rounded-xl">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'
            }`}
          >
            All Questions
          </button>
          <button 
            onClick={() => setActiveCategory('operational')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'operational' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'
            }`}
          >
            Operations
          </button>
          <button 
            onClick={() => setActiveCategory('academic')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'academic' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'
            }`}
          >
            Academics
          </button>
          <button 
            onClick={() => setActiveCategory('hardware')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'hardware' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'
            }`}
          >
            Backup & Sync
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Accordions List (Col 1-8) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-blue-950/20 border-blue-500/80 shadow-lg' 
                    : 'bg-slate-950 border-blue-955/50 hover:border-blue-900/60'
                }`}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer outline-none focus:outline-none"
                >
                  <span className="text-xs font-extrabold text-blue-105 tracking-tight group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-900 border border-blue-955 text-blue-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1.5 border-t border-blue-955/35">
                    <p className="text-xs text-blue-400 leading-relaxed font-semibold">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Info Blocks (Col 9-12) */}
        <aside className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-950 border border-blue-955 p-5 rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 bg-blue-950 rounded-lg text-blue-400">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase text-blue-250">Support Directive</h3>
            </div>
            <p className="text-blue-450 text-[11px] font-semibold leading-relaxed">
              If an operational discrepancy or sync timing issue is observed on the campus server node networks, review the security logs or report to the Admin Officer on shift.
            </p>
          </div>

          <div className="bg-slate-950 border border-blue-955 p-5 rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 bg-violet-950 rounded-lg text-violet-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h3 className="text-xs font-black uppercase text-blue-250">Core Maintenance</h3>
            </div>
            <p className="text-blue-450 text-[11px] font-semibold leading-relaxed">
              Main power grids and local server sync sweeps happen automatically every Monday morning between 02:00 AM and 04:00 AM local time.
            </p>
          </div>

        </aside>

      </div>

    </div>
  );
}
