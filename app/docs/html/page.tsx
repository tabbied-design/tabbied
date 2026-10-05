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
import { HTML_RECIPES } from 'components/react-docs-page/examples/recipes/html';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The no-build path: data-* attributes and one hydratePatterns() call, the
// shape the editor's Copy code > HTML embed writes and the HTML template
// downloads ship. Its sections are every setup page's (SETUP_SECTIONS), in
// the same order.

export const metadata: Metadata = pageMetadata({
  title: 'Plain HTML - Tabbied',
  description:
    'Put Tabbied generative patterns on a page with no build step: data attributes in the markup and one module script from esm.sh.',
  path: '/docs/html/',
});

const scriptCode = `<!-- Once per page, after the patterns. -->
<script type="module">
  import { hydratePatterns } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}';
  import { radius, vitrail } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}/patterns?exports=radius,vitrail';

  hydratePatterns({ patterns: { radius, vitrail } });
</script>`;

const updatesCode = `<script type="module">
  import { hydratePatterns } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}';
  import { radius } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}/patterns?exports=radius';

  const mounted = hydratePatterns({ patterns: { radius } });

  // Each element with its controller.
  const { controller } = mounted[0];
  controller.update({ palette: ['#FFF4E6', '#E8590C'] }); // redraws in place
</script>`;

const ATTRIBUTES: [string, ReactNode][] = [
  ['data-pattern', <>The design&apos;s slug, imported in the script. Required.</>],
  ['data-seed', <>The arrangement. Omit for a random one.</>],
  ['data-palette', <>Colors, comma separated, background first.</>],
  [
    'data-options',
    <>
      <Code>id: value</Code> pairs separated by <Code>;</Code>.
    </>,
  ],
  [
    'data-fit',
    <>
      <Code>grid</Code> (default), <Code>cover</Code> or <Code>fixed</Code>.
    </>,
  ],
  ['data-density, data-cell-size', <>How fine the cells are: 0 to 1, or a cell size in px.</>],
  [
    'data-width, data-height',
    <>
      The canvas size in px, for <Code>data-fit=&quot;fixed&quot;</Code>.
    </>,
  ],
  [
    'data-cover-render',
    <>
      The render size for <Code>data-fit=&quot;cover&quot;</Code>, as <Code>800x800</Code>.
    </>,
  ],
  ['data-redraw-interval, data-paused', <>Reseed every N ms; hold the timer. Off under reduced motion.</>],
];

export default function HtmlDocsPage() {
  return (
    <DocsShell
      title="Plain HTML"
      lede={
        <>
          Put any of the {PATTERN_COUNT} patterns on a page with no build step
          and no framework: describe each one in the markup, and one script
          brings them all to life.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'No build step', 'MIT license']}
      sections={SETUP_SECTIONS}
    >
      <Section id="introduction">
        <p>
          Each pattern is an element with <Code>data-*</Code> attributes.
          One module script loads the package from esm.sh, and{' '}
          <Code>hydratePatterns()</Code> finds every{' '}
          <Code>[data-pattern]</Code> element and mounts it. Any pattern page
          in the gallery writes this for you: open Export and, under Copy
          code, choose HTML embed, with the seed, colors and options you
          picked.
        </p>
        <Callout>
          <p>
            For a single tag that also works inside a framework or a CMS, use
            the <a href="/docs/web-component/">web component</a>. It takes the
            same attributes without the <Code>data-</Code> prefix.
          </p>
        </Callout>
      </Section>

      <Section id="installation">
        <p>
          Nothing to install: one module script, once per page, after the
          patterns. It imports the package and the designs the page names
          from esm.sh.
        </p>
        <CodeBlock code={scriptCode} title="index.html" lang="html" className={styles.codeStandalone} />
        <p>
          <Code>?exports=</Code> trims the patterns entry to the designs
          named, a couple of KB instead of the whole catalog, so list every
          slug the page uses in both the import and the URL. Pin the version,
          as here: a bare <Code>tabbied</Code> on esm.sh is whatever is
          latest.
        </p>
      </Section>

      <Section id="quick-start">
        <p>
          An element names its design in <Code>data-pattern</Code> and gets
          its size from its style: here a height, with the width filling the
          parent.
        </p>
        <QuickStartDemo setup="html" />
      </Section>

      <Section id="sizing">
        <SizingGuide setup="html" />
      </Section>

      <Section id="settings">
        <p>
          The attributes are the React component&apos;s props, each with a{' '}
          <Code>data-</Code> prefix. Only <Code>data-pattern</Code> is
          required, and an attribute that does not parse falls back to the
          design&apos;s own default rather than breaking the pattern.
        </p>
        <SettingsGuide setup="html" />
      </Section>

      <Section id="updates">
        <p>
          <Code>hydratePatterns()</Code> returns each element with its
          controller. <Code>update()</Code> changes a setting on the pattern
          already on the page, which redraws in place, with the design&apos;s
          own transition.
        </p>
        <CodeBlock code={updatesCode} title="index.html" lang="html" className={styles.codeStandalone} />
        <p>
          The same controller has <Code>redraw()</Code> for a new seed,{' '}
          <Code>exportImage()</Code> for a PNG and <Code>exportSvg()</Code>{' '}
          for a vector file.
        </p>
        <RedrawDemo setup="html" />
        <ExportNotes />
        <p>
          <Code>hydratePatterns()</Code> mounts what is on the page when it
          runs and skips what it already mounted, so call it again after
          adding patterns later; the <a href="#recipe-later">recipe</a> shows
          how.
        </p>
      </Section>

      <Section id="motion">
        <MotionGuide setup="html" />
      </Section>

      <Section id="server">
        <p>
          The markup is the server render. Whatever writes your HTML (a static
          site generator, a CMS, a server template) writes each element with
          its attributes and its inline size, so the box is at its final size
          before the script loads, and the pattern mounts into it without
          moving the page. Give the element the pattern&apos;s background
          color as an inline <Code>background</Code> too, and the box shows
          that color until the pattern arrives.
        </p>
      </Section>

      <ExampleSections setup="html" recipes={HTML_RECIPES} />

      <Section id="api">
        <div className={styles.tableScroll}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>What it sets</th>
              </tr>
            </thead>
            <tbody>
              {ATTRIBUTES.map(([name, description]) => (
                <tr key={name}>
                  <td className={styles.propName}>{name}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <Code>hydratePatterns(options)</Code> takes <Code>patterns</Code>{' '}
          (required: the designs to resolve slugs against, as a record or an
          array), <Code>root</Code> (where to look, the document by
          default), <Code>selector</Code> (in place of{' '}
          <Code>[data-pattern]</Code>), <Code>defaults</Code> (merged into
          every pattern after its attributes) and <Code>onError</Code> (for a
          slug missing from <Code>patterns</Code>; a console warning by
          default, and the rest still mount). It returns each element with its
          controller; the <a href="/docs/javascript/#api">JavaScript</a> page
          lists the controller&apos;s methods.
        </p>
      </Section>
    </DocsShell>
  );
}
