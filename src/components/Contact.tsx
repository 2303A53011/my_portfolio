import { FormEvent, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/gsap';
import Magnetic from './Magnetic';
import Glass from './Glass';

const EMAIL = 'work.fazalshaik@gmail.com';
type Status = 'idle' | 'sending' | 'sent' | 'fallback';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.ct-big', { yPercent: 40, opacity: 0, filter: 'blur(14px)', duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.ct-big', start: 'top 88%' } });
      gsap.from('.ct-card', { y: 80, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.ct-card', start: 'top 88%' } });
    },
    { scope: root }
  );

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xlgzolak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(form.subject || 'Portfolio contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`, '_blank');
      setStatus('fallback');
    }
  };

  const field = 'w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base outline-none transition-all placeholder:text-bone/35 focus:border-signal/70 focus:bg-white/[0.08]';

  return (
    <section ref={root} id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="mb-14 text-center">
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70 backdrop-blur">
          <span className="text-signal">07</span> Contact
        </div>
        <h2 className="ct-big font-display text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.92] tracking-[-0.04em]" data-cursor>
          Let&apos;s <span className="font-serif-i text-signal">talk.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-bone/60">Currently interning at Mitigata and open to SOC analyst and detection engineering roles. I usually reply within a day.</p>
        <a href={`mailto:${EMAIL}`} className="mt-5 inline-block font-mono text-sm text-signal underline decoration-signal/40 underline-offset-8 hover:decoration-signal">{EMAIL}</a>
      </div>

      <Glass as="form" onSubmit={submit} className="ct-card mx-auto max-w-3xl p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <input className={field} placeholder="Name" required value={form.name} onChange={set('name')} aria-label="Name" />
          <input className={field} type="email" placeholder="Email" required value={form.email} onChange={set('email')} aria-label="Email" />
          <input className={`${field} md:col-span-2`} placeholder="Subject" value={form.subject} onChange={set('subject')} aria-label="Subject" />
          <textarea className={`${field} min-h-[9rem] resize-none md:col-span-2`} placeholder="Message" required value={form.message} onChange={set('message')} aria-label="Message" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Magnetic>
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-signal px-9 py-4 font-semibold text-ink transition-transform hover:scale-105 disabled:opacity-60">
              {status === 'sending' ? 'Sending...' : 'Send message →'}
            </button>
          </Magnetic>
          <span role="status" className="font-mono text-sm">
            {status === 'sent' && <span className="text-signal">✓ delivered. talk soon.</span>}
            {status === 'fallback' && <span className="text-bone/80">couldn&apos;t send, opened your mail client instead.</span>}
          </span>
        </div>
      </Glass>
    </section>
  );
}
