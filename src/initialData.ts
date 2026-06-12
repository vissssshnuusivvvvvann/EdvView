import { Student, Notice, DirectMessage, Announcement, Course, Assignment } from './types';

export const INITIAL_STUDENTS: Student[] = [
  { id: '88210', name: 'Alex Johnson', email: 'alex.j@eduadmin.io', classGroup: 'CS-A1', status: 'Present' },
  { id: '88215', name: 'Blake Smith', email: 'blake.s@eduadmin.io', classGroup: 'CS-A1', status: 'Absent' },
  { id: '88222', name: 'Casey Davis', email: 'casey.d@eduadmin.io', classGroup: 'MA-B2', status: 'Present' },
  { id: '88231', name: 'Elena Martinez', email: 'elena.m@eduadmin.io', classGroup: 'PH-A2', status: 'Late' },
  { id: '88240', name: 'Julianna Drago', email: 'julianna.d@eduadmin.io', classGroup: 'CS-A1', status: 'Present' },
  { id: '88255', name: 'Marcus Aurelius', email: 'marcus.a@eduadmin.io', classGroup: 'CS-A1', status: 'Present' },
  { id: '88268', name: 'Selena Gomez', email: 'selena.g@eduadmin.io', classGroup: 'PH-A2', status: 'Absent' },
  { id: '88274', name: 'Bruce Wayne', email: 'bruce.w@eduadmin.io', classGroup: 'MA-B2', status: 'Present' },
  { id: '88289', name: 'Ada Lovelace', email: 'ada.l@eduadmin.io', classGroup: 'CS-A1', status: 'Present' },
  { id: '88295', name: 'Alan Turing', email: 'alan.t@eduadmin.io', classGroup: 'MA-B2', status: 'Late' }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    date: 'OCT 22',
    category: 'Academic',
    title: 'Mid-semester Faculty Review Scheduled',
    description: 'All department heads are requested to submit performance metrics by EOD.'
  },
  {
    id: '2',
    date: 'OCT 20',
    category: 'System',
    title: 'LMS Server Maintenance',
    description: 'Expected downtime: Sunday 02:00 AM to 06:00 AM.'
  },
  {
    id: '3',
    date: 'OCT 19',
    category: 'Event',
    title: 'Annual Science Symposium 2024',
    description: 'Registration for guest speakers is now open on the portal.'
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    sender: {
      name: 'Sarah Miller',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VF_PUt8IILRZIKm3bBfYIxL7-3ksXIS99jrayRLUUVaojxfPWjM5QxrsIFiriRkQGexZQGl52aj3ygoBFB7PTNIZ4Xq3L3cFNgui0i8Pbpx0zgZwJEaSBLJdcQ0TSrgr0Tk9dU67IB6qnPAG-TqvztZUPqGMLfXkR-6vVdsyAbYtGlUH5mi0EYeXWTObV7700ug_GR7UpP81Tu4gTKF9z3_MUbF3FjueX_YRO8PaOnKrxrGyi41bqhxaLXveZFfXQ2N3o2IdCQA',
      isUnread: true,
      unreadCount: 2
    },
    lastMessage: 'The curriculum updates are ready for your final approval. Can we...',
    time: '10:42 AM',
    chatHistory: [
      { sender: 'other', text: 'Good morning Dr. Aris! I wanted to check in on the curriculum proposal.', timestamp: '09:00 AM' },
      { sender: 'user', text: 'Good morning Sarah, I will review it in the afternoon.', timestamp: '09:12 AM' },
      { sender: 'other', text: 'Perfect. The curriculum updates are ready for your final approval. Can we schedule a brief 5-min sync to sign off?', timestamp: '10:42 AM' }
    ]
  },
  {
    id: 'msg-2',
    sender: {
      name: 'Joshua Stevens',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfhD1q9AMJV6JhOQ8-tORIQp8PkO7OZbqb49tvTyu5-HG4lENlhwANuuOs-U3aTgKganHBmuZeQkYeVTC_r81y4B5eJahYLFL9wnP44S0gjlIsAE48PUdbEM78N9A9K21PG-9e6obPqSXAwYkEQyqAmIGVKQrX2SeYivmkZGtl47Ppq3IWNJN-pKZnnSCBtVK_xRZxcNkbtF4oV7hOQNdNWKjRzNP_kxM4LfmAm9qRzPDJ1DNjuw6oCP5Spo7s04VrHVx5PQD5PG4'
    },
    lastMessage: "I've uploaded the student attendance logs for Section B.",
    time: 'Yesterday',
    chatHistory: [
      { sender: 'user', text: 'Hi Joshua, please submit the logs as soon as you finish today\'s session.', timestamp: 'Yesterday 03:00 PM' },
      { sender: 'other', text: "I've uploaded the student attendance logs for Section B. Please let me know if there are any issues.", timestamp: 'Yesterday 05:15 PM' }
    ]
  },
  {
    id: 'msg-3',
    sender: {
      name: 'Science Faculty Hub',
      avatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&auto=format&fit=crop&q=80'
    },
    lastMessage: "Marcus: Don't forget the lab safety audit tomorrow.",
    time: 'Feb 12',
    chatHistory: [
      { sender: 'other', text: 'Welcome to the Hub everyone!', timestamp: 'Feb 10, 10:00 AM' },
      { sender: 'other', text: "Don't forget the lab safety audit tomorrow. We need all clipboards signed and ready.", timestamp: 'Feb 12, 11:30 AM' }
    ]
  },
  {
    id: 'msg-4',
    sender: {
      name: 'Elena Rodriguez',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1sV809yIfhkJHhDJAge00NaOIwji7G4-QRf2GTOvHDwxuqgu17aW7kGPBN0WA37Mf0VDUevf-gM4qJOVeFTZ8WUB5rEwAsUDQVuka8p87dBZ6n6ScwY1abvC0FgbrM-iEWkNeMRUjRwf4olj2FeZDiD06kTAfxgrpQlAPmP5w-mWhUVIiLQcuJdTIrxRMADUMGxOfb4oy5DCt91t_QlbPQA1dTjkkhZgXnilIi0-PbaoRllCFXuutvnhTcOeWv-kSezglrP6OeI'
    },
    lastMessage: 'Thank you for the feedback on my recent publication draft.',
    time: 'Feb 11',
    chatHistory: [
      { sender: 'other', text: 'Dear Dr. Aris, I emailed you the preprint.', timestamp: 'Feb 10, 11:15 AM' },
      { sender: 'user', text: 'Hi Elena, I reviewed Page 4. Outstanding research design.', timestamp: 'Feb 11, 09:20 AM' },
      { sender: 'other', text: 'Thank you for the feedback on my recent publication draft. It is greatly appreciated!', timestamp: 'Feb 11, 09:45 AM' }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    senderName: 'Principal\'s Office',
    senderRole: 'Administration',
    title: 'Board Meeting Summary',
    content: 'The highlights of our annual academic review meeting have been prepared. High priority is placed on enhancing interdepartmental research opportunities.',
    time: '10:00 AM'
  },
  {
    id: 'ann-2',
    senderName: 'Security & Operations',
    senderRole: 'System',
    title: 'Parking Lot C Closure',
    content: 'Due to standard resurfacing operations, Lot C will remain closed. Please utilize Lot A or the multi-story garage until Wednesday.',
    time: 'Yesterday'
  }
];

export const INITIAL_COURSES: Course[] = [
  { id: 'CS402', name: 'Distributed Systems', instructor: 'Marcus Thorne', grade: 'A', percentage: 94.2 },
  { id: 'MA310', name: 'Linear Algebra II', instructor: 'Sarah Chen', grade: 'A-', percentage: 91.8 },
  { id: 'DS204', name: 'UX Research', instructor: 'Lydia Vance', grade: 'B+', percentage: 88.5 }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: 'a-1', title: 'Paxos Consensus Lab', courseCode: 'CS402', dateAgo: '2 days ago', score: 100, outOf: 100 },
  { id: 'a-2', title: 'Eigenvector Decomp', courseCode: 'MA310', dateAgo: '4 days ago', score: 92, outOf: 100 },
  { id: 'a-3', title: 'User Interviews', courseCode: 'DS204', dateAgo: '1 week ago', score: 85, outOf: 100 }
];
