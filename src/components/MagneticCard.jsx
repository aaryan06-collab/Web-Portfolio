import { useRef, useState } from 'react';

export default function MagneticCard({ children, className = '', style }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
  }

  function onMouseLeave() {
    setTransform('');
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ ...style, transform, transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  );
}
