// Fonts are bundled from @fontsource rather than fetched from Google at
// render time, so a render needs no network. loadFont() holds the first
// frame (delayRender) until each face is ready.
import { loadFont } from '@remotion/fonts';
import grotesk500 from '@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2';
import grotesk700 from '@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2';
import mono400 from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2';
import mono600 from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2';
import serifItalic from '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2';

export const DISPLAY = '"Space Grotesk", sans-serif';
export const MONO = '"IBM Plex Mono", monospace';
export const SERIF = '"Instrument Serif", serif';

loadFont({ family: 'Space Grotesk', url: grotesk500, weight: '500' });
loadFont({ family: 'Space Grotesk', url: grotesk700, weight: '700' });
loadFont({ family: 'IBM Plex Mono', url: mono400, weight: '400' });
loadFont({ family: 'IBM Plex Mono', url: mono600, weight: '600' });
loadFont({ family: 'Instrument Serif', url: serifItalic, weight: '400', style: 'italic' });
