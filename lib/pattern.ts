// Site-side accessors over the `tabbied` package's generated pattern presets
// (packages/tabbied/patterns/, compiled into a typed module by codegen).
import {
  patterns,
  isPatternSlug,
  type PatternSlug,
} from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';
import catalog from 'tabbied/catalog.json';
import { designKeywords, type SearchableDesign } from 'lib/catalogSearch';

export type { PatternOption } from 'tabbied';

export type Pattern = PatternDefinition;

// Card metadata for the gallery pages. The thumbnails render through
// <TabbiedPattern pattern={slug}>, so the server props stay small.
export type GalleryItem = {
  slug: PatternSlug;
  name: string;
  /** Authored palette (color0 = background) for placeholders + title fades. */
  palette: string[];
  colors?: PatternDefinition['colors'];
  /**
   * What the gallery's search matches: slug, name, the catalog's tags, moods
   * and uses, and the description (lib/catalogSearch). The runtime presets
   * carry none of the catalog's metadata, so it is read from catalog.json.
   */
  keywords: string;
};

const CATALOG_BY_SLUG = new Map(
  (catalog.designs as SearchableDesign[]).map((design) => [design.slug, design])
);

// Async only for the pages' await-based shape; the data is in memory.
export async function getAllPatternIds(): Promise<string[]> {
  return Object.keys(patterns);
}

export async function getPattern(patternId: string): Promise<Pattern> {
  if (!isPatternSlug(patternId)) {
    throw new Error(`Unknown pattern: ${patternId}`);
  }

  return patterns[patternId];
}

// Sorted by galleryOrder, then name.
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return (Object.keys(patterns) as PatternSlug[])
    .map((slug) => {
      const pattern = patterns[slug];

      return {
        slug,
        name: pattern.name,
        palette: pattern.palette ?? [],
        colors: pattern.colors,
        order: pattern.galleryOrder ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ slug, name, palette, colors }) => ({
      slug,
      name,
      palette,
      colors,
      keywords: designKeywords(CATALOG_BY_SLUG.get(slug) ?? { slug, name }),
    }));
}
