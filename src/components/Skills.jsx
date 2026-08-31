import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Database, Wrench, Sparkles } from 'lucide-react';
import MagneticCard from './MagneticCard';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'OOP', 'Basic SQL', 'HTML', 'Basic CSS'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Data Preprocessing'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code', 'Tkinter', 'Microsoft Excel'],
  },
];

const mlSkills = [
  'Scikit-learn', 'Supervised Learning', 'Regression', 'Classification', 'Model Evaluation',
];
const aiSkills = [
  'NLTK', 'LLMs', 'Gen AI', 'Prompt Engineering', 'Agentic AI', 'NLP',
];

const ROTATE_INTERVAL = 3000;

function ChipGrid({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="text-xs px-3 py-1.5 bg-accent/10 text-accent-light rounded-lg border border-accent/20 transition-[transform,background-color,border-color] duration-200 transform-gpu hover:bg-accent/20 hover:scale-110 hover:-rotate-2 active:scale-95"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function IconSwap({ icon: Icon }) {
  return (
    <span className="relative inline-flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={Icon.name}
          className="inline-flex"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Icon className="text-accent" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AiMlToggle() {
  const [tab, setTab] = useState('ML');
  const isMl = tab === 'ML';
  const TabIcon = isMl ? Brain : Sparkles;

  useEffect(() => {
    const timer = setInterval(() => {
      setTab((prev) => (prev === 'ML' ? 'AI' : 'ML'));
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <MagneticCard className="bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 card-glow">
      <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
        <IconSwap icon={TabIcon} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">AI / ML</h3>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent">
          <IconSwap icon={TabIcon} />
          {tab}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ChipGrid skills={isMl ? mlSkills : aiSkills} />
        </motion.div>
      </AnimatePresence>
    </MagneticCard>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-dark-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="Technical" accent="Skills" />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <MagneticCard className="bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 card-glow">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="text-accent" size={26} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-4">{category.title}</h3>
                  <ChipGrid skills={category.skills} />
                </MagneticCard>
              </motion.div>
            );
          })}

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <AiMlToggle />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
