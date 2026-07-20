import { Users } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

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
  const ref = useScrollReveal();

  return (
    <section id="leadership" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Leadership &{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {leadership.map((item, i) => (
            <div
              key={i}
              className="reveal bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 flex items-start gap-6 card-glow"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="text-accent" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-xl mb-1">{item.title}</h3>
                <p className="text-accent-light text-sm mb-3">{item.org}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
