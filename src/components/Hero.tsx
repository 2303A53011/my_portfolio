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
              <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Zap size={16} className="text-teal-400" />
                  <span className="text-teal-400 text-sm font-medium">Cyber Defense Engineer</span>
                </div>
              </div>

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
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="absolute -inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />

              <div className="relative w-80 h-80 border-2 border-teal-500/30 rounded-full flex items-center justify-center animate-spin-slow transition-all duration-500 hover:border-teal-500/60">
                <div className="absolute inset-8 border-2 border-purple-500/30 rounded-full animate-spin-reverse transition-all duration-500" />
                <div className="absolute inset-16 border-2 border-teal-500/30 rounded-full animate-spin-slow" />

                <div className="relative z-10 text-center space-y-4">
                  <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🛡️</div>
                  <div className="text-sm text-teal-400 font-mono animate-pulse">SECURING</div>
                  <div className="text-sm text-purple-400 font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>THE DIGITAL</div>
                  <div className="text-sm text-teal-400 font-mono animate-pulse">FRONTIER</div>
                </div>
              </div>

              <div className="absolute top-12 right-12 w-24 h-24 border border-teal-500/20 rounded-lg animate-fadeIn" style={{ animationDelay: '1.5s' }} />
              <div className="absolute bottom-12 left-12 w-16 h-16 border border-purple-500/20 rounded-full animate-fadeIn" style={{ animationDelay: '1.8s' }} />
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
