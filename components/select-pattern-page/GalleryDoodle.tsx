'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GalleryItem } from 'lib/pattern';
import { galleryThumbnails } from './galleryThumbnails';
import styles from './SelectPattern.module.css';

// css-doodle registers a browser custom element on import, so the renderer can
// only run on the client. The frame is rendered here (outside the lazy
// boundary) so the card reserves its space and nothing shifts when the doodle
// mounts.
const GalleryDoodleInner = dynamic(() => import('./GalleryDoodleInner'), {
  ssr: false,
});

// How far outside the viewport a card starts rendering its doodle. Generous
// enough that scrolling at a normal pace never catches an unmounted card,
// small enough that the initial load only renders the first screenful or two.
const MOUNT_MARGIN = '400px';

// Whether a hex background reads as dark, so the loading shimmer can sweep a
// light band over dark cards and a dark band over light ones. An #rrggbbaa
// reads its rgb; anything that is not hex (`transparent`) defaults to light.
const isDarkColor = (hex: string): boolean => {
  const match = /^#([0-9a-f]{6})/i.exec(hex ?? '');

  if (!match) {
    return false;
  }

  const int = parseInt(match[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  // Perceived luminance (sRGB-weighted), normalized to 0-1.
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
};

export default function GalleryDoodle({
  item,
  palette,
}: {
  item: GalleryItem;
  /** Preview palette override (color0 first) - e.g. an active brand palette. */
  palette?: string[];
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  // Each card mounts its doodle only once it approaches the viewport, and then
  // stays mounted, so the initial work is bounded by the viewport rather than
  // by the size of the gallery. The observer disconnects after its one report:
  // reseed ticks are gated by the pattern controller's own viewport observer
  // (createPattern.ts), and a second gate here would only re-render the card.
  const [hasApproached, setHasApproached] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = frameRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasApproached(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // The design's background color (color0) drives the loading shimmer's tone and
  // the transparent-background checkerboard.
  const background =
    palette?.[0] ?? galleryThumbnails[item.slug]?.palette?.[0] ?? item.palette[0];

  const transparent = background === 'transparent';

  return (
    <div
      ref={frameRef}
      className={
        transparent
          ? `${styles.doodleThumb} ${styles.thumbChecker}`
          : styles.doodleThumb
      }
    >
      {hasApproached && (
        <GalleryDoodleInner
          item={item}
          palette={palette}
          onReady={() => setReady(true)}
        />
      )}
      {/* Server-rendered, so it animates before any JS runs; faded out once
          the doodle first paints. */}
      <div
        className={[
          styles.thumbShimmer,
          isDarkColor(background) ? styles.thumbShimmerDark : '',
          ready ? styles.thumbShimmerHidden : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          /^#[0-9a-f]{6,8}$/i.test(background ?? '')
            ? { backgroundColor: background }
            : undefined
        }
        aria-hidden="true"
      />
    </div>
  );
}
