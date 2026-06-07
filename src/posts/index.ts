import { BlogPost } from '../types';
import log4shellContent from './log4shell-deep-dive.md?raw';
import thmSocL1Content from './thm-soc-l1-path.md?raw';

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export const blogPosts: BlogPostWithContent[] = [
  {
    slug: 'log4shell-deep-dive',
    title: 'Demystifying Log4Shell: CVE-2021-44228 Deep Dive and Detection',
    description: 'A comprehensive technical analysis of the Apache Log4j JNDI lookup vulnerability, exploitation lifecycle, and defensive SIEM/IDS detection strategies.',
    date: '2026-06-07',
    tags: ['CVE', 'Vulnerability Research', 'SIEM', 'IDS', 'Detection Engineering'],
    readTime: '6 min read',
    category: 'Vulnerability Research',
    contentFile: 'log4shell-deep-dive.md',
    content: log4shellContent
  },
  {
    slug: 'thm-soc-l1-path',
    title: 'Review & Deep Dive: TryHackMe SOC Level 1 Learning Path',
    description: 'An in-depth review of the TryHackMe SOC Level 1 path, mapping the core concepts of blue team operations, log analysis, packet analysis, and key security tools.',
    date: '2026-06-07',
    tags: ['SOC Operations', 'Learning Path', 'Wazuh', 'Splunk', 'Blue Team'],
    readTime: '5 min read',
    category: 'SOC Operations',
    contentFile: 'thm-soc-l1-path.md',
    content: thmSocL1Content
  }
];
