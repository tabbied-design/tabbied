// The server half of tabbied/element: importing it where there is no DOM (a
// Nuxt, SvelteKit or Astro server render does) must not throw, and the
// per-design modules it loads by slug must be exactly the designs in the
// catalog bundle, with nothing to resolve in them. The browser half is
// e2e/element.spec.ts.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { patterns } from '../dist/patterns.generated.js';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

test('importing tabbied/element without a DOM defines nothing and throws nothing', async () => {
  const element = await import('../dist/element/index.js');

  assert.equal(element.TAG_NAME, 'tabbied-pattern');
  assert.ok(element.OBSERVED_ATTRIBUTES.includes('palette'));
  assert.equal(typeof element.definePatterns, 'function');
  // Registering on a server is a no-op, not an error.
  element.definePatterns({ radius: patterns.radius });
});

test('one module per design, each the catalog definition, with no imports', async () => {
  const files = (await readdir(path.join(dist, 'patterns'))).filter((file) => file.endsWith('.js'));

  assert.equal(files.length, Object.keys(patterns).length);

  for (const file of files) {
    const slug = file.replace(/\.js$/, '');
    const source = await readFile(path.join(dist, 'patterns', file), 'utf8');

    assert.doesNotMatch(source, /^\s*import\b/m, `${file} imports something`);
    const { default: definition } = await import(`../dist/patterns/${file}`);
    assert.deepEqual(definition, patterns[slug], `${file} is not the ${slug} definition`);
  }
});

test('the CDN bundle resolves css-doodle itself and keeps the converter lazy', async () => {
  const bundle = await readFile(path.join(dist, 'element', 'tabbied-element.js'), 'utf8');

  assert.doesNotMatch(bundle, /from\s*["']css-doodle["']/);
  assert.doesNotMatch(bundle, /import\s*["']css-doodle["']/);
  // The SVG converter is a chunk exportSvg() fetches, not part of the entry.
  assert.match(bundle, /import\("\.\/chunk-[A-Z0-9]+\.js"\)/);
});
