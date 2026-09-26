// What prepare.mjs gathered from the repo (see scripts/prepare.mjs).
import generated from './generated/data.json';

export type LibraryPalette = { id: string; name: string; colors: string[] };

export const data = generated as {
  counts: { patterns: number; palettes: number; templates: number };
  carousel: { slug: string; palette: string[] }[];
  recolor: LibraryPalette[];
  outro: LibraryPalette;
  templates: string[];
};
