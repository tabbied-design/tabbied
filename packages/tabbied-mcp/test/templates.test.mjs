// The template tools. They read *site* artifacts that are not in this
// package's dependency tree, and fetching tabbied.com would test the deploy, so
// a fixture stands in. It mirrors what scripts/generate-editable.mjs emits;
// e2e/editable.spec.ts pins those shapes against the real thing.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import { createRequire } from 'node:module';

import { catalogTools, createToolset } from '../dist/tools.js';

const require = createRequire(import.meta.url);
const catalog = JSON.parse(
  fs.readFileSync(require.resolve('tabbied/catalog.json'), 'utf-8')
);

const templateCatalog = {
  specVersion: 1,
  generated: 2,
  templates: [
    {
      slug: 'solstice',
      name: 'Solstice',
      category: 'Wellness & sport',
      topic: 'Yoga & wellness retreat',
      href: '/templates/solstice/site/',
      spec: '/editable/solstice.json',
      palette: ['#2b1d3a', '#ff6b6b'],
      patterns: ['lobe', 'blossom'],
      slots: { text: 106, image: 9, pattern: 4 },
      downloads: {
        html: '/downloads/solstice-html.zip',
        react: '/downloads/solstice-react.zip',
      },
    },
    {
      slug: 'verdant',
      name: 'Verdant',
      category: 'Shop',
      topic: 'Indoor plant shop',
      href: '/templates/verdant/site/',
      spec: '/editable/verdant.json',
      palette: ['#f4faf0', '#2d6a4f'],
      patterns: ['frond'],
      slots: { text: 80, image: 10, pattern: 2 },
      downloads: {
        html: '/downloads/verdant-html.zip',
        react: '/downloads/verdant-react.zip',
      },
    },
  ],
};

const specs = {
  solstice: {
    specVersion: 1,
    site: { slug: 'solstice', name: 'Solstice' },
    palette: {
      colors: ['#2b1d3a', '#ff6b6b'],
      derivation: 'templateSite',
      flatSections: true,
    },
    slots: [
      {
        id: 'hero.title',
        kind: 'text',
        value: 'Come back to {em}yourself{/em}.',
        format: 'emphasis',
      },
    ],
  },
};

const requested = [];

const context = {
  catalog,
  fetchTemplateCatalog: async () => templateCatalog,
  fetchTemplate: async (slug) => {
    requested.push(slug);

    if (!(slug in specs)) throw new Error(`${slug} returned 404`);

    return specs[slug];
  },
};

const toolset = createToolset(catalogTools(context));

const parse = (result) => JSON.parse(result.content[0].text);
const call = (name, args = {}) => toolset.call(name, args);

test('list_templates returns one line per site, and the categories there are', async () => {
  const result = parse(await call('list_templates'));

  assert.equal(result.matched, 2);
  assert.equal(result.total, 2);
  // The compact form: enough to choose by, with get_template for the rest.
  assert.deepEqual(result.templates[0], {
    slug: 'solstice',
    name: 'Solstice',
    category: 'Wellness & sport',
    topic: 'Yoga & wellness retreat',
  });
  assert.deepEqual(result.categories, [
    { category: 'Shop', count: 1 },
    { category: 'Wellness & sport', count: 1 },
  ]);
  assert.match(result.license, /licensed per Tabbied account/);
});

test('list_templates gives the palette, patterns and slot counts on request', async () => {
  const result = parse(await call('list_templates', { detail: true }));

  assert.deepEqual(result.templates[0].editable, {
    text: 106,
    image: 9,
    pattern: 4,
  });
  assert.deepEqual(result.templates[0].patterns, ['lobe', 'blossom']);
  assert.equal(result.templates[0].url, 'https://tabbied.com/templates/solstice/site/');
});

test('list_templates filters on slug, name and what the business is', async () => {
  const byName = parse(await call('list_templates', { query: 'Verd' }));
  assert.equal(byName.matched, 1);
  assert.equal(byName.templates[0].slug, 'verdant');

  const byTopic = parse(await call('list_templates', { query: 'yoga retreat' }));
  assert.deepEqual(byTopic.templates.map((entry) => entry.slug), ['solstice']);
});

test('list_templates filters on a category however it is spelled', async () => {
  for (const category of ['Wellness & sport', 'wellness-and-sport', 'WELLNESS AND SPORT']) {
    const result = parse(await call('list_templates', { category }));
    assert.deepEqual(result.templates.map((entry) => entry.slug), ['solstice'], category);
  }
});

test('list_templates pages, and says how to ask for the next page', async () => {
  const first = parse(await call('list_templates', { limit: 1 }));
  assert.equal(first.matched, 2);
  assert.equal(first.returned, 1);
  assert.deepEqual(first.templates.map((entry) => entry.slug), ['solstice']);
  assert.match(first.next, /offset 1/);

  const second = parse(await call('list_templates', { limit: 1, offset: 1 }));
  assert.deepEqual(second.templates.map((entry) => entry.slug), ['verdant']);
  assert.equal(second.next, undefined, 'the last page has no next');

  const past = parse(await call('list_templates', { offset: 5 }));
  assert.equal(past.returned, 0);
  assert.match(past.hint, /past the last match/);
});

test('a query that matches nothing names the categories instead of an empty set', async () => {
  const result = parse(await call('list_templates', { query: 'zzz' }));

  assert.equal(result.matched, 0);
  assert.equal(result.categories.length, 2);
  assert.match(result.hint, /category|query/);
});

test('an unreachable index is a tool error that says where it lives', async () => {
  const offline = createToolset(
    catalogTools({
      catalog,
      fetchTemplateCatalog: async () => {
        throw new Error('fetch failed');
      },
      fetchTemplate: async () => specs.solstice,
    })
  );

  for (const [name, args] of [
    ['list_templates', {}],
    ['get_template', { slug: 'solstice' }],
  ]) {
    const result = await offline.call(name, args);
    assert.equal(result.isError, true, name);
    assert.match(result.content[0].text, /fetch failed/, name);
    assert.match(result.content[0].text, /https:\/\/tabbied\.com\/editable-catalog\.json/, name);
  }
});

test('get_template returns the spec, the downloads, and how to use them', async () => {
  const result = parse(await call('get_template', { slug: 'solstice' }));

  assert.equal(result.site.slug, 'solstice');
  assert.equal(result.palette.derivation, 'templateSite');
  assert.equal(result.slots[0].id, 'hero.title');
  assert.equal(
    result.downloads.html,
    'https://tabbied.com/downloads/solstice-html.zip'
  );
  // The usage notes are the part an agent most reliably gets wrong, so they
  // carry the resolved URL rather than a placeholder.
  assert.match(result.usage.html, /downloads\/solstice-html\.zip/);
  assert.match(result.usage.colors, /data-edit-root/);
  assert.match(result.usage.text, /\{em\}/);
  // An agent asked to copy a template from its preview should learn here that
  // it is licensed, and where the terms are.
  assert.match(result.license, /licensed per Tabbied account/);
  assert.match(result.license, /terms-of-service\/#template-license/);
});

test('an unknown slug comes back as a correction, not a dead end', async () => {
  const result = await call('get_template', { slug: 'solstis' });

  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /Did you mean: solstice\?/);
});

test('a slug the index knows but whose spec cannot be read is a tool error', async () => {
  // The index and the specs are separate assets, so they can disagree if a
  // deploy is half-written; that must surface, not throw.
  const result = await call('get_template', { slug: 'verdant' });

  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /Could not load the spec for "verdant"/);
  assert.match(result.content[0].text, /https:\/\/tabbied\.com\/editable\/verdant\.json/);
  assert.ok(requested.includes('verdant'));
});

test('get_template requires a slug', async () => {
  const result = await call('get_template', {});

  assert.equal(result.isError, true);
});
