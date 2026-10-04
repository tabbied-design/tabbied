import type { Metadata } from 'next';
import { Suspense } from 'react';
import pkg from 'tabbied/package.json';
import { ebGaramond, plexMono, plexSans } from 'lib/fonts';
import { getAllPatternIds, getPattern } from 'lib/pattern';
import { pageMetadata, patternImage } from 'lib/seo';
import EditPattern from 'components/edit-pattern-page/EditPattern';
import EditPatternFallback from 'components/edit-pattern-page/EditPatternFallback';

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

  // The design's own sentence, then what to do with it while that fits in a
  // search result; a long sentence goes alone rather than cut short.
  const action = 'Recolor it, reseed it and download it as a PNG or SVG, free.';
  const description = !pattern.description
    ? `Customize the ${pattern.name} pattern and download it as a PNG or SVG, free.`
    : `${pattern.description} ${action}`.length <= 160
      ? `${pattern.description} ${action}`
      : pattern.description;

  return pageMetadata({
    title: `Customize ${pattern.name} - Tabbied`,
    description,
    path: `/patterns/${id}/`,
    image: patternImage(id, pattern.name),
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
    <Suspense
      fallback={<EditPatternFallback name={pattern.name} description={pattern.description} />}
    >
      <div
        className={`${ebGaramond.variable} ${plexMono.variable} ${plexSans.variable}`}
      >
        <EditPattern pattern={pattern} packageVersion={pkg.version} />
      </div>
    </Suspense>
  );
}
