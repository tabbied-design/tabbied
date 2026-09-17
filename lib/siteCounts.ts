// The figures the homepage quotes, derived from the data they describe rather
// than written into the copy - the same reason /templates computes its own
// total. Adding a preset, a template site, or a palette can't leave a stale
// number behind in the hero sentence or the stats rows. The docs page reads
// the package version here for the same reason: a release bumps it and the
// header keeps up.
//
// Server-only by intent: `patterns` carries every design's css-doodle source,
// so importing it from a client component would drag the whole catalog into
// the browser bundle to count its keys. The homepage reads these in its server
// component and passes plain numbers down.
import pkg from 'tabbied/package.json';
import { patterns } from 'tabbied/patterns';
import { PALETTE_LIBRARY } from 'lib/paletteLibrary';
import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';

export const PATTERN_COUNT = Object.keys(patterns).length;

export const TEMPLATE_COUNT = TEMPLATE_SITES.length + NEW_TEMPLATE_SITES.length;

export const PALETTE_COUNT = PALETTE_LIBRARY.length;

export const PACKAGE_VERSION: string = pkg.version;
