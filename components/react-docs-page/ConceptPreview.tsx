'use client';

import { useRef, useState, type ReactNode } from 'react';
import type { PatternDefinition } from 'tabbied';
import { blossom, maze, mixtape, quilt, radius, ring, vitrail, windowpane } from 'tabbied/patterns';
import type { TabbiedPatternHandle } from 'tabbied/react';
import { Button, Live, Row, useReducedMotion, type LiveProps } from './live';
import type { ConceptId, ConceptPattern, ConceptPreviewSpec } from './examples/concepts';
import styles from './ReactDocs.module.css';

// The live result above an example on /docs/concepts: what the example
// draws, drawn by the package, its buttons working. One serves every setup
// behind the switch, since each setup's example draws the same thing. The
// settings come from CONCEPT_PREVIEWS (examples/concepts.ts), passed in by
// the server component so the code samples stay out of the browser, and the
// tests hold them to every setup's code. Only the layout is decided here.

const DESIGNS: Record<string, PatternDefinition> = { blossom, maze, mixtape, quilt, radius, ring, vitrail, windowpane };

/** A pattern from the spec, in the box the example gives it. */
function Pattern({ spec, ...extra }: { spec: ConceptPattern } & Partial<LiveProps>) {
  const { height, aspectRatio } = spec;
  return (
    <Live
      pattern={DESIGNS[spec.design]}
      seed={spec.seed}
      palette={spec.palette ? [...spec.palette] : undefined}
      options={spec.options}
      fit={spec.fit}
      density={spec.density}
      cellSize={spec.cellSize}
      coverRender={spec.coverRender}
      canvas={spec.canvas}
      redrawInterval={spec.redrawInterval}
      ariaLabel={spec.ariaLabel}
      style={{ ...(height ? { height } : {}), ...(aspectRatio ? { aspectRatio } : {}) }}
      className={styles.demoArt}
      {...extra}
    />
  );
}

function Caption({ spec, children }: { spec: ConceptPattern; children?: ReactNode }) {
  return (
    <figcaption className={styles.fitCaption}>
      {spec.label ? <code>{spec.label}</code> : null}
      {spec.note}
      {children}
    </figcaption>
  );
}

/** The colors a pattern draws in, the design's own where the example sets none. */
function Swatches({ spec }: { spec: ConceptPattern }) {
  const colors = spec.palette ?? DESIGNS[spec.design].palette;
  return (
    <span className={styles.swatches} aria-hidden="true">
      {colors.map((color, index) => (
        <span key={index} className={styles.swatch} style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

/** Patterns side by side, each captioned. */
function Figures({ patterns }: { patterns: ConceptPattern[] }) {
  return (
    <div className={styles.variantGrid}>
      {patterns.map((spec, index) => (
        <figure key={index} className={styles.fitItem}>
          <Pattern spec={spec} />
          <Caption spec={spec} />
        </figure>
      ))}
    </div>
  );
}

/** The four ways to size one design; the fixed canvas is drawn at half size, so it fits the row. */
function Sizing({ patterns }: { patterns: ConceptPattern[] }) {
  return (
    <div className={styles.conceptSizing}>
      {patterns.map((spec, index) => (
        <figure key={index} className={styles.fitItem}>
          {spec.canvas ? (
            <div
              className={`${styles.demoArt} ${styles.halfScale}`}
              style={{ width: spec.canvas.width / 2, height: spec.canvas.height / 2 }}
            >
              <Pattern spec={spec} className={undefined} />
            </div>
          ) : (
            <Pattern spec={spec} />
          )}
          <Caption spec={spec} />
        </figure>
      ))}
    </div>
  );
}

/** One design in three palettes; a transparent ground is drawn over a photograph, so it shows. */
function Colors({ patterns }: { patterns: ConceptPattern[] }) {
  return (
    <div className={styles.variantGrid}>
      {patterns.map((spec, index) => (
        <figure key={index} className={styles.fitItem}>
          {spec.palette?.[0] === 'transparent' ? (
            <div className={`${styles.demoArt} ${styles.previewPhoto}`}>
              <Pattern spec={spec} />
            </div>
          ) : (
            <Pattern spec={spec} />
          )}
          <Caption spec={spec}>
            <Swatches spec={spec} />
          </Caption>
        </figure>
      ))}
    </div>
  );
}

/** A kept seed, a new one, and both exports, from the pattern's handle. */
function Seeds({ spec, buttons }: { spec: ConceptPattern; buttons: string[] }) {
  const handle = useRef<TabbiedPatternHandle>(null);
  const [ready, setReady] = useState(false);
  const [kept, setKept] = useState(true);
  const [shuffle, back, png, svg] = buttons;

  return (
    <>
      <Pattern spec={spec} handle={handle} onReady={() => setReady(true)} />
      <Row>
        <Button
          disabled={!ready}
          onClick={() => {
            handle.current?.redraw();
            setKept(false);
          }}
        >
          {shuffle}
        </Button>
        <Button
          disabled={!ready}
          onClick={() => {
            handle.current?.redraw(spec.seed);
            setKept(true);
          }}
        >
          {back}
        </Button>
        <Button disabled={!ready} onClick={() => handle.current?.exportImage({ scale: 4, download: true })}>
          {png}
        </Button>
        <Button disabled={!ready} onClick={() => handle.current?.exportSvg({ download: true })}>
          {svg}
        </Button>
      </Row>
      <Row>
        <span className={styles.previewNote}>
          {kept
            ? `Seed ${spec.seed}: the same picture at any size, on every visit.`
            : `A new seed. ${back} brings the first picture back.`}
        </span>
      </Row>
    </>
  );
}

/** A redraw timer and the button that holds it. */
function Motion({ spec }: { spec: ConceptPattern }) {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <Pattern spec={spec} paused={paused} />
      <Row>
        <Button onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</Button>
        <span className={styles.previewNote}>
          {reduced
            ? 'Your system asks for reduced motion, so the timer never starts.'
            : paused
              ? 'Paused, holding its place.'
              : `A new seed every ${spec.redrawInterval! / 1000} seconds.`}
        </span>
      </Row>
    </>
  );
}

export default function ConceptPreview({ id, spec }: { id: ConceptId; spec: ConceptPreviewSpec }) {
  const { patterns, buttons = [] } = spec;

  switch (id) {
    case 'sizing':
      return <Sizing patterns={patterns} />;
    case 'colors':
      return <Colors patterns={patterns} />;
    case 'seeds':
      return <Seeds spec={patterns[0]} buttons={buttons} />;
    case 'motion':
      return <Motion spec={patterns[0]} />;
    default:
      return <Figures patterns={patterns} />;
  }
}
