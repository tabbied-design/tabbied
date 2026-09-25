// Color helpers shared by the palette editors.

// Normalize a hex string for the native color input (which only accepts
// #rrggbb): expand #rgb, drop any alpha, and fall back to white while a value
// is mid-edit or otherwise unparseable.
export const toColorInputValue = (hex: string): string => {
  const value = (hex ?? '').trim();

  if (/^#[0-9a-f]{3}$/i.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }

  if (/^#[0-9a-f]{6}/i.test(value)) {
    return value.slice(0, 7).toLowerCase();
  }

  return '#ffffff';
};

// Whether a hex color carries a zero alpha (a transparent #rrggbb00 value).
export const isTransparentHex = (hex: string): boolean =>
  /^#[0-9a-f]{8}$/i.test((hex ?? '').trim()) &&
  (hex ?? '').trim().toLowerCase().endsWith('00');

// The opaque `#rrggbb` form of a color (expands #rgb, drops any alpha), so
// switching a transparent background off brings the same color back.
export const toOpaqueHex = (hex: string): string => {
  const value = (hex ?? '').trim().replace(/^#/, '');

  if (value.length === 3) {
    return `#${value
      .split('')
      .map((char) => char + char)
      .join('')}`;
  }

  return `#${value.slice(0, 6).padEnd(6, '0')}`;
};

export const randomHexColor = (): string =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
