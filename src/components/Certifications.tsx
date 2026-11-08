import { useRef } from 'react';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import { Certification } from '../types';
import Heading from './Heading';
import Glass from './Glass';

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.ce-card', { opacity: 0, y: 50, scale: 0.96, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.ce-grid', start: 'top 85%' } });
    },
    { scope: root }
  );
  return (
    <section ref={root} id="certifications" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <Heading n="05" kicker="Credentials" title="Proof of" italic="work." />
      <div className="ce-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <Glass as="a" key={c.id} href={c.verifyLink} target="_blank" rel="noopener noreferrer" data-cursor className="ce-card group flex min-h-[260px] flex-col justify-between p-7">
            <div className="flex items-start justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.35)]">
                {c.issuerLogo ? (
                  <img src={c.issuerLogo} alt={`${c.issuer} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
                ) : (
                  <span className="font-display text-xl font-bold tracking-tight text-ink">{c.issuer.split(' ').filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join('').slice(0, 3)}</span>
                )}
              </span>
              <ArrowUpRight className="text-bone/30 transition-all duration-300 group-hover:rotate-12 group-hover:text-signal" />
            </div>
            <div className="mt-8">
              <div className="font-display text-2xl font-semibold leading-tight tracking-tight">{c.title}</div>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-bone/50">
                <BadgeCheck size={14} className="text-signal" />
                {c.issuer} · {new Date(c.dateIssued).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}
