export type TabType = 'dashboard' | 'attendance' | 'grades' | 'messages' | 'notifications' | 'contacts' | 'faq' | 'profile';

export interface Student {
  id: string; // e.g. "88210"
  name: string;
  email: string;
  classGroup: string; // e.g. "CS-A1"
  status: 'Present' | 'Absent' | 'Late';
}

export interface Notice {
  id: string;
  date: string; // e.g. "OCT 22"
  category: 'Academic' | 'System' | 'Event';
  title: string;
  description: string;
}

export interface DirectMessage {
  id: string;
  sender: {
    name: string;
    avatar: string;
    isUnread?: boolean;
    unreadCount?: number;
  };
  lastMessage: string;
  time: string;
  chatHistory: {
    sender: 'user' | 'other';
    text: string;
    timestamp: string;
  }[];
}

export interface Announcement {
  id: string;
  senderName: string;
  senderRole: string;
  title: string;
  content: string;
  time: string;
}

export interface Course {
  id: string; // e.g. "CS402"
  name: string;
  instructor: string;
  grade: string; // e.g. "A"
  percentage: number; // e.g. 94.2
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string; // e.g. "CS402"
  dateAgo: string; // e.g. "2 days ago"
  score: number;
  outOf: number;
}
