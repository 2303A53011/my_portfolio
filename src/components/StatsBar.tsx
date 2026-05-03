import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Security Projects' },
  { value: 4, suffix: '', label: 'Certifications' },
  { value: 250, suffix: '+', label: 'TryHackMe Rooms' },
  { value: 10, suffix: '+', label: 'CTFs' },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

function StatItem({ stat, inView, delay }: { stat: Stat; inView: boolean; delay: number }) {
  const count = useCountUp(stat.value, stat.value > 100 ? 2500 : 1500, inView);

  return (
    <div
      className={`text-center transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
          {count}{stat.suffix}
        </span>
      </div>
      <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
    </div>
  );
}

export default function StatsBar() {
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <section className="relative py-16 bg-slate-900/50 border-y border-slate-800/50">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} inView={isInView} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
