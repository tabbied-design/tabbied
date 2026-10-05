// createPattern() recipes for /docs/javascript: modules for a bundled app,
// each with the markup it expects in a comment. The controller every one
// returns is the whole API: update(), redraw(), exportImage(), exportSvg(),
// destroy(). No runtime imports.
import type { Recipe } from './types';

export const JAVASCRIPT_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: 'The host is taken out of the flow with `position: absolute; inset: 0`, so the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps its `z-index: -1` inside the section.',
    file: 'hero.js',
    lang: 'ts',
    code: `// <section class="hero" style="position: relative; isolation: isolate; padding: 96px 24px">
//   <div class="hero-art"></div>
//   <h1>Patterns for every page</h1>
// </section>
import { createPattern } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('.hero-art');
host.style.cssText = 'position: absolute; inset: 0; z-index: -1';

createPattern(host, {
  pattern: radius,
  seed: 'launch',
  palette: ['#0B1020', '#1D3A8A', '#3E8BFF', '#3FFFB2'],
  density: 0.3,
});`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'One controller per element. A seed per card, here its id, gives every card its own picture, the same on every visit.',
    file: 'cards.js',
    lang: 'ts',
    code: `// <article data-id="post-1"><div class="card-art"></div><h3>First post</h3></article>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { quilt } from 'tabbied/patterns';

for (const card of document.querySelectorAll('article[data-id]')) {
  const host = card.querySelector('.card-art');
  Object.assign(host.style, resolveBoxStyle({ aspectRatio: '16 / 9' }));
  createPattern(host, { pattern: quilt, seed: card.dataset.id });
}`,
  },
  {
    id: 'divider',
    group: 'layout',
    title: 'A section divider',
    says: 'A full-width strip: `resolveBoxStyle({ height: 48 })` keeps the width at 100% and pins the height. A higher `density` keeps the cells small at a short height.',
    file: 'divider.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { ortho } from 'tabbied/patterns';

for (const host of document.querySelectorAll('.divider')) {
  Object.assign(host.style, resolveBoxStyle({ height: 48 }));
  createPattern(host, { pattern: ortho, seed: 'divider', density: 0.9 });
}`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette that starts with `transparent` leaves the ground clear, so the parent\'s background image shows through. A lower `frequency` leaves more of it showing.',
    file: 'photo.js',
    lang: 'ts',
    code: `// <div style="background: url(/images/harbor.jpg) center / cover"><div id="overlay"></div></div>
import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#overlay');
Object.assign(host.style, resolveBoxStyle({ aspectRatio: '21 / 9' }));

createPattern(host, {
  pattern: radius,
  palette: ['transparent', '#FFFFFF', '#3FFFB2'],
  options: { frequency: 0.4 },
});`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: '`update()` merges a change into the pattern already on the page, which redraws through the design\'s own transition; nothing is rebuilt.',
    file: 'theme.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const PALETTES = {
  light: ['#FFF4E6', '#E8590C', '#1C1C1C'],
  dark: ['#0B1020', '#3E8BFF', '#3FFFB2'],
};
let theme = 'dark';

const host = document.querySelector('#banner');
Object.assign(host.style, resolveBoxStyle({ height: 240 }));
const banner = createPattern(host, { pattern: radius, seed: 'k9Pz', palette: PALETTES[theme] });

document.querySelector('#theme').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  banner.update({ palette: PALETTES[theme] });
});`,
  },
  {
    id: 'system-theme',
    group: 'state',
    title: 'Follow the system color scheme',
    says: 'Read `prefers-color-scheme` once for the first palette, then update on every change.',
    file: 'scheme.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const LIGHT = ['#FFF4E6', '#E8590C', '#1C1C1C'];
const DARK = ['#0B1020', '#3E8BFF', '#3FFFB2'];
const query = window.matchMedia('(prefers-color-scheme: dark)');

const host = document.querySelector('#banner');
Object.assign(host.style, resolveBoxStyle({ aspectRatio: '3 / 1' }));
const banner = createPattern(host, { pattern: radius, seed: 'k9Pz', palette: query.matches ? DARK : LIGHT });

query.addEventListener('change', () => banner.update({ palette: query.matches ? DARK : LIGHT }));`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: '`redraw()` picks a new seed and morphs to it; pass one to choose it, say a seed you saved.',
    file: 'shuffle.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ aspectRatio: '3 / 2' }));
const art = createPattern(host, { pattern: radius });

document.querySelector('#shuffle').addEventListener('click', () => {
  const seed = Math.random().toString(36).slice(2, 8);
  art.redraw(seed);
  localStorage.setItem('hero-seed', seed);
});`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'Import the designs on offer and hand one to `update({ pattern })`; it replaces the drawing in place.',
    file: 'picker.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { quilt, radius, vitrail } from 'tabbied/patterns';

const designs = { radius, quilt, vitrail };
const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ aspectRatio: '3 / 2' }));
const art = createPattern(host, { pattern: radius, seed: 'k9Pz' });

document.querySelector('#design').addEventListener('change', (event) => {
  art.update({ pattern: designs[event.target.value] });
});`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Option ids come from the design (`radius` has `frequency`, 0.2 to 1); `density` is the cell size, 0 coarse to 1 fine. Each `update()` redraws in place.',
    file: 'controls.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ height: 280 }));
const art = createPattern(host, { pattern: radius, seed: 'k9Pz' });

document.querySelector('#frequency').addEventListener('input', (event) => {
  art.update({ options: { frequency: Number(event.target.value) } });
});
document.querySelector('#density').addEventListener('input', (event) => {
  art.update({ density: Number(event.target.value) });
});`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave `seed` out and set `redrawInterval`: the pattern reseeds on a timer and morphs between arrangements. `update({ paused })` holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'ambient.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#ambient');
Object.assign(host.style, resolveBoxStyle({ height: 240 }));
const ambient = createPattern(host, { pattern: radius, redrawInterval: 4000 });

host.addEventListener('mouseenter', () => ambient.update({ paused: true }));
host.addEventListener('mouseleave', () => ambient.update({ paused: false }));`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: '`exportImage()` saves a PNG at any scale and `exportSvg()` a vector file. Enable them from `onReady`, once there is a drawing to export, and check `supportsSvgExport()`: a few designs have no vector form.',
    file: 'downloads.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle, supportsSvgExport } from 'tabbied';
import { radius } from 'tabbied/patterns';

const png = document.querySelector('#png');
const svg = document.querySelector('#svg');
const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ aspectRatio: '3 / 2' }));

const art = createPattern(host, {
  pattern: radius,
  seed: 'k9Pz',
  onReady: () => {
    png.disabled = false;
    svg.disabled = !supportsSvgExport(radius);
  },
});

png.addEventListener('click', () => art.exportImage({ scale: 2, download: true, name: 'banner' }));
svg.addEventListener('click', () => art.exportSvg({ download: true, name: 'banner' }));`,
  },
  {
    id: 'upload',
    group: 'state',
    title: 'Send the SVG to your server',
    says: 'Without `download`, `exportSvg()` resolves to the markup and its size, to store or post anywhere.',
    file: 'save.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

const host = document.querySelector('#art');
Object.assign(host.style, resolveBoxStyle({ width: 600, height: 400 }));
const art = createPattern(host, { pattern: radius, seed: 'k9Pz' });

document.querySelector('#save').addEventListener('click', async () => {
  const { svg, width, height } = await art.exportSvg();

  await fetch(\`/api/artwork?width=\${width}&height=\${height}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/svg+xml' },
    body: svg,
  });
});`,
  },
  {
    id: 'own-element',
    group: 'integration',
    title: 'Inside a custom element of your own',
    says: 'Mount in `connectedCallback` and destroy in `disconnectedCallback`: a destroyed controller stops its timers and observers, and the element can be moved or removed freely.',
    file: 'brand-banner.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

class BrandBanner extends HTMLElement {
  #controller = null;

  connectedCallback() {
    Object.assign(this.style, { display: 'block' }, resolveBoxStyle({ aspectRatio: '3 / 1' }));
    this.#controller = createPattern(this, {
      pattern: radius,
      seed: this.getAttribute('seed') ?? 'brand',
      palette: ['#0B1020', '#3E8BFF', '#3FFFB2'],
    });
  }

  disconnectedCallback() {
    this.#controller?.destroy();
    this.#controller = null;
  }
}

customElements.define('brand-banner', BrandBanner);`,
  },
  {
    id: 'spa',
    group: 'integration',
    title: 'Clean up on a route change',
    says: 'In a single-page app, destroy what a view mounted when it goes, or its timers and observers outlive it.',
    file: 'view.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';

export function mountView(root) {
  const host = root.querySelector('.view-art');
  Object.assign(host.style, resolveBoxStyle({ height: 200 }));
  const controller = createPattern(host, { pattern: radius, redrawInterval: 5000 });

  // Call this when the view unmounts.
  return () => controller.destroy();
}`,
  },
  {
    id: 'lazy-designs',
    group: 'integration',
    title: 'Designs chosen at runtime, loaded on demand',
    says: 'Each design is a module of its own at `tabbied/patterns/<slug>`: list the ones you offer as dynamic imports and a bundler splits them, so a page loads only the one it shows.',
    file: 'cms-pattern.js',
    lang: 'ts',
    code: `import { createPattern, resolveBoxStyle } from 'tabbied';

const loaders = {
  radius: () => import('tabbied/patterns/radius'),
  quilt: () => import('tabbied/patterns/quilt'),
  vitrail: () => import('tabbied/patterns/vitrail'),
};

export async function mountPattern(host, slug) {
  Object.assign(host.style, resolveBoxStyle({ aspectRatio: '3 / 2' }));
  const { default: pattern } = await loaders[slug]();
  return createPattern(host, { pattern });
}`,
  },
];
