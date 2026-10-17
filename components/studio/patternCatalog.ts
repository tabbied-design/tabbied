'use client';

// The pattern catalog, for the rail's live thumbnails: imported on first use,
// once, since only the Patterns tab needs it and the rest of the customizer
// draws its patterns inside the iframe.
import { useEffect, useState } from 'react';
import type { PatternDefinition } from 'tabbied';

export type Catalog = Record<string, PatternDefinition>;

let catalog: Promise<Catalog> | null = null;

const loadCatalog = (): Promise<Catalog> =>
  (catalog ??= import('tabbied/patterns').then((module) => module.patterns as Catalog));

/** The catalog once it has loaded, null until then (or if it never does). */
export function usePatternCatalog(): Catalog | null {
  const [patterns, setPatterns] = useState<Catalog | null>(null);

  useEffect(() => {
    let live = true;

    loadCatalog()
      .then((loaded) => {
        if (live) setPatterns(loaded);
      })
      .catch(() => {
        // What was drawing in its place stays; nothing else depends on this.
      });

    return () => {
      live = false;
    };
  }, []);

  return patterns;
}
