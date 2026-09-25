// Color math for palette derivation. One copy, shared by the TemplateSite
// component (first render) and applyEdits() (re-color): the two must agree
// exactly, or a download's body text comes out in the wrong ink.

export type Rgb = [number, number, number];

/**
 * The three color channels of a hex color. `#rgb` and `#rgba` are expanded,
 * and the alpha byte of `#rgba` and `#rrggbbaa` is dropped before parsing so
 * it never shifts into the channels.
 */
export function toRgb(hex: string): Rgb {
  let value = hex.replace('#', '').trim();

  if (value.length === 3 || value.length === 4) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (value.length === 8) value = value.slice(0, 6);

  const n = Number.parseInt(value, 16);

  if (!Number.isFinite(n)) return [0, 0, 0];

  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Relative luminance, per WCAG. */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colors, 1..21. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];

  return (light + 0.05) / (dark + 0.05);
}

/**
 * Blend two colors, returning `rgb(...)`.
 *
 * Deliberately not hex: these feed CSS custom properties, and keeping them as
 * rgb() makes a derived value obvious when reading the DOM in devtools - it is
 * never mistaken for one of the brand hexes.
 */
export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = toRgb(a);
  const [br, bg, bb] = toRgb(b);
  const channel = (x: number, y: number) => Math.round(x + (y - x) * t);

  return `rgb(${channel(ar, br)}, ${channel(ag, bg)}, ${channel(ab, bb)})`;
}

/** Legible text color to sit on a filled swatch. */
export function onColor(hex: string): string {
  return luminance(hex) < 0.55 ? '#ffffff' : '#151515';
}

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && HEX_COLOR.test(value.trim());
