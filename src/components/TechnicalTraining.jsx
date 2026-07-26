import { BookOpen } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import MagneticCard from './MagneticCard';

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
  const ref = useScrollReveal();

  return (
    <section id="training" className="py-24 px-6 bg-dark-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Technical{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Training
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trainings.map((t, i) => (
            <MagneticCard
              key={i}
              className="reveal bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 card-glow"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <BookOpen className="text-accent" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                {t.title}
              </h3>
              <p className="text-gray-500 text-xs">{t.provider}</p>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
