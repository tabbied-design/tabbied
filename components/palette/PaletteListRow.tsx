'use client';

import type { CSSProperties } from 'react';
import { PenLine, X } from 'lucide-react';
import styles from './PaletteListRow.module.css';

/** The most inks a row shows; a palette with more is still whole in the editor. */
const MAX_CHIPS = 6;

/**
 * One palette in a list: the name, then its ground (set apart) and its inks
 * as a run of chips, then the pencil and, for a palette the person made, a
 * delete mark. The active row is an ink pill. Shared by the gallery's rail
 * and the editor's palette list, so the two read as one control.
 *
 * The pencil and delete mark are buttons beside the pill's button, not
 * inside it: HTML forbids nested controls, and a nested one joins the pill's
 * accessible name and can fire the pill on a keypress.
 */
export default function PaletteListRow({
  name,
  colors,
  active,
  editLabel,
  editTitle,
  deleteLabel,
  onClick,
  onEdit,
  onDelete,
}: {
  name: string;
  colors: string[];
  active: boolean;
  editLabel: string;
  editTitle: string;
  deleteLabel?: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className={styles.row} data-active={active || undefined}>
      <button
        type="button"
        className={styles.main}
        aria-pressed={active}
        onClick={onClick}
        title={name}
      >
        <span className={styles.name}>{name}</span>
        <span className={styles.chips} aria-hidden="true">
          <span className={styles.ground} style={{ '--ground': colors[0] } as CSSProperties} />
          {colors.slice(1, 1 + MAX_CHIPS).map((color, index) => (
            <span key={`${color}-${index}`} style={{ background: color }} />
          ))}
        </span>
      </button>
      <button
        type="button"
        className={styles.mark}
        aria-label={editLabel}
        title={editTitle}
        onClick={onEdit}
      >
        <PenLine size={13} strokeWidth={1.7} />
      </button>
      {onDelete && (
        <button
          type="button"
          className={styles.mark}
          aria-label={deleteLabel}
          title="Delete palette"
          onClick={onDelete}
        >
          <X size={13} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
