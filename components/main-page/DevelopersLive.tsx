'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ogee from 'tabbied/patterns/ogee';
import { DEV_SAMPLE } from './homeData';
import styles from './ForDevelopers.module.css';

// The two live parts of the developers section's code card: its Copy button,
// and the strip under the code, which is the code's own output.
//
// The strip mounts its pattern only as the card nears the viewport, like
// every live preview on the site (components/template/LazyPattern.tsx), and
// loads the React component then too: css-doodle registers a custom element
// on import and is the heaviest thing on the page, and this is the one place
// the homepage draws a live pattern. The design comes in by its own entry
// (tabbied/patterns/ogee) rather than from the catalog the sample names,
// which would bring every design with it; it is the same definition.

const TabbiedPattern = dynamic(() => import('tabbied/react').then((module) => module.TabbiedPattern), {
  ssr: false,
});

const MOUNT_MARGIN = '400px';

export function SamplePattern() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN }
    );
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={styles.strip}
      // The ground until the pattern mounts. The text color is a hex because
      // a pattern inherits it as currentColor, and an oklch() one reaches the
      // SVG converter as a lab() it cannot read.
      style={{ backgroundColor: DEV_SAMPLE.palette[0], color: '#e6e7ee' }}
    >
      {near ? (
        <TabbiedPattern pattern={ogee} palette={[...DEV_SAMPLE.palette]} height={DEV_SAMPLE.height} />
      ) : null}
    </div>
  );
}

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // No clipboard (an insecure context, or permission refused): the code
      // is on the page to select by hand.
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
