// tabbied/snippets: the code that puts one design on a page, one builder per
// setup, from one description of it (design, seed, palette, options, density,
// ratio). Three things write code for a person or an agent, and all three
// call these builders, so they cannot drift apart:
//
// - the site's pattern editor, whose Export menu copies one (lib/patternSnippets);
// - the MCP server's get_design, which returns them for the design asked for;
// - codegen's catalog.json, whose `usage` carries them for one example design.
//
// A snippet draws in an embed what the editor's plate showed, at the size it
// showed it: the grid is left to the box and `density` carries the cell size,
// as in the package itself.
//
// No imports, on purpose: codegen loads this file before tsc has run, and the
// site's lib tests run it under Node's own TypeScript support.

export type SnippetSetup = 'react' | 'vue' | 'svelte' | 'element' | 'html' | 'core';

/** Every setup, in the order the docs and the editor list them. */
export const SNIPPET_SETUPS: readonly SnippetSetup[] = [
  'react',
  'vue',
  'svelte',
  'element',
  'html',
  'core',
];

export type SnippetOptionValue = string | number | boolean;

export type SnippetInput = {
  /** The design's slug, which is also its export name in `tabbied/patterns`. */
  slug: string;
  /** Omitted: a new seed on every load. */
  seed?: string;
  /** The colors, background first. Omitted: the design's own palette. */
  palette?: readonly string[];
  /**
   * The background the box shows before the script runs, for the two
   * snippets whose box is plain markup (`element`, `html`). Defaults to the
   * palette's first color; pass the design's own when `palette` is omitted.
   */
  ground?: string;
  /** Option ids and values. Omitted: the design's defaults. */
  options?: ReadonlyArray<readonly [string, SnippetOptionValue]>;
  /** The ratio as width and height, e.g. [2, 3]. */
  ratio: readonly [number, number];
  /** How the ratio is named in the comment. Defaults to "2:3". */
  ratioLabel?: string;
  /** The density, 0 to 1. Omitted or null: the design's default. */
  density?: number | null;
  /** The tabbied version the CDN snippets pin. */
  version: string;
};

// ---- quoting ---------------------------------------------------------------

/** A single-quoted JS string. */
const js = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** A double-quoted HTML attribute value. */
const attr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const jsValue = (value: SnippetOptionValue) => (typeof value === 'string' ? js(value) : String(value));

const optionList = (input: SnippetInput) => input.options ?? [];

const optionsObject = (input: SnippetInput) =>
  `{ ${optionList(input)
    .map(([id, value]) => `${id}: ${jsValue(value)}`)
    .join(', ')} }`;

const hasPalette = (input: SnippetInput) => Boolean(input.palette?.length);

const paletteArray = (input: SnippetInput) => `[${(input.palette ?? []).map(js).join(', ')}]`;

/** `id: value; id: value`, the attribute form both HTML snippets use. */
const optionsAttribute = (input: SnippetInput) =>
  optionList(input)
    .map(([id, value]) => `${id}: ${value}`)
    .join('; ');

const cssRatio = (input: SnippetInput) => `${input.ratio[0]} / ${input.ratio[1]}`;

const ratioLabel = (input: SnippetInput) => input.ratioLabel ?? `${input.ratio[0]}:${input.ratio[1]}`;

const ground = (input: SnippetInput) => input.ground ?? input.palette?.[0];

const hasDensity = (input: SnippetInput) => input.density != null;

const componentName = (slug: string) => `${slug.charAt(0).toUpperCase()}${slug.slice(1)}Pattern`;

/** The sentence every snippet opens its comment with. */
const sized = (input: SnippetInput) =>
  `As wide as its parent, at the ${ratioLabel(input)} ratio it was designed at.`;

// ---- the snippets ----------------------------------------------------------

function react(input: SnippetInput): string {
  return [
    `import { TabbiedPattern } from 'tabbied/react';`,
    `import { ${input.slug} } from 'tabbied/patterns';`,
    ``,
    `// ${sized(input)}`,
    `// Add maxWidth to bound it, or swap aspectRatio for a fixed height.`,
    `export function ${componentName(input.slug)}() {`,
    `  return (`,
    `    <TabbiedPattern`,
    `      pattern={${input.slug}}`,
    ...(input.seed != null ? [`      seed="${attr(input.seed)}"`] : []),
    `      aspectRatio="${cssRatio(input)}"`,
    ...(hasDensity(input) ? [`      density={${input.density}}`] : []),
    ...(hasPalette(input) ? [`      palette={${paletteArray(input)}}`] : []),
    ...(optionList(input).length ? [`      options={${optionsObject(input)}}`] : []),
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
    `  <!-- ${sized(input)}`,
    `       Add max-width to bound it, or swap aspect-ratio for a fixed height. -->`,
    `  <TabbiedPattern`,
    `    :pattern="${input.slug}"`,
    ...(input.seed != null ? [`    seed="${attr(input.seed)}"`] : []),
    `    aspect-ratio="${cssRatio(input)}"`,
    ...(hasDensity(input) ? [`    :density="${input.density}"`] : []),
    ...(hasPalette(input) ? [`    :palette="${attr(paletteArray(input))}"`] : []),
    ...(optionList(input).length ? [`    :options="${attr(optionsObject(input))}"`] : []),
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
    `  // ${sized(input)}`,
    `  // Add maxWidth to bound it, or swap aspectRatio for a fixed height.`,
    `  const props = {`,
    `    pattern: ${input.slug},`,
    ...(input.seed != null ? [`    seed: ${js(input.seed)},`] : []),
    `    aspectRatio: ${js(cssRatio(input))},`,
    ...(hasDensity(input) ? [`    density: ${input.density},`] : []),
    ...(hasPalette(input) ? [`    palette: ${paletteArray(input)},`] : []),
    ...(optionList(input).length ? [`    options: ${optionsObject(input)},`] : []),
    `  };`,
    `</script>`,
    ``,
    `<!-- Server rendered at its final size; the action draws into it. -->`,
    `<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
  ].join('\n');
}

/** The inline style both markup snippets size their box with. */
const boxStyle = (input: SnippetInput, base: string) => {
  const color = ground(input);
  return `${base}; aspect-ratio: ${cssRatio(input)}${color ? `; background: ${attr(color)}` : ''}`;
};

function element(input: SnippetInput): string {
  const options = optionsAttribute(input);

  return [
    `<!-- ${sized(input)}`,
    `     The inline style sizes the box before the script loads, so nothing shifts. -->`,
    `<tabbied-pattern`,
    `  pattern="${input.slug}"`,
    ...(input.seed != null ? [`  seed="${attr(input.seed)}"`] : []),
    ...(hasDensity(input) ? [`  density="${input.density}"`] : []),
    ...(hasPalette(input) ? [`  palette="${attr((input.palette ?? []).join(', '))}"`] : []),
    ...(options ? [`  options="${attr(options)}"`] : []),
    `  style="${boxStyle(input, 'display: block')}"`,
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
    `<!-- ${sized(input)}`,
    `     The inline style sizes the box before the script loads, so nothing shifts. -->`,
    `<div data-pattern="${input.slug}"`,
    ...(input.seed != null ? [`     data-seed="${attr(input.seed)}"`] : []),
    ...(hasDensity(input) ? [`     data-density="${input.density}"`] : []),
    ...(hasPalette(input) ? [`     data-palette="${attr((input.palette ?? []).join(', '))}"`] : []),
    ...(options ? [`     data-options="${attr(options)}"`] : []),
    `     style="${boxStyle(input, 'width: 100%')}"></div>`,
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

// The framework-free controller every other setup is built on. The host is
// the caller's to size; resolveBoxStyle() turns the same box props the
// components take into CSS for it.
function core(input: SnippetInput): string {
  return [
    `import { createPattern, resolveBoxStyle } from 'tabbied';`,
    `import { ${input.slug} } from 'tabbied/patterns';`,
    ``,
    `// ${sized(input)}`,
    `// A pattern has no size of its own: size the host, or it draws nothing.`,
    `const host = document.querySelector('#pattern');`,
    `Object.assign(host.style, resolveBoxStyle({ aspectRatio: ${js(cssRatio(input))} }));`,
    ``,
    `const controller = createPattern(host, {`,
    `  pattern: ${input.slug},`,
    ...(input.seed != null ? [`  seed: ${js(input.seed)},`] : []),
    ...(hasDensity(input) ? [`  density: ${input.density},`] : []),
    ...(hasPalette(input) ? [`  palette: ${paletteArray(input)},`] : []),
    ...(optionList(input).length ? [`  options: ${optionsObject(input)},`] : []),
    `});`,
    ``,
    `// controller.update({ ... }) changes it; controller.destroy() when the host goes.`,
  ].join('\n');
}

const BUILDERS: Record<SnippetSetup, (input: SnippetInput) => string> = {
  react,
  vue,
  svelte,
  element,
  html,
  core,
};

/** The snippet for one setup. */
export function buildSnippet(setup: SnippetSetup, input: SnippetInput): string {
  return BUILDERS[setup](input);
}

/** Every setup's snippet for one design, keyed by setup. */
export function buildSnippets(input: SnippetInput): Record<SnippetSetup, string> {
  return Object.fromEntries(
    SNIPPET_SETUPS.map((setup) => [setup, BUILDERS[setup](input)])
  ) as Record<SnippetSetup, string>;
}

/**
 * `2:3` (the catalog's and the editor's name for a ratio) as [2, 3]. Anything
 * else falls back to 2:3, the ratio a design with none declared is drawn at.
 */
export function parseRatio(ratio: string | undefined): [number, number] {
  const match = /^\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)\s*$/.exec(ratio ?? '');
  return match ? [Number(match[1]), Number(match[2])] : [2, 3];
}
