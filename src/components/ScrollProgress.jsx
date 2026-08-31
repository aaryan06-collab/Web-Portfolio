import { ArrowUp } from 'lucide-react';
import useScrollPosition from '../hooks/useScrollPosition';

export default function ScrollProgress() {
  const { progress, scrolled } = useScrollPosition(400);

  const showTop = scrolled;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-dark-border/50">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-dark-card border border-dark-border text-gray-400 shadow-xl flex items-center justify-center transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent animate-scale-in"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
