import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MailOpenIcon } from './Icons';
import { contactInfo } from '../data/contact';
import MagneticCard from './MagneticCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const roles = [
  'AI/ML Enthusiast',
  'B.Tech IT Student',
  'Python Developer',
  'Open Source Contributor',
  'Machine Learning Engineer',
  'Data Science Learner',
  'SaaS Builder',
  'Problem Solver',
];

const WORD_DURATION = 0.5;
const BASE_ROLE_DURATION = 2200;
const ROLE_BUFFER = 300;

function getRoleRevealMs(role) {
  const words = role.split(' ');
  const chars = role.length;
  const stagger = WORD_DURATION / words.length;
  const revealSeconds = (chars - 1) * stagger + WORD_DURATION;
  return revealSeconds * 1000;
}

function getRoleDisplayMs(role) {
  return Math.max(BASE_ROLE_DURATION, getRoleRevealMs(role) + ROLE_BUFFER);
}

function useRotatingRole() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let timer;
    const advance = () => {
      const next = (indexRef.current + 1) % roles.length;
      indexRef.current = next;
      setIndex(next);
      timer = setTimeout(advance, getRoleDisplayMs(roles[next]));
    };

    timer = setTimeout(advance, getRoleDisplayMs(roles[0]));
    return () => clearTimeout(timer);
  }, []);

  return roles[index];
}

function RevealLine({ role }) {
  const words = role.split(' ');

  return (
    <motion.span
      key={role}
      className="inline-block"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: WORD_DURATION / words.length } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, j) => (
            <motion.span
              key={j}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: WORD_DURATION, ease: 'easeOut' }}
            >
              {ch}
            </motion.span>
          ))}
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

function computeRepel(el, mx, my) {
  if (!el) return { x: 0, y: 0 };
  const rect = el.getBoundingClientRect();
  const dx = mx - (rect.left + rect.width / 2);
  const dy = my - (rect.top + rect.height / 2);
  const dist = Math.hypot(dx, dy);
  if (dist > 0 && dist < 400) {
    const strength = (1 - dist / 400) * 26;
    const norm = dist || 1;
    return { x: (dx / norm) * strength, y: (dy / norm) * strength };
  }
  return { x: 0, y: 0 };
}

function RepelText({ text, className, style, mouseX, mouseY }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 60, damping: 14 });
  const y = useSpring(0, { stiffness: 60, damping: 14 });

  useMotionValueEvent(mouseX, 'change', (mx) => {
    if (reduce) return;
    const { x: nx, y: ny } = computeRepel(ref.current, mx, mouseY.get());
    x.set(nx);
    y.set(ny);
  });

  return (
    <span ref={ref} className={className} style={style}>
      <motion.span className="inline-block" style={{ x, y }}>
        {text}
      </motion.span>
    </span>
  );
}

const leftDeco = [
  { text: 'model.fit(X, y)', top: '15%', left: '5%', delay: '0s' },
  { text: 'import numpy as np', top: '25%', left: '8%', delay: '1s' },
  { text: 'Σ(wᵢxᵢ + b)', top: '37%', left: '3%', delay: '2s' },
  { text: 'loss = MSE()', top: '48%', left: '7%', delay: '0.5s' },
  { text: '∇θ J(θ)', top: '60%', left: '4%', delay: '1.5s' },
  { text: 'np.array([])', top: '72%', left: '9%', delay: '2.5s' },
  { text: 'Artificial Intelligence', top: '83%', left: '5%', delay: '0.8s' },
  { text: 'transformer', top: '92%', left: '6%', delay: '1.8s' },
];

const rightDeco = [
  { text: 'Neural Networks', top: '12%', right: '5%', delay: '0.3s' },
  { text: 'Gradient Descent', top: '23%', right: '3%', delay: '1.3s' },
  { text: 'Classification', top: '35%', right: '7%', delay: '2.2s' },
  { text: 'scikit-learn', top: '46%', right: '4%', delay: '0.8s' },
  { text: 'Deep Learning', top: '57%', right: '6%', delay: '1.8s' },
  { text: 'π ≈ 3.14159', top: '67%', right: '5%', delay: '0.6s' },
  { text: 'GPT', top: '78%', right: '8%', delay: '1.1s' },
  { text: 'NLP', top: '88%', right: '4%', delay: '2.1s' },
];

const mobileLeftDeco = [
  { text: 'model.fit(X, y)', top: '10%', left: '2%', delay: '0s' },
  { text: 'import numpy as np', top: '45%', left: '2%', delay: '1s' },
  { text: 'Artificial Intelligence', top: '80%', left: '2%', delay: '2s' },
];

const mobileRightDeco = [
  { text: 'Neural Networks', top: '15%', right: '2%', delay: '0.3s' },
  { text: 'Deep Learning', top: '50%', right: '2%', delay: '1.3s' },
  { text: 'NLP', top: '85%', right: '2%', delay: '2.1s' },
];

export default function Hero() {
  const role = useRotatingRole();
  const sectionRef = useRef(null);
  const blobsRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const glowX = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 18 });
  const glowY = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 18 });

  const glowBackground = useMotionTemplate`radial-gradient(circle 280px at ${glowX}px ${glowY}px, rgba(255,255,255,0.07), transparent 70%)`;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      rotateY.set(nx * 5);
      rotateX.set(-ny * 5);
      glowX.set(e.clientX, true);
      glowY.set(e.clientY, true);
      if (blobsRef.current) {
        blobsRef.current.style.transform = `translate3d(${-nx * 22}px, ${-ny * 16}px, 0)`;
      }
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
      mouseX.set(-1000);
      mouseY.set(-1000);
      rotateX.set(0);
      rotateY.set(0);
      glowX.set(-1000);
      glowY.set(-1000);
      if (blobsRef.current) blobsRef.current.style.transform = '';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [mx, my, mouseX, mouseY, rotateX, rotateY, glowX, glowY]);

  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 600], [0, 80]);
  const nameOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  const decoClass = (mobile) =>
    `${mobile ? 'hero-deco-text-mobile' : 'hero-deco-text'} ${mobile ? 'md:hidden' : 'hidden md:block'}`;

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div
        ref={blobsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transition: 'transform 0.25s ease-out' }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-3/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {[...leftDeco, ...mobileLeftDeco].map((item, i) => {
        const mobile = i >= leftDeco.length;
        return (
          <RepelText
            key={`l-${i}`}
            text={item.text}
            mouseX={mouseX}
            mouseY={mouseY}
            className={`${decoClass(mobile)} animate-float`}
            style={{ top: item.top, left: item.left, animationDelay: item.delay }}
          />
        );
      })}
      {[...rightDeco, ...mobileRightDeco].map((item, i) => {
        const mobile = i >= rightDeco.length;
        return (
          <RepelText
            key={`r-${i}`}
            text={item.text}
            mouseX={mouseX}
            mouseY={mouseY}
            className={`${decoClass(mobile)} animate-float`}
            style={{ top: item.top, right: item.right, animationDelay: item.delay }}
          />
        );
      })}

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        style={{ rotateX, rotateY, y: nameY, opacity: nameOpacity, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Welcome to my portfolio
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Aaryan{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Bansal
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-10 h-8">
            <RevealLine role={role} />
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <MagneticCard>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transform: 'translateZ(30px)' }}
                className="inline-block px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              >
                View CV
              </a>
            </MagneticCard>
            <MagneticCard>
              <a
                href="#contact"
                style={{ transform: 'translateZ(30px)' }}
                className="inline-block px-8 py-3 border border-dark-border text-gray-300 hover:text-white hover:border-accent/50 rounded-xl font-medium transition-all duration-300"
              >
                Contact Me
              </a>
            </MagneticCard>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white hover-rotate inline-block"
              aria-label="GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white linkedin-bounce inline-block"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-500 hover:text-white transition-colors duration-200 inline-block"
              aria-label="Email"
            >
              <MailOpenIcon size={22} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
        style={{ background: glowBackground }}
      />

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to about"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
