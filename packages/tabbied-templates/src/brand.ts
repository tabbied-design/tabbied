// Brand copy: the three strings every small-business site needs, and the
// mapping from them onto a particular template's slots.
//
// Slot ids are local to the page that declares them (`brand.name` on the
// shared TemplateSite pages, `bar.mark` on a bespoke one), so a caller cannot
// address a template by id. It can by *role*: `data-edit-copy="brandName"`
// marks the slot holding the business's name, the generator carries it into
// the spec, and this module places the strings without knowing the template.
// Everything downstream is `planEdits`.
//
// Only three roles: they are the three a generated direction authors
// (worker/ai/schema.ts) and the three that are unambiguous on every template.
import { isHexColor } from './color.js';
import { MIN_PALETTE_COLORS } from './plan.js';
import { isTextSlot } from './spec.js';
import type { CopyRole, EditsDocument, TemplateSpec, TextSlot } from './spec.js';

/** The roles a template may declare, in the order an editor should show them. */
export const COPY_ROLES: readonly CopyRole[] = [
  'brandName',
  'headline',
  'tagline',
];

const isCopyRole = (value: string): value is CopyRole =>
  (COPY_ROLES as readonly string[]).includes(value);

/** Narrow an attribute value to a role, or `undefined` if it names none. */
export const parseCopyRole = (value: string | undefined): CopyRole | undefined =>
  value != null && isCopyRole(value) ? value : undefined;

/**
 * Every text slot carrying each role.
 *
 * A list, because a template may name two separate slots as the headline (a
 * hero and a repeated banner) and both should move together. Roles a template
 * does not declare are absent.
 */
export function copySlots(spec: TemplateSpec): Partial<Record<CopyRole, TextSlot[]>> {
  const found: Partial<Record<CopyRole, TextSlot[]>> = {};

  for (const slot of spec.slots) {
    if (!isTextSlot(slot) || !slot.role) continue;

    (found[slot.role] ??= []).push(slot);
  }

  return found;
}

/** Which roles this template can actually take copy for. */
export const declaredCopyRoles = (spec: TemplateSpec): CopyRole[] =>
  COPY_ROLES.filter((role) => (copySlots(spec)[role]?.length ?? 0) > 0);

/**
 * True when a template can be rebranded at all, i.e. it names the business
 * somewhere. A page with no `brandName` slot would render a generated
 * direction under the template's own name.
 */
export const supportsBrandCopy = (spec: TemplateSpec): boolean =>
  (copySlots(spec).brandName?.length ?? 0) > 0;

/** The strings a caller has. Every field optional - a partial edit is valid. */
export type BrandCopy = Partial<Record<CopyRole, string>>;

export type BrandDirection = {
  copy?: BrandCopy | null;
  /** Brand palette, background first. Ignored unless it is usable. */
  palette?: string[] | null;
};

const usablePalette = (palette: string[] | null | undefined): boolean =>
  Array.isArray(palette) &&
  palette.length >= MIN_PALETTE_COLORS &&
  palette.every((color) => isHexColor(color));

/**
 * Turn a brand direction into an edits document for one template.
 *
 * Total and lossy by design: a role the template does not declare is dropped
 * rather than reported, because the caller cannot act on the complaint (it can
 * check `declaredCopyRoles` ahead of time). A palette that would fail
 * `planEdits` is dropped too, and the template keeps its own.
 */
export function directionToEdits(
  spec: TemplateSpec,
  direction: BrandDirection
): EditsDocument {
  const slots = copySlots(spec);
  const text: Record<string, string> = {};

  for (const role of COPY_ROLES) {
    const value = direction.copy?.[role];

    if (typeof value !== 'string' || value.trim().length === 0) continue;

    for (const slot of slots[role] ?? []) {
      text[slot.id] = value;
    }
  }

  const document: EditsDocument = {
    specVersion: spec.specVersion,
    slug: spec.site.slug,
    edits: {},
  };

  if (Object.keys(text).length > 0) document.edits.text = text;
  if (usablePalette(direction.palette)) {
    document.edits.palette = direction.palette as string[];
  }

  return document;
}
