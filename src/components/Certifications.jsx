import { useState } from 'react';
import { Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import PdfViewer from './PdfViewer';

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
  const ref = useScrollReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section id="certifications" className="py-24 px-6 bg-dark-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <button
              key={i}
              onClick={() => setSelected(cert)}
              className="reveal text-left bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:scale-105 group card-glow cursor-pointer"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <Award className="text-accent" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                {cert.title}
              </h3>
              <p className="text-gray-500 text-xs">{cert.issuer}</p>
            </button>
          ))}
        </div>
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
