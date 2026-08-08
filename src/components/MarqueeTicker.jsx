import useScrollReveal from '../hooks/useScrollReveal';

const skills = [
  'Python',
  'OOP',
  'Basic SQL',
  'HTML',
  'Basic CSS',
  'Scikit-learn',
  'Supervised Learning',
  'Regression',
  'Classification',
  'Data Preprocessing',
  'Model Evaluation',
  'Pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'EDA',
  'Git',
  'GitHub',
  'Jupyter Notebook',
  'VS Code',
  'Tkinter',
  'Microsoft Excel',
];

export default function MarqueeTicker() {
  const ref = useScrollReveal();

  return (
    <div className="border-y border-dark-border bg-dark-card/50 py-4 overflow-hidden" ref={ref}>
      <div className="marquee-mask flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap text-sm font-medium text-accent-light uppercase tracking-wide"
              aria-hidden={i >= skills.length}
            >
              {skill}
              <span className="text-gray-700">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
