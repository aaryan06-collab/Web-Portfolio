import { FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MailOpenIcon } from './Icons';
import { contactInfo } from '../data/contact';

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="#"
          className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent"
        >
          AB
        </a>

        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Aaryan Bansal. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-500 hover:text-white linkedin-bounce"
            title="View Resume"
          >
            <FileText size={18} />
            <span className="text-sm font-medium">CV</span>
          </a>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white hover-rotate inline-block"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white linkedin-bounce inline-block"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-gray-500 hover:text-white transition-colors duration-200 inline-block"
            aria-label="Email"
          >
            <MailOpenIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
