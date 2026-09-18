'use client';

import { Pencil, X } from 'lucide-react';
import styles from './PaletteListRow.module.css';

/** The most inks a row shows; a palette with more is still whole in the editor. */
const MAX_CHIPS = 6;

/**
 * One palette in a list: the name, then its inks as a run of chips, then the
 * pencil (and, for a palette the person made, a delete mark). The ground
 * colour is not drawn - the design shows the colours a pattern is painted
 * *with*, and the ground is what the page around the list already shows under
 * every thumbnail. The active row is an ink pill. Shared by the gallery's rail
 * and the editor's palette list, so the two read as one control.
 *
 * The row is a group of real buttons: the pill (name and inks) applies the
 * palette, and the pencil and delete mark beside it are buttons of their own.
 * They used to be `role="button"` spans nested inside the pill's button, which
 * HTML forbids: the pill's accessible name swallowed their labels ("Ink Edit
 * Ink (saves as a copy)"), and a keypress on a mark also activated the pill in
 * browsers that do not let a descendant stop the ancestor button's default.
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
        <Pencil size={13} />
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
