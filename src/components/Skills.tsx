import { useState } from 'react';
import { SkillGroup } from '../types';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export default function Skills({ skillGroups }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="text-teal-400">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning offensive security, defensive operations, and cloud-native architectures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <div
              key={group.category}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-teal-500/30 transition-all duration-300"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${groupIndex * 0.1}s`,
                opacity: 0,
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-teal-400">#</span>
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <button
                      className="px-4 py-2 bg-slate-800 text-gray-300 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-teal-500/20 hover:text-teal-400 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-1 border border-slate-700 hover:border-teal-500/50"
                    >
                      {skill.name}
                    </button>

                    {hoveredSkill === skill.name && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 text-gray-300 text-xs rounded-lg border border-teal-500/30 whitespace-nowrap z-10 animate-fadeIn shadow-xl">
                        {skill.tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-slate-900/80 backdrop-blur-sm rounded-full border border-teal-500/30">
            <p className="text-teal-400 text-sm font-mono">
              <span className="animate-pulse">▶</span> Constantly learning and expanding capabilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
