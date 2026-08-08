import { useEffect, useState } from 'react';

export default function LoaderSplash() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPhase('done');
      return;
    }
    const fadeTimer = setTimeout(() => setPhase('fading'), 900);
    const doneTimer = setTimeout(() => setPhase('done'), 1400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mb-4">
        AB
      </div>
      <p className="text-gray-400 text-lg mb-6">Aaryan Bansal</p>
      <div className="w-40 h-1 bg-dark-border rounded-full overflow-hidden">
        <div className="loader-bar h-full bg-gradient-to-r from-accent to-accent-2 rounded-full" />
      </div>
    </div>
  );
}
