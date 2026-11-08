import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal as TermIcon, Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { initSound, isSoundOn, setSound } from '../lib/sound';
import { scrollToId } from '../lib/lenis';

const RESUME = 'https://drive.google.com/file/d/1AUuIWPIz5lVDjLAqtNIqgyueTxU8vMHy/view?usp=sharing';
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Badges' },
  { id: 'writeups', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ onTerminal }: { onTerminal: () => void }) {
  const [open, setOpen] = useState(false);
  const [sound, setSoundState] = useState(isSoundOn());
  const [active, setActive] = useState('');
  const home = useLocation().pathname === '/';

  useEffect(() => initSound(() => setSoundState(true)), []);
  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    const t = setTimeout(() => sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); }), 600);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [home]);

  const go = (id: string) => { setOpen(false); scrollToId(id); };
  const pill = 'flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs transition-colors hover:border-signal/60 hover:text-signal';

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[900] flex justify-center px-3 pt-4">
        <div className="glass pointer-events-auto flex w-full max-w-5xl items-center justify-between !rounded-full px-3 py-2 pl-5">
          <Link to="/" onClick={() => home && scrollToId('home')} className="group flex items-center gap-3" data-cursor aria-label="Fazal Shaik, home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal font-display text-[15px] font-bold tracking-tight text-ink shadow-[0_0_20px_rgba(77,255,210,0.45)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">FS</span>
            <span className="hidden font-display text-[17px] font-semibold tracking-tight sm:block">Fazal <span className="font-serif-i text-signal">Shaik</span></span>
          </Link>
          {home && (
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
              {sections.map((s) => (
                <button key={s.id} onClick={() => go(s.id)} className={`rounded-full px-3.5 py-1.5 text-[13px] transition-all ${active === s.id ? 'bg-white text-ink' : 'text-bone/65 hover:bg-white/10 hover:text-bone'}`}>
                  {s.label}
                </button>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-2">
            <button onClick={() => { setSound(!sound); setSoundState(!sound); }} className={`${pill} w-9 !px-0`} aria-label={sound ? 'Mute sound' : 'Enable sound'} aria-pressed={sound}>
              {sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button onClick={onTerminal} className={`${pill} hidden gap-2 font-mono sm:flex`} aria-label="Open terminal">
              <TermIcon size={13} /> <span className="text-bone/50">Ctrl K</span>
            </button>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center gap-1.5 rounded-full bg-signal px-4 text-[13px] font-semibold text-ink transition-transform hover:scale-105 sm:flex">
              Resume <ArrowUpRight size={14} />
            </a>
            {home && (
              <button className={`${pill} w-9 !px-0 lg:hidden`} onClick={() => setOpen(!open)} aria-label="Menu">
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            )}
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[890] flex flex-col justify-center gap-2 bg-ink/90 px-8 backdrop-blur-2xl lg:hidden">
          {sections.map((s, i) => (
            <button key={s.id} onClick={() => go(s.id)} className="text-left font-display text-5xl font-semibold tracking-tight">
              <span className="mr-3 font-mono text-sm text-signal">0{i + 1}</span>
              {s.label}
            </button>
          ))}
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="mt-6 w-fit rounded-full bg-signal px-6 py-3 font-semibold text-ink">Resume ↗</a>
        </div>
      )}
    </>
  );
}
