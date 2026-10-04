import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The no-build path: data-* attributes and one hydratePatterns() call, the
// shape the editor's "Copy HTML embed" writes and the HTML template
// downloads ship. It was a section of /docs/react until the docs grew a
// page per setup.

export const metadata: Metadata = pageMetadata({
  title: 'Plain HTML - Tabbied',
  description:
    'Put Tabbied generative patterns on a page with no build step: data attributes in the markup and one module script from esm.sh.',
  path: '/docs/html/',
});

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'markup', label: 'The markup' },
  { id: 'attributes', label: 'Attributes' },
  { id: 'loading', label: 'Loading the designs' },
];

const Section = docsSection(SECTIONS);

const htmlCode = `<div data-pattern="radius"
     data-seed="k9Pz"
     data-palette="#3E8BFF, #3B3F45, #3FFFB2"
     data-density="0.5"
     data-options="frequency: 0.8"
     style="width: 100%; aspect-ratio: 3 / 2"></div>

<!-- Once per page, after the patterns. -->
<script type="module">
  import { hydratePatterns } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}';
  import { radius } from 'https://esm.sh/tabbied@${PACKAGE_VERSION}/patterns?exports=radius';

  hydratePatterns({ patterns: { radius } });
</script>`;

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
      sections={SECTIONS}
    >
      <Section id="introduction" title="Introduction">
        <p>
          Each pattern is an element with <Code>data-*</Code> attributes.
          One module script loads the package from esm.sh, and{' '}
          <Code>hydratePatterns()</Code> finds every{' '}
          <Code>[data-pattern]</Code> element and mounts it. Any pattern page
          in the gallery writes this for you: open Export and choose Copy
          HTML embed, with the seed, colors and options you picked.
        </p>
        <Callout>
          <p>
            For a single tag that also works inside a framework or a CMS, use
            the <a href="/docs/web-component/">web component</a>. It takes the
            same attributes without the <Code>data-</Code> prefix.
          </p>
        </Callout>
      </Section>

      <Section id="markup" title="The markup">
        <CodeBlock code={htmlCode} title="index.html" lang="html" className={styles.codeStandalone} />
        <p>
          Give the element a size, as with any pattern: a height or an{' '}
          <Code>aspect-ratio</Code>. A pattern fills the box it is given, so
          an element with no size draws nothing.
        </p>
      </Section>

      <Section id="attributes" title="Attributes">
        <p>
          The attributes are the React component&apos;s props:{' '}
          <Code>data-seed</Code>, <Code>data-palette</Code> (comma separated,
          background first), <Code>data-options</Code> (
          <Code>id: value</Code> pairs separated by <Code>;</Code>),{' '}
          <Code>data-density</Code>, <Code>data-cell-size</Code>,{' '}
          <Code>data-fit</Code>, <Code>data-redraw-interval</Code> and{' '}
          <Code>data-paused</Code>. Only <Code>data-pattern</Code> is
          required, and an attribute that does not parse falls back to the
          design&apos;s own default rather than breaking the pattern.
        </p>
      </Section>

      <Section id="loading" title="Loading the designs">
        <p>
          <Code>?exports=</Code> trims the patterns entry to the designs
          named, a couple of KB instead of the whole catalog. For several
          patterns on one page, list every slug in both the import and the
          URL. Pin the version, as here: a bare <Code>tabbied</Code> on
          esm.sh is whatever is latest.
        </p>
        <p>
          <Code>hydratePatterns()</Code> mounts what is on the page when it
          runs and skips what it already mounted, so call it again after
          adding patterns later. It returns each element with its controller,
          for <Code>redraw()</Code>, <Code>exportImage()</Code> and{' '}
          <Code>exportSvg()</Code>.
        </p>
      </Section>
    </DocsShell>
  );
}
