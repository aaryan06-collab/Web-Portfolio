import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import MagneticCard from './MagneticCard';
import { fadeUp, staggerContainer } from '../data/animations';

const leadership = [
  {
    title: 'Core Engine Contributor (AI/ML)',
    org: "ECSoC'2026",
    description: 'Contributing to AI/ML initiatives and collaborative development.',
  },
  {
    title: 'GCAF Program',
    org: '2026',
    description: 'Participated in the GCAF Program for community-driven growth and collaboration.',
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Leadership &{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {leadership.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <MagneticCard className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 flex items-start gap-6 card-glow">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-accent" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-xl mb-1">{item.title}</h3>
                  <p className="text-accent-light text-sm mb-3">{item.org}</p>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
