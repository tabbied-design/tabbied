import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern } from 'tabbied/react';
import { pebble, wander } from 'tabbied/patterns';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import Example from 'components/react-docs-page/Example';
import { Code } from 'components/react-docs-page/parts';
import { SETUP_SECTIONS } from 'components/react-docs-page/sections';
import { QuickStartDemo, RedrawDemo } from 'components/react-docs-page/GuideDemos';
import { Live } from 'components/react-docs-page/live';
import {
  ExampleSections,
  ExportNotes,
  MotionGuide,
  SettingsGuide,
  SetupSection as Section,
  SizingGuide,
} from 'components/react-docs-page/SetupGuide';
import { REACT_RECIPES } from 'components/react-docs-page/examples/recipes/react';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// tabbied/react's page. Its sections are every setup page's
// (SETUP_SECTIONS), in the same order; the live demos and the guides to
// sizing, settings and motion are shared with them (GuideDemos, SetupGuide),
// drawn the same and spelled in React.

export const metadata: Metadata = pageMetadata({
  title: 'React component - Tabbied',
  description:
    'The TabbiedPattern React component: render, resize, recolor, reseed, and export Tabbied generative patterns in a React or Next.js app.',
  path: '/docs/react/',
});

const installCode = `npm install tabbied`;

const treeShakeCode = `// Import only what you render: bundlers ship just those presets.
import { radius, vitrail } from 'tabbied/patterns';

// Building a gallery? The full record pulls in every design.
import { patterns } from 'tabbied/patterns';`;

const boxCode = `// Default: fill the containing block. .panel is 100% wide, 400px tall.
<div className="panel">
  <TabbiedPattern pattern={wander} />
</div>

// Fill the width, cap it, and let the ratio set the height.
<TabbiedPattern pattern={wander} maxWidth={960} aspectRatio={3 / 2} />

// Pin one axis; numbers are px, strings are CSS.
<TabbiedPattern pattern={wander} height={320} />
<TabbiedPattern pattern={wander} height="40vh" maxHeight={520} />

// Hand sizing back to a class name.
<TabbiedPattern pattern={wander} fill={false} className="hero-art" />`;

const ssrCode = `// App Router: works directly in a Server Component tree - the
// component itself is the client boundary.
import { TabbiedPattern } from 'tabbied/react';
import { pebble } from 'tabbied/patterns';

export default function Page() {
  return <TabbiedPattern pattern={pebble} height={320} />;
}`;

// A definition of your own, drawn live beside the sample: the sample prints
// these strings, so what it shows is what it draws.
const DEFINITION = {
  palette: ['#101418', '#3e8bff', '#3fffb2'],
  style: ['--rule: ( background: @p(var(--color1), var(--color2)); ', 'border-radius: @p(0, 50%); );'],
  doodle: [':doodle { @grid: ${grid}; @size: ${width} ${height}; } ', ':container { background: var(--color0); }'],
};

const myPattern: PatternDefinition = {
  name: 'My design',
  slug: 'my-design',
  palette: DEFINITION.palette,
  options: [
    {
      id: 'grid',
      displayName: 'Columns and rows',
      type: 'ButtonSelectGroup',
      default: '6x9',
      options: ['2x3', '4x6', '6x9'],
      replace: '${grid}',
    },
  ],
  code: { style: DEFINITION.style.join(''), doodle: DEFINITION.doodle.join('') },
};

const quote = (text: string) => `'${text}'`;

const definitionCode = `import type { PatternDefinition } from 'tabbied';

const myPattern: PatternDefinition = {
  name: 'My design',
  slug: 'my-design',
  palette: [${DEFINITION.palette.map(quote).join(', ')}],
  options: [
    {
      id: 'grid',
      displayName: 'Columns and rows',
      type: 'ButtonSelectGroup',
      default: '6x9',
      options: ['2x3', '4x6', '6x9'],
      replace: '\${grid}',
    },
  ],
  code: {
    // One rule per cell: here a square or a circle, in one of two inks.
    style:
      ${DEFINITION.style.map(quote).join(' +\n      ')},
    doodle:
      ${DEFINITION.doodle.map(quote).join(' +\n      ')},
  },
};`;

// The component's props. Description cells are markup; the rest are strings
// the table sets in the mono. A row with no default draws a dimmed dash.
type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: ReactNode;
};

const PROPS: PropRow[] = [
  {
    name: 'pattern',
    type: 'PatternDefinition',
    required: true,
    description: (
      <>
        The pattern to render: a preset from <Code>tabbied/patterns</Code> or
        your own definition.
      </>
    ),
  },
  {
    name: 'seed',
    type: 'string',
    defaultValue: 'random',
    description:
      'Randomization seed. Omit for a random seed per mount; reseed via the handle.',
  },
  {
    name: 'palette',
    type: 'string[]',
    defaultValue: 'preset palette',
    description: (
      <>
        Active colors, background (<Code>color0</Code>) first. Shorter palettes
        cycle their inks into the unused slots.
      </>
    ),
  },
  {
    name: 'options',
    type: 'Record<string, OptionValue>',
    defaultValue: 'authored',
    description:
      'Option values keyed by option id; unset options use authored defaults.',
  },
  {
    name: 'fit',
    type: "'grid' | 'cover' | 'fixed'",
    defaultValue: "'grid'",
    description: (
      <>
        How the drawing meets its box, never by distorting it (see{' '}
        <a href="#sizing">Sizing</a>).
      </>
    ),
  },
  {
    name: 'fill',
    type: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Fill the containing block (<Code>width: 100%; height: 100%</Code>).
      </>
    ),
  },
  {
    name: 'maxWidth / maxHeight',
    type: 'number | string',
    description: 'Upper bounds on the box. Numbers are px.',
  },
  {
    name: 'aspectRatio',
    type: 'number | string',
    description: (
      <>
        CSS <Code>aspect-ratio</Code>: derives the height from the width.{' '}
        <Code>&quot;3 / 2&quot;</Code>, <Code>1.5</Code> and the editor&apos;s{' '}
        <Code>&quot;3:2&quot;</Code> all work.
      </>
    ),
  },
  {
    name: 'cellSize',
    type: 'number',
    defaultValue: '36',
    description: (
      <>
        <Code>fit=&quot;grid&quot;</Code>: target cell size in px.
      </>
    ),
  },
  {
    name: 'density',
    type: 'number',
    defaultValue: '1',
    description: (
      <>
        <Code>fit=&quot;grid&quot;</Code>: how fine the cells are, an
        alternative to <Code>cellSize</Code>. 0 is the coarsest cell
        (180px), 1 the finest (36px); 0.5 is the 60px cell most designs
        open at in the editor.
      </>
    ),
  },
  {
    name: 'width / height',
    type: 'number | string',
    defaultValue: 'fill',
    description: (
      <>
        Box size; numbers are px. Under <Code>fit=&quot;fixed&quot;</Code> the
        numeric form is also the canvas size (default 360 x 540).
      </>
    ),
  },
  {
    name: 'coverRender',
    type: '{ width, height }',
    defaultValue: '800 x 800',
    description: (
      <>
        <Code>cover</Code> render resolution override.
      </>
    ),
  },
  {
    name: 'redrawInterval',
    type: 'number',
    defaultValue: 'off',
    description:
      'Re-randomize the seed every N ms (uncontrolled seed only). Paused off-screen, in hidden tabs, and under reduced motion.',
  },
  {
    name: 'paused',
    type: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        Pause <Code>redrawInterval</Code> ticks without resetting the timer.
      </>
    ),
  },
  {
    name: 'decorative',
    type: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        <Code>true</Code> renders an aria-hidden image; <Code>false</Code>{' '}
        exposes <Code>role=&quot;img&quot;</Code> with <Code>ariaLabel</Code>.
      </>
    ),
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: 'pattern name',
    description: (
      <>
        The accessible name when <Code>decorative={'{false}'}</Code>; ignored
        otherwise.
      </>
    ),
  },
  {
    name: 'onReady',
    type: '() => void',
    description: 'Called once the first pattern render is committed.',
  },
  {
    name: 'className / style',
    type: 'string / CSSProperties',
    description: 'Applied to the wrapper box.',
  },
];

const HANDLE: { name: string; description: ReactNode }[] = [
  {
    name: 'redraw(seed?: string)',
    description:
      'Re-randomize (or set) the seed, animating designs with CSS transitions.',
  },
  {
    name: 'exportImage(options?)',
    description:
      'PNG export via css-doodle. Returns a promise; rejects before the pattern has mounted.',
  },
  {
    name: 'exportSvg(options?)',
    description: (
      <>
        Native vector SVG export (no <Code>foreignObject</Code>). Resolves with{' '}
        <Code>{'{ svg, width, height, warnings }'}</Code>;{' '}
        <Code>{'{ download: true }'}</Code> saves a file, and{' '}
        <Code>{'{ clip: { width, height } }'}</Code> keeps the top-left box of
        a canvas the host clips. Unavailable for definitions with{' '}
        <Code>svgExport: false</Code>.
      </>
    ),
  },
  {
    name: 'element',
    description: (
      <>
        The raw <Code>&lt;css-doodle&gt;</Code> element, for power users.
      </>
    ),
  },
];

export default function ReactDocsPage() {
  return (
    <DocsShell
      title="React"
      lede={
        <>
          <Code>tabbied/react</Code> draws Tabbied&apos;s generative patterns
          in a React app, powered by{' '}
          <a href="https://css-doodle.com/">css-doodle</a>. Render any preset
          (or your own definition) at any size, recolor it, reseed it, and
          export it to PNG or SVG.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'React 18 and 19', 'MIT license']}
      sections={SETUP_SECTIONS}
    >
      <Section id="introduction">
        <p>
          <Code>tabbied/react</Code> gives you one component,{' '}
          <Code>TabbiedPattern</Code>, which renders a pattern into
          a normal, CSS-sizeable box, like an{' '}
          <Code>&lt;img&gt;</Code>. The designs come from{' '}
          <Code>tabbied/patterns</Code>: {PATTERN_COUNT} presets as
          tree-shakeable <Code>PatternDefinition</Code> exports, so
          an app ships only the ones it renders.
        </p>
        <p>
          Patterns are deterministic: the same pattern, seed, grid
          and options always draw the same design, at any size.
          That makes patterns safe to use as reproducible brand
          assets - a seed is a design you can keep.
        </p>
        <p>
          Not on React? The same patterns come as a{' '}
          <a href="/docs/svelte/">Svelte action</a>, a{' '}
          <a href="/docs/vue/">Vue component</a>, a{' '}
          <a href="/docs/web-component/">web component</a> for any
          page, <a href="/docs/html/">plain HTML</a> and{' '}
          <a href="/docs/javascript/">plain JavaScript</a>; the{' '}
          <a href="/docs/">Developers</a> page lists every entry
          point.
        </p>
        <p>
          Working with an AI assistant? The{' '}
          <a href="/docs/mcp/">Tabbied MCP server</a> lets it search
          the designs and look at them before it writes the code.
        </p>
      </Section>

      <Section id="installation">
        <p>
          In a React app this is the whole install. The component
          renders with the React your app already has (18 or 19),
          so there is nothing else to add. React is an{' '}
          <em>optional</em> peer dependency, which keeps it out of
          projects that only use the vanilla core; the one hard
          dependency, css-doodle, comes with the package.
        </p>
        <CodeBlock
          code={installCode}
          title="terminal"
          lang="sh"
          className={styles.codeStandalone}
        />
      </Section>

      <Section id="quick-start">
        <p>
          Import the component and a preset, then render it inside a sized
          box: here a <Code>height</Code>, with the width filling the parent.
          On the server and the first client paint it shows the
          pattern&apos;s background color at its final size, so nothing
          shifts; the live pattern takes over once it mounts.
        </p>
        <QuickStartDemo setup="react" />
        <h3 className={styles.minihead}>Importing presets</h3>
        <p>
          <Code>pattern</Code> takes a <Code>PatternDefinition</Code>{' '}
          object. Each preset is a side-effect-free named export, so
          importing only the designs you render keeps the rest of
          the catalog out of your bundle.
        </p>
        <CodeBlock
          code={treeShakeCode}
          className={styles.codeStandalone}
        />
        <p>
          Browse every design (and its options) in the{' '}
          <a href="/patterns/">gallery</a> - the preset export
          name is the slug in the editor URL.
        </p>
      </Section>

      <Section id="sizing">
        <SizingGuide setup="react" />
        <h3 className={styles.minihead}>The box props, live</h3>
        <p>
          Two boxes: one with no sizing props in a 120px-tall parent, and one
          that fills the width up to 320px with its height from a ratio.
        </p>
        <Example code={boxCode}>
          <div className={styles.boxDemo}>
            <figure className={styles.fitItem}>
              <div className={styles.boxDemoFill}>
                <TabbiedPattern
                  pattern={wander}
                  seed="k9Pz"
                  density={0.25}
                />
              </div>
              <figcaption className={styles.fitCaption}>
                <code>
                  &lt;TabbiedPattern pattern={'{wander}'} /&gt;
                </code>
                No sizing props - it fills the 120px-tall box it was
                dropped into.
              </figcaption>
            </figure>
            <figure className={styles.fitItem}>
              <TabbiedPattern
                pattern={wander}
                seed="k9Pz"
                density={0.25}
                maxWidth={320}
                aspectRatio={3 / 2}
                className={styles.demoArt}
              />
              <figcaption className={styles.fitCaption}>
                <code>maxWidth={'{320}'} aspectRatio={'{3 / 2}'}</code>
                Fills the width up to 320px; the ratio sets the
                height, with no sized parent involved.
              </figcaption>
            </figure>
          </div>
        </Example>
      </Section>

      <Section id="settings">
        <SettingsGuide setup="react" />
      </Section>

      <Section id="updates">
        <p>
          When a prop changes, the component passes it on to the pattern
          already on the page, so a new palette or option redraws in place,
          with the design&apos;s own transition; props that come out the same
          are skipped. For the rest, a ref to the component&apos;s handle has{' '}
          <Code>redraw()</Code>, which re-randomizes (or sets) the seed and
          morphs into the new arrangement, and the two exports. Try it:
        </p>
        <RedrawDemo setup="react" />
        <ExportNotes />
      </Section>

      <Section id="motion">
        <MotionGuide setup="react" />
      </Section>

      <Section id="server">
        <p>
          <Code>TabbiedPattern</Code> is a client component (it
          registers a browser custom element on import) with a
          built-in server placeholder: on the server and the first
          client paint it renders the wrapper box filled with the
          pattern&apos;s background color - correct dimensions,
          zero layout shift, no hydration mismatch. In the Next.js
          App Router you can use it directly from Server
          Components; no <Code>ssr: false</Code> ceremony needed.
        </p>
        <Example code={ssrCode} title="app/page.tsx">
          <Live pattern={pebble} style={{ height: 320 }} className={styles.demoArt} />
        </Example>
      </Section>

      <ExampleSections setup="react" recipes={REACT_RECIPES} />

      <Section id="api">
        <h3 className={styles.minihead}>
          &lt;TabbiedPattern /&gt; props
        </h3>
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th className={styles.defaultCol}>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map((row) => (
                <tr key={row.name}>
                  <td className={styles.propName}>
                    {row.name}
                    {row.required ? (
                      <span className={styles.required}>required</span>
                    ) : null}
                  </td>
                  <td className={styles.typeCol}>
                    <code>{row.type}</code>
                  </td>
                  <td className={styles.defaultCol}>
                    {row.defaultValue ?? (
                      <span className={styles.noDefault} aria-label="none">
                        -
                      </span>
                    )}
                  </td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={styles.minihead}>Handle (ref)</h3>
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Member</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {HANDLE.map((row) => (
                <tr key={row.name}>
                  <td className={styles.propName}>{row.name}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={styles.minihead}>PatternDefinition</h3>
        <p>
          Presets are plain data. You can author your own - the
          renderer only cares about the shape:
        </p>
        <Example code={definitionCode} lang="ts">
          <Live pattern={myPattern} style={{ height: 240 }} className={styles.demoArt} />
        </Example>
        <p>
          The full type (palette slots, option kinds, per-pattern
          sizing metadata) ships with the package - {' '}
          <Code>import type {'{ PatternDefinition }'} from
          &apos;tabbied&apos;</Code>.
        </p>
        <p>
          Two option fields are named differently in{' '}
          <Code>catalog.json</Code> (and the MCP server), which
          describes designs for reading rather than authoring: its{' '}
          <Code>label</Code> is a definition&apos;s{' '}
          <Code>displayName</Code>, and its <Code>values</Code> are
          a definition&apos;s <Code>options</Code>. Write a
          definition with the names above.
        </p>
      </Section>

    </DocsShell>
  );
}
