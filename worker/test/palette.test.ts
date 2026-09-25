import { contrastRatio } from 'tabbied-templates';
import { describe, expect, it } from 'vitest';
import { ensurePalette } from '../lib/palette';

// The palette is the one field the model authors freely, so these are the tests
// that stop an unreadable page shipping. The assertions are made against
// `contrastRatio` itself rather than against fixed hexes: the rule is the
// contract, and a repair that satisfies it by another route is still correct.

const FALLBACK = ['#ffffff', '#111111', '#888888'];

describe('ensurePalette', () => {
  it('passes a legible palette through untouched', () => {
    const result = ensurePalette(['#ffffff', '#1a1a1a', '#c04000'], FALLBACK);

    expect(result.status).toBe('clean');
    expect(result.colors).toEqual(['#ffffff', '#1a1a1a', '#c04000']);
  });

  it('repairs a palette whose inks are all too close to the ground', () => {
    // Three near-whites: nothing here is readable on white.
    const result = ensurePalette(['#ffffff', '#f4f4f4', '#eeeeee'], FALLBACK);

    expect(result.status).toBe('repaired');
    expect(result.colors[0]).toBe('#ffffff');

    const best = Math.max(
      ...result.colors.slice(1).map((ink) => contrastRatio(ink, result.colors[0]))
    );
    expect(best).toBeGreaterThanOrEqual(3);
  });

  it('rejects a palette whose inks all equal the background', () => {
    const result = ensurePalette(['#123456', '#123456'], FALLBACK);

    expect(result.status).toBe('rejected');
    expect(result.colors).toEqual(FALLBACK);
  });

  it('rejects a non-hex entry', () => {
    expect(ensurePalette(['#ffffff', 'rebeccapurple'], FALLBACK)).toEqual({
      colors: FALLBACK,
      status: 'rejected',
    });
  });

  it('expands shorthand hex and normalizes case, which are valid but not what downstream stores', () => {
    // Case is not a different color: `#FFFFFF` is the ground `#ffffff`.
    const result = ensurePalette(['#FFFFFF', '#123456', '#0a0'], FALLBACK);

    expect(result.status).toBe('clean');
    expect(result.colors).toEqual(['#ffffff', '#123456', '#00aa00']);
  });

  it('treats shorthand equal to the background as equal to it', () => {
    // `#fff` and `#ffffff` are one color; compared as strings, an invisible
    // ink would be "repaired" into a color nobody chose instead of rejected.
    const result = ensurePalette(['#ffffff', '#fff'], FALLBACK);

    expect(result.status).toBe('rejected');
    expect(result.colors).toEqual(FALLBACK);
  });
});
