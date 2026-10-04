// Reading a PatternConfig out of attributes, for the two things that do it:
// hydratePatterns(), whose attributes are `data-seed`, `data-palette`, ...,
// and the <tabbied-pattern> element, whose attributes are the same names
// without the prefix. One parser behind both, so the formats cannot drift:
// a palette, an option list or a cover size written for one is read the same
// way by the other.
//
// Internal: not re-exported from the core entry point.
import { FIT_MODES } from './sizing.js';
import type { CoverRender } from './sizing.js';
import type { PatternConfig } from './createPattern.js';
import { splitTopLevel } from './splitTopLevel.js';
import type {
  PatternDefinition,
  PatternOption,
  FitMode,
  OptionValue,
} from './types.js';

/** Reads one attribute by its unprefixed name (`seed`, `cell-size`). */
export type AttributeReader = (name: string) => string | null;

export const parseCoverRender = (value: string): CoverRender | undefined => {
  const match = /^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/.exec(value.trim());

  if (!match) return undefined;

  return { width: Number(match[1]), height: Number(match[2]) };
};

const numberAttribute = (read: AttributeReader, name: string): number | undefined => {
  const raw = read(name);

  if (raw == null || raw.trim() === '') return undefined;

  const value = Number(raw);

  return Number.isFinite(value) ? value : undefined;
};

// Option values are typed by the definition rather than guessed from the
// string, so a ButtonSelectGroup whose choices happen to look numeric (or
// boolean) still comes back as the string css-doodle substitutes.
const coerceOptionValue = (
  option: PatternOption,
  raw: string
): OptionValue | undefined => {
  if (option.type === 'ToggleSwitch') {
    if (raw === 'true' || raw === '') return true;
    if (raw === 'false') return false;
    return undefined;
  }

  if (option.type === 'Slider') {
    // Number('') is 0, which would substitute a value the option never
    // offered; a bare `frequency:` entry should fall back to the default.
    if (raw === '') return undefined;
    const value = Number(raw);
    return Number.isFinite(value) ? value : undefined;
  }

  return raw;
};

/** `id: value; id: value`, typed by the definition's own option metadata. */
export const parseOptions = (
  definition: PatternDefinition,
  raw: string
): Record<string, OptionValue> => {
  const values: Record<string, OptionValue> = {};

  for (const entry of splitTopLevel(raw, ';')) {
    const separator = entry.indexOf(':');
    const id = (separator === -1 ? entry : entry.slice(0, separator)).trim();
    const rest = separator === -1 ? '' : entry.slice(separator + 1).trim();
    const option = definition.options.find((candidate) => candidate.id === id);

    if (!option) continue;

    const value = coerceOptionValue(option, rest);

    if (value !== undefined) values[id] = value;
  }

  return values;
};

/** Comma separated, split at top level so `rgb(0, 0, 0)` survives. */
export const parsePalette = (raw: string): string[] | undefined => {
  const colors = splitTopLevel(raw, ',');

  return colors.length > 0 ? colors : undefined;
};

const isFitMode = (value: string): value is FitMode =>
  (FIT_MODES as readonly string[]).includes(value);

/**
 * Everything but the definition, read through `read`. An attribute that does
 * not parse is left out, so the controller falls back to the design's
 * authored default for it: a hand-edited page degrades to the design's
 * defaults, not to a blank box.
 */
export function readPatternConfig(
  read: AttributeReader,
  definition: PatternDefinition
): PatternConfig {
  const config: PatternConfig = { pattern: definition };

  const seed = read('seed');
  if (seed) config.seed = seed;

  const fit = read('fit')?.trim();
  if (fit && isFitMode(fit)) config.fit = fit;

  const palette = read('palette');
  if (palette) {
    const colors = parsePalette(palette);
    if (colors) config.palette = colors;
  }

  const options = read('options');
  if (options) {
    const values = parseOptions(definition, options);
    if (Object.keys(values).length > 0) config.options = values;
  }

  const cellSize = numberAttribute(read, 'cell-size');
  if (cellSize != null) config.cellSize = cellSize;

  const density = numberAttribute(read, 'density');
  if (density != null) config.density = density;

  const width = numberAttribute(read, 'width');
  if (width != null) config.width = width;

  const height = numberAttribute(read, 'height');
  if (height != null) config.height = height;

  const coverRender = read('cover-render');
  if (coverRender) {
    const parsed = parseCoverRender(coverRender);
    if (parsed) config.coverRender = parsed;
  }

  const redrawInterval = numberAttribute(read, 'redraw-interval');
  if (redrawInterval != null) config.redrawInterval = redrawInterval;

  // Valueless attributes are the HTML idiom for a boolean flag, so `paused`
  // and `paused="true"` both mean paused.
  const paused = read('paused');
  if (paused != null && paused !== 'false') config.paused = true;

  return config;
}
