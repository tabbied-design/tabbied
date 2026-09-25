// Guards catalog.json against drifting from the patterns it describes.
// scripts/codegen.mjs re-implements SVG-export support (it runs before tsc and
// has no compiled module to import), so these tests compare its output against
// the real implementation in dist/.
//
// Run after `npm run build --workspace tabbied` has produced dist/ and
// catalog.json.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { patterns } from '../dist/patterns.generated.js';
import { supportsSvgExport } from '../dist/core/types.js';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const catalog = JSON.parse(
  fs.readFileSync(path.join(packageRoot, 'catalog.json'), 'utf-8')
);

const bySlug = new Map(catalog.designs.map((design) => [design.slug, design]));

test('catalog svgExport.supported matches supportsSvgExport()', () => {
  for (const [slug, definition] of Object.entries(patterns)) {
    assert.equal(
      bySlug.get(slug).svgExport.supported,
      supportsSvgExport(definition),
      `svgExport.supported for "${slug}" disagrees with supportsSvgExport()`
    );
  }
});

test('catalog carries every option a consumer can set', () => {
  for (const [slug, definition] of Object.entries(patterns)) {
    const design = bySlug.get(slug);

    assert.deepEqual(
      design.options.map((option) => option.id),
      definition.options.map((option) => option.id),
      `options for "${slug}" disagree with the definition`
    );

    for (const [index, option] of design.options.entries()) {
      const source = definition.options[index];

      assert.equal(option.type, source.type);
      assert.deepEqual(option.default, source.default);

      // ButtonSelectGroup choices must survive: they're the accepted values.
      if (source.options) assert.deepEqual(option.values, source.options);
      // Slider bounds likewise.
      if (source.min != null) assert.equal(option.min, source.min);
      if (source.max != null) assert.equal(option.max, source.max);
    }
  }
});

test('catalog omits css-doodle plumbing', () => {
  for (const design of catalog.designs) {
    // `code` is the css-doodle source: large, and not something a consumer
    // passes. Keeping it out is what makes the catalog readable.
    assert.ok(!('code' in design), `"${design.slug}" leaked its code block`);

    for (const option of design.options) {
      assert.ok(!('replace' in option), 'option leaked its replace token');
      assert.ok(!('code' in option), 'option leaked its code snippet');
    }
  }
});

test('the runtime bundle does not carry the catalog-only metadata', () => {
  for (const [slug, definition] of Object.entries(patterns)) {
    for (const field of ['tags', 'mood', 'density', 'goodFor']) {
      assert.ok(
        !(field in definition),
        `"${slug}" leaked catalog-only "${field}" into the runtime bundle`
      );
    }
  }
});

test('every SVG-export limitation is documented in the catalog', () => {
  for (const [slug, definition] of Object.entries(patterns)) {
    const design = bySlug.get(slug);

    // A definition-level note applies always; a ToggleSwitch note applies
    // only while that option is on. Both must reach the catalog, since an
    // export UI has to surface them before downloading.
    if (definition.svgExportNote) {
      assert.equal(design.svgExport.note, definition.svgExportNote, slug);
    }

    for (const [index, source] of definition.options.entries()) {
      if (source.svgExportNote) {
        assert.equal(
          design.options[index].svgExportNote,
          source.svgExportNote,
          `${slug}.${source.id}`
        );
      }
    }
  }
});
