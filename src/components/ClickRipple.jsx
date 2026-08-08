import { useEffect, useState } from 'react';

const MAX_RIPPLES = 10;

let nextId = 0;

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduce) return;

    function onPointerDown(e) {
      setRipples((prev) => {
        const id = nextId++;
        return [
          ...prev.slice(-(MAX_RIPPLES - 1)),
          { id, x: e.clientX, y: e.clientY, size: 16 + Math.random() * 8 },
        ];
      });
    }

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);

  function onAnimationEnd(id) {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <>
      {ripples.map((r) => (
        <div
          key={r.id}
          onAnimationEnd={() => onAnimationEnd(r.id)}
          className="click-ripple pointer-events-none fixed top-0 left-0 z-[80] rounded-full border border-accent/70"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, marginLeft: -r.size / 2, marginTop: -r.size / 2 }}
        />
      ))}
    </>
  );
}
