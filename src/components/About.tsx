import { useState } from 'react';
import { Linkedin, Github, MapPin, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface AboutProps {
  location: string;
  availability: string;
  aboutText: string[];
  social: {
    linkedin: string;
    github: string;
    tryhackme: string;
  };
}

export default function About({ location, availability, aboutText, social }: AboutProps) {
  const [expanded, setExpanded] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const visibleText = expanded ? aboutText : aboutText.slice(0, 2);

  return (
    <section
      id="about"
      className="relative py-24 bg-slate-900 overflow-hidden"
      aria-label="About Fazal Shaik – Cyber Security Engineer"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Fazal Shaik" />
      <meta itemProp="jobTitle" content="Cyber Security Engineer" />
      <meta itemProp="email" content="work.fazalshaik@gmail.com" />
      <link itemProp="url" href="https://fazalsec.me/" />

      {/* Background dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(45,212,191,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Label chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              // about me
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-white" itemProp="name">
                About <span className="text-teal-400">Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full" />
            </div>

            <div className="space-y-4">
              {visibleText.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-gray-400 leading-relaxed transition-all duration-500 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {aboutText.length > 2 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group"
              >
                {expanded ? 'Show less' : 'Read more'}
                {expanded ? (
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            )}

            {/* Info pills */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700 text-gray-300 text-sm">
                <MapPin size={14} className="text-teal-400 shrink-0" />
                <span itemProp="addressLocality">{location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700 text-gray-300 text-sm">
                <Clock size={14} className="text-teal-400 shrink-0" />
                <span>{availability}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {[
                { href: social.linkedin, label: 'Fazal Shaik on LinkedIn',  icon: <Linkedin size={20} /> },
                { href: social.github,   label: 'Fazal Shaik on GitHub',    icon: <Github size={20} /> },
                { href: social.tryhackme,label: 'Fazal Shaik on TryHackMe', icon: <Shield size={20} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={label}
                  itemProp="sameAs"
                  className="p-3 bg-slate-800 text-gray-400 rounded-xl border border-slate-700 hover:bg-teal-500 hover:text-white hover:border-teal-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">

              {/* Outer glow ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl opacity-40"
                style={{
                  background: 'linear-gradient(135deg, rgba(45,212,191,0.3), rgba(139,92,246,0.2))',
                  filter: 'blur(24px)',
                }}
              />

              {/* Card frame */}
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-700/60"
                style={{
                  width: 'clamp(260px, 32vw, 360px)',
                  aspectRatio: '3/4',
                  background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                  boxShadow: '0 0 0 1px rgba(45,212,191,0.15), 0 32px 64px rgba(0,0,0,0.5)',
                }}
              >
                {/* Corner brackets — cybersecurity aesthetic */}
                {[
                  { top: '12px', left: '12px', borderTop: '2px solid #2dd4bf', borderLeft: '2px solid #2dd4bf', borderRadius: '4px 0 0 0' },
                  { top: '12px', right: '12px', borderTop: '2px solid #2dd4bf', borderRight: '2px solid #2dd4bf', borderRadius: '0 4px 0 0' },
                  { bottom: '12px', left: '12px', borderBottom: '2px solid #2dd4bf', borderLeft: '2px solid #2dd4bf', borderRadius: '0 0 0 4px' },
                  { bottom: '12px', right: '12px', borderBottom: '2px solid #2dd4bf', borderRight: '2px solid #2dd4bf', borderRadius: '0 0 4px 0' },
                ].map((style, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      zIndex: 10,
                      ...style,
                    }}
                  />
                ))}

                {/* Photo */}
                <img
                  src="/9b32b4a6-f0b5-4ad8-b4b8-b33514b59fc6-0.png"
                  alt="Fazal Shaik – Cyber Security Engineer and SOC Analyst based in India"
                  title="Fazal Shaik – Cyber Security Engineer"
                  width="360"
                  height="480"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  itemProp="image"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
