import type { MetadataRoute } from 'next';
import { getAllPatternIds } from 'lib/pattern';

// Static export: this becomes public sitemap.xml at build time.
export const dynamic = 'force-static';

const SITE = 'https://tabbied.com';

// Matches next.config's `trailingSlash: true`, so listed URLs are the exact
// canonical form the export serves (no redirect hop for crawlers).
const url = (path: string): string => (path ? `${SITE}/${path}/` : `${SITE}/`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const patternIds = await getAllPatternIds();

  return [
    '',
    'patterns',
    'templates',
    'docs',
    'docs/concepts',
    'docs/react',
    'docs/html',
    'docs/javascript',
    'docs/mcp',
    'docs/svelte',
    'docs/vue',
    'docs/web-component',
    'privacy-policy',
    'terms-of-service',
    ...patternIds.map((slug) => `patterns/${slug}`),
    // A template has no page of its own to list: it opens in the customizer
    // (/studio/, which robots.txt keeps out), and its bare /templates/<slug>/
    // site/ page is a fictional business, noindex. The gallery is listed.
  ].map((path) => ({ url: url(path) }));
}
