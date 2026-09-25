'use client';

import { Check, Pencil, X } from 'lucide-react';
import PaletteStrip from './PaletteStrip';
import styles from './PaletteRow.module.css';

/**
 * One row in the palette browser's merged list. What a click does (apply, or
 * edit when already active) is the caller's onClick. The pencil and delete
 * mark are buttons beside the row's own button, not inside it: a button may
 * not contain another control, and a nested one pollutes the row's accessible
 * name and fires the row on a keypress.
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
