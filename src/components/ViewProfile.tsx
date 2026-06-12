import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Phone, 
  Server, 
  Database, 
  Key, 
  Edit2, 
  Check, 
  Trash2, 
  Sparkles, 
  Calendar, 
  Terminal,
  Activity,
  LogOut,
  Sliders,
  Fingerprint
} from 'lucide-react';
import { motion } from 'motion/react';

interface ViewProfileProps {
  userEmail: string;
}

export default function ViewProfile({ userEmail }: ViewProfileProps) {
  // Local active editable states
  const [name, setName] = useState('Michael Scott');
  const [phone, setPhone] = useState('+1 (555) 739-1102');
  const [office, setOffice] = useState('Central Tower, Wing D Base');
  const [role, setRole] = useState('Lead Systems Registrar & Academic Administrator');
  
  const [isEditing, setIsEditing] = useState(false);
  const [systemLogs, setSystemLogs] = useState([
    { id: 'l1', action: 'Ledger finalization approved', time: 'Just now', scope: 'CS402' },
    { id: 'l2', action: 'Authorized simulated alert dispatch', time: '12 min ago', scope: 'System' },
    { id: 'l3', action: 'Direct messaging connection refreshed', time: '1 hour ago', scope: 'Inbox' },
    { id: 'l4', action: 'SSL synchronizer manual trigger', time: 'Yesterday', scope: 'AWS S3' },
    { id: 'l5', action: 'Faculty credentials verified at gate', time: 'Yesterday', scope: 'Core Auth' }
  ]);
  
  const [simToken, setSimToken] = useState('sha256-edu_sys_admin_97552_consensus_authorized');

  const handleSave = () => {
    setIsEditing(false);
  };

  const regenerateToken = () => {
    const chars = 'abcdef0123456789';
    let token = 'sha256-';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSimToken(token);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header Section */}
      <div className="pb-2 border-b border-blue-950/80">
        <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em]">Personnel Registry</span>
        <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2.5">
          <User className="w-6 h-6 text-blue-400" />
          Registrar Profile
        </h2>
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card Summary & Action Columns (Col 1 to 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Profile Card */}
          <section className="bg-slate-950 border border-blue-955 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
            {/* Glowing Accent Orbs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-950/20 rounded-full blur-2xl"></div>

            <div className="flex flex-col items-center text-center relative z-10 py-4">
              <div className="w-24 h-24 rounded-full border-2 border-blue-500 overflow-hidden bg-slate-900 group-hover:border-sky-400 transition-all duration-300 p-1 mb-4 shadow-xl shadow-blue-950/40">
                <img 
                  alt="Avatar Profile" 
                  className="w-full h-full rounded-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGKb1lucsp-2IaE9J6Xfn_fpxP7fj1ulXFctmPW-HA52MgW29h7bt3XtLbNBtwxfYnO_9QxFWjYOeLZhNBYB4rXxoXZtKiLeQQo_yafAzP9oKXIdJuzLRYrlwjSv2eLEAbLIomE5cxwSYgq8QMH7NhAuHws8zKhJen1dOB-XR0NzWIppix6Fe8m0pEWxSpP4-Nu4OGIxyhwAsZS_3IXSe4AB-5Or92juMblZ0v9ooxoJZQVM9-P7n2LFn2r8dGn4NIxLwmJUxWm-U"
                  referrerPolicy="no-referrer"
                />
              </div>

              {isEditing ? (
                <div className="space-y-2 w-full max-w-xs mb-2">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-center bg-slate-900 border border-blue-955 rounded-lg py-1.5 px-3 text-xs text-white uppercase font-extrabold focus:outline-none focus:border-blue-500"
                    placeholder="Enter Custom Name"
                  />
                  <input 
                    type="text" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-center bg-slate-900 border border-blue-955 rounded-lg py-1 px-3 text-[10px] text-blue-400 font-semibold focus:outline-none focus:border-blue-500"
                    placeholder="Enter Custom Role"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-black text-white tracking-tight uppercase">{name}</h3>
                  <p className="text-xs text-blue-400 mt-1 font-semibold max-w-xs">{role}</p>
                </>
              )}

              <span className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest bg-blue-950 border border-blue-900/50 text-blue-300">
                <Shield className="w-3 h-3 text-blue-500" />
                CONCENSUS AUTH LEVEL 4
              </span>
            </div>

            {/* Quick Actions Buttons */}
            <div className="border-t border-blue-955/65 pt-4 mt-2 flex items-center justify-between select-none">
              <span className="text-[10px] text-blue-500 font-mono">STAFF BARCODE: #8824A</span>
              
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="px-3.5 py-1.5 bg-blue-600 text-white font-extrabold text-[10px] rounded-lg transition-colors hover:bg-blue-500 cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Apply Save
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 bg-slate-900 border border-blue-955 text-blue-300 hover:text-white hover:border-blue-500 font-extrabold text-[10px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit Profile
                </button>
              )}
            </div>
          </section>

          {/* Infrastructure Metrics Status Card */}
          <section className="bg-slate-950 border border-blue-955 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              Direct credentials
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-blue-955/40 text-xs">
                <span className="text-blue-500 font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Active Email
                </span>
                <span className="font-semibold text-blue-200 text-right truncate max-w-[180px]" title={userEmail}>
                  {userEmail || 'registrar@eduadmin.io'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-blue-955/40 text-xs">
                <span className="text-blue-500 font-bold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Contact Line
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-900 border border-blue-955 rounded px-2 py-0.5 text-xs text-right text-blue-200 w-36 font-semibold"
                  />
                ) : (
                  <span className="font-semibold text-blue-200">{phone}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-500 font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Office Node
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={office} 
                    onChange={(e) => setOffice(e.target.value)}
                    className="bg-slate-900 border border-blue-955 rounded px-2 py-0.5 text-xs text-right text-blue-200 w-44 font-semibold mr-0"
                  />
                ) : (
                  <span className="font-semibold text-blue-200">{office}</span>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* Detailed Logs & Core Token Admin columns (Col 6 to 12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECURE CREDENTIALS KEY MANAGEMENT BOX */}
          <section className="bg-slate-950 border border-blue-955 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-blue-955/50">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-black uppercase text-blue-250 tracking-wider">Access Token Authorization</h4>
              </div>
              
              <button 
                onClick={regenerateToken}
                className="px-2.5 py-1 bg-blue-950 hover:bg-blue-950/70 border border-blue-900 text-blue-400 hover:text-white transition-all rounded text-[10px] font-mono font-bold cursor-pointer flex items-center gap-1.5"
              >
                Regenerate key
              </button>
            </div>

            <p className="text-[11px] text-blue-500/90 font-medium leading-relaxed">
              These auto-compiled credentials guarantee decentralized paxos network validation with AWS Singapore S3 nodes and database ledger consistency. Keep this private.
            </p>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-blue-955 flex items-center justify-between font-mono text-[10px] text-blue-450 hover:text-blue-300 transition-colors">
              <span className="truncate mr-4 font-bold select-all">{simToken}</span>
              <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0 animate-pulse" />
            </div>
          </section>

          {/* RECENT OPERATIONAL SYSTEM AUDIT LOG */}
          <section className="bg-slate-950 border border-blue-955 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-blue-955/50">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h4 className="text-xs font-black uppercase text-blue-250 tracking-wider">Session Audit Trace</h4>
              </div>
              <span className="text-[9px] font-mono text-emerald-500 uppercase px-1.5 py-0.5 bg-emerald-950/20 border border-emerald-950 rounded">Live Feed</span>
            </div>

            <div className="space-y-3">
              {systemLogs.map(log => (
                <div key={log.id} className="p-3 bg-slate-900/35 border border-blue-955/50 rounded-xl flex justify-between items-center hover:border-blue-500/45 transition-colors gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 animate-pulse" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-white tracking-tight truncate">{log.action}</p>
                      <p className="text-[9px] text-blue-500 font-mono mt-0.5 font-bold">Scope: {log.scope}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-blue-550 flex-shrink-0 font-bold whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSystemLogs(prev => prev.slice(0, 1))}
              className="w-full py-2 border border-blue-955 hover:border-red-950 bg-slate-950 hover:bg-red-950/20 text-blue-500 hover:text-red-400 font-bold text-[10px] rounded-xl transition-all cursor-pointer block text-center"
            >
              Flush Audit Logs
            </button>
          </section>

        </div>

      </div>

    </div>
  );
}
