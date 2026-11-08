import { useRef } from 'react';
import { Github, Linkedin, MapPin, GraduationCap, Radar, ShieldCheck } from 'lucide-react';
import { gsap, SplitText, useGSAP, prefersReduced } from '../lib/gsap';
import { personalInfo, projects, certifications } from '../data/content';
import Heading from './Heading';
import Glass from './Glass';

const STATEMENT =
  'I build security infrastructure from the ground up. SIEM pipelines on Azure, honeypots that catch real attackers, and AI that triages the noise so humans can chase the real threats.';
const HOT = ['security', 'SIEM', 'honeypots', 'AI', 'real', 'threats.'];

const stats = [
  { v: projects.length, s: '', l: 'Security projects' },
  { v: certifications.length, s: '', l: 'Certifications' },
  { v: 300, s: '+', l: 'TryHackMe rooms' },
  { v: 1, s: '%', l: 'Global rank', pre: 'Top ' },
];
const focus = ['Detection engineering', 'KQL & SPL rules', 'Suricata IDS', 'SOAR playbooks', 'Incident response', 'Threat hunting'];

export default function About({ social }: { social: typeof personalInfo.social }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const split = SplitText.create('.ab-statement', { type: 'words' });
      split.words.forEach((w) => {
        if (HOT.includes((w as HTMLElement).textContent || '')) (w as HTMLElement).classList.add('ab-hot');
      });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '.ab-statement', start: 'top 80%', end: 'bottom 45%', scrub: 0.4 } }
      );
      gsap.from('.ab-card', { opacity: 0, y: 60, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.ab-grid', start: 'top 82%' } });
      gsap.utils.toArray<HTMLElement>('.ab-num').forEach((el) => {
        const end = Number(el.dataset.v);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => (el.textContent = String(Math.round(o.v))) });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="01" kicker="About" title="Defender by" italic="design." />

      <p className="ab-statement max-w-5xl font-display text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-tight">{STATEMENT}</p>

      <div className="ab-grid mt-16 grid gap-5 lg:grid-cols-12">
        <div className="grid grid-cols-2 gap-5 lg:col-span-12 lg:grid-cols-4">
          {stats.map((s) => (
            <Glass key={s.l} className="ab-card p-6 md:p-8">
              <div className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                {s.pre}
                <span className="ab-num" data-v={s.v}>0</span>
                <span className="text-signal">{s.s}</span>
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-bone/50">{s.l}</div>
            </Glass>
          ))}
        </div>

        <Glass className="ab-card p-8 lg:col-span-7">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
            <Radar size={16} /> Current focus
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-bone/65">{personalInfo.aboutText[2]}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {focus.map((f) => (
              <span key={f} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-bone/80 transition-colors hover:border-signal hover:text-signal">{f}</span>
            ))}
          </div>
        </Glass>

        <Glass className="ab-card flex flex-col justify-between gap-6 p-8 lg:col-span-5">
          <div className="flex items-start gap-4">
            <GraduationCap className="mt-1 shrink-0 text-signal" />
            <div>
              <div className="font-display text-xl font-semibold leading-tight">B.Tech CSE · Cyber Security</div>
              <div className="mt-1 text-sm text-bone/60">SR University, Warangal · Final year</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 shrink-0 text-signal" />
            <div className="text-sm text-bone/70">ISC2 CC · IBM QRadar · CNSP · Cisco · Azure AI · THM SOC L1</div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-bone/50"><MapPin size={13} /> {personalInfo.location} · Intern @ Mitigata</div>
        </Glass>

        <Glass className="ab-card flex flex-wrap items-center gap-3 p-6 lg:col-span-12">
          <span className="mr-auto font-serif-i text-3xl">Let&apos;s connect.</span>
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-signal hover:text-signal">
            <Github size={15} /> GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-signal">
            <Linkedin size={15} /> LinkedIn
          </a>
        </Glass>
      </div>
    </section>
  );
}
