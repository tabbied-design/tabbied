'use client';

import Link from 'next/link';
import type { GalleryItem } from 'lib/pattern';
import {
  previewPalette,
  useBrandPalettes,
  useDraftPreview,
} from 'lib/brandPalettes';
import { markGalleryNavigation } from 'lib/galleryScroll';
import GalleryDoodle from './GalleryDoodle';
import styles from './SelectPattern.module.css';

// One gallery card: a live thumbnail with its name below it (no overlay).
// Client-side because the preview follows the selected palette (localStorage),
// applied to every design in the grid.
export default function GalleryCard({
  item,
  palette: cardPalette,
  className,
}: {
  item: GalleryItem;
  /**
   * This card's own palette, ground first: the random spread gives every card
   * one. Nothing stored knows it, so the link carries it and the editor opens
   * the pattern in the colours the card was wearing.
   */
  palette?: string[];
  className?: string;
}) {
  const brandState = useBrandPalettes();
  // While a palette is being edited, every card recolors live to the draft;
  // otherwise it follows its own palette, or the active saved or library one.
  const draftPreview = useDraftPreview();
  const palette = draftPreview ?? cardPalette ?? previewPalette(brandState);

  const params = new URLSearchParams({ seed: '0000' });
  cardPalette?.forEach((color) => params.append('palette', color));

  return (
    <Link
      href={`/patterns/${item.slug}?${params.toString()}`}
      prefetch={false}
      onClick={markGalleryNavigation}
      className={className ? `${styles.card} ${className}` : styles.card}
    >
      <div className={styles.tile}>
        <GalleryDoodle item={item} palette={palette} />
      </div>
      <h3 className={styles.cardName}>{item.name}</h3>
    </Link>
  );
}
