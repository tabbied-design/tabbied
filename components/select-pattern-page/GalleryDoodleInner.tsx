'use client';

import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { patterns } from 'tabbied/patterns';
import type { GalleryItem } from 'lib/pattern';
import { galleryThumbnails } from './galleryThumbnails';
import styles from './SelectPattern.module.css';

const DEFAULT_RENDER = { width: 800, height: 800 };

// Each card redraws every 6-9s; the random spread keeps the cards out of
// phase so the gallery shimmers card by card instead of strobing in unison.
//
// It was 2.5-4s, which on a page holding this many cards at once reads as
// constant movement rather than as each design turning over. A template page
// runs its one or two fields at 4.2-6.6s; the gallery has far more in view,
// so it sits past the slow end of that.
const REDRAW_INTERVAL_MS = 6000;
const REDRAW_STAGGER_MS = 3000;

export default function GalleryDoodleInner({
  item,
  palette,
  onReady,
}: {
  item: GalleryItem;
  /** Preview palette override (color0 first) - e.g. an active brand palette. */
  palette?: string[];
  /** Called once the doodle has been measured and first painted. */
  onReady?: () => void;
}) {
  const config = galleryThumbnails[item.slug];
  const pattern = patterns[item.slug];

  const [redrawInterval] = useState(
    () => REDRAW_INTERVAL_MS + Math.random() * REDRAW_STAGGER_MS
  );

  // Gallery thumbnails render dense: for designs that expose a `frequency`
  // option, draw at a random frequency in [0.8, 1.0] (a fresh value per mount,
  // like the seed) rather than each design's authored thumbnail frequency.
  const hasFrequency = pattern?.options?.some(
    (option) => option.id === 'frequency'
  );
  const [thumbFrequency] = useState(() => 0.8 + Math.random() * 0.2);
  const options = hasFrequency
    ? { ...config?.options, frequency: thumbFrequency }
    : config?.options;

  // Thumbnails show the design at its default color count: the active slice
  // of the palette (TabbiedPattern expands it so the style's higher color
  // slots alias back into the active inks, mirroring what the editor renders
  // when it opens).
  const baseColors = config?.palette ?? item.palette;
  const defaultCount = item.colors?.default ?? baseColors.length;

  // No seed prop: a fresh random seed per mount keeps the gallery dynamic -
  // every visit draws a new variation of each design - and redrawInterval
  // rotates it from there (the controller skips ticks while the card is out
  // of view, in a hidden tab, or under reduced motion). The cover fit reproduces the
  // fixed-resolution + transform-scale technique, so fixed-px strokes and
  // shadows keep the proportions of the original 800px pattern at any card
  // size. onReady fires on first paint, letting the parent drop its shimmer.
  return (
    <TabbiedPattern
      pattern={pattern}
      palette={palette ?? baseColors.slice(0, defaultCount)}
      options={options}
      fit="cover"
      coverRender={{ ...DEFAULT_RENDER, ...config?.render }}
      redrawInterval={redrawInterval}
      onReady={onReady}
      className={styles.doodleThumbInner}
    />
  );
}
