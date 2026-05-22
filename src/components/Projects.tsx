import { useState, useRef } from 'react';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../types';
import { useInView } from '../hooks/useInView';

interface ProjectsProps {
  projects: Project[];
  githubUrl: string;
}

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/40 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-teal-500/10 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 120 + 200}ms`,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Image with skeleton */}
      <div className="h-44 bg-slate-900 overflow-hidden relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={`${project.title} – cybersecurity project by Fazal Shaik`}
          title={project.title}
          loading="lazy"
          decoding="async"
          width="400"
          height="176"
          itemProp="image"
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-snug">
          {project.title}
        </h3>

        {/* Description — expandable */}
        <div>
          <p className={`text-gray-400 text-sm leading-relaxed transition-all duration-300 ${
            expanded ? '' : 'line-clamp-3'
          }`}>
            {project.description}
          </p>
          {project.description.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-medium mt-2 transition-colors"
            >
              {expanded ? 'Show less' : 'Read more'}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>

        {/* Built With */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Built With
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-800 text-gray-400 text-xs rounded-lg font-mono hover:text-teal-400 hover:border-teal-500/30 border border-transparent transition-colors"
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
            <Github size={16} />
            View Project
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects({ projects, githubUrl }: ProjectsProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="projects"
      className="relative py-24 bg-slate-950"
      aria-label="Cybersecurity projects and security research by Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" itemProp="name">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hands-on security projects focused on SOC operations, detection, and incident response
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Global GitHub */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
