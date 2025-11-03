import { useState } from 'react';
import { ExternalLink, Award, Calendar, Hash } from 'lucide-react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(20, 184, 166, 0.15) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional <span className="text-teal-400">Certifications</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials demonstrating expertise across multiple security domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-1"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-teal-500/50 transition-colors">
                  <img
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const icon = document.createElement('div');
                        icon.innerHTML = '<svg class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>';
                        parent.appendChild(icon.firstChild!);
                      }
                    }}
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} className="text-teal-400" />
                      <span>Issued: {cert.dateIssued}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Hash size={14} className="text-teal-400" />
                      <span className="font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 px-4 py-2 bg-teal-500/10 text-teal-400 rounded-lg text-sm font-medium border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300"
                      >
                        View Certificate
                      </button>
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-800 text-gray-400 rounded-lg text-sm font-medium hover:text-teal-400 transition-colors flex items-center gap-1"
                      >
                        Verify <ExternalLink size={12} />
                      </a>
                    </div>
                    {cert.driveLink && (
                      <a
                        href={cert.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-sm font-medium border border-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        View More <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-teal-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-start z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
                <p className="text-teal-400">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6">
              <div className="aspect-[8.5/11] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Award className="w-24 h-24 text-teal-400 mx-auto" />
                  <p className="text-gray-400">Certificate preview</p>
                  <p className="text-sm text-gray-500 font-mono">{selectedCert.certificateUrl}</p>
                  <div className="pt-4">
                    <a
                      href={selectedCert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
                    >
                      Verify Credential
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
