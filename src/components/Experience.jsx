import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import MagneticCard from './MagneticCard';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const technicalExperiences = [
  {
    title: 'App Developer',
    company: 'Belvo',
    date: 'Duration: 3 Months',
    description: [
      'Developed and integrated AI/ML solutions to enhance application capabilities.',
      'Managing delivery, testing, and feature implementation.',
    ],
    logo: '/belvo-logo.jpeg',
  },
  {
    title: 'AI/ML Engineer',
    company: 'The Entrepreneurship Network',
    date: 'Duration: 3 Months',
    description: [
      'Developed and evaluated machine learning models to support data-driven solutions.',
      'Collaborated on integrating AI/ML components into application workflows.',
    ],
    logo: '/TEN-logo.jpeg',
  },
  {
    title: 'Python Programming Intern',
    company: 'CodeAlpha · Decode Labs',
    date: 'Duration: 2 Months',
    description: [
      'Developed Python applications and strengthened programming and debugging skills.',
      'Promoted internship and career opportunities among students.',
    ],
    logo: '/python-logo.svg',
  },
  {
    title: 'Portfolio Designer',
    company: 'Foundic Network',
    date: 'Duration: 3 Months',
    description: [
      'Designed responsive portfolio websites with clean, modern layouts.',
      'Improved visual consistency and user experience across pages.',
    ],
    logo: '/foundic-logo.png',
  },
];

const nonTechnicalExperiences = [
  {
    title: 'App Dev Team Leader',
    company: 'Belvo',
    date: 'Duration: 2 Months',
    description: [
      'Coordinated app development activities and supported team delivery.',
      'Helped track progress, testing, and feature implementation.',
    ],
    logo: '/belvo-logo.jpeg',
  },
  {
    title: 'CEO/COO',
    company: 'Belvo',
    date: 'Duration: 1 Month',
    description: [
      'Supported overall operations and high-level decision-making.',
      'Coordinated between teams to align priorities and execution.',
    ],
    logo: '/belvo-logo.jpeg',
  },
  {
    title: 'HR Role',
    company: 'Amanitvam Foundation',
    date: 'Aug 2026 – Present',
    description: [
      'Assisted with human resources and team coordination responsibilities.',
    ],
    logo: '/amaanitvam-logo.webp',
  },
];

const tabs = [
  { id: 'technical', label: 'Technical', experiences: technicalExperiences },
  { id: 'nonTechnical', label: 'Non-Technical', experiences: nonTechnicalExperiences },
];

function ExperienceCard({ exp }) {
  return (
    <MagneticCard className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 flex items-start gap-6 card-glow">
      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        {exp.logo ? (
          <img
            src={exp.logo}
            alt={`${exp.company} Logo`}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <Building2 className="text-accent" size={28} />
        )}
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h4 className="text-white font-semibold text-xl">{exp.title}</h4>
          {exp.date && (
            <span className="text-accent text-sm font-medium mt-1 sm:mt-0">{exp.date}</span>
          )}
        </div>
        <p className="text-accent-light text-sm mb-3">{exp.company}</p>
        <ul className="space-y-2">
          {exp.description.map((desc, j) => (
            <li key={j} className="text-gray-400 flex items-start gap-2 leading-relaxed">
              <span className="text-accent">•</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </MagneticCard>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('technical');
  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="Work" accent="Experience" />

        <div
          role="tablist"
          aria-label="Experience categories"
          className="flex justify-center gap-3 mb-10"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="experience-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                  isActive
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                    : 'bg-dark-card text-gray-400 border-dark-border hover:border-accent/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id="experience-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            variants={staggerContainer}
          >
            {active.experiences.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
              >
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
