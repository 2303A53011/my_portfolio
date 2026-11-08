import { useRef } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';

export default function Heading({ n, kicker, title, italic }: { n: string; kicker: string; title: string; italic: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.hd-title', { yPercent: 35, opacity: 0, filter: 'blur(12px)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 88%' } });
      gsap.from('.hd-kick', { opacity: 0, y: 12, duration: 0.8, scrollTrigger: { trigger: root.current, start: 'top 92%' } });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="mb-12 md:mb-16">
      <div className="hd-kick mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70 backdrop-blur">
        <span className="text-signal">{n}</span>
        {kicker}
      </div>
      <h2 className="hd-title font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight">
        {title} <span className="font-serif-i text-signal">{italic}</span>
      </h2>
    </div>
  );
}
