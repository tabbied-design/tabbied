'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { BrandPalette } from 'lib/brandPalettes';
import type { LibraryPalette } from 'lib/paletteLibrary';
import { mergePalettes } from 'lib/paletteList';
import PaletteListRow from './PaletteListRow';
import { usePaletteReveal } from './usePaletteReveal';
import styles from './PaletteBrowser.module.css';

const PAGE = 16;

/**
 * The "All palettes" browser: one merged, searchable, infinitely scrolling
 * list (custom palettes first, then the read-only library), in the rows the
 * rail and the editor's list use. On a phone it takes the gallery's palette
 * slot (variant "rail") or fills the editor's fullscreen sheet (variant
 * "panel"). No "New palette" here: the pencil on a row opens the editor, and
 * saving a library palette's edit is how a new one is made.
 */
export default function PaletteBrowser({
  variant,
  palettes,
  library,
  activeId,
  onApply,
  onEditCustom,
  onEditLibrary,
  onDelete,
  onClose,
}: {
  variant: 'rail' | 'panel';
  palettes: BrandPalette[];
  library: LibraryPalette[];
  activeId: string | null;
  onApply: (id: string) => void;
  onEditCustom: (palette: BrandPalette) => void;
  onEditLibrary: (palette: LibraryPalette) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');

  const merged = useMemo(
    () => mergePalettes(palettes, library, query),
    [palettes, library, query]
  );

  const { shown, hasMore, listRef, onScroll, reset } = usePaletteReveal(
    merged,
    PAGE
  );

  return (
    <div
      className={
        variant === 'panel'
          ? `${styles.browser} ${styles.panel}`
          : `${styles.browser} ${styles.rail}`
      }
    >
      <div className={styles.head}>
        <div className={styles.headRow}>
          <span className={styles.headTitle}>All palettes</span>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close palette browser"
            title="Close"
          >
            <X size={17} strokeWidth={1.7} />
          </button>
        </div>
        {/* The rail's ruled field: the magnifier after the words, and the
            count in them while the field is empty. */}
        <label className={styles.search}>
          <input
            type="text"
            placeholder={`Search ${merged.length} palettes`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              reset();
            }}
            aria-label="Search palettes"
          />
          <Search size={15} aria-hidden="true" />
        </label>
      </div>

      <div ref={listRef} className={styles.list} onScroll={onScroll}>
        {shown.map((entry) => {
          const { kind, palette } = entry;
          const active = palette.id === activeId;

          return (
            <PaletteListRow
              key={palette.id}
              colors={palette.colors}
              name={palette.name || 'Untitled'}
              active={active}
              editLabel={`Edit ${palette.name || 'palette'}${
                kind === 'library' ? ' (saves as a copy)' : ''
              }`}
              editTitle={
                kind === 'library'
                  ? 'Edit palette (saves as a copy)'
                  : 'Edit palette'
              }
              deleteLabel={`Delete ${palette.name || 'palette'}`}
              onClick={() => {
                if (active) {
                  if (kind === 'library') onEditLibrary(palette);
                  else onEditCustom(palette);
                  return;
                }
                onApply(palette.id);
              }}
              onEdit={() =>
                kind === 'library'
                  ? onEditLibrary(palette)
                  : onEditCustom(palette)
              }
              onDelete={
                kind === 'custom' ? () => onDelete(palette.id) : undefined
              }
            />
          );
        })}

        {hasMore && <div className={styles.more}>Scroll for more...</div>}
        {merged.length === 0 && (
          <div className={styles.empty}>No palettes match your search.</div>
        )}
      </div>
    </div>
  );
}
