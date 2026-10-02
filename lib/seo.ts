import type { Metadata } from 'next';

// A page's title, description, canonical URL and share card, in one call.
//
// Per page rather than in the root layout, deliberately: the template pages
// share that layout and become the downloads, so a share card or canonical
// link set at the root would ride into every site someone publishes (the
// packager strips them too, as a second line). The root layout supplies
// `metadataBase`, which turns the paths here into absolute URLs.

type ShareImage = { url: string; width: number; height: number; alt: string };

/** public/og.png: the mark, a line of copy, and four designs. */
const DEFAULT_IMAGE: ShareImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Tabbied: generative patterns and website templates',
};

/**
 * A design's share card (public/og/patterns, scripts/build-og-images.mjs):
 * og.png's brand panel beside its preview, at the 1200x630 a large card is
 * framed in. The 960x960 WebP preview it replaced was cropped to a strip.
 */
export const patternImage = (slug: string, name: string): ShareImage => ({
  url: `/og/patterns/${slug}.jpg`,
  width: 1200,
  height: 630,
  alt: `${name}, a Tabbied pattern`,
});

/**
 * A template's share card: its screenshot (public/og/templates) when it has
 * one, so a shared link shows the website rather than the pattern under it.
 * A template not shot yet falls back to its pattern's card.
 */
export const templateImage = (
  slug: string,
  name: string,
  shot: string | undefined,
  pattern: string
): ShareImage =>
  shot
    ? {
        url: `/og/templates/${slug}.jpg`,
        width: 1200,
        height: 630,
        alt: `${name}, a Tabbied website template`,
      }
    : { ...patternImage(pattern, name), alt: `${name}, a Tabbied website template` };

// Search results cut a description at about 160 characters. A longer one is
// cut here instead, at a word, so the cut is ours and reads as one.
const DESCRIPTION_LIMIT = 160;

export function fitDescription(text: string | undefined): string | undefined {
  if (!text || text.length <= DESCRIPTION_LIMIT) return text;

  const cut = text.slice(0, DESCRIPTION_LIMIT - 3);
  const end = cut.lastIndexOf(' ');

  return `${(end > 80 ? cut.slice(0, end) : cut).replace(/[\s,;:.-]+$/, '')}...`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description?: string;
  /** The page's own path, with the trailing slash the export serves. */
  path: string;
  image?: ShareImage;
}): Metadata {
  description = fitDescription(description);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Tabbied',
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
