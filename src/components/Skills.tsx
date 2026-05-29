import { SkillGroup } from '../types';
import { useInView } from '../hooks/useInView';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

const categoryMeta: Record<string, { icon: string; color: string; glow: string; border: string; bg: string }> = {
  'Offensive Security': {
    icon: '⚔️',
    color: 'text-rose-400',
    glow: 'shadow-rose-500/40',
    border: 'border-rose-500/50',
    bg: 'bg-rose-500/8',
  },
  'Defensive Operations': {
    icon: '🛡️',
    color: 'text-teal-400',
    glow: 'shadow-teal-500/40',
    border: 'border-teal-500/50',
    bg: 'bg-teal-500/8',
  },
  'Scripting & Languages': {
    icon: '💻',
    color: 'text-violet-400',
    glow: 'shadow-violet-500/40',
    border: 'border-violet-500/50',
    bg: 'bg-violet-500/8',
  },
  'Research & Writing': {
    icon: '📝',
    color: 'text-amber-400',
    glow: 'shadow-amber-500/40',
    border: 'border-amber-500/50',
    bg: 'bg-amber-500/8',
  },
};

const fallbackMeta = categoryMeta['Defensive Operations'];

export default function Skills({ skillGroups }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.07 });

  return (
    <section
      id="skills"
      className="relative py-24 bg-slate-950 overflow-hidden"
      aria-label="Technical skills of Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Scan-line texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
        }}
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="text-teal-400">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Core capabilities across offensive security, blue team operations, and cloud environments
          </p>
        </div>

        {/* Skill domain blocks */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => {
            const meta = categoryMeta[group.category] ?? fallbackMeta;
            return (
              <div
                key={group.category}
                className={`rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6
                  transition-all duration-700
                  ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${gi * 130 + 150}ms` }}
              >
                {/* Category label */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-2xl">{meta.icon}</span>
                  <h3 className={`text-sm font-bold tracking-widest uppercase ${meta.color}`}>
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* Skill tags — name only */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, si) => (
                    <span
                      key={skill.name}
                      className={`
                        inline-flex items-center px-4 py-2 rounded-xl
                        border ${meta.border} ${meta.bg}
                        text-white text-sm font-medium
                        hover:shadow-lg hover:${meta.glow} hover:-translate-y-0.5
                        transition-all duration-300 cursor-default
                        ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                      style={{ transitionDelay: `${gi * 130 + si * 70 + 300}ms` }}
                      itemProp="name"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
