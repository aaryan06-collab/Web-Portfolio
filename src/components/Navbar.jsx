import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Lightbox from './Lightbox';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const moreLinks = [
  { name: 'Education', href: '#education' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Training', href: '#training' },
  { name: 'Achievements', href: '#achievements' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ticking = false;
    const ids = [...navLinks, ...moreLinks].map((l) => l.href.slice(1));
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = '';
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= pos) current = `#${id}`;
        }
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) current = '#contact';
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeInMore = moreLinks.some((l) => l.href === active);

  function toggleTheme() {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setDark(!dark);
    setTimeout(() => root.classList.remove('theme-transition'), 500);
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const handleClick = () => setShowMore(false);
    if (showMore) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showMore]);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setPhotoOpen(true)} className="flex-shrink-0 cursor-pointer">
          <img
            src="/profile-pic.png"
            alt="Aaryan Bansal"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-accent/30 transition-all duration-300 hover:scale-110 hover:ring-accent hover:shadow-lg hover:shadow-accent/25"
          />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm transition-colors duration-200 ${
                active === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300 origin-left ${
                  active === link.href ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}

          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
              className={`text-sm transition-colors duration-200 ${
                activeInMore ? 'text-accent' : 'text-gray-400 hover:text-white'
              }`}
            >
              More ▾
            </button>
            {showMore && (
              <div className="absolute top-full right-0 mt-2 bg-dark-card border border-dark-border rounded-xl shadow-xl py-2 min-w-[160px] z-50">
                {moreLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      active === link.href
                        ? 'text-accent bg-dark-border/50'
                        : 'text-gray-400 hover:text-white hover:bg-dark-border/50'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-dark-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {[...navLinks, ...moreLinks].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 transition-colors duration-200 ${
                  active === link.href ? 'text-accent' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
    <Lightbox isOpen={photoOpen} onClose={() => setPhotoOpen(false)} src="/profile-pic.png" alt="Aaryan Bansal" />
    </>
  );
}
