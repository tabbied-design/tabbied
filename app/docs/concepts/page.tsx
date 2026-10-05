import type { Metadata } from 'next';
import { PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import DocsShell from 'components/react-docs-page/DocsShell';
import ConceptExample from 'components/react-docs-page/ConceptExample';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// What every setup shares, said once and without a framework: the setup
// pages (React, Vue, Svelte, the web component, plain HTML) link here for
// what a setting means, and keep only how their own setup spells it. Each
// section carries an example written in every setup, behind a switch that
// remembers the reader's (examples/concepts.ts), and the table at the end
// is the spelling side by side. The setup pages keep the live demos.

export const metadata: Metadata = pageMetadata({
  title: 'Concepts - Tabbied',
  description:
    'How Tabbied patterns work in every setup: designs, sizing and fit modes, palettes, options, seeds, export, motion and accessibility, with each setting named in React, Vue, Svelte, the web component and plain HTML.',
  path: '/docs/concepts/',
});

const SECTIONS: DocsSection[] = [
  { id: 'designs', label: 'Designs' },
  { id: 'sizing', label: 'Sizing & fit modes' },
  { id: 'colors', label: 'Colors' },
  { id: 'options', label: 'Options' },
  { id: 'seeds', label: 'Seeds & export' },
  { id: 'motion', label: 'Motion' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'names', label: 'Names in each setup' },
];

const Section = docsSection(SECTIONS);

// One row per setting: what it is called in each setup. Three columns, not
// five, because the names come in three spellings: React and Svelte take
// the same camelCase keys, Vue writes them in kebab case (with a colon for
// a bound value), and the web component's attributes are the kebab-case
// names plain HTML writes with `data-` in front. Six columns of identifiers
// were wider than the article.
type Row = {
  setting: string;
  camel: string;
  vue: string;
  kebab: string;
};

const NAMES: Row[] = [
  { setting: 'Design', camel: 'pattern', vue: ':pattern', kebab: 'pattern' },
  { setting: 'Seed', camel: 'seed', vue: 'seed', kebab: 'seed' },
  { setting: 'Colors', camel: 'palette', vue: ':palette', kebab: 'palette' },
  { setting: 'Options', camel: 'options', vue: ':options', kebab: 'options' },
  { setting: 'Fit', camel: 'fit', vue: 'fit', kebab: 'fit' },
  { setting: 'Density', camel: 'density', vue: ':density', kebab: 'density' },
  { setting: 'Cell size', camel: 'cellSize', vue: ':cell-size', kebab: 'cell-size' },
  { setting: 'Cover render', camel: 'coverRender', vue: ':cover-render', kebab: 'cover-render' },
  { setting: 'Box size', camel: 'box props', vue: 'box props', kebab: 'style' },
  { setting: 'Redraw timer', camel: 'redrawInterval', vue: ':redraw-interval', kebab: 'redraw-interval' },
  { setting: 'Pause', camel: 'paused', vue: 'paused', kebab: 'paused' },
  { setting: 'Label', camel: 'decorative, ariaLabel', vue: 'decorative, aria-label', kebab: 'aria-label' },
  { setting: 'First render', camel: 'onReady', vue: '@ready', kebab: 'ready event' },
];

const cell = (value: string) => <Code>{value}</Code>;

export default function ConceptsPage() {
  return (
    <DocsShell
      linkConcepts={false}
      title="Concepts"
      lede={
        <>
          Every setup draws the same {PATTERN_COUNT} designs from the same
          settings. This page says what each setting does, with an example
          in whichever setup you use. Each setup&apos;s own page has the
          rest.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'Every setup']}
      sections={SECTIONS}
    >
      <Section id="designs" title="Designs">
        <p>
          A design is named by its slug, such as <Code>radius</Code> or{' '}
          <Code>windowpane</Code>, the last part of its address in the{' '}
          <a href="/patterns/">gallery</a>. Slugs say nothing about how a
          design looks, so choose by looking: every design has a preview in
          the gallery, and <a href="/catalog.json">catalog.json</a> lists
          them all with tags, moods and options to filter on.
        </p>
        <p>
          With a bundler (React, Vue, Svelte, or the web component inside an
          app) import each design you use from <Code>tabbied/patterns</Code>,
          and only those are bundled. The web component from a CDN loads a
          design by its slug, and plain HTML names the designs it needs in
          its one script.
        </p>
        <ConceptExample id="designs" />
      </Section>

      <Section id="sizing" title="Sizing & fit modes">
        <p>
          A pattern has no size of its own: it fills the box you give it. By
          default that box fills its parent, so a parent with a size is all
          it needs. In a parent that sizes to its content there is nothing to
          fill, so give the box a height or an aspect ratio instead. That is
          the most common reason a pattern draws nothing.
        </p>
        <p>
          The pattern is never stretched: it is always scaled by the same
          amount across and down. The fit decides how it meets the box:
        </p>
        <ul className={styles.list}>
          <li>
            <Code>grid</Code> (the default) works out a grid of whole, nearly
            square cells for the box, so any shape is covered edge to edge.{' '}
            <Code>density</Code> sets how fine the cells are, from 0 (coarse)
            to 1 (fine), or <Code>cellSize</Code> sets them in pixels.
          </li>
          <li>
            <Code>cover</Code> draws at a fixed resolution (800 by 800 unless{' '}
            <Code>coverRender</Code> sets it) and scales the drawing to cover
            the box, which keeps fine strokes and shadows in proportion.
          </li>
          <li>
            <Code>fixed</Code> draws at an exact canvas size in pixels
            (360 by 540 unless set), as the Tabbied editor does.
          </li>
        </ul>
        <ConceptExample id="sizing" />
        <p>
          Every design supports all three. See them side by side in the{' '}
          <a href="/docs/react/#sizing">live examples</a>.
        </p>
      </Section>

      <Section id="colors" title="Colors">
        <p>
          A palette is a list of colors, background first. Any CSS color
          works, including <Code>transparent</Code> for the background,
          which lets whatever is behind the pattern show through. Fewer colors
          than the design was drawn with is fine: the remaining slots reuse
          your colors in turn, so two colors redraw the whole design in those
          two. Leave the palette out to get the design&apos;s own colors.
        </p>
        <ConceptExample id="colors" />
        <Callout>
          <p>
            The <a href="/patterns/">gallery</a> previews every design in a
            palette of your choosing, and lets you save palettes to reuse.
          </p>
        </Callout>
      </Section>

      <Section id="options" title="Options">
        <p>
          Each design has a few options, the same controls the editor shows
          beside it: a line thickness, how often a shape appears, a shadow.
          They are set by id, and any left out keep the design&apos;s
          default. Each design&apos;s options, with their ranges, are listed
          on its definition and in <a href="/catalog.json">catalog.json</a>.
        </p>
        <p>
          Under the <Code>grid</Code> and <Code>cover</Code> fits, a
          design&apos;s <Code>grid</Code> option is worked out from the box,
          so setting it only suggests a density.
        </p>
        <ConceptExample id="options" />
      </Section>

      <Section id="seeds" title="Seeds & export">
        <p>
          A seed fixes a design&apos;s arrangement: the same design, seed and
          options draw the same picture at any size, so a seed is a design
          you can keep. Leave it out for a new arrangement each time the page
          loads. <Code>redraw()</Code> moves to a new seed, or to one you
          pass, and the design eases into it.
        </p>
        <p>
          <Code>exportImage()</Code> saves a PNG, at a higher{' '}
          <Code>scale</Code> for print. <Code>exportSvg()</Code> converts the
          pattern into a true vector SVG that opens in design tools and
          scales to any size. A few designs use gradient sweeps SVG cannot
          describe, and those offer PNG only.
        </p>
        <ConceptExample id="seeds" />
      </Section>

      <Section id="motion" title="Motion">
        <p>
          A redraw timer gives a new seed every so many milliseconds. It
          skips its turn while the tab is hidden or the pattern is scrolled
          out of view, so a page of moving patterns only pays for the ones on
          screen. Pausing holds the timer without losing its place.
        </p>
        <p>
          When a reader has asked for reduced motion, every setup honors it
          with nothing to configure: the timer never starts, the designs stop
          easing between arrangements, and the few designs with animations of
          their own hold still. The preference is watched, so changing it
          with the page open takes effect at once.
        </p>
        <ConceptExample id="motion" />
      </Section>

      <Section id="accessibility" title="Accessibility">
        <p>
          A pattern is decorative by default, hidden from screen readers
          with <Code>aria-hidden</Code>. Give it a label and it becomes an
          image with that name, for a pattern that carries meaning. In plain
          HTML the markup is yours, so write the attributes on the element
          yourself.
        </p>
        <ConceptExample id="accessibility" />
      </Section>

      <Section id="names" title="Names in each setup">
        <div className={styles.tableScroll}>
          <table className={`${styles.propsTable} ${styles.namesTable}`}>
            <thead>
              <tr>
                <th>Setting</th>
                <th>React, Svelte</th>
                <th>Vue</th>
                <th>Web component</th>
              </tr>
            </thead>
            <tbody>
              {NAMES.map((row) => (
                <tr key={row.setting}>
                  <td>{row.setting}</td>
                  <td>{cell(row.camel)}</td>
                  <td>{cell(row.vue)}</td>
                  <td>{cell(row.kebab)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Plain HTML</strong> writes the web component&apos;s names
          with <Code>data-</Code> in front (<Code>data-seed</Code>,{' '}
          <Code>data-cell-size</Code>), with two differences: a label is
          written in the markup as <Code>role</Code> and{' '}
          <Code>aria-label</Code>, and a first-render callback goes through{' '}
          <Code>hydratePatterns()</Code>&apos;s <Code>defaults</Code>.
        </p>
        <p>
          The box props are <Code>fill</Code>, <Code>width</Code>,{' '}
          <Code>height</Code>, <Code>maxWidth</Code>, <Code>maxHeight</Code>{' '}
          and <Code>aspectRatio</Code> (<Code>max-width</Code> and so on in
          Vue), the CSS properties they are named after; the web component
          and plain HTML are sized by CSS on the element. In Vue a name with
          a colon is a bound value (an array, a number or a definition), and
          the rest can be written as plain text. Svelte&apos;s names are the
          keys of the one object passed to both{' '}
          <Code>tabbiedAttributes()</Code> and the action.
        </p>
      </Section>
    </DocsShell>
  );
}
