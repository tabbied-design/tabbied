import type { MetadataRoute } from 'next';

// Static export: this becomes public robots.txt at build time.
export const dynamic = 'force-static';

// The signed-in and machine-facing routes. Their pages are `noindex` already,
// but a crawler has to fetch a page to read that.
const PRIVATE = [
  '/account/',
  '/admin/',
  '/studio/',
  '/s/',
  '/api/',
  '/mcp',
  '/sign-in/',
  '/sign-up/',
  '/forgot-password/',
  '/reset-password/',
  '/verify-email/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: PRIVATE },
    sitemap: 'https://tabbied.com/sitemap.xml',
  };
}
