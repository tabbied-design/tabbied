// Turns one batch-14 definition into the pattern JSON it ships as, after
// checking it. Shared by generate-batch14.mjs (which writes the files) and
// check-batch14.mjs (which renders definitions straight from memory while a
// family is being authored), so the two can never disagree about what a
// definition produces.
//
// The checks are pattern-lints.mjs (the house rules and the clean-SVG subset
// batches 11-13 hold to) plus the ones batch 14 adds, below.
import { lintPattern } from './pattern-lints.mjs';
import { validateDesignMetadata } from '../../packages/tabbied/scripts/catalog-vocabulary.mjs';

const SHELL = (host) =>
  `:doodle { @grid: \${grid}; @size: \${width} \${height}; overflow:hidden; text-align:center; box-sizing:border-box; ${host} } :container { background: var(--color0); overflow:hidden; }`;

const GRID_OPTION = (def) => ({
  id: 'grid',
  displayName: 'Columns and rows',
  type: 'ButtonSelectGroup',
  default: def,
  options: ['2x3', '4x6', '6x9', '8x12', '10x15'],
  replace: '${grid}',
});

const FREQ_OPTION = (def) => ({
  id: 'frequency',
  displayName: 'Frequency',
  type: 'Slider',
  default: def,
  min: 0.2,
  max: 1,
  step: 0.1,
  replace: '${shapeFrequency}',
});

const collapse = (s) => s.replace(/\s+/g, ' ').trim();

/**
 * The checks batch 14 adds to pattern-lints.mjs. Each one is a failure that
 * is silent at runtime, which is why it is caught here.
 */
function lintBatch14({ slug, style, doodle, palette, description }) {
  // A rule-local custom property read with var() makes the whole declaration
  // invalid at computed-value time: Tabbied mounts with use="var(--rule)", so
  // the host substitutes every var() in --rule before :doodle exists, and the
  // design paints nothing. css-doodle's @var() resolves at generation time.
  for (const m of `${style} ${doodle}`.matchAll(/(?<!@)var\(\s*(--[\w-]+)/g)) {
    if (!/^--color\d+$/.test(m[1])) {
      throw new Error(`${slug}: var(${m[1]}) - read a rule-local property with @var(${m[1]})`);
    }
  }
  // A color slot past the end of the palette is the same invalid value.
  for (const m of style.matchAll(/--color(\d+)/g)) {
    if (Number(m[1]) >= palette.length) {
      throw new Error(`${slug}: --color${m[1]} is past the end of its ${palette.length}-color palette`);
    }
  }
  // Patterns move by reseeding. A keyframe animation is a compositing layer
  // per cell whether it moves or not, paid for by every card in the gallery.
  if (/@keyframes|animation\s*:/.test(style)) {
    throw new Error(`${slug}: keyframe animations are not allowed - a pattern moves by reseeding`);
  }
  // Text has no clean SVG mapping and depends on the viewer's fonts.
  for (const m of style.matchAll(/content\s*:\s*([^;]*);/g)) {
    if (!["''", '""'].includes(m[1].trim())) {
      throw new Error(`${slug}: pseudo-element content must be empty - no text in a design`);
    }
  }
  if (/@size\s*:[^;]*@var/.test(doodle)) {
    throw new Error(`${slug}: @var() is not expanded inside @size`);
  }
  // CLAUDE.md: everything written in the repo is plain ASCII.
  if (/[^\x20-\x7E]/.test(description) || /[^\x20-\x7E]/.test(style + doodle)) {
    throw new Error(`${slug}: non-ASCII character in the description or code`);
  }
  if (!/^[A-Z].*\.$/.test(description) || description.length > 220) {
    throw new Error(`${slug}: the description is one or two sentences, capitalized, ending in a period, under 220 characters`);
  }
}

/**
 * @param {object} def   one entry of `batch14` (numbered, with `order`)
 * @returns {object}     the pattern definition, key order as it is written
 */
export function buildPattern(def) {
  const options = [GRID_OPTION(def.gridDefault), FREQ_OPTION(def.freqDefault)];
  const style = collapse(`${def.vars ?? ''} --rule: ( ${def.rule} );`);
  const doodle = collapse(SHELL(def.host ?? ''));

  lintPattern({
    slug: def.slug,
    style,
    doodle,
    options,
    palette: def.palette,
    colors: def.colors,
    batch: 'batch 14',
  });
  lintBatch14({
    slug: def.slug,
    style,
    doodle,
    palette: def.palette,
    description: def.description,
  });
  const metaErrors = validateDesignMetadata({ slug: def.slug, ...def.meta });
  if (metaErrors.length) throw new Error(metaErrors.join('; '));

  return {
    name: def.name,
    slug: def.slug,
    galleryOrder: def.order,
    ...(def.white ? { galleryWhite: true } : {}),
    description: def.description,
    tags: def.meta.tags,
    mood: def.meta.mood,
    density: def.meta.density,
    goodFor: def.meta.goodFor,
    palette: def.palette,
    colors: def.colors,
    ...(def.sizing ? { sizing: def.sizing } : {}),
    options,
    code: { style, doodle },
  };
}

/** The galleryThumbnails.ts entry for a definition. */
export const thumbEntry = (def) =>
  `  ${def.slug}: {\n    options: { grid: '${def.thumb.grid}', frequency: ${def.thumb.frequency} },\n  },`;
