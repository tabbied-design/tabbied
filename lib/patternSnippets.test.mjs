// The editor's copied snippets: which are offered at which package version,
// and that each is the package's own builder. Run with `npm run test:lib`
// after `npm run build:packages` (Node strips the types from
// patternSnippets.ts itself). e2e/svg-export.spec.ts copies the offered ones
// through the real menu.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SNIPPETS,
  availableSnippets,
  buildSnippet,
  versionAtLeast,
} from './patternSnippets.ts';

const PLATE = {
  slug: 'radius',
  seed: '0000',
  palette: ['#0B1020', '#3E8BFF', '#3FFFB2'],
  options: [['frequency', 0.8]],
  ratio: [2, 3],
  ratioLabel: '2:3',
  density: 0.5,
  version: '0.8.0',
};

test('versions compare by number, not by string', () => {
  assert.ok(versionAtLeast('0.10.0', '0.8.0'));
  assert.ok(versionAtLeast('0.8.0', '0.8.0'));
  assert.ok(versionAtLeast('1.0.0', '0.8.0'));
  assert.ok(!versionAtLeast('0.7.9', '0.8.0'));
  assert.ok(versionAtLeast('0.8.0-next.1', '0.8.0'));
});

test('a snippet is offered only from the release that ships its entry point', () => {
  assert.deepEqual(
    availableSnippets('0.7.0').map((spec) => spec.kind),
    ['react', 'html']
  );
  assert.deepEqual(
    availableSnippets('0.8.0').map((spec) => spec.kind),
    SNIPPETS.map((spec) => spec.kind)
  );
});

test('each kind is the tabbied/snippets builder of the same name', async () => {
  // The text of each snippet is pinned in packages/tabbied/test/snippets.test.mjs,
  // beside the builders; the editor only chooses which to offer.
  const builders = await import('tabbied/snippets');

  for (const { kind } of SNIPPETS) {
    assert.equal(buildSnippet(kind, PLATE), builders.buildSnippet(kind, PLATE), kind);
  }
});
