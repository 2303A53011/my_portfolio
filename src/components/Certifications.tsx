import { ExternalLink, Calendar, Award } from 'lucide-react';
import { Certification } from '../types';
import { useInView } from '../hooks/useInView';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      className="relative py-24 bg-slate-900"
      aria-label="Professional cybersecurity certifications of Fazal Shaik"
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
            Professional <span className="text-teal-400">Certifications</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials validating foundational and practical security knowledge
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-purple-500/30 to-transparent" />

          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`relative flex items-start mb-10 last:mb-0 transition-all duration-600 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Timeline node */}
              <div className="absolute left-8 md:left-12 -translate-x-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center">
                  <Award size={10} className="text-teal-400" />
                </div>
              </div>

              {/* Card */}
              <div className="ml-16 md:ml-20 flex-1">
                <article className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/5">
                  <div className="flex items-start gap-4">

                    {/* Issuer Logo */}
                    <div className="w-14 h-14 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center shrink-0">
                      <img
                      src={cert.issuerLogo}
                      alt={`${cert.issuer} logo`}
                      title={cert.issuer}
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 object-contain"
                    />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">

                      {/* Certificate Name */}
                      <h3 className="text-lg font-bold text-white leading-snug">
                        {cert.title}
                      </h3>

                      {/* Issuer + Date row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span>{cert.issuer}</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-teal-400" />
                          <span>{new Date(cert.dateIssued).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {/* Verify Button */}
                      <div className="pt-2">
                        <a
                          href={cert.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300 text-sm font-medium"
                        >
                          Verify Credential
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
