import {
  Cormorant_Garamond,
  EB_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from 'next/font/google';

/**
 * The mono that carries every label, eyebrow and figure in the 2026 design.
 * Applied per route rather than in the root layout, so only the routes that
 * use it preload it. next/font memoizes by call site, so several importers
 * still emit one font.
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/**
 * The body and UI face of the 2026 design. The artboards switch sans by role:
 * display type (headings, stat figures, primary buttons) is Proxima Nova, and
 * body copy, labels, fields and table cells are IBM Plex Sans. In a design
 * file's stack the first name is the face and the second only a fallback.
 * Applied per route beside `plexMono`, for the same reason.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

/**
 * The serif of the editor's plate caption (it makes the stage read as a print
 * of the pattern) and the template preview. Loaded on those routes alone.
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
 * itself rather than by a route or the root layout, so it never rides onto a
 * template page (see CLAUDE.md, "The mark").
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-cormorant',
  display: 'swap',
});
