import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  ExternalLink, 
  Phone, 
  Award, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';
import { Student } from '../types';

interface ViewContactsProps {
  students: Student[];
}

interface FacultyContact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  avatarLetter: string;
  avatarBg: string;
}

const STATIC_FACULTY: FacultyContact[] = [
  {
    id: 'fac-1',
    name: 'Dr. Arthur Pendragon',
    role: 'Dean of Computer Science',
    email: 'a.pendragon@eduadmin.io',
    phone: '+1 (555) 019-2831',
    department: 'Computer Science',
    avatarLetter: 'A',
    avatarBg: 'bg-blue-600'
  },
  {
    id: 'fac-2',
    name: 'Prof. Morgana Le Fay',
    role: 'Head of Mathematics',
    email: 'm.lefay@eduadmin.io',
    phone: '+1 (555) 019-4820',
    department: 'Mathematics',
    avatarLetter: 'M',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'fac-3',
    name: 'Dr. Merlin Ambrosius',
    role: 'Senior Physics Researcher',
    email: 'm.ambrosius@eduadmin.io',
    phone: '+1 (555) 019-5831',
    department: 'Physics',
    avatarLetter: 'M',
    avatarBg: 'bg-violet-600'
  },
  {
    id: 'fac-4',
    name: 'Guinevere Smith',
    role: 'Director of Human Resources',
    email: 'g.smith@eduadmin.io',
    phone: '+1 (555) 020-1192',
    department: 'Administration',
    avatarLetter: 'G',
    avatarBg: 'bg-rose-600'
  }
];

export default function ViewContacts({ students }: ViewContactsProps) {
  const [activeSegment, setActiveSegment] = useState<'all' | 'faculty' | 'students'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const filteredFaculty = STATIC_FACULTY.filter(fac => {
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      fac.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
      fac.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || fac.department.toLowerCase().includes(selectedGroup.toLowerCase());
    return matchesSearch && matchesGroup;
  });

  const filteredStudents = students.filter(std => {
    const matchesSearch = 
      std.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      std.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      std.id.includes(searchTerm);
    const matchesGroup = selectedGroup === 'all' || std.classGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-blue-950/80">
        <div>
          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em]">Roster Indexes</span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-400" />
            Staff & Student Contacts
          </h2>
        </div>

        <div className="flex bg-slate-950 p-1 border border-blue-955 rounded-xl">
          <button 
            onClick={() => setActiveSegment('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeSegment === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-400 hover:text-white'
            }`}
          >
            All Contacts
          </button>
          <button 
            onClick={() => setActiveSegment('faculty')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeSegment === 'faculty' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-400 hover:text-white'
            }`}
          >
            Faculty & Staff
          </button>
          <button 
            onClick={() => setActiveSegment('students')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeSegment === 'students' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-400 hover:text-white'
            }`}
          >
            Active Students
          </button>
        </div>
      </div>

      {/* Statistical Dashboard Accent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 border border-blue-955 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-950 rounded-lg text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase">Faculty Directory</p>
            <p className="text-xl font-extrabold text-white">{STATIC_FACULTY.length} Active Staff</p>
          </div>
        </div>
        <div className="bg-slate-950 border border-blue-955 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-950 rounded-lg text-emerald-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-500 uppercase">Student Enrolled</p>
            <p className="text-xl font-extrabold text-white">{students.length} Evaluated</p>
          </div>
        </div>
        <div className="bg-slate-950 border border-blue-955 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-violet-950 rounded-lg text-violet-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-violet-500 uppercase">Major Cohorts</p>
            <p className="text-xl font-extrabold text-white">3 active lines</p>
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-blue-500" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search directory by name, role, email or core ID..."
            className="w-full bg-slate-950 border border-blue-950 text-blue-200 pl-11 pr-4 py-3 text-xs rounded-xl placeholder-blue-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-blue-500 hidden sm:inline" />
          <select 
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-slate-950 border border-blue-950 text-blue-300 text-xs p-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 w-full font-bold"
          >
            <option value="all">All Specialties / Cohorts</option>
            <option value="CS-A1">CS-A1 Group</option>
            <option value="MA-B2">MA-B2 Group</option>
            <option value="PH-A2">PH-A2 Group</option>
            <option value="Computer">Computer Science Department</option>
            <option value="Mathematics">Mathematics Department</option>
            <option value="Physics">Physics Department</option>
          </select>
        </div>
      </div>

      {/* Directories display section */}
      <div className="space-y-6">
        
        {/* FACULTY AND STAFF DIRECTORY CARD SECTION */}
        {(activeSegment === 'all' || activeSegment === 'faculty') && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase text-blue-400 tracking-wider">Faculty & Admin Officers</h3>
            {filteredFaculty.length === 0 ? (
              <p className="text-xs text-blue-500 py-2 italic font-semibold">No faculty match the filtration metrics.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFaculty.map(fac => (
                  <div key={fac.id} className="p-4 bg-slate-950 border border-blue-955 rounded-xl hover:border-blue-500 transition-all flex gap-4 items-center">
                    <div className={`w-11 h-11 rounded-lg ${fac.avatarBg} text-white font-black text-sm flex items-center justify-center`}>
                      {fac.avatarLetter}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-white tracking-tight">{fac.name}</h4>
                      <p className="text-[10px] text-blue-450 font-semibold">{fac.role}</p>
                      
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-blue-500 font-mono font-medium">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-blue-600" />
                          {fac.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-blue-600" />
                          {fac.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STUDENTS ROSTER DIRECTORY CARD SECTION */}
        {(activeSegment === 'all' || activeSegment === 'students') && (
          <div className="space-y-3 pt-4 border-t border-blue-955/30">
            <h3 className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Enrolled Student Roster</h3>
            {filteredStudents.length === 0 ? (
              <p className="text-xs text-blue-500 py-2 italic font-semibold">No student records match search metrics.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStudents.map(std => (
                  <div key={std.id} className="p-4 bg-slate-950 border border-blue-955 rounded-xl hover:border-blue-500 transition-all flex gap-4 items-center">
                    <div className="w-11 h-11 rounded-lg bg-blue-950/80 border border-blue-900/40 text-blue-300 font-black text-sm flex items-center justify-center font-mono">
                      {std.name.charAt(0)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white tracking-tight">{std.name}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-blue-950 border border-blue-900/40 text-blue-400 rounded">
                          {std.classGroup}
                        </span>
                      </div>
                      <p className="text-[10px] text-blue-500 font-mono mt-0.5">ID: {std.id} • {std.email}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          std.status === 'Present' 
                            ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/30' 
                            : std.status === 'Late'
                              ? 'bg-amber-950/45 text-amber-400 border border-amber-900/30'
                              : 'bg-rose-950/45 text-rose-400 border border-rose-900/30'
                        }`}>
                          {std.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
