'use client';

// Editing the colors of one palette, for this site. The rail's rows choose a
// palette wholesale; this is the way to change one of its colors - which is
// what the rail used to be before the list took its place, so nothing a person
// could do before has gone away.
//
// It edits a copy and commits on Save, unlike the rail's rows, which apply as
// they are clicked: a color picker fires an event per drag frame, and planning
// and re-running the whole page on each of them is what made the first version
// of this unusable.
import { useEffect, useState } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { Check, X } from 'lucide-react';
// A color the picker cannot show is kept as authored rather than filled in;
// the same test the rail's palette fitting uses.
import { isTransparent } from 'lib/studioPalettes';
import styles from './PaletteDialog.module.css';

/** `abc` and `#abc` both mean `#aabbcc`; anything else leaves the value alone. */
function normalize(raw: string, fallback: string): string {
  const value = raw.trim().toLowerCase().replace(/^#/, '');

  if (/^[0-9a-f]{3}$/.test(value)) {
    return `#${value
      .split('')
      .map((char) => char + char)
      .join('')}`;
  }

  return /^[0-9a-f]{6}$/.test(value) ? `#${value}` : fallback;
}

export default function PaletteDialog({
  open,
  onOpenChange,
  title,
  colors,
  labels,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** The colors to start from, ground first. */
  colors: readonly string[];
  /** One label per role, from the template's own spec. */
  labels: readonly string[];
  onSave: (colors: string[]) => void;
}) {
  const [draft, setDraft] = useState<string[]>([...colors]);

  // Re-seed whenever the dialog is opened, or opening it a second time would
  // show the previous row's colors.
  useEffect(() => {
    if (open) setDraft([...colors]);
  }, [open, colors]);

  const set = (index: number, value: string) =>
    setDraft((previous) => previous.map((color, i) => (i === index ? value : color)));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Dialog.Description className={styles.lede}>
            Each color sets one part of the page.
          </Dialog.Description>

          <div className={styles.rows}>
            {draft.map((color, index) => {
              const clear = isTransparent(color);
              const label = labels[index] ?? (index === 0 ? 'Ground' : `Ink ${index}`);

              return (
                <div key={index} className={styles.row}>
                  <label
                    className={clear ? `${styles.swatch} ${styles.swatchClear}` : styles.swatch}
                    style={clear ? undefined : { background: color }}
                  >
                    <input
                      type="color"
                      value={clear ? '#ffffff' : color}
                      aria-label={label}
                      onChange={(event) => set(index, event.target.value)}
                    />
                  </label>
                  <span className={styles.label}>{label}</span>
                  <input
                    className={styles.hex}
                    value={color}
                    aria-label={`${label} value`}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    onChange={(event) => set(index, event.target.value)}
                    onBlur={(event) =>
                      set(index, isTransparent(event.target.value)
                        ? event.target.value.trim().toLowerCase()
                        : normalize(event.target.value, colors[index] ?? '#000000'))
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <Dialog.Close className={styles.cancel}>
              <X size={15} aria-hidden="true" /> Cancel
            </Dialog.Close>
            <button
              type="button"
              className={styles.save}
              onClick={() => {
                onSave(
                  draft.map((color, index) =>
                    isTransparent(color)
                      ? color.trim().toLowerCase()
                      : normalize(color, colors[index] ?? '#000000')
                  )
                );
                onOpenChange(false);
              }}
            >
              <Check size={16} aria-hidden="true" /> Save changes
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
