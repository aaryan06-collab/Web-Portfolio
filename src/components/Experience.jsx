import { Building2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const experiences = [
  {
    title: 'App Developer Team Leader',
    company: 'Belvo',
    date: 'June 2026 – Present',
    description: [
      'Leading application development projects and coordinating a development team.',
      'Managing delivery, testing, and feature implementation.',
    ],
    hasLogo: true,
    logo: '/belvo-logo.jpeg',
  },
  {
    title: 'Python Programming Intern',
    company: 'CodeAlpha',
    date: '10 June 2026 – 10 July 2026',
    description: [
      'Developed Python applications and strengthened programming and debugging skills.',
      'Promoted internship and career opportunities among students.',
    ],
    hasLogo: true,
    logo: '/codealpha.jpeg',
  },
];

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Work{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="reveal bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 flex items-start gap-6 card-glow"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {exp.hasLogo ? (
                  <img
                    src={exp.logo}
                    alt={`${exp.company} Logo`}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <Building2 className="text-accent" size={28} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-white font-semibold text-xl">{exp.title}</h3>
                  {exp.date && (
                    <span className="text-accent text-sm font-medium mt-1 sm:mt-0">{exp.date}</span>
                  )}
                </div>
                <p className="text-accent-light text-sm mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="text-gray-400 flex items-start gap-2">
                      <span className="text-accent mt-2">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
