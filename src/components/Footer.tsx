import { Linkedin, Github, Download, Heart, Shield, BookOpen } from 'lucide-react';

interface FooterProps {
  fullName: string;
  social: {
    linkedin: string;
    github: string;
    tryhackme: string;
    medium?: string;
  };
}

export default function Footer({ fullName, social }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 overflow-hidden">

      {/* ── Top columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-xl font-bold text-white">
              <span className="text-teal-400">&lt;</span>Fazal<span className="text-teal-400">/&gt;</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Securing the digital frontier,<br />one vulnerability at a time.
            </p>
            <div className="flex gap-3">
              {[
                { href: social.linkedin, label: 'LinkedIn',  icon: <Linkedin size={18} /> },
                { href: social.github,   label: 'GitHub',    icon: <Github size={18} /> },
                { href: social.tryhackme,label: 'TryHackMe', icon: <Shield size={18} /> },
                ...(social.medium ? [{ href: social.medium, label: 'Medium', icon: <BookOpen size={18} /> }] : []),
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-slate-900 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block text-gray-400 hover:text-teal-400 transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://drive.google.com/file/d/1AUuIWPIz5lVDjLAqtNIqgyueTxU8vMHy/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                <Download size={14} /> Download Resume
              </a>
              <a
                href="mailto:work.fazalshaik@gmail.com"
                className="block text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom band: copyright LEFT  ·  giant wordmark RIGHT ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(110px, 17vw, 210px)' }}
      >
        {/* Thin divider at top of band */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '4%',
            right: '4%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.25), transparent)',
          }}
        />

        {/* Giant FAZAL — anchored to the RIGHT, bleeds off edge */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: "'Inter', 'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(110px, 24vw, 300px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            position: 'absolute',
            bottom: '-0.2em',
            right: '-0.04em',          /* anchored right, slightly bleeds */
            whiteSpace: 'nowrap',
            background:
              'linear-gradient(120deg, rgba(45,212,191,0.22) 0%, rgba(99,102,241,0.18) 45%, rgba(45,212,191,0.10) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            pointerEvents: 'none',
            /* subtle teal glow */
            filter: 'drop-shadow(0 0 40px rgba(45,212,191,0.08))',
          }}
        >
          FAZAL
        </span>

        {/* Copyright block — LEFT side, vertically centered */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 'clamp(16px, 4%, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {/* Teal left-border accent */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}>
            <div style={{
              width: '3px',
              height: '44px',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, #2dd4bf, rgba(45,212,191,0))',
              flexShrink: 0,
              marginTop: '2px',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <p style={{
                color: 'rgba(203,213,225,0.8)',
                fontSize: 'clamp(11px, 1.1vw, 14px)',
                fontWeight: 500,
                letterSpacing: '0.02em',
                margin: 0,
              }}>
                © {currentYear} {fullName}. All rights reserved.
              </p>
              <p style={{
                color: 'rgba(100,116,139,0.9)',
                fontSize: 'clamp(10px, 1vw, 13px)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                Built with{' '}
                <Heart size={11} style={{ color: '#ef4444', fill: '#ef4444', display: 'inline' }} />
                {' '}by{' '}
                <span style={{ color: '#2dd4bf', fontWeight: 600 }}>{fullName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
