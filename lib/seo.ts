import type { Metadata } from 'next';

// A page's title, description, canonical URL and share card, in one call.
//
// Per page rather than in the root layout, deliberately: the 77 template
// pages are under the same layout, and their exported HTML is what the
// packager turns into the downloads. A share card or a canonical link set at
// the root would ride into every site someone downloads and publishes,
// pointing at tabbied.com (the packager strips them as well, as a second
// line). So only the site's own pages call this. The root layout supplies
// `metadataBase`, which turns the paths here into absolute URLs.

export const SITE_URL = 'https://tabbied.com';

type ShareImage = { url: string; width: number; height: number; alt: string };

/** public/og.png: the mark, a line of copy, and four designs. */
const DEFAULT_IMAGE: ShareImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Tabbied: generative patterns and website templates',
};

/** A design's committed preview (public/previews), for its share card. */
export const previewImage = (slug: string, name: string): ShareImage => ({
  url: `/previews/${slug}.webp`,
  width: 960,
  height: 960,
  alt: `${name}, a Tabbied pattern`,
});

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
