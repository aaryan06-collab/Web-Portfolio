import { motion } from 'framer-motion';
import { GithubIcon } from './Icons';
import MagneticCard from './MagneticCard';
import { fadeUp, staggerContainer } from '../data/animations';

const projects = [
  { title: 'OTP-Based Secure Login System with Loan Prediction Model' },
  { title: 'Face Attendance Management Website', github: 'https://github.com/aaryan06-collab/Face_recognition' },
  { title: 'House Price Prediction System' },
  { title: 'Student Registration Form' },
  { title: 'Music Player Application' },
  { title: 'Calculator Application' },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <MagneticCard className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group card-glow">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <span className="text-accent font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-4 leading-snug">
                  {project.title}
                </h3>
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
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
