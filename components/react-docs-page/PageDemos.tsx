'use client';

import { useRef, useState } from 'react';
import type { PatternDefinition } from 'tabbied';
import type { TabbiedPatternHandle } from 'tabbied/react';
import { Button, Live, Row, kilobytes, useReducedMotion } from './live';
import styles from './ReactDocs.module.css';

// The live results beside the setup pages' own samples: the ones a page
// writes itself (an update, the controller's methods, onReady,
// hydratePatterns), as opposed to the guide's shared demos (GuideDemos).
// Each draws what the sample beside it does, with a button per line of it,
// labelled as the sample spells the call. The page passes the design and
// the settings, because the sample beside it prints the same ones.

/** An option's default on the design, so a demo can put back what it changed. */
function defaults(pattern: PatternDefinition, options: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.keys(options).map((id) => [id, Number(pattern.options.find((option) => option.id === id)?.default)])
  );
}

/**
 * A palette changed on the pattern already on the page: the arrangement
 * stays and the colors move. The button is a toggle, so it can go back.
 */
export function PaletteSwapDemo({
  pattern,
  from,
  to,
  label,
  code,
  height,
}: {
  pattern: PatternDefinition;
  /** The palette before; the design's own when the sample sets none. */
  from?: string[];
  to: string[];
  /** The button, named as the sample names it. */
  label: string;
  /** The label is a call, `update()`, rather than a button in the sample. */
  code?: boolean;
  height: number;
}) {
  const [swapped, setSwapped] = useState(false);
  const before = from ?? pattern.palette;

  return (
    <>
      <Live pattern={pattern} palette={swapped ? to : before} style={{ height }} className={styles.demoArt} />
      <Row>
        <Button code={code} pressed={swapped} onClick={() => setSwapped(!swapped)}>
          {label}
        </Button>
        <span className={styles.previewNote}>
          {swapped
            ? 'Redrawn in place: the same arrangement in the new colors. Press again to go back.'
            : 'Changes the palette of the pattern already drawn.'}
        </span>
      </Row>
    </>
  );
}

/** One line of a sample, as a button: what it calls, and how the sample writes the call. */
export type ControllerAction =
  | { kind: 'update'; label: string; palette?: string[]; options?: Record<string, number> }
  | { kind: 'redraw'; label: string; seed?: string }
  | { kind: 'svg'; label: string }
  | { kind: 'png'; label: string; scale?: number }
  | { kind: 'destroy'; label: string };

/**
 * The controller's methods, one button each. An update is a toggle, so it
 * can be undone; destroy takes the pattern away, and the box offers it back.
 */
export function ControllerDemo({
  pattern,
  actions,
  height,
  ready,
}: {
  pattern: PatternDefinition;
  actions: ControllerAction[];
  height: number;
  /** Shown once the first render is drawn, as the sample's ready handler says it. */
  ready?: string;
}) {
  const handle = useRef<TabbiedPatternHandle>(null);
  const [drawn, setDrawn] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const [said, setSaid] = useState<string | null>(null);

  const update = actions.find((action) => action.kind === 'update');
  const palette = update?.palette && updated ? update.palette : pattern.palette;
  const options = update?.options ? (updated ? update.options : defaults(pattern, update.options)) : undefined;

  const run = async (action: ControllerAction) => {
    const art = handle.current;
    switch (action.kind) {
      case 'update':
        setUpdated(!updated);
        setSaid(updated ? 'Back as it was, in place.' : 'Only what changed reached the page, redrawn in place.');
        return;
      case 'redraw':
        art?.redraw(action.seed);
        setSaid(action.seed ? `Seed ${action.seed}: the same arrangement every time.` : 'A new seed, eased into.');
        return;
      case 'svg':
        try {
          const result = await art?.exportSvg();
          if (result) setSaid(`${kilobytes(result.svg)} of SVG, kept here rather than saved.`);
        } catch (error) {
          setSaid(`exportSvg() failed: ${(error as Error).message}`);
        }
        return;
      case 'png':
        try {
          await art?.exportImage({ scale: action.scale ?? 1, download: true });
          setSaid('Saved as a PNG.');
        } catch (error) {
          setSaid(`exportImage() failed: ${(error as Error).message}`);
        }
        return;
      case 'destroy':
        setDestroyed(true);
        setDrawn(false);
        setSaid(null);
        return;
    }
  };

  if (destroyed) {
    return (
      <>
        <div className={styles.previewEmpty} style={{ height }}>
          Destroyed: the pattern, its timers and its observers are gone.
        </div>
        <Row>
          <Button
            onClick={() => {
              setDestroyed(false);
              setUpdated(false);
            }}
          >
            Mount it again
          </Button>
        </Row>
      </>
    );
  }

  return (
    <>
      <Live
        pattern={pattern}
        palette={palette}
        options={options}
        style={{ height }}
        className={styles.demoArt}
        handle={handle}
        onReady={() => setDrawn(true)}
      />
      <Row>
        {actions.map((action) => (
          <Button
            key={action.label}
            code
            disabled={!drawn}
            pressed={action.kind === 'update' ? updated : undefined}
            onClick={() => run(action)}
          >
            {action.label}
          </Button>
        ))}
      </Row>
      <Row>
        <span className={styles.previewNote}>
          {said ?? (drawn ? (ready ?? 'Drawn. Each button runs its line.') : 'Waiting for the first render...')}
        </span>
      </Row>
    </>
  );
}

/** onReady: the first render is drawn, so an export has something to read. */
export function ReadyDemo({ pattern, height }: { pattern: PatternDefinition; height: number }) {
  const handle = useRef<TabbiedPatternHandle>(null);
  const [said, setSaid] = useState<string | null>(null);

  return (
    <>
      <Live
        pattern={pattern}
        style={{ height }}
        className={styles.demoArt}
        handle={handle}
        onReady={async () => {
          try {
            const result = await handle.current?.exportSvg();
            if (result) setSaid(`onReady ran after the first render, and exportSvg() returned ${kilobytes(result.svg)} of SVG.`);
          } catch (error) {
            setSaid(`onReady ran, and exportSvg() failed: ${(error as Error).message}`);
          }
        }}
      />
      <Row>
        <span className={styles.previewNote}>{said ?? 'Waiting for the first render...'}</span>
      </Row>
    </>
  );
}

/** hydratePatterns() over two elements, with a timer from `defaults` and a redraw for each. */
export function HydrateDemo({
  patterns,
  redrawInterval,
  height,
}: {
  patterns: { slug: string; pattern: PatternDefinition }[];
  redrawInterval: number;
  height: number;
}) {
  const handles = useRef<(TabbiedPatternHandle | null)[]>([]);
  const reduced = useReducedMotion();

  return (
    <>
      <div className={styles.variantGrid}>
        {patterns.map(({ slug, pattern }, index) => (
          <figure key={slug} className={styles.fitItem}>
            <Live
              pattern={pattern}
              redrawInterval={redrawInterval}
              style={{ height }}
              className={styles.demoArt}
              handle={(handle) => {
                handles.current[index] = handle;
              }}
            />
            <figcaption className={styles.fitCaption}>
              <code>{`data-pattern="${slug}"`}</code>
            </figcaption>
          </figure>
        ))}
      </div>
      <Row>
        <Button code onClick={() => handles.current.forEach((handle) => handle?.redraw())}>
          redraw()
        </Button>
        <span className={styles.previewNote}>
          {reduced
            ? 'Your system asks for reduced motion, so the timers never start.'
            : `Both reseed every ${redrawInterval / 1000} seconds, from defaults.`}
        </span>
      </Row>
    </>
  );
}
