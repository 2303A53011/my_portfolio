import { useState, useEffect } from 'react';
import { MediumPost } from '../types';

export function useMediumFeed(username: string) {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        // We use rss2json.com API to convert Medium RSS to JSON and bypass CORS
        const feedUrl = `https://medium.com/feed/@${username}`;
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch medium feed');
        }

        const data = await response.json();
        if (data.status === 'ok') {
          // Clean up the HTML from description to get a text excerpt
          const cleanedPosts = data.items.map((item: any) => {
            // Extract a clean snippet/description from the content or description HTML
            let cleanDesc = '';
            if (item.description) {
              // Simple regex to strip HTML tags
              cleanDesc = item.description
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              
              // Truncate to a reasonable length
              if (cleanDesc.length > 180) {
                cleanDesc = cleanDesc.substring(0, 180) + '...';
              }
            }

            // Sometimes Medium RSS doesn't output thumbnail, so we can try to scrape one from the content
            let thumbnail = item.thumbnail || '';
            if (!thumbnail && item.content) {
              const imgRegex = /<img[^>]+src="([^">]+)"/;
              const match = item.content.match(imgRegex);
              if (match && match[1]) {
                thumbnail = match[1];
              }
            }

            // Fallback thumbnail if none is found
            if (!thumbnail) {
              thumbnail = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60'; // cybersecurity generic img
            }

            return {
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              categories: item.categories || [],
              thumbnail: thumbnail,
              description: cleanDesc,
              author: item.author || 'Fazal Shaik',
            };
          });

          setPosts(cleanedPosts);
        } else {
          throw new Error(data.message || 'Error parsing RSS feed');
        }
      } catch (err: any) {
        console.error('Error fetching Medium RSS:', err);
        setError(err.message || 'Failed to load Medium articles.');
        // Fallback placeholder data if feed fails (or user doesn't have articles yet)
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [username]);

  return { posts, loading, error };
}
