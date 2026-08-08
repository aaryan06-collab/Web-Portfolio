import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduce) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const pos = { x: 0, y: 0 };

    function onMove(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    function tick() {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="cursor-spotlight pointer-events-none fixed top-0 left-0 z-[80]"
      style={{ willChange: 'transform' }}
    />
  );
}
