import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import MagneticCard from './MagneticCard';
import CountUp from './CountUp';
import { fadeUp, staggerContainer } from '../data/animations';

const stats = [
  { label: 'Projects', value: 6, suffix: '+' },
  { label: 'Certifications', value: 6 },
  { label: 'CGPA', value: 7.2, decimals: 2 },
  { label: 'Languages', value: 2 },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </motion.div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
