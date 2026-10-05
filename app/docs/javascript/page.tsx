import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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
import { JAVASCRIPT_RECIPES } from 'components/react-docs-page/examples/recipes/javascript';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The framework-free core's page: createPattern(), the controller it
// returns, resolveBoxStyle() and hydratePatterns()'s options. Every other
// setup is built on this, and until this page it was a section of
// /docs/react. The package README's "Core" section says the same things;
// keep the two in step. Its sections are every setup page's
// (SETUP_SECTIONS), in the same order.

export const metadata: Metadata = pageMetadata({
  title: 'JavaScript - Tabbied',
  description:
    'The framework-free Tabbied core: createPattern() on any element, the controller it returns, resolveBoxStyle() for sizing, and hydratePatterns() for markup.',
  path: '/docs/javascript/',
});

const installCode = `npm install tabbied`;

const importCode = `import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';`;

const sizingCode = `import { resolveBoxStyle } from 'tabbied';

// Fill the width, cap it, and let the ratio set the height.
Object.assign(host.style, resolveBoxStyle({ maxWidth: 960, aspectRatio: '3 / 2' }));

// Pin one axis; numbers are px, strings are CSS.
Object.assign(host.style, resolveBoxStyle({ height: 320 }));`;

const controllerCode = `// Only what changed reaches the page.
controller.update({ palette: ['#FFF4E6', '#E8590C'], options: { frequency: 0.6 } });

controller.redraw();        // a new seed, morphing into the new arrangement
controller.redraw('k9Pz');  // or a seed of your own

const { svg } = await controller.exportSvg();
await controller.exportImage({ scale: 2, download: true });

// When the host leaves the page: stops its timers and observers.
controller.destroy();`;

const readyCode = `const controller = createPattern(host, {
  pattern: radius,
  // Under the measured fits (grid, the default, and cover) the pattern
  // mounts once the host has a size, a frame or so later.
  onReady: async () => {
    const { svg } = await controller.exportSvg();
  },
});`;

const hydrateCode = `import { hydratePatterns } from 'tabbied';
import { radius, vitrail } from 'tabbied/patterns';

const mounted = hydratePatterns({
  patterns: { radius, vitrail },        // the designs the markup names
  root: document.querySelector('main'), // optional: where to look
  defaults: { redrawInterval: 5200 },   // optional: merged into every one
  onError: (error, element) => element.remove(),
});

// Each element with its controller.
mounted.forEach(({ controller }) => controller.redraw());`;

const CONTROLLER: [string, ReactNode][] = [
  [
    'update(config)',
    <>Merges config changes in. Only real differences reach the page, so calling it on every change is cheap.</>,
  ],
  ['redraw(seed?)', <>A new seed, or the one given, morphing through the design&apos;s own transition.</>],
  [
    'exportSvg(options?)',
    <>
      Vector SVG, as <Code>{'{ svg }'}</Code>. Waits for a redraw in flight. Not available for the designs
      the catalog marks as raster only.
    </>,
  ],
  [
    'exportImage(options?)',
    <>
      PNG through css-doodle, at <Code>scale</Code>; <Code>download: true</Code> saves it.
    </>,
  ],
  [
    'destroy()',
    <>Removes the pattern and stops its timers and observers. A destroyed controller ignores every call.</>,
  ],
  [
    'element',
    <>
      The live <Code>&lt;css-doodle&gt;</Code> element, or null before it mounts and after{' '}
      <Code>destroy()</Code>.
    </>,
  ],
];

export default function JavaScriptDocsPage() {
  return (
    <DocsShell
      title="JavaScript"
      lede={
        <>
          The framework-free core every other setup is built on: put any of
          the {PATTERN_COUNT} patterns on any element and drive it from plain
          JavaScript.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'No framework', 'MIT license']}
      sections={SETUP_SECTIONS}
    >
      <Section id="introduction">
        <p>
          <Code>createPattern(host, config)</Code> mounts a pattern into an
          element you own and returns a controller for it. The React and Vue
          components, the Svelte action and the web component are each a
          lifecycle around this one call, so the config is the settings they
          take, with the same names as in React (the{' '}
          <a href="/docs/concepts/">Concepts</a> page says what each one
          does). The redraw timer and its reduced-motion, hidden-tab and
          off-screen gates live in the controller, so nothing here needs
          reimplementing.
        </p>
        <Callout>
          <p>
            No build step? <a href="/docs/html/">Plain HTML</a> describes the
            patterns in data attributes and mounts them all with one call,
            and the <a href="/docs/web-component/">web component</a> is a
            single tag.
          </p>
        </Callout>
      </Section>

      <Section id="installation">
        <p>
          One package, with css-doodle inside it and no framework.
        </p>
        <CodeBlock code={installCode} title="terminal" lang="sh" className={styles.codeStandalone} />
        <p>
          The core is <Code>tabbied</Code>; the designs are{' '}
          <Code>tabbied/patterns</Code>, one named export each, so a bundler
          ships only the ones you import.
        </p>
        <CodeBlock code={importCode} lang="ts" className={styles.codeStandalone} />
      </Section>

      <Section id="quick-start">
        <p>
          Size a host, then mount a design into it. The{' '}
          <a href="/docs/mcp/">MCP server</a>&apos;s <Code>get_design</Code>{' '}
          writes this form for any design; from a pattern page in the
          gallery, carry its seed, palette and options across.
        </p>
        <QuickStartDemo setup="javascript" />
      </Section>

      <Section id="sizing">
        <SizingGuide setup="javascript" />
        <p>
          <Code>resolveBoxStyle()</Code> takes the box settings and returns
          the style to give the host, or size it in your own CSS instead:
        </p>
        <CodeBlock code={sizingCode} lang="ts" className={styles.codeStandalone} />
        <p>
          <Code>aspectRatio</Code> takes CSS&apos;s <Code>3 / 2</Code>, a
          number, or the editor&apos;s <Code>3:2</Code>.
        </p>
      </Section>

      <Section id="settings">
        <SettingsGuide setup="javascript" />
      </Section>

      <Section id="updates">
        <p>
          The controller changes the pattern already on the page:{' '}
          <Code>update()</Code> merges settings in, and only what changed
          reaches the page, so calling it on every change is cheap.
        </p>
        <CodeBlock code={controllerCode} lang="ts" className={styles.codeStandalone} />
        <p>
          Under the measured fits, <Code>grid</Code> (the default) and{' '}
          <Code>cover</Code>, the pattern can only be drawn once the host has
          a size, so it mounts after the first resize observation rather than
          inside <Code>createPattern()</Code>. Until then{' '}
          <Code>element</Code> is null and an export has nothing to read.
          Anything that needs the drawn pattern belongs in{' '}
          <Code>onReady</Code>, which runs once, after the first render; under{' '}
          <Code>fit: &apos;fixed&apos;</Code> the canvas size is given, so it
          mounts at once.
        </p>
        <CodeBlock code={readyCode} lang="ts" className={styles.codeStandalone} />
        <RedrawDemo setup="javascript" />
        <ExportNotes />
      </Section>

      <Section id="motion">
        <MotionGuide setup="javascript" />
      </Section>

      <Section id="server">
        <p>
          <Code>createPattern()</Code> needs a browser: it measures the host
          and mounts a custom element into it. Importing{' '}
          <Code>tabbied</Code> on a server is safe, though, and{' '}
          <Code>resolveBoxStyle()</Code> is pure, so a server template can
          write the host&apos;s size inline from the same box settings. The
          page then arrives with the box at its final size, and the pattern
          mounts into it in the browser without moving anything. Give the
          host the pattern&apos;s background color inline too, and the box
          shows it until the pattern arrives.
        </p>
      </Section>

      <ExampleSections setup="javascript" recipes={JAVASCRIPT_RECIPES} />

      <Section id="api">
        <h3 className={styles.minihead}>createPattern(host, config)</h3>
        <p>
          <Code>config</Code> is the React component&apos;s props less the
          box ones: <Code>pattern</Code> (required), <Code>seed</Code>,{' '}
          <Code>palette</Code>, <Code>options</Code>, <Code>fit</Code>,{' '}
          <Code>density</Code>, <Code>cellSize</Code>,{' '}
          <Code>width</Code> and <Code>height</Code> (for a fixed canvas),{' '}
          <Code>coverRender</Code>, <Code>redrawInterval</Code>,{' '}
          <Code>paused</Code> and <Code>onReady</Code>. It returns the
          controller:
        </p>
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Member</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              {CONTROLLER.map(([name, description]) => (
                <tr key={name}>
                  <td className={styles.propName}>{name}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={styles.minihead}>resolveBoxStyle(box)</h3>
        <p>
          Takes <Code>fill</Code>, <Code>width</Code>, <Code>height</Code>,{' '}
          <Code>maxWidth</Code>, <Code>maxHeight</Code> and{' '}
          <Code>aspectRatio</Code> and returns the style for the host, as an
          object of camel-cased CSS properties. Pure, so it runs on a server
          too.
        </p>

        <h3 className={styles.minihead}>hydratePatterns(options)</h3>
        <p>
          Mounts every <Code>[data-pattern]</Code> element on the page from
          its data attributes, which <a href="/docs/html/">Plain HTML</a>{' '}
          lists. It is idempotent, so call it again after adding patterns; an
          element it already mounted is skipped.
        </p>
        <CodeBlock code={hydrateCode} lang="ts" className={styles.codeStandalone} />
        <p>
          <Code>patterns</Code> is the only required option: the designs to
          resolve slugs against, as a record or an array. <Code>root</Code>{' '}
          scopes the search, <Code>selector</Code> replaces{' '}
          <Code>[data-pattern]</Code>, and <Code>defaults</Code> is merged
          into every config after the attributes. A slug missing from{' '}
          <Code>patterns</Code> goes to <Code>onError</Code> (a console
          warning by default) and the rest still mount.
        </p>
      </Section>
    </DocsShell>
  );
}
