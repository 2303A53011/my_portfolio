import { Linkedin, Github, Download, Heart, Shield, BookOpen } from 'lucide-react';

interface FooterProps {
  fullName: string;
  social: {
    linkedin: string;
    github: string;
    tryhackme: string;
    medium?: string;
  };
}

export default function Footer({ fullName, social }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white">
              <span className="text-teal-400">&lt;</span>
              <span className="text-teal-400">/&gt;</span>
            </div>
            <p className="text-gray-400 text-sm">
              Securing the digital frontier, one vulnerability at a time.
            </p>
            <div className="flex gap-3">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={social.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
                aria-label="TryHackMe"
              >
                <Shield size={18} />
              </a>
              {social.medium && (
                <a
                  href={social.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
                  aria-label="Medium"
                >
                  <BookOpen size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block text-gray-400 hover:text-teal-400 transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://drive.google.com/file/d/1s71rYb1Hb3lvGIGYwU0901IAPmnUarny/view?usp=drive_link"
                download 
                className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm"
                target='_blank'
              >
                <Download size={14} />
                Download Resume 
              </a>
              <a
                href="mailto:contact@example.com"
                className="block text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {fullName}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-current" /> by {fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}

