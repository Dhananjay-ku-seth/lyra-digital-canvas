import { useEffect } from 'react';

/**
 * Lightweight per-page SEO for this SPA — sets a unique document title and
 * meta description (plus OG/Twitter title & description) for each route, so
 * every page can rank for its own terms. No external dependency.
 */
type Seo = { title: string; description: string };

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

const SITE = 'https://dhananjay-kumar-seth.vercel.app';

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url;
}

export function useSeo({ title, description }: Seo) {
  useEffect(() => {
    // Each route gets its own canonical URL (never the query string), so filtered views do not compete with each other.
    const url = SITE + (window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/+$/, ''));
    setCanonical(url);
    setMeta('property', 'og:url', url);
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [title, description]);
}
