// tabbied/vue recipes for /docs/vue: whole single-file components, so each
// can be pasted into an app as it is. lib/docsExamples.test.mjs compiles
// every one with Vue's own compiler. No runtime imports.
import type { Recipe } from './types';

export const VUE_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: 'A `style` on the component lands on its element, so `position: absolute; inset: 0` takes the pattern out of the flow: the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps the pattern\'s `z-index: -1` inside the section.',
    file: 'TheHero.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const palette = ['#0B1020', '#1D3A8A', '#3E8BFF', '#3FFFB2'];
</script>

<template>
  <section class="hero">
    <TabbiedPattern :pattern="radius" seed="launch" :palette="palette" :density="0.3" class="hero-art" />
    <h1>Patterns for every page</h1>
    <p>The section is as tall as this copy; the pattern fills it.</p>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  padding: 96px 24px;
  color: #fff;
}

.hero-art {
  position: absolute;
  inset: 0;
  z-index: -1;
}
</style>`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'A seed picks the arrangement, so seeding each card with its id gives every card its own picture, the same one on every visit and in the server render.',
    file: 'PostGrid.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { quilt } from 'tabbied/patterns';

defineProps({ posts: { type: Array, required: true } });
</script>

<template>
  <div class="grid">
    <article v-for="post in posts" :key="post.id">
      <TabbiedPattern :pattern="quilt" :seed="post.id" aspect-ratio="16 / 9" />
      <h3>{{ post.title }}</h3>
    </article>
  </div>
</template>

<style scoped>
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
    file: 'TheDivider.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { ortho } from 'tabbied/patterns';
</script>

<template>
  <TabbiedPattern :pattern="ortho" seed="divider" :height="48" :density="0.9" />
</template>`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette whose first color is `transparent` leaves the ground clear, so the parent\'s background image shows through. A lower `frequency` leaves more of it showing.',
    file: 'PhotoBanner.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <div style="background: url(/images/harbor.jpg) center / cover">
    <TabbiedPattern
      :pattern="radius"
      :palette="['transparent', '#FFFFFF', '#3FFFB2']"
      :options="{ frequency: 0.4 }"
      aspect-ratio="21 / 9"
    />
  </div>
</template>`,
  },
  {
    id: 'brand',
    group: 'layout',
    title: 'One palette across several designs',
    says: 'A palette is just an array, so a brand\'s colors can dress any design: background first, then the inks.',
    file: 'BrandTiles.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { ortho, quilt, radius, vitrail } from 'tabbied/patterns';

const brand = ['#0B1020', '#3E8BFF', '#3FFFB2', '#FF3D8B'];
const designs = [radius, quilt, vitrail, ortho];
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px">
    <TabbiedPattern v-for="design in designs" :key="design.slug"
      :pattern="design" :palette="brand" seed="brand" :aspect-ratio="1" />
  </div>
</template>`,
  },
  {
    id: 'classes',
    group: 'layout',
    title: 'Sized by class names',
    says: '`:fill="false"` writes no size inline, so the classes decide, breakpoints included. Without it, the inline `width: 100%; height: 100%` would beat a class.',
    file: 'TheBanner.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <!-- Tailwind here, but any stylesheet works the same way. -->
  <TabbiedPattern :pattern="radius" :fill="false" class="h-40 w-full rounded-xl md:h-72" />
</template>`,
  },
  {
    id: 'labelled',
    group: 'layout',
    title: 'A pattern that means something',
    says: 'Patterns are decorative by default, hidden from assistive technology. Where one is content, `:decorative="false"` makes it an image with a label.',
    file: 'ArtFigure.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <figure>
    <TabbiedPattern
      :pattern="radius"
      seed="k9Pz"
      :aspect-ratio="1"
      :decorative="false"
      aria-label="Quarter circles in blue and green, packed edge to edge"
    />
    <figcaption>Radius, seed k9Pz.</figcaption>
  </figure>
</template>`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: 'A new `palette` redraws the pattern already on the page, through the design\'s own transition; nothing is remounted.',
    file: 'ThemedBanner.vue',
    lang: 'vue',
    code: `<script setup>
import { computed, ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const palettes = {
  light: ['#FFF4E6', '#E8590C', '#1C1C1C'],
  dark: ['#0B1020', '#3E8BFF', '#3FFFB2'],
};
const theme = ref('dark');
const palette = computed(() => palettes[theme.value]);
</script>

<template>
  <TabbiedPattern :pattern="radius" seed="k9Pz" :palette="palette" :height="240" />
  <button @click="theme = theme === 'dark' ? 'light' : 'dark'">Switch theme</button>
</template>`,
  },
  {
    id: 'system-theme',
    group: 'state',
    title: 'Follow the system color scheme',
    says: 'Read `prefers-color-scheme` once mounted and listen for changes; the server render and the first paint use the light palette.',
    file: 'SchemeBanner.vue',
    lang: 'vue',
    code: `<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const LIGHT = ['#FFF4E6', '#E8590C', '#1C1C1C'];
const DARK = ['#0B1020', '#3E8BFF', '#3FFFB2'];
const dark = ref(false);
let query;
const sync = () => (dark.value = query.matches);

onMounted(() => {
  query = window.matchMedia('(prefers-color-scheme: dark)');
  sync();
  query.addEventListener('change', sync);
});
onBeforeUnmount(() => query?.removeEventListener('change', sync));
</script>

<template>
  <TabbiedPattern :pattern="radius" seed="k9Pz" :palette="dark ? DARK : LIGHT" aspect-ratio="3 / 1" />
</template>`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: 'Keep the seed in a ref to shuffle and to remember the result. The template ref\'s `redraw()` does the same without state, when the seed need not be kept.',
    file: 'ShuffleCard.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const seed = ref('k9Pz');
const shuffle = () => (seed.value = Math.random().toString(36).slice(2, 8));
</script>

<template>
  <TabbiedPattern :pattern="radius" :seed="seed" aspect-ratio="3 / 2" />
  <button @click="shuffle">Shuffle</button>
  <p>Seed: {{ seed }}</p>
</template>`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'Swapping `pattern` replaces the design in place. Import the designs on offer, so the bundle carries those and no others.',
    file: 'DesignPicker.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { quilt, radius, vitrail } from 'tabbied/patterns';

const designs = { radius, quilt, vitrail };
const slug = ref('radius');
</script>

<template>
  <select v-model="slug">
    <option v-for="(design, key) in designs" :key="key" :value="key">{{ design.name }}</option>
  </select>
  <TabbiedPattern :pattern="designs[slug]" seed="k9Pz" aspect-ratio="3 / 2" />
</template>`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Option ids come from the design (`radius` has `frequency`, 0.2 to 1); `density` is the cell size, 0 coarse to 1 fine. Each change redraws in place.',
    file: 'PatternControls.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const frequency = ref(0.8);
const density = ref(0.5);
</script>

<template>
  <TabbiedPattern :pattern="radius" seed="k9Pz" :options="{ frequency }" :density="density" :height="280" />
  <label>Frequency <input v-model.number="frequency" type="range" min="0.2" max="1" step="0.1" /></label>
  <label>Density <input v-model.number="density" type="range" min="0" max="1" step="0.05" /></label>
</template>`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave `seed` out and set `redraw-interval`: the pattern reseeds on a timer and morphs between arrangements. `paused` holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'AmbientPattern.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const hovered = ref(false);
</script>

<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false">
    <TabbiedPattern :pattern="radius" :redraw-interval="4000" :paused="hovered" :height="240" />
  </div>
</template>`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: 'The template ref\'s `exportImage()` saves a PNG at any scale and `exportSvg()` a vector file. Enable them on the `ready` event, once there is a drawing to export, and check `supportsSvgExport()`: a few designs have no vector form.',
    file: 'DownloadButtons.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { supportsSvgExport } from 'tabbied';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const pattern = ref(null);
const ready = ref(false);
const vector = supportsSvgExport(radius);
</script>

<template>
  <TabbiedPattern ref="pattern" :pattern="radius" seed="k9Pz" aspect-ratio="3 / 2" @ready="ready = true" />
  <button :disabled="!ready" @click="pattern?.exportImage({ scale: 2, download: true, name: 'banner' })">
    Download PNG
  </button>
  <button :disabled="!ready || !vector" @click="pattern?.exportSvg({ download: true, name: 'banner' })">
    Download SVG
  </button>
</template>`,
  },
  {
    id: 'upload',
    group: 'state',
    title: 'Send the SVG to your server',
    says: 'Without `download`, `exportSvg()` resolves to the markup and its size, to store or post anywhere.',
    file: 'SaveArtwork.vue',
    lang: 'vue',
    code: `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const pattern = ref(null);

async function save() {
  const result = await pattern.value?.exportSvg();
  if (!result) return;

  await fetch('/api/artwork', {
    method: 'POST',
    headers: { 'Content-Type': 'image/svg+xml' },
    body: result.svg,
  });
}
</script>

<template>
  <TabbiedPattern ref="pattern" :pattern="radius" seed="k9Pz" :width="600" :height="400" />
  <button @click="save">Save artwork</button>
</template>`,
  },
  {
    id: 'lazy-designs',
    group: 'integration',
    title: 'Designs chosen at runtime, loaded on demand',
    says: 'When the slug comes from data, load each design when it is needed: every one is a module of its own at `tabbied/patterns/<slug>`. List the ones you offer so the bundler can split them.',
    file: 'CmsPattern.vue',
    lang: 'vue',
    code: `<script setup>
import { shallowRef, watchEffect } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';

const props = defineProps({ slug: { type: String, required: true } });

const loaders = {
  radius: () => import('tabbied/patterns/radius'),
  quilt: () => import('tabbied/patterns/quilt'),
  vitrail: () => import('tabbied/patterns/vitrail'),
};
const design = shallowRef(null);

watchEffect(async () => {
  const slug = props.slug;
  const module = await loaders[slug]?.();
  if (module && slug === props.slug) design.value = module.default;
});
</script>

<template>
  <TabbiedPattern v-if="design" :pattern="design" aspect-ratio="3 / 2" />
  <!-- The same box while it loads, so nothing shifts. -->
  <div v-else style="aspect-ratio: 3 / 2; background: #0b1020" />
</template>`,
  },
  {
    id: 'nuxt',
    group: 'integration',
    title: 'A Nuxt page',
    says: 'Nothing to register and no `<ClientOnly>`: the server renders the sized box in the ground color, and the pattern draws into it in the browser.',
    file: 'pages/index.vue',
    lang: 'vue',
    code: `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <main>
    <TabbiedPattern :pattern="radius" seed="k9Pz" aspect-ratio="16 / 9" :max-width="1200" />
  </main>
</template>`,
  },
];
