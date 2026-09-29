'use client';

import { useRef } from 'react';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { blossom } from 'tabbied/patterns';
import styles from './ReactDocs.module.css';

// Interactive companion to the "Reseed & export" section: a ref to the
// component's handle drives redraw()/exportImage() from the buttons. The page
// passes the palette, because the sample beside it prints the same one.
export default function ReseedExportDemo({ palette }: { palette: string[] }) {
  const ref = useRef<TabbiedPatternHandle>(null);

  return (
    <div>
      <TabbiedPattern
        ref={ref}
        pattern={blossom}
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
