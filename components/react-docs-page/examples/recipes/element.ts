// <tabbied-pattern> recipes for /docs/web-component: whole pages or page
// fragments, each with the one script tag it needs. The element's box is its
// own CSS; its settings are attributes, or properties for an array or an
// object. No runtime imports.
import type { Recipe } from './types';

const SCRIPT = '<script type="module" src="https://cdn.jsdelivr.net/npm/tabbied@@VERSION@/dist/element/tabbied-element.js"></script>';

export const ELEMENT_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: '`position: absolute; inset: 0` takes the element out of the flow, so the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps its `z-index: -1` inside the section.',
    file: 'index.html',
    lang: 'html',
    code: `<section style="position: relative; isolation: isolate; padding: 96px 24px; color: #fff">
  <tabbied-pattern
    pattern="radius"
    seed="launch"
    palette="#0B1020, #1D3A8A, #3E8BFF, #3FFFB2"
    density="0.3"
    style="display: block; position: absolute; inset: 0; z-index: -1; background: #0B1020"
  ></tabbied-pattern>
  <h1>Patterns for every page</h1>
  <p>The section is as tall as this copy; the pattern fills it.</p>
</section>

${SCRIPT}`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'A seed picks the arrangement, so a seed per card gives every card its own picture, the same one on every visit. The design file loads once, however many elements name it.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px">
  <article>
    <tabbied-pattern pattern="quilt" seed="post-1" style="display: block; aspect-ratio: 16 / 9"></tabbied-pattern>
    <h3>First post</h3>
  </article>
  <article>
    <tabbied-pattern pattern="quilt" seed="post-2" style="display: block; aspect-ratio: 16 / 9"></tabbied-pattern>
    <h3>Second post</h3>
  </article>
  <article>
    <tabbied-pattern pattern="quilt" seed="post-3" style="display: block; aspect-ratio: 16 / 9"></tabbied-pattern>
    <h3>Third post</h3>
  </article>
</div>

${SCRIPT}`,
  },
  {
    id: 'divider',
    group: 'layout',
    title: 'A section divider',
    says: 'A full-width strip: the element is a block, so a height is all it needs. A higher `density` keeps the cells small at a short height.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern pattern="ortho" seed="divider" density="0.9" style="display: block; height: 48px"></tabbied-pattern>

${SCRIPT}`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette that starts with `transparent` leaves the ground clear, so the parent\'s background image shows through. A lower `frequency` leaves more of it showing.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="background: url(/images/harbor.jpg) center / cover">
  <tabbied-pattern
    pattern="radius"
    palette="transparent, #FFFFFF, #3FFFB2"
    options="frequency: 0.4"
    style="display: block; aspect-ratio: 21 / 9"
  ></tabbied-pattern>
</div>

${SCRIPT}`,
  },
  {
    id: 'brand',
    group: 'layout',
    title: 'One palette across several designs',
    says: 'The same `palette` on several designs; the element fetches each design the page names, and only those.',
    file: 'index.html',
    lang: 'html',
    code: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px">
  <tabbied-pattern pattern="radius" seed="brand" palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="display: block; aspect-ratio: 1"></tabbied-pattern>
  <tabbied-pattern pattern="quilt" seed="brand" palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="display: block; aspect-ratio: 1"></tabbied-pattern>
  <tabbied-pattern pattern="vitrail" seed="brand" palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="display: block; aspect-ratio: 1"></tabbied-pattern>
  <tabbied-pattern pattern="ortho" seed="brand" palette="#0B1020, #3E8BFF, #3FFFB2, #FF3D8B" style="display: block; aspect-ratio: 1"></tabbied-pattern>
</div>

${SCRIPT}`,
  },
  {
    id: 'stylesheet',
    group: 'layout',
    title: 'Sized from a stylesheet',
    says: 'The element is styled like any other: a class, a media query, a container query. Keep `display: block` inline or in a sheet loaded before the script, so the box is right before the element is defined.',
    file: 'index.html',
    lang: 'html',
    code: `<style>
  .banner {
    display: block;
    height: 160px;
    border-radius: 12px;
  }

  @media (min-width: 768px) {
    .banner {
      height: 288px;
    }
  }
</style>

<tabbied-pattern class="banner" pattern="radius"></tabbied-pattern>

${SCRIPT}`,
  },
  {
    id: 'labelled',
    group: 'layout',
    title: 'A pattern that means something',
    says: 'The element is hidden from assistive technology unless it carries an `aria-label`, which makes it an image with that name.',
    file: 'index.html',
    lang: 'html',
    code: `<figure>
  <tabbied-pattern
    pattern="radius"
    seed="k9Pz"
    aria-label="Quarter circles in blue and green, packed edge to edge"
    style="display: block; aspect-ratio: 1"
  ></tabbied-pattern>
  <figcaption>Radius, seed k9Pz.</figcaption>
</figure>

${SCRIPT}`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: 'Change an attribute and the pattern already on the page redraws, through the design\'s own transition; nothing is remounted.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="banner" pattern="radius" seed="k9Pz" palette="#0B1020, #3E8BFF, #3FFFB2"
  style="display: block; height: 240px"></tabbied-pattern>
<button id="theme">Switch theme</button>

${SCRIPT}
<script type="module">
  const PALETTES = { light: '#FFF4E6, #E8590C, #1C1C1C', dark: '#0B1020, #3E8BFF, #3FFFB2' };
  const banner = document.querySelector('#banner');
  let theme = 'dark';

  document.querySelector('#theme').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    banner.setAttribute('palette', PALETTES[theme]);
  });
</script>`,
  },
  {
    id: 'system-theme',
    group: 'state',
    title: 'Follow the system color scheme',
    says: 'Listen to `prefers-color-scheme` and write the palette to every pattern on the page.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern pattern="radius" seed="k9Pz" style="display: block; aspect-ratio: 3 / 1"></tabbied-pattern>

${SCRIPT}
<script type="module">
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const sync = () => {
    const palette = query.matches ? '#0B1020, #3E8BFF, #3FFFB2' : '#FFF4E6, #E8590C, #1C1C1C';
    document.querySelectorAll('tabbied-pattern').forEach((element) => element.setAttribute('palette', palette));
  };

  sync();
  query.addEventListener('change', sync);
</script>`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: '`redraw()` picks a new seed and morphs to it. Pass a seed of your own to keep it, say to save with a post.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="art" pattern="radius" style="display: block; aspect-ratio: 3 / 2"></tabbied-pattern>
<button id="shuffle">Shuffle</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');

  document.querySelector('#shuffle').addEventListener('click', () => {
    const seed = Math.random().toString(36).slice(2, 8);
    art.redraw(seed);
    console.log('seed', seed);
  });
</script>`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'A new `pattern` attribute loads that design\'s file (a couple of KB) and replaces the drawing in place.',
    file: 'index.html',
    lang: 'html',
    code: `<select id="design">
  <option value="radius">Radius</option>
  <option value="quilt">Quilt</option>
  <option value="vitrail">Vitrail</option>
</select>
<tabbied-pattern id="art" pattern="radius" seed="k9Pz" style="display: block; aspect-ratio: 3 / 2"></tabbied-pattern>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');
  document.querySelector('#design').addEventListener('change', (event) => {
    art.setAttribute('pattern', event.target.value);
  });
</script>`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Options are `id: value` pairs in one attribute, or an object set as the `options` property; `density` is the cell size, 0 coarse to 1 fine.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="art" pattern="radius" seed="k9Pz" options="frequency: 0.8" density="0.5"
  style="display: block; height: 280px"></tabbied-pattern>
<label>Frequency <input id="frequency" type="range" min="0.2" max="1" step="0.1" value="0.8" /></label>
<label>Density <input id="density" type="range" min="0" max="1" step="0.05" value="0.5" /></label>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');

  document.querySelector('#frequency').addEventListener('input', (event) => {
    art.options = { frequency: Number(event.target.value) };
  });
  document.querySelector('#density').addEventListener('input', (event) => {
    art.setAttribute('density', event.target.value);
  });
</script>`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave `seed` out and set `redraw-interval`: the pattern reseeds on a timer and morphs between arrangements. The `paused` attribute holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="ambient" pattern="radius" redraw-interval="4000" style="display: block; height: 240px"></tabbied-pattern>

${SCRIPT}
<script type="module">
  const ambient = document.querySelector('#ambient');
  ambient.addEventListener('mouseenter', () => ambient.setAttribute('paused', ''));
  ambient.addEventListener('mouseleave', () => ambient.removeAttribute('paused'));
</script>`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: '`exportImage()` saves a PNG at any scale and `exportSvg()` a vector file. Enable the buttons on the `ready` event, once there is a drawing to export.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="art" pattern="radius" seed="k9Pz" style="display: block; aspect-ratio: 3 / 2"></tabbied-pattern>
<button id="png" disabled>Download PNG</button>
<button id="svg" disabled>Download SVG</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');
  const png = document.querySelector('#png');
  const svg = document.querySelector('#svg');

  art.addEventListener('ready', () => {
    png.disabled = false;
    svg.disabled = false;
  });
  png.addEventListener('click', () => art.exportImage({ scale: 2, download: true, name: 'banner' }));
  svg.addEventListener('click', () => art.exportSvg({ download: true, name: 'banner' }));
</script>`,
  },
  {
    id: 'upload',
    group: 'state',
    title: 'Send the SVG to your server',
    says: '`exportSvg()` resolves to the file as a string, so saving a design a person made is one `fetch`. It waits for any redraw in flight before it reads the page.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="art" pattern="radius" seed="k9Pz"
  style="display: block; width: 600px; max-width: 100%; height: 400px"></tabbied-pattern>
<button id="save">Save artwork</button>

${SCRIPT}
<script type="module">
  const art = document.querySelector('#art');

  document.querySelector('#save').addEventListener('click', async () => {
    const { svg } = await art.exportSvg();
    await fetch('/api/artwork', {
      method: 'POST',
      headers: { 'Content-Type': 'image/svg+xml' },
      body: svg,
    });
  });
</script>`,
  },
  {
    id: 'error',
    group: 'integration',
    title: 'When a design cannot load',
    says: 'A slug that does not exist, or a design file that cannot be fetched, fires `error` with the reason in `detail`. The box keeps its size and its inline background, so a fallback can be as small as a class.',
    file: 'index.html',
    lang: 'html',
    code: `<tabbied-pattern id="art" pattern="radius" style="display: block; height: 200px; background: #0B1020"></tabbied-pattern>

${SCRIPT}
<script type="module">
  document.querySelector('#art').addEventListener('error', (event) => {
    console.warn('pattern unavailable:', event.detail);
    event.currentTarget.classList.add('pattern-failed');
  });
</script>`,
  },
  {
    id: 'self-host',
    group: 'integration',
    title: 'Self-host the files',
    says: 'Copy the package\'s `dist/element/` and `dist/patterns/` side by side and serve them yourself; the element loads designs from beside itself. If the designs live elsewhere, `setPatternsBase()` points at them.',
    file: 'index.html',
    lang: 'html',
    code: `<!-- /vendor/tabbied/element/ and /vendor/tabbied/patterns/, copied from the package's dist/. -->
<tabbied-pattern pattern="radius" style="display: block; aspect-ratio: 3 / 2"></tabbied-pattern>

<script type="module" src="/vendor/tabbied/element/tabbied-element.js"></script>`,
  },
  {
    id: 'bundled',
    group: 'integration',
    title: 'In a bundled app',
    says: 'Import `tabbied/element` and register the designs the markup names: a bundler cannot follow a slug in a string, so it ships the ones registered and fetches nothing.',
    file: 'main.js',
    lang: 'ts',
    code: `import { definePatterns } from 'tabbied/element';
import { quilt, radius } from 'tabbied/patterns';

definePatterns({ radius, quilt });

document.querySelector('#app').innerHTML =
  '<tabbied-pattern pattern="radius" style="display: block; aspect-ratio: 3 / 2"></tabbied-pattern>';`,
  },
  {
    id: 'property',
    group: 'integration',
    title: 'Hand it a definition',
    says: 'Set the `pattern` property to a definition, one of the package\'s or your own, instead of naming a slug: nothing is fetched and no registration is needed.',
    file: 'main.js',
    lang: 'ts',
    code: `import 'tabbied/element';
import { radius } from 'tabbied/patterns';

const element = document.createElement('tabbied-pattern');
element.style.cssText = 'display: block; aspect-ratio: 3 / 2';
element.pattern = radius;
element.palette = ['#0B1020', '#3E8BFF', '#3FFFB2'];
document.body.append(element);`,
  },
  {
    id: 'cms',
    group: 'integration',
    title: 'In a CMS or a static site generator',
    says: 'Anywhere that takes raw HTML (a WordPress block, a Webflow embed, an Astro or Eleventy page) takes the element as it is: the markup and one script, which loads once per page however many patterns there are.',
    file: 'embed.html',
    lang: 'html',
    code: `<tabbied-pattern pattern="radius" seed="k9Pz" palette="#0B1020, #3E8BFF, #3FFFB2"
  style="display: block; aspect-ratio: 16 / 9; background: #0B1020"></tabbied-pattern>
${SCRIPT}`,
  },
];
