import { useEffect, useState } from 'react';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  thumbnail: string;
  description: string;
}

const KEY = 'medium-feed-v1';

export function useMediumFeed(username: string) {
  const [posts, setPosts] = useState<MediumPost[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://medium.com/feed/@${username}`)}`);
        const data = await res.json();
        if (data.status !== 'ok') throw new Error('bad feed');
        const items: MediumPost[] = data.items.map((it: any) => {
          const text = (it.description || it.content || '').replace(/<figure[\s\S]*?<\/figure>/g, '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#\d+;/g, ' ').replace(/\s+/g, ' ').trim();
          const img = it.thumbnail || (it.content || '').match(/<img[^>]+src="([^"]+)"/)?.[1] || '';
          return {
            title: it.title,
            link: it.link.split('?')[0],
            pubDate: it.pubDate,
            categories: it.categories || [],
            thumbnail: img,
            description: text.length > 190 ? text.slice(0, 190).trim() + '…' : text,
          };
        });
        if (dead) return;
        setPosts(items);
        setError(false);
        try {
          sessionStorage.setItem(KEY, JSON.stringify(items));
        } catch {
          /* ignore */
        }
      } catch {
        if (!dead) setError(true);
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, [username]);

  return { posts, loading, error };
}
