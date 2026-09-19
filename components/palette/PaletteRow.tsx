'use client';

import { Check, Pencil, X } from 'lucide-react';
import PaletteStrip from './PaletteStrip';
import styles from './PaletteRow.module.css';

/**
 * One row in the merged palette list (custom palettes first, then the read-only
 * library), shared by the gallery rail and the embedded palette browser. Rows
 * share a single left edge - no horizontal padding, no hover background; hover
 * is a 2px translateX nudge. Clicking the row applies the palette (or, when it's
 * already active, opens the editor - handled by the caller's onClick). The
 * pencil and delete mark are buttons beside the row's own button, not spans
 * inside it: a button may not contain another control, and a nested one both
 * pollutes the row's accessible name and fires the row on a keypress.
 */
export default function PaletteRow({
  colors,
  transparentBackground = false,
  name,
  active,
  showEdit = false,
  showDelete = false,
  editLabel,
  editTitle = 'Edit palette',
  deleteLabel,
  onClick,
  onEdit,
  onDelete,
}: {
  colors: string[];
  transparentBackground?: boolean;
  name: string;
  active: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  editLabel?: string;
  editTitle?: string;
  deleteLabel?: string;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.main}
        aria-pressed={active}
        onClick={onClick}
        title={name}
      >
        <PaletteStrip colors={colors} transparentBackground={transparentBackground} />
        <span
          className={active ? `${styles.name} ${styles.nameActive}` : styles.name}
        >
          {name}
        </span>
        {active && (
          <span className={styles.check}>
            <Check size={14} />
          </span>
        )}
      </button>
      {showEdit && onEdit && (
        <button
          type="button"
          className={styles.edit}
          aria-label={editLabel}
          title={editTitle}
          onClick={onEdit}
        >
          <Pencil size={13} />
        </button>
      )}
      {showDelete && onDelete && (
        <button
          type="button"
          className={styles.delete}
          aria-label={deleteLabel}
          title="Delete palette"
          onClick={onDelete}
        >
          <X size={12} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
