import { Linkedin, Github, MapPin, Briefcase, Clock, Shield } from 'lucide-react';

interface AboutProps {
  role: string;
  location: string;
  availability: string;
  aboutText: string[];
  social: {
    linkedin: string;
    github: string;
    tryhackme: string;
  };
}

export default function About({ role, location, availability, aboutText, social }: AboutProps) {
  return (
    <section id="about" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                About <span className="text-teal-400">Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full" />
            </div>

            {aboutText.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-400 leading-relaxed"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-6 space-y-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase size={20} className="text-teal-400" />
                <span className="font-medium">{role}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-teal-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock size={20} className="text-teal-400" />
                <span>{availability}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/50"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/50"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href={social.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 text-gray-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/50"
                aria-label="TryHackMe"
              >
                <Shield size={22} />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 bg-slate-800 rounded-2xl overflow-hidden border-2 border-teal-500/20">
                <img
                  src="/profile-pic-2.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover scale-150 hover:scale-[1.25] transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'hello world';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
