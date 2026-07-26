import { useState } from 'react';
import { Trophy } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import PdfViewer from './PdfViewer';
import MagneticCard from './MagneticCard';

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
  const ref = useScrollReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
              <MagneticCard
                key={i}
                {...(a.pdf ? { onClick: () => setSelected(a) } : {})}
                className={`reveal bg-dark-card border border-dark-border rounded-2xl p-6 transition-all duration-300 card-glow ${
                  a.pdf ? 'hover:border-accent/30 cursor-pointer' : ''
                }`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                  <Trophy className="text-accent" size={24} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-xs">{a.detail}</p>
              </MagneticCard>
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
