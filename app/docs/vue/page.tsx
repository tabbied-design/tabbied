import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import SizingExamples, { Prose } from 'components/react-docs-page/SizingExamples';
import RecipeExamples from 'components/react-docs-page/RecipeExamples';
import { VUE_RECIPES } from 'components/react-docs-page/examples/recipes/vue';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/vue's page. The package README's Vue section says the same things;
// keep the two in step.

export const metadata: Metadata = pageMetadata({
  title: 'Vue and Nuxt - Tabbied',
  description:
    'Render Tabbied generative patterns in Vue 3 and Nuxt with the tabbied/vue component: a server-rendered box with no layout shift, live props, redraw and export.',
  path: '/docs/vue/',
});

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'nuxt', label: 'Nuxt' },
  { id: 'updates', label: 'Changing props' },
  { id: 'template-ref', label: 'Redraw & export' },
  { id: 'sizing', label: 'Sizing, case by case' },
  { id: 'recipes-layout', label: 'Recipes: layout' },
  { id: 'recipes-state', label: 'Recipes: interaction' },
  { id: 'recipes-integration', label: 'Recipes: Vue and Nuxt' },
  { id: 'api', label: 'API reference' },
];

const Section = docsSection(SECTIONS);

const installCode = `npm install tabbied`;

const quickStartCode = `<script setup>
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';
</script>

<template>
  <TabbiedPattern :pattern="radius" seed="k9Pz" aspect-ratio="3 / 2" />
</template>`;

const updatesCode = `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const palette = ref(['#0B1020', '#3E8BFF', '#3FFFB2']);
</script>

<template>
  <TabbiedPattern :pattern="radius" :palette="palette" :height="320" class="hero" />
  <button @click="palette = ['#FFF4E6', '#E8590C']">Warm</button>
</template>`;

const templateRefCode = `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const pattern = ref(null);
</script>

<template>
  <TabbiedPattern ref="pattern" :pattern="radius" :height="320" @ready="console.log('drawn')" />
  <button @click="pattern?.redraw()">Redraw</button>
  <button @click="pattern?.exportImage()">Export PNG</button>
</template>`;

export default function VueDocsPage() {
  return (
    <DocsShell
      title="Vue and Nuxt"
      lede={
        <>
          Put any of the {PATTERN_COUNT} patterns on a Vue page with one
          component. In Nuxt the server render draws the box first, at its
          final size, so nothing shifts when the pattern arrives.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'Vue 3.3+', 'MIT license']}
      sections={SECTIONS}
    >
      <Section id="introduction" title="Introduction">
        <p>
          <Code>tabbied/vue</Code> is one component, <Code>TabbiedPattern</Code>,
          with the props, fits, palettes and options the{' '}
          <a href="/docs/react/">React component</a> takes, under the same
          names. In a template they are written in kebab case, the Vue way:{' '}
          <Code>aspect-ratio</Code>, <Code>redraw-interval</Code>.
        </p>
      </Section>

      <Section id="installation" title="Installation">
        <p>
          One package. Vue is an <em>optional</em> peer dependency: your app
          already has the Vue it renders with (3.3 or later).
        </p>
        <CodeBlock code={installCode} title="terminal" lang="sh" className={styles.codeStandalone} />
      </Section>

      <Section id="quick-start" title="Quick start">
        <p>
          Import the component and a preset. The pattern fills its box, so give
          the box a size: an <Code>aspect-ratio</Code>, a <Code>height</Code>,
          or a parent with a height of its own.
        </p>
        <CodeBlock code={quickStartCode} title="App.vue" lang="vue" className={styles.codeStandalone} />
        <p>
          Import only the presets you render from <Code>tabbied/patterns</Code>{' '}
          and the bundler ships just those, a couple of KB each.
        </p>
      </Section>

      <Section id="nuxt" title="Nuxt">
        <p>
          The component renders on the server as the box alone: its final
          size, filled with the pattern&apos;s background color. The pattern
          mounts into it in the browser, so there is no layout shift and no
          hydration mismatch. No <Code>&lt;ClientOnly&gt;</Code> wrapper and
          no module to register: import it in a page or component as above.
        </p>
      </Section>

      <Section id="updates" title="Changing props">
        <p>
          When a prop changes, the component passes it on to the pattern
          already on the page, so a new palette or option redraws in place,
          with the design&apos;s own transition. A <Code>class</Code> or{' '}
          <Code>style</Code> on the component lands on its element, beside
          the box&apos;s own.
        </p>
        <CodeBlock code={updatesCode} title="App.vue" lang="vue" className={styles.codeStandalone} />
      </Section>

      <Section id="template-ref" title="Redraw & export">
        <p>
          A template ref exposes <Code>redraw()</Code> for a new seed,{' '}
          <Code>exportImage()</Code> for a PNG, <Code>exportSvg()</Code> for
          a vector file and <Code>element</Code>, the{' '}
          <Code>&lt;css-doodle&gt;</Code> itself. The <Code>ready</Code> event
          fires once the first render is drawn.
        </p>
        <CodeBlock code={templateRefCode} title="App.vue" lang="vue" className={styles.codeStandalone} />
      </Section>

      <Section id="sizing" title="Sizing, case by case">
        <p>
          <Prose text={'Each case below was measured in a browser, in an 800px-wide parent: the drawing is the box the pattern gets, to scale, and the code is all it takes. Every case uses `radius`; any design behaves the same.'} />
        </p>
        <SizingExamples setup="vue" />
      </Section>

      <Section id="recipes-layout" title="Recipes: layout">
        <p>
          <Prose text={'Whole files, imports included, ready to paste. Swap the design for any slug in the gallery.'} />
        </p>
        <RecipeExamples recipes={VUE_RECIPES} group="layout" />
      </Section>

      <Section id="recipes-state" title="Recipes: interaction">
        <p>
          <Prose text={'Patterns that answer to state: colors, seeds, designs, options, motion and export.'} />
        </p>
        <RecipeExamples recipes={VUE_RECIPES} group="state" />
      </Section>

      <Section id="recipes-integration" title="Recipes: Vue and Nuxt">
        <p>
          <Prose text={'Where the pattern meets the rest of an app.'} />
        </p>
        <RecipeExamples recipes={VUE_RECIPES} group="integration" />
      </Section>

      <Section id="api" title="API reference">
        <p>
          The props are the React component&apos;s: <Code>pattern</Code>{' '}
          (required), <Code>seed</Code>, <Code>palette</Code>,{' '}
          <Code>options</Code>, <Code>fit</Code>, <Code>density</Code>,{' '}
          <Code>cell-size</Code>, the box props (<Code>fill</Code>,{' '}
          <Code>width</Code>, <Code>height</Code>, <Code>max-width</Code>,{' '}
          <Code>max-height</Code>, <Code>aspect-ratio</Code>),{' '}
          <Code>cover-render</Code>, <Code>redraw-interval</Code>,{' '}
          <Code>paused</Code>, <Code>decorative</Code> and{' '}
          <Code>aria-label</Code>. <Code>onReady</Code> is the{' '}
          <Code>ready</Code> event. The{' '}
          <a href="/docs/concepts/">Concepts</a> page says what each one
          does, and <Code>TabbiedPatternExposed</Code> types the template
          ref.
        </p>
      </Section>
    </DocsShell>
  );
}
