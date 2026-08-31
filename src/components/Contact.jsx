import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { contactInfo } from '../data/contact';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer } from '../data/animations';

const contactItems = [
  { icon: <Phone className="text-accent" size={20} />, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref, copyable: true },
  { icon: <Mail className="text-accent" size={20} />, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, copyable: true },
  { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', value: 'aaryan--bansal', href: contactInfo.linkedin },
  { icon: <GithubIcon size={20} />, label: 'GitHub', value: 'aaryan06-collab', href: contactInfo.github },
  { icon: <MapPin className="text-accent" size={20} />, label: 'Location', value: contactInfo.location, href: null },
];

export default function Contact() {
  const [copied, setCopied] = useState('');

  const copy = async (item, e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(item.label);
      setTimeout(() => setCopied((current) => (current === item.label ? '' : current)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading pre="Get In" accent="Touch" />

        <div className="max-w-3xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400 text-lg mb-12"
          >
            Feel free to reach out — I&apos;m always open to discussing new projects, ideas, or opportunities.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {contactItems.map((item) => {
              const Wrapper = item.href ? 'a' : 'div';
              const wrapperProps = item.href
                ? { href: item.href, target: item.label !== 'Phone' && item.label !== 'Email' && item.label !== 'Location' ? '_blank' : undefined, rel: 'noopener noreferrer' }
                : {};

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    onClick={item.copyable ? (e) => copy(item, e) : undefined}
                    className="block bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:scale-105 card-glow group"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      {item.icon}
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                    {copied === item.label && (
                      <p className="text-accent text-xs mt-1">Copied!</p>
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
