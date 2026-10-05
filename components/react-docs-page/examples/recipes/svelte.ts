// tabbied/svelte recipes for /docs/svelte: whole components in Svelte 5's
// runes, each paste-ready. Every one spreads tabbiedAttributes() beside the
// action, so a SvelteKit server render draws the box first. The Svelte 4
// form is on the page itself. No runtime imports.
import type { Recipe } from './types';

export const SVELTE_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: 'Put the pattern\'s own style in the props as `style`: `position: absolute; inset: 0` takes it out of the flow, so the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps its `z-index: -1` inside the section.',
    file: 'Hero.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const art = {
    pattern: radius,
    seed: 'launch',
    palette: ['#0B1020', '#1D3A8A', '#3E8BFF', '#3FFFB2'],
    density: 0.3,
    style: 'position: absolute; inset: 0; z-index: -1',
  };
</script>

<section class="hero">
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
  <h1>Patterns for every page</h1>
  <p>The section is as tall as this copy; the pattern fills it.</p>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    padding: 96px 24px;
    color: #fff;
  }
</style>`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'A seed picks the arrangement, so seeding each card with its id gives every card its own picture, the same one on every visit and in the server render.',
    file: 'PostGrid.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { quilt } from 'tabbied/patterns';

  let { posts } = $props();
</script>

<div class="grid">
  {#each posts as post (post.id)}
    {@const art = { pattern: quilt, seed: post.id, aspectRatio: '16 / 9' }}
    <article>
      <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
      <h3>{post.title}</h3>
    </article>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
</style>`,
  },
  {
    id: 'divider',
    group: 'layout',
    title: 'A section divider',
    says: 'A full-width strip: only a `height`, so the width fills the parent. A higher `density` keeps the cells small at a short height.',
    file: 'Divider.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { ortho } from 'tabbied/patterns';

  const art = { pattern: ortho, seed: 'divider', height: 48, density: 0.9 };
</script>

<div {...tabbiedAttributes(art)} use:tabbied={art}></div>`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette whose first color is `transparent` leaves the ground clear, so the parent\'s background image shows through. A lower `frequency` leaves more of it showing.',
    file: 'PhotoBanner.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const art = {
    pattern: radius,
    palette: ['transparent', '#FFFFFF', '#3FFFB2'],
    options: { frequency: 0.4 },
    aspectRatio: '21 / 9',
  };
</script>

<div style="background: url(/images/harbor.jpg) center / cover">
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
</div>`,
  },
  {
    id: 'brand',
    group: 'layout',
    title: 'One palette across several designs',
    says: 'A palette is just an array, so a brand\'s colors can dress any design: background first, then the inks.',
    file: 'BrandTiles.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { ortho, quilt, radius, vitrail } from 'tabbied/patterns';

  const brand = ['#0B1020', '#3E8BFF', '#3FFFB2', '#FF3D8B'];
  const tiles = [radius, quilt, vitrail, ortho].map((pattern) => ({
    pattern,
    palette: brand,
    seed: 'brand',
    aspectRatio: 1,
  }));
</script>

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px">
  {#each tiles as tile (tile.pattern.slug)}
    <div {...tabbiedAttributes(tile)} use:tabbied={tile}></div>
  {/each}
</div>`,
  },
  {
    id: 'classes',
    group: 'layout',
    title: 'Sized by class names',
    says: '`fill: false` writes no size inline, so the classes decide, breakpoints included. Without it, the inline `width: 100%; height: 100%` would beat a class.',
    file: 'Banner.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const art = { pattern: radius, fill: false };
</script>

<!-- Tailwind here, but any stylesheet works the same way. -->
<div class="h-40 w-full rounded-xl md:h-72" {...tabbiedAttributes(art)} use:tabbied={art}></div>`,
  },
  {
    id: 'labelled',
    group: 'layout',
    title: 'A pattern that means something',
    says: 'Patterns are decorative by default, hidden from assistive technology. Where one is content, `decorative: false` makes it an image with a label.',
    file: 'ArtFigure.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const art = {
    pattern: radius,
    seed: 'k9Pz',
    aspectRatio: 1,
    decorative: false,
    ariaLabel: 'Quarter circles in blue and green, packed edge to edge',
  };
</script>

<figure>
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
  <figcaption>Radius, seed k9Pz.</figcaption>
</figure>`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: 'Derive the props from state: when they change, the action passes them on and the pattern already on the page redraws, through the design\'s own transition.',
    file: 'ThemedBanner.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const palettes = {
    light: ['#FFF4E6', '#E8590C', '#1C1C1C'],
    dark: ['#0B1020', '#3E8BFF', '#3FFFB2'],
  };
  let theme = $state('dark');
  const art = $derived({ pattern: radius, seed: 'k9Pz', palette: palettes[theme], height: 240 });
</script>

<div {...tabbiedAttributes(art)} use:tabbied={art}></div>
<button onclick={() => (theme = theme === 'dark' ? 'light' : 'dark')}>Switch theme</button>`,
  },
  {
    id: 'system-theme',
    group: 'state',
    title: 'Follow the system color scheme',
    says: 'Read `prefers-color-scheme` in an effect, which runs only in the browser, and listen for changes; the server render uses the light palette.',
    file: 'SchemeBanner.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const LIGHT = ['#FFF4E6', '#E8590C', '#1C1C1C'];
  const DARK = ['#0B1020', '#3E8BFF', '#3FFFB2'];
  let dark = $state(false);

  $effect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => (dark = query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  });

  const art = $derived({ pattern: radius, seed: 'k9Pz', palette: dark ? DARK : LIGHT, aspectRatio: '3 / 1' });
</script>

<div {...tabbiedAttributes(art)} use:tabbied={art}></div>`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: 'Keep the seed in state to shuffle and to remember the result. `patternController(element).redraw()` does the same without state, when the seed need not be kept.',
    file: 'Shuffle.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let seed = $state('k9Pz');
  const art = $derived({ pattern: radius, seed, aspectRatio: '3 / 2' });
</script>

<div {...tabbiedAttributes(art)} use:tabbied={art}></div>
<button onclick={() => (seed = Math.random().toString(36).slice(2, 8))}>Shuffle</button>
<p>Seed: {seed}</p>`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'Swapping `pattern` replaces the design in place. Import the designs on offer, so the bundle carries those and no others.',
    file: 'DesignPicker.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { quilt, radius, vitrail } from 'tabbied/patterns';

  const designs = { radius, quilt, vitrail };
  let slug = $state('radius');
  const art = $derived({ pattern: designs[slug], seed: 'k9Pz', aspectRatio: '3 / 2' });
</script>

<select bind:value={slug}>
  {#each Object.entries(designs) as [key, design] (key)}
    <option value={key}>{design.name}</option>
  {/each}
</select>
<div {...tabbiedAttributes(art)} use:tabbied={art}></div>`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Option ids come from the design (`radius` has `frequency`, 0.2 to 1); `density` is the cell size, 0 coarse to 1 fine. Each change redraws in place.',
    file: 'Controls.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let frequency = $state(0.8);
  let density = $state(0.5);
  const art = $derived({ pattern: radius, seed: 'k9Pz', options: { frequency }, density, height: 280 });
</script>

<div {...tabbiedAttributes(art)} use:tabbied={art}></div>
<label>Frequency <input type="range" min="0.2" max="1" step="0.1" bind:value={frequency} /></label>
<label>Density <input type="range" min="0" max="1" step="0.05" bind:value={density} /></label>`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave `seed` out and set `redrawInterval`: the pattern reseeds on a timer and morphs between arrangements. `paused` holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'Ambient.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let hovered = $state(false);
  const art = $derived({ pattern: radius, redrawInterval: 4000, paused: hovered, height: 240 });
</script>

<div role="presentation" onmouseenter={() => (hovered = true)} onmouseleave={() => (hovered = false)}>
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
</div>`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: '`patternController(element)` returns the controller the action is driving: `exportImage()` saves a PNG at any scale and `exportSvg()` a vector file. Enable them from `onReady`, and check `supportsSvgExport()`: a few designs have no vector form.',
    file: 'Downloads.svelte',
    lang: 'svelte',
    code: `<script>
  import { supportsSvgExport } from 'tabbied';
  import { patternController, tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let host = $state();
  let ready = $state(false);
  const art = { pattern: radius, seed: 'k9Pz', aspectRatio: '3 / 2', onReady: () => (ready = true) };
  const vector = supportsSvgExport(radius);
</script>

<div bind:this={host} {...tabbiedAttributes(art)} use:tabbied={art}></div>
<button disabled={!ready} onclick={() => patternController(host)?.exportImage({ scale: 2, download: true, name: 'banner' })}>
  Download PNG
</button>
<button disabled={!ready || !vector} onclick={() => patternController(host)?.exportSvg({ download: true, name: 'banner' })}>
  Download SVG
</button>`,
  },
  {
    id: 'upload',
    group: 'state',
    title: 'Send the SVG to your server',
    says: 'Without `download`, `exportSvg()` resolves to the markup and its size, to store or post anywhere.',
    file: 'SaveArtwork.svelte',
    lang: 'svelte',
    code: `<script>
  import { patternController, tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let host = $state();
  const art = { pattern: radius, seed: 'k9Pz', width: 600, height: 400 };

  async function save() {
    const result = await patternController(host)?.exportSvg();
    if (!result) return;

    await fetch('/api/artwork', {
      method: 'POST',
      headers: { 'Content-Type': 'image/svg+xml' },
      body: result.svg,
    });
  }
</script>

<div bind:this={host} {...tabbiedAttributes(art)} use:tabbied={art}></div>
<button onclick={save}>Save artwork</button>`,
  },
  {
    id: 'lazy-designs',
    group: 'integration',
    title: 'Designs chosen at runtime, loaded on demand',
    says: 'When the slug comes from data, load each design when it is needed: every one is a module of its own at `tabbied/patterns/<slug>`. List the ones you offer so the bundler can split them.',
    file: 'CmsPattern.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';

  let { slug } = $props();

  const loaders = {
    radius: () => import('tabbied/patterns/radius'),
    quilt: () => import('tabbied/patterns/quilt'),
    vitrail: () => import('tabbied/patterns/vitrail'),
  };
  let design = $state(null);

  $effect(() => {
    const wanted = slug;
    loaders[wanted]?.().then((module) => {
      if (wanted === slug) design = module.default;
    });
  });
</script>

{#if design}
  {@const art = { pattern: design, aspectRatio: '3 / 2' }}
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
{:else}
  <!-- The same box while it loads, so nothing shifts. -->
  <div style="aspect-ratio: 3 / 2; background: #0b1020"></div>
{/if}`,
  },
  {
    id: 'sveltekit',
    group: 'integration',
    title: 'A SvelteKit page',
    says: 'Nothing to configure: `tabbiedAttributes()` runs on the server and draws the sized box in the ground color, and the action mounts the pattern into it once the page hydrates.',
    file: 'src/routes/+page.svelte',
    lang: 'svelte',
    code: `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const art = { pattern: radius, seed: 'k9Pz', aspectRatio: '16 / 9', maxWidth: 1200 };
</script>

<main>
  <div {...tabbiedAttributes(art)} use:tabbied={art}></div>
</main>`,
  },
];
