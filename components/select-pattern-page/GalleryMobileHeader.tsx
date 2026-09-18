'use client';

import { Search } from 'lucide-react';
import PaletteBrowser from 'components/palette/PaletteBrowser';
import type { BrandPalette } from 'lib/brandPalettes';
import type { LibraryPalette } from 'lib/paletteLibrary';
import styles from './GalleryMobileHeader.module.css';

/**
 * Mobile gallery chrome, under the shared masthead: the search, or the
 * embedded browser when "All" is tapped. The palette chip shelf itself is
 * rendered by SelectPattern just below this - as a direct child of the
 * scrolling page - so it can stay pinned with `position: sticky` across the
 * whole grid scroll.
 */
export default function GalleryMobileHeader({
  search,
  onSearchChange,
  palettes,
  library,
  selectedId,
  onApply,
  onEditCustom,
  onEditLibrary,
  onDelete,
  browserOpen,
  onCloseBrowser,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  palettes: BrandPalette[];
  library: LibraryPalette[];
  selectedId: string | null;
  onApply: (id: string) => void;
  onEditCustom: (palette: BrandPalette) => void;
  onEditLibrary: (palette: LibraryPalette) => void;
  onDelete: (id: string) => void;
  browserOpen: boolean;
  onCloseBrowser: () => void;
}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.search}>
        <input
          type="text"
          placeholder="Search palettes & designs"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search palettes and designs"
        />
        <Search size={15} aria-hidden="true" />
      </label>

      {browserOpen ? (
        <div className={styles.browserPanel}>
          <PaletteBrowser
            variant="rail"
            palettes={palettes}
            library={library}
            activeId={selectedId}
            onApply={onApply}
            onEditCustom={onEditCustom}
            onEditLibrary={onEditLibrary}
            onDelete={onDelete}
            onClose={onCloseBrowser}
          />
        </div>
      ) : null}
    </div>
  );
}
