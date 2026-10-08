'use client';

import { useEffect, useState, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import styles from './ReactDocs.module.css';

// The parts every live preview on the docs pages is built from: a pattern
// in its box, mounted only as the box nears the viewport (a docs page draws
// dozens, and pays for the first screenful on load), and the preview's
// buttons and rows. RecipePreview, ConceptPreview and the setup pages' own
// demos (PageDemos) share them.

const MOUNT_MARGIN = '400px';

/** True once `ref`'s element has come within MOUNT_MARGIN of the viewport. */
export function useNear(ref: { current: Element | null }) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return near;
}

export type LiveProps = {
  pattern: PatternDefinition;
  seed?: string;
  palette?: string[];
  options?: Record<string, number>;
  fit?: 'grid' | 'cover' | 'fixed';
  density?: number;
  cellSize?: number;
  coverRender?: { width: number; height: number };
  /** The canvas, under fit="fixed"; the box is then this size too. */
  canvas?: { width: number; height: number };
  redrawInterval?: number;
  paused?: boolean;
  ariaLabel?: string;
  /** The box, as the code sizes it. */
  style?: CSSProperties;
  className?: string;
  /** Painted until the pattern mounts, and behind a transparent ground. */
  ground?: string;
  onReady?: () => void;
  handle?: Ref<TabbiedPatternHandle>;
};

/** A pattern in its box, built once the box is near. */
export function Live({ pattern, style, className, ground, handle, ariaLabel, canvas, ...config }: LiveProps) {
  const frame = useRef<HTMLDivElement>(null);
  const near = useNear(frame);
  const background = ground ?? config.palette?.[0] ?? pattern.palette[0];

  return (
    <div
      ref={frame}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: background,
        ...(canvas ? { width: canvas.width, height: canvas.height } : {}),
        ...style,
      }}
    >
      {near ? (
        <TabbiedPattern
          ref={handle}
          pattern={pattern}
          {...config}
          {...(canvas ? { width: canvas.width, height: canvas.height } : {})}
          decorative={!ariaLabel}
          ariaLabel={ariaLabel}
          style={{ position: 'absolute', inset: 0 }}
        />
      ) : null}
    </div>
  );
}

export function Button({
  children,
  onClick,
  disabled,
  pressed,
  code,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  /** For a toggle: whether it is on. */
  pressed?: boolean;
  /** The label is a call as the code writes it, `redraw()`, so it is set in the mono. */
  code?: boolean;
}) {
  return (
    <button
      type="button"
      className={code ? `${styles.demoBtn} ${styles.demoBtnCode}` : styles.demoBtn}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
    >
      {children}
    </button>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className={styles.previewRow}>{children}</div>;
}

/** An SVG's size, as the previews report it. */
export const kilobytes = (svg: string) => `${(new Blob([svg]).size / 1024).toFixed(1)} KB`;

/** Whether the reader has asked for reduced motion, followed as it changes. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return reduced;
}
