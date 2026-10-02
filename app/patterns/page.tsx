import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import SelectPattern from 'components/select-pattern-page/SelectPattern';
import { getGalleryItems } from 'lib/pattern';
import { pageMetadata } from 'lib/seo';
import { PALETTE_COUNT, PATTERN_COUNT } from 'lib/siteCounts';

export const metadata: Metadata = pageMetadata({
  title: 'Pick a pattern - Tabbied',
  description: `${PATTERN_COUNT} generative patterns, drawn live in your browser. Recolor them with any of ${PALETTE_COUNT} palettes or your own, then download a PNG or SVG, free.`,
  path: '/patterns/',
});

export default async function SelectPatternPage() {
  const gallery = await getGalleryItems();

  // SelectPattern is a client component, so its font variables are applied here.
  return (
    <div className={`${plexMono.variable} ${plexSans.variable}`}>
      <SelectPattern gallery={gallery} />
    </div>
  );
}
