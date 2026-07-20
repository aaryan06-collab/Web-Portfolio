import { Code2, Brain, Database, Wrench } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'OOP', 'Basic SQL', 'HTML', 'Basic CSS'],
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    skills: ['Scikit-learn', 'Supervised Learning', 'Regression', 'Classification', 'Data Preprocessing', 'Model Evaluation'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code', 'Tkinter', 'Microsoft Excel'],
  },
];

export default function Skills() {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6 bg-dark-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Technical{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="reveal bg-dark border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:scale-105 card-glow"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-accent" size={26} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 bg-accent/10 text-accent-light rounded-lg border border-accent/20 transition-all duration-300 hover:bg-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
