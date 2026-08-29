import { useEffect, useState } from 'react';

const SECTIONS = [
  '#about',
  '#skills',
  '#experience',
  '#education',
  '#leadership',
  '#projects',
  '#certifications',
  '#training',
  '#achievements',
  '#contact',
];

export default function QuickNav() {
  const [active, setActive] = useState(SECTIONS[0]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = SECTIONS[0];
        for (const id of SECTIONS) {
          const el = document.querySelector(id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= pos) current = id;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          current = SECTIONS[SECTIONS.length - 1];
        }
        setActive(current);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
    >
      <span className="w-px h-10 bg-dark-border" />
      {SECTIONS.map((id) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => goTo(id)}
            aria-label={`Go to ${id.slice(1)}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-2.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-dark-border group-hover:bg-accent/60'
              }`}
            />
          </button>
        );
      })}
      <span className="w-px h-10 bg-dark-border" />
    </nav>
  );
}
