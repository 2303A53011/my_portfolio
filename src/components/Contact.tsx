import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:work.fazalshaik@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Security Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    // Show success feedback
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-950">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In <span className="text-teal-400">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Reach out for security roles, internships, collaborations, or technical discussions
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-slate-950/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">

          {/* Availability */}
          <div className="flex items-center gap-3 mb-8">
            <Mail className="text-teal-400" size={22} />
            <span className="text-white font-medium">
              Open to security roles, internships, and contract work
            </span>
          </div>

          {/* Success toast */}
          {sent && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-teal-500/10 border border-teal-500/30 rounded-lg animate-fadeIn">
              <CheckCircle size={20} className="text-teal-400 shrink-0" />
              <p className="text-teal-400 text-sm">
                Email client opened! If it didn't open, email me directly at{' '}
                <a href="mailto:work.fazalshaik@gmail.com" className="underline font-medium">
                  work.fazalshaik@gmail.com
                </a>
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSend} className="space-y-6">

            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors"
              />
            </div>

            <input
              type="text"
              name="subject"
              required
              placeholder="Subject (e.g. SOC Internship / Security Project)"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors"
            />

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none transition-colors"
            />

            {/* CTA */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-teal-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/40 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Send Email
              <Send size={18} />
            </button>
          </form>

          {/* Direct Email */}
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-gray-400 text-sm">
              Prefer direct email?{' '}
              <a
                href="mailto:work.fazalshaik@gmail.com"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                work.fazalshaik@gmail.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
