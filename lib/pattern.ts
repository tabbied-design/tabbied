// Site-side accessors over the `tabbied` package's generated pattern presets
// (packages/tabbied/patterns/, compiled into a typed module by codegen).
import {
  patterns,
  isPatternSlug,
  type PatternSlug,
} from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';

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
};

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
    }));
}
