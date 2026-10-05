import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildSnippet } from 'tabbied/snippets';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The framework-free core's page: createPattern(), the controller it
// returns, resolveBoxStyle() and hydratePatterns()'s options. Every other
// setup is built on this, and until this page it was a section of
// /docs/react. The package README's "Core" section says the same things;
// keep the two in step.

export const metadata: Metadata = pageMetadata({
  title: 'JavaScript - Tabbied',
  description:
    'The framework-free Tabbied core: createPattern() on any element, the controller it returns, resolveBoxStyle() for sizing, and hydratePatterns() for markup.',
  path: '/docs/javascript/',
});

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'mount', label: 'Mounting a pattern' },
  { id: 'sizing', label: 'Sizing the host' },
  { id: 'controller', label: 'The controller' },
  { id: 'ready', label: 'When it is ready' },
  { id: 'markup', label: 'Patterns from markup' },
];

const Section = docsSection(SECTIONS);

// The same builder the editor's Copy code and the MCP server's get_design
// call, so the page shows exactly what they write.
const mountCode = buildSnippet('core', {
  slug: 'radius',
  seed: 'k9Pz',
  palette: ['#0B1020', '#3E8BFF', '#3FFFB2'],
  ratio: [3, 2],
  ratioLabel: '3:2',
  density: 0.5,
  version: PACKAGE_VERSION,
});

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
      sections={SECTIONS}
    >
      <Section id="introduction" title="Introduction">
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

      <Section id="mount" title="Mounting a pattern">
        <CodeBlock code={mountCode} title="pattern.js" lang="ts" className={styles.codeStandalone} />
        <p>
          The design is a <Code>PatternDefinition</Code> from{' '}
          <Code>tabbied/patterns</Code>; import only the ones you draw and a
          bundler ships just those. Any pattern page in the gallery writes
          its own version of this, with the seed, colors and options you
          picked.
        </p>
      </Section>

      <Section id="sizing" title="Sizing the host">
        <p>
          A pattern has no size of its own: it fills the host, and a host
          that sizes to its content draws nothing. Size it in your CSS, or
          turn the box settings the components take (<Code>width</Code>,{' '}
          <Code>height</Code>, <Code>maxWidth</Code>,{' '}
          <Code>maxHeight</Code>, <Code>aspectRatio</Code>,{' '}
          <Code>fill</Code>) into a style with{' '}
          <Code>resolveBoxStyle()</Code>:
        </p>
        <CodeBlock code={sizingCode} lang="ts" className={styles.codeStandalone} />
        <p>
          <Code>aspectRatio</Code> takes CSS&apos;s <Code>3 / 2</Code>, a
          number, or the editor&apos;s <Code>3:2</Code>. With no width and
          no ratio the box fills its parent both ways, which needs a parent
          with a height.
        </p>
      </Section>

      <Section id="controller" title="The controller">
        <CodeBlock code={controllerCode} lang="ts" className={styles.codeStandalone} />
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
      </Section>

      <Section id="ready" title="When it is ready">
        <p>
          Under the measured fits, <Code>grid</Code> (the default) and{' '}
          <Code>cover</Code>, the pattern can only be drawn once the host has
          a size, so it mounts after the first resize observation rather than
          inside <Code>createPattern()</Code>. Until then{' '}
          <Code>element</Code> is null and an export has nothing to read.
          Anything that needs the drawn pattern belongs in{' '}
          <Code>onReady</Code>, which runs once, after the first render:
        </p>
        <CodeBlock code={readyCode} lang="ts" className={styles.codeStandalone} />
        <p>
          Under <Code>fit: &apos;fixed&apos;</Code> the canvas size is given,
          so it mounts at once.
        </p>
      </Section>

      <Section id="markup" title="Patterns from markup">
        <p>
          <Code>hydratePatterns()</Code> mounts every{' '}
          <Code>[data-pattern]</Code> element on the page from its data
          attributes, which <a href="/docs/html/">Plain HTML</a> lists. It
          is idempotent, so call it again after adding patterns; an element
          it already mounted is skipped.
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
