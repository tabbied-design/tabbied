import type { ReactNode } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { blossom, maze, mixtape, quilt, radius, ring, vitrail } from 'tabbied/patterns';
import { PACKAGE_VERSION } from 'lib/siteCounts';
import CodeBlock from './CodeBlock';
import Example from './Example';
import ReseedExportDemo from './ReseedExportDemo';
import {
  GUIDE,
  OPTION_DEMOS,
  PALETTE_DEMOS,
  REDRAW_PALETTE,
  TRANSPARENT_PALETTE,
  type GuidePart,
  type GuideSetup,
} from './examples/guide';
import styles from './ReactDocs.module.css';

// The live demos the six setup pages share, one per part of the guide: the
// same pattern drawn the same way on every page, over the file that draws
// it in that page's setup (examples/guide.ts). A page's prose around them is
// its own. Server components; the patterns are client islands.

/** A sample from the guide for one setup, with the package version filled in. */
function sample(setup: GuideSetup, part: GuidePart) {
  const { code, lang, file } = GUIDE[setup][part];
  return { code: code.replaceAll('@VERSION@', PACKAGE_VERSION), lang, title: file };
}

function Demo({ setup, part, children }: { setup: GuideSetup; part: GuidePart; children: ReactNode }) {
  const { code, lang, title } = sample(setup, part);
  return (
    <Example code={code} lang={lang} title={title}>
      {children}
    </Example>
  );
}

/** A sample with nothing to draw beside it. */
export function GuideCode({ setup, part }: { setup: GuideSetup; part: GuidePart }) {
  const { code, lang, title } = sample(setup, part);
  return <CodeBlock code={code} lang={lang} title={title} className={styles.codeStandalone} />;
}

export function QuickStartDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="quickStart">
      <TabbiedPattern pattern={radius} seed="k9Pz" height={320} className={styles.demoArt} />
    </Demo>
  );
}

// The fit modes. Every column draws `vitrail` at the same seed into the same
// landscape and portrait boxes, so the only variable on show is `fit`.
const FIT_DEMOS = [
  { fit: 'grid', note: 'The cell grid is re-derived per box, so cells stay square in both.' },
  { fit: 'cover', note: 'One render, scaled uniformly to fill. Fixed-px strokes keep their proportions.' },
  { fit: 'fixed', note: 'A canvas of its own size, here 150 x 225, which each box crops.' },
] as const;

// One fit mode, drawn into both box shapes. Density 0.25 (90px cells) keeps
// the cells big enough to read as shapes, and to show whether they stay square.
function FitColumn({ fit, note }: (typeof FIT_DEMOS)[number]) {
  const pattern = (
    <TabbiedPattern
      pattern={vitrail}
      seed="k9Pz"
      fit={fit}
      density={0.25}
      {...(fit === 'fixed' ? { width: 150, height: 225 } : {})}
    />
  );

  return (
    <figure className={styles.fitItem}>
      <div className={styles.fitShapes}>
        <div className={styles.fitWide}>{pattern}</div>
        <div className={styles.fitTall}>{pattern}</div>
      </div>
      <figcaption className={styles.fitCaption}>
        <code>fit: {fit}</code>
        {note}
      </figcaption>
    </figure>
  );
}

export function FitDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="fit">
      <div className={styles.fitGrid}>
        {FIT_DEMOS.map((demo) => (
          <FitColumn key={demo.fit} {...demo} />
        ))}
      </div>
    </Demo>
  );
}

export function PaletteDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="palette">
      <div className={styles.variantGrid}>
        {PALETTE_DEMOS.map(({ name, colors }) => (
          <figure key={name} className={styles.fitItem}>
            <TabbiedPattern pattern={mixtape} seed="k9Pz" palette={[...colors]} height={180} className={styles.demoArt} />
            <figcaption className={styles.fitCaption}>
              <code>{name}</code>
              <span className={styles.swatches} aria-hidden="true">
                {colors.map((color, index) => (
                  <span key={index} className={styles.swatch} style={{ backgroundColor: color }} />
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Demo>
  );
}

/** The transparent ground, drawn over a photograph so the missing ground shows. */
export function TransparentDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="transparent">
      <figure className={styles.fitItem}>
        <div className={styles.previewPhoto}>
          <TabbiedPattern pattern={radius} palette={[...TRANSPARENT_PALETTE]} height={240} />
        </div>
        <figcaption className={styles.fitCaption}>
          Over a photograph here, so the ground that is not drawn shows.
        </figcaption>
      </figure>
    </Demo>
  );
}

export function OptionsDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="options">
      <div className={styles.variantGrid}>
        {OPTION_DEMOS.map((thickness) => (
          <figure key={thickness} className={styles.fitItem}>
            <TabbiedPattern pattern={maze} seed="k9Pz" options={{ thickness }} height={180} className={styles.demoArt} />
            <figcaption className={styles.fitCaption}>
              <code>{`thickness: ${thickness}`}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    </Demo>
  );
}

export function RedrawDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="redraw">
      <ReseedExportDemo pattern={blossom} palette={[...REDRAW_PALETTE]} />
    </Demo>
  );
}

export function MotionDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="motion">
      <TabbiedPattern pattern={quilt} fit="cover" redrawInterval={2000} height={280} className={styles.demoArt} />
    </Demo>
  );
}

export function A11yDemo({ setup }: { setup: GuideSetup }) {
  return (
    <Demo setup={setup} part="a11y">
      <div className={styles.variantGrid}>
        <figure className={styles.fitItem}>
          <TabbiedPattern pattern={ring} height={180} className={styles.demoArt} />
          <figcaption className={styles.fitCaption}>
            <code>decorative</code>
            Hidden from assistive technology.
          </figcaption>
        </figure>
        <figure className={styles.fitItem}>
          <TabbiedPattern
            pattern={ring}
            height={180}
            decorative={false}
            ariaLabel="Generative pattern of rings"
            className={styles.demoArt}
          />
          <figcaption className={styles.fitCaption}>
            <code>labelled</code>
            Read as an image: &quot;Generative pattern of rings&quot;.
          </figcaption>
        </figure>
      </div>
    </Demo>
  );
}
