import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ebGaramond, plexMono, plexSans } from 'lib/fonts';
import { getAllPatternIds, getPattern } from 'lib/pattern';
import { pageMetadata, previewImage } from 'lib/seo';
import EditPattern from 'components/edit-pattern-page/EditPattern';

// Only the pattern ids known at build time are rendered; anything else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAllPatternIds();

  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pattern = await getPattern(id);

  return pageMetadata({
    title: `Customize ${pattern.name} - Tabbied`,
    description: pattern.description
      ? `${pattern.description} Recolor it, reseed it and download it as a PNG or SVG, free.`
      : `Customize the ${pattern.name} pattern and download it as a PNG or SVG, free.`,
    path: `/patterns/${id}/`,
    image: previewImage(id, pattern.name),
  });
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pattern = await getPattern(id);

  // EditPattern is a client component, so every font variable it reads (the
  // serif caption, the mono readouts, the Plex Sans copy) has to be applied
  // here. A missing one fails quietly: the var resolves to nothing.
  return (
    <Suspense>
      <div
        className={`${ebGaramond.variable} ${plexMono.variable} ${plexSans.variable}`}
      >
        <EditPattern pattern={pattern} />
      </div>
    </Suspense>
  );
}
