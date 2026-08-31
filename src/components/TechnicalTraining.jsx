import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import MagneticCard from './MagneticCard';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const trainings = [
  {
    title: 'Python & Data Science Technical Training Program',
    provider: 'Coding Bytes',
  },
  {
    title: 'Machine Learning Training',
    provider: 'Coding Bytes',
  },
  {
    title: 'Gen AI & Agentic AI Training',
    provider: 'Coding Bytes',
  },
];

export default function TechnicalTraining() {
  return (
    <section id="training" className="py-24 px-6 bg-dark-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="Technical" accent="Training" />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {trainings.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <MagneticCard className="bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 card-glow">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                  <BookOpen className="text-accent" size={24} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {t.title}
                </h3>
                <p className="text-gray-500 text-xs">{t.provider}</p>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
