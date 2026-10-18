'use client';

import PaletteBrowser from 'components/palette/PaletteBrowser';
import type { BrandPalette } from 'lib/brandPalettes';
import type { LibraryPalette } from 'lib/paletteLibrary';
import styles from './GalleryMobileHeader.module.css';

/**
 * Mobile gallery chrome, under the shared masthead: the embedded browser,
 * while "All" has it open. There is no search on a phone (Sy's note of 18
 * October): the chip shelf and the grid are the page. The shelf is rendered
 * by SelectPattern, as a direct child of the scrolling page, so it can stay
 * pinned across the whole grid scroll.
 */
export default function GalleryMobileHeader({
  palettes,
  library,
  selectedId,
  onApply,
  onEditCustom,
  onEditLibrary,
  onDelete,
  onCloseBrowser,
}: {
  palettes: BrandPalette[];
  library: LibraryPalette[];
  selectedId: string | null;
  onApply: (id: string) => void;
  onEditCustom: (palette: BrandPalette) => void;
  onEditLibrary: (palette: LibraryPalette) => void;
  onDelete: (id: string) => void;
  onCloseBrowser: () => void;
}) {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
}
