import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo, projects, certifications } from '../data/content';
import { scrollToId } from '../lib/lenis';

const RESUME = 'https://drive.google.com/file/d/1AUuIWPIz5lVDjLAqtNIqgyueTxU8vMHy/view?usp=sharing';
const EMAIL = 'work.fazalshaik@gmail.com';
const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'writeups', 'contact'];

type Line = { kind: 'in' | 'out' | 'err'; text: string };

const HELP = [
  'whoami              who is this',
  'ls projects         list case files',
  'ls certs            list certifications',
  'ls writeups         medium articles',
  'open <section>      jump (about, skills, projects, contact...)',
  'cat resume          open resume',
  'contact             show email',
  'github | linkedin | thm | medium',
  'clear | exit',
  'hint: something is hidden on this box.',
];

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'fazal-sec shell v1.0 — type "help"' },
  ]);
  const [value, setValue] = useState('');
  const hist = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const print = (text: string | string[], kind: Line['kind'] = 'out') =>
    setLines((l) => [...l, ...(Array.isArray(text) ? text : [text]).map((t) => ({ kind, text: t }))]);

  const jump = (id: string) => {
    onClose();
    if (window.location.pathname !== '/') {
      nav('/');
      setTimeout(() => scrollToId(id), 300);
    } else scrollToId(id);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    hist.current.unshift(cmd);
    hIdx.current = -1;
    setLines((l) => [...l, { kind: 'in', text: cmd }]);
    const [c, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ').toLowerCase();

    switch (c.toLowerCase()) {
      case 'help':
        return print(HELP);
      case 'whoami':
        return print([
          'fazal shaik — cyber security engineer / SOC analyst',
          'final-year B.Tech CSE (Cyber Security), SR University',
          'top 1% on TryHackMe · SIEM · detection engineering · IR',
          personalInfo.availability,
        ]);
      case 'ls':
        if (arg === 'projects') return print(projects.map((p, i) => `${String(i + 1).padStart(2, '0')}  ${p.title}`));
        if (arg === 'certs') return print(certifications.map((c2) => `${c2.issuer} — ${c2.title}`));
        if (arg === 'writeups') return print(['Articles live on Medium:', personalInfo.social.medium]);
        return print(['projects/  certs/  writeups/  resume.pdf  flag.txt']);
      case 'cat':
        if (arg === 'resume' || arg === 'resume.pdf') {
          window.open(RESUME, '_blank', 'noopener');
          return print('opening resume...');
        }
        if (arg === 'flag.txt') return print('FLAG{y0u_f0und_th3_h1dd3n_t3rm1nal_h1r3_m3}');
        return print(`cat: ${arg || '?'}: no such file`, 'err');
      case 'open': {
        const id = arg === 'cases' ? 'projects' : arg === 'certs' ? 'certifications' : arg;
        if (SECTIONS.includes(id)) {
          print(`jumping to ${id}...`);
          return jump(id);
        }
        return print(`open: unknown section. try: ${SECTIONS.join(', ')}`, 'err');
      }
      case 'contact':
        return print([EMAIL, 'or type "open contact"']);
      case 'github':
        window.open(personalInfo.social.github, '_blank', 'noopener');
        return print('opening github...');
      case 'linkedin':
        window.open(personalInfo.social.linkedin, '_blank', 'noopener');
        return print('opening linkedin...');
      case 'thm':
        window.open(personalInfo.social.tryhackme, '_blank', 'noopener');
        return print('opening tryhackme...');
      case 'medium':
        window.open(personalInfo.social.medium, '_blank', 'noopener');
        return print('opening medium...');
      case 'clear':
        return setLines([]);
      case 'exit':
        return onClose();
      case 'sudo':
        return print('nice try. this attempt has been logged and sent to the SOC.', 'err');
      case 'rm':
        return print('permission denied. blue team is watching.', 'err');
      default:
        return print(`${c}: command not found. try "help"`, 'err');
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      hIdx.current = Math.min(hIdx.current + 1, hist.current.length - 1);
      setValue(hist.current[hIdx.current] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      hIdx.current = Math.max(hIdx.current - 1, -1);
      setValue(hist.current[hIdx.current] ?? '');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-start justify-center bg-ink/70 backdrop-blur-sm pt-[12vh] px-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-label="Terminal"
    >
      <div className="w-full max-w-2xl border border-signal/30 bg-panel shadow-[0_0_80px_rgba(77,255,210,0.12)]">
        <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-xs text-mute">
          <span>
            <span className="text-signal">●</span> guest@fazalsec.me — zsh
          </span>
          <button onClick={onClose} className="hover:text-signal">
            esc
          </button>
        </div>
        <div ref={body} className="h-[52vh] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" onClick={() => input.current?.focus()}>
          {lines.map((l, i) => (
            <div
              key={i}
              className={l.kind === 'in' ? 'text-bone' : l.kind === 'err' ? 'text-alert' : 'text-bone/70'}
            >
              {l.kind === 'in' && <span className="text-signal">$ </span>}
              <span className="whitespace-pre-wrap">{l.text}</span>
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue('');
            }}
            className="flex"
          >
            <span className="text-signal mr-2">$</span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent outline-none text-bone caret-signal"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
