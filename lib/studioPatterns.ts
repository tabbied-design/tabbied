// "Shuffle patterns": a new design for every pattern field on the page. Pure,
// with the randomness injected, so a draw can be tested.
import type { PatternEdit, PatternSlot } from 'tabbied-templates';
import type { DesignChoice } from './designCatalog';

/** The design a field draws now: the document's swap, or the authored one. */
export const designOn = (slot: PatternSlot, edit?: PatternEdit): string =>
  edit?.slug ?? slot.config.slug;

/** Four base-36 characters, the shape the pattern editor's seeds have. */
const randomSeed = (random: () => number = Math.random): string =>
  Array.from({ length: 4 }, () => Math.floor(random() * 36).toString(36)).join('');

/**
 * Draw a new design for each field, keeping the page's character: each field
 * draws from the designs of its current density, and no design is used twice
 * on a page while the library has another to offer. Every field gets a fresh
 * seed, and the result names every field, so a save carries the whole set.
 */
export function shuffleDesigns(
  slots: readonly PatternSlot[],
  current: Record<string, PatternEdit> | undefined,
  designs: readonly DesignChoice[],
  random: () => number = Math.random
): Record<string, PatternEdit> {
  const bySlug = new Map(designs.map((design) => [design.slug, design]));
  const taken = new Set(slots.map((slot) => designOn(slot, current?.[slot.id])));
  const next: Record<string, PatternEdit> = {};

  for (const slot of slots) {
    const now = designOn(slot, current?.[slot.id]);
    const density = bySlug.get(now)?.density;

    const pool = (
      density ? designs.filter((design) => design.density === density) : designs
    ).filter((design) => design.slug !== now && !taken.has(design.slug));
    const fallback = designs.filter((design) => design.slug !== now);
    const choices = pool.length > 0 ? pool : fallback.length > 0 ? fallback : designs;

    const chosen = choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];

    if (!chosen) continue;

    taken.add(chosen.slug);
    next[slot.id] = { slug: chosen.slug, seed: randomSeed(random) };
  }

  return next;
}

/** True when this field draws something other than what the template authored. */
export const patternChanged = (slot: PatternSlot, edit: PatternEdit | undefined): boolean => {
  if (!edit) return false;

  const swapped = edit.slug != null && edit.slug !== slot.config.slug;
  const reseeded = edit.seed != null && edit.seed !== slot.config.seed;

  return swapped || reseeded;
};

/** True when any field draws something other than what the template authored. */
export const patternsChanged = (
  slots: readonly PatternSlot[],
  current: Record<string, PatternEdit> | undefined
): boolean => slots.some((slot) => patternChanged(slot, current?.[slot.id]));

/**
 * Give one field a design a person chose, with a fresh seed; the other fields
 * keep what they draw. Choosing the template's own design is the field's
 * reset: its entry leaves the document so the authored seed and options come
 * back, and the caller rebuilds the canvas, since a plan without the entry
 * cannot put those attributes back.
 */
export function pickDesign(
  slots: readonly PatternSlot[],
  current: Record<string, PatternEdit> | undefined,
  slotId: string,
  slug: string,
  random: () => number = Math.random
): Record<string, PatternEdit> | undefined {
  const slot = slots.find((candidate) => candidate.id === slotId);
  const { [slotId]: _dropped, ...rest } = current ?? {};

  if (!slot || slug === slot.config.slug) {
    return Object.keys(rest).length > 0 ? rest : undefined;
  }

  return { ...rest, [slotId]: { slug, seed: randomSeed(random) } };
}
