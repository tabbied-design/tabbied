import type { ReactNode } from 'react';
import { Callout, Code, docsSection } from './parts';
import { SETUP_SECTIONS } from './sections';
import SizingExamples, { Prose } from './SizingExamples';
import RecipeExamples from './RecipeExamples';
import {
  A11yDemo,
  FitDemo,
  MotionDemo,
  OptionsDemo,
  PaletteDemo,
  TransparentDemo,
} from './GuideDemos';
import type { GuideSetup } from './examples/guide';
import type { Recipe } from './examples/recipes/types';
import styles from './ReactDocs.module.css';

// The parts of the six setup pages that say the same thing on every page:
// one section component bound to SETUP_SECTIONS (so every page numbers and
// labels its sections alike), the sizing, settings and motion guides, and
// the worked examples. A setting is named the way the page's setup spells
// it. A page writes the rest (its introduction, installation, updates,
// server rendering and API) itself, in the same order.

const Section = docsSection(SETUP_SECTIONS);

/** A setup page's section, titled from SETUP_SECTIONS. */
export function SetupSection({ id, children }: { id: string; children: ReactNode }) {
  const section = SETUP_SECTIONS.find((entry) => entry.id === id);
  if (!section) throw new Error(`No setup section "${id}"`);
  return (
    <Section id={id} title={section.label}>
      {children}
    </Section>
  );
}

const kebab = (name: string) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** A setting as the setup writes it: `redrawInterval`, `redraw-interval` or `data-redraw-interval`. */
export function settingName(setup: GuideSetup, name: string): string {
  switch (setup) {
    case 'vue':
    case 'element':
      return kebab(name);
    case 'html':
      return name.startsWith('aria') ? kebab(name) : `data-${kebab(name)}`;
    default:
      return name;
  }
}

function Name({ setup, children }: { setup: GuideSetup; children: string }) {
  return <Code>{settingName(setup, children)}</Code>;
}

/** A boolean setting turned off, as the setup writes it. */
function off(setup: GuideSetup, name: string): string {
  switch (setup) {
    case 'react':
      return `${name}={false}`;
    case 'vue':
      return `:${kebab(name)}="false"`;
    default:
      return `${name}: false`;
  }
}

const isCss = (setup: GuideSetup) => setup === 'element' || setup === 'html';

/** Sizing: what sizes the box, the fit modes drawn live, and the cases below. */
export function SizingGuide({ setup }: { setup: GuideSetup }) {
  const box = ['fill', 'width', 'height', 'maxWidth', 'maxHeight', 'aspectRatio'];

  return (
    <>
      {isCss(setup) ? (
        <p>
          A pattern has no size of its own: it fills the box it is given, and
          an empty box draws nothing. The box is the element&apos;s own CSS. It
          is a block, so it is full width, and 0px tall until something gives
          it a height: a <Code>height</Code>, an <Code>aspect-ratio</Code>, or
          a parent with a height. Write the size inline, with the
          pattern&apos;s background color, and the box is right before the
          script has run.
        </p>
      ) : (
        <p>
          A pattern has no size of its own: it fills the box it is given, and
          an empty box draws nothing. The box settings size it,{' '}
          {box.map((name, i) => (
            <span key={name}>
              <Name setup={setup}>{name}</Name>
              {i < box.length - 2 ? ', ' : i === box.length - 2 ? ' and ' : ''}
            </span>
          ))}
          {setup === 'javascript' ? (
            <>
              , which <Code>resolveBoxStyle()</Code> turns into the
              host&apos;s inline style
            </>
          ) : (
            <>, written as CSS on the element, the server render included</>
          )}
          . Numbers are px and strings are any CSS length. By default the box
          fills its parent, <Code>width: 100%; height: 100%</Code>, so the
          parent needs a height; in a parent that sizes to its content, give
          the pattern a <Name setup={setup}>height</Name> or an{' '}
          <Name setup={setup}>aspectRatio</Name>.
        </p>
      )}
      <p>
        Whatever the box, the pattern is fitted into it without distortion,
        and <Name setup={setup}>fit</Name> picks how:
      </p>
      <ul className={styles.list}>
        <li>
          <Code>grid</Code>, the default, re-derives the cell grid from the
          measured box, so any box is tiled edge to edge with whole,
          near-square cells. <Name setup={setup}>density</Name> (0 coarse to 1
          fine) or <Name setup={setup}>cellSize</Name> (px) sets how fine.
        </li>
        <li>
          <Code>cover</Code> draws one render and scales it uniformly to fill
          the box, keeping the proportions of fixed-px strokes. The render
          follows the box&apos;s shape, so nothing is cut off mid-cell.
        </li>
        <li>
          <Code>fixed</Code> draws a canvas of an exact size,{' '}
          <Name setup={setup}>width</Name> and <Name setup={setup}>height</Name>{' '}
          in px (360 by 540 unless set): what the editor uses.
        </li>
      </ul>
      <p>
        Each column below is one mode, drawing the same design at the same
        seed into a landscape box and a portrait one.
      </p>
      <FitDemo setup={setup} />
      <p>
        <a href="#sizing-cases">Sizing, case by case</a> draws and measures
        eighteen combinations: a width and a height, a ratio with both set, a
        parent with no height, a min-height, flex parents, a pattern behind
        content and a fixed canvas.
      </p>
    </>
  );
}

/** Settings: palettes, a transparent ground, options and seeds, drawn live. */
export function SettingsGuide({ setup }: { setup: GuideSetup }) {
  return (
    <>
      <p>
        Beside its box, every design takes the same settings: a palette, its
        options and a seed. Each page in the{' '}
        <a href="/patterns/">gallery</a> sets them with controls and writes
        the code for you.
      </p>

      <h3 className={styles.minihead}>Colors</h3>
      <p>
        <Name setup={setup}>palette</Name> recolors a design: the background
        (color 0) first, then the inks
        {isCss(setup) ? ', separated by commas' : ''}. Fewer colors than the
        design was drawn with is fine: the inks cycle, so a two-color palette
        redraws the whole design in two colors. Below, one design at one seed
        in three palettes from the gallery&apos;s library; Ocean has four
        colors to the design&apos;s six, so its inks repeat.
      </p>
      <PaletteDemo setup={setup} />
      <p>
        Any CSS color works for a slot, <Code>transparent</Code> included,
        which drops the ground: whatever is behind the box shows through.
      </p>
      <TransparentDemo setup={setup} />

      <h3 className={styles.minihead}>Options</h3>
      <p>
        <Name setup={setup}>options</Name> are the controls the editor shows,
        keyed by option id
        {isCss(setup) ? (
          <>
            , written as <Code>id: value</Code> pairs separated by{' '}
            <Code>;</Code>
          </>
        ) : null}
        ; an option left out keeps the design&apos;s default. A design&apos;s
        option ids and their values are on its definition (
        <Code>pattern.options</Code>) and on its page in the gallery.
      </p>
      <OptionsDemo setup={setup} />
      <Callout>
        <p>
          Under the <Code>grid</Code> and <Code>cover</Code> fits the{' '}
          <Code>grid</Code> option is derived from the box, so a grid you set
          acts as a hint for the density rather than an exact count.
        </p>
      </Callout>

      <h3 className={styles.minihead}>Seeds</h3>
      <p>
        <Name setup={setup}>seed</Name> picks the arrangement: the same
        design, seed and options draw the same picture at any size, so a seed
        is a design you can keep. Leave it out for a new one each time the
        pattern mounts.
      </p>
    </>
  );
}

/** What the two exports produce, the same in every setup. */
export function ExportNotes() {
  return (
    <p>
      <Code>exportImage()</Code> saves a PNG at any <Code>scale</Code>; bump it
      for print. <Code>exportSvg()</Code> converts the drawing to a vector SVG
      (real shapes and gradients, no <Code>foreignObject</Code>) that opens in
      design tools and scales to any size; <Code>{'{ download: true }'}</Code>{' '}
      saves either as a file. A few designs use smooth conic sweeps an SVG
      cannot express: they set <Code>svgExport: false</Code>, which{' '}
      <Code>supportsSvgExport(pattern)</Code> from <Code>tabbied</Code>{' '}
      checks.
    </p>
  );
}

/** Motion and accessibility: a moving pattern, labels, and reduced motion. */
export function MotionGuide({ setup }: { setup: GuideSetup }) {
  return (
    <>
      <h3 className={styles.minihead}>Ambient motion</h3>
      <p>
        <Name setup={setup}>redrawInterval</Name> reseeds on a timer, in
        milliseconds, morphing from one arrangement to the next: the
        gallery&apos;s shimmer. Ticks are skipped while the tab is hidden or
        the pattern is off screen, so a long page of moving patterns pays only
        for what is on screen. <Name setup={setup}>paused</Name> holds the
        timer without losing its place.
      </p>
      <MotionDemo setup={setup} />

      <h3 className={styles.minihead}>Accessibility</h3>
      {setup === 'element' ? (
        <p>
          The element is decorative, <Code>aria-hidden</Code>, unless it has
          an <Code>aria-label</Code>, which makes it an image with that label.
        </p>
      ) : setup === 'html' || setup === 'javascript' ? (
        <p>
          The core leaves the element as you wrote it, so say what it is:{' '}
          <Code>aria-hidden=&quot;true&quot;</Code> for decoration, or{' '}
          <Code>role=&quot;img&quot;</Code> and an <Code>aria-label</Code> for
          a pattern that is content.
        </p>
      ) : (
        <p>
          A pattern is decorative by default: hidden from assistive
          technology. <Code>{off(setup, 'decorative')}</Code> makes it an image
          with <Code>role=&quot;img&quot;</Code> and a label,{' '}
          <Name setup={setup}>ariaLabel</Name>, which falls back to the
          design&apos;s name.
        </p>
      )}
      <A11yDemo setup={setup} />

      <h3 className={styles.minihead}>Reduced motion</h3>
      <p>
        Under <Code>prefers-reduced-motion: reduce</Code> nothing moves, with
        nothing to configure: the timer never starts, and the designs&apos;
        own cell transitions are muted, so a re-render cuts to the new
        arrangement instead of easing into it. That matters more than it
        sounds: <Code>grid</Code> and <Code>cover</Code> re-derive their cells
        when the box changes, so turning a phone would otherwise animate every
        cell on the page. The preference is watched, not read once, so
        changing it takes effect at once.
      </p>
    </>
  );
}

/** The worked examples every setup page ends with: three groups of recipes, then the sizing cases. */
export function ExampleSections({ setup, recipes }: { setup: GuideSetup; recipes: Recipe[] }) {
  return (
    <>
      <SetupSection id="recipes-layout">
        <p>
          <Prose text="Whole files, imports included, ready to paste, each with its result drawn live above it. Swap the design for any slug in the gallery." />
        </p>
        <RecipeExamples recipes={recipes} group="layout" />
      </SetupSection>

      <SetupSection id="recipes-state">
        <p>
          <Prose text="Patterns that answer to state: colors, seeds, designs, options, motion and export." />
        </p>
        <RecipeExamples recipes={recipes} group="state" />
      </SetupSection>

      <SetupSection id="recipes-integration">
        <p>
          <Prose text="Where the pattern meets the rest of an app." />
        </p>
        <RecipeExamples recipes={recipes} group="integration" />
      </SetupSection>

      <SetupSection id="sizing-cases">
        <p>
          <Prose text="Each case below was measured in a browser, in an 800px-wide parent: the drawing is the box the pattern gets, to scale, and the code is all it takes. Every case uses `radius`; any design behaves the same." />
        </p>
        <SizingExamples setup={setup} />
      </SetupSection>
    </>
  );
}
