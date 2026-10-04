// The server half of tabbied/svelte and tabbied/vue: what a SvelteKit or
// Nuxt server render paints before any script runs. It has to be the right
// box, on the right ground, with the clipping the controller needs, and the
// data-* config hydratePatterns() reads - and importing either entry on a
// server must not touch the DOM. The browser half (mount, update, destroy)
// is covered by e2e/wrappers.spec.ts.
import test from 'node:test';
import assert from 'node:assert/strict';

import { tabbiedAttributes, patternController } from '../dist/svelte/index.js';
import { TabbiedPattern } from '../dist/vue/index.js';
import { patternConfigFromElement } from '../dist/core/hydrate.js';
import { patterns } from '../dist/patterns.generated.js';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';

const radius = patterns.radius;

const elementFor = (attributes) => ({
  getAttribute: (name) => (name in attributes ? attributes[name] : null),
});

test('svelte: the placeholder is the box, the ground and the clipping', () => {
  const attributes = tabbiedAttributes({ pattern: radius, aspectRatio: '3 / 2' });

  assert.equal(
    attributes.style,
    `background-color: ${radius.palette[0]}; width: 100%; aspect-ratio: 3 / 2; position: relative; overflow: hidden`
  );
  assert.equal(attributes['data-pattern'], 'radius');
  assert.equal(attributes['aria-hidden'], 'true');
});

test('svelte: the data-* config round trips through hydratePatterns', () => {
  const props = {
    pattern: radius,
    seed: 'k9Pz',
    palette: ['#0B1020', '#3E8BFF', '#3FFFB2'],
    density: 0.5,
    options: { frequency: 0.8 },
    redrawInterval: 5200,
    height: 320,
  };
  const parsed = patternConfigFromElement(elementFor(tabbiedAttributes(props)), patterns);

  assert.equal(parsed.seed, 'k9Pz');
  assert.deepEqual(parsed.palette, props.palette);
  assert.equal(parsed.density, 0.5);
  assert.deepEqual(parsed.options, { frequency: 0.8 });
  assert.equal(parsed.redrawInterval, 5200);
  // A numeric height is a box prop and, under fixed, the canvas: it rides as
  // data-height either way, as it does from the React component.
  assert.equal(parsed.height, 320);
});

test('svelte: fixed draws at its canvas size and is not clipped', () => {
  const { style } = tabbiedAttributes({ pattern: radius, fit: 'fixed' });

  assert.match(style, /width: 360px; height: 540px/);
  assert.doesNotMatch(style, /overflow/);
});

test('svelte: a caller style comes last, and a label replaces aria-hidden', () => {
  const attributes = tabbiedAttributes({
    pattern: radius,
    style: 'border-radius: 12px',
    decorative: false,
  });

  assert.match(attributes.style, /overflow: hidden; border-radius: 12px$/);
  assert.equal(attributes['aria-hidden'], undefined);
  assert.equal(attributes.role, 'img');
  assert.equal(attributes['aria-label'], radius.name);
});

test('svelte: no controller for a node the action never ran on', () => {
  assert.equal(patternController(null), null);
  assert.equal(patternController({}), null);
});

test('vue: the server render is the same placeholder', async () => {
  const app = createSSRApp({
    render: () =>
      h(TabbiedPattern, {
        pattern: radius,
        seed: 'k9Pz',
        aspectRatio: '3 / 2',
        palette: ['#0B1020', '#3E8BFF'],
        class: 'hero',
      }),
  });
  const html = await renderToString(app);

  assert.match(html, /^<div /);
  assert.match(html, /data-pattern="radius"/);
  assert.match(html, /data-seed="k9Pz"/);
  assert.match(html, /data-palette="#0B1020, #3E8BFF"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /class="hero"/);
  assert.match(
    html,
    /style="background-color:#0B1020;width:100%;aspect-ratio:3 \/ 2;position:relative;overflow:hidden;"/
  );
  // Nothing inside it: the <css-doodle> is the controller's, after mount.
  assert.match(html, /><\/div>$/);
});

test('vue: an absent fill fills, and fill=false does not', async () => {
  const render = (props) =>
    renderToString(createSSRApp({ render: () => h(TabbiedPattern, { pattern: radius, ...props }) }));

  assert.match(await render({}), /width:100%;height:100%/);
  assert.doesNotMatch(await render({ fill: false }), /width:100%/);
});
