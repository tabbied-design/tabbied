'use client';

import { useEffect, useRef } from 'react';
import { hydratePatterns } from 'tabbied';
import { radius, windowpane } from 'tabbied/patterns';

/**
 * The declarative mounting path, as a packaged HTML template uses it: plain
 * markup carrying its config in data-* attributes, mounted by one
 * hydratePatterns() call.
 *
 * `root` is scoped to this section on purpose: the page's <TabbiedPattern>
 * placeholders carry the same attributes, and an unscoped call would mount a
 * second controller on top of React's.
 */
export function HydrateProbe() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const mounted = hydratePatterns({
      patterns: { radius, windowpane },
      root,
    });

    return () => mounted.forEach(({ controller }) => controller.destroy());
  }, []);

  return (
    <div ref={rootRef} style={{ display: 'grid', gap: 16 }}>
      {/* Hand-written markup: no component, no props. */}
      <div
        id="hydrate-basic"
        data-pattern="radius"
        data-seed="k9Pz"
        data-fit="grid"
        data-palette="#0B1020, #3E8BFF, #3FFFB2"
        data-cell-size="60"
        style={{ width: '100%', height: 200 }}
      />
      {/* fit:"fixed" is the one strategy that keeps the authored grid option,
          so it shows that data-options reached the controller. */}
      <div
        id="hydrate-options"
        data-pattern="radius"
        data-seed="k9Pz"
        data-fit="fixed"
        data-options="grid: 4x6"
        data-width="240"
        data-height="360"
      />
      {/* An unknown slug must be skipped without taking the others down. */}
      <div id="hydrate-unknown" data-pattern="notadesign" />
    </div>
  );
}
