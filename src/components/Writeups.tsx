import { useState, useMemo } from 'react';
import { Search, FileText, Globe, RefreshCw } from 'lucide-react';
import { useMediumFeed } from '../hooks/useMediumFeed';
import { blogPosts } from '../posts';
import { useInView } from '../hooks/useInView';
import WriteupCard from './WriteupCard';

export default function Writeups() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState<'local' | 'medium'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch Medium feed. Fazal's username is 'fazal-sec' (from medium.com/@fazal-sec)
  const { posts: mediumPosts, loading: loadingMedium, error: mediumError } = useMediumFeed('fazal-sec');

  // Helper to extract unique tags for filtering based on active tab
  const uniqueTags = useMemo(() => {
    const tagsSet = new Set<string>();
    if (activeTab === 'local') {
      blogPosts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)));
    } else {
      mediumPosts.forEach((post) => post.categories.forEach((tag) => tagsSet.add(tag)));
    }
    return Array.from(tagsSet);
  }, [activeTab, mediumPosts]);

  // Reset tag selection when switching tabs
  const handleTabChange = (tab: 'local' | 'medium') => {
    setActiveTab(tab);
    setSelectedTag(null);
    setSearchQuery('');
  };

  // Filter posts based on active tab, search query, and selected tag
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (activeTab === 'local') {
      return blogPosts.filter((post) => {
        const matchesQuery =
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query);
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
        return matchesQuery && matchesTag;
      });
    } else {
      return mediumPosts.filter((post) => {
        const matchesQuery =
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query);
        const matchesTag = selectedTag ? post.categories.includes(selectedTag) : true;
        return matchesQuery && matchesTag;
      });
    }
  }, [activeTab, searchQuery, selectedTag, mediumPosts]);

  return (
    <section
      id="writeups"
      className="relative py-24 bg-slate-900 border-t border-slate-800"
      aria-label="Security writeups, blogs, and cyber articles of Fazal Shaik"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Security <span className="text-teal-400">Writeups</span> & Blog
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical walkthroughs, threat research, and security engineering insights.
          </p>
        </div>

        {/* Tab & Search Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-950/45 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => handleTabChange('local')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'local'
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                  : 'bg-transparent text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <FileText size={16} />
              My Writeups ({blogPosts.length})
            </button>
            <button
              onClick={() => handleTabChange('medium')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'medium'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  : 'bg-transparent text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Globe size={16} />
              Medium Articles {mediumPosts.length > 0 && `(${mediumPosts.length})`}
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'local' ? 'writeups' : 'Medium articles'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Tag Filters */}
        {uniqueTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-xs uppercase tracking-wider text-gray-500 mr-2 font-mono">
              Filter by tag:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTag === null
                  ? activeTab === 'local'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'bg-purple-500 text-white font-semibold'
                  : 'bg-slate-800/60 text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? activeTab === 'local'
                      ? 'bg-teal-500 text-slate-950 font-semibold'
                      : 'bg-purple-500 text-white font-semibold'
                    : 'bg-slate-800/60 text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Medium Tab Loading State */}
        {activeTab === 'medium' && loadingMedium && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="animate-spin text-purple-400" size={32} />
            <p className="text-gray-400 text-sm font-mono animate-pulse">
              Fetching latest security articles from Medium...
            </p>
          </div>
        )}

        {/* Medium Tab Error State */}
        {activeTab === 'medium' && !loadingMedium && mediumError && (
          <div className="bg-purple-950/15 border border-purple-500/20 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Could not load articles from Medium right now. You can check out my security posts directly on my Medium page:
            </p>
            <div>
              <a
                href="https://medium.com/@fazal-sec"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors text-sm"
              >
                Visit Medium Profile
                <Globe size={14} />
              </a>
            </div>
          </div>
        )}

        {/* Grid Display */}
        {((activeTab === 'local') || (activeTab === 'medium' && !loadingMedium)) && (
          <>
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <WriteupCard
                    key={activeTab === 'local' ? (post as any).slug : (post as any).link}
                    post={post}
                    type={activeTab}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-850 rounded-2xl">
                <p className="text-gray-500 text-sm font-mono">
                  No articles found matching search query or tags.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
