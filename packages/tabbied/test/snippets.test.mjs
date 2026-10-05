// tabbied/snippets, checked as text: what each setup's snippet says for one
// plate (the editor's input), and for a design with nothing chosen (the MCP
// server's and the catalog's input). e2e/svg-export.spec.ts copies the
// editor's through the real menu; test/catalog.test.mjs checks the catalog
// carries these builders' output.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SNIPPET_SETUPS,
  buildSnippet,
  buildSnippets,
  parseRatio,
} from '../dist/snippets/index.js';

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

/** What get_design passes: the design's own ratio and ground, nothing chosen. */
const BARE = { slug: 'radius', ratio: [3, 2], ground: '#0B1020', version: '0.9.0' };

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

test('html: data attributes, the ground color before the script, pinned esm.sh imports', () => {
  const code = buildSnippet('html', PLATE);

  assert.match(code, /<div data-pattern="radius"/);
  assert.match(code, /data-options="frequency: 0\.8"/);
  // Without it the box is blank until the module loads.
  assert.match(code, /style="width: 100%; aspect-ratio: 2 \/ 3; background: #0B1020"/);
  assert.match(
    code,
    /import \{ radius \} from 'https:\/\/esm\.sh\/tabbied@0\.8\.0\/patterns\?exports=radius';/
  );
});

test('core: createPattern on a host sized by resolveBoxStyle', () => {
  const code = buildSnippet('core', PLATE);

  assert.match(code, /^import \{ createPattern, resolveBoxStyle \} from 'tabbied';/);
  assert.match(code, /import \{ radius \} from 'tabbied\/patterns';/);
  assert.match(code, /Object\.assign\(host\.style, resolveBoxStyle\(\{ aspectRatio: '2 \/ 3' \}\)\);/);
  assert.match(code, /createPattern\(host, \{\n  pattern: radius,\n  seed: '0000',/);
  assert.match(code, /palette: \['#0B1020', '#3E8BFF', '#3FFFB2'\],/);
  assert.match(code, /options: \{ frequency: 0\.8 \},/);
});

test('quotes in values cannot break out of a string or an attribute', () => {
  const tricky = { ...PLATE, seed: `a'b"c`, options: [['shape', `x'"y`]] };

  assert.match(buildSnippet('svelte', tricky), /seed: 'a\\'b"c',/);
  assert.match(buildSnippet('element', tricky), /seed="a'b&quot;c"/);
  assert.match(buildSnippet('vue', tricky), /:options="\{ shape: 'x\\'&quot;y' \}"/);
  assert.match(buildSnippet('core', tricky), /seed: 'a\\'b"c',/);
});

test('a design without a grid gets no density, and no options means no options', () => {
  const bare = { ...PLATE, density: null, options: [] };

  for (const setup of SNIPPET_SETUPS) {
    const code = buildSnippet(setup, bare);
    assert.doesNotMatch(code, /density/, setup);
    assert.doesNotMatch(code, /options/, setup);
  }
});

test('nothing chosen: no seed, palette, options or density, and the ground still paints', () => {
  const snippets = buildSnippets(BARE);

  assert.deepEqual(Object.keys(snippets), [...SNIPPET_SETUPS]);
  for (const [setup, code] of Object.entries(snippets)) {
    assert.doesNotMatch(code, /seed|palette|density|options/, setup);
    assert.match(code, /3 \/ 2/, setup);
    assert.match(code, /the 3:2 ratio it was designed at/, setup);
  }
  assert.match(snippets.element, /background: #0B1020/);
  assert.match(snippets.html, /background: #0B1020/);
  assert.match(snippets.element, /tabbied@0\.9\.0/);
});

test('ratios read as the catalog names them, and 2:3 when a design names none', () => {
  assert.deepEqual(parseRatio('1:1'), [1, 1]);
  assert.deepEqual(parseRatio('16:9'), [16, 9]);
  assert.deepEqual(parseRatio(undefined), [2, 3]);
  assert.deepEqual(parseRatio('wide'), [2, 3]);
});
