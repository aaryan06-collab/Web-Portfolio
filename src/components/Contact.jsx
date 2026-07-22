import { Phone, Mail, MapPin } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { GithubIcon, LinkedinIcon } from './Icons';
import { contactInfo } from '../data/contact';

const contactItems = [
  { icon: <Phone className="text-accent" size={20} />, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref },
  { icon: <Mail className="text-accent" size={20} />, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', value: 'aaryan--bansal', href: contactInfo.linkedin },
  { icon: <GithubIcon size={20} />, label: 'GitHub', value: 'aaryan06-collab', href: contactInfo.github },
  { icon: <MapPin className="text-accent" size={20} />, label: 'Location', value: contactInfo.location, href: null },
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16 rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="reveal text-center text-gray-400 text-lg mb-12">
            Feel free to reach out — I&apos;m always open to discussing new projects, ideas, or opportunities.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactItems.map((item, i) => {
              const Wrapper = item.href ? 'a' : 'div';
              const wrapperProps = item.href
                ? { href: item.href, target: item.label !== 'Phone' && item.label !== 'Email' && item.label !== 'Location' ? '_blank' : undefined, rel: 'noopener noreferrer' }
                : {};

              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="reveal bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:scale-105 card-glow group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
