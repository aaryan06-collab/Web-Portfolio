import { useEffect, useState } from 'react';

export default function useScrollPosition(threshold = 20) {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(y);
      setProgress(docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0);
      setScrolled(y > threshold);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return { scrollY, progress, scrolled };
}
