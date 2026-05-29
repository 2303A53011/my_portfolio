import { useEffect, useRef, useState } from 'react';
import { SkillGroup } from '../types';
import { useInView } from '../hooks/useInView';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

/* ── per-category theming ─────────────────────────────────────── */
const categoryMeta: Record<
  string,
  { icon: string; accent: string; barColor: string; glowColor: string; tagBg: string }
> = {
  'Offensive Security': {
    icon: '⚔️',
    accent: 'text-rose-400',
    barColor: 'from-rose-500 to-orange-400',
    glowColor: 'rgba(244,63,94,0.15)',
    tagBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  'Defensive Operations': {
    icon: '🛡️',
    accent: 'text-teal-400',
    barColor: 'from-teal-500 to-emerald-400',
    glowColor: 'rgba(20,184,166,0.15)',
    tagBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  'Scripting & Languages': {
    icon: '💻',
    accent: 'text-violet-400',
    barColor: 'from-violet-500 to-purple-400',
    glowColor: 'rgba(139,92,246,0.15)',
    tagBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  'Research & Writing': {
    icon: '📝',
    accent: 'text-amber-400',
    barColor: 'from-amber-500 to-yellow-400',
    glowColor: 'rgba(245,158,11,0.15)',
    tagBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
};

const defaultMeta = {
  icon: '🔧',
  accent: 'text-teal-400',
  barColor: 'from-teal-500 to-emerald-400',
  glowColor: 'rgba(20,184,166,0.15)',
  tagBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

const levelColor: Record<string, string> = {
  Advanced:     'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Proficient:   'text-teal-400    bg-teal-400/10    border-teal-400/20',
  Intermediate: 'text-amber-400   bg-amber-400/10   border-amber-400/20',
  Familiar:     'text-slate-400   bg-slate-400/10   border-slate-400/20',
};

/* ── animated bar ─────────────────────────────────────────────── */
function ProficiencyBar({
  value,
  colorClass,
  animate,
}: {
  value: number;
  colorClass: string;
  animate: boolean;
}) {
  return (
    <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
        style={{ width: animate ? `${value}%` : '0%' }}
      />
    </div>
  );
}

/* ── single skill row ─────────────────────────────────────────── */
function SkillRow({
  name,
  tooltip,
  proficiency = 70,
  level = 'Intermediate',
  barColor,
  animate,
}: {
  name: string;
  tooltip: string;
  proficiency?: number;
  level?: string;
  barColor: string;
  animate: boolean;
}) {
  const lvlClass = levelColor[level] ?? levelColor['Familiar'];

  return (
    <div className="group space-y-2">
      {/* Name row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-white font-medium text-sm truncate">{name}</span>
          <span
            className={`shrink-0 px-1.5 py-0.5 text-[10px] font-semibold rounded border ${lvlClass}`}
          >
            {level}
          </span>
        </div>
        <span className="shrink-0 text-xs font-mono text-slate-500">{proficiency}%</span>
      </div>

      {/* Bar */}
      <ProficiencyBar value={proficiency} colorClass={barColor} animate={animate} />

      {/* Subtitle (always visible) */}
      <p className="text-[11px] text-slate-500 leading-snug">{tooltip}</p>
    </div>
  );
}

/* ── category card ────────────────────────────────────────────── */
function CategoryCard({
  group,
  index,
  isInView,
}: {
  group: SkillGroup;
  index: number;
  isInView: boolean;
}) {
  const [animate, setAnimate] = useState(false);
  const meta = categoryMeta[group.category] ?? defaultMeta;

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setAnimate(true), index * 120 + 300);
      return () => clearTimeout(t);
    }
  }, [isInView, index]);

  return (
    <article
      className={`relative flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6
        hover:border-slate-700 transition-all duration-500
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${index * 120 + 200}ms`,
        boxShadow: `inset 0 0 60px ${meta.glowColor}`,
      }}
    >
      {/* Top – category header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: meta.glowColor }}
        >
          {meta.icon}
        </div>
        <div>
          <h3 className={`font-bold text-base ${meta.accent}`}>{group.category}</h3>
          <p className="text-xs text-slate-500">{group.skills.length} skill{group.skills.length !== 1 ? 's' : ''}</p>
        </div>

        {/* decorative corner dots */}
        <div className="ml-auto flex gap-1 opacity-30">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px w-full bg-gradient-to-r ${meta.barColor} opacity-20`} />

      {/* Skills list */}
      <div className="flex flex-col gap-5">
        {group.skills.map((skill) => (
          <SkillRow
            key={skill.name}
            name={skill.name}
            tooltip={skill.tooltip}
            proficiency={skill.proficiency}
            level={skill.level}
            barColor={meta.barColor}
            animate={animate}
          />
        ))}
      </div>
    </article>
  );
}

/* ── main section ─────────────────────────────────────────────── */
export default function Skills({ skillGroups }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  /* Aggregate totals for the summary bar */
  const totalSkills = skillGroups.reduce((s, g) => s + g.skills.length, 0);
  const avgProficiency = Math.round(
    skillGroups.flatMap((g) => g.skills).reduce((s, sk) => s + (sk.proficiency ?? 70), 0) /
      totalSkills
  );

  return (
    <section
      id="skills"
      className="relative py-24 bg-slate-950 overflow-hidden"
      aria-label="Technical skills and cybersecurity capabilities of Fazal Shaik"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
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

        {/* ── Quick-stat pills ── */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { label: 'Skill Areas', value: skillGroups.length, color: 'text-teal-400' },
            { label: 'Total Skills', value: totalSkills, color: 'text-violet-400' },
            { label: 'Avg. Proficiency', value: `${avgProficiency}%`, color: 'text-amber-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800"
            >
              <span className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Bento grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillGroups.map((group, index) => (
            <CategoryCard
              key={group.category}
              group={group}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Level legend ── */}
        <div
          className={`mt-10 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs text-slate-600 self-center mr-1">Proficiency levels:</span>
          {Object.entries(levelColor).map(([label, cls]) => (
            <span
              key={label}
              className={`px-2.5 py-1 text-xs font-medium rounded-full border ${cls}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* ── Footer note ── */}
        <div
          className={`mt-10 text-center transition-all duration-700 delay-600 ${
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
