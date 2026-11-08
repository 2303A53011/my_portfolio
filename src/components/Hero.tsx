import { Component, ReactNode, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Hand } from 'lucide-react';
import { gsap, SplitText, useGSAP, prefersReduced } from '../lib/gsap';
import { scrollToId } from '../lib/lenis';
import Magnetic from './Magnetic';

const Playground = lazy(() => import('./Playground'));
const RESUME = 'https://drive.google.com/file/d/1AUuIWPIz5lVDjLAqtNIqgyueTxU8vMHy/view?usp=sharing';
class Boundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}

function Phrases({ text }: { text: string }) {
  const list = text.split(/(?<=\.)\s+/).filter(Boolean);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % list.length), 3000);
    return () => clearInterval(id);
  }, [list.length]);
  const cur = list[i];
  return (
    <div className="relative mt-4 h-[2.8rem] sm:h-[3.4rem]" aria-label={text}>
      <div key={i} className="absolute inset-0 flex items-center gap-3" aria-hidden="true">
        <span className="phrase-bar h-8 w-1 shrink-0 rounded-full bg-signal shadow-[0_0_18px_#4DFFD2]" />
        <span className="font-serif-i whitespace-nowrap text-[clamp(1.4rem,3vw,2.5rem)] leading-none text-bone">
          {cur.split('').map((c, k) => (
            <span key={k} className="char-in inline-block whitespace-pre" style={{ animationDelay: `${k * 28}ms` }}>
              {c}
            </span>
          ))}
        </span>
      </div>
      <div className="phrase-scan pointer-events-none absolute -bottom-1 left-0 h-px w-full max-w-md" />
    </div>
  );
}

export default function Hero({ fullName, tagline, ready }: { fullName: string; tagline: string; ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [first, last] = fullName.split(' ');
  const [world, setWorld] = useState(false);

  useEffect(() => {
    setWorld(!!document.createElement('canvas').getContext('webgl2'));
  }, []);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      if (!ready) {
        gsap.set('.h-fade', { opacity: 0 });
        gsap.set('.h-name', { opacity: 0 });
        return;
      }
      gsap.set('.h-name', { opacity: 1 });
      const split = SplitText.create('.h-name', { type: 'chars', mask: 'chars' });
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from(split.chars, { yPercent: 115, stagger: 0.04, duration: 1.3 })
        .fromTo('.h-fade', { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1 }, 0.3);
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} id="home" className="relative z-10 h-screen min-h-[640px] overflow-hidden" aria-label="Fazal Shaik, Cyber Security Engineer">
      {/* 3D world */}
      <div className="absolute inset-0">
        {world && (
          <Boundary>
            <Suspense fallback={null}>
              <Playground />
            </Suspense>
          </Boundary>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 pb-10 pt-28 md:px-10">
        <div className="h-fade inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-ink/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/80 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal" style={{ animation: 'ping-dot 1.6s infinite' }} />
            <span className="relative h-2 w-2 rounded-full bg-signal" />
          </span>
          Intern @ Mitigata · Bengaluru
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="select-none font-display font-semibold leading-[0.86] tracking-[-0.045em]" aria-label={fullName}>
              <span className="h-name block text-[clamp(3.5rem,9vw,8.5rem)]">{first}</span>
              <span className="h-name font-serif-i block text-[clamp(3.5rem,9vw,8.5rem)] text-signal !tracking-[-0.03em]">{last}</span>
            </h1>
            <div className="h-fade">
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">Cyber security engineer</div>
              <Phrases text={tagline} />
            </div>
            <div className="h-fade pointer-events-auto mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <button onClick={() => scrollToId('projects')} className="group flex items-center gap-2 rounded-full bg-bone px-6 py-3.5 font-semibold text-ink transition-all hover:bg-signal">
                  View projects <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
                </button>
              </Magnetic>
              <Magnetic>
                <a href={RESUME} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/20 bg-ink/50 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:border-signal hover:text-signal">
                  Resume <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="h-fade flex items-center gap-2 rounded-full border border-white/10 bg-ink/55 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-bone/70 backdrop-blur-xl">
            <Hand size={15} className="text-signal" /> grab &amp; throw the objects
          </div>
        </div>
      </div>

    </section>
  );
}
