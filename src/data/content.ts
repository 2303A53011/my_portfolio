import { Project, Certification, SkillGroup, Experience } from '../types';

export const personalInfo = {
  fullName: 'Fazal Shaik',
  tagline: 'Turning data into defense. Automating response. Strengthening security.',
  location: 'India',
  availability: 'Open for internships or security-focused opportunities',
  githubUrl: 'https://github.com/shaikfazal-del',
  social: {
    linkedin: 'https://www.linkedin.com/in/fazal-shaikk/',
    github: 'https://github.com/shaikfazal-del',
    tryhackme: 'https://tryhackme.com/p/FazalShaik',
    medium: 'https://medium.com/@fazal-sec/about',
  },
  aboutText: [
    'Hi, I’m Fazal—a passionate and curious Computer Science undergraduate specializing in Cyber Security. From a young age, I’ve been fascinated by how technology works—whether it\'s computers, mobile devices, or the vast digital world that connects them. This natural curiosity drives me to constantly explore and adapt to new technologies, always eager to understand how things function and why they matter.',
    'Currently, I’m diving deep into the world of cybersecurity, with a strong focus on both offensive (ethical hacking, penetration testing) and defensive (SOC operations, threat detection) strategies. I believe in project-based learning, which helps me translate theoretical concepts into real-world applications. Building projects not only enhances my understanding but also prepares me to meet current industry demands.',
    'I\'m a fast learner, consistent by nature (a habit I developed through regular gym training), and committed to continuous self-improvement. I actively research, experiment, and stay updated with the latest trends by constantly "Googling" how things work—be it a new exploit, protocol, or security tool.',
    'I’m always excited to collaborate, learn from others, and grow in this ever-evolving field.',
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Offensive Security',
    skills: [
      { name: 'Penetration Testing', tooltip: 'Web' },
      { name: 'Vulnerability Research', tooltip: '0-day discovery and disclosure' },
    ],
  },
  {
    category: 'Defensive Operations',
    skills: [
      { name: 'SIEM Architecture', tooltip: 'Splunk, ELK stack, QRadar ' },
      { name: 'Incident Response', tooltip: 'NIST and SANS IR frameworks' },
      { name: 'Digital Forensics', tooltip: 'Network and endpoint forensics' },
      { name: 'EDR/XDR', tooltip: 'CrowdStrike, SentinelOne, Carbon Black' },
    ],
  },
  // {
  //   category: 'DevSecOps',
  //   skills: [
  //     { name: 'Security as Code', tooltip: 'Automated security controls' },
  //   ],
  // },
  {
    category: 'Scripting & Languages',
    skills: [
      { name: 'Python', tooltip: 'Security automation and tool development' },
      { name: 'PowerShell', tooltip: 'Windows security operations' },
      { name: 'Bash', tooltip: 'Linux system administration and scripting' },
      { name: 'JavaScript', tooltip: 'Full-stack security dashboards' },
      { name: 'C', tooltip: 'System design ' },
    ],
  },
  {
    category: 'Research & Writing',
    skills: [
      { name: 'Threat Intelligence', tooltip: 'MITRE ATT&CK mapping and analysis' },
      { name: 'Technical Writing', tooltip: 'Blog posts and documentation' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'siem-query-generator-pro',
    title: 'Production-ready SIEM detection engineering assistant for building scalable, high-fidelity threat detections across multiple SIEM platforms.',
    tagline: 'Unified SOC environment integrating SIEM, IDS, and automation for real-world defense simulation',
    tags: ['SIEM', 'IDS', 'Incident Response', 'SOC Operations'],
    stack: ['SIEM Query Optimization', 'chatgpt', 'High-Volume Log Analysis', 'Detection Engineering'],
    preview: 'terminal',
    image: '/project-4.webp',
    githubLink: 'https://chatgpt.com/g/g-69427c80a6008191bc58dc6092fcbf2a-siem-query-generator-pro',
    description: 'Designed an elite SIEM & threat detection assistant focused on real-world SOC operations, enabling security teams to translate attacker behavior into optimized, SOC-ready detection logic across enterprise environments.',
  },
  {
    id: 'Enterprise-soc-lab',
    title: 'Integrated Network & Host Monitoring for Enterprise Infrastructure',
    tagline: 'Unified SOC environment integrating SIEM, IDS, and automation for real-world defense simulation',
    tags: ['SIEM', 'IDS', 'Incident Response', 'Automation', 'SOC'],
    stack: ['Wazuh', 'Snort', 'Slack API', 'Tailscale', 'AWS EC2', 'Ubuntu', 'Windows Server'],
    preview: 'terminal',
    image: '/project-1.webp',
    githubLink: 'https://github.com/shaikfazal-del/vm-based-soc-lab',
    description: 'Developed a complete enterprise-style Security Operations Center (SOC) lab using multiple virtual machines to simulate hybrid infrastructure monitoring. Integrated Wazuh SIEM, Snort IDS, and Slack automation for centralized threat detection and alerting across Windows, Linux, and cloud environments. Configured custom Wazuh rules, VPN-based log forwarding, and real-time incident response notifications, demonstrating hands-on expertise in Blue Team operations, network security, and SOC workflows.',
  },

  {
    id: 'ir-simulation-phishing-malware',
    title: 'Incident Response Simulation – Phishing to Malware to Data Exfiltration',
    tagline: 'End-to-end incident response project simulating a phishing-led malware attack and full forensic investigation',
    tags: ['Incident Response', 'Digital Forensics', 'Threat Emulation', 'NIST Framework', 'SIEM'],
    stack: ['Python', 'scikit-learn', 'Splunk', 'Docker', 'Kali Linux', 'Windows 10', 'Metasploit', 'Wazuh', 'Volatility', 'Wireshark'],
    preview: 'code',
    image: '/project-2.webp',
    githubLink: 'https://github.com/shaikfazal-del/phishing-incident-playbook',
    description: 'Designed and executed a full-scale incident response simulation following the NIST SP 800-61 framework. Simulated a realistic phishing attack delivering a malicious executable from a Kali Linux attacker VM to a Windows victim, resulting in malware execution and controlled data exfiltration. Performed identification, containment, eradication, and recovery using Wazuh SIEM, Volatility, and network forensics. Produced a professional incident report documenting the attack timeline, IOCs, root cause, and lessons learned. This project demonstrates complete IR cycle proficiency — from adversary emulation to forensic triage and post-incident improvement.',
  },
  {
    id: 'url-check',
    title: 'URL Check – Malicious URL Analyzer',
    tagline: 'Lightweight command-line tool for threat intelligence and malicious URL analysis using VirusTotal API',
    tags: ['Threat Intelligence', 'Automation', 'OSINT', 'Malware Analysis'],
    stack: ['Python', 'VirusTotal API', 'CLI'],
    preview: 'dashboard',
    image: '/project-3.webp',
    githubLink: 'https://github.com/shaikfazal-del/url-check',
    description: 'Developed a Python-based command-line utility that automates URL intelligence gathering through the VirusTotal API. The tool provides engine-wise detection reports, statistical breakdowns, and interactive scanning for multiple URLs. Designed for quick triage of suspicious links with minimal setup, it supports cross-platform operation on Kali Linux, Ubuntu, and Parrot OS, emphasizing efficient and reproducible information gathering workflows for cybersecurity professionals.',
  },
  {
    id: 'passbolt-aws-selfhosted',
    title: 'Enterprise Password Manager – Passbolt on AWS',
    tagline: 'Self-hosted password manager built with Passbolt on AWS EC2, using OpenPGP encryption and HTTPS.',
    tags: ['Cloud Security', 'IAM', 'Infrastructure', 'Encryption'],
    stack: ['AWS EC2', 'Passbolt', 'OpenPGP', 'Ubuntu', 'SSL/TLS'],
    preview: 'dashboard',
    image: '/project-5.webp',
    githubLink: 'https://github.com/shaikfazal-del/passbolt-aws-selfhosted',
    description: 'Designed and deployed a self-hosted enterprise password management solution using Passbolt on AWS EC2. Secured the infrastructure with OpenPGP encryption for end-to-end credential protection and configured strict HTTPS/SSL standards using a custom domain. This project demonstrates proficiency in secure cloud infrastructure deployment, self-hosting practices, and applied cryptography for identity and access management.',
  },
  {
    id: 'tpot-honeypot-azure',
    title: 'T-Pot Honeypot on Microsoft Azure',
    tagline: 'Watch the internet try to break in — in real time.',
    tags: ['Honeypot', 'Cloud Security', 'Threat Intelligence', 'Azure', 'Blue Team'],
    stack: ['Azure', 'Ubuntu 22.04', 'Docker', 'T-Pot', 'Elasticsearch', 'Kibana', 'Logstash', 'Cowrie'],
    preview: 'dashboard',
    image: '/project-6.webp',
    githubLink: 'https://github.com/shaikfazal-del/threat-intel-honeypot',
    description: 'Deployed T-Pot — a 20+ honeypot all-in-one platform — on a Microsoft Azure Ubuntu VM using the free tier. Configured a Network Security Group to expose all 65,535 ports for maximum attacker attraction, then orchestrated Cowrie (SSH/Telnet), Dionaea (malware capture), Log4Pot (Log4Shell), and 17 more honeypots via Docker Compose. Integrated the full ELK stack for real-time threat analytics: attack heatmaps, attacker geolocation, credential spray logs, and malware samples — all visualized in Kibana. Documented the complete setup with a Medium blog post covering Azure provisioning, NSG configuration, T-Pot installation, and dashboard walkthrough.',
  },
];

export const certifications: Certification[] = [
  {
    id: 'junior-cybersecurity-analyst',
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    issuerLogo: '/cisco.svg',
    dateIssued: '2024-12-19',
    credentialId: '',
    verifyLink: 'https://drive.google.com/file/d/1nx0ZejlIr3XQ3cuObXfXXb2nd8Ln61tx/view?usp=sharing',
    certificateUrl: '/certificates/junior-cybersecurity-analyst.png',
  },
  {
    id: 'azure-ai-fundamentals',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    issuerLogo: '/microsoft.png',
    dateIssued: '2025-09-11',
    credentialId: '',
    verifyLink: 'https://drive.google.com/file/d/1nkrnjini5LUYdIwGguNuG3IpJZYos5Np/view?usp=sharing',
    certificateUrl: '/certificates/azure-ai-fundamentals.png',
  },
  {
    id: 'tryhackme-presecurity',
    title: 'Pre Security Learning Path',
    issuer: 'TryHackMe',
    issuerLogo: 'https://assets.tryhackme.com/img/THMlogo.png',
    dateIssued: '2025-06-24',
    credentialId: '',
    verifyLink: 'https://drive.google.com/file/d/1Wg0Rmq80Np1FsXDr4FyRAqLRNcoYGD47/view?usp=sharing',
    certificateUrl: '/certificates/tryhackme-presecurity.png',
  },
  {
    id: 'networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    issuerLogo: '/cisco.svg',
    dateIssued: '2024-12-17',
    credentialId: '',
    verifyLink: 'https://drive.google.com/file/d/113ffJyZMRExtdIMD-K_qYiIS2veD1zP7/view?usp=sharing',
    certificateUrl: '/certificates/networking-basics.png',
  },
];

export const experiences: Experience[] = [
  {
    id: 'ai-security-intern',
    role: 'AI Security Developer Intern',
    company: 'Infosys Springboard',
    type: 'internship',
    location: 'Remote',
    startDate: '2026-02',
    endDate: '2026-03',
    description:
      'Built a secure AI-powered banking chatbot with validation layers, enforcing query restrictions and controlled LLM behavior to prevent prompt injection and data leakage.',
    highlights: [
      'Engineered JSON-based validation layer restricting LLM outputs to approved banking queries, mitigating prompt injection risks',
      'Implemented session-state isolation and modular auth flows across a multi-user Streamlit application',
      'Designed input sanitization logic reducing irrelevant/malicious prompt responses by ~80% in test scenarios',
      'Applied secure coding practices across Python backend to ensure stable, controlled AI behavior under load',
    ],
    stack: ['Python', 'Streamlit', 'LLM Security', 'Prompt Engineering', 'Secure Architecture'],
  },
];


