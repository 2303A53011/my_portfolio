import { useState, useEffect } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done' | 'exit'>('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('done');
          setTimeout(() => setPhase('exit'), 400);
          setTimeout(() => onComplete(), 900);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 70 ? Math.random() * 12 + 3 : Math.random() * 6 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (phase === 'exit') {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center">
      <div className="text-center space-y-8">

        {/* Logo */}
        <div className="text-4xl font-bold text-white animate-pulse">
          <span className="text-teal-400">&lt;</span>
          Fazal
          <span className="text-teal-400">/&gt;</span>
        </div>

        {/* Terminal-style loading text */}
        <div className="font-mono text-sm text-gray-500 space-y-1">
          <p className={progress > 10 ? 'text-teal-400' : ''}>
            {progress > 10 ? '✓' : '⟩'} Initializing security protocols...
          </p>
          <p className={progress > 40 ? 'text-teal-400' : progress > 10 ? 'text-gray-400' : 'text-gray-600'}>
            {progress > 40 ? '✓' : progress > 10 ? '⟩' : ' '} Loading threat intelligence...
          </p>
          <p className={progress > 70 ? 'text-teal-400' : progress > 40 ? 'text-gray-400' : 'text-gray-600'}>
            {progress > 70 ? '✓' : progress > 40 ? '⟩' : ' '} Establishing secure connection...
          </p>
          <p className={progress >= 100 ? 'text-teal-400' : progress > 70 ? 'text-gray-400' : 'text-gray-600'}>
            {progress >= 100 ? '✓' : progress > 70 ? '⟩' : ' '} System ready.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 font-mono">{Math.floor(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
