import { GraduationCap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import MagneticCard from './MagneticCard';

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" className="py-24 px-6 bg-dark-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto">
          <MagneticCard className="reveal bg-dark border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 card-glow">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-1">
                  B.Tech Information Technology
                </h3>
                <p className="text-accent-light text-sm mb-2">
                  Dr. Akhilesh Das Gupta Institute of Professional Studies
                </p>
                <p className="text-gray-500 text-sm mb-3">2024 – Present</p>
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-light px-4 py-2 rounded-lg text-sm border border-accent/20">
                  <span className="font-medium">CGPA:</span> 7.20 / 10
                </div>
              </div>
            </div>
          </MagneticCard>
        </div>
      </div>
    </section>
  );
}
