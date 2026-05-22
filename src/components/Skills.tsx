import { SkillGroup } from '../types';
import { useInView } from '../hooks/useInView';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

const categoryIcons: Record<string, string> = {
  'Offensive Security': '⚔️',
  'Defensive Operations': '🛡️',
  'Scripting & Languages': '💻',
  'Research & Writing': '📝',
};

export default function Skills({ skillGroups }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="skills"
      className="relative py-24 bg-slate-950"
      aria-label="Technical skills and cybersecurity capabilities of Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" itemProp="name">
            Technical <span className="text-teal-400">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Core technical capabilities across offensive security, blue team operations, and cloud environments
          </p>
        </div>

        {/* Capability Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <article
              key={group.category}
              className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/5 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${groupIndex * 120 + 200}ms` }}
              itemScope
              itemType="https://schema.org/ListItem"
              aria-label={`Skill category: ${group.category}`}
            >
              {/* Category with icon */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{categoryIcons[group.category] || '🔧'}</span>
                <h3 className="text-xl font-bold text-white">
                  {group.category}
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px w-12 bg-teal-500/40 mb-5" />

              {/* Skills as interactive chips */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 hover:border-teal-500/50 hover:text-white hover:bg-slate-700 transition-all duration-200 cursor-default"
                  >
                    <span className="text-teal-400 mr-1.5">▸</span>
                    {skill.name}

                    {/* Tooltip on hover */}
                    {skill.tooltip && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 border border-teal-500/30 text-xs text-teal-400 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-10">
                        {skill.tooltip}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/80 rounded-full border border-teal-500/30">
            <span className="text-teal-400 text-sm font-mono">
              ▶ Continuously learning, building, and refining real-world security skills
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
