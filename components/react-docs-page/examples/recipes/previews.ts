// What each recipe draws, for the live preview above its file
// (components/react-docs-page/RecipePreview.tsx). One entry per recipe id:
// a recipe of the same id draws the same thing in every setup, with the same
// designs, seeds, palettes and box, so one preview serves all six pages.
// lib/docsExamples.test.mjs checks every entry against every recipe's code,
// so a preview cannot show what its code would not draw.
//
// No imports, so the test runs this file under Node's own TypeScript support.

export type PreviewKind =
  | 'hero'
  | 'cards'
  | 'divider'
  | 'photo'
  | 'brand'
  | 'classes'
  | 'labelled'
  | 'theme'
  | 'system-theme'
  | 'shuffle'
  | 'picker'
  | 'controls'
  | 'ambient'
  | 'export'
  | 'upload'
  | 'lazy'
  | 'spa'
  | 'later'
  | 'single'
  | 'pair';

export type RecipePreviewSpec = {
  kind: PreviewKind;
  /** The designs drawn, by slug, in the order the preview draws them. */
  designs: string[];
  seeds?: string[];
  /** The seeds come from the page's data (a post's id), not from the code. */
  seedsFromData?: boolean;
  /** One palette, or two for a theme switch (dark first). */
  palettes?: string[][];
  options?: Record<string, number>;
  density?: number;
  height?: number;
  width?: number;
  aspectRatio?: string;
  redrawInterval?: number;
  /** A ground drawn while a design loads, or before the script runs. */
  ground?: string;
};

const DARK = ['#0B1020', '#3E8BFF', '#3FFFB2'];
const LIGHT = ['#FFF4E6', '#E8590C', '#1C1C1C'];
const BRAND = ['#0B1020', '#3E8BFF', '#3FFFB2', '#FF3D8B'];

export const RECIPE_PREVIEWS: Record<string, RecipePreviewSpec> = {
  // ---- layout
  hero: {
    kind: 'hero',
    designs: ['radius'],
    seeds: ['launch'],
    palettes: [['#0B1020', '#1D3A8A', '#3E8BFF', '#3FFFB2']],
    density: 0.3,
  },
  cards: {
    kind: 'cards',
    designs: ['quilt'],
    seeds: ['post-1', 'post-2', 'post-3'],
    seedsFromData: true,
    aspectRatio: '16 / 9',
  },
  divider: { kind: 'divider', designs: ['ortho'], seeds: ['divider'], density: 0.9, height: 48 },
  photo: {
    kind: 'photo',
    designs: ['radius'],
    palettes: [['transparent', '#FFFFFF', '#3FFFB2']],
    options: { frequency: 0.4 },
    aspectRatio: '21 / 9',
  },
  brand: {
    kind: 'brand',
    designs: ['radius', 'quilt', 'vitrail', 'ortho'],
    seeds: ['brand'],
    palettes: [BRAND],
    aspectRatio: '1',
  },
  // A banner its stylesheet sizes: 160px tall, 288px from 768px up.
  classes: { kind: 'classes', designs: ['radius'] },
  stylesheet: { kind: 'classes', designs: ['radius'], height: 160 },
  labelled: { kind: 'labelled', designs: ['radius'], seeds: ['k9Pz'], aspectRatio: '1' },

  // ---- interaction
  theme: { kind: 'theme', designs: ['radius'], seeds: ['k9Pz'], palettes: [DARK, LIGHT], height: 240 },
  'system-theme': {
    kind: 'system-theme',
    designs: ['radius'],
    seeds: ['k9Pz'],
    palettes: [DARK, LIGHT],
    aspectRatio: '3 / 1',
  },
  shuffle: { kind: 'shuffle', designs: ['radius'], aspectRatio: '3 / 2' },
  picker: { kind: 'picker', designs: ['radius', 'quilt', 'vitrail'], seeds: ['k9Pz'], aspectRatio: '3 / 2' },
  controls: {
    kind: 'controls',
    designs: ['radius'],
    seeds: ['k9Pz'],
    options: { frequency: 0.8 },
    density: 0.5,
    height: 280,
  },
  ambient: { kind: 'ambient', designs: ['radius'], height: 240, redrawInterval: 4000 },
  export: { kind: 'export', designs: ['radius'], seeds: ['k9Pz'], aspectRatio: '3 / 2' },
  upload: { kind: 'upload', designs: ['radius'], seeds: ['k9Pz'], width: 600, height: 400 },
  error: { kind: 'single', designs: ['radius'], height: 200, ground: '#0B1020' },

  // ---- in an app
  'lazy-designs': { kind: 'lazy', designs: ['radius', 'quilt', 'vitrail'], aspectRatio: '3 / 2' },
  next: { kind: 'single', designs: ['radius'], seeds: ['k9Pz'], aspectRatio: '16 / 9' },
  nuxt: { kind: 'single', designs: ['radius'], seeds: ['k9Pz'], aspectRatio: '16 / 9' },
  sveltekit: { kind: 'single', designs: ['radius'], seeds: ['k9Pz'], aspectRatio: '16 / 9' },
  'own-element': { kind: 'single', designs: ['radius'], seeds: ['brand'], palettes: [DARK], aspectRatio: '3 / 1' },
  spa: { kind: 'spa', designs: ['radius'], height: 200, redrawInterval: 5000 },
  'self-host': { kind: 'single', designs: ['radius'], aspectRatio: '3 / 2' },
  bundled: { kind: 'single', designs: ['radius'], aspectRatio: '3 / 2' },
  property: { kind: 'single', designs: ['radius'], palettes: [DARK], aspectRatio: '3 / 2' },
  cms: {
    kind: 'single',
    designs: ['radius'],
    seeds: ['k9Pz'],
    palettes: [DARK],
    aspectRatio: '16 / 9',
    ground: '#0B1020',
  },
  later: { kind: 'later', designs: ['quilt'], seeds: ['page-1'], seedsFromData: true, aspectRatio: '16 / 9' },
  unknown: { kind: 'single', designs: ['radius'], height: 200 },
  defaults: { kind: 'pair', designs: ['radius', 'quilt'], height: 200, redrawInterval: 6000 },
};
