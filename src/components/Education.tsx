import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const education = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science Engineering',
  specialization: 'Cyber Security',
  institution: 'SR University',
  location: 'Warangal, Telangana, India',
  startYear: '2023',
  endYear: '2027',
  status: 'Final Year (Expected 2027)',
  gpa: '',
  relevantCourses: [
    'Network Security',
    'Cryptography & Information Security',
    'Operating Systems',
    'Computer Networks',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Software Engineering',
    'Cloud Computing',
  ],
  highlights: [
    'Specialized in Cybersecurity with hands-on labs in offensive and defensive security',
    'Actively applied academic concepts through independent security projects (SOC labs, honeypots, IR simulations)',
    'Completed 300+ rooms on TryHackMe alongside coursework — Top 1% globally',
    'Earned Microsoft Azure AI Fundamentals, Cisco Ethical Hacker & IBM QRadar certifications during study',
  ],
};

export default function Education() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="education"
      className="relative py-24 bg-slate-950 overflow-hidden"
      aria-label="Education background of Fazal Shaik"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Education &amp; <span className="text-teal-400">Background</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Academic foundation combined with continuous self-directed learning and practical security research
          </p>
        </div>

        {/* Education Card */}
        <div
          className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="group bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300">

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Left – Main Info */}
              <div className="lg:col-span-2 space-y-5">

                {/* Badge + Status */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full border bg-purple-500/15 text-purple-400 border-purple-500/30">
                    {education.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{education.startYear} — {education.endYear}</span>
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 shrink-0">
                      <GraduationCap size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {education.degree}
                      </h3>
                      <p className="text-teal-400 font-medium mt-0.5">
                        {education.field} — <span className="text-purple-400">{education.specialization}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Institution + Location */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pl-1">
                  <span className="flex items-center gap-1.5 font-medium text-gray-300">
                    <BookOpen size={14} className="text-teal-400 shrink-0" />
                    {education.institution}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-teal-400 shrink-0" />
                    {education.location}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mt-2">
                  {education.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-teal-400 mt-0.5 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right – Relevant Courses */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.relevantCourses.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 bg-slate-800/80 text-gray-300 text-xs rounded-lg border border-slate-700 font-mono hover:border-purple-500/40 hover:text-purple-300 transition-colors duration-200"
                    >
                      {course}
                    </span>
                  ))}
                </div>

                {/* Self-Learning badge */}
                <div className="mt-4 p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                  <p className="text-xs text-teal-400 font-mono leading-relaxed">
                    ▶ Supplemented coursework with 300+ TryHackMe rooms, industry certifications, and 7 independent security projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
