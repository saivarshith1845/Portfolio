export type NavScreen = 'home' | 'about' | 'skills' | 'projects' | 'journey' | 'contact';

export interface Project {
  id: string;
  number: string;
  badge: string;
  category: 'ai' | 'systems' | 'all';
  title: string;
  headline: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  metrics?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  systemStatus?: string;
  version?: string;
  categoryLabel?: string;
}

export interface TimelineItem {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  status: string;
  statusType: 'completed' | 'ongoing' | 'milestone' | 'upcoming' | 'current';
}

export interface Specialization {
  title: string;
  description: string;
  icon: string;
  tags: string[];
}
