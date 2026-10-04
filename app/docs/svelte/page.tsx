import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/svelte's page. The package README's Svelte section says the same
// things; keep the two in step.

export const metadata: Metadata = pageMetadata({
  title: 'Svelte and SvelteKit - Tabbied',
  description:
    'Render Tabbied generative patterns in Svelte and SvelteKit with the tabbied/svelte action: a server-rendered box with no layout shift, live props, redraw and export.',
  path: '/docs/svelte/',
});

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'sveltekit', label: 'SvelteKit' },
  { id: 'updates', label: 'Changing props' },
  { id: 'controller', label: 'Redraw & export' },
  { id: 'api', label: 'API reference' },
];

const Section = docsSection(SECTIONS);

const installCode = `npm install tabbied`;

const quickStartCode = `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const props = { pattern: radius, seed: 'k9Pz', aspectRatio: '3 / 2' };
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>`;

const updatesCode = `<script>
  import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  let palette = $state(['#0B1020', '#3E8BFF', '#3FFFB2']);
  const props = $derived({ pattern: radius, palette, height: 320 });
</script>

<div {...tabbiedAttributes(props)} use:tabbied={props}></div>
<button onclick={() => (palette = ['#FFF4E6', '#E8590C'])}>Warm</button>`;

const controllerCode = `<script>
  import { tabbied, tabbiedAttributes, patternController } from 'tabbied/svelte';
  import { radius } from 'tabbied/patterns';

  const props = { pattern: radius, height: 320 };
  let host = $state();
</script>

<div bind:this={host} {...tabbiedAttributes(props)} use:tabbied={props}></div>

<button onclick={() => patternController(host)?.redraw()}>Redraw</button>
<button onclick={() => patternController(host)?.exportImage()}>Export PNG</button>`;

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
      sections={SECTIONS}
    >
      <Section id="introduction" title="Introduction">
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

      <Section id="installation" title="Installation">
        <p>
          One package. Svelte is not a dependency of it: your app already has
          the Svelte it needs.
        </p>
        <CodeBlock code={installCode} title="terminal" lang="sh" className={styles.codeStandalone} />
      </Section>

      <Section id="quick-start" title="Quick start">
        <p>
          Import the action and a preset, then pass the same props to both
          parts. The pattern fills its box, so give the box a size: an{' '}
          <Code>aspectRatio</Code>, a <Code>height</Code>, or a parent with a
          height of its own.
        </p>
        <CodeBlock code={quickStartCode} title="+page.svelte" lang="svelte" className={styles.codeStandalone} />
        <p>
          Import only the presets you render from <Code>tabbied/patterns</Code>{' '}
          and the bundler ships just those, a couple of KB each.
        </p>
      </Section>

      <Section id="sveltekit" title="SvelteKit">
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

      <Section id="updates" title="Changing props">
        <p>
          When the props change, the action passes them on to the pattern
          already on the page, so a new palette or option redraws in place,
          with the design&apos;s own transition. Props that come out the same
          are skipped.
        </p>
        <CodeBlock code={updatesCode} title="+page.svelte" lang="svelte" className={styles.codeStandalone} />
      </Section>

      <Section id="controller" title="Redraw & export">
        <p>
          <Code>patternController(element)</Code> returns the controller the
          action is driving: <Code>redraw()</Code> for a new seed,{' '}
          <Code>exportImage()</Code> for a PNG and <Code>exportSvg()</Code>{' '}
          for a vector file. It returns <Code>null</Code> before the action
          has run and after the element is gone.
        </p>
        <CodeBlock code={controllerCode} title="+page.svelte" lang="svelte" className={styles.codeStandalone} />
      </Section>

      <Section id="api" title="API reference">
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
          <Code>cellSize</Code>, the box props (<Code>fill</Code>,{' '}
          <Code>width</Code>, <Code>height</Code>, <Code>maxWidth</Code>,{' '}
          <Code>maxHeight</Code>, <Code>aspectRatio</Code>),{' '}
          <Code>redrawInterval</Code>, <Code>paused</Code>,{' '}
          <Code>decorative</Code>, <Code>ariaLabel</Code> and{' '}
          <Code>onReady</Code>, plus <Code>style</Code> as a string. The{' '}
          <a href="/docs/react/#api">React reference</a> describes each one.
        </p>
      </Section>
    </DocsShell>
  );
}
