// The two galleries' searches, matched the way the MCP server's tools match a
// free-text query: every word typed must appear somewhere in an entry's
// keywords.
//
// - A design's are its slug and name, its catalog tags, moods and uses, and
//   its description, as search_designs reads them
//   (packages/tabbied-mcp/src/tools.ts, `designKeywords`), so "dots" finds
//   the designs tagged dots in both, not only the one called Dotset.
// - A template's are its slug, name, category and what the business is, as
//   list_templates reads them (packages/tabbied-mcp/src/templates.ts), so
//   "bakery" finds the same sites on the page and over MCP.
//
// No imports, on purpose: lib/catalogSearch.test.mjs runs this file under
// Node's own TypeScript support.

export type SearchableDesign = {
  slug: string;
  name: string;
  description?: string;
  tags?: readonly string[];
  mood?: readonly string[];
  goodFor?: readonly string[];
};

/** One lowercase string to search, built once per design on the server. */
export function designKeywords(design: SearchableDesign): string {
  return [
    design.slug,
    design.name,
    ...(design.tags ?? []),
    ...(design.mood ?? []),
    ...(design.goodFor ?? []),
    design.description ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

export type SearchableTemplate = {
  slug: string;
  name: string;
  category?: string;
  topic?: string;
};

export function templateKeywords(template: SearchableTemplate): string {
  return [template.slug, template.name, template.category ?? '', template.topic ?? ''].join(' ').toLowerCase();
}

/** The query's words; an empty query matches everything. */
export const queryTerms = (query: string): string[] => query.toLowerCase().split(/\s+/).filter(Boolean);

export function matchesQuery(keywords: string, query: string): boolean {
  return queryTerms(query).every((term) => keywords.includes(term));
}
