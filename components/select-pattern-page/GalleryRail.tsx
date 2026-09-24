'use client';

import { useMemo } from 'react';
import { Search, Shuffle } from 'lucide-react';
import MixedSwatches from 'components/palette/MixedSwatches';
import PaletteListRow from 'components/palette/PaletteListRow';
import { usePaletteReveal } from 'components/palette/usePaletteReveal';
import type { BrandPalette } from 'lib/brandPalettes';
import { RANDOM_PALETTE_ID } from 'lib/brandPalettes';
import type { LibraryPalette } from 'lib/paletteLibrary';
import { mergePalettes } from 'lib/paletteList';
import styles from './GalleryRail.module.css';

// How many rows to reveal per batch. The full merged list is hundreds of
// palettes, so it renders incrementally (like the old browser) and grows as the
// rail scrolls - cheap first paint, no wall of DOM.
const PAGE = 24;

/**
 * The gallery's desktop palette rail: one search that filters both the
 * palette list and the design grid, then "Mixed" (a random palette per
 * pattern) above the full
 * merged palette list (custom first, then the read-only library) scrolling in
 * a single column. It fills the height under the masthead - the artboard drew
 * it as a fixed box with a fade, and the list is the whole point of the rail,
 * so it gets the room. There is no "New palette" here: the pencil on any row
 * opens the editor, and saving a library palette's edit is how a new one is
 * made.
 */
export default function GalleryRail({
  search,
  onSearchChange,
  palettes,
  library,
  selectedId,
  onApply,
  onRandom,
  mixed,
  onEditCustom,
  onEditLibrary,
  onDelete,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  palettes: BrandPalette[];
  library: LibraryPalette[];
  selectedId: string | null;
  onApply: (id: string) => void;
  /** Draw a new random spread and make it the gallery's palette. */
  onRandom: () => void;
  /** The swatches the "Mixed" option draws (MixedSwatches). */
  mixed: [string, string][];
  onEditCustom: (palette: BrandPalette) => void;
  onEditLibrary: (palette: LibraryPalette) => void;
  onDelete: (id: string) => void;
}) {
  // The same query filters both the palette list (here) and the design grid
  // (owned by the parent), so there's a single search for the whole page.
  const merged = useMemo(
    () => mergePalettes(palettes, library, search),
    [palettes, library, search]
  );

  const { shown, listRef, onScroll, reset } = usePaletteReveal(merged, PAGE);
  const randomActive = selectedId === RANDOM_PALETTE_ID;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        {/* A bottom-ruled field rather than a pill, the magnifier after the
            text so the placeholder starts on the rows' left edge. */}
        <label className={styles.search}>
          <input
            type="text"
            placeholder="Search palettes & designs"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value);
              reset();
            }}
            aria-label="Search palettes and designs"
          />
          <Search size={15} aria-hidden="true" />
        </label>

        {/* The random spread is chosen from the same list as a palette, so it
            sits where a palette would, drawn as one ("Mixed", its swatches
            split between the spread's palettes), above the rest and pinned:
            choosing it again draws a new spread. */}
        <button
          type="button"
          className={styles.random}
          data-active={randomActive || undefined}
          aria-pressed={randomActive}
          aria-label="Mixed: a random palette for every pattern"
          onClick={onRandom}
          title="A random palette for every pattern"
        >
          <span className={styles.randomLabel}>Mixed</span>
          <MixedSwatches pairs={mixed} className={styles.randomChips} />
          <span className={styles.randomMark} aria-hidden="true">
            <Shuffle size={14} strokeWidth={1.8} />
          </span>
        </button>
      </div>

      <div ref={listRef} className={styles.list} onScroll={onScroll}>
        {shown.map(({ kind, palette }) => {
          const active = palette.id === selectedId;
          const name = palette.name || 'Untitled';

          return (
            <PaletteListRow
              key={palette.id}
              name={name}
              colors={palette.colors}
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
                kind === 'library' ? onEditLibrary(palette) : onEditCustom(palette)
              }
              onDelete={
                kind === 'custom' ? () => onDelete(palette.id) : undefined
              }
            />
          );
        })}

        {merged.length === 0 && (
          <p className={styles.empty}>No palettes match your search.</p>
        )}
      </div>

      {/* The list runs under a fade rather than stopping at a line, which is
          what says it continues. */}
      <span className={styles.fade} aria-hidden="true" />
    </aside>
  );
}
