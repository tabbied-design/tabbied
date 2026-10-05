// How big a pattern is, case by case, for every setup's docs page: what the
// settings are, what the browser draws, and the code in each setup's own
// spelling. One list, so the six pages cannot tell the reader six different
// stories.
//
// Two families, because the box comes from two places:
//
// - React, Vue, Svelte and plain JavaScript size the box with the box props
//   (`fill`, `width`, `height`, `maxWidth`, `maxHeight`, `aspectRatio`),
//   which resolveBoxStyle() turns into CSS. `fill` is on by default and means
//   `width: 100%; height: 100%`.
// - The web component and plain HTML have no box props: the box is the CSS
//   on the element, a block, so it is full width and 0px tall until
//   something gives it a height.
//
// Every result was measured in Chromium, in an 800px-wide parent and an
// 800px-tall window, and lib/docsExamples.test.mjs keeps the code honest;
// e2e/docs-examples.spec.ts renders each case and checks the box it draws.
//
// No imports, so the test runs this file under Node's own TypeScript support.

export type Setup = 'react' | 'vue' | 'svelte' | 'javascript' | 'element' | 'html';

/** The family a setup sizes its box in. */
export const familyOf = (setup: Setup): 'props' | 'css' =>
  setup === 'element' || setup === 'html' ? 'css' : 'props';

type Value = string | number | boolean;

/** CSS for a parent or a sibling, as camelCase properties. */
type Style = Record<string, string | number>;

export type Result = {
  /** The pattern's box, in px, in the 800px-wide parent. 0 tall is nothing drawn. */
  w: number;
  h: number;
  /** The parent's height when it is not the pattern's (a flex row, a min-height). */
  parentH?: number;
  /** The height is the content's, whatever the font makes it, not a number. */
  followsContent?: boolean;
};

type Variant = {
  /** What happens and why, with `code` spans. */
  says: string;
  result: Result;
  /** The parent the pattern sits in, when the case is about it. */
  parent?: Style;
  /** A sibling before the pattern, such as a column of copy. */
  sibling?: Style;
  /** Markup after the pattern, inside the parent: the content it sits behind. */
  content?: string[];
};

export type PropsVariant = Variant & {
  /** The box props, in the order they are written. */
  box: Record<string, Value>;
  /** Pattern settings beyond the design, such as a fixed canvas. */
  config?: Record<string, Value>;
  /** More inline style on the pattern. */
  style?: Style;
};

export type CssVariant = Variant & {
  /** The pattern element's own CSS. */
  style: Style;
  /** Attributes beyond the design, such as a fixed canvas. */
  attributes?: Record<string, string>;
};

export type SizingCase = {
  id: string;
  title: string;
  props?: PropsVariant;
  css?: CssVariant;
};

/** What the background case sits behind. */
const CONTENT = ['<h2>Headline</h2>', '<p>The copy sets the height.</p>'];

export const SIZING_CASES: SizingCase[] = [
  {
    id: 'size',
    title: 'A fixed width and height',
    props: {
      says: 'Both axes are set, so the box is exactly that size wherever it is. Numbers are px; a string is any CSS length.',
      box: { width: 400, height: 300 },
      result: { w: 400, h: 300 },
    },
    css: {
      says: 'Both axes are set, so the box is exactly that size wherever it is.',
      style: { width: '400px', height: '300px' },
      result: { w: 400, h: 300 },
    },
  },
  {
    id: 'height',
    title: 'Full width, a fixed height',
    props: {
      says: 'Only `height` is given, so `fill` keeps the width at 100% of the parent. The usual shape for a banner or a section divider.',
      box: { height: 320 },
      result: { w: 800, h: 320 },
    },
    css: {
      says: 'The element is a block, so it is already the full width of its parent; a height is all it needs.',
      style: { height: '320px' },
      result: { w: 800, h: 320 },
    },
  },
  {
    id: 'ratio',
    title: 'Full width at a ratio',
    props: {
      says: 'The safest default when the parent has no height: the width is the parent\'s and the height follows from `aspectRatio`. It takes `3 / 2`, `1.5`, or the editor\'s `3:2`.',
      box: { aspectRatio: '3 / 2' },
      result: { w: 800, h: 533 },
    },
    css: {
      says: 'The safest default when the parent has no height: the block is full width and `aspect-ratio` gives it a height.',
      style: { aspectRatio: '3 / 2' },
      result: { w: 800, h: 533 },
    },
  },
  {
    id: 'capped',
    title: 'A ratio with a maximum width',
    props: {
      says: '`maxWidth` caps the width, and the height still follows the ratio. Add `margin: 0 auto` in `style` to center it.',
      box: { maxWidth: 600, aspectRatio: '3 / 2' },
      result: { w: 600, h: 400 },
    },
    css: {
      says: '`max-width` caps the width, and the height still follows the ratio. Add `margin: 0 auto` to center it.',
      style: { maxWidth: '600px', aspectRatio: '3 / 2' },
      result: { w: 600, h: 400 },
    },
  },
  {
    id: 'width-ratio',
    title: 'A fixed width and a ratio',
    props: {
      says: 'The width is set and the height is worked out from the ratio: 400px at 2 / 1 is 200px tall.',
      box: { width: 400, aspectRatio: '2 / 1' },
      result: { w: 400, h: 200 },
    },
    css: {
      says: 'The width is set and the height is worked out from the ratio: 400px at 2 / 1 is 200px tall.',
      style: { width: '400px', aspectRatio: '2 / 1' },
      result: { w: 400, h: 200 },
    },
  },
  {
    id: 'all-three',
    title: 'Width, height and a ratio',
    props: {
      says: 'When both `width` and `height` are set, the box is that size and `aspectRatio` is ignored: CSS only uses a ratio to work out an axis that has no size of its own.',
      box: { width: 400, height: 300, aspectRatio: 1 },
      result: { w: 400, h: 300 },
    },
    css: {
      says: 'When both `width` and `height` are set, the box is that size and `aspect-ratio` is ignored: CSS only uses a ratio to work out an axis that has no size of its own.',
      style: { width: '400px', height: '300px', aspectRatio: '1' },
      result: { w: 400, h: 300 },
    },
  },
  {
    id: 'height-ratio',
    title: 'A height and a ratio',
    props: {
      says: 'A trap: `fill` sets the width to 100%, so both axes have a size and the ratio is ignored. The box is the parent\'s width by 300px, not 600 by 300.',
      box: { height: 300, aspectRatio: 2 },
      result: { w: 800, h: 300 },
    },
    css: {
      says: 'With no width, the width is worked out from the height: 300px at 2 / 1 is 600px wide.',
      style: { height: '300px', aspectRatio: '2 / 1' },
      result: { w: 600, h: 300 },
    },
  },
  {
    id: 'height-ratio-no-fill',
    title: 'A height and a ratio, width from the ratio',
    props: {
      says: '`fill={false}` drops the 100% width, so the width is worked out from the height and the ratio: 600 by 300.',
      box: { fill: false, height: 300, aspectRatio: 2 },
      result: { w: 600, h: 300 },
    },
    css: {
      says: 'Add `width: 100%` and both axes have a size again, so the ratio is ignored: the parent\'s width by 300px.',
      style: { width: '100%', height: '300px', aspectRatio: '2 / 1' },
      result: { w: 800, h: 300 },
    },
  },
  {
    id: 'max-height-ratio',
    title: 'A ratio with a maximum height',
    props: {
      says: 'Another trap: the width stays at 100% and `maxHeight` clamps the height, so the box loses its ratio, 800 by 200 rather than square.',
      box: { maxHeight: 200, aspectRatio: 1 },
      result: { w: 800, h: 200 },
    },
    css: {
      says: 'With no width, the ratio wins: the height is capped at 200px and the width follows it, so the box stays square.',
      style: { maxHeight: '200px', aspectRatio: '1' },
      result: { w: 200, h: 200 },
    },
  },
  {
    id: 'max-height-ratio-no-fill',
    title: 'A ratio with a maximum height, kept square',
    props: {
      says: 'With `fill={false}` there is no 100% width to hold on to, so the width shrinks with the capped height and the ratio holds: 200 by 200.',
      box: { fill: false, maxHeight: 200, aspectRatio: 1 },
      result: { w: 200, h: 200 },
    },
    css: {
      says: 'Add `width: 100%` and the width holds while the height is clamped, so the box loses its ratio: 800 by 200.',
      style: { width: '100%', maxHeight: '200px', aspectRatio: '1' },
      result: { w: 800, h: 200 },
    },
  },
  {
    id: 'lengths',
    title: 'Any CSS length',
    props: {
      says: 'Strings are written through as CSS, so percentages, viewport units, `min()` and `calc()` all work. Here, half the parent by 40% of the window.',
      box: { width: '50%', height: '40vh' },
      result: { w: 400, h: 320 },
    },
    css: {
      says: 'Percentages, viewport units, `min()` and `calc()` all work. Here, half the parent by 40% of the window.',
      style: { width: '50%', height: '40vh' },
      result: { w: 400, h: 320 },
    },
  },
  {
    id: 'parent-height',
    title: 'Filling a parent that has a height',
    props: {
      says: 'With no box props the pattern fills its parent, 100% by 100%. That works when the parent has a height of its own, here 300px, or a grid row or flex column that gives it one.',
      box: {},
      parent: { height: 300 },
      result: { w: 800, h: 300 },
    },
    css: {
      says: 'To fill a parent that has a height, say so with `height: 100%`: the block is already full width.',
      style: { height: '100%' },
      parent: { height: 300 },
      result: { w: 800, h: 300 },
    },
  },
  {
    id: 'parent-no-height',
    title: 'A parent with no height',
    props: {
      says: 'The most common reason a pattern draws nothing. A pattern has no content to give it a height, and 100% of a parent that sizes to its content is 0px, so the box is 0px tall and nothing is drawn. In development the console says so once. Give the pattern a `height` or an `aspectRatio`, or the parent a height.',
      box: {},
      result: { w: 800, h: 0 },
    },
    css: {
      says: 'The most common reason a pattern draws nothing. The element has no content to give it a height, so with no height, or `height: 100%` of a parent that sizes to its content, it is 0px tall and nothing is drawn. Give it a `height` or an `aspect-ratio`, or the parent a height.',
      style: { height: '100%' },
      result: { w: 800, h: 0 },
    },
  },
  {
    id: 'min-height',
    title: 'A parent with only a min-height',
    props: {
      says: 'A `min-height` is not a height: 100% of it still resolves to nothing, and the pattern is 0px tall. Make the parent a flex column instead (next).',
      box: {},
      parent: { minHeight: 250 },
      result: { w: 800, h: 0, parentH: 250 },
    },
    css: {
      says: 'A `min-height` is not a height: `height: 100%` of it still resolves to nothing, and the pattern is 0px tall. Make the parent a flex column instead (next).',
      style: { height: '100%' },
      parent: { minHeight: 250 },
      result: { w: 800, h: 0, parentH: 250 },
    },
  },
  {
    id: 'min-height-flex',
    title: 'A min-height parent, as a flex column',
    props: {
      says: 'In a flex column the pattern can grow to the parent\'s height with `flex: 1`. `fill={false}` drops the 100% height that would otherwise stand in its way.',
      box: { fill: false },
      style: { flex: 1 },
      parent: { minHeight: 250, display: 'flex', flexDirection: 'column' },
      result: { w: 800, h: 250 },
    },
    css: {
      says: 'In a flex column the pattern grows to the parent\'s height with `flex: 1`.',
      style: { flex: '1' },
      parent: { minHeight: '250px', display: 'flex', flexDirection: 'column' },
      result: { w: 800, h: 250 },
    },
  },
  {
    id: 'flex-row',
    title: 'Beside content in a flex row',
    props: {
      says: '100% of a flex row that sizes to its content is nothing again, so the pattern stays 0px tall beside a 300px column of copy. Drop `fill` and give it `flex: 1`: it takes the rest of the row and stretches to the row\'s height, 600 by 300.',
      box: { fill: false },
      style: { flex: 1 },
      parent: { display: 'flex' },
      sibling: { width: 200, height: 300 },
      result: { w: 600, h: 300 },
    },
    css: {
      says: 'A flex item with no content is 0px wide, so the pattern needs `flex: 1` to take the rest of the row; it then stretches to the row\'s height, 600 by 300.',
      style: { flex: '1' },
      parent: { display: 'flex' },
      sibling: { width: '200px', height: '300px' },
      result: { w: 600, h: 300 },
    },
  },
  {
    id: 'behind',
    title: 'Behind a block of content',
    props: {
      says: 'For a background, take the pattern out of the flow with `position: absolute; inset: 0` in `style`: it covers whatever height the content gives the parent. `isolation: isolate` on the parent keeps the pattern\'s `z-index: -1` inside it.',
      box: {},
      style: { position: 'absolute', inset: 0, zIndex: -1 },
      parent: { position: 'relative', isolation: 'isolate', padding: 40 },
      content: CONTENT,
      result: { w: 800, h: 160, followsContent: true },
    },
    css: {
      says: 'For a background, take the pattern out of the flow with `position: absolute; inset: 0`: it covers whatever height the content gives the parent. `isolation: isolate` on the parent keeps the pattern\'s `z-index: -1` inside it.',
      style: { position: 'absolute', inset: '0', zIndex: '-1' },
      parent: { position: 'relative', isolation: 'isolate', padding: '40px' },
      content: CONTENT,
      result: { w: 800, h: 160, followsContent: true },
    },
  },
  {
    id: 'fixed',
    title: 'A fixed canvas',
    props: {
      says: 'With `fit="fixed"` the pattern is drawn at an exact canvas size and the box is that canvas: 360 by 540 unless numeric `width` and `height` say otherwise. It never fills its parent.',
      box: { width: 360, height: 540 },
      config: { fit: 'fixed' },
      result: { w: 360, h: 540 },
    },
    css: {
      says: 'With `fit="fixed"` the pattern is drawn at an exact canvas size, 360 by 540 unless `width` and `height` say otherwise. The web component shrinks to the canvas on its own; a plain `div` is a full-width block, so it takes `display: inline-block` to do the same.',
      style: {},
      attributes: { fit: 'fixed', width: '360', height: '540' },
      result: { w: 360, h: 540 },
    },
  },
];

// ---- code --------------------------------------------------------------

const kebab = (name: string) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** CSS lengths need a unit; these properties take a bare number. */
const UNITLESS = new Set(['flex', 'zIndex', 'aspectRatio', 'opacity']);

const cssValue = (name: string, value: string | number) =>
  typeof value === 'number' && !UNITLESS.has(name) && value !== 0 ? `${value}px` : String(value);

/** `{ minHeight: 250 }` as `min-height: 250px`. */
export const cssText = (style: Style) =>
  Object.entries(style)
    .map(([name, value]) => `${kebab(name)}: ${cssValue(name, value)}`)
    .join('; ');

/** Past this many columns a tag goes one attribute a line, and an object one entry a line, as Prettier does. */
const PRINT_WIDTH = 80;

const fits = (line: string, depth: number, offset = 0) =>
  !line.includes('\n') && offset + depth * 2 + line.length <= PRINT_WIDTH;

const indent = (lines: string[]) => lines.map((line) => `  ${line}`);

/**
 * A tag, as lines relative to its own depth: on one line when it fits,
 * otherwise one attribute a line. It closes itself, closes round some text
 * (`''` for an empty element), or stays open for children. `offset` is what
 * precedes every line, such as a comment's `// `.
 */
function tag(
  name: string,
  attrs: string[],
  close: 'self' | 'open' | { text: string },
  depth: number,
  offset = 0
): string[] {
  const end = close === 'self' ? '/>' : close === 'open' ? '>' : `>${close.text}</${name}>`;
  const line = `<${name}${attrs.length ? ` ${attrs.join(' ')}` : ''}${close === 'self' ? ' ' : ''}${end}`;
  if (fits(line, depth, offset)) return [line];
  return [`<${name}`, ...indent(attrs.flatMap((attr) => attr.split('\n'))), end];
}

/** An object literal inside a line: on that line when it fits, otherwise one entry a line. */
function objectLines(before: string, entries: string[], after: string, depth: number): string[] {
  const line = `${before}${entries.length ? `{ ${entries.join(', ')} }` : '{}'}${after}`;
  if (fits(line, depth)) return [line];
  return [`${before}{`, ...indent(entries.map((entry) => `${entry},`)), `}${after}`];
}

/** `{ minHeight: 250 }` as React's `style={{ minHeight: 250 }}`, at the depth the attribute sits. */
const reactStyle = (style: Style, depth: number) =>
  objectLines(
    'style={',
    Object.entries(style).map(([name, value]) => `${name}: ${typeof value === 'number' ? value : `'${value}'`}`),
    '}',
    depth
  ).join('\n');

/** `{ minHeight: 250 }` as `style="min-height: 250px"`. */
const htmlStyle = (style: Style) => `style="${cssText(style)}"`;

const SIBLING_TEXT = 'Copy';

const reactProp = (name: string, value: Value) =>
  typeof value === 'string' ? `${name}="${value}"` : `${name}={${value}}`;

const vueProp = (name: string, value: Value) =>
  typeof value === 'string' ? `${kebab(name)}="${value}"` : `:${kebab(name)}="${value}"`;

const jsValue = (value: Value) => (typeof value === 'string' ? `'${value}'` : String(value));

const jsEntries = (record: Record<string, Value>) =>
  Object.entries(record).map(([name, value]) => `${name}: ${jsValue(value)}`);

/** The parent a pattern sits in and the sibling beside it, each a tag at its depth. */
function frame(
  variant: Variant,
  depth: number,
  styleAttr: (style: Style, depth: number) => string,
  offset = 0
) {
  return {
    parent: variant.parent ? tag('div', [styleAttr(variant.parent, depth + 1)], 'open', depth, offset) : null,
    sibling: variant.sibling
      ? tag('div', [styleAttr(variant.sibling, depth + 2)], { text: SIBLING_TEXT }, depth + 1, offset)
      : null,
  };
}

/** Put a pattern's lines in its parent, after any sibling and before any content. */
function nest(pattern: string[], parent: string[] | null, sibling: string[] | null, content: string[] = []): string[] {
  if (!parent) return pattern;
  return [...parent, ...indent(sibling ?? []), ...indent(pattern), ...indent(content), '</div>'];
}

function reactCode(variant: PropsVariant): string {
  const depth = variant.parent ? 1 : 0;
  const attrs = [
    'pattern={radius}',
    ...Object.entries(variant.config ?? {}).map(([name, value]) => reactProp(name, value)),
    ...Object.entries(variant.box).map(([name, value]) => reactProp(name, value)),
    ...(variant.style ? [reactStyle(variant.style, depth + 1)] : []),
  ];
  const { parent, sibling } = frame(variant, 0, reactStyle);
  return nest(tag('TabbiedPattern', attrs, 'self', depth), parent, sibling, variant.content).join('\n');
}

function vueCode(variant: PropsVariant): string {
  // Everything sits one level in, inside <template>.
  const depth = variant.parent ? 2 : 1;
  const attrs = [
    ':pattern="radius"',
    ...Object.entries(variant.config ?? {}).map(([name, value]) => vueProp(name, value)),
    ...Object.entries(variant.box).map(([name, value]) => vueProp(name, value)),
    ...(variant.style ? [htmlStyle(variant.style)] : []),
  ];
  const { parent, sibling } = frame(variant, 1, htmlStyle);
  return [
    '<template>',
    ...indent(nest(tag('TabbiedPattern', attrs, 'self', depth), parent, sibling, variant.content)),
    '</template>',
  ].join('\n');
}

function svelteCode(variant: PropsVariant): string {
  const props = jsEntries({
    ...(variant.config ?? {}),
    ...variant.box,
    ...(variant.style ? { style: cssText(variant.style) } : {}),
  });
  const pattern = tag(
    'div',
    ['{...tabbiedAttributes(props)}', 'use:tabbied={props}'],
    { text: '' },
    variant.parent ? 1 : 0
  );
  const { parent, sibling } = frame(variant, 0, htmlStyle);
  return [
    '<script>',
    ...indent(objectLines('const props = ', ['pattern: radius', ...props], ';', 1)),
    '</script>',
    '',
    ...nest(pattern, parent, sibling, variant.content),
  ].join('\n');
}

function javascriptCode(variant: PropsVariant): string {
  // The markup is shown as comments above the script that mounts into it.
  const comment = 3;
  const { parent, sibling } = frame(variant, 0, htmlStyle, comment);
  const markup = nest(['<div id="pattern"></div>'], parent, sibling, variant.content);
  return [
    ...markup.map((line) => `// ${line}`),
    `const host = document.querySelector('#pattern');`,
    ...objectLines('Object.assign(host.style, resolveBoxStyle(', jsEntries(variant.box), '));', 0),
    ...(variant.style ? [`host.style.cssText += '; ${cssText(variant.style)}';`] : []),
    ...objectLines(
      'createPattern(host, ',
      ['pattern: radius', ...jsEntries({ ...(variant.config ?? {}), ...numericCanvas(variant) })],
      ');',
      0
    ),
  ].join('\n');
}

/** A fixed canvas's numeric width and height reach the controller too. */
function numericCanvas(variant: PropsVariant): Record<string, Value> {
  if (variant.config?.fit !== 'fixed') return {};
  const { width, height } = variant.box;
  return {
    ...(typeof width === 'number' ? { width } : {}),
    ...(typeof height === 'number' ? { height } : {}),
  };
}

function elementCode(variant: CssVariant): string {
  const attrs = [
    'pattern="radius"',
    ...Object.entries(variant.attributes ?? {}).map(([name, value]) => `${name}="${value}"`),
    ...(variant.attributes?.fit === 'fixed' ? [] : [htmlStyle({ display: 'block', ...variant.style })]),
  ];
  const { parent, sibling } = frame(variant, 0, htmlStyle);
  return nest(
    tag('tabbied-pattern', attrs, { text: '' }, variant.parent ? 1 : 0),
    parent,
    sibling,
    variant.content
  ).join('\n');
}

function htmlCode(variant: CssVariant): string {
  const attrs = [
    'data-pattern="radius"',
    ...Object.entries(variant.attributes ?? {}).map(([name, value]) => `data-${name}="${value}"`),
    // A div is a block: a fixed canvas sits at the left of a full-width
    // box, so it is made to shrink to the canvas instead.
    htmlStyle(variant.attributes?.fit === 'fixed' ? { display: 'inline-block' } : variant.style),
  ].filter((attr) => attr !== 'style=""');
  const { parent, sibling } = frame(variant, 0, htmlStyle);
  return nest(tag('div', attrs, { text: '' }, variant.parent ? 1 : 0), parent, sibling, variant.content).join('\n');
}

export type SizingSnippet = { code: string; lang: 'tsx' | 'vue' | 'svelte' | 'html' | 'ts' };

/** One case's code in one setup, or null when the case has no form there. */
export function sizingCode(setup: Setup, sizing: SizingCase): SizingSnippet | null {
  if (familyOf(setup) === 'css') {
    if (!sizing.css) return null;
    return { code: setup === 'element' ? elementCode(sizing.css) : htmlCode(sizing.css), lang: 'html' };
  }
  if (!sizing.props) return null;
  switch (setup) {
    case 'react':
      return { code: reactCode(sizing.props), lang: 'tsx' };
    case 'vue':
      return { code: vueCode(sizing.props), lang: 'vue' };
    case 'svelte':
      return { code: svelteCode(sizing.props), lang: 'svelte' };
    default:
      return { code: javascriptCode(sizing.props), lang: 'ts' };
  }
}

/** The variant a setup's page shows. */
export const variantFor = (setup: Setup, sizing: SizingCase) =>
  familyOf(setup) === 'css' ? sizing.css : sizing.props;
