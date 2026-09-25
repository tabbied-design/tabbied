// The one merged palette list, shared by every place that shows palettes. Each
// entry is tagged with its `kind` so callers can branch on edit and delete.
import type { BrandPalette } from './brandPalettes';
import type { LibraryPalette } from './paletteLibrary';

export type MergedPaletteEntry =
  | { kind: 'custom'; palette: BrandPalette }
  | { kind: 'library'; palette: LibraryPalette };

/**
 * Custom palettes first, then the library. An optional case-insensitive name
 * query filters both halves (empty = everything); nameless custom palettes
 * match on "untitled", matching how they render.
 */
export function mergePalettes(
  custom: BrandPalette[],
  library: LibraryPalette[],
  query = ''
): MergedPaletteEntry[] {
  const q = query.trim().toLowerCase();
  const match = (name: string) => !q || name.toLowerCase().includes(q);

  return [
    ...custom
      .filter((palette) => match(palette.name || 'untitled'))
      .map((palette) => ({ kind: 'custom' as const, palette })),
    ...library
      .filter((palette) => match(palette.name))
      .map((palette) => ({ kind: 'library' as const, palette })),
  ];
}
