'use client';

import { useRef } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import styles from './ReactDocs.module.css';

// Interactive companion to the "Updates, redraw and export" section: a ref
// to the component's handle drives redraw()/exportImage() from the buttons.
// The page passes the design and palette, because the sample beside it
// prints the same ones.
export default function ReseedExportDemo({ pattern, palette }: { pattern: PatternDefinition; palette: string[] }) {
  const ref = useRef<TabbiedPatternHandle>(null);

  return (
    <div>
      <TabbiedPattern
        ref={ref}
        pattern={pattern}
        palette={palette}
        fit="cover"
        className={styles.demoArt}
        style={{ width: '100%', height: 280 }}
      />

      <div className={styles.demoActions}>
        <button
          type="button"
          className={styles.demoBtn}
          onClick={() => ref.current?.redraw()}
        >
          Redraw
        </button>
        <button
          type="button"
          className={`${styles.demoBtn} ${styles.demoBtnPrimary}`}
          onClick={() => ref.current?.exportImage()}
        >
          Export PNG
        </button>
      </div>
    </div>
  );
}
