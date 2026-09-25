// Brand palette -> CSS custom properties.
//
// Color enters a template page exactly once, as custom properties on its root
// element, and the stylesheet only ever says `var(--...)`, so a re-color is a
// property rewrite rather than a search-and-replace through a stylesheet.
//
// Some of what the page needs is derived *from* the palette (the ink that stays
// legible on the ground, the card and panel tints, the text on a filled
// accent), so a re-color has to recompute those too, or body copy becomes
// unreadable.

import { luminance, mix, onColor } from './color.js';
import type { PaletteDerivation, PaletteSpec } from './spec.js';

/** Prefix for the raw brand roles: `--brand-0` is the background. */
export const BRAND_PROPERTY_PREFIX = '--brand-';

export const brandProperty = (index: number): string =>
  `${BRAND_PROPERTY_PREFIX}${index}`;

export type PaletteProperties = Record<string, string>;

/**
 * The variables the shared TemplateSite component works in.
 *
 * On a dark ground `--ink` is a near-white *tinted by the page itself*,
 * because a fixed cream reads as a foreign color on a navy or violet ground.
 */
function templateSiteProperties(
  colors: string[],
  flatSections?: boolean
): PaletteProperties {
  const bg = colors[0];
  const c1 = colors[1] ?? bg;
  const dark = luminance(bg) < 0.5;
  const darkest = [...colors].sort((a, b) => luminance(a) - luminance(b))[0];
  const ink = dark
    ? mix(bg, '#ffffff', 0.93)
    : luminance(darkest) < 0.4
      ? darkest
      : '#1c1e24';

  return {
    '--bg': bg,
    '--c1': c1,
    '--ink': ink,
    '--onC1': onColor(c1),
    '--card': dark ? mix(bg, '#ffffff', 0.07) : mix(bg, '#ffffff', 0.6),
    '--soft': dark ? mix(bg, '#ffffff', 0.04) : mix(bg, '#ffffff', 0.45),
    ...(flatSections ? { '--band': bg } : {}),
  };
}

/**
 * Every custom property a palette implies, ready to write onto the root.
 *
 * `direct` and `templateSite` emit the raw `--brand-N` roles - what a person
 * editing a downloaded template reads to find out which color is which.
 * `vars` emits the page's own names instead, because that is what its
 * stylesheet reads. Either way a pattern field's `paletteRoles` indexes the
 * palette array, not the properties, so the two derivations behave the same
 * from an edits document's point of view.
 */
export function derivePaletteProperties(
  colors: string[],
  derivation: PaletteDerivation = 'direct',
  options: { flatSections?: boolean; varNames?: readonly string[] } = {}
): PaletteProperties {
  const properties: PaletteProperties = {};

  // A `vars` page owns its property names and its stylesheet reads those, so
  // emitting `--brand-N` alongside them would be inert noise in the markup.
  if (derivation === 'vars') {
    (options.varNames ?? []).forEach((name, index) => {
      if (index < colors.length) properties[`--${name}`] = colors[index];
    });

    return properties;
  }

  colors.forEach((color, index) => {
    properties[brandProperty(index)] = color;
  });

  if (derivation === 'templateSite' && colors.length > 0) {
    Object.assign(
      properties,
      templateSiteProperties(colors, options.flatSections)
    );
  }

  return properties;
}

/** Convenience: the properties a whole PaletteSpec implies. */
export function propertiesForPalette(
  palette: PaletteSpec,
  colors: string[] = palette.colors
): PaletteProperties {
  return derivePaletteProperties(colors, palette.derivation, {
    flatSections: palette.flatSections,
    varNames: palette.varNames,
  });
}

/**
 * Resolve a pattern field's palette against a brand palette.
 *
 * A numeric role indexes the brand palette and wraps, as the renderer cycles a
 * short palette. A string role is a literal and never moves: `"transparent"`
 * is the common one, and a transparent color0 is what lets a pattern be drawn
 * *over* a photograph instead of over its own ground.
 */
export function resolvePaletteRoles(
  roles: readonly (number | string)[],
  colors: readonly string[]
): string[] {
  return roles.map((role) => {
    if (typeof role !== 'number') return role;
    if (colors.length === 0) return 'transparent';

    const index = ((role % colors.length) + colors.length) % colors.length;

    return colors[index];
  });
}
