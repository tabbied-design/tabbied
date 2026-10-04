'use client';

import { useEffect, useState } from 'react';
import { definePatterns } from 'tabbied/element';
import { radius, windowpane } from 'tabbied/patterns';

// Registered at module scope, before any element on the page upgrades, the
// way a bundled app would: nothing is fetched by slug, and the bundler ships
// these two designs and no others.
definePatterns({ radius });

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'tabbied-pattern': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        pattern?: unknown;
        seed?: string;
        palette?: string | string[];
      };
    }
  }
}

/**
 * <tabbied-pattern> in a bundled React 19 app, the bundler path of
 * tabbied/element: one element by a registered slug, one given its
 * definition as a property (React 19 sets a property when the element has
 * one), and a palette switched through a prop. The CDN path, a slug loaded
 * from dist/patterns/, is e2e/element.spec.ts's other half, served from disk.
 */
export function ElementProbe() {
  const [warm, setWarm] = useState(false);
  const [mounted, setMounted] = useState(false);

  // The element is client-only by nature; render it after mount so the
  // export's markup and the first client render agree.
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <tabbied-pattern
        id="element-registered"
        pattern="radius"
        seed="k9Pz"
        palette={warm ? '#FFF4E6, #E8590C' : '#0B1020, #3E8BFF, #3FFFB2'}
        style={{ aspectRatio: '3 / 2', maxWidth: 480 }}
      />
      <tabbied-pattern
        id="element-property"
        pattern={windowpane}
        seed="k9Pz"
        style={{ height: 200 }}
      />
      <button id="element-warm" type="button" onClick={() => setWarm(true)}>
        Warm
      </button>
    </div>
  );
}
