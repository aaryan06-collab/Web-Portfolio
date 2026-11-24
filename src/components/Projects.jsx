import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GithubIcon } from './Icons';
import MagneticCard from './MagneticCard';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const projects = [
  {
    title: 'Face Attendance Management Website',
    categories: ['ai-ml'],
    github: 'https://github.com/aaryan06-collab/Face_recognition',
  },
  {
    title: 'Student Registration Form',
    categories: ['web-apps'],
  },
  {
    title: 'Music Player Application',
    categories: ['web-apps'],
  },
  {
    title: 'Calculator Application',
    categories: ['web-apps'],
  },
  {
    title: 'UrbanCompass Multi-Modal Transit Planner',
    categories: ['hackathon'],
    github: 'https://github.com/aaryan06-collab/urbancompass',
  },
  {
    title: 'AI FAQ Chatbot',
    categories: ['ai-ml'],
    github: 'https://github.com/aaryan06-collab/ai-faq-chatbot',
  },
  {
    title: 'OCR Text Extractor',
    categories: ['ai-ml'],
    github: 'https://github.com/aaryan06-collab/OCR-Text-Extractor',
  },
  {
    title: 'Fraud Network Detection System',
    categories: ['ai-ml'],
    github: 'https://github.com/aaryan06-collab/fraud-network-detection',
  },
  {
    title: 'AI Code Reviewer',
    categories: ['ai-ml'],
    github: 'https://github.com/aaryan06-collab/AI-code-reviewer',
  },
  {
    title: 'Companio App',
    categories: ['ai-ml', 'hackathon'],
    github: 'https://github.com/aaryan06-collab/companio-app',
  },
  {
    title: 'hack26',
    categories: ['hackathon'],
    github: 'https://github.com/aaryan06-collab/hack26',
    demo: 'https://hack26-three.vercel.app',
  },
  {
    title: 'abtalks',
    categories: ['hackathon'],
    github: 'https://github.com/aaryan06-collab/abtalks',
    demo: 'https://abtalks-12.vercel.app/',
  },
  {
    title: 'House Price Prediction System',
    categories: ['ai-ml'],
  },
  {
    title: 'OTP-Based Secure Login System with Loan Prediction Model',
    categories: ['ai-ml', 'web-apps'],
  },
];

const categories = [
  { id: 'ai-ml', label: 'AI/ML', heading: 'AI/ML Projects' },
  { id: 'hackathon', label: 'Hackathon', heading: 'Hackathon Projects' },
  { id: 'web-apps', label: 'Web & Apps', heading: 'Web & Apps Projects' },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('ai-ml');
  const active = categories.find((category) => category.id === activeTab);
  const visibleProjects = projects.filter((project) => project.categories.includes(activeTab));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="My" accent="Projects" />

        <div
          role="tablist"
          aria-label="Project categories"
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`project-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
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
            id="projects-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-lg font-semibold text-center mb-8">
              {active.heading}
            </h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <MagneticCard className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group card-glow">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <span className="text-accent font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-4 leading-snug">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-accent transition-colors duration-200"
                          title="Source Code"
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-accent transition-colors duration-200 text-xs font-semibold uppercase tracking-wide"
                          title="Live Demo"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </MagneticCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
