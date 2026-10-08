import type { Metadata } from 'next';
import { radius } from 'tabbied/patterns';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Code } from 'components/react-docs-page/parts';
import { SETUP_SECTIONS } from 'components/react-docs-page/sections';
import { QuickStartDemo, RedrawDemo } from 'components/react-docs-page/GuideDemos';
import Example from 'components/react-docs-page/Example';
import { PaletteSwapDemo } from 'components/react-docs-page/PageDemos';
import {
  ExampleSections,
  ExportNotes,
  MotionGuide,
  SettingsGuide,
  SetupSection as Section,
  SizingGuide,
} from 'components/react-docs-page/SetupGuide';
import { VUE_RECIPES } from 'components/react-docs-page/examples/recipes/vue';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/vue's page. The package README's Vue section says the same things;
// keep the two in step. Its sections are every setup page's (SETUP_SECTIONS),
// in the same order.

export const metadata: Metadata = pageMetadata({
  title: 'Vue and Nuxt - Tabbied',
  description:
    'Render Tabbied generative patterns in Vue 3 and Nuxt with the tabbied/vue component: a server-rendered box with no layout shift, live props, redraw and export.',
  path: '/docs/vue/',
});

const installCode = `npm install tabbied`;

// The update sample's palettes, which the demo beside it draws.
const COOL = ['#0B1020', '#3E8BFF', '#3FFFB2'];
const WARM = ['#FFF4E6', '#E8590C'];
const list = (colors: string[]) => `[${colors.map((color) => `'${color}'`).join(', ')}]`;

const updatesCode = `<script setup>
import { ref } from 'vue';
import { TabbiedPattern } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

const palette = ref(${list(COOL)});
</script>

<template>
  <TabbiedPattern :pattern="radius" :palette="palette" :height="320" class="hero" />
  <button @click="palette = ${list(WARM)}">Warm</button>
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
      sections={SETUP_SECTIONS}
    >
      <Section id="introduction">
        <p>
          <Code>tabbied/vue</Code> is one component, <Code>TabbiedPattern</Code>,
          with the props, fits, palettes and options the{' '}
          <a href="/docs/react/">React component</a> takes, under the same
          names. In a template they are written in kebab case, the Vue way:{' '}
          <Code>aspect-ratio</Code>, <Code>redraw-interval</Code>.
        </p>
      </Section>

      <Section id="installation">
        <p>
          One package. Vue is an <em>optional</em> peer dependency: your app
          already has the Vue it renders with (3.3 or later).
        </p>
        <CodeBlock code={installCode} title="terminal" lang="sh" className={styles.codeStandalone} />
      </Section>

      <Section id="quick-start">
        <p>
          Import the component and a preset, then give it a box: here a{' '}
          <Code>height</Code>, with the width filling the parent. Import only
          the presets you render from <Code>tabbied/patterns</Code> and the
          bundler ships just those, a couple of KB each.
        </p>
        <QuickStartDemo setup="vue" />
      </Section>

      <Section id="sizing">
        <SizingGuide setup="vue" />
      </Section>

      <Section id="settings">
        <SettingsGuide setup="vue" />
      </Section>

      <Section id="updates">
        <p>
          When a prop changes, the component passes it on to the pattern
          already on the page, so a new palette or option redraws in place,
          with the design&apos;s own transition. A <Code>class</Code> or{' '}
          <Code>style</Code> on the component lands on its element, beside
          the box&apos;s own.
        </p>
        <Example code={updatesCode} title="App.vue" lang="vue">
          <PaletteSwapDemo pattern={radius} from={COOL} to={WARM} label="Warm" height={320} />
        </Example>
        <p>
          A template ref exposes <Code>redraw()</Code> for a new seed,{' '}
          <Code>exportImage()</Code> for a PNG, <Code>exportSvg()</Code> for
          a vector file and <Code>element</Code>, the{' '}
          <Code>&lt;css-doodle&gt;</Code> itself. The <Code>ready</Code> event
          fires once the first render is drawn.
        </p>
        <RedrawDemo setup="vue" />
        <ExportNotes />
      </Section>

      <Section id="motion">
        <MotionGuide setup="vue" />
      </Section>

      <Section id="server">
        <p>
          In Nuxt, the component renders on the server as the box alone: its
          final size, filled with the pattern&apos;s background color. The
          pattern mounts into it in the browser, so there is no layout shift
          and no hydration mismatch. No <Code>&lt;ClientOnly&gt;</Code>{' '}
          wrapper and no module to register: import it in a page or
          component as in the quick start.
        </p>
      </Section>

      <ExampleSections setup="vue" recipes={VUE_RECIPES} />

      <Section id="api">
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
