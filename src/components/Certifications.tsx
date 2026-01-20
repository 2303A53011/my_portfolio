import { ExternalLink, Calendar } from 'lucide-react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="relative py-24 bg-slate-950">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional <span className="text-teal-400">Certifications</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials validating foundational and practical security knowledge
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">

                {/* Issuer Logo */}
                <div className="w-14 h-14 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center shrink-0">
                  <img
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">

                  {/* Certificate Name */}
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm text-gray-400">
                    {cert.issuer}
                  </p>

                  {/* Issued Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={14} className="text-teal-400" />
                    <span>Issued: {cert.dateIssued}</span>
                  </div>

                  {/* Verify Button */}
                  <div className="pt-3">
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300 text-sm font-medium"
                    >
                      Verify Credential
                      <ExternalLink size={14} />
                    </a>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
      {/* View All Certifications */}
      <div className="text-center mt-16">
        <a
          href="https://drive.google.com/drive/folders/YOUR_FOLDER_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/40"
        >
          View All Certifications
          <ExternalLink size={18} />
        </a>
      </div>

    </section>
  );
}
