// Syncs packages/tabbied/patterns/ with the batch-14 definitions: writes one
// JSON per definition (catalog metadata included, so a rerun never loses it),
// deletes any batch-14 pattern (and its gallery thumbnail entry) that the
// definitions no longer describe, and inserts the thumbnail entries the
// gallery reads. Scoped to gallery orders 4000-4999 so it never touches
// patterns shipped in another batch.
//
// build-batch14.mjs holds the lints; validate-batch14.mjs (rendering) and
// validate-svg-batch14.mjs (export) are the real gates.
import { writeFileSync, readdirSync, readFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { batch14 } from './pattern-defs-14.mjs';
import { ownedByBatch14 } from './pattern-defs-14/shared.mjs';
import { buildPattern, thumbEntry } from './build-batch14.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PATTERNS_DIR = path.join(ROOT, 'packages/tabbied/patterns');
const THUMBNAILS_FILE = path.join(ROOT, 'components/select-pattern-page/galleryThumbnails.ts');

// Build (and so lint) everything before writing anything.
const built = batch14.map((def) => buildPattern(def));

const existing = new Set(
  readdirSync(PATTERNS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
);
const orderOf = (slug) =>
  JSON.parse(readFileSync(path.join(PATTERNS_DIR, `${slug}.json`), 'utf-8')).galleryOrder;

for (const def of batch14) {
  if (existing.has(def.slug) && !ownedByBatch14(orderOf(def.slug))) {
    throw new Error(`batch-14 slug ${def.slug} collides with an existing pattern`);
  }
}

// Drop patterns this batch used to own but no longer defines, so the
// definitions stay the single source of truth for what ships.
const batchSlugs = new Set(batch14.map((d) => d.slug));
const dropped = [...existing].filter(
  (slug) => !batchSlugs.has(slug) && ownedByBatch14(orderOf(slug))
);
for (const slug of dropped) unlinkSync(path.join(PATTERNS_DIR, `${slug}.json`));

let thumbs = readFileSync(THUMBNAILS_FILE, 'utf-8');
for (const slug of dropped) {
  thumbs = thumbs.replace(new RegExp(`\\n  ${slug}: \\{[\\s\\S]*?\\n  \\},`, 'g'), '');
}
if (dropped.length) {
  console.log(`removed ${dropped.length} pattern files + thumbnail entries: ${dropped.join(', ')}`);
}

for (const pattern of built) {
  writeFileSync(
    path.join(PATTERNS_DIR, `${pattern.slug}.json`),
    JSON.stringify(pattern, null, 2) + '\n'
  );
}
console.log(`wrote ${built.length} pattern files`);

// Thumbnail entries: replace this batch's own, append the missing ones just
// before the closing brace of the map.
const blocks = [];
for (const def of batch14) {
  const entry = new RegExp(`\\n  ${def.slug}: \\{[\\s\\S]*?\\n  \\},`);
  if (entry.test(thumbs)) {
    thumbs = thumbs.replace(entry, `\n${thumbEntry(def)}`);
  } else {
    blocks.push(thumbEntry(def));
  }
}
if (blocks.length) {
  const marker = '\n};\n';
  const at = thumbs.lastIndexOf(marker);
  if (at === -1) throw new Error('could not find the end of galleryThumbnails');
  thumbs = thumbs.slice(0, at) + '\n' + blocks.join('\n') + thumbs.slice(at);
}
writeFileSync(THUMBNAILS_FILE, thumbs);
console.log(`thumbnail entries: ${blocks.length} inserted`);
