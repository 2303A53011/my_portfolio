import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { useMediumFeed } from '../hooks/useMediumFeed';
import Heading from './Heading';
import Glass from './Glass';

const fmt = (d: string) => new Date(d.replace(' ', 'T') + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const USER = 'fazal-sec';

export default function Writeups({ medium }: { medium: string }) {
  const root = useRef<HTMLElement>(null);
  const { posts, loading, error } = useMediumFeed(USER);

  useGSAP(
    () => {
      if (prefersReduced() || !posts.length) return;
      gsap.from('.wr-card', { opacity: 0, y: 60, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.wr-grid', start: 'top 88%' } });
    },
    { scope: root, dependencies: [posts.length] }
  );

  return (
    <section ref={root} id="writeups" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="06" kicker="Writing" title="Notes from" italic="Medium." />

      {loading && posts.length === 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass h-[360px] animate-pulse" />
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <Glass className="p-10 text-center text-bone/70">
          {error ? "Couldn't load articles right now." : 'No articles yet.'}{' '}
          <a href={medium} target="_blank" rel="noopener noreferrer" className="text-signal underline underline-offset-4">Read them on Medium ↗</a>
        </Glass>
      )}

      <div className="wr-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((b) => (
          <Glass as="a" key={b.link} href={b.link} target="_blank" rel="noopener noreferrer" data-cursor className="wr-card group flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-signal/20 via-panel to-ink">
              {b.thumbnail && <img src={b.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-bone/45">{fmt(b.pubDate)}</div>
              <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-tight">{b.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm text-bone/60">{b.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {b.categories.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-bone/60">{t}</span>
                ))}
              </div>
            </div>
          </Glass>
        ))}
      </div>

      <a href={medium} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-signal hover:text-signal">
        Follow on Medium <ArrowUpRight size={15} />
      </a>
    </section>
  );
}
