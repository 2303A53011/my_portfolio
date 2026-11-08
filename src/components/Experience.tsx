import { useRef } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { Experience as Exp } from '../types';
import Heading from './Heading';
import Glass from './Glass';

const fmt = (d: string) => (d === 'Present' ? 'Present' : new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

export default function Experience({ experiences }: { experiences: Exp[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.ex-line', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.ex-list', start: 'top 70%', end: 'bottom 70%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.ex-card').forEach((c) =>
        gsap.from(c, { opacity: 0, y: 70, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 88%' } })
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="relative z-10 mx-auto max-w-5xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="03" kicker="Experience" title="Where I've" italic="worked." />
      <div className="ex-list relative pl-8 md:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[15px]" />
        <div className="ex-line absolute bottom-0 left-[7px] top-0 w-px bg-signal shadow-[0_0_12px_#4DFFD2] md:left-[15px]" />
        <div className="space-y-6">
          {experiences.map((e) => (
            <div key={e.id} className="relative">
              <span className="absolute -left-8 top-8 h-[15px] w-[15px] rounded-full border-2 border-signal bg-ink md:-left-12 md:h-[31px] md:w-[31px] md:border-4" />
              <Glass className="ex-card p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-signal">
                  <span>{fmt(e.startDate)} — {fmt(e.endDate)}</span>
                  <span className="text-bone/40">{e.type} · {e.location}</span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{e.role}</h3>
                <div className="font-serif-i text-xl text-bone/70">
                  {e.companyUrl ? <a href={e.companyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-signal">{e.company}</a> : e.company}
                </div>
                <p className="mt-4 text-bone/70">{e.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-bone/55">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-bone/70">{s}</span>
                  ))}
                </div>
              </Glass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
