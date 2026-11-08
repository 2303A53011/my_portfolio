import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { SkillGroup } from '../types';
import Heading from './Heading';
import Glass from './Glass';

export default function Skills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const root = useRef<HTMLElement>(null);
  const [cat, setCat] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const g = skillGroups[cat];
  const shown = hover ? g.skills.find((s) => s.name === hover) : null;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.sk-shell', { opacity: 0, y: 60, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sk-shell', start: 'top 85%' } });
    },
    { scope: root }
  );

  // chips pop in whenever the category changes
  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const chips = root.current.querySelectorAll('.sk-chip');
    const t = gsap.fromTo(chips, { opacity: 0, y: 24, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, stagger: 0.035, duration: 0.6, ease: 'back.out(1.6)', clearProps: 'transform' });
    return () => {
      t.kill();
    };
  }, [cat]);

  return (
    <section ref={root} id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="02" kicker="Skills" title="The" italic="toolkit." />

      <Glass className="sk-shell grid lg:grid-cols-[300px_1fr]">
        <div className="flex gap-1 overflow-x-auto border-b border-white/10 p-3 lg:flex-col lg:border-b-0 lg:border-r lg:p-4">
          {skillGroups.map((s, i) => (
            <button
              key={s.category}
              onClick={() => setCat(i)}
              className={`group flex shrink-0 items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition-all ${i === cat ? 'bg-white text-ink' : 'text-bone/65 hover:bg-white/10 hover:text-bone'}`}
            >
              <span className="font-display text-lg font-semibold leading-tight tracking-tight">{s.category}</span>
              <span className={`font-mono text-[11px] ${i === cat ? 'text-ink/50' : 'text-bone/30'}`}>{String(s.skills.length).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div className="flex min-h-[420px] flex-col p-6 md:p-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div className="font-serif-i text-[clamp(2.4rem,5vw,4.2rem)] leading-none text-bone">{g.category}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-bone/40">{g.skills.length} tools</div>
          </div>
          <div className="flex flex-wrap content-start gap-3">
            {g.skills.map((s) => {
              const strong = (s.proficiency ?? 0) >= 80;
              return (
                <button
                  key={s.name}
                  className={`sk-chip rounded-full border px-5 py-3 text-[15px] font-medium transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-signal hover:text-ink hover:shadow-[0_10px_40px_-10px_#4DFFD2] ${
                    strong ? 'border-signal/50 bg-signal/10 text-bone' : 'border-white/15 bg-white/5 text-bone/80'
                  }`}
                  onMouseEnter={() => setHover(s.name)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(s.name)}
                  onBlur={() => setHover(null)}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-10">
            <div className="flex min-h-[4.5rem] items-start gap-4 border-t border-white/10 pt-5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-signal shadow-[0_0_12px_#4DFFD2]" />
              {shown ? (
                <div>
                  <div className="font-display text-xl font-semibold tracking-tight">
                    {shown.name} <span className="font-serif-i ml-2 text-lg text-signal">{shown.level}</span>
                  </div>
                  <div className="mt-1 text-sm text-bone/60">{shown.tooltip}</div>
                </div>
              ) : (
                <div className="font-mono text-xs uppercase tracking-widest text-bone/40">Hover a tool · glowing = daily drivers</div>
              )}
            </div>
          </div>
        </div>
      </Glass>
    </section>
  );
}
