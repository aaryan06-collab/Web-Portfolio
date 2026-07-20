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
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [scrolled, setScrolled] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          ? 'bg-dark/80 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setPhotoOpen(true)} className="flex-shrink-0 cursor-pointer">
          <img
            src="/profile pic.png"
            alt="Aaryan Bansal"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-accent/30"
          />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}

          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              More ▾
            </button>
            {showMore && (
              <div className="absolute top-full right-0 mt-2 bg-dark-card border border-dark-border rounded-xl shadow-xl py-2 min-w-[160px] z-50">
                {moreLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-border/50 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors"
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
                className="text-gray-400 hover:text-white transition-colors duration-200 py-2"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
    <Lightbox isOpen={photoOpen} onClose={() => setPhotoOpen(false)} src="/profile pic.png" alt="Aaryan Bansal" />
    </>
  );
}
