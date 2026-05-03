export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  stack: string[];
  preview: string;
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
