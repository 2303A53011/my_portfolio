import { useRef } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { scrollToId } from '../lib/lenis';

type Social = { linkedin: string; github: string; tryhackme: string; medium: string };

export default function Footer({ fullName, social }: { fullName: string; social: Social }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.ft-word', { yPercent: 40, opacity: 0, duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
    },
    { scope: root }
  );
  const links = [['GitHub', social.github], ['LinkedIn', social.linkedin], ['TryHackMe', social.tryhackme], ['Medium', social.medium]];
  return (
    <footer ref={root} className="relative z-10 overflow-hidden px-5 pt-16 md:px-10">
      <div className="relative z-20 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-bone/60">
        <nav className="flex flex-wrap gap-6" aria-label="Social">
          {links.map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">{l} ↗</a>
          ))}
        </nav>
        <button onClick={() => scrollToId('home')} className="transition-colors hover:text-signal">Back to top ↑</button>
      </div>
      <div className="ft-word text-grad pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(3.5rem,17vw,22rem)] font-semibold leading-[0.9] tracking-[-0.05em]">{fullName}</div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 pb-8 font-mono text-[11px] text-mute">
        <span>© {new Date().getFullYear()} {fullName}. Built with React + GSAP.</span>
        <span>psst: press Ctrl+K</span>
      </div>
    </footer>
  );
}
