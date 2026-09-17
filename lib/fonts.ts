import {
  Cormorant_Garamond,
  EB_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from 'next/font/google';

/**
 * The mono that carries every label, eyebrow and figure in the 2026 design.
 *
 * Declared here and applied per route rather than in the root layout, so only
 * the routes that use it preload it - the legal pages are still the older
 * light theme and never ask for it. next/font memoises by call site, so
 * importing this from several pages emits one font, not one per page.
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/**
 * The text face of the 2026 design, and the reason there are two sans here.
 *
 * The artboards run two families and switch between them by role: display type
 * (headings, the stat figures, primary buttons) is Proxima Nova, and body and
 * UI copy - paragraphs, labels, fields, table cells - is IBM Plex Sans. Reading
 * the stack in a design file left to right is what tells them apart:
 * `'Proxima Nova','IBM Plex Sans'` is a heading and `'IBM Plex Sans','Proxima
 * Nova'` is body text, and the second name in each is only a fallback.
 *
 * The site collapsed both onto proxima-nova, on the reading that Plex Sans was
 * never more than that fallback. It is not: 276 of the design's 383 sans
 * declarations name Plex Sans first, against 109 for Proxima, and the two are
 * different enough at 13-18px that running body copy in the display face is
 * visible on the hero paragraph.
 *
 * Applied per route beside `plexMono`, for the same reason: the legal pages
 * are still the older light theme and should not download it.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

/**
 * The editor's plate caption, and only that - a serif is what makes the stage
 * read as a print of the pattern rather than a preview of it. Loaded on the
 * editor route alone.
 */
export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});

/**
 * The wordmark, and only the wordmark. Applied by `components/logo/Logo`
 * itself rather than by a route: the lockup is in a dozen mastheads and in
 * none of the 77 template pages, so the component is the only place that
 * knows where the word is actually drawn. One weight, latin only.
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-cormorant',
  display: 'swap',
});
