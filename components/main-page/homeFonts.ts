import {
  Barlow_Condensed,
  Comfortaa,
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Italiana,
  Jost,
  Oxanium,
} from 'next/font/google';

// The faces the homepage's pictures of websites are set in: each mock site
// wears the display face a template in its trade might, so the six differ on
// purpose. Declared here rather than in lib/fonts.ts because no other route
// draws them, and applied by class on the homepage's wrapper alone.
//
// None is preloaded: they set small type inside the mockups, below a hero
// whose own copy is in Proxima Nova and Plex Sans, and a preload would put six
// font files ahead of the page's own. `display: 'swap'` draws the fallback
// meanwhile. Where Google serves a variable face the variable file is used,
// so every weight the design names is drawn as named from one file.

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-home-cormorant',
  display: 'swap',
  preload: false,
});

export const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-home-italiana',
  display: 'swap',
  preload: false,
});

export const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-home-comfortaa',
  display: 'swap',
  preload: false,
});

export const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-home-oxanium',
  display: 'swap',
  preload: false,
});

/** Static on Google Fonts, so the weights the mockups use are listed. */
export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-home-barlow',
  display: 'swap',
  preload: false,
});

export const jost = Jost({
  subsets: ['latin'],
  variable: '--font-home-jost',
  display: 'swap',
  preload: false,
});

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
export const HOME_FONT_VARIABLES = [
  cormorant,
  italiana,
  comfortaa,
  oxanium,
  barlowCondensed,
  jost,
  plexMonoMedium,
]
  .map((font) => font.variable)
  .join(' ');
