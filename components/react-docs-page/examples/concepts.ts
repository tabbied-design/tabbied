// The examples on /docs/concepts: one short file per idea, in each of the six
// setups, shown under the section that explains it with a switch between the
// setups. The setup pages' guide samples (examples/guide.ts) sit under their
// live demos and show the everyday case; these show the settings the
// concepts prose names that the guide leaves out: two designs and what gets
// bundled, density, cellSize and coverRender, a two-color palette, several
// options at once, a kept seed and the exports, and pausing the timer.
//
// Each sample is a whole file, imports included. lib/docsExamples.test.mjs
// type-checks the React ones, compiles the Vue ones and parses the rest;
// e2e/docs-examples.spec.ts runs the markup ones as written.
//
// No runtime imports, so the test runs this file under Node's own TypeScript
// support.
import type { GuideSample, GuideSetup } from './guide';

export type ConceptId = 'designs' | 'sizing' | 'colors' | 'options' | 'seeds' | 'motion' | 'accessibility';

/** The setups, in the order the Developers page lists them, and the switch's labels. */
export const CONCEPT_SETUPS: { id: GuideSetup; label: string }[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'element', label: 'Web component' },
  { id: 'html', label: 'HTML' },
  { id: 'javascript', label: 'JavaScript' },
];

/** The two-color palette in the colors example: a ground and one ink. */
export const TWO_COLORS = ['#0b2545', '#eef4ed'] as const;

/** Any CSS color works, `transparent` and `oklch()` included. */
export const ANY_COLORS = ['transparent', 'oklch(0.65 0.2 25)', '#13a8a8'] as const;

const VERSION = '@VERSION@';
const SCRIPT = `<script type="module" src="https://cdn.jsdelivr.net/npm/tabbied@${VERSION}/dist/element/tabbied-element.js"></script>`;
const ESM = `https://esm.sh/tabbied@${VERSION}`;

const js = (colors: readonly string[]) => `[${colors.map((color) => `'${color}'`).join(', ')}]`;
const list = (colors: readonly string[]) => colors.join(', ');

/** The script every HTML sample ends with: the designs it names, and the controllers. */
const boot = (designs: string[], after = '') =>
  [
    '<script type="module">',
    `  import { hydratePatterns } from '${ESM}';`,
    `  import { ${designs.join(', ')} } from '${ESM}/patterns?exports=${designs.join(',')}';`,
    '',
    `  ${after ? 'const mounted = ' : ''}hydratePatterns({ patterns: { ${designs.join(', ')} } });`,
    ...(after ? ['', ...after.split('\n').map((line) => (line ? `  ${line}` : ''))] : []),
    '</script>',
  ].join('\n');

const LABEL = 'Five rings, one for each year of the studio';

export const CONCEPT_EXAMPLES: Record<ConceptId, Record<GuideSetup, GuideSample>> = {
  designs: {
    react: {
      file: 'Designs.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
// Only the designs imported here are bundled.
import { radius, windowpane } from 'tabbied/patterns';

export function Designs() {
  return (
    <>
      <TabbiedPattern pattern={radius} height={240} />
      <TabbiedPattern pattern={windowpane} height={240} />
    </>
  );
}`,
    },
    vue: {
      file: 'Designs.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
// Only the designs imported here are bundled.
import { radius, windowpane } from 'tabbied/patterns';
</script>

<template>
  <TabbiedPattern :pattern="radius" :height="240" />
  <TabbiedPattern :pattern="windowpane" :height="240" />
</template>`,
    },
    svelte: {
      file: 'Designs.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  // Only the designs imported here are bundled.
  import { radius, windowpane } from 'tabbied/patterns';

  const designs = [radius, windowpane];
</script>

{#each designs as pattern}
  {@const props = { pattern, height: 240 }}
  <div {...tabbiedAttributes(props)} use:tabbied={props}></div>
{/each}`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- From a CDN the element loads each design by its slug, the first time
     the page uses it. -->
<tabbied-pattern pattern="radius" style="display: block; height: 240px"></tabbied-pattern>
<tabbied-pattern pattern="windowpane" style="display: block; height: 240px"></tabbied-pattern>

${SCRIPT}`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<div data-pattern="radius" style="height: 240px"></div>
<div data-pattern="windowpane" style="height: 240px"></div>

<!-- The one script names every design the page uses. -->
${boot(['radius', 'windowpane'])}`,
    },
    javascript: {
      file: 'designs.js',
      lang: 'ts',
      code: `// <div id="first"></div> <div id="second"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
// Only the designs imported here are bundled.
import { radius, windowpane } from 'tabbied/patterns';

const mount = (selector, pattern) => {
  const host = document.querySelector(selector);
  Object.assign(host.style, resolveBoxStyle({ height: 240 }));
  return createPattern(host, { pattern });
};

mount('#first', radius);
mount('#second', windowpane);`,
    },
  },

  sizing: {
    react: {
      file: 'Sizing.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { vitrail } from 'tabbied/patterns';

export function Sizing() {
  return (
    <>
      {/* grid (the default): whole, nearly square cells, as fine as density
          says, from 0 to 1. The ratio gives the box a height of its own. */}
      <TabbiedPattern pattern={vitrail} density={0.75} aspectRatio="16 / 9" />
      {/* Or the cells in pixels. */}
      <TabbiedPattern pattern={vitrail} cellSize={48} height={240} />
      {/* cover: one drawing at a set resolution, scaled to cover the box. */}
      <TabbiedPattern
        pattern={vitrail}
        fit="cover"
        coverRender={{ width: 1200, height: 600 }}
        height={240}
      />
      {/* fixed: an exact canvas in pixels. */}
      <TabbiedPattern pattern={vitrail} fit="fixed" width={360} height={540} />
    </>
  );
}`,
    },
    vue: {
      file: 'Sizing.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { vitrail } from 'tabbied/patterns';
</script>

<template>
  <!-- grid (the default): whole, nearly square cells, as fine as density
       says, from 0 to 1. The ratio gives the box a height of its own. -->
  <TabbiedPattern :pattern="vitrail" :density="0.75" aspect-ratio="16 / 9" />
  <!-- Or the cells in pixels. -->
  <TabbiedPattern :pattern="vitrail" :cell-size="48" :height="240" />
  <!-- cover: one drawing at a set resolution, scaled to cover the box. -->
  <TabbiedPattern
    :pattern="vitrail"
    fit="cover"
    :cover-render="{ width: 1200, height: 600 }"
    :height="240"
  />
  <!-- fixed: an exact canvas in pixels. -->
  <TabbiedPattern :pattern="vitrail" fit="fixed" :width="360" :height="540" />
</template>`,
    },
    svelte: {
      file: 'Sizing.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { vitrail } from 'tabbied/patterns';

  // grid (the default): whole, nearly square cells, as fine as density says,
  // from 0 to 1. The ratio gives the box a height of its own.
  const fine = { pattern: vitrail, density: 0.75, aspectRatio: '16 / 9' };
  // Or the cells in pixels.
  const cells = { pattern: vitrail, cellSize: 48, height: 240 };
  // cover: one drawing at a set resolution, scaled to cover the box.
  const cover = {
    pattern: vitrail,
    fit: 'cover',
    coverRender: { width: 1200, height: 600 },
    height: 240,
  };
  // fixed: an exact canvas in pixels.
  const fixed = { pattern: vitrail, fit: 'fixed', width: 360, height: 540 };
</script>

<div {...tabbiedAttributes(fine)} use:tabbied={fine}></div>
<div {...tabbiedAttributes(cells)} use:tabbied={cells}></div>
<div {...tabbiedAttributes(cover)} use:tabbied={cover}></div>
<div {...tabbiedAttributes(fixed)} use:tabbied={fixed}></div>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- grid (the default): whole, nearly square cells, as fine as density
     says, from 0 to 1. The ratio gives the box a height of its own. -->
<tabbied-pattern pattern="vitrail" density="0.75"
  style="display: block; aspect-ratio: 16 / 9"></tabbied-pattern>
<!-- Or the cells in pixels. -->
<tabbied-pattern pattern="vitrail" cell-size="48"
  style="display: block; height: 240px"></tabbied-pattern>
<!-- cover: one drawing at a set resolution, scaled to cover the box. -->
<tabbied-pattern pattern="vitrail" fit="cover" cover-render="1200x600"
  style="display: block; height: 240px"></tabbied-pattern>
<!-- fixed: an exact canvas in pixels. -->
<tabbied-pattern pattern="vitrail" fit="fixed" width="360" height="540"></tabbied-pattern>

${SCRIPT}`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- grid (the default): whole, nearly square cells, as fine as density
     says, from 0 to 1. The ratio gives the box a height of its own. -->
<div data-pattern="vitrail" data-density="0.75" style="aspect-ratio: 16 / 9"></div>
<!-- Or the cells in pixels. -->
<div data-pattern="vitrail" data-cell-size="48" style="height: 240px"></div>
<!-- cover: one drawing at a set resolution, scaled to cover the box. -->
<div data-pattern="vitrail" data-fit="cover" data-cover-render="1200x600"
  style="height: 240px"></div>
<!-- fixed: an exact canvas in pixels. -->
<div data-pattern="vitrail" data-fit="fixed" data-width="360" data-height="540"
  style="display: inline-block"></div>

${boot(['vitrail'])}`,
    },
    javascript: {
      file: 'sizing.js',
      lang: 'ts',
      code: `// <div id="fine"></div> <div id="cells"></div> <div id="cover"></div> <div id="fixed"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { vitrail } from 'tabbied/patterns';

const host = (selector, box) => {
  const element = document.querySelector(selector);
  Object.assign(element.style, resolveBoxStyle(box));
  return element;
};

// grid (the default): whole, nearly square cells, as fine as density says,
// from 0 to 1. The ratio gives the box a height of its own.
createPattern(host('#fine', { aspectRatio: '16 / 9' }), { pattern: vitrail, density: 0.75 });
// Or the cells in pixels.
createPattern(host('#cells', { height: 240 }), { pattern: vitrail, cellSize: 48 });
// cover: one drawing at a set resolution, scaled to cover the box.
createPattern(host('#cover', { height: 240 }), {
  pattern: vitrail,
  fit: 'cover',
  coverRender: { width: 1200, height: 600 },
});
// fixed: an exact canvas in pixels.
createPattern(host('#fixed', { width: 360, height: 540 }), {
  pattern: vitrail,
  fit: 'fixed',
  width: 360,
  height: 540,
});`,
    },
  },

  colors: {
    react: {
      file: 'Colors.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { mixtape } from 'tabbied/patterns';

export function Colors() {
  return (
    <>
      {/* No palette: the design's own colors. */}
      <TabbiedPattern pattern={mixtape} seed="k9Pz" height={180} />
      {/* The background first, then the inks. Two colors draw it all in two. */}
      <TabbiedPattern pattern={mixtape} seed="k9Pz" palette={${js(TWO_COLORS)}} height={180} />
      {/* Any CSS color. A transparent background shows what is behind. */}
      <TabbiedPattern
        pattern={mixtape}
        seed="k9Pz"
        palette={${js(ANY_COLORS)}}
        height={180}
      />
    </>
  );
}`,
    },
    vue: {
      file: 'Colors.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { mixtape } from 'tabbied/patterns';

// The background first, then the inks. Two colors draw it all in two.
const two = ${js(TWO_COLORS)};
// Any CSS color. A transparent background shows what is behind.
const overlay = ${js(ANY_COLORS)};
</script>

<template>
  <!-- No palette: the design's own colors. -->
  <TabbiedPattern :pattern="mixtape" seed="k9Pz" :height="180" />
  <TabbiedPattern :pattern="mixtape" seed="k9Pz" :palette="two" :height="180" />
  <TabbiedPattern :pattern="mixtape" seed="k9Pz" :palette="overlay" :height="180" />
</template>`,
    },
    svelte: {
      file: 'Colors.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { mixtape } from 'tabbied/patterns';

  // No palette: the design's own colors.
  const own = { pattern: mixtape, seed: 'k9Pz', height: 180 };
  // The background first, then the inks. Two colors draw it all in two.
  const two = { ...own, palette: ${js(TWO_COLORS)} };
  // Any CSS color. A transparent background shows what is behind.
  const overlay = { ...own, palette: ${js(ANY_COLORS)} };
</script>

<div {...tabbiedAttributes(own)} use:tabbied={own}></div>
<div {...tabbiedAttributes(two)} use:tabbied={two}></div>
<div {...tabbiedAttributes(overlay)} use:tabbied={overlay}></div>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- No palette: the design's own colors. -->
<tabbied-pattern pattern="mixtape" seed="k9Pz" style="display: block; height: 180px"></tabbied-pattern>
<!-- The background first, then the inks. Two colors draw it all in two. -->
<tabbied-pattern pattern="mixtape" seed="k9Pz" palette="${list(TWO_COLORS)}"
  style="display: block; height: 180px"></tabbied-pattern>
<!-- Any CSS color. A transparent background shows what is behind. -->
<tabbied-pattern pattern="mixtape" seed="k9Pz" palette="${list(ANY_COLORS)}"
  style="display: block; height: 180px"></tabbied-pattern>

${SCRIPT}`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- No palette: the design's own colors. -->
<div data-pattern="mixtape" data-seed="k9Pz" style="height: 180px"></div>
<!-- The background first, then the inks. Two colors draw it all in two. -->
<div data-pattern="mixtape" data-seed="k9Pz" data-palette="${list(TWO_COLORS)}" style="height: 180px"></div>
<!-- Any CSS color. A transparent background shows what is behind. -->
<div data-pattern="mixtape" data-seed="k9Pz" data-palette="${list(ANY_COLORS)}"
  style="height: 180px"></div>

${boot(['mixtape'])}`,
    },
    javascript: {
      file: 'colors.js',
      lang: 'ts',
      code: `// <div id="own"></div> <div id="two"></div> <div id="overlay"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { mixtape } from 'tabbied/patterns';

const mount = (selector, palette) => {
  const host = document.querySelector(selector);
  Object.assign(host.style, resolveBoxStyle({ height: 180 }));
  return createPattern(host, { pattern: mixtape, seed: 'k9Pz', palette });
};

// No palette: the design's own colors.
mount('#own');
// The background first, then the inks. Two colors draw it all in two.
mount('#two', ${js(TWO_COLORS)});
// Any CSS color. A transparent background shows what is behind.
mount('#overlay', ${js(ANY_COLORS)});`,
    },
  },

  options: {
    react: {
      file: 'Maze.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { maze } from 'tabbied/patterns';

// Options are set by id. maze has three: grid, frequency (0.2 to 1) and
// thickness (4 to 14). Any left out keep the design's default, and under
// the grid fit the grid is worked out from the box.
export function Maze() {
  return (
    <TabbiedPattern
      pattern={maze}
      options={{ frequency: 0.6, thickness: 14 }}
      height={240}
    />
  );
}`,
    },
    vue: {
      file: 'Maze.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { maze } from 'tabbied/patterns';
</script>

<template>
  <!-- Options are set by id. maze has three: grid, frequency (0.2 to 1) and
       thickness (4 to 14). Any left out keep the design's default, and under
       the grid fit the grid is worked out from the box. -->
  <TabbiedPattern
    :pattern="maze"
    :options="{ frequency: 0.6, thickness: 14 }"
    :height="240"
  />
</template>`,
    },
    svelte: {
      file: 'Maze.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { maze } from 'tabbied/patterns';

  // Options are set by id. maze has three: grid, frequency (0.2 to 1) and
  // thickness (4 to 14). Any left out keep the design's default, and under
  // the grid fit the grid is worked out from the box.
  const props = { pattern: maze, options: { frequency: 0.6, thickness: 14 }, height: 240 };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Options are set by id, separated by semicolons. maze has three: grid,
     frequency (0.2 to 1) and thickness (4 to 14). Any left out keep the
     design's default, and under the grid fit the grid is worked out from
     the box. -->
<tabbied-pattern pattern="maze" options="frequency: 0.6; thickness: 14"
  style="display: block; height: 240px"></tabbied-pattern>

${SCRIPT}`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Options are set by id, separated by semicolons. maze has three: grid,
     frequency (0.2 to 1) and thickness (4 to 14). Any left out keep the
     design's default, and under the grid fit the grid is worked out from
     the box. -->
<div data-pattern="maze" data-options="frequency: 0.6; thickness: 14" style="height: 240px"></div>

${boot(['maze'])}`,
    },
    javascript: {
      file: 'maze.js',
      lang: 'ts',
      code: `// <div id="maze"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { maze } from 'tabbied/patterns';

const host = document.querySelector('#maze');
Object.assign(host.style, resolveBoxStyle({ height: 240 }));

// Options are set by id, and each design lists its own with their ranges:
// maze.options is grid, frequency (0.2 to 1) and thickness (4 to 14). Any
// left out keep the design's default, and under the grid fit the grid is
// worked out from the box.
createPattern(host, { pattern: maze, options: { frequency: 0.6, thickness: 14 } });`,
    },
  },

  seeds: {
    react: {
      file: 'Keepsake.tsx',
      lang: 'tsx',
      code: `import { useRef } from 'react';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { blossom } from 'tabbied/patterns';

export function Keepsake() {
  const art = useRef<TabbiedPatternHandle>(null);

  return (
    <>
      {/* The same design, seed and options draw the same picture at any size. */}
      <TabbiedPattern ref={art} pattern={blossom} seed="k9Pz" height={280} />
      <button onClick={() => art.current?.redraw()}>New seed</button>
      <button onClick={() => art.current?.redraw('k9Pz')}>Back to k9Pz</button>
      <button onClick={() => art.current?.exportImage({ scale: 4, download: true })}>
        PNG for print
      </button>
      <button onClick={() => art.current?.exportSvg({ download: true })}>SVG</button>
    </>
  );
}`,
    },
    vue: {
      file: 'Keepsake.vue',
      lang: 'vue',
      code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { blossom } from 'tabbied/patterns';

const art = ref(null);
</script>

<template>
  <!-- The same design, seed and options draw the same picture at any size. -->
  <TabbiedPattern ref="art" :pattern="blossom" seed="k9Pz" :height="280" />
  <button @click="art?.redraw()">New seed</button>
  <button @click="art?.redraw('k9Pz')">Back to k9Pz</button>
  <button @click="art?.exportImage({ scale: 4, download: true })">PNG for print</button>
  <button @click="art?.exportSvg({ download: true })">SVG</button>
</template>`,
    },
    svelte: {
      file: 'Keepsake.svelte',
      lang: 'svelte',
      code: `<script>
  import { patternController, tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { blossom } from 'tabbied/patterns';

  // The same design, seed and options draw the same picture at any size.
  const props = { pattern: blossom, seed: 'k9Pz', height: 280 };
  let host = $state();
  const art = () => patternController(host);
</script>

<div bind:this={host} {...tabbiedAttributes(props)} use:tabbied={props}></div>
<button onclick={() => art()?.redraw()}>New seed</button>
<button onclick={() => art()?.redraw('k9Pz')}>Back to k9Pz</button>
<button onclick={() => art()?.exportImage({ scale: 4, download: true })}>PNG for print</button>
<button onclick={() => art()?.exportSvg({ download: true })}>SVG</button>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- The same design, seed and options draw the same picture at any size. -->
<tabbied-pattern id="art" pattern="blossom" seed="k9Pz"
  style="display: block; height: 280px"></tabbied-pattern>
<button id="shuffle">New seed</button>
<button id="back">Back to k9Pz</button>
<button id="png">PNG for print</button>
<button id="svg">SVG</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');
  const on = (id, run) => document.querySelector(id).addEventListener('click', run);

  on('#shuffle', () => art.redraw());
  on('#back', () => art.redraw('k9Pz'));
  on('#png', () => art.exportImage({ scale: 4, download: true }));
  on('#svg', () => art.exportSvg({ download: true }));
</script>`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- The same design, seed and options draw the same picture at any size. -->
<div id="art" data-pattern="blossom" data-seed="k9Pz" style="height: 280px"></div>
<button id="shuffle">New seed</button>
<button id="back">Back to k9Pz</button>
<button id="png">PNG for print</button>
<button id="svg">SVG</button>

${boot(
  ['blossom'],
  `const art = mounted.find(({ element }) => element.id === 'art').controller;
const on = (id, run) => document.querySelector(id).addEventListener('click', run);

on('#shuffle', () => art.redraw());
on('#back', () => art.redraw('k9Pz'));
on('#png', () => art.exportImage({ scale: 4, download: true }));
on('#svg', () => art.exportSvg({ download: true }));`
)}`,
    },
    javascript: {
      file: 'keepsake.js',
      lang: 'ts',
      code: `// <div id="art"></div>
// <button id="shuffle">New seed</button> <button id="back">Back to k9Pz</button>
// <button id="png">PNG for print</button> <button id="svg">SVG</button>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { blossom } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ height: 280 }));

// The same design, seed and options draw the same picture at any size.
const art = createPattern(host, { pattern: blossom, seed: 'k9Pz' });
const on = (id, run) => document.querySelector(id).addEventListener('click', run);

on('#shuffle', () => art.redraw());
on('#back', () => art.redraw('k9Pz'));
on('#png', () => art.exportImage({ scale: 4, download: true }));
on('#svg', () => art.exportSvg({ download: true }));`,
    },
  },

  motion: {
    react: {
      file: 'Shimmer.tsx',
      lang: 'tsx',
      code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { quilt } from 'tabbied/patterns';

// A new seed every 3 seconds, skipped while the tab is hidden or the box is
// off screen. Under prefers-reduced-motion the timer never starts.
export function Shimmer() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <TabbiedPattern pattern={quilt} redrawInterval={3000} paused={paused} height={280} />
      {/* Pausing holds the timer without losing its place. */}
      <button onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
    </>
  );
}`,
    },
    vue: {
      file: 'Shimmer.vue',
      lang: 'vue',
      code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { quilt } from 'tabbied/patterns';

const paused = ref(false);
</script>

<template>
  <!-- A new seed every 3 seconds, skipped while the tab is hidden or the box
       is off screen. Under prefers-reduced-motion the timer never starts. -->
  <TabbiedPattern :pattern="quilt" :redraw-interval="3000" :paused="paused" :height="280" />
  <!-- Pausing holds the timer without losing its place. -->
  <button @click="paused = !paused">{{ paused ? 'Play' : 'Pause' }}</button>
</template>`,
    },
    svelte: {
      file: 'Shimmer.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { quilt } from 'tabbied/patterns';

  // A new seed every 3 seconds, skipped while the tab is hidden or the box is
  // off screen. Under prefers-reduced-motion the timer never starts.
  let paused = $state(false);
  const props = $derived({ pattern: quilt, redrawInterval: 3000, paused, height: 280 });
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>
<!-- Pausing holds the timer without losing its place. -->
<button onclick={() => (paused = !paused)}>{paused ? 'Play' : 'Pause'}</button>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A new seed every 3 seconds, skipped while the tab is hidden or the box
     is off screen. Under prefers-reduced-motion the timer never starts. -->
<tabbied-pattern id="art" pattern="quilt" redraw-interval="3000"
  style="display: block; height: 280px"></tabbied-pattern>
<button id="pause">Pause</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');
  const button = document.querySelector('#pause');

  // Pausing holds the timer without losing its place.
  button.addEventListener('click', () => {
    const paused = art.toggleAttribute('paused');
    button.textContent = paused ? 'Play' : 'Pause';
  });
</script>`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A new seed every 3 seconds, skipped while the tab is hidden or the box
     is off screen. Under prefers-reduced-motion the timer never starts. -->
<div id="art" data-pattern="quilt" data-redraw-interval="3000" style="height: 280px"></div>
<button id="pause">Pause</button>

${boot(
  ['quilt'],
  `const art = mounted.find(({ element }) => element.id === 'art').controller;
const button = document.querySelector('#pause');
let paused = false;

// Pausing holds the timer without losing its place.
button.addEventListener('click', () => {
  paused = !paused;
  art.update({ paused });
  button.textContent = paused ? 'Play' : 'Pause';
});`
)}`,
    },
    javascript: {
      file: 'shimmer.js',
      lang: 'ts',
      code: `// <div id="art"></div> <button id="pause">Pause</button>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { quilt } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ height: 280 }));

// A new seed every 3 seconds, skipped while the tab is hidden or the box is
// off screen. Under prefers-reduced-motion the timer never starts.
const art = createPattern(host, { pattern: quilt, redrawInterval: 3000 });

const button = document.querySelector('#pause');
let paused = false;

// Pausing holds the timer without losing its place.
button.addEventListener('click', () => {
  paused = !paused;
  art.update({ paused });
  button.textContent = paused ? 'Play' : 'Pause';
});`,
    },
  },

  accessibility: {
    react: {
      file: 'Rings.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { ring } from 'tabbied/patterns';

export function Rings() {
  return (
    <>
      {/* Decorative, the default: hidden from screen readers. */}
      <TabbiedPattern pattern={ring} height={180} />
      {/* It carries meaning: an image with this label. */}
      <TabbiedPattern
        pattern={ring}
        height={180}
        decorative={false}
        ariaLabel="${LABEL}"
      />
    </>
  );
}`,
    },
    vue: {
      file: 'Rings.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { ring } from 'tabbied/patterns';
</script>

<template>
  <!-- Decorative, the default: hidden from screen readers. -->
  <TabbiedPattern :pattern="ring" :height="180" />
  <!-- It carries meaning: an image with this label. -->
  <TabbiedPattern
    :pattern="ring"
    :height="180"
    :decorative="false"
    aria-label="${LABEL}"
  />
</template>`,
    },
    svelte: {
      file: 'Rings.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { ring } from 'tabbied/patterns';

  // Decorative, the default: hidden from screen readers.
  const decorative = { pattern: ring, height: 180 };
  // It carries meaning: an image with this label.
  const labelled = {
    pattern: ring,
    height: 180,
    decorative: false,
    ariaLabel: '${LABEL}',
  };
</script>

<div {...tabbiedAttributes(decorative)} use:tabbied={decorative}></div>
<div {...tabbiedAttributes(labelled)} use:tabbied={labelled}></div>`,
    },
    element: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Decorative, the default: hidden from screen readers. -->
<tabbied-pattern pattern="ring" style="display: block; height: 180px"></tabbied-pattern>
<!-- It carries meaning: an aria-label makes it an image with that label. -->
<tabbied-pattern pattern="ring" aria-label="${LABEL}"
  style="display: block; height: 180px"></tabbied-pattern>

${SCRIPT}`,
    },
    html: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- The markup is yours, so the attributes are too. -->
<!-- Decorative: hidden from screen readers. -->
<div data-pattern="ring" aria-hidden="true" style="height: 180px"></div>
<!-- It carries meaning: an image with this label. -->
<div data-pattern="ring" role="img" aria-label="${LABEL}" style="height: 180px"></div>

${boot(['ring'])}`,
    },
    javascript: {
      file: 'rings.js',
      lang: 'ts',
      code: `// <div id="decoration"></div> <div id="figure"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { ring } from 'tabbied/patterns';

const decoration = document.querySelector('#decoration');
const figure = document.querySelector('#figure');
for (const host of [decoration, figure]) Object.assign(host.style, resolveBoxStyle({ height: 180 }));

// The core leaves the host as you wrote it, so say what it is.
// Decorative: hidden from screen readers.
decoration.setAttribute('aria-hidden', 'true');
// It carries meaning: an image with this label.
figure.setAttribute('role', 'img');
figure.setAttribute('aria-label', '${LABEL}');

createPattern(decoration, { pattern: ring });
createPattern(figure, { pattern: ring });`,
    },
  },
};
