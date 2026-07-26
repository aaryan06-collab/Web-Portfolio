import useScrollReveal from '../hooks/useScrollReveal';
import { GithubIcon } from './Icons';
import MagneticCard from './MagneticCard';

const projects = [
  { title: 'OTP-Based Secure Login System with Loan Prediction Model' },
  { title: 'Face Attendance Management Website', github: 'https://github.com/aaryan06-collab/Face_recognition' },
  { title: 'House Price Prediction System' },
  { title: 'Student Registration Form' },
  { title: 'Music Player Application' },
  { title: 'Calculator Application' },
];

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <MagneticCard
              key={i}
              className="reveal bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group card-glow"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
