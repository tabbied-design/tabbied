// The gallery's search against the real catalog: a motif finds the designs
// tagged with it, not only one whose name contains the word. Run with
// `npm run test:lib` after `npm run build:packages`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { designKeywords, matchesQuery } from './catalogSearch.ts';

const catalog = JSON.parse(
  readFileSync(new URL('../packages/tabbied/catalog.json', import.meta.url), 'utf8')
);
const search = (query) =>
  catalog.designs.filter((design) => matchesQuery(designKeywords(design), query)).map((d) => d.slug);

test('a motif finds every design tagged with it', () => {
  for (const tag of ['dots', 'circles']) {
    const tagged = catalog.designs.filter((design) => design.tags.includes(tag)).map((d) => d.slug);
    const found = search(tag);

    assert.ok(tagged.length > 1, `the catalog has designs tagged ${tag}`);
    for (const slug of tagged) assert.ok(found.includes(slug), `${tag} misses ${slug}`);
  }
});

test('every word must match, in any field, any case', () => {
  const found = search('Calm WALLPAPER');

  assert.ok(found.length > 0);
  for (const slug of found) {
    const keywords = designKeywords(catalog.designs.find((entry) => entry.slug === slug));
    assert.ok(keywords.includes('calm') && keywords.includes('wallpaper'), slug);
  }
  assert.deepEqual(search('radius'), search('RADIUS'));
  assert.equal(search('').length, catalog.designs.length);
  assert.deepEqual(search('zzzznothing'), []);
});
