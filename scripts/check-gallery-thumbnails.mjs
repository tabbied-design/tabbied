#!/usr/bin/env node
/**
 * Fails the build if components/select-pattern-page/galleryThumbnails.ts holds
 * a config for a design that no longer exists.
 *
 * That file is tuned by eye and nothing regenerates it. The gallery reads it as
 * `galleryThumbnails[item.slug]`, so an entry whose slug names nothing is never
 * read and rots silently. The batch generators prune only their own
 * gallery-order range; this is the backstop for everything else.
 *
 * The reverse is NOT an error: a design with no entry falls back to its own
 * palette and option defaults.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PATTERNS_DIR = path.join(ROOT, 'packages/tabbied/patterns');
const THUMBNAILS_FILE = path.join(
  ROOT,
  'components/select-pattern-page/galleryThumbnails.ts'
);

const patterns = new Set(
  readdirSync(PATTERNS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
);

// Top-level keys only: every entry sits at exactly two spaces of indent, and
// nested config objects are written on one line, so this cannot match into one.
const entries = [
  ...readFileSync(THUMBNAILS_FILE, 'utf-8').matchAll(/^ {2}([a-z][a-z0-9]*): \{/gm),
].map((m) => m[1]);

// The match is tied to the file's formatting; finding nothing is a vacuous
// pass, not a clean one.
if (entries.length === 0) {
  console.error(
    'galleryThumbnails.ts: no entries matched the expected shape (two-space indent, ' +
      'one-line configs). Reformat the file or update check-gallery-thumbnails.mjs.'
  );
  process.exit(1);
}

const orphans = entries.filter((slug) => !patterns.has(slug));

if (orphans.length) {
  console.error(
    `galleryThumbnails.ts has ${orphans.length} config(s) for designs that do not exist:\n  ` +
      orphans.join(', ') +
      `\nDelete those entries, or restore the pattern JSON they were written for.`
  );
  process.exit(1);
}

console.log(
  `gallery thumbnails: ${entries.length} configs, all naming a shipped design`
);
