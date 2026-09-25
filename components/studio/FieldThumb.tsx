'use client';

// A pattern field's thumbnail in the customizer's rail, drawn live in the
// colors the field wears on the page, since the committed preview is in the
// design's own palette. The preview underneath shows while the catalog loads;
// the catalog is imported on first use, since only the Patterns tab needs it
// and the rest of the customizer draws its patterns inside the iframe.
import { useEffect, useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import type { PatternDefinition } from 'tabbied';
import styles from './SiteRail.module.css';

type Catalog = Record<string, PatternDefinition>;

let catalog: Promise<Catalog> | null = null;

const loadCatalog = (): Promise<Catalog> =>
  (catalog ??= import('tabbied/patterns').then((module) => module.patterns as Catalog));

/** A miniature's render box: a card's proportions at a fraction of its cost. */
const RENDER = { width: 280, height: 220 };

export default function FieldThumb({
  slug,
  palette,
  seed,
  ground,
}: {
  slug: string;
  /** The field's colors on the page, ground first. Unknown draws the preview. */
  palette: readonly string[] | undefined;
  seed?: string;
  /** The page's ground, behind a field whose own is transparent. */
  ground: string;
}) {
  const [patterns, setPatterns] = useState<Catalog | null>(null);

  useEffect(() => {
    let live = true;

    loadCatalog()
      .then((loaded) => {
        if (live) setPatterns(loaded);
      })
      .catch(() => {
        // The committed preview stays; nothing else depends on this.
      });

    return () => {
      live = false;
    };
  }, []);

  const pattern = patterns?.[slug];

  return (
    <span className={styles.fieldThumb}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a committed preview under public/, no loader needed */}
      <img
        className={styles.fieldThumbImage}
        src={`/previews/${slug}.webp`}
        alt=""
        loading="lazy"
        width="56"
        height="44"
      />
      {pattern && palette ? (
        <span className={styles.fieldThumbLive} style={{ background: ground }}>
          <TabbiedPattern
            key={slug}
            pattern={pattern}
            palette={[...palette]}
            seed={seed ?? 'field-thumb'}
            fit="cover"
            coverRender={RENDER}
          />
        </span>
      ) : null}
    </span>
  );
}
