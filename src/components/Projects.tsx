import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  githubUrl: string;
}

export default function Projects({ projects, githubUrl }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Security tools and platforms built to solve real-world challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/50 transition-all duration-500 h-full flex flex-col"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-0 space-y-6 flex-1 flex flex-col overflow-hidden">
                <div className="w-full h-40 bg-slate-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.className = 'w-full h-full object-cover bg-slate-800';
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%2394a3b8"%3EImage not available%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <div className="relative p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-teal-400 text-sm font-medium">{project.tagline}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-teal-500/10 text-teal-400 text-xs rounded-full border border-teal-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

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

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 px-6 py-3 bg-teal-500/10 text-teal-400 rounded-lg font-medium border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50 flex items-center justify-center gap-2 text-sm"
                      >
                        View Details
                        <ExternalLink size={14} />
                      </button>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-slate-800 text-gray-400 rounded-lg font-medium hover:text-teal-400 hover:bg-slate-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 hover:-translate-y-1"
          >
            <Github size={20} />
            View More Projects
          </a>
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-teal-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-start z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-teal-400 text-sm">{selectedProject.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.className = 'w-full h-full object-cover bg-slate-800';
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%2394a3b8"%3EImage not available%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-bold mb-2">Overview</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 text-gray-400 text-sm rounded-lg font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-teal-500/10 text-teal-400 text-sm rounded-full border border-teal-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.githubLink && (
                  <div className="pt-4 border-t border-slate-700">
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
                    >
                      <Github size={18} />
                      View on GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
