export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  stack: string[];
  preview: string;
  image?: string;
  githubLink?: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  dateIssued: string;
  credentialId: string;
  verifyLink: string;
  certificateUrl: string;
}

export interface Skill {
  name: string;
  tooltip: string;
  proficiency?: number;
  level?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  type: 'work' | 'internship' | 'freelance' | 'volunteer';
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights: string[];
  stack: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  category: string;
  contentFile: string; // The file name, e.g. 'log4shell-deep-dive.md'
}

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  thumbnail: string;
  description: string; // this is the preview/excerpt text or html
  author: string;
}
