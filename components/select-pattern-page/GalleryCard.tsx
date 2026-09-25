'use client';

import { memo } from 'react';
import Link from 'next/link';
import type { GalleryItem } from 'lib/pattern';
import { useDraftPreview } from 'lib/brandPalettes';
import { markGalleryNavigation } from 'lib/galleryScroll';
import GalleryDoodle from './GalleryDoodle';
import styles from './SelectPattern.module.css';

// One gallery card: a live thumbnail with its name below it. Client-side
// because the preview follows the selected palette (localStorage). Memoized:
// the gallery re-renders on every search keystroke and palette click, and an
// unchanged card would otherwise rebuild its doodle's source for nothing.
function GalleryCard({
  item,
  palette: cardPalette,
  fallbackPalette,
  className,
}: {
  item: GalleryItem;
  /**
   * This card's own palette, ground first: the random spread gives every card
   * one. Nothing stored knows it, so the link carries it and the editor opens
   * the pattern in the colors the card was wearing.
   */
  palette?: string[];
  /**
   * The palette every card wears when none has its own: the active saved or
   * library palette, resolved once by the gallery rather than per card.
   */
  fallbackPalette?: string[];
  className?: string;
}) {
  // While a palette is being edited, every card recolors live to the draft;
  // otherwise it follows its own palette, or the active saved or library one.
  const draftPreview = useDraftPreview();
  const palette = draftPreview ?? cardPalette ?? fallbackPalette;

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
      <h2 className={styles.cardName}>{item.name}</h2>
    </Link>
  );
}

export default memo(GalleryCard);
