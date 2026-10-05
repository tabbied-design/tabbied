'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern } from 'tabbied/react';

// A decorative pattern in a box the caller's class sizes: the Developers
// page's banner, the bands between its sections and the tiles of its mosaic.
// Built only as it nears the viewport, like the gallery's tiles
// (components/template/LazyPattern.tsx), so the page pays for the first
// screenful on load; until then the box shows the palette's ground.

const MOUNT_MARGIN = '400px';

export default function PatternBand({
  pattern,
  palette,
  seed,
  density,
  redrawInterval,
  className,
  children,
}: {
  pattern: PatternDefinition;
  palette: string[];
  seed: string;
  density?: number;
  /** A slow reseed, as on the homepage; the controller stops it under reduced motion. */
  redrawInterval?: number;
  className?: string;
  /** Anything drawn over the pattern, such as a caption. */
  children?: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [approached, setApproached] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setApproached(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: palette[0] }}
    >
      {approached ? (
        <TabbiedPattern
          pattern={pattern}
          palette={palette}
          seed={seed}
          density={density}
          redrawInterval={redrawInterval}
          style={{ position: 'absolute', inset: 0 }}
        />
      ) : null}
      {children}
    </div>
  );
}
