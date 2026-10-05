// The code under each live demo the six setup pages share
// (components/react-docs-page/GuideDemos.tsx): the quick start, the fit
// modes, palettes, a transparent ground, options, redraw and export, motion
// and accessibility. Every page draws the same live demo, since every setup
// draws the same pattern from the same settings, and shows the file that
// draws it in its own spelling, so the pages follow one structure and differ
// only where the setups do.
//
// Each sample is a whole file, imports included. lib/docsExamples.test.mjs
// type-checks the React ones, compiles the Vue ones and parses the rest, and
// checks the palettes against lib/paletteLibrary.ts.
//
// No imports, so the test runs this file under Node's own TypeScript support.

export type GuideSetup = 'react' | 'vue' | 'svelte' | 'javascript' | 'element' | 'html';

export type GuidePart = 'quickStart' | 'fit' | 'palette' | 'transparent' | 'options' | 'redraw' | 'motion' | 'a11y';

export type GuideSample = { code: string; lang: 'tsx' | 'vue' | 'svelte' | 'ts' | 'html'; file: string };

/** The library palettes the demos draw in (lib/paletteLibrary.ts), by id. */
export const GUIDE_PALETTES = {
  'lib-sunset': ['#2b1d3a', '#ff6b6b', '#ffd23e', '#ff3d8b', '#7048e8'],
  'lib-ocean': ['#0b2545', '#8da9c4', '#eef4ed', '#13a8a8'],
  'lib-bauhaus': ['#f4f1ea', '#d7263d', '#1b6ca8', '#f7b32b', '#232529'],
  'lib-candy': ['#fff0f6', '#ff3d8b', '#7048e8', '#3eecff', '#ffd23e'],
} as const;

/** One design at one seed in three palettes: only the palette changes. */
export const PALETTE_DEMOS = [
  { name: 'Sunset', variable: 'sunset', colors: GUIDE_PALETTES['lib-sunset'] },
  { name: 'Ocean', variable: 'ocean', colors: GUIDE_PALETTES['lib-ocean'] },
  { name: 'Bauhaus', variable: 'bauhaus', colors: GUIDE_PALETTES['lib-bauhaus'] },
] as const;

/** The same maze, thin and then heavy: only the option changes. */
export const OPTION_DEMOS = [4, 14] as const;

/** The transparent demo's palette: no ground, two inks. */
export const TRANSPARENT_PALETTE = ['transparent', '#232529', '#ff3d8b'] as const;

export const REDRAW_PALETTE = GUIDE_PALETTES['lib-candy'];

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

const A11Y_LABEL = 'Generative pattern of rings';

export const GUIDE: Record<GuideSetup, Record<GuidePart, GuideSample>> = {
  react: {
    quickStart: {
      file: 'Banner.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Banner() {
  // The box fills its parent by default; height={320} pins one axis.
  return <TabbiedPattern pattern={radius} seed="k9Pz" height={320} />;
}`,
    },
    fit: {
      file: 'FitModes.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { vitrail } from 'tabbied/patterns';

export function FitModes() {
  return (
    <>
      {/* grid (default): the cell grid adapts to the box. */}
      <TabbiedPattern pattern={vitrail} fit="grid" height={240} />
      {/* cover: one render, scaled uniformly to fill the box. */}
      <TabbiedPattern pattern={vitrail} fit="cover" height={240} />
      {/* fixed: a canvas of an exact size, what the editor uses. */}
      <TabbiedPattern pattern={vitrail} fit="fixed" width={360} height={540} />
    </>
  );
}`,
    },
    palette: {
      file: 'Palettes.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { mixtape } from 'tabbied/patterns';

// The background (color 0) comes first, then the inks.
${PALETTE_DEMOS.map(({ variable, colors }) => `const ${variable} = ${js(colors)};`).join('\n')}

export function Palettes() {
  return (
    <>
${PALETTE_DEMOS.map(({ variable }) => `      <TabbiedPattern pattern={mixtape} seed="k9Pz" palette={${variable}} height={180} />`).join('\n')}
    </>
  );
}`,
    },
    transparent: {
      file: 'Overlay.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

// Any CSS color works for a slot, 'transparent' included: the ground drops
// out and whatever is behind the box shows through.
export function Overlay() {
  return <TabbiedPattern pattern={radius} palette={${js(TRANSPARENT_PALETTE)}} height={240} />;
}`,
    },
    options: {
      file: 'Mazes.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { maze } from 'tabbied/patterns';

// Option ids come from the design: maze takes a grid, a frequency and a thickness.
export function Mazes() {
  return (
    <>
${OPTION_DEMOS.map((thickness) => `      <TabbiedPattern pattern={maze} seed="k9Pz" options={{ thickness: ${thickness} }} height={180} />`).join('\n')}
    </>
  );
}`,
    },
    redraw: {
      file: 'Reseedable.tsx',
      lang: 'tsx',
      code: `import { useRef } from 'react';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { blossom } from 'tabbied/patterns';

const candy = ${js(REDRAW_PALETTE)};

export function Reseedable() {
  const ref = useRef<TabbiedPatternHandle>(null);

  return (
    <>
      <TabbiedPattern ref={ref} pattern={blossom} palette={candy} fit="cover" height={280} />
      <button onClick={() => ref.current?.redraw()}>Redraw</button>
      <button onClick={() => ref.current?.exportImage()}>Export PNG</button>
    </>
  );
}`,
    },
    motion: {
      file: 'Shimmer.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { quilt } from 'tabbied/patterns';

// A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
// the box is off screen; under prefers-reduced-motion the timer never starts.
export function Shimmer() {
  return <TabbiedPattern pattern={quilt} fit="cover" redrawInterval={2000} height={280} />;
}`,
    },
    a11y: {
      file: 'Rings.tsx',
      lang: 'tsx',
      code: `import { TabbiedPattern } from 'tabbied/react';
import { ring } from 'tabbied/patterns';

export function Rings() {
  return (
    <>
      {/* Decorative, the default: hidden from assistive technology. */}
      <TabbiedPattern pattern={ring} height={180} />
      {/* Content: an image with role="img" and a label. */}
      <TabbiedPattern pattern={ring} height={180} decorative={false} ariaLabel="${A11Y_LABEL}" />
    </>
  );
}`,
    },
  },

  vue: {
    quickStart: {
      file: 'Banner.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <!-- The box fills its parent by default; :height="320" pins one axis. -->
  <TabbiedPattern :pattern="radius" seed="k9Pz" :height="320" />
</template>`,
    },
    fit: {
      file: 'FitModes.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { vitrail } from 'tabbied/patterns';
</script>

<template>
  <!-- grid (default): the cell grid adapts to the box. -->
  <TabbiedPattern :pattern="vitrail" fit="grid" :height="240" />
  <!-- cover: one render, scaled uniformly to fill the box. -->
  <TabbiedPattern :pattern="vitrail" fit="cover" :height="240" />
  <!-- fixed: a canvas of an exact size, what the editor uses. -->
  <TabbiedPattern :pattern="vitrail" fit="fixed" :width="360" :height="540" />
</template>`,
    },
    palette: {
      file: 'Palettes.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { mixtape } from 'tabbied/patterns';

// The background (color 0) comes first, then the inks.
${PALETTE_DEMOS.map(({ variable, colors }) => `const ${variable} = ${js(colors)};`).join('\n')}
</script>

<template>
${PALETTE_DEMOS.map(({ variable }) => `  <TabbiedPattern :pattern="mixtape" seed="k9Pz" :palette="${variable}" :height="180" />`).join('\n')}
</template>`,
    },
    transparent: {
      file: 'Overlay.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

// Any CSS color works for a slot, 'transparent' included: the ground drops
// out and whatever is behind the box shows through.
const palette = ${js(TRANSPARENT_PALETTE)};
</script>

<template>
  <TabbiedPattern :pattern="radius" :palette="palette" :height="240" />
</template>`,
    },
    options: {
      file: 'Mazes.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { maze } from 'tabbied/patterns';
</script>

<template>
  <!-- Option ids come from the design: maze takes a grid, a frequency and a thickness. -->
${OPTION_DEMOS.map((thickness) => `  <TabbiedPattern :pattern="maze" seed="k9Pz" :options="{ thickness: ${thickness} }" :height="180" />`).join('\n')}
</template>`,
    },
    redraw: {
      file: 'Reseedable.vue',
      lang: 'vue',
      code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { blossom } from 'tabbied/patterns';

const candy = ${js(REDRAW_PALETTE)};
const art = ref(null);
</script>

<template>
  <TabbiedPattern ref="art" :pattern="blossom" :palette="candy" fit="cover" :height="280" />
  <button @click="art?.redraw()">Redraw</button>
  <button @click="art?.exportImage()">Export PNG</button>
</template>`,
    },
    motion: {
      file: 'Shimmer.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { quilt } from 'tabbied/patterns';
</script>

<template>
  <!-- A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
       the box is off screen; under prefers-reduced-motion the timer never starts. -->
  <TabbiedPattern :pattern="quilt" fit="cover" :redraw-interval="2000" :height="280" />
</template>`,
    },
    a11y: {
      file: 'Rings.vue',
      lang: 'vue',
      code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { ring } from 'tabbied/patterns';
</script>

<template>
  <!-- Decorative, the default: hidden from assistive technology. -->
  <TabbiedPattern :pattern="ring" :height="180" />
  <!-- Content: an image with role="img" and a label. -->
  <TabbiedPattern :pattern="ring" :height="180" :decorative="false" aria-label="${A11Y_LABEL}" />
</template>`,
    },
  },

  svelte: {
    quickStart: {
      file: 'Banner.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  // The box fills its parent by default; height: 320 pins one axis.
  const props = { pattern: radius, seed: 'k9Pz', height: 320 };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
    },
    fit: {
      file: 'FitModes.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { vitrail } from 'tabbied/patterns';

  // grid (default): the cell grid adapts to the box.
  const grid = { pattern: vitrail, fit: 'grid', height: 240 };
  // cover: one render, scaled uniformly to fill the box.
  const cover = { pattern: vitrail, fit: 'cover', height: 240 };
  // fixed: a canvas of an exact size, what the editor uses.
  const fixed = { pattern: vitrail, fit: 'fixed', width: 360, height: 540 };
</script>

<div {...tabbiedAttributes(grid)} use:tabbied={grid}></div>
<div {...tabbiedAttributes(cover)} use:tabbied={cover}></div>
<div {...tabbiedAttributes(fixed)} use:tabbied={fixed}></div>`,
    },
    palette: {
      file: 'Palettes.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { mixtape } from 'tabbied/patterns';

  // The background (color 0) comes first, then the inks.
  const palettes = [
${PALETTE_DEMOS.map(({ colors }) => `    ${js(colors)},`).join('\n')}
  ];
</script>

{#each palettes as palette}
  {@const props = { pattern: mixtape, seed: 'k9Pz', palette, height: 180 }}
  <div {...tabbiedAttributes(props)} use:tabbied={props}></div>
{/each}`,
    },
    transparent: {
      file: 'Overlay.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  // Any CSS color works for a slot, 'transparent' included: the ground drops
  // out and whatever is behind the box shows through.
  const props = { pattern: radius, palette: ${js(TRANSPARENT_PALETTE)}, height: 240 };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
    },
    options: {
      file: 'Mazes.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { maze } from 'tabbied/patterns';

  // Option ids come from the design: maze takes a grid, a frequency and a thickness.
  const thicknesses = [${OPTION_DEMOS.join(', ')}];
</script>

{#each thicknesses as thickness}
  {@const props = { pattern: maze, seed: 'k9Pz', options: { thickness }, height: 180 }}
  <div {...tabbiedAttributes(props)} use:tabbied={props}></div>
{/each}`,
    },
    redraw: {
      file: 'Reseedable.svelte',
      lang: 'svelte',
      code: `<script>
  import { patternController, tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { blossom } from 'tabbied/patterns';

  const props = { pattern: blossom, palette: ${js(REDRAW_PALETTE)}, fit: 'cover', height: 280 };
  let host = $state();
</script>

<div bind:this={host} {...tabbiedAttributes(props)} use:tabbied={props}></div>
<button onclick={() => patternController(host)?.redraw()}>Redraw</button>
<button onclick={() => patternController(host)?.exportImage()}>Export PNG</button>`,
    },
    motion: {
      file: 'Shimmer.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { quilt } from 'tabbied/patterns';

  // A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
  // the box is off screen; under prefers-reduced-motion the timer never starts.
  const props = { pattern: quilt, fit: 'cover', redrawInterval: 2000, height: 280 };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`,
    },
    a11y: {
      file: 'Rings.svelte',
      lang: 'svelte',
      code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { ring } from 'tabbied/patterns';

  // Decorative, the default: hidden from assistive technology.
  const decorative = { pattern: ring, height: 180 };
  // Content: an image with role="img" and a label.
  const labelled = { pattern: ring, height: 180, decorative: false, ariaLabel: '${A11Y_LABEL}' };
</script>

<div {...tabbiedAttributes(decorative)} use:tabbied={decorative}></div>
<div {...tabbiedAttributes(labelled)} use:tabbied={labelled}></div>`,
    },
  },

  javascript: {
    quickStart: {
      file: 'banner.js',
      lang: 'ts',
      code: `// <div id="banner"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#banner');
// The box fills its parent by default; height: 320 pins one axis.
Object.assign(host.style, resolveBoxStyle({ height: 320 }));

const controller = createPattern(host, { pattern: radius, seed: 'k9Pz' });`,
    },
    fit: {
      file: 'fit-modes.js',
      lang: 'ts',
      code: `// <div id="grid"></div> <div id="cover"></div> <div id="fixed"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { vitrail } from 'tabbied/patterns';

const host = (id, box) => {
  const element = document.querySelector(id);
  Object.assign(element.style, resolveBoxStyle(box));
  return element;
};

// grid (default): the cell grid adapts to the box.
createPattern(host('#grid', { height: 240 }), { pattern: vitrail, fit: 'grid' });
// cover: one render, scaled uniformly to fill the box.
createPattern(host('#cover', { height: 240 }), { pattern: vitrail, fit: 'cover' });
// fixed: a canvas of an exact size, what the editor uses.
createPattern(host('#fixed', { width: 360, height: 540 }), {
  pattern: vitrail,
  fit: 'fixed',
  width: 360,
  height: 540,
});`,
    },
    palette: {
      file: 'palettes.js',
      lang: 'ts',
      code: `// <div class="swatch"></div> <div class="swatch"></div> <div class="swatch"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { mixtape } from 'tabbied/patterns';

// The background (color 0) comes first, then the inks.
const palettes = [
${PALETTE_DEMOS.map(({ colors }) => `  ${js(colors)},`).join('\n')}
];

document.querySelectorAll('.swatch').forEach((host, i) => {
  Object.assign(host.style, resolveBoxStyle({ height: 180 }));
  createPattern(host, { pattern: mixtape, seed: 'k9Pz', palette: palettes[i] });
});`,
    },
    transparent: {
      file: 'overlay.js',
      lang: 'ts',
      code: `// <div id="overlay"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#overlay');
Object.assign(host.style, resolveBoxStyle({ height: 240 }));

// Any CSS color works for a slot, 'transparent' included: the ground drops
// out and whatever is behind the box shows through.
createPattern(host, { pattern: radius, palette: ${js(TRANSPARENT_PALETTE)} });`,
    },
    options: {
      file: 'mazes.js',
      lang: 'ts',
      code: `// <div class="maze"></div> <div class="maze"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { maze } from 'tabbied/patterns';

// Option ids come from the design: maze takes a grid, a frequency and a thickness.
const thicknesses = [${OPTION_DEMOS.join(', ')}];

document.querySelectorAll('.maze').forEach((host, i) => {
  Object.assign(host.style, resolveBoxStyle({ height: 180 }));
  createPattern(host, { pattern: maze, seed: 'k9Pz', options: { thickness: thicknesses[i] } });
});`,
    },
    redraw: {
      file: 'reseedable.js',
      lang: 'ts',
      code: `// <div id="art"></div> <button id="redraw">Redraw</button> <button id="export">Export PNG</button>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { blossom } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ height: 280 }));

const art = createPattern(host, { pattern: blossom, palette: ${js(REDRAW_PALETTE)}, fit: 'cover' });

document.querySelector('#redraw').addEventListener('click', () => art.redraw());
document.querySelector('#export').addEventListener('click', () => art.exportImage());`,
    },
    motion: {
      file: 'shimmer.js',
      lang: 'ts',
      code: `// <div id="shimmer"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { quilt } from 'tabbied/patterns';

const host = document.querySelector('#shimmer');
Object.assign(host.style, resolveBoxStyle({ height: 280 }));

// A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
// the box is off screen; under prefers-reduced-motion the timer never starts.
createPattern(host, { pattern: quilt, fit: 'cover', redrawInterval: 2000 });`,
    },
    a11y: {
      file: 'rings.js',
      lang: 'ts',
      code: `// <div id="decoration"></div> <div id="figure"></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { ring } from 'tabbied/patterns';

const decoration = document.querySelector('#decoration');
const figure = document.querySelector('#figure');
for (const host of [decoration, figure]) Object.assign(host.style, resolveBoxStyle({ height: 180 }));

// The core leaves the host as you wrote it: say what it is.
decoration.setAttribute('aria-hidden', 'true');
figure.setAttribute('role', 'img');
figure.setAttribute('aria-label', '${A11Y_LABEL}');

createPattern(decoration, { pattern: ring });
createPattern(figure, { pattern: ring });`,
    },
  },

  element: {
    quickStart: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A block with no size of its own: the style gives it one. -->
<tabbied-pattern pattern="radius" seed="k9Pz" style="display: block; height: 320px"></tabbied-pattern>

${SCRIPT}`,
    },
    fit: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- grid (default): the cell grid adapts to the box. -->
<tabbied-pattern pattern="vitrail" fit="grid" style="display: block; height: 240px"></tabbied-pattern>
<!-- cover: one render, scaled uniformly to fill the box. -->
<tabbied-pattern pattern="vitrail" fit="cover" style="display: block; height: 240px"></tabbied-pattern>
<!-- fixed: a canvas of an exact size, what the editor uses. -->
<tabbied-pattern pattern="vitrail" fit="fixed" width="360" height="540"></tabbied-pattern>

${SCRIPT}`,
    },
    palette: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- The background (color 0) comes first, then the inks. -->
${PALETTE_DEMOS.map(
  ({ colors }) =>
    `<tabbied-pattern pattern="mixtape" seed="k9Pz" palette="${list(colors)}"\n  style="display: block; height: 180px"></tabbied-pattern>`
).join('\n')}

${SCRIPT}`,
    },
    transparent: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Any CSS color works for a slot, transparent included: the ground drops
     out and whatever is behind the box shows through. -->
<tabbied-pattern pattern="radius" palette="${list(TRANSPARENT_PALETTE)}"
  style="display: block; height: 240px"></tabbied-pattern>

${SCRIPT}`,
    },
    options: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Option ids come from the design: maze takes a grid, a frequency and a thickness. -->
${OPTION_DEMOS.map(
  (thickness) =>
    `<tabbied-pattern pattern="maze" seed="k9Pz" options="thickness: ${thickness}"\n  style="display: block; height: 180px"></tabbied-pattern>`
).join('\n')}

${SCRIPT}`,
    },
    redraw: {
      file: 'index.html',
      lang: 'html',
      code: `<tabbied-pattern id="art" pattern="blossom" palette="${list(REDRAW_PALETTE)}" fit="cover"
  style="display: block; height: 280px"></tabbied-pattern>
<button id="redraw">Redraw</button>
<button id="export">Export PNG</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');
  document.querySelector('#redraw').addEventListener('click', () => art.redraw());
  document.querySelector('#export').addEventListener('click', () => art.exportImage());
</script>`,
    },
    motion: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
     the box is off screen; under prefers-reduced-motion the timer never starts. -->
<tabbied-pattern pattern="quilt" fit="cover" redraw-interval="2000"
  style="display: block; height: 280px"></tabbied-pattern>

${SCRIPT}`,
    },
    a11y: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Decorative, the default: hidden from assistive technology. -->
<tabbied-pattern pattern="ring" style="display: block; height: 180px"></tabbied-pattern>
<!-- Content: an aria-label makes it an image with that label. -->
<tabbied-pattern pattern="ring" aria-label="${A11Y_LABEL}"
  style="display: block; height: 180px"></tabbied-pattern>

${SCRIPT}`,
    },
  },

  html: {
    quickStart: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A block with no size of its own: the style gives it one. -->
<div data-pattern="radius" data-seed="k9Pz" style="height: 320px"></div>

${boot(['radius'])}`,
    },
    fit: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- grid (default): the cell grid adapts to the box. -->
<div data-pattern="vitrail" data-fit="grid" style="height: 240px"></div>
<!-- cover: one render, scaled uniformly to fill the box. -->
<div data-pattern="vitrail" data-fit="cover" style="height: 240px"></div>
<!-- fixed: a canvas of an exact size, what the editor uses. -->
<div data-pattern="vitrail" data-fit="fixed" data-width="360" data-height="540" style="display: inline-block"></div>

${boot(['vitrail'])}`,
    },
    palette: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- The background (color 0) comes first, then the inks. -->
${PALETTE_DEMOS.map(
  ({ colors }) => `<div data-pattern="mixtape" data-seed="k9Pz" data-palette="${list(colors)}" style="height: 180px"></div>`
).join('\n')}

${boot(['mixtape'])}`,
    },
    transparent: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Any CSS color works for a slot, transparent included: the ground drops
     out and whatever is behind the box shows through. -->
<div data-pattern="radius" data-palette="${list(TRANSPARENT_PALETTE)}" style="height: 240px"></div>

${boot(['radius'])}`,
    },
    options: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- Option ids come from the design: maze takes a grid, a frequency and a thickness. -->
${OPTION_DEMOS.map(
  (thickness) => `<div data-pattern="maze" data-seed="k9Pz" data-options="thickness: ${thickness}" style="height: 180px"></div>`
).join('\n')}

${boot(['maze'])}`,
    },
    redraw: {
      file: 'index.html',
      lang: 'html',
      code: `<div id="art" data-pattern="blossom" data-palette="${list(REDRAW_PALETTE)}" data-fit="cover" style="height: 280px"></div>
<button id="redraw">Redraw</button>
<button id="export">Export PNG</button>

${boot(
  ['blossom'],
  `const art = mounted.find(({ element }) => element.id === 'art').controller;
document.querySelector('#redraw').addEventListener('click', () => art.redraw());
document.querySelector('#export').addEventListener('click', () => art.exportImage());`
)}`,
    },
    motion: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- A new seed every 2 seconds. Ticks are skipped while the tab is hidden or
     the box is off screen; under prefers-reduced-motion the timer never starts. -->
<div data-pattern="quilt" data-fit="cover" data-redraw-interval="2000" style="height: 280px"></div>

${boot(['quilt'])}`,
    },
    a11y: {
      file: 'index.html',
      lang: 'html',
      code: `<!-- hydratePatterns() leaves the element as you wrote it: say what it is. -->
<!-- Decoration: hidden from assistive technology. -->
<div data-pattern="ring" aria-hidden="true" style="height: 180px"></div>
<!-- Content: an image with a label. -->
<div data-pattern="ring" role="img" aria-label="${A11Y_LABEL}" style="height: 180px"></div>

${boot(['ring'])}`,
    },
  },
};
