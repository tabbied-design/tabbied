// Turning an edits document into a list of concrete changes.
//
// This is the whole engine, and it touches no DOM: given a spec and an edits
// document it computes *what* would change, as data, and apply.ts executes it.
// Validation, palette resolution, option ranges and attribute serialization
// all live here, so they test under `node --test` with no browser, and the
// site builder, the packager and an LLM pipeline can plan or check a change
// without a page.

import { isHexColor } from './color.js';
import { stripEmphasis } from './text.js';
import { propertiesForPalette, resolvePaletteRoles } from './palette.js';
import type { PaletteProperties } from './palette.js';
import type {
  EditsDocument,
  PaletteDerivation,
  PatternEdit,
  PatternOptionSpec,
  PatternSlot,
  Problem,
  Slot,
  SlotKind,
  TemplateSpec,
  TextFormat,
} from './spec.js';
import { SPEC_VERSION } from './spec.js';

export type EditOperation =
  | {
      type: 'text';
      id: string;
      value: string;
      format: TextFormat;
      emphasisClass?: string;
      emphasisTag?: string;
    }
  | { type: 'image'; id: string; src: string; alt?: string }
  | {
      type: 'pattern';
      id: string;
      /** Attribute name -> value, or null to remove it. */
      attributes: Record<string, string | null>;
    }
  | { type: 'properties'; properties: PaletteProperties };

export type EditPlan = {
  operations: EditOperation[];
  problems: Problem[];
};

export type PlanOptions = {
  /**
   * The designs a pattern slot may be swapped to (the catalog's slugs). When
   * given, a swap outside it is an error rather than an attribute that
   * hydrates to a blank with only a console warning. Left out, a swap is only
   * checked for shape (the packager and the build gate have no catalog).
   */
  designs?: ReadonlySet<string> | readonly string[];
};

const designSet = (
  designs: PlanOptions['designs']
): ReadonlySet<string> | null =>
  designs == null
    ? null
    : designs instanceof Set
      ? designs
      : new Set(designs as readonly string[]);

/** Minimum usable palette: a ground plus one ink. */
export const MIN_PALETTE_COLORS = 2;

const error = (path: string, message: string): Problem => ({
  level: 'error',
  path,
  message,
});

const warning = (path: string, message: string): Problem => ({
  level: 'warning',
  path,
  message,
});

// Both documents arrive as parsed JSON (a fetched spec, a saved revision, a
// model's answer), so the checks below read them as `unknown` first: a check
// that throws on the thing it was asked to check is no check.
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const oneOf = <T>(values: readonly T[], value: unknown): value is T =>
  (values as readonly unknown[]).includes(value);

const SLOT_KINDS: readonly SlotKind[] = ['text', 'image', 'pattern'];
const TEXT_FORMATS: readonly TextFormat[] = ['plain', 'emphasis'];
const DERIVATIONS: readonly PaletteDerivation[] = [
  'direct',
  'templateSite',
  'vars',
];

/** "a text slot", "an image slot". */
const slotPhrase = (kind: unknown): string => {
  const name = String(kind);

  return `${/^[aeiou]/i.test(name) ? 'an' : 'a'} ${name} slot`;
};

const findSlot = (spec: TemplateSpec, id: string): Slot | undefined =>
  spec.slots.find((slot) => slot?.id === id);

const entriesOf = (value: unknown): [string, unknown][] =>
  isRecord(value) ? Object.entries(value) : [];

const isOptionValue = (value: unknown): value is string | number | boolean =>
  typeof value === 'string' ||
  typeof value === 'boolean' ||
  (typeof value === 'number' && Number.isFinite(value));

/**
 * Whether a string may be written as an image's `src`.
 *
 * A path or a relative URL has no scheme and is always fine, as are http(s),
 * `blob:` (a local preview) and an inline picture (`data:image/...`). Any
 * other scheme is refused: `javascript:` and its relatives are a script path
 * into the page the document is applied to, and `data:text/html` is not a
 * picture. A browser drops tabs and newlines anywhere in a URL, and leading
 * spaces and control characters, before it reads the scheme, so they are
 * dropped here first or `java\tscript:` would pass.
 */
export function isSafeImageSrc(src: unknown): src is string {
  if (typeof src !== 'string') return false;

  const value = src.replace(/[\t\n\r]/g, '').replace(/^[\x00-\x20]+/, '');

  if (value === '') return false;

  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(value);

  if (!scheme) return true;

  const name = scheme[1].toLowerCase();

  if (name === 'http' || name === 'https' || name === 'blob') return true;

  return name === 'data' && /^data:image\//i.test(value);
}

const serializePalette = (colors: readonly string[]): string =>
  colors.join(', ');

const serializeOptions = (
  options: Record<string, string | number | boolean>
): string =>
  Object.entries(options)
    .filter(([, value]) => value != null)
    .map(([id, value]) => `${id}: ${value}`)
    .join('; ');

/**
 * Check one option value against the range the catalog published for it.
 *
 * Out-of-range is an error rather than a clamp: it means a stale spec or a
 * hallucinated range, and clamping would hide that from an LLM pipeline that
 * could otherwise correct itself.
 */
function checkOption(
  path: string,
  option: PatternOptionSpec,
  value: string | number | boolean
): Problem[] {
  if (option.type === 'ToggleSwitch') {
    return typeof value === 'boolean'
      ? []
      : [error(path, `option "${option.id}" expects a boolean`)];
  }

  if (option.type === 'Slider') {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return [error(path, `option "${option.id}" expects a number`)];
    }

    const { min, max } = option;

    if (min != null && value < min) {
      return [error(path, `option "${option.id}" is below its minimum (${min})`)];
    }

    if (max != null && value > max) {
      return [error(path, `option "${option.id}" is above its maximum (${max})`)];
    }

    return [];
  }

  const values = option.values ?? [];

  if (values.length > 0 && !values.includes(String(value))) {
    return [
      error(
        path,
        `option "${option.id}" must be one of: ${values.join(', ')}`
      ),
    ];
  }

  return [];
}

function checkPalette(path: string, colors: unknown): Problem[] {
  if (!Array.isArray(colors)) {
    return [error(path, 'palette must be an array of colors')];
  }

  if (colors.length < MIN_PALETTE_COLORS) {
    return [
      error(
        path,
        `palette needs at least ${MIN_PALETTE_COLORS} colors (a ground and an ink)`
      ),
    ];
  }

  return colors.flatMap((color, index) =>
    isHexColor(color)
      ? []
      : [error(`${path}[${index}]`, `"${String(color)}" is not a hex color`)]
  );
}

/**
 * Compute every change an edits document implies.
 *
 * Problems and operations are returned together, and an operation is only
 * emitted for an edit that validated: a document with one bad slot id still
 * applies the rest, which is what makes a partially-stale saved project (or a
 * partially-wrong LLM response) recoverable rather than a wall.
 *
 * The document is checked as untrusted JSON and any shape of it comes back as
 * problems, never as a throw. The spec is trusted once `validateSpec` has
 * passed it, which the build gate does for every published one.
 */
export function planEdits(
  spec: TemplateSpec,
  document: EditsDocument,
  options: PlanOptions = {}
): EditPlan {
  const problems: Problem[] = [];
  const operations: EditOperation[] = [];
  const designs = designSet(options.designs);

  if (
    !isRecord(spec) ||
    !isRecord(spec.site) ||
    !isRecord(spec.palette) ||
    !Array.isArray(spec.slots)
  ) {
    problems.push(
      error('(spec)', 'not a template spec (check it with validateSpec)')
    );
    return { operations, problems };
  }

  if (!isRecord(document)) {
    problems.push(error('(document)', 'an edits document must be an object'));
    return { operations, problems };
  }

  if (document.specVersion !== spec.specVersion) {
    problems.push(
      error(
        'specVersion',
        `edits target spec version ${document.specVersion}, this template is version ${spec.specVersion}`
      )
    );
    return { operations, problems };
  }

  if (document.slug !== spec.site.slug) {
    problems.push(
      error(
        'slug',
        `edits target "${document.slug}" but this template is "${spec.site.slug}"`
      )
    );
    return { operations, problems };
  }

  const edits = document.edits ?? {};

  if (!isRecord(edits)) {
    problems.push(error('edits', 'edits must be an object'));
    return { operations, problems };
  }

  for (const key of ['text', 'images', 'patterns'] as const) {
    if (edits[key] != null && !isRecord(edits[key])) {
      problems.push(error(key, `${key} must be an object keyed by slot id`));
    }
  }

  // ---- palette ------------------------------------------------------------
  // Resolved first because pattern fields re-color from it, and an explicit
  // per-field palette in the same document has to win over that.
  let paletteColors: string[] | null = null;

  if (edits.palette != null) {
    const paletteProblems = checkPalette('palette', edits.palette);

    problems.push(...paletteProblems);

    if (paletteProblems.length === 0) {
      paletteColors = edits.palette;
      operations.push({
        type: 'properties',
        properties: propertiesForPalette(spec.palette, edits.palette),
      });
    }
  }

  // ---- text ---------------------------------------------------------------
  for (const [id, value] of entriesOf(edits.text)) {
    const path = `text.${id}`;
    const slot = findSlot(spec, id);

    if (!slot) {
      problems.push(error(path, `no slot "${id}" in this template`));
      continue;
    }

    if (slot.kind !== 'text') {
      problems.push(error(path, `slot "${id}" is ${slotPhrase(slot.kind)}`));
      continue;
    }

    if (typeof value !== 'string') {
      problems.push(error(path, 'text must be a string'));
      continue;
    }

    // A soft budget, not a rule: a long headline is the user's call. It is
    // measured against the rendered text, so `{em}` markers do not count.
    const rendered = stripEmphasis(value).length;
    if (slot.maxChars != null && rendered > slot.maxChars) {
      problems.push(
        warning(
          path,
          `${rendered} characters where the design expects about ${slot.maxChars}`
        )
      );
    }

    const operation: EditOperation = {
      type: 'text',
      id,
      value,
      format: slot.format,
      emphasisClass: slot.emphasisClass,
    };

    // Only when the page declares one: an absent tag means `em`, and an own
    // property set to undefined is not the same shape to a deep comparison.
    if (slot.emphasisTag) operation.emphasisTag = slot.emphasisTag;

    operations.push(operation);
  }

  // ---- images -------------------------------------------------------------
  for (const [id, edit] of entriesOf(edits.images)) {
    const path = `images.${id}`;
    const slot = findSlot(spec, id);

    if (!slot) {
      problems.push(error(path, `no slot "${id}" in this template`));
      continue;
    }

    if (slot.kind !== 'image') {
      problems.push(error(path, `slot "${id}" is ${slotPhrase(slot.kind)}`));
      continue;
    }

    if (!isRecord(edit) || typeof edit.src !== 'string' || edit.src.trim() === '') {
      problems.push(error(path, 'an image edit needs a src'));
      continue;
    }

    // Not echoed back: a refused src may be a megabyte of data: URI.
    if (!isSafeImageSrc(edit.src)) {
      problems.push(
        error(
          `${path}.src`,
          'src must be a path, or an http(s), blob: or data:image/ URL'
        )
      );
      continue;
    }

    if (edit.alt != null && typeof edit.alt !== 'string') {
      problems.push(error(`${path}.alt`, 'alt must be a string'));
      continue;
    }

    operations.push({
      type: 'image',
      id,
      src: edit.src,
      alt: typeof edit.alt === 'string' ? edit.alt : slot.alt,
    });
  }

  // ---- patterns -----------------------------------------------------------
  // Every pattern slot that re-colors from the brand palette needs an
  // operation when the palette moved, even if the document never mentions it.
  const patternEdits = isRecord(edits.patterns) ? edits.patterns : {};
  const patternIds = new Set<string>(Object.keys(patternEdits));

  if (paletteColors) {
    for (const slot of spec.slots) {
      if (slot?.kind === 'pattern' && slot.paletteRoles) patternIds.add(slot.id);
    }
  }

  for (const id of patternIds) {
    const path = `patterns.${id}`;
    const slot = findSlot(spec, id);

    if (!slot) {
      problems.push(error(path, `no slot "${id}" in this template`));
      continue;
    }

    if (slot.kind !== 'pattern') {
      problems.push(error(path, `slot "${id}" is ${slotPhrase(slot.kind)}`));
      continue;
    }

    const raw: unknown = patternEdits[id] ?? {};

    if (!isRecord(raw)) {
      problems.push(error(path, 'a pattern edit must be an object'));
      continue;
    }

    const edit = raw as PatternEdit;
    const attributes: Record<string, string | null> = {};
    const swapped = typeof edit.slug === 'string' && edit.slug !== slot.config.slug;

    if (edit.slug != null) {
      if (typeof edit.slug !== 'string' || edit.slug.trim() === '') {
        problems.push(error(path, 'a design swap needs a slug'));
        continue;
      }

      if (swapped && designs && !designs.has(edit.slug)) {
        problems.push(
          error(`${path}.slug`, `no design "${edit.slug}" in the catalog`)
        );
        continue;
      }

      if (swapped) attributes['data-pattern'] = edit.slug;
    }

    // Palette precedence: an explicit override, else the brand palette through
    // this field's roles, else leave the authored palette alone.
    if (edit.palette != null) {
      const paletteProblems = checkPalette(`${path}.palette`, edit.palette);

      problems.push(...paletteProblems);

      if (paletteProblems.length === 0) {
        attributes['data-palette'] = serializePalette(edit.palette);
      }
    } else if (paletteColors && slot.paletteRoles) {
      attributes['data-palette'] = serializePalette(
        resolvePaletteRoles(slot.paletteRoles, paletteColors)
      );
    }

    if (edit.options != null) {
      const optionProblems: Problem[] = !isRecord(edit.options)
        ? [error(`${path}.options`, 'options must be an object of option ids to values')]
        : Object.entries(edit.options).flatMap(([optionId, value]) =>
            isOptionValue(value)
              ? []
              : [
                  error(
                    `${path}.options.${optionId}`,
                    'an option value must be a string, a number or a boolean'
                  ),
                ]
          );

      if (optionProblems.length === 0 && swapped) {
        // The slot's option metadata describes the design being replaced, so
        // there is nothing to check the new values against. Say so.
        problems.push(
          warning(
            path,
            'options were not validated: the design was swapped, so this spec has no ranges for them'
          )
        );
      } else if (optionProblems.length === 0) {
        for (const [optionId, value] of Object.entries(edit.options)) {
          const option = slot.options?.find(
            (candidate) => candidate.id === optionId
          );

          if (!option) {
            optionProblems.push(
              error(`${path}.options.${optionId}`, `"${slot.config.slug}" has no option "${optionId}"`)
            );
            continue;
          }

          optionProblems.push(
            ...checkOption(`${path}.options.${optionId}`, option, value)
          );
        }
      }

      problems.push(...optionProblems);

      if (optionProblems.length === 0) {
        // `data-options` is the field's whole set, so an edit to one option
        // is written over the others the page already has: written alone, it
        // would drop the grid along with everything else not named. A swap is
        // the exception, since the old design's options mean nothing to the
        // new one.
        attributes['data-options'] = serializeOptions(
          swapped ? edit.options : { ...slot.config.options, ...edit.options }
        );
      } else if (swapped) {
        // Refused values are dropped, but the old design's set still goes.
        attributes['data-options'] = null;
      }
    } else if (swapped) {
      // Option ids belong to the design that declared them; carrying the old
      // design's set onto a new one leaves attributes that quietly do nothing.
      attributes['data-options'] = null;
    }

    if (edit.seed != null) {
      if (typeof edit.seed !== 'string') {
        problems.push(error(`${path}.seed`, 'seed must be a string'));
      } else {
        attributes['data-seed'] = edit.seed;
      }
    }

    if (Object.keys(attributes).length > 0) {
      operations.push({ type: 'pattern', id, attributes });
    }
  }

  return { operations, problems };
}

/** Just the problems - for a caller that wants to check before applying. */
export function validateEdits(
  spec: TemplateSpec,
  document: EditsDocument,
  options: PlanOptions = {}
): Problem[] {
  return planEdits(spec, document, options).problems;
}

/**
 * Structural checks on a generated spec.
 *
 * Runs in the build gate (`npm run editable`). Two slots sharing an id, or an
 * empty one, produce a spec that looks fine and an editor whose controls do
 * nothing.
 *
 * Any JSON comes back as problems, never as a throw, and a spec with no errors
 * is one `planEdits` can read without throwing either.
 */
export function validateSpec(spec: TemplateSpec): Problem[] {
  const problems: Problem[] = [];
  const candidate: unknown = spec;

  if (!isRecord(candidate)) {
    return [error('(spec)', 'a spec must be an object')];
  }

  if (typeof candidate.specVersion !== 'number') {
    problems.push(error('specVersion', 'specVersion must be a number'));
  } else if (candidate.specVersion !== SPEC_VERSION) {
    problems.push(
      warning(
        'specVersion',
        `spec is version ${candidate.specVersion}, this build speaks ${SPEC_VERSION}`
      )
    );
  }

  const site = candidate.site;

  if (!isRecord(site)) {
    problems.push(error('site', 'a spec needs a site: { slug, name }'));
  } else {
    if (typeof site.slug !== 'string' || site.slug.trim() === '') {
      problems.push(error('site.slug', 'the site needs a slug'));
    }

    if (typeof site.name !== 'string') {
      problems.push(error('site.name', 'the site name must be a string'));
    }
  }

  const palette = candidate.palette;
  let paletteLength: number | null = null;

  if (!isRecord(palette)) {
    problems.push(error('palette', 'a spec needs a palette: { colors, derivation }'));
  } else {
    problems.push(...checkPalette('palette', palette.colors));

    if (Array.isArray(palette.colors)) paletteLength = palette.colors.length;

    if (!oneOf(DERIVATIONS, palette.derivation)) {
      problems.push(
        error(
          'palette.derivation',
          `derivation must be one of: ${DERIVATIONS.join(', ')}`
        )
      );
    }
  }

  if (!Array.isArray(candidate.slots)) {
    problems.push(error('slots', 'slots must be an array'));
    return problems;
  }

  const seen = new Set<string>();

  for (const [index, slot] of candidate.slots.entries()) {
    if (!isRecord(slot)) {
      problems.push(error(`slots[${index}]`, 'a slot must be an object'));
      continue;
    }

    if (typeof slot.id !== 'string' || slot.id.trim() === '') {
      problems.push(error(`slots[${index}]`, 'a slot has an empty id'));
      continue;
    }

    const id = slot.id;

    if (seen.has(id)) {
      problems.push(error(id, `duplicate slot id "${id}"`));
    }

    seen.add(id);

    if (!oneOf(SLOT_KINDS, slot.kind)) {
      problems.push(
        error(
          `${id}.kind`,
          `kind ${JSON.stringify(slot.kind) ?? 'undefined'} is not one of: ${SLOT_KINDS.join(', ')}`
        )
      );
      continue;
    }

    if (slot.kind === 'text') {
      if (typeof slot.value !== 'string') {
        problems.push(error(`${id}.value`, 'a text slot needs a string value'));
      }

      if (!oneOf(TEXT_FORMATS, slot.format)) {
        problems.push(
          error(`${id}.format`, `format must be one of: ${TEXT_FORMATS.join(', ')}`)
        );
      }

      continue;
    }

    if (slot.kind === 'image') {
      if (typeof slot.src !== 'string') {
        problems.push(error(`${id}.src`, 'an image slot needs a string src'));
      }

      continue;
    }

    const config = slot.config;

    if (
      !isRecord(config) ||
      typeof config.slug !== 'string' ||
      config.slug.trim() === ''
    ) {
      problems.push(error(`${id}.config.slug`, 'a pattern slot needs a design slug'));
    }

    // Merged under an option edit, so it has to be a set of values.
    if (isRecord(config) && config.options != null && !isRecord(config.options)) {
      problems.push(error(`${id}.config.options`, 'config options must be an object'));
    }

    if (
      slot.options != null &&
      (!Array.isArray(slot.options) ||
        !slot.options.every(
          (option) => isRecord(option) && typeof option.id === 'string'
        ))
    ) {
      problems.push(error(`${id}.options`, 'options must be an array of { id, type, ... }'));
    }

    if (slot.paletteRoles == null) continue;

    if (!Array.isArray(slot.paletteRoles)) {
      problems.push(error(`${id}.paletteRoles`, 'paletteRoles must be an array'));
      continue;
    }

    for (const [index, role] of slot.paletteRoles.entries()) {
      const path = `${id}.paletteRoles[${index}]`;

      // A string is a literal (`transparent`) and never moves.
      if (typeof role === 'string') continue;

      if (typeof role !== 'number' || !Number.isInteger(role) || role < 0) {
        problems.push(error(path, `role ${String(role)} is not a palette index`));
      } else if (paletteLength != null && role >= paletteLength) {
        // resolvePaletteRoles wraps an index past the end, so a re-color
        // would give the field a color the annotation never meant.
        problems.push(
          error(
            path,
            `role ${role} is past the end of the palette (${paletteLength} colors)`
          )
        );
      }
    }
  }

  return problems;
}

export const hasErrors = (problems: readonly Problem[]): boolean =>
  problems.some((problem) => problem.level === 'error');

export function formatProblems(problems: readonly Problem[]): string {
  return problems
    .map((problem) => `  ${problem.level}: ${problem.path} - ${problem.message}`)
    .join('\n');
}

function isPatternSlotWithRoles(slot: Slot): slot is PatternSlot {
  return slot.kind === 'pattern' && slot.paletteRoles != null;
}

/** Pattern slots that follow the brand palette - the ones a re-color moves. */
export function recolorablePatternSlots(spec: TemplateSpec): PatternSlot[] {
  return spec.slots.filter(isPatternSlotWithRoles);
}
