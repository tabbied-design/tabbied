import { radius } from 'tabbied/patterns';
import CodeBlock from './CodeBlock';
import PatternBand from './PatternBand';
import { homePalette } from './homePalettes';
import { Code } from './parts';
import {
  SIZING_CASES,
  familyOf,
  sizingCode,
  variantFor,
  type Result,
  type Setup,
} from './examples/sizing';
import styles from './ReactDocs.module.css';

// The sizing section every setup's page shares: the rules, then each case
// with what the browser draws (to scale, in an 800px-wide parent) and the
// code in that page's spelling. The data and the code are
// examples/sizing.ts; this only lays them out. Server component, apart from
// the live pattern in each box.
//
// Each case is a card of its own, its code inside it, so a code block never
// reads as belonging to the case after it. The boxes are the design the code
// names, live, in the homepage hero's first palette (Mint) on a transparent
// ground, outlined so the box's extent reads where the ground shows.

/** Prose with `code` spans, the form the example data is written in. */
export function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, index) => (index % 2 ? <Code key={index}>{part}</Code> : part))}
    </>
  );
}

/**
 * The example data is written with React's spellings; each page reads its
 * own: `:fill="false"` and kebab-case props in a Vue template, `fill: false`
 * in a Svelte props object or a resolveBoxStyle() call.
 */
const SPELLINGS: Partial<Record<Setup, [string, string][]>> = {
  vue: [
    ['`fill={false}`', '`:fill="false"`'],
    ['`aspectRatio`', '`aspect-ratio`'],
    ['`maxHeight`', '`max-height`'],
    ['`maxWidth`', '`max-width`'],
  ],
  svelte: [['`fill={false}`', '`fill: false`']],
  javascript: [['`fill={false}`', '`fill: false`']],
};

const spell = (setup: Setup, text: string) =>
  (SPELLINGS[setup] ?? []).reduce((out, [from, to]) => out.replaceAll(from, to), text);

/** The drawing scale: the 800px parent is drawn 320px wide. */
const SCALE = 0.4;

/** The hero's palette, on no ground of its own. */
const BOX_PALETTE = homePalette('Mint', radius, { transparent: true });

function ResultBox({ result }: { result: Result }) {
  const parentH = Math.max(result.parentH ?? 0, result.h) * SCALE;
  const drawn = result.h > 0;

  return (
    <figure className={styles.sizeResult}>
      <div
        className={styles.sizeParent}
        style={{ width: 800 * SCALE, height: Math.max(parentH, drawn ? 0 : 24) }}
      >
        {drawn ? (
          <PatternBand
            pattern={radius}
            palette={BOX_PALETTE}
            seed="k9Pz"
            density={1}
            className={styles.sizeBox}
            style={{ width: result.w * SCALE, height: result.h * SCALE }}
          />
        ) : (
          <div className={styles.sizeEmpty} />
        )}
      </div>
      <figcaption className={styles.sizeCaption}>
        {drawn
          ? result.followsContent
            ? `${result.w} wide, as tall as the content`
            : `${result.w} x ${result.h}`
          : '0px tall: nothing is drawn'}
        <span> in an 800px-wide parent</span>
      </figcaption>
    </figure>
  );
}

const RULES: Record<'props' | 'css', string[]> = {
  props: [
    'A pattern has no size of its own: it fills the box it is given, and an empty box draws nothing.',
    'By default the box fills its parent, `width: 100%; height: 100%` (the `fill` prop), so the parent needs a height. In a parent that sizes to its content, give the pattern a `height` or an `aspectRatio`.',
    '`width` and `height` replace one axis each. Numbers are px; a string is any CSS length.',
    '`aspectRatio` works out the axis that has no size. When `width` and `height` are both set, the ratio is ignored, and `fill` counts as setting the width.',
    '`fill={false}` drops the 100%s, which is what a ratio from a height, a ratio under a `maxHeight`, or a flex item needs.',
    'With `fit="fixed"` the box is the canvas, 360 by 540 unless set.',
  ],
  css: [
    'A pattern has no size of its own: it fills the box it is given, and an empty box draws nothing.',
    'The box is the element\'s own CSS. It is a block, so it is full width, and 0px tall until something gives it a height: a `height`, an `aspect-ratio`, `height: 100%` of a parent that has one, or a flex or grid parent.',
    '`aspect-ratio` works out the axis that has no size. When the width and height are both set, the ratio is ignored.',
    'With `fit="fixed"` the pattern is drawn at an exact canvas size, 360 by 540 unless set.',
  ],
};

export default function SizingExamples({ setup }: { setup: Setup }) {
  const family = familyOf(setup);

  return (
    <>
      <ul className={styles.list}>
        {RULES[family].map((rule) => (
          <li key={rule}>
            <Prose text={spell(setup, rule)} />
          </li>
        ))}
      </ul>
      {SIZING_CASES.map((sizing) => {
        const variant = variantFor(setup, sizing);
        const snippet = sizingCode(setup, sizing);

        if (!variant || !snippet) return null;

        return (
          <div key={sizing.id} className={styles.exampleCard}>
            <div className={styles.sizeExample}>
              <div>
                <h3 id={`sizing-${sizing.id}`} className={styles.minihead}>
                  {sizing.title}
                </h3>
                <p>
                  <Prose text={spell(setup, variant.says)} />
                </p>
              </div>
              <ResultBox result={variant.result} />
            </div>
            <CodeBlock code={snippet.code} lang={snippet.lang} className={styles.exampleCode} />
          </div>
        );
      })}
    </>
  );
}
