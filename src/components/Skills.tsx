import { SkillGroup } from '../types';
import { useInView } from '../hooks/useInView';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

/* ── per-category config ──────────────────────────────────────── */
const categoryMeta: Record<
  string,
  {
    icon: string;
    label: string;
    borderColor: string;
    accentText: string;
    dotColor: string;
    headingGlow: string;
    pillBg: string;
  }
> = {
  'Offensive Security': {
    icon: '⚔️',
    label: 'Offensive Security',
    borderColor: 'border-l-rose-500',
    accentText: 'text-rose-400',
    dotColor: 'bg-rose-500',
    headingGlow: 'from-rose-500/20 to-transparent',
    pillBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
  },
  'Defensive Operations': {
    icon: '🛡️',
    label: 'Defensive Operations',
    borderColor: 'border-l-teal-500',
    accentText: 'text-teal-400',
    dotColor: 'bg-teal-500',
    headingGlow: 'from-teal-500/20 to-transparent',
    pillBg: 'bg-teal-500/10 border-teal-500/30 text-teal-300',
  },
  'Scripting & Languages': {
    icon: '💻',
    label: 'Scripting & Languages',
    borderColor: 'border-l-violet-500',
    accentText: 'text-violet-400',
    dotColor: 'bg-violet-500',
    headingGlow: 'from-violet-500/20 to-transparent',
    pillBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
  },
  'Research & Writing': {
    icon: '📝',
    label: 'Research & Writing',
    borderColor: 'border-l-amber-500',
    accentText: 'text-amber-400',
    dotColor: 'bg-amber-500',
    headingGlow: 'from-amber-500/20 to-transparent',
    pillBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  },
};

const defaultMeta = categoryMeta['Defensive Operations'];

/* ── individual skill card ────────────────────────────────────── */
function SkillCard({
  name,
  tooltip,
  meta,
  delay,
  isInView,
}: {
  name: string;
  tooltip: string;
  meta: (typeof categoryMeta)[string];
  delay: number;
  isInView: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-1.5 border-l-[3px] ${meta.borderColor}
        bg-slate-900/60 backdrop-blur-sm rounded-r-xl rounded-l-sm px-4 py-3.5
        border border-slate-800 border-l-0
        hover:bg-slate-800/70 hover:border-slate-700
        transition-all duration-400
        ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Skill name */}
      <span className="text-white font-semibold text-sm leading-tight">{name}</span>

      {/* Description — always visible */}
      <span className="text-slate-400 text-xs leading-snug">{tooltip}</span>

      {/* Subtle glow on hover */}
      <div
        className={`absolute inset-0 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${meta.headingGlow}`}
      />
    </div>
  );
}

/* ── category row ─────────────────────────────────────────────── */
function CategoryRow({
  group,
  groupIndex,
  isInView,
}: {
  group: SkillGroup;
  groupIndex: number;
  isInView: boolean;
}) {
  const meta = categoryMeta[group.category] ?? defaultMeta;

  return (
    <div
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${groupIndex * 150 + 100}ms` }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{meta.icon}</span>
        <h3 className={`font-bold text-base tracking-wide ${meta.accentText}`}>
          {group.category}
        </h3>
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600 font-mono">
          {group.skills.length} skill{group.skills.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Skill cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {group.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            tooltip={skill.tooltip}
            meta={meta}
            delay={groupIndex * 150 + skillIndex * 80 + 200}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

/* ── main section ─────────────────────────────────────────────── */
export default function Skills({ skillGroups }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="skills"
      className="relative py-24 bg-slate-950 overflow-hidden"
      aria-label="Technical skills and cybersecurity capabilities of Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
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
            Core capabilities across offensive security, blue team operations, and cloud environments
          </p>
        </div>

        {/* ── Category rows stacked ── */}
        <div className="flex flex-col gap-10">
          {skillGroups.map((group, index) => (
            <CategoryRow
              key={group.category}
              group={group}
              groupIndex={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Footer note ── */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-700 ${
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
