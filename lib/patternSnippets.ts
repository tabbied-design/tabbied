// The code the pattern editor's Export menu copies, one builder per setup,
// all from the same state: the design, seed, palette, options, density and
// the plate's ratio. A snippet draws in an embed what the plate showed, at
// the size it showed it: the grid is left to the box and `density` carries
// the cell size, as in the package itself.
//
// No imports, on purpose: lib/patternSnippets.test.mjs runs this file under
// Node's own TypeScript support, with no bundler and no path aliases.

export type SnippetKind = 'react' | 'vue' | 'svelte' | 'element' | 'html';

export type SnippetInput = {
  slug: string;
  seed: string;
  /** The colors in use, background first. */
  palette: readonly string[];
  /** Option ids and values, the grid option already left out. */
  options: ReadonlyArray<readonly [string, string | number | boolean]>;
  /** The plate's ratio as width and height, and as the editor names it. */
  ratio: readonly [number, number];
  ratioLabel: string;
  /** The density, or null for a design without a grid. */
  density: number | null;
  /** The tabbied version the site is built against. */
  version: string;
};

type SnippetSpec = {
  kind: SnippetKind;
  /** The menu item. */
  label: string;
  /** The toast once it is on the clipboard. */
  copied: string;
  /**
   * The first release of the package with this entry point. An entry the
   * site's own package version has not reached is not offered: a snippet
   * that imports what npm does not have yet fails for whoever pastes it.
   * The release workflow bumps the version in the same merge that
   * publishes, so a snippet appears on the site with its release.
   */
  since: string;
};

export const SNIPPETS: readonly SnippetSpec[] = [
  { kind: 'react', label: 'React component', copied: 'React component copied', since: '0.7.0' },
  { kind: 'vue', label: 'Vue component', copied: 'Vue component copied', since: '0.8.0' },
  { kind: 'svelte', label: 'Svelte action', copied: 'Svelte action copied', since: '0.8.0' },
  { kind: 'element', label: 'Web component', copied: 'Web component copied', since: '0.8.0' },
  { kind: 'html', label: 'HTML embed', copied: 'HTML embed copied', since: '0.7.0' },
];

const parts = (version: string) =>
  version
    .split('-')[0]
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);

/** `a >= b`, on major.minor.patch; a prerelease counts as its release. */
export function versionAtLeast(a: string, b: string): boolean {
  const [x, y] = [parts(a), parts(b)];

  for (let i = 0; i < 3; i += 1) {
    if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  }

  return true;
}

/** The snippets this version of the package can back. */
export function availableSnippets(version: string): SnippetSpec[] {
  return SNIPPETS.filter((spec) => versionAtLeast(version, spec.since));
}

// ---- quoting ---------------------------------------------------------------

/** A single-quoted JS string. */
const js = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** A double-quoted HTML attribute value. */
const attr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const jsValue = (value: string | number | boolean) =>
  typeof value === 'string' ? js(value) : String(value);

const optionsObject = (input: SnippetInput) =>
  `{ ${input.options.map(([id, value]) => `${id}: ${jsValue(value)}`).join(', ')} }`;

const paletteArray = (input: SnippetInput) => `[${input.palette.map(js).join(', ')}]`;

/** `id: value; id: value`, the attribute form both HTML snippets use. */
const optionsAttribute = (input: SnippetInput) =>
  input.options.map(([id, value]) => `${id}: ${value}`).join('; ');

const cssRatio = (input: SnippetInput) => `${input.ratio[0]} / ${input.ratio[1]}`;

const componentName = (slug: string) => `${slug.charAt(0).toUpperCase()}${slug.slice(1)}Pattern`;

// ---- the snippets ----------------------------------------------------------

function react(input: SnippetInput): string {
  return [
    `import { TabbiedPattern } from 'tabbied/react';`,
    `import { ${input.slug} } from 'tabbied/patterns';`,
    ``,
    `// As wide as its parent, at the ${input.ratioLabel} ratio it was designed at.`,
    `// Add maxWidth to bound it, or swap aspectRatio for a fixed height.`,
    `export function ${componentName(input.slug)}() {`,
    `  return (`,
    `    <TabbiedPattern`,
    `      pattern={${input.slug}}`,
    `      seed="${attr(input.seed)}"`,
    `      aspectRatio="${cssRatio(input)}"`,
    ...(input.density != null ? [`      density={${input.density}}`] : []),
    `      palette={${paletteArray(input)}}`,
    ...(input.options.length ? [`      options={${optionsObject(input)}}`] : []),
    `    />`,
    `  );`,
    `}`,
  ].join('\n');
}

function vue(input: SnippetInput): string {
  return [
    `<script setup>`,
    `import { TabbiedPattern } from 'tabbied/vue';`,
    `import { ${input.slug} } from 'tabbied/patterns';`,
    `</script>`,
    ``,
    `<template>`,
    `  <!-- As wide as its parent, at the ${input.ratioLabel} ratio it was designed at.`,
    `       Add max-width to bound it, or swap aspect-ratio for a fixed height. -->`,
    `  <TabbiedPattern`,
    `    :pattern="${input.slug}"`,
    `    seed="${attr(input.seed)}"`,
    `    aspect-ratio="${cssRatio(input)}"`,
    ...(input.density != null ? [`    :density="${input.density}"`] : []),
    `    :palette="${attr(paletteArray(input))}"`,
    ...(input.options.length ? [`    :options="${attr(optionsObject(input))}"`] : []),
    `  />`,
    `</template>`,
  ].join('\n');
}

function svelte(input: SnippetInput): string {
  return [
    `<script>`,
    `  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';`,
    `  import { ${input.slug} } from 'tabbied/patterns';`,
    ``,
    `  // As wide as its parent, at the ${input.ratioLabel} ratio it was designed at.`,
    `  // Add maxWidth to bound it, or swap aspectRatio for a fixed height.`,
    `  const props = {`,
    `    pattern: ${input.slug},`,
    `    seed: ${js(input.seed)},`,
    `    aspectRatio: ${js(cssRatio(input))},`,
    ...(input.density != null ? [`    density: ${input.density},`] : []),
    `    palette: ${paletteArray(input)},`,
    ...(input.options.length ? [`    options: ${optionsObject(input)},`] : []),
    `  };`,
    `</script>`,
    ``,
    `<!-- Server rendered at its final size; the action draws into it. -->`,
    `<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
  ].join('\n');
}

function element(input: SnippetInput): string {
  const options = optionsAttribute(input);
  const ground = input.palette[0];

  return [
    `<!-- As wide as its parent, at the ${input.ratioLabel} ratio it was designed at.`,
    `     The inline style sizes the box before the script loads, so nothing shifts. -->`,
    `<tabbied-pattern`,
    `  pattern="${input.slug}"`,
    `  seed="${attr(input.seed)}"`,
    ...(input.density != null ? [`  density="${input.density}"`] : []),
    `  palette="${attr(input.palette.join(', '))}"`,
    ...(options ? [`  options="${attr(options)}"`] : []),
    `  style="display: block; aspect-ratio: ${cssRatio(input)}${ground ? `; background: ${attr(ground)}` : ''}"`,
    `></tabbied-pattern>`,
    ``,
    `<!-- Once per page. It loads each design the page names, and only those. -->`,
    `<script type="module" src="https://cdn.jsdelivr.net/npm/tabbied@${input.version}/dist/element/tabbied-element.js"></script>`,
  ].join('\n');
}

// The no-build-step markup hydratePatterns() reads. `?exports=` trims the
// patterns entry to this one design (the whole catalog is about 450 KB), and
// the version is pinned, as the HTML template downloads pin it.
function html(input: SnippetInput): string {
  const base = `https://esm.sh/tabbied@${input.version}`;
  const options = optionsAttribute(input);

  return [
    `<!-- As wide as its parent, at the ${input.ratioLabel} ratio it was designed at.`,
    `     Add max-width to bound it, or swap aspect-ratio for a fixed height. -->`,
    `<div data-pattern="${input.slug}"`,
    `     data-seed="${attr(input.seed)}"`,
    ...(input.density != null ? [`     data-density="${input.density}"`] : []),
    `     data-palette="${attr(input.palette.join(', '))}"`,
    ...(options ? [`     data-options="${attr(options)}"`] : []),
    `     style="width: 100%; aspect-ratio: ${cssRatio(input)}"></div>`,
    ``,
    `<!-- Once per page, after the patterns. For several designs, list each one. -->`,
    `<script type="module">`,
    `  import { hydratePatterns } from '${base}';`,
    `  import { ${input.slug} } from '${base}/patterns?exports=${input.slug}';`,
    ``,
    `  hydratePatterns({ patterns: { ${input.slug} } });`,
    `</script>`,
  ].join('\n');
}

const BUILDERS: Record<SnippetKind, (input: SnippetInput) => string> = {
  react,
  vue,
  svelte,
  element,
  html,
};

export function buildSnippet(kind: SnippetKind, input: SnippetInput): string {
  return BUILDERS[kind](input);
}
