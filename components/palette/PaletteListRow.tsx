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
  const stop =
    (handler: () => void) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        (event as React.KeyboardEvent).key !== 'Enter' &&
        (event as React.KeyboardEvent).key !== ' '
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      handler();
    };

  return (
    <button
      type="button"
      className={styles.row}
      data-active={active || undefined}
      onClick={onClick}
      title={name}
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.chips} aria-hidden="true">
        {colors.slice(1, 1 + MAX_CHIPS).map((color, index) => (
          <span key={`${color}-${index}`} style={{ background: color }} />
        ))}
      </span>
      <span
        role="button"
        tabIndex={0}
        aria-label={editLabel}
        title={editTitle}
        className={styles.mark}
        onClick={stop(onEdit)}
        onKeyDown={stop(onEdit)}
      >
        <Pencil size={13} />
      </span>
      {onDelete && (
        <span
          role="button"
          tabIndex={0}
          aria-label={deleteLabel}
          title="Delete palette"
          className={styles.mark}
          onClick={stop(onDelete)}
          onKeyDown={stop(onDelete)}
        >
          <X size={13} strokeWidth={2} />
        </span>
      )}
    </button>
  );
}
