import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Shield, Check, Copy, Share2 } from 'lucide-react';
import { blogPosts } from '../posts';

export default function WriteupReader() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Find current post
  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <Shield size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-3xl font-bold mb-4">Writeup Not Found</h1>
        <p className="text-gray-400 max-w-md mb-8">
          The security writeup you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-slate-950 font-bold rounded-xl hover:bg-teal-400 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  // Handle article share/link copy
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom components for Markdown rendering (enforces premium styling guidelines)
  const renderers = {
    h1: ({ ...props }) => (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-10 mb-6 border-b border-slate-800 pb-3" {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4 flex items-center gap-2" {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3" {...props} />
    ),
    p: ({ ...props }) => (
      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 font-light" {...props} />
    ),
    ul: ({ ...props }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300 font-light text-base sm:text-lg" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-300 font-light text-base sm:text-lg" {...props} />
    ),
    li: ({ ...props }) => (
      <li className="pl-1 leading-relaxed" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote className="border-l-4 border-teal-500 bg-slate-900/60 p-4 rounded-r-xl italic my-6 text-gray-300" {...props} />
    ),
    a: ({ ...props }) => (
      <a className="text-teal-400 hover:text-teal-300 underline underline-offset-4 decoration-teal-500/40 hover:decoration-teal-400 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    hr: () => <hr className="border-slate-800 my-10" />,
    table: ({ ...props }) => (
      <div className="overflow-x-auto my-8 border border-slate-800 rounded-xl">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-slate-900 border-b border-slate-800" {...props} />,
    tbody: ({ ...props }) => <tbody className="divide-y divide-slate-800 bg-slate-950/20" {...props} />,
    tr: ({ ...props }) => <tr className="hover:bg-slate-900/30 transition-colors" {...props} />,
    th: ({ ...props }) => <th className="px-6 py-4 text-xs uppercase tracking-wider text-teal-400 font-mono font-bold" {...props} />,
    td: ({ ...props }) => <td className="px-6 py-4 text-sm text-gray-300 font-light" {...props} />,
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!inline) {
        return (
          <div className="relative my-6 group/code">
            {/* Top Bar */}
            <div className="bg-slate-950 border border-b-0 border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>{language || 'code'}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                  // Quick copy toast / visual indicator inside the button
                }}
                className="hover:text-teal-400 flex items-center gap-1.5 transition-colors p-1"
                title="Copy code"
              >
                <Copy size={13} />
                Copy
              </button>
            </div>
            {/* Main Code View */}
            <pre className="bg-slate-900 border border-slate-800 rounded-b-xl p-4 overflow-x-auto text-sm leading-relaxed text-teal-300 font-mono">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code className="px-1.5 py-0.5 bg-slate-900 text-teal-400 font-mono text-sm rounded border border-slate-800" {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Scroll indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-purple-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Top Header/Nav */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-lg text-xs font-medium text-gray-400 hover:text-teal-400 transition-all"
            >
              {copied ? <Check size={13} className="text-teal-400" /> : <Share2 size={13} />}
              {copied ? 'Copied Link!' : 'Share'}
            </button>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <article className="space-y-8">
          
          {/* Metadata Block */}
          <div className="space-y-4">
            <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-md uppercase tracking-wider font-mono">
              {post.category}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 pt-2 border-b border-slate-900 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-teal-400" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-teal-400" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Rendered Markdown Body */}
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers as any}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Bottom Nav / Footer Info */}
          <div className="border-t border-slate-900 pt-10 mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-teal-500" />
              <span className="text-sm font-mono text-gray-400">Fazal Shaik · Defensive Cybersecurity</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4 decoration-teal-500/20 hover:decoration-teal-400 transition-colors"
            >
              Back to Top
            </button>
          </div>

        </article>
      </main>
    </div>
  );
}
