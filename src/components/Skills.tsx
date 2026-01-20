import { SkillGroup } from '../types';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export default function Skills({ skillGroups }: SkillsProps) {
  return (
    <section id="skills" className="relative py-24 bg-slate-950">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="text-teal-400">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Core technical capabilities across offensive security, blue team operations, and cloud environments
          </p>
        </div>

        {/* Capability Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <article
              key={group.category}
              className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300"
            >
              {/* Category */}
              <h3 className="text-xl font-bold text-white mb-2">
                {group.category}
              </h3>

              {/* Divider */}
              <div className="h-px w-12 bg-teal-500/40 mb-4" />

              {/* Skills */}
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <span className="text-teal-400 mt-1">▸</span>
                    <span>
                      <span className="font-medium text-white">
                        {skill.name}
                      </span>
                      {skill.tooltip && (
                        <span className="text-gray-400">
                          {' '}— {skill.tooltip}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
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
