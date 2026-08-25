import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import PdfViewer from './PdfViewer';
import MagneticCard from './MagneticCard';
import { fadeUp, staggerContainer } from '../data/animations';

const certifications = [
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI & Stanford University',
    pdf: '/certificates/Regression-and-Classification.pdf',
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'IBM',
    pdf: '/certificates/Software-Engineering.pdf',
  },
  {
    title: 'Generative AI: Prompt Engineering Basics',
    issuer: 'IBM',
    pdf: '/certificates/Generative-AI-Prompt-Engineering.pdf',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    pdf: '/certificates/Claude-101.pdf',
  },
  {
    title: 'Work Smarter with AI',
    issuer: 'Horizon Community',
    pdf: '/certificates/Work-Smarter-With-AI.pdf',
  },
  {
    title: 'The Outstanding Tech Bowl',
    issuer: 'Outstanding Koders',
    pdf: '/certificates/Outstanding-Tech-Bowl.pdf',
  },
];

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certifications" className="py-24 px-6 bg-dark-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Certifications
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
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <MagneticCard
                onClick={() => setSelected(cert)}
                className="text-left bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group card-glow cursor-pointer"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Award className="text-accent" size={24} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-gray-500 text-xs">{cert.issuer}</p>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PdfViewer
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        src={selected?.pdf}
        title={selected?.title}
      />
    </section>
  );
}
