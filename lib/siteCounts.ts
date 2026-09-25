// The figures the homepage quotes (and the package version the docs page
// shows), derived from the data they describe so none goes stale.
//
// Server-only: `patterns` carries every design's css-doodle source, so a
// client import would ship the whole catalog to count its keys. Pages read
// these in a server component and pass plain numbers down.
import pkg from 'tabbied/package.json';
import { patterns } from 'tabbied/patterns';
import { PALETTE_LIBRARY } from 'lib/paletteLibrary';
import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';

export const PATTERN_COUNT = Object.keys(patterns).length;

export const TEMPLATE_COUNT = TEMPLATE_SITES.length + NEW_TEMPLATE_SITES.length;

export const PALETTE_COUNT = PALETTE_LIBRARY.length;

export const PACKAGE_VERSION: string = pkg.version;
