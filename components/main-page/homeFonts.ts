import { IBM_Plex_Mono } from 'next/font/google';

// The faces the homepage loads for itself. The 14 October design's mockups
// wore six display faces of their own (Cormorant, Italiana, Comfortaa,
// Oxanium, Barlow Condensed, Jost); the windows show the real templates'
// screenshots now, set in the templates' own type, so those went with them.

/**
 * The mono at 500, for the homepage's eyebrows and toolbar labels. lib/fonts'
 * `plexMono` (300, 400, 600) is applied on every route by the masthead, so a
 * weight added there would be preloaded everywhere for a few labels here. A
 * separate family holding only the 500 face is set on those labels alone:
 * put in a stack with the other, it would draw the 400 text at 500 too.
 */
export const plexMonoMedium = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-home-mono-medium',
  display: 'swap',
  preload: false,
});

/** Every class above, for the page wrapper. */
export const HOME_FONT_VARIABLES = [plexMonoMedium].map((font) => font.variable).join(' ');
