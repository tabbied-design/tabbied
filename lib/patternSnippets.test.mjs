// The editor's copied snippets, checked as text: which are offered at which
// package version, and what each says for one plate. Run with
// `npm run test:lib` (Node strips the types from patternSnippets.ts itself).
// e2e/svg-export.spec.ts copies the offered ones through the real menu.
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

test('react: the component at the plate ratio, grid left out', () => {
  const code = buildSnippet('react', PLATE);

  assert.match(code, /^import \{ TabbiedPattern \} from 'tabbied\/react';/);
  assert.match(code, /export function RadiusPattern\(\) \{/);
  assert.match(code, /aspectRatio="2 \/ 3"/);
  assert.match(code, /density=\{0\.5\}/);
  assert.match(code, /palette=\{\['#0B1020', '#3E8BFF', '#3FFFB2'\]\}/);
  assert.match(code, /options=\{\{ frequency: 0\.8 \}\}/);
  assert.doesNotMatch(code, /grid/);
});

test('vue: bound values for arrays and numbers, kebab-case names', () => {
  const code = buildSnippet('vue', PLATE);

  assert.match(code, /import \{ TabbiedPattern \} from 'tabbied\/vue';/);
  assert.match(code, /:pattern="radius"/);
  assert.match(code, /aspect-ratio="2 \/ 3"/);
  assert.match(code, /:density="0\.5"/);
  assert.match(code, /:palette="\['#0B1020', '#3E8BFF', '#3FFFB2'\]"/);
  assert.match(code, /:options="\{ frequency: 0\.8 \}"/);
});

test('svelte: one props object, spread and passed to the action', () => {
  const code = buildSnippet('svelte', PLATE);

  assert.match(code, /from 'tabbied\/svelte';/);
  assert.match(code, /aspectRatio: '2 \/ 3',/);
  assert.match(code, /<div \{\.\.\.tabbiedAttributes\(props\)\} use:tabbied=\{props\}><\/div>/);
});

test('element: attributes without data-, a box that needs no script, a pinned CDN file', () => {
  const code = buildSnippet('element', PLATE);

  assert.match(code, /<tabbied-pattern\n  pattern="radius"/);
  assert.match(code, /options="frequency: 0\.8"/);
  assert.match(code, /style="display: block; aspect-ratio: 2 \/ 3; background: #0B1020"/);
  assert.match(
    code,
    /src="https:\/\/cdn\.jsdelivr\.net\/npm\/tabbied@0\.8\.0\/dist\/element\/tabbied-element\.js"/
  );
});

test('html: data attributes and the trimmed, pinned esm.sh imports', () => {
  const code = buildSnippet('html', PLATE);

  assert.match(code, /<div data-pattern="radius"/);
  assert.match(code, /data-options="frequency: 0\.8"/);
  assert.match(
    code,
    /import \{ radius \} from 'https:\/\/esm\.sh\/tabbied@0\.8\.0\/patterns\?exports=radius';/
  );
});

test('quotes in values cannot break out of a string or an attribute', () => {
  const tricky = { ...PLATE, seed: `a'b"c`, options: [['shape', `x'"y`]] };

  assert.match(buildSnippet('svelte', tricky), /seed: 'a\\'b"c',/);
  assert.match(buildSnippet('element', tricky), /seed="a'b&quot;c"/);
  assert.match(buildSnippet('vue', tricky), /:options="\{ shape: 'x\\'&quot;y' \}"/);
});

test('a design without a grid gets no density, and no options means no options', () => {
  const bare = { ...PLATE, density: null, options: [] };

  for (const kind of SNIPPETS.map((spec) => spec.kind)) {
    const code = buildSnippet(kind, bare);
    assert.doesNotMatch(code, /density/, kind);
    assert.doesNotMatch(code, /options/, kind);
  }
});
