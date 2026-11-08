import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { lockScroll } from '../lib/lenis';
import { Project } from '../types';
import Heading from './Heading';
import Glass from './Glass';

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    lockScroll(true);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', k);
    };
  }, [onClose]);
  const [head, sub] = p.title.split(' – ');
  return createPortal(
    <div className="fixed inset-0 z-[960] flex items-center justify-center bg-ink/75 p-3 backdrop-blur-xl sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col rounded-[28px] border border-white/10 bg-panel/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 backdrop-blur transition-colors hover:bg-signal hover:text-ink" aria-label="Close">
          <X size={18} />
        </button>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-[28px]">
          {p.image && <img src={p.image} alt={p.title} className="aspect-[16/8] w-full object-cover object-top" />}
          <div className="p-6 md:p-10">
            <h3 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{head}</h3>
            {sub && <div className="font-serif-i mt-1 text-2xl text-signal">{sub}</div>}
            <p className="mt-4 text-lg text-bone/85">{p.tagline}</p>
            <p className="mt-4 leading-relaxed text-bone/60">{p.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-bone/70">{s}</span>
              ))}
            </div>
            {p.githubLink && (
              <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-semibold text-ink transition-transform hover:scale-105">
                View source <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects({ projects, githubUrl }: { projects: Project[]; githubUrl: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.utils.toArray<HTMLElement>('.pj-card').forEach((c) =>
        gsap.from(c, { opacity: 0, y: 70, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } })
      );
      gsap.utils.toArray<HTMLElement>('.pj-img').forEach((img) =>
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } })
      );
    },
    { scope: root }
  );

  // bento spans: big, small, small, big...
  const spans = ['lg:col-span-8', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-8'];

  return (
    <section ref={root} id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="04" kicker="Projects" title="Things I've" italic="built." />
      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((p, i) => {
          const big = i % 4 === 0 || i % 4 === 3;
          return (
            <Glass key={p.id} role="button" tabIndex={0} onClick={() => setActive(p)} onKeyDown={(e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(p))} data-cursor className={`pj-card group flex cursor-pointer flex-col text-left ${spans[i % 4]}`}>
              {p.image && (
                <div className={`relative overflow-hidden ${big ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
                  <img src={p.image} alt="" loading="lazy" className="pj-img absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className={`font-display font-semibold leading-tight tracking-tight ${big ? 'text-3xl' : 'text-2xl'}`}>{p.title.split(' – ')[0]}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-bone/60">{p.tagline}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-bone/60">{t}</span>
                  ))}
                </div>
              </div>
            </Glass>
          );
        })}
      </div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-signal hover:text-signal">
        More on GitHub <ArrowUpRight size={15} />
      </a>
      {active && <Modal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}
