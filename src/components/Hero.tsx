import { ArrowDown, Download, Zap } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface HeroProps {
  fullName: string;
  tagline: string;
}

export default function Hero({ fullName, tagline }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <AnimatedBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              {/* <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Zap size={16} className="text-teal-400" />
                  <span className="text-teal-400 text-sm font-medium">Cyber Defense Engineer</span>
                </div>
              </div> */}

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {fullName.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className="block inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-white"
                    style={{
                      animation: 'fadeInUp 0.8s ease-out forwards',
                      animationDelay: `${index * 0.15}s`,
                      opacity: 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p className="text-xl sm:text-2xl text-teal-400 font-light tracking-wide animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                {tagline}
              </p>
            </div>

            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full animate-fadeIn" style={{ animationDelay: '0.8s' }} />

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed animate-fadeIn" style={{ animationDelay: '1s' }}>
              I specialize in SOC operations, log analysis, and automated incident response. By combining tools like Splunk, ELK, and Suricata, I transform raw telemetry into actionable intelligence that detects and neutralizes threats before they escalate. My focus — building adaptive defenses that scale with evolving attack surfaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-teal-500 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Projects
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <a
                href="https://drive.google.com/file/d/1NXLC1-FxHofBW8TusjvU0rQ3dnK-h9w-/view?usp=sharing"
                download target='_blank'
                className="group px-8 py-4 border-2 border-teal-400 text-teal-400 rounded-lg font-medium transition-all duration-300 hover:bg-teal-400 hover:text-slate-950 hover:shadow-lg hover:shadow-teal-400/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Download Resume
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px] flex items-center justify-center">

              {/* 1. Large Ambient Glow (Behind everything) */}
              <div className="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />

              <div className="relative w-96 h-96">

                {/* 2. Outer Rotating "Scanner" Ring */}
                <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_15s_linear_infinite] before:content-[''] before:absolute before:inset-[-2px] before:rounded-full before:border-t-2 before:border-teal-500/40" />

                {/* 3. The "Glass Sphere" Core */}
                <div className="absolute inset-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_20_50px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden group hover:border-teal-500/30 transition-all duration-700">

                  {/* Moving "Scan Line" inside the glass */}
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent -translate-y-40 animate-[scan_4s_ease-in-out_infinite]" />

                  {/* Center Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                      {/* Shield Icon with a "Glow" behind it */}
                      <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full animate-pulse" />
                      <svg className="w-16 h-16 text-white drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <p className="mt-4 font-mono text-[10px] tracking-[0.4em] text-teal-400 uppercase">System Active</p>
                  </div>
                </div>

                {/* 4. Floating "Data Glass" Cards (Orbiting the orb) */}
                <div className="absolute -top-4 -right-4 w-24 h-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-2 animate-bounce [animation-duration:5s] flex flex-col justify-center">
                  <div className="w-full h-1 bg-teal-500/30 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-teal-400 animate-[progress_2s_ease-in-out_infinite]" />
                  </div>
                  <span className="text-[8px] text-white/50 font-mono mt-1">THREAT_SCAN</span>
                </div>

                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/5 backdrop-blur-lg border border-purple-500/20 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-purple-400 font-mono text-[10px] animate-pulse">99%</span>
                </div>

                {/* 5. Extra Detail: Circular Particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="text-teal-400 hover:text-teal-300 transition-colors hover:shadow-lg hover:shadow-teal-400/50 p-2 rounded-full"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
}
