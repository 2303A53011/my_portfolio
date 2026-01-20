import { Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  githubUrl: string;
}

export default function Projects({ projects, githubUrl }: ProjectsProps) {
  return (
    <section id="projects" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hands-on security projects focused on SOC operations, detection, and incident response
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 flex flex-col"
            >

              {/* Image */}
              <div className="h-44 bg-slate-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-5 flex-1">

                {/* Title */}
                <h3 className="text-xl font-bold text-white leading-snug">
                  {project.title}
                </h3>

                {/* Short About */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Built With */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                    Built With
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 text-gray-400 text-xs rounded-lg font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Button */}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300"
                  >
                    {/* <Github size={16} /> */}
                    View 
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Global GitHub */}
        <div className="text-center mt-16">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
