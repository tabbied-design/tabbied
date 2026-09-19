'use client';

import { useMemo } from 'react';
import { ArrowLeftRight, ChevronRight, Pencil, X } from 'lucide-react';
import { RANDOM_PALETTE_ID, type BrandPalette } from 'lib/brandPalettes';
import type { LibraryPalette } from 'lib/paletteLibrary';
import { mergePalettes } from 'lib/paletteList';
import styles from './GalleryChipShelf.module.css';

/** The most inks a chip shows; a palette with more is still whole in the editor. */
const MAX_CHIPS = 6;

/**
 * How many palettes the shelf shows before "All" takes over. It is a single
 * swipeable row pinned to the top of a phone, and the merged list is over
 * four hundred palettes: laid out whole it was some five thousand nodes in a
 * sticky bar that repaints on every scroll, with the chosen palette possibly
 * three hundred chips off-screen. The editor's strip draws the same line.
 */
const SHELF_LIMIT = 30;

/**
 * Mobile: the merged palette list as a horizontal, scrollable shelf of the
 * rail's rows - "Random per pattern" first, then name, inks, pencil - laid
 * side by side. Custom chips carry a delete mark (single-click delete);
 * library chips a pencil (edit-as-copy). A trailing "All" pill opens the
 * embedded palette browser.
 *
 * Each chip is a pill holding two buttons, the palette and its mark, rather
 * than a button with a `role="button"` span inside it: HTML forbids a control
 * inside a button, the nested label leaked into the chip's accessible name,
 * and a keypress on the mark also fired the chip.
 */
export default function GalleryChipShelf({
  className,
  palettes,
  library,
  selectedId,
  onApply,
  onRandom,
  onEditCustom,
  onEditLibrary,
  onDelete,
  onBrowse,
}: {
  className?: string;
  palettes: BrandPalette[];
  library: LibraryPalette[];
  selectedId: string | null;
  onApply: (id: string) => void;
  /** Draw a new random spread and make it the gallery's palette. */
  onRandom: () => void;
  onEditCustom: (palette: BrandPalette) => void;
  onEditLibrary: (palette: LibraryPalette) => void;
  onDelete: (id: string) => void;
  onBrowse: () => void;
}) {
  const merged = useMemo(
    () => mergePalettes(palettes, library),
    [palettes, library]
  );

  // The first few, and the one in use wherever it sits in the list, so the
  // chosen palette is always on the shelf.
  const shown = useMemo(() => {
    const head = merged.slice(0, SHELF_LIMIT);
    const inUse = merged.find(({ palette }) => palette.id === selectedId);

    if (inUse && !head.includes(inUse)) head.unshift(inUse);

    return head;
  }, [merged, selectedId]);

  const randomActive = selectedId === RANDOM_PALETTE_ID;

  return (
    <div className={className ? `${styles.shelf} ${className}` : styles.shelf}>
      <button
        type="button"
        className={
          randomActive
            ? `${styles.chip} ${styles.chipMain} ${styles.chipActive}`
            : `${styles.chip} ${styles.chipMain}`
        }
        aria-pressed={randomActive}
        title="A random palette for every pattern"
        onClick={onRandom}
      >
        <span className={styles.name}>Random per pattern</span>
        <span className={styles.randomMark} aria-hidden="true">
          <ArrowLeftRight size={13} strokeWidth={1.8} />
        </span>
      </button>

      {shown.map(({ kind, palette }) => {
        const active = palette.id === selectedId;
        const name = palette.name || 'Untitled';

        return (
          <span
            key={palette.id}
            className={active ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          >
            <button
              type="button"
              className={`${styles.chipMain} ${styles.chipMainWithMark}`}
              aria-pressed={active}
              title={name}
              onClick={() => {
                if (active) {
                  if (kind === 'library') onEditLibrary(palette);
                  else onEditCustom(palette);
                  return;
                }
                onApply(palette.id);
              }}
            >
              <span className={styles.name}>{name}</span>
              <span className={styles.chips} aria-hidden="true">
                {palette.colors.slice(1, 1 + MAX_CHIPS).map((color, index) => (
                  <span key={`${color}-${index}`} style={{ background: color }} />
                ))}
              </span>
            </button>
            {kind === 'custom' ? (
              <button
                type="button"
                className={styles.trailing}
                aria-label={`Delete ${palette.name || 'palette'}`}
                title="Delete palette"
                onClick={() => onDelete(palette.id)}
              >
                <X size={12} strokeWidth={2} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.trailing}
                aria-label={`Edit ${palette.name} (saves as a copy)`}
                title="Edit palette (saves as a copy)"
                onClick={() => onEditLibrary(palette)}
              >
                <Pencil size={12} />
              </button>
            )}
          </span>
        );
      })}

      <button type="button" className={styles.allPill} onClick={onBrowse}>
        All <ChevronRight size={13} />
      </button>
    </div>
  );
}
