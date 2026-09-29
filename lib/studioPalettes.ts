// The palettes the customizer's Colors tab offers. A template declares as many
// roles as its stylesheet reads (a ground and one to a dozen inks) while a
// library palette carries three to seven colors, so a library palette has to
// be fitted to the template's roles. A choice is only a starting set of
// colors; the pencil on each row opens the per-role editor.
//
// The fit is by contrast, not by position. Handing the library's second color
// to the template's second role, and so on round, left a template's text
// under 3:1 on its ground for half of all template and palette pairs
// (Midnight Oil's second color is #1b263b on #0d1b2a), and could turn a pale
// panel into the darkest ink with the text in that same ink on top of it. So
// a fitted palette keeps the template's own structure: its strongest ink takes
// the library's strongest, a tint of the ground stays a tint, and an ink the
// template set to be read is moved toward black or white until it reads.
// e2e/palette-fit.spec.ts holds every template to it.
import { contrastRatio, toRgb } from 'tabbied-templates';
import { PALETTE_LIBRARY, type LibraryPalette } from './paletteLibrary';

export type PaletteChoice = {
  id: string;
  name: string;
  /** Exactly as many colors as the template has roles, ground first. */
  colors: string[];
};

/**
 * What an ink the template set at text contrast (4.5:1 or more on its
 * ground), and its strongest ink whatever it was set at, keep on the new
 * ground, or their own contrast when that is lower. More than the 4.5:1 body
 * text needs, because pages derive muted copy by mixing a text ink into the
 * ground or drawing it at partial opacity: at exactly 4.5:1 a 70% mix of it
 * drops under 3:1.
 */
export const TEXT_CONTRAST = 7;

/** What any other ink the template set at 3:1 or more keeps. */
export const INK_CONTRAST = 3;

/** An ink the template set within this of its ground is a tint of it. */
export const TINT_CONTRAST = 1.3;

/** A color that renders as nothing, so `transparent` must survive a recolor. */
export const isTransparent = (value: string): boolean => {
  const color = value.trim().toLowerCase();

  return color === 'transparent' || /^#(?:[0-9a-f]{6})00$/.test(color);
};

const OPAQUE_HEX = /^#[0-9a-f]{6}$/i;

const toHex = (channels: readonly number[]): string =>
  `#${channels
    .map((channel) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, '0'))
    .join('')}`;

/** `a` taken `t` of the way to `b`, as hex: a palette is saved, and checked, as hex. */
function mixHex(a: string, b: string, t: number): string {
  const to = toRgb(b);

  return toHex(toRgb(a).map((channel, index) => channel + (to[index] - channel) * t));
}

/**
 * The least of the way from `from` toward `to` that reads at `min` on
 * `ground`, or `to` itself when nothing short of it does.
 */
function reach(from: string, to: string, ground: string, min: number): string {
  if (contrastRatio(from, ground) >= min) return from;

  let lo = 0;
  let hi = 1;

  for (let step = 0; step < 20; step++) {
    const mid = (lo + hi) / 2;

    if (contrastRatio(mixHex(from, to, mid), ground) >= min) hi = mid;
    else lo = mid;
  }

  return mixHex(from, to, hi);
}

/** Black or white, whichever reads better on `ground`. */
const farthest = (ground: string): string =>
  contrastRatio('#ffffff', ground) >= contrastRatio('#000000', ground) ? '#ffffff' : '#000000';

/**
 * The library ink for the role at `rank` of `count`, from `inks` strongest
 * first. The strongest role takes the strongest ink to itself, and the rest
 * share the others in rank order, neighbors together when there are more
 * roles than inks, so an accent stays apart from the text wherever the
 * palette has a second color.
 */
function inkAt(rank: number, count: number, inks: readonly string[]): string {
  if (rank === 0 || inks.length === 1) return inks[0];

  const rest = inks.length - 1;
  const others = count - 1;

  return inks[1 + (others <= rest ? rank - 1 : Math.floor(((rank - 1) * rest) / others))];
}

/**
 * Fit `source` (a library palette, ground first) to the `authored` roles.
 *
 * The ground takes the ground. The inks are ranked on both sides by their
 * contrast with their own ground, and each role takes the library ink at its
 * rank, so the color the template reads its text in gets the color that
 * reads best on the new ground. A role the template set within
 * TINT_CONTRAST of its ground (a panel, a band, a rule a shade off the page)
 * takes its ink diluted into the new ground to the same distance. Then an
 * ink the template set as text is moved toward black or white until it
 * reaches TEXT_CONTRAST, or the template's own contrast if lower, and any
 * other ink it set at INK_CONTRAST or more reaches that.
 *
 * Every text ink is lifted, not only the strongest: a dark page's body copy
 * and its neon accent can both sit at 17:1, and whichever ranks first by a
 * hair is not the one that tells which is the text.
 *
 * A role authored as transparent stays so: a pattern field drawn over a
 * photograph reads only because its ground is not painted.
 */
export function fitPalette(source: readonly string[], authored: readonly string[]): string[] {
  const ground = source[0];
  const fitted = authored.map((original, index) =>
    index === 0 && ground && !isTransparent(original) ? ground : original
  );
  const inks = source
    .slice(1)
    .map((color, index) => ({ color, index, contrast: contrastRatio(color, ground) }))
    .sort((a, b) => b.contrast - a.contrast || a.index - b.index)
    .map((ink) => ink.color);

  if (!ground || inks.length === 0) return fitted;

  // A ground that is not a plain color cannot rank the inks against it, and
  // they keep their authored order.
  const rankable = OPAQUE_HEX.test(authored[0] ?? '');
  const roles = authored
    .map((color, index) => ({ index, contrast: rankable ? contrastRatio(color, authored[0]) : 0 }))
    .filter(({ index }) => index > 0 && !isTransparent(authored[index]))
    .sort((a, b) => b.contrast - a.contrast || a.index - b.index);
  const pole = farthest(ground);

  roles.forEach((role, rank) => {
    const ink = inkAt(rank, roles.length, inks);

    if (rank > 0 && rankable && role.contrast < TINT_CONTRAST) {
      fitted[role.index] =
        contrastRatio(ink, ground) <= role.contrast ? ink : reach(ground, ink, ground, role.contrast);
      return;
    }

    const min =
      rank === 0 || role.contrast >= 4.5
        ? Math.min(role.contrast, TEXT_CONTRAST)
        : role.contrast >= INK_CONTRAST
          ? INK_CONTRAST
          : 0;

    fitted[role.index] = min > 0 ? reach(ink, pole, ground, min) : ink;
  });

  return fitted;
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
