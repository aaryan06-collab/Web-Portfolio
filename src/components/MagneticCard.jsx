import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticCard({ children, className = '', style, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(x, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const px = e.clientX - rect.left - cx;
    const py = e.clientY - rect.top - cy;
    rotateX.set((-py / cy) * -8);
    rotateY.set((px / cx) * 8);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        perspective: 800,
        rotateX,
        rotateY,
        scale: 1,
        transformOrigin: 'center center',
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
