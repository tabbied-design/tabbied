// Plain HTML recipes for /docs/html: data attributes plus one module script
// from esm.sh, pinned, with `?exports=` trimming the presets to the page's
// own. Anything interactive drives the controllers hydratePatterns()
// returns. No runtime imports.
import type { Recipe } from './types';

const BASE = 'https://esm.sh/tabbied@@VERSION@';

/** The bootstrap for a page that uses these designs. */
const boot = (designs: string[], after = '') =>
  [
    '<script type="module">',
    `  import { hydratePatterns } from '${BASE}';`,
    `  import { ${designs.join(', ')} } from '${BASE}/patterns?exports=${designs.join(',')}';`,
    '',
    `  ${after ? 'const mounted = ' : ''}hydratePatterns({ patterns: { ${designs.join(', ')} } });`,
    ...(after ? ['', ...after.split('\n').map((line) => (line ? `  ${line}` : ''))] : []),
    '</script>',
  ].join('\n');

export const HTML_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: '`position: absolute; inset: 0` takes the pattern out of the flow, so the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps its `z-index: -1` inside the section.',
    file: 'index.html',
    lang: 'html',
    code: `<section style="position: relative; isolation: isolate; padding: 96px 24px; color: #fff">
  <div data-pattern="radius"
       data-seed="launch"
       data-palette="#0B1020, #1D3A8A, #3E8BFF, #3FFFB2"
       data-density="0.3"
       style="position: absolute; inset: 0; z-index: -1; background: #0B1020"></div>
  <h1>Patterns for every page</h1>
  <p>The section is as tall as this copy; the pattern fills it.</p>
</section>

${boot(['radius'])}`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'A seed picks the arrangement, so a seed per card gives every card its own picture, the same one on every visit. One import serves them all.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px">
  <article>
    <div data-pattern="quilt" data-seed="post-1" style="aspect-ratio: 16 / 9"></div>
    <h3>First post</h3>
  </article>
  <article>
    <div data-pattern="quilt" data-seed="post-2" style="aspect-ratio: 16 / 9"></div>
    <h3>Second post</h3>
  </article>
  <article>
    <div data-pattern="quilt" data-seed="post-3" style="aspect-ratio: 16 / 9"></div>
    <h3>Third post</h3>
  </article>
</div>

${boot(['quilt'])}`,
  },
  {
    id: 'divider',
    group: 'layout',
    title: 'A section divider',
    says: 'A full-width strip: a `div` is a block, so a height is all it needs. A higher `data-density` keeps the cells small at a short height.',
    file: 'index.html',
    lang: 'html',
    code: `<div data-pattern="ortho" data-seed="divider" data-density="0.9" style="height: 48px"></div>

${boot(['ortho'])}`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette that starts with `transparent` leaves the ground clear, so the parent\'s background image shows through. A lower `frequency` leaves more of it showing.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="background: url(/images/harbor.jpg) center / cover">
  <div data-pattern="radius"
       data-palette="transparent, #FFFFFF, #3FFFB2"
       data-options="frequency: 0.4"
       style="aspect-ratio: 21 / 9"></div>
</div>

${boot(['radius'])}`,
  },
  {
    id: 'brand',
    group: 'layout',
    title: 'One palette across several designs',
    says: 'Several designs on one page are one import: list every slug in the import and in `?exports=`, and pass them all to `hydratePatterns()`.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px">
  <div data-pattern="radius" data-seed="brand" data-palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="aspect-ratio: 1"></div>
  <div data-pattern="quilt" data-seed="brand" data-palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="aspect-ratio: 1"></div>
  <div data-pattern="vitrail" data-seed="brand" data-palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="aspect-ratio: 1"></div>
  <div data-pattern="ortho" data-seed="brand" data-palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="aspect-ratio: 1"></div>
</div>

${boot(['radius', 'quilt', 'vitrail', 'ortho'])}`,
  },
  {
    id: 'labelled',
    group: 'layout',
    title: 'A pattern that means something',
    says: 'A `div` with no role is just a box to a screen reader. Where a pattern is content, give it `role="img"` and an `aria-label`; elsewhere add `aria-hidden="true"`.',
    file: 'index.html',
    lang: 'html',
    code: `<figure>
  <div data-pattern="radius" data-seed="k9Pz" role="img"
       aria-label="Quarter circles in blue and green, packed edge to edge"
       style="aspect-ratio: 1"></div>
  <figcaption>Radius, seed k9Pz.</figcaption>
</figure>

${boot(['radius'])}`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: '`hydratePatterns()` returns each element with its controller; `update()` changes a setting on the pattern already on the page, which redraws through the design\'s own transition.',
    file: 'index.html',
    lang: 'html',
    code: `<div data-pattern="radius" data-seed="k9Pz" data-palette="#0B1020, #3E8BFF, #3FFFB2" style="height: 240px"></div>
<button id="theme">Switch theme</button>

${boot(['radius'], `const PALETTES = {
  light: ['#FFF4E6', '#E8590C', '#1C1C1C'],
  dark: ['#0B1020', '#3E8BFF', '#3FFFB2'],
};
let theme = 'dark';

document.querySelector('#theme').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  mounted.forEach(({ controller }) => controller.update({ palette: PALETTES[theme] }));
});`)}`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: 'Find the controller by its element and call `redraw()`: a new seed, morphing to it. Pass a seed of your own to keep it.',
    file: 'index.html',
    lang: 'html',
    code: `<div id="art" data-pattern="radius" style="aspect-ratio: 3 / 2"></div>
<button id="shuffle">Shuffle</button>

${boot(['radius'], `const art = mounted.find(({ element }) => element.id === 'art').controller;
document.querySelector('#shuffle').addEventListener('click', () => art.redraw());`)}`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'Import the designs on offer and hand one to `update({ pattern })`; it replaces the drawing in place.',
    file: 'index.html',
    lang: 'html',
    code: `<select id="design">
  <option value="radius">Radius</option>
  <option value="quilt">Quilt</option>
  <option value="vitrail">Vitrail</option>
</select>
<div id="art" data-pattern="radius" data-seed="k9Pz" style="aspect-ratio: 3 / 2"></div>

${boot(['radius', 'quilt', 'vitrail'], `const designs = { radius, quilt, vitrail };
const art = mounted.find(({ element }) => element.id === 'art').controller;

document.querySelector('#design').addEventListener('change', (event) => {
  art.update({ pattern: designs[event.target.value] });
});`)}`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Option ids come from the design (`radius` has `frequency`, 0.2 to 1); `density` is the cell size, 0 coarse to 1 fine. Each `update()` redraws in place.',
    file: 'index.html',
    lang: 'html',
    code: `<div id="art" data-pattern="radius" data-seed="k9Pz" style="height: 280px"></div>
<label>Frequency <input id="frequency" type="range" min="0.2" max="1" step="0.1" value="0.8" /></label>
<label>Density <input id="density" type="range" min="0" max="1" step="0.05" value="0.5" /></label>

${boot(['radius'], `const art = mounted.find(({ element }) => element.id === 'art').controller;

document.querySelector('#frequency').addEventListener('input', (event) => {
  art.update({ options: { frequency: Number(event.target.value) } });
});
document.querySelector('#density').addEventListener('input', (event) => {
  art.update({ density: Number(event.target.value) });
});`)}`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave the seed out and set `data-redraw-interval`: the pattern reseeds on a timer and morphs between arrangements. `update({ paused })` holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'index.html',
    lang: 'html',
    code: `<div id="ambient" data-pattern="radius" data-redraw-interval="4000" style="height: 240px"></div>

${boot(['radius'], `const { element, controller } = mounted.find(({ element }) => element.id === 'ambient');
element.addEventListener('mouseenter', () => controller.update({ paused: true }));
element.addEventListener('mouseleave', () => controller.update({ paused: false }));`)}`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: 'The controller\'s `exportImage()` saves a PNG at any scale and `exportSvg()` a vector file.',
    file: 'index.html',
    lang: 'html',
    code: `<div id="art" data-pattern="radius" data-seed="k9Pz" style="aspect-ratio: 3 / 2"></div>
<button id="png">Download PNG</button>
<button id="svg">Download SVG</button>

${boot(['radius'], `const art = mounted.find(({ element }) => element.id === 'art').controller;

document.querySelector('#png').addEventListener('click', () => art.exportImage({ scale: 2, download: true, name: 'banner' }));
document.querySelector('#svg').addEventListener('click', () => art.exportSvg({ download: true, name: 'banner' }));`)}`,
  },
  {
    id: 'later',
    group: 'integration',
    title: 'Patterns added after the page loads',
    says: '`hydratePatterns()` mounts what is on the page when it runs and skips what it already mounted, so call it again after adding markup; `root` limits the search to the new part.',
    file: 'index.html',
    lang: 'html',
    code: `<div id="feed"></div>
<button id="more">Load more</button>

${boot(['quilt'], `let page = 0;

document.querySelector('#more').addEventListener('click', () => {
  page += 1;
  const card = document.createElement('article');
  card.innerHTML = \`<div data-pattern="quilt" data-seed="page-\${page}" style="aspect-ratio: 16 / 9"></div>\`;
  document.querySelector('#feed').append(card);
  hydratePatterns({ patterns: { quilt }, root: card });
});`).replace('const mounted = ', '')}`,
  },
  {
    id: 'unknown',
    group: 'integration',
    title: 'A slug the script does not import',
    says: 'An element whose design is not in `patterns` is skipped, with a console warning by default, and the rest still mount. `onError` takes it over, here to drop the element.',
    file: 'index.html',
    lang: 'html',
    code: `<div data-pattern="radius" style="height: 200px"></div>
<div data-pattern="notimported" style="height: 200px"></div>

<script type="module">
  import { hydratePatterns } from '${BASE}';
  import { radius } from '${BASE}/patterns?exports=radius';

  hydratePatterns({
    patterns: { radius },
    onError: (error, element) => element.remove(),
  });
</script>`,
  },
  {
    id: 'defaults',
    group: 'integration',
    title: 'Settings for every pattern at once',
    says: '`defaults` is merged into every element\'s settings after its attributes, so a whole page can share a motion setting or a density without repeating it.',
    file: 'index.html',
    lang: 'html',
    code: `<div data-pattern="radius" style="height: 200px"></div>
<div data-pattern="quilt" style="height: 200px"></div>

<script type="module">
  import { hydratePatterns } from '${BASE}';
  import { quilt, radius } from '${BASE}/patterns?exports=quilt,radius';

  hydratePatterns({ patterns: { radius, quilt }, defaults: { redrawInterval: 6000 } });
</script>`,
  },
];
