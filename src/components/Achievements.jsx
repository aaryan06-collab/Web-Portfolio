import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import PdfViewer from './PdfViewer';
import MagneticCard from './MagneticCard';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const achievements = [
  {
    title: 'All India NCAT',
    detail: 'Participated',
    pdf: '/certificates/NCAT-Participation.pdf',
  },
  {
    title: 'TechQuezt #31',
    detail: 'Participated',
    pdf: '/certificates/TechQuezt.pdf',
  },
  {
    title: 'GeeksforGeeks Hackathon',
    detail: 'Participated in an in-office hackathon',
    pdf: '/certificates/Geeksforgeeks-Hackathon.pdf',
  },
];

export default function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading accent="Achievements" />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <MagneticCard
                {...(a.pdf ? { onClick: () => setSelected(a) } : {})}
                className={`bg-dark-card border border-dark-border rounded-2xl p-6 transition-all duration-300 card-glow ${
                  a.pdf ? 'hover:border-accent/30 cursor-pointer' : ''
                }`}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                  <Trophy className="text-accent" size={24} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-xs">{a.detail}</p>
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
