import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Callout, Code } from 'components/react-docs-page/parts';
import { SETUP_SECTIONS } from 'components/react-docs-page/sections';
import { QuickStartDemo, RedrawDemo } from 'components/react-docs-page/GuideDemos';
import {
  ExampleSections,
  ExportNotes,
  MotionGuide,
  SettingsGuide,
  SetupSection as Section,
  SizingGuide,
} from 'components/react-docs-page/SetupGuide';
import { SVELTE_RECIPES } from 'components/react-docs-page/examples/recipes/svelte';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/svelte's page. The package README's Svelte section says the same
// things; keep the two in step. Its sections are every setup page's
// (SETUP_SECTIONS), in the same order.

export const metadata: Metadata = pageMetadata({
  title: 'Svelte and SvelteKit - Tabbied',
  description:
    'Render Tabbied generative patterns in Svelte and SvelteKit with the tabbied/svelte action: a server-rendered box with no layout shift, live props, redraw and export.',
  path: '/docs/svelte/',
});

const installCode = `npm install tabbied`;

const updatesCode = `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let palette = $state(['#0B1020', '#3E8BFF', '#3FFFB2']);
  const props = $derived({ pattern: radius, palette, height: 320 });
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>
<button onclick={() => (palette = ['#FFF4E6', '#E8590C'])}>Warm</button>`;

// The same component without runes, for Svelte 4 (and Svelte 5's legacy
// mode): a plain `let` is reactive, `$:` derives, and events are `on:`.
const updatesLegacyCode = `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let palette = ['#0B1020', '#3E8BFF', '#3FFFB2'];
  $: props = { pattern: radius, palette, height: 320 };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>
<button on:click={() => (palette = ['#FFF4E6', '#E8590C'])}>Warm</button>`;

export default function SvelteDocsPage() {
  return (
    <DocsShell
      title="Svelte and SvelteKit"
      lede={
        <>
          Put any of the {PATTERN_COUNT} patterns on a Svelte page with one
          action. In SvelteKit the server render draws the box first, at its
          final size, so nothing shifts when the pattern arrives.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'Svelte 4 and 5', 'MIT license']}
      sections={SETUP_SECTIONS}
    >
      <Section id="introduction">
        <p>
          <Code>tabbied/svelte</Code> has two parts, used on the same element.
          The <Code>tabbied</Code> action mounts the pattern, follows changes
          to its props and removes it with the element.{' '}
          <Code>tabbiedAttributes()</Code> gives that element its size, its
          ground color and its accessibility attributes, and it runs on the
          server too.
        </p>
        <p>
          Nothing in it imports Svelte, so it works the same in Svelte 4 and 5
          and needs no Svelte compiler of its own. The patterns, fits, palettes
          and options are the ones the{' '}
          <a href="/docs/react/">React component</a> takes, under the same
          names.
        </p>
      </Section>

      <Section id="installation">
        <p>
          One package. Svelte is not a dependency of it: your app already has
          the Svelte it needs.
        </p>
        <CodeBlock code={installCode} title="terminal" lang="sh" className={styles.codeStandalone} />
      </Section>

      <Section id="quick-start">
        <p>
          Import the action and a preset, then pass the same props to both
          parts. Give the box a size: here a <Code>height</Code>, with the
          width filling the parent. Import only the presets you render from{' '}
          <Code>tabbied/patterns</Code> and the bundler ships just those, a
          couple of KB each.
        </p>
        <QuickStartDemo setup="svelte" />
      </Section>

      <Section id="sizing">
        <SizingGuide setup="svelte" />
      </Section>

      <Section id="settings">
        <SettingsGuide setup="svelte" />
      </Section>

      <Section id="updates">
        <p>
          When the props change, the action passes them on to the pattern
          already on the page, so a new palette or option redraws in place,
          with the design&apos;s own transition. Props that come out the same
          are skipped.
        </p>
        <CodeBlock code={updatesCode} title="+page.svelte" lang="svelte" className={styles.codeStandalone} />
        <p>
          The examples here use Svelte 5&apos;s runes. The action is the same
          in Svelte 4, where the component is written without them:
        </p>
        <CodeBlock
          code={updatesLegacyCode}
          title="+page.svelte (Svelte 4)"
          lang="svelte"
          className={styles.codeStandalone}
        />
        <p>
          <Code>patternController(element)</Code> returns the controller the
          action is driving: <Code>redraw()</Code> for a new seed,{' '}
          <Code>exportImage()</Code> for a PNG and <Code>exportSvg()</Code>{' '}
          for a vector file. It returns <Code>null</Code> before the action
          has run and after the element is gone.
        </p>
        <RedrawDemo setup="svelte" />
        <ExportNotes />
      </Section>

      <Section id="motion">
        <MotionGuide setup="svelte" />
      </Section>

      <Section id="server">
        <p>
          An action runs only in the browser. On a server render, an element
          with the action alone arrives empty and unsized, and the page moves
          when the pattern mounts. <Code>tabbiedAttributes()</Code> is what
          prevents that: it is pure, so SvelteKit runs it on the server, and
          the HTML carries the box at its final size, filled with the
          pattern&apos;s background color. The action then mounts into that
          box.
        </p>
        <p>
          There is nothing else to configure. Importing{' '}
          <Code>tabbied/svelte</Code> on the server is safe, and prerendered
          pages and <Code>adapter-static</Code> get the same box, since a
          prerender is a server render at build time.
        </p>
        <Callout>
          <p>
            Put inline style in the props as <Code>style</Code>, not in a{' '}
            <Code>style</Code> attribute beside the spread: Svelte keeps
            whichever comes last, and the spread carries the clipping the
            pattern needs. A <Code>class</Code> on the element is fine.
          </p>
        </Callout>
      </Section>

      <ExampleSections setup="svelte" recipes={SVELTE_RECIPES} />

      <Section id="api">
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Export</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.propName}>tabbied</td>
                <td>The action: mounts the pattern, updates it, destroys it.</td>
              </tr>
              <tr>
                <td className={styles.propName}>tabbiedAttributes(props)</td>
                <td>
                  The element&apos;s <Code>style</Code>, <Code>data-*</Code>{' '}
                  config and <Code>aria-*</Code> attributes, to spread. Pure.
                </td>
              </tr>
              <tr>
                <td className={styles.propName}>patternController(element)</td>
                <td>The controller for an element the action is on, or null.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The props are the React component&apos;s:{' '}
          <Code>pattern</Code>, <Code>seed</Code>, <Code>palette</Code>,{' '}
          <Code>options</Code>, <Code>fit</Code>, <Code>density</Code>,{' '}
          <Code>cellSize</Code>, <Code>coverRender</Code>, the box props (<Code>fill</Code>,{' '}
          <Code>width</Code>, <Code>height</Code>, <Code>maxWidth</Code>,{' '}
          <Code>maxHeight</Code>, <Code>aspectRatio</Code>),{' '}
          <Code>redrawInterval</Code>, <Code>paused</Code>,{' '}
          <Code>decorative</Code>, <Code>ariaLabel</Code> and{' '}
          <Code>onReady</Code>, plus <Code>style</Code> as a string. The{' '}
          <a href="/docs/concepts/">Concepts</a> page says what each one
          does, with every setup&apos;s name for it side by side.
        </p>
      </Section>
    </DocsShell>
  );
}
