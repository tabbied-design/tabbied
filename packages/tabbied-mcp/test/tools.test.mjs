// The toolset, tested against the real catalog rather than a fixture: these
// tools exist to make an opaque set of slugs queryable, and an invented
// catalog would pass while the real one stayed broken.
//
// Run with `npm test --workspace tabbied-mcp`, after both packages are built
// (`npm run build:packages` from the repo root).
import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import { createRequire } from 'node:module';

import { catalogTools, createToolset } from '../dist/tools.js';

const require = createRequire(import.meta.url);
const catalog = JSON.parse(
  fs.readFileSync(require.resolve('tabbied/catalog.json'), 'utf-8')
);

// A preview fetcher that records what it was asked for instead of doing IO.
const asked = [];
const fetchPreview = async (design) => {
  asked.push(design.slug);
  return { data: 'ZmFrZQ==', mimeType: 'image/webp' };
};

const toolset = createToolset(
  catalogTools({
    catalog,
    fetchPreview,
    fetchDocs: async () => 'THE REFERENCE',
  })
);

const parse = (result) => JSON.parse(result.content[0].text);

const call = (name, args = {}) => toolset.call(name, args);

test('exposes exactly the tools the host can resolve, and drops the rest', () => {
  // A tool whose fetcher the host did not supply must not be advertised at
  // all - a listed tool that always fails is worse than a missing one. Only
  // presence is read here, so the fetchers are never called.
  const fetchDocs = async () => '';
  const fetchTemplateCatalog = async () => ({ templates: [] });
  const fetchTemplate = async () => ({});

  const cases = [
    ['bare', { catalog }, ['search_designs', 'get_design']],
    [
      'preview and docs',
      { catalog, fetchPreview, fetchDocs },
      ['search_designs', 'get_design', 'preview_design', 'get_docs'],
    ],
    // The index alone is not enough for get_template, which needs both.
    [
      'template index only',
      { catalog, fetchTemplateCatalog },
      ['search_designs', 'get_design', 'list_templates'],
    ],
    [
      'full',
      { catalog, fetchPreview, fetchDocs, fetchTemplateCatalog, fetchTemplate },
      [
        'search_designs',
        'get_design',
        'preview_design',
        'get_docs',
        'list_templates',
        'get_template',
      ],
    ],
  ];

  for (const [name, context, expected] of cases) {
    assert.deepEqual(
      createToolset(catalogTools(context)).list().map((tool) => tool.name),
      expected,
      name
    );
  }
});

test('every tool definition is a valid MCP tool', () => {
  for (const tool of toolset.list()) {
    assert.match(tool.name, /^[A-Za-z0-9_.-]{1,128}$/, `${tool.name}: bad name`);
    assert.ok(tool.description.length > 40, `${tool.name}: thin description`);
    assert.equal(tool.inputSchema.type, 'object');
    for (const required of tool.inputSchema.required ?? []) {
      assert.ok(
        tool.inputSchema.properties?.[required],
        `${tool.name}: requires "${required}" but doesn't define it`
      );
    }
  }
});

test('search narrows with AND across and within fields', async () => {
  const all = parse(await call('search_designs', { limit: 50 }));
  assert.equal(all.matched, catalog.count);

  const dotted = parse(await call('search_designs', { tags: ['dots'], limit: 50 }));
  assert.ok(dotted.matched > 0 && dotted.matched < catalog.count);
  assert.ok(dotted.designs.every((design) => design.tags.includes('dots')));

  const sparse = parse(
    await call('search_designs', { tags: ['dots'], density: 'sparse', limit: 50 })
  );
  assert.ok(sparse.matched <= dotted.matched, 'adding a filter must not widen');
  assert.ok(
    sparse.designs.every(
      (design) => design.tags.includes('dots') && design.density === 'sparse'
    )
  );
});

test('search honors the limit but still reports the true total', async () => {
  const result = parse(await call('search_designs', { limit: 3 }));
  assert.equal(result.designs.length, 3);
  assert.equal(result.returned, 3);
  assert.equal(result.matched, catalog.count);
});

test('an over-narrow search explains itself instead of returning nothing', async () => {
  const result = parse(
    await call('search_designs', { tags: ['dots'], query: 'zzzzznotathing' })
  );

  assert.equal(result.matched, 0);
  // The point of the breakdown: the agent can see which single filter killed
  // the query (0) versus which were merely narrow.
  const zero = result.filtersIndependently.filter((entry) => entry.matches === 0);
  assert.equal(zero.length, 1);
  assert.match(zero[0].filter, /^query /);
  assert.ok(result.vocabulary.tags.includes('dots'));
});

test('search can select on SVG-export support', async () => {
  const unsupported = parse(
    await call('search_designs', { svgExport: false, limit: 50 })
  );
  assert.ok(unsupported.matched > 0);
  assert.ok(unsupported.designs.every((design) => design.svgExport === false));

  const supported = parse(await call('search_designs', { svgExport: true, limit: 50 }));
  assert.equal(supported.matched + unsupported.matched, catalog.count);
});

test('get_design returns the record plus slug-substituted usage', async () => {
  const slug = catalog.designs[0].slug;
  const design = parse(await call('get_design', { slug }));

  assert.equal(design.slug, slug);
  assert.ok(Array.isArray(design.options));
  assert.ok(design.usage.import.includes(slug));
  assert.ok(design.usage.react.includes(slug));
  assert.ok(design.usage.cli.includes(slug));
  assert.ok(!JSON.stringify(design.usage).includes('<slug>'), 'placeholder left in');
  // The sizing note is the one thing worth repeating everywhere.
  assert.match(design.sizing, /no intrinsic size/);
});

test('get_design warns when a design has no vector export', async () => {
  const unsupported = catalog.designs.find((design) => !design.svgExport.supported);
  assert.ok(unsupported, 'catalog should still contain an svgExport: false design');

  const design = parse(await call('get_design', { slug: unsupported.slug }));
  assert.match(design.svgExportWarning, /cannot be exported/);
});

test('preview_design returns an image per slug and labels each one', async () => {
  asked.length = 0;
  const slugs = catalog.designs.slice(0, 3).map((design) => design.slug);
  const result = await call('preview_design', { slugs });

  assert.deepEqual(asked, slugs);
  const images = result.content.filter((block) => block.type === 'image');
  assert.equal(images.length, 3);
  assert.ok(images.every((image) => image.mimeType === 'image/webp'));
  // Each image is preceded by the text that says which design it is.
  assert.equal(result.content[0].type, 'text');
  assert.ok(result.content[0].text.startsWith(slugs[0]));
});

test('preview_design reports a bad slug without dropping the good ones', async () => {
  const good = catalog.designs[0].slug;
  const result = await call('preview_design', { slugs: ['nope', good] });

  assert.equal(result.content.filter((block) => block.type === 'image').length, 1);
  assert.ok(result.content.some((block) => block.text?.includes('no such design')));
});

test('a failing preview degrades to the published URL', async () => {
  const failing = createToolset(
    catalogTools({
      catalog,
      fetchPreview: async () => {
        throw new Error('network down');
      },
    })
  );
  const slug = catalog.designs[0].slug;
  const result = await failing.call('preview_design', { slugs: [slug] });

  assert.ok(!result.isError, 'a missing image is not a failed call');
  assert.match(result.content[0].text, /network down/);
  assert.match(result.content[0].text, /https:\/\/tabbied\.com\/previews\//);
});

test('a throwing handler becomes a tool error, never a rejected call', async () => {
  const exploding = createToolset([
    {
      definition: {
        name: 'boom',
        title: 'Boom',
        description: 'x',
        inputSchema: { type: 'object' },
      },
      run() {
        throw new Error('kaboom');
      },
    },
  ]);

  const result = await exploding.call('boom', {});
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /kaboom/);
});

test('calling a tool that does not exist lists the ones that do', async () => {
  const result = await call('no_such_tool', {});
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /search_designs/);
});
