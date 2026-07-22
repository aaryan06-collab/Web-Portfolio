import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const roles = [
  'AI/ML Enthusiast',
  'B.Tech IT Student',
  'Python Developer',
  'Open Source Contributor',
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 300;

function useTypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (text.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(text.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeoutRef.current = setTimeout(() => {}, PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, roleIndex]);

  return text;
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
  const typedText = useTypingEffect();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {leftDeco.map((item, i) => (
        <span
          key={`l-${i}`}
          className="hero-deco-text animate-float hidden md:block"
          style={{ top: item.top, left: item.left, animationDelay: item.delay }}
        >
          {item.text}
        </span>
      ))}
      {rightDeco.map((item, i) => (
        <span
          key={`r-${i}`}
          className="hero-deco-text animate-float-delayed hidden md:block"
          style={{ top: item.top, right: item.right, animationDelay: item.delay }}
        >
          {item.text}
        </span>
      ))}
      {mobileLeftDeco.map((item, i) => (
        <span
          key={`ml-${i}`}
          className="hero-deco-text-mobile animate-float md:hidden"
          style={{ top: item.top, left: item.left, animationDelay: item.delay }}
        >
          {item.text}
        </span>
      ))}
      {mobileRightDeco.map((item, i) => (
        <span
          key={`mr-${i}`}
          className="hero-deco-text-mobile animate-float-delayed md:hidden"
          style={{ top: item.top, right: item.right, animationDelay: item.delay }}
        >
          {item.text}
        </span>
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
          Welcome to my portfolio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Aaryan{' '}
          <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            Bansal
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 h-8">
          {typedText}
          <span className="animate-blink text-accent font-light">|</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            View CV
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-dark-border text-gray-300 hover:text-white hover:border-accent/50 rounded-xl font-medium transition-all duration-300"
          >
            Contact Me
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/aaryan06-collab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/aaryan--bansal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <LinkedinIcon size={22} />
          </a>
          <a
            href="mailto:aaryanbansal0006@gmail.com"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
