import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/element's page. The package README's web component section says
// the same things; keep the two in step.

export const metadata: Metadata = pageMetadata({
  title: 'Web component - Tabbied',
  description:
    'The <tabbied-pattern> custom element: Tabbied generative patterns in plain HTML or any framework, from one script tag, loading only the designs a page uses.',
  path: '/docs/web-component/',
});

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'cdn', label: 'From a CDN' },
  { id: 'sizing', label: 'Sizing the box' },
  { id: 'bundler', label: 'In a bundled app' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'scripting', label: 'Scripting it' },
  { id: 'api', label: 'API reference' },
];

const Section = docsSection(SECTIONS);

const SCRIPT_URL = `https://cdn.jsdelivr.net/npm/tabbied@${PACKAGE_VERSION}/dist/element/tabbied-element.js`;

const cdnCode = `<tabbied-pattern
  pattern="radius"
  seed="k9Pz"
  palette="#0B1020, #3E8BFF, #3FFFB2"
  style="display: block; aspect-ratio: 3 / 2; background: #0B1020"
></tabbied-pattern>

<script type="module" src="${SCRIPT_URL}"></script>`;

const bundlerCode = `import { definePatterns } from 'tabbied/element';
import { radius, windowpane } from 'tabbied/patterns';

// Before the elements upgrade: these two, and nothing else, are bundled.
definePatterns({ radius, windowpane });`;

const vueConfig = `// vite.config.js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag === 'tabbied-pattern' },
      },
    }),
  ],
};`;

const scriptingCode = `const pattern = document.querySelector('tabbied-pattern');

pattern.addEventListener('ready', () => console.log('drawn'));

pattern.setAttribute('palette', '#FFF4E6, #E8590C'); // redraws in place
pattern.redraw();                                     // a new seed
const { svg } = await pattern.exportSvg();            // a vector file`;

export default function WebComponentDocsPage() {
  return (
    <DocsShell
      title="Web component"
      lede={
        <>
          Put any of the {PATTERN_COUNT} patterns on any page with one tag.
          Plain HTML, a CMS, or any framework that renders HTML: one script,
          and the page loads only the designs it names.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'Custom element', 'MIT license']}
      sections={SECTIONS}
    >
      <Section id="introduction" title="Introduction">
        <p>
          <Code>&lt;tabbied-pattern&gt;</Code> is a custom element. Its
          attributes are the settings the{' '}
          <a href="/docs/react/">React component</a> takes as props, written
          as HTML: <Code>pattern</Code>, <Code>seed</Code>,{' '}
          <Code>palette</Code>, <Code>options</Code>, <Code>fit</Code>,{' '}
          <Code>density</Code> and the rest. Change one and the pattern
          redraws in place. Remove the element and it is cleaned up.
        </p>
      </Section>

      <Section id="cdn" title="From a CDN">
        <p>
          One script defines the element, with everything it needs inside.
          Each design is a separate file next to it, and the element fetches
          only the ones the page names, a couple of KB each.
        </p>
        <CodeBlock code={cdnCode} title="index.html" lang="html" className={styles.codeStandalone} />
        <p>
          Pin the version, as here, so the page keeps drawing what it drew.
          unpkg serves the same files at the same path. To host them yourself,
          copy the package&apos;s <Code>dist/element/</Code> and{' '}
          <Code>dist/patterns/</Code> folders side by side.
        </p>
      </Section>

      <Section id="sizing" title="Sizing the box">
        <p>
          A pattern has no size of its own, so give the element one: a{' '}
          <Code>height</Code>, an <Code>aspect-ratio</Code>, or a parent with
          a height. Write it in the element&apos;s <Code>style</Code>, with{' '}
          <Code>display: block</Code> and the pattern&apos;s background
          color. That style applies before the script has loaded, so the box
          is already at its final size and the page does not shift when the
          pattern appears. The same holds for a page rendered on a server.
        </p>
        <Callout>
          <p>
            Without <Code>display: block</Code> the element is inline until
            the script runs, and an inline box ignores{' '}
            <Code>aspect-ratio</Code>: the pattern has nothing to fill.
          </p>
        </Callout>
      </Section>

      <Section id="bundler" title="In a bundled app">
        <p>
          With npm and a bundler, import the element from{' '}
          <Code>tabbied/element</Code>. A bundler cannot follow a slug written
          in markup, so register the designs the app uses. The bundle then
          carries exactly those, and nothing is fetched:
        </p>
        <CodeBlock code={bundlerCode} title="main.js" lang="ts" className={styles.codeStandalone} />
        <p>
          Or set the element&apos;s <Code>pattern</Code> property to the
          design itself, which needs no registering at all. Importing{' '}
          <Code>tabbied/element</Code> on a server is safe: it defines the
          element only where there is a browser.
        </p>
      </Section>

      <Section id="frameworks" title="Frameworks">
        <p>
          <strong>React 19</strong> passes props to a custom element as
          properties, so <Code>pattern={'{radius}'}</Code> and{' '}
          <Code>palette={"{['#0B1020', '#3E8BFF']}"}</Code> both work.
          Earlier versions of React only set attributes, so use{' '}
          <a href="/docs/react/">tabbied/react</a> there.{' '}
          <strong>Svelte</strong>, <strong>Solid</strong> and{' '}
          <strong>Angular</strong> set properties too. Angular needs{' '}
          <Code>CUSTOM_ELEMENTS_SCHEMA</Code> in the component that uses the
          tag. <strong>Vue</strong> needs to be told the tag is not one of
          its own components:
        </p>
        <CodeBlock code={vueConfig} title="vite.config.js" lang="ts" className={styles.codeStandalone} />
        <p>
          Vue and Svelte also have their own entry points,{' '}
          <a href="/docs/vue/">tabbied/vue</a> and{' '}
          <a href="/docs/svelte/">tabbied/svelte</a>, with typed props and a
          server-rendered placeholder worked out from the props. Use the
          element where a framework has none, or where one tag in plain HTML
          is simpler.
        </p>
      </Section>

      <Section id="scripting" title="Scripting it">
        <CodeBlock code={scriptingCode} title="script.js" lang="ts" className={styles.codeStandalone} />
        <p>
          The <Code>ready</Code> event fires once the first render is drawn.{' '}
          <Code>error</Code> fires when a design cannot be loaded, with the
          reason in <Code>event.detail</Code>. Moving the element within the
          page keeps its pattern; only taking it out of the page ends it.
        </p>
      </Section>

      <Section id="api" title="API reference">
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>What it sets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.propName}>pattern</td>
                <td>The design&apos;s slug. Required; as a property it also takes a definition.</td>
              </tr>
              <tr>
                <td className={styles.propName}>seed</td>
                <td>The arrangement. Omit for a random one.</td>
              </tr>
              <tr>
                <td className={styles.propName}>palette</td>
                <td>Colors, comma separated, background first. As a property, an array.</td>
              </tr>
              <tr>
                <td className={styles.propName}>options</td>
                <td>
                  <Code>id: value</Code> pairs separated by <Code>;</Code>. As
                  a property, an object.
                </td>
              </tr>
              <tr>
                <td className={styles.propName}>fit</td>
                <td>
                  <Code>grid</Code> (default), <Code>cover</Code> or{' '}
                  <Code>fixed</Code>.
                </td>
              </tr>
              <tr>
                <td className={styles.propName}>density, cell-size</td>
                <td>How fine the cells are: 0 to 1, or a cell size in px.</td>
              </tr>
              <tr>
                <td className={styles.propName}>width, height</td>
                <td>The canvas size in px, for <Code>fit=&quot;fixed&quot;</Code>.</td>
              </tr>
              <tr>
                <td className={styles.propName}>cover-render</td>
                <td>
                  The render size for <Code>fit=&quot;cover&quot;</Code>, as{' '}
                  <Code>800x800</Code>.
                </td>
              </tr>
              <tr>
                <td className={styles.propName}>redraw-interval, paused</td>
                <td>Reseed every N ms; hold the timer. Off under reduced motion.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Methods: <Code>redraw(seed?)</Code>, <Code>exportImage()</Code>,{' '}
          <Code>exportSvg()</Code>, <Code>refresh()</Code>, and the{' '}
          <Code>controller</Code> property. From the module:{' '}
          <Code>definePatterns()</Code>, and <Code>setPatternsBase(url)</Code>{' '}
          for design files kept somewhere other than beside the script. The
          element is decorative (<Code>aria-hidden</Code>) unless it has an{' '}
          <Code>aria-label</Code>, which makes it an image.
        </p>
      </Section>
    </DocsShell>
  );
}
