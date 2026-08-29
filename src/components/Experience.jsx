import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import MagneticCard from './MagneticCard';
import { fadeUp, staggerContainer } from '../data/animations';

const experiences = [
  {
    title: 'App Developer Team Leader',
    company: 'Belvo',
    date: 'June 2026 – Present',
    description: [
      'Leading application development projects and coordinating a development team.',
      'Managing delivery, testing, and feature implementation.',
    ],
    logo: '/belvo-logo.jpeg',
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
    title: 'HR Role',
    company: 'Amanitvam Foundation',
    date: 'Started Aug 2026',
    description: [
      'Assisted with human resources and team coordination responsibilities.',
    ],
    logo: '/amaanitvam-logo.webp',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Work{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? fadeUp : fadeUp}
              transition={{ duration: 0.6 }}
            >
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
                    <h3 className="text-white font-semibold text-xl">{exp.title}</h3>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
