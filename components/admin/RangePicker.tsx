'use client';

// The row over the overview and Downloads pages that sets the range every
// figure, chart and table under it reads: the presets, then Custom, which
// opens two UTC dates and an Apply. Apply, not every change: a date input
// fires as each part of a typed year lands, and 0002-10-01 is a real date.
import { useState } from 'react';
import { CalendarRange } from 'lucide-react';
import { PRESETS, isoDay, rangeDays, type RangeChoice, type ResolvedRange } from './range';
import styles from './admin.module.css';

const DAY = 86_400_000;

export default function RangePicker({
  value,
  onChange,
  shown,
}: {
  value: RangeChoice;
  onChange: (next: RangeChoice) => void;
  /** The range the page is showing, which Custom starts from. */
  shown: ResolvedRange | null;
}) {
  const [draft, setDraft] = useState<{ from: string; to: string } | null>(null);
  const today = isoDay(Date.now());
  const custom = value.period === 'custom';
  const open = draft !== null;
  const ready = draft !== null && draft.from !== '' && draft.to !== '' && draft.from <= draft.to && draft.from <= today;
  const applied = custom && draft !== null && draft.from === value.from && draft.to === value.to;

  return (
    <div className={styles.rangeRow}>
      <div className={styles.toolbar} role="group" aria-label="Period">
        {PRESETS.map((preset) => (
          <button
            key={preset.period}
            type="button"
            className={`${styles.pill} ${value.period === preset.period ? styles.pillOn : ''}`}
            aria-pressed={value.period === preset.period}
            onClick={() => {
              setDraft(null);
              onChange({ period: preset.period });
            }}
          >
            {preset.pill}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.pill} ${custom ? styles.pillOn : ''}`}
          aria-pressed={custom}
          onClick={() =>
            setDraft(
              (current) =>
                current ??
                (custom
                  ? { from: value.from, to: value.to }
                  : shown
                    ? rangeDays(shown)
                    : { from: isoDay(Date.now() - 29 * DAY), to: today })
            )
          }
        >
          <CalendarRange className={styles.pillGlyph} size={14} aria-hidden="true" />
          Custom
        </button>
      </div>

      {open ? (
        <form
          className={styles.rangeForm}
          onSubmit={(event) => {
            event.preventDefault();
            if (ready) onChange({ period: 'custom', ...draft });
          }}
        >
          <label className={styles.rangeField}>
            <span className={styles.fieldLabel}>From</span>
            <input
              type="date"
              className={styles.input}
              value={draft.from}
              max={draft.to || today}
              required
              onChange={(event) => setDraft({ ...draft, from: event.target.value })}
            />
          </label>
          <label className={styles.rangeField}>
            <span className={styles.fieldLabel}>To</span>
            <input
              type="date"
              className={styles.input}
              value={draft.to}
              min={draft.from || undefined}
              max={today}
              required
              onChange={(event) => setDraft({ ...draft, to: event.target.value })}
            />
          </label>
          <button type="submit" className={styles.button} disabled={!ready || applied}>
            Apply
          </button>
          <p className={styles.rangeHint}>UTC days, both included.</p>
        </form>
      ) : null}
    </div>
  );
}
