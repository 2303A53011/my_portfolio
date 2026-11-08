import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '../lib/gsap';
import { skillGroups } from '../data/content';

const all = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const tween = gsap.fromTo('.mq-row', { xPercent: 0 }, { xPercent: -50, ease: 'none', duration: 70, repeat: -1 });
      const proxy = { ts: 1 };
      const skew = gsap.quickTo('.mq-wrap', 'skewX', { duration: 0.4, ease: 'power3' });
      const apply = () => tween.timeScale(proxy.ts);
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          skew(gsap.utils.clamp(-10, 10, v / -250));
          gsap.to(proxy, {
            ts: 1 + Math.min(Math.abs(v) / 300, 9),
            duration: 0.25,
            overwrite: true,
            onUpdate: apply,
            onComplete: () => gsap.to(proxy, { ts: 1, duration: 1.4, ease: 'power2.out', onUpdate: apply }),
          });
        },
      });
    },
    { scope: root }
  );

  const set = (
    <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden="true">
      {all.map((w, i) => (
        <span
          key={w + i}
          data-cursor
          className={`group flex items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-signal hover:text-ink ${
            i % 3 === 0 ? 'border-white/25 bg-white/10' : 'border-white/10 bg-white/[0.04]'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_#4DFFD2] transition-colors group-hover:bg-ink group-hover:shadow-none" />
          <span className={i % 2 ? 'font-serif-i text-[clamp(1.8rem,3.6vw,3rem)] leading-none' : 'font-display text-[clamp(1.6rem,3.2vw,2.7rem)] font-semibold leading-none tracking-tight'}>{w}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.02] py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="mq-wrap">
        <div className="mq-row flex w-max will-change-transform">
          {set}
          {set}
        </div>
      </div>
    </div>
  );
}
