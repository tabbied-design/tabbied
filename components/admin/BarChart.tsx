'use client';

// The admin pages' bar chart: a bar per hour, day or week of the range, each a
// stack of parts, and a readout beside the bar under the pointer with every
// figure behind it. The whole column is the target, not the painted bar, so a
// day with one sign-up is as easy to point at as the busiest. The keyboard
// gets the same readout: the chart takes focus once, and the arrows walk it.
// To a screen reader the chart is an image whose label lists the bars that
// have anything, and the readout is announced as it moves.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './admin.module.css';

export type ChartBar = {
  key: string;
  /** Under the bar; only every few are shown when the bars are many. */
  tick: string;
  /** The readout's first line: the hour, day or week. */
  heading: string;
  /** Stacked from the baseline up; together they are the bar's height. */
  parts: { value: number; tone: string }[];
  /** The readout's lines, a figure and what it counts, keyed by its part's tone when it has one. */
  lines: { value: string; label: string; tone?: string }[];
  /** The bar in the image's label, or empty to leave it out (a bar with nothing). */
  summary: string;
};

const height = (bar: ChartBar) => bar.parts.reduce((sum, part) => sum + part.value, 0);

/** The readout sits this far from its bar. */
const GAP = 10;

/** The most labels under the bars, however wide the chart. */
const MAX_TICKS = 15;

/** About how wide a label of `chars` is, in the 10px mono, with room around it. */
const tickWidth = (chars: number) => chars * 6.5 + 14;

export default function BarChart({
  title,
  sub,
  aside,
  label,
  bars,
}: {
  title: string;
  sub: string;
  /** The head's right side: a legend or a badge. */
  aside?: ReactNode;
  /** What the bars are, to start the image's label ("New accounts per day"). */
  label: string;
  bars: ChartBar[];
}) {
  const plot = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [width, setWidth] = useState(0);
  const shown = active === null ? null : (bars[active] ?? null);
  const peak = Math.max(1, ...bars.map(height));
  // Past a fortnight the bars close up and only every few carry a label, as
  // many as fit the chart's width: a month on a phone, or one of the
  // Downloads page's pair, labels fewer bars than a month across a desktop.
  const dense = bars.length > 14;
  const fit = width ? Math.floor(width / tickWidth(Math.max(1, ...bars.map((bar) => bar.tick.length)))) : MAX_TICKS;
  const every = Math.ceil(bars.length / Math.max(1, Math.min(MAX_TICKS, fit)));

  useEffect(() => {
    const box = plot.current;

    if (!box) return;

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(box);

    return () => observer.disconnect();
  }, []);

  // Beside the bar, on the side with more room, and inside the chart: it is
  // measured here because its width depends on its words.
  useLayoutEffect(() => {
    const box = plot.current;
    const tip = readout.current;
    const column = active === null ? null : box?.querySelector<HTMLElement>(`[data-bar="${active}"]`);

    if (!box || !tip || !column) return;

    const width = box.clientWidth;
    const size = tip.offsetWidth;
    const after = column.offsetLeft + column.offsetWidth + GAP;
    const before = column.offsetLeft - GAP - size;
    const preferAfter = column.offsetLeft + column.offsetWidth / 2 < width / 2;
    const x = preferAfter ? (after + size <= width ? after : before) : before >= 0 ? before : after;

    tip.style.left = `${Math.max(0, Math.min(x, width - size))}px`;
  }, [active, bars]);

  const pick = (target: EventTarget) => {
    const column = (target as Element).closest?.<HTMLElement>('[data-bar]');

    // Between columns nothing changes, so the readout does not flicker in a gap.
    if (column) setActive(Number(column.dataset.bar));
  };

  const step = (key: string) => {
    const last = bars.length - 1;
    const now = active ?? last;

    if (key === 'ArrowLeft') return Math.max(0, now - 1);
    if (key === 'ArrowRight') return Math.min(last, now + 1);
    if (key === 'Home') return 0;
    if (key === 'End') return last;
    return undefined;
  };

  const summary = bars.filter((bar) => bar.summary).map((bar) => bar.summary);

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHead}>
        <div>
          <h2 className={styles.h3}>{title}</h2>
          <p className={styles.cardSub}>{sub}</p>
        </div>
        {aside}
      </div>
      <div ref={plot} className={styles.plot}>
        <div
          className={`${styles.bars} ${dense ? styles.barsDense : ''} ${shown ? styles.barsActive : ''}`}
          role="img"
          aria-label={`${label}: ${summary.length ? summary.join('; ') : 'none'}`}
          tabIndex={0}
          onPointerMove={(event) => pick(event.target)}
          onPointerDown={(event) => pick(event.target)}
          // A finger lifting is a leave too, which would take the readout away
          // as it appears; a tap elsewhere blurs the chart instead.
          onPointerLeave={(event) => event.pointerType !== 'touch' && setActive(null)}
          onFocus={() => setActive((current) => current ?? bars.length - 1)}
          onBlur={() => setActive(null)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setActive(null);
              return;
            }

            const next = step(event.key);

            if (next === undefined) return;
            event.preventDefault();
            setActive(next);
          }}
        >
          {bars.map((bar, index) => {
            const total = height(bar);

            return (
              <div key={bar.key} data-bar={index} className={`${styles.barCol} ${index === active ? styles.barColOn : ''}`}>
                {total === 0 ? (
                  <div className={`${styles.bar} ${styles.barEmpty}`} />
                ) : (
                  <div className={styles.barStack} style={{ height: `${Math.round((total / peak) * 100)}%` }}>
                    {/* A column stacks from the top, so the first part is drawn last. */}
                    {bar.parts
                      .map((part, n) => (part.value > 0 ? <div key={n} className={part.tone} style={{ flexGrow: part.value }} /> : null))
                      .reverse()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div ref={readout} className={`${styles.readout} ${shown ? styles.readoutOn : ''}`} aria-live="polite">
          {shown ? (
            <>
              <p className={styles.readoutHead}>{shown.heading}</p>
              <ul className={styles.readoutLines}>
                {shown.lines.map((line) => (
                  <li key={line.label}>
                    {line.tone ? <span className={`${styles.readoutKey} ${line.tone}`} aria-hidden="true" /> : null}
                    <strong>{line.value}</strong> {line.label}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
      <div className={`${styles.barLabels} ${dense ? styles.barsDense : ''}`} aria-hidden="true">
        {/* A space between labels keeps the row separate numbers rather than
            one long one, to a screen reader or a text query; flex draws
            nothing for it. */}
        {bars.map((bar, index) => (
          <span key={bar.key} className={styles.barLabel}>
            {index > 0 ? ' ' : ''}
            {index % every === 0 ? bar.tick : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
