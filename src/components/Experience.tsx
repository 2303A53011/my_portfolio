import { Briefcase, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { Experience as ExperienceType } from '../types';
import { useInView } from '../hooks/useInView';

interface ExperienceProps {
  experiences: ExperienceType[];
}

function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const typeBadge: Record<string, { label: string; color: string }> = {
  work: { label: 'Full-time', color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
  internship: { label: 'Internship', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  freelance: { label: 'Freelance', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  volunteer: { label: 'Volunteer', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
};

export default function Experience({ experiences }: ExperienceProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      className="relative py-24 bg-slate-900"
      aria-label="Work experience and professional history of Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" itemProp="name">
            Work <span className="text-teal-400">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional roles and hands-on security work building real-world defense capabilities
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-purple-500/30 to-transparent" />

          {experiences.map((exp, index) => {
            const badge = typeBadge[exp.type] || typeBadge.work;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-950 shadow-lg shadow-teal-500/30" />
                </div>

                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] transition-all duration-600 ${
                    isLeft ? 'md:pr-0 md:mr-auto md:pl-0' : 'md:pl-0 md:ml-auto md:pr-0'
                  } ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 300}ms` }}
                >
                  <article
                    className="group bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1"
                    itemScope
                    itemType="https://schema.org/WorkBasedProgram"
                    aria-label={`${exp.role} at ${exp.company}`}
                  >

                    {/* Top row: badge + date */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                      </div>
                    </div>

                    {/* Role */}
                    <h3 className="text-xl font-bold text-white mb-1 leading-snug">
                      {exp.role}
                    </h3>

                    {/* Company + Location */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-teal-400" />
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-teal-400" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-teal-400 mt-0.5 shrink-0">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-slate-800 text-gray-400 text-xs rounded-lg font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
