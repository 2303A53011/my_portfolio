import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { BlogPost, MediumPost } from '../types';

interface WriteupCardProps {
  post: BlogPost | MediumPost;
  type: 'local' | 'medium';
  index: number;
}

export default function WriteupCard({ post, type, index }: WriteupCardProps) {
  const isLocal = type === 'local';
  
  // Custom hook-based or delay animation variables
  const animationDelay = `${index * 100}ms`;

  if (isLocal) {
    const localPost = post as BlogPost;
    return (
      <article
        style={{ animationDelay }}
        className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/5 flex flex-col h-full"
      >
        <div className="flex-1 space-y-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-md uppercase tracking-wider font-mono">
              {localPost.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-teal-400" />
                {new Date(localPost.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-teal-400" />
                {localPost.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white leading-snug group-hover:text-teal-400 transition-colors">
            {localPost.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {localPost.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {localPost.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-800 text-gray-400 text-xs rounded font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Read action */}
        <div className="pt-6 mt-auto">
          <Link
            to={`/writeups/${localPost.slug}`}
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-semibold transition-colors group"
          >
            Read Writeup
            <BookOpen size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </article>
    );
  } else {
    const mediumPost = post as MediumPost;
    return (
      <article
        style={{ animationDelay }}
        className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 flex flex-col h-full"
      >
        {/* Thumbnail for Medium Articles */}
        {mediumPost.thumbnail && (
          <div className="h-40 bg-slate-850 overflow-hidden relative">
            <img
              src={mediumPost.thumbnail}
              alt={mediumPost.title}
              loading="lazy"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-md uppercase tracking-wider font-mono">
              Medium
            </span>
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1 space-y-4">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} className="text-purple-400" />
                {new Date(mediumPost.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                By {mediumPost.author.split(' ')[0]}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-snug hover:text-purple-400 transition-colors line-clamp-2">
              {mediumPost.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {mediumPost.description}
            </p>

            {/* Categories */}
            {mediumPost.categories && mediumPost.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {mediumPost.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 bg-slate-800 text-gray-400 text-xs rounded font-mono"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action */}
          <div className="pt-6 mt-auto">
            <a
              href={mediumPost.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors group"
            >
              Read on Medium
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </article>
    );
  }
}
