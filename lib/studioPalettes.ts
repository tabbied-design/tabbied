// The palettes the customizer's Colors tab offers. A template declares as many
// roles as its stylesheet reads (a ground and one to a dozen inks) while a
// library palette carries three to seven colors, so the roles are filled by
// cycling the library's inks, the ground staying the ground. A choice is only
// a starting set of colors; the pencil on each row opens the per-role editor.
import { PALETTE_LIBRARY, type LibraryPalette } from './paletteLibrary';

export type PaletteChoice = {
  id: string;
  name: string;
  /** Exactly as many colors as the template has roles, ground first. */
  colors: string[];
};

/** A color that renders as nothing, so `transparent` must survive a recolor. */
export const isTransparent = (value: string): boolean => {
  const color = value.trim().toLowerCase();

  return color === 'transparent' || /^#(?:[0-9a-f]{6})00$/.test(color);
};

/**
 * Fill the authored roles from `source`, ground first and then the inks in
 * turn. A role authored as transparent stays so: a pattern field drawn over a
 * photograph reads only because its ground is not painted.
 */
function fitPalette(source: readonly string[], authored: readonly string[]): string[] {
  const inks = source.slice(1);

  return authored.map((original, index) => {
    if (isTransparent(original)) return original;
    if (index === 0) return source[0] ?? original;

    return inks.length === 0 ? original : inks[(index - 1) % inks.length];
  });
}

const sameColor = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/** Two palettes are the same palette when every role matches, case aside. */
const samePalette = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every((color, index) => sameColor(color, b[index] ?? ''));

/**
 * The rows the rail draws: the template's own palette first (choosing it is
 * the reset), then the library, fitted to this template's roles.
 */
export function paletteChoices(templateName: string, authored: readonly string[]): PaletteChoice[] {
  const library: LibraryPalette[] = PALETTE_LIBRARY;

  return [
    { id: 'template', name: `${templateName} (default)`, colors: [...authored] },
    ...library.map((palette) => ({
      id: palette.id,
      name: palette.name,
      colors: fitPalette(palette.colors, authored),
    })),
  ];
}

/** Which row is lit, or null when the colors were edited by hand. */
export function activeChoice(
  choices: readonly PaletteChoice[],
  palette: readonly string[]
): string | null {
  return choices.find((choice) => samePalette(choice.colors, palette))?.id ?? null;
}
