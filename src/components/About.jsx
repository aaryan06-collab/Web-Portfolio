import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import MagneticCard from './MagneticCard';
import CountUp from './CountUp';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const stats = [
  { label: 'Certifications', value: 6 },
];

const projectNames = [
  'OTP-Based Secure Login System with Loan Prediction Model',
  'Face Attendance Management Website',
  'House Price Prediction System',
  'Student Registration Form',
  'Music Player Application',
  'Calculator Application',
];

const languages = ['Hindi', 'English'];

function LanguageStat() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % languages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MagneticCard className="bg-dark-card border border-dark-border rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300 card-glow">
      <div className="min-h-[2.5rem] mb-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent whitespace-nowrap"
          >
            {languages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-gray-500 text-sm">Languages</div>
    </MagneticCard>
  );
}

function ProjectFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % projectNames.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MagneticCard
      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      className="bg-dark-card border border-dark-border rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300 group card-glow cursor-pointer"
    >
      <div className="min-h-[4rem] mb-2 flex items-center justify-center" style={{ perspective: 800 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="text-sm md:text-base font-semibold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projectNames[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-gray-500 text-sm">Projects</div>
    </MagneticCard>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="About" accent="Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <MagneticCard className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 card-glow">
              <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 ring-2 ring-accent/30">
                <img
                  src="/profile-pic.png"
                  alt="Aaryan Bansal"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-400 leading-relaxed text-lg mb-4">
                Machine Learning enthusiast and B.Tech Information Technology student with a strong
                foundation in Python, data analysis, supervised learning, and software development.
                Seeking opportunities to contribute to impactful AI/ML projects.
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm">Delhi, India</span>
              </div>
            </MagneticCard>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <LanguageStat />
            </motion.div>

            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <MagneticCard className="bg-dark-card border border-dark-border rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300 card-glow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent mb-2">
                    <CountUp
                      end={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ''}
                    />
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </MagneticCard>
              </motion.div>
            ))}

            <motion.div
              className="md:col-span-2"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <ProjectFlip />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
