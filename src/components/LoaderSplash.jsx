import { useEffect, useState } from 'react';

function GlitchLoader() {
  return (
    <div className="relative">
      <div className="loader-glitch relative text-6xl font-bold text-white" data-text="AB">
        AB
      </div>
      <div className="loader-scanlines absolute inset-0 pointer-events-none" />
    </div>
  );
}

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
      <GlitchLoader />
    </div>
  );
}
