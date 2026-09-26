// What prepare.mjs gathered from the repo (see scripts/prepare.mjs).
import generated from './generated/data.json';

export type LibraryPalette = { id: string; name: string; colors: string[] };

export const data = generated as {
  counts: { patterns: number; palettes: number; templates: number };
  recolor: LibraryPalette[];
  templates: string[];
};

export function palette(id: string): string[] {
  const found = data.recolor.find((p) => p.id === id);
  if (!found) throw new Error(`no palette ${id} in generated/data.json`);
  return found.colors;
}
