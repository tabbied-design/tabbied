// The docs pages' examples, compiled: the sizing cases in every setup's
// spelling (components/react-docs-page/examples/sizing.ts), the samples under
// the shared live demos (examples/guide.ts), the Concepts page's examples
// (examples/concepts.ts) and every recipe (examples/recipes/*.ts). React's are type-checked against the package as
// it is built, Vue's go through Vue's own compiler, and the HTML, element and
// plain-JavaScript ones are parsed. Svelte has no compiler in this repo, so
// its examples are checked by hand when they change; e2e/docs-examples.spec.ts
// renders the markup ones and measures the boxes they draw.
//
// Run with `npm run test:lib` after `npm run build:packages`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { compileScript, parse } from '@vue/compiler-sfc';

import { SIZING_CASES, sizingCode } from '../components/react-docs-page/examples/sizing.ts';
import { REACT_RECIPES } from '../components/react-docs-page/examples/recipes/react.ts';
import { VUE_RECIPES } from '../components/react-docs-page/examples/recipes/vue.ts';
import { SVELTE_RECIPES } from '../components/react-docs-page/examples/recipes/svelte.ts';
import { ELEMENT_RECIPES } from '../components/react-docs-page/examples/recipes/element.ts';
import { HTML_RECIPES } from '../components/react-docs-page/examples/recipes/html.ts';
import { JAVASCRIPT_RECIPES } from '../components/react-docs-page/examples/recipes/javascript.ts';
import { RECIPE_PREVIEWS } from '../components/react-docs-page/examples/recipes/previews.ts';
import { GUIDE, GUIDE_PALETTES } from '../components/react-docs-page/examples/guide.ts';
import { CONCEPT_EXAMPLES, CONCEPT_PREVIEWS, CONCEPT_SETUPS } from '../components/react-docs-page/examples/concepts.ts';
import { PALETTE_LIBRARY } from './paletteLibrary.ts';

const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const VERSION = '0.0.0-test';
const withVersion = (code) => code.replaceAll('@VERSION@', VERSION);

const ALL = { react: REACT_RECIPES, vue: VUE_RECIPES, svelte: SVELTE_RECIPES, element: ELEMENT_RECIPES, html: HTML_RECIPES, javascript: JAVASCRIPT_RECIPES };

/** The Concepts page's examples in one setup, as [id, sample] pairs. */
const concepts = (setup) => Object.entries(CONCEPT_EXAMPLES).map(([id, samples]) => [id, samples[setup]]);

/** The module scripts in an HTML example. */
const moduleScripts = (html) =>
  [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((match) => match[1]);

test('every page has recipes in all three groups, with unique ids', () => {
  for (const [setup, recipes] of Object.entries(ALL)) {
    assert.ok(recipes.length >= 12, `${setup} has ${recipes.length} recipes`);
    assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, recipes.length, `${setup} repeats an id`);
    for (const group of ['layout', 'state', 'integration']) {
      assert.ok(recipes.some((recipe) => recipe.group === group), `${setup} has no ${group} recipe`);
    }
  }
});

test('every sizing case has a form in every setup', () => {
  for (const sizing of SIZING_CASES) {
    for (const setup of Object.keys(ALL)) {
      assert.ok(sizingCode(setup, sizing), `${sizing.id} has no ${setup} code`);
    }
  }
});

test('React recipes, guide samples, concept examples and sizing cases type-check against the package', () => {
  const dir = path.join(REPO, 'node_modules', '.cache', 'docs-examples-react');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const files = [];
  for (const recipe of REACT_RECIPES) {
    const file = `recipe-${recipe.id}.tsx`;
    writeFileSync(path.join(dir, file), withVersion(recipe.code));
    files.push(file);
  }
  for (const [part, sample] of Object.entries(GUIDE.react)) {
    const file = `guide-${part}.tsx`;
    writeFileSync(path.join(dir, file), withVersion(sample.code));
    files.push(file);
  }
  for (const [id, sample] of concepts('react')) {
    const file = `concept-${id}.tsx`;
    writeFileSync(path.join(dir, file), withVersion(sample.code));
    files.push(file);
  }
  for (const sizing of SIZING_CASES) {
    const file = `sizing-${sizing.id}.tsx`;
    writeFileSync(
      path.join(dir, file),
      `import { TabbiedPattern } from 'tabbied/react';\nimport { radius } from 'tabbied/patterns';\n\nexport const example = (\n  <>\n${sizingCode('react', sizing).code}\n  </>\n);\n`
    );
    files.push(file);
  }
  writeFileSync(
    path.join(dir, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        lib: ['DOM', 'DOM.Iterable', 'ES2022'],
        module: 'ESNext',
        moduleResolution: 'bundler',
        jsx: 'react-jsx',
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
      },
      files,
    })
  );

  try {
    const result = spawnSync(path.join(REPO, 'node_modules', '.bin', 'tsc'), ['-p', path.join(dir, 'tsconfig.json')], {
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Vue recipes, guide samples, concept examples and sizing cases compile', () => {
  const sources = [
    ...VUE_RECIPES.map((recipe) => [recipe.id, recipe.code]),
    ...Object.entries(GUIDE.vue).map(([part, sample]) => [`guide-${part}`, sample.code]),
    ...concepts('vue').map(([id, sample]) => [`concept-${id}`, sample.code]),
    ...SIZING_CASES.map((sizing) => [
      `sizing-${sizing.id}`,
      `<script setup>\nimport { TabbiedPattern } from 'tabbied/vue';\nimport { radius } from 'tabbied/patterns';\n</script>\n\n${sizingCode('vue', sizing).code}`,
    ]),
  ];

  for (const [id, source] of sources) {
    const { descriptor, errors } = parse(source, { filename: `${id}.vue` });
    assert.deepEqual(errors, [], id);
    // Compiles the template inline, so a bad expression throws here.
    assert.doesNotThrow(() => compileScript(descriptor, { id, inlineTemplate: true }), id);
  }
});

test('HTML, element and JavaScript examples parse', async () => {
  const scripts = [
    ...JAVASCRIPT_RECIPES.map((recipe) => [`javascript/${recipe.id}`, recipe.code]),
    ...ELEMENT_RECIPES.filter((recipe) => recipe.lang === 'ts').map((recipe) => [`element/${recipe.id}`, recipe.code]),
    ...[...ELEMENT_RECIPES, ...HTML_RECIPES]
      .filter((recipe) => recipe.lang === 'html')
      .flatMap((recipe) => moduleScripts(withVersion(recipe.code)).map((script) => [recipe.id, script])),
    ...SIZING_CASES.map((sizing) => [`sizing/${sizing.id}`, sizingCode('javascript', sizing).code]),
    ...Object.entries(GUIDE.javascript).map(([part, sample]) => [`guide/javascript/${part}`, sample.code]),
    ...concepts('javascript').map(([id, sample]) => [`concept/javascript/${id}`, sample.code]),
    ...['element', 'html'].flatMap((setup) =>
      Object.entries(GUIDE[setup]).flatMap(([part, sample]) =>
        moduleScripts(withVersion(sample.code)).map((script) => [`guide/${setup}/${part}`, script])
      )
    ),
    ...['element', 'html'].flatMap((setup) =>
      concepts(setup).flatMap(([id, sample]) =>
        moduleScripts(withVersion(sample.code)).map((script) => [`concept/${setup}/${id}`, script])
      )
    ),
  ];

  assert.ok(scripts.length > 40);
  for (const [id, code] of scripts) {
    await assert.doesNotReject(transform(code, { loader: 'js', format: 'esm' }), id);
  }
});

test('an HTML recipe imports every design its markup names', () => {
  for (const recipe of HTML_RECIPES) {
    const named = new Set([...recipe.code.matchAll(/data-pattern="([a-z0-9]+)"/g)].map((match) => match[1]));
    const imported = new Set(
      [...recipe.code.matchAll(/patterns\?exports=([a-z0-9,]+)'/g)].flatMap((match) => match[1].split(','))
    );

    // The one recipe about a slug the script leaves out names it on purpose.
    if (recipe.id === 'unknown') named.delete('notimported');
    for (const slug of named) assert.ok(imported.has(slug), `${recipe.id} names ${slug} but does not import it`);
  }
});

// The live preview above a recipe is drawn from examples/recipes/previews.ts,
// one entry per id for every setup, so each entry is held to the code of
// every recipe it stands for: what the preview draws, the code draws.
test('every recipe has a preview, and each preview draws what its code does', () => {
  const squash = (text) => text.replace(/\s+/g, '');
  for (const [setup, recipes] of Object.entries(ALL)) {
    for (const recipe of recipes) {
      const where = `${setup}/${recipe.id}`;
      const spec = RECIPE_PREVIEWS[recipe.id];
      assert.ok(spec, `${where} has no preview`);
      const code = recipe.code;
      const flat = squash(code).toLowerCase();

      for (const slug of spec.designs) assert.match(code, new RegExp(`\\b${slug}\\b`), `${where} draws no ${slug}`);
      if (!spec.seedsFromData) {
        for (const seed of spec.seeds ?? []) assert.ok(code.includes(seed), `${where} has no seed ${seed}`);
      }
      for (const color of (spec.palettes ?? []).flat()) {
        assert.ok(flat.includes(color.toLowerCase()), `${where} has no color ${color}`);
      }
      for (const [id, value] of Object.entries(spec.options ?? {})) {
        assert.match(code, new RegExp(`${id}[^\\n]*${String(value).replace('.', '\\.')}`), `${where} has no ${id} ${value}`);
      }
      for (const key of ['density', 'height', 'width', 'redrawInterval']) {
        if (spec[key] !== undefined) assert.ok(code.includes(String(spec[key])), `${where} has no ${key} ${spec[key]}`);
      }
      if (spec.aspectRatio) assert.ok(flat.includes(squash(spec.aspectRatio)), `${where} is not ${spec.aspectRatio}`);
      if (spec.ground) assert.ok(flat.includes(spec.ground.toLowerCase()), `${where} has no ground ${spec.ground}`);
    }
  }
});

test('the guide draws in the library palettes it names', () => {
  for (const [id, colors] of Object.entries(GUIDE_PALETTES)) {
    const palette = PALETTE_LIBRARY.find((entry) => entry.id === id);
    assert.ok(palette, `no ${id} in lib/paletteLibrary`);
    assert.deepEqual([...colors], palette.colors, `${id} has changed in the library`);
  }
});

test('every setup has every guide sample, and an HTML one imports what it names', () => {
  const parts = Object.keys(GUIDE.react);
  for (const [setup, samples] of Object.entries(GUIDE)) {
    assert.deepEqual(Object.keys(samples), parts, `${setup} is missing a sample`);
  }
  for (const [part, sample] of Object.entries(GUIDE.html)) {
    const named = new Set([...sample.code.matchAll(/data-pattern="([a-z0-9]+)"/g)].map((match) => match[1]));
    const imported = new Set(
      [...sample.code.matchAll(/patterns\?exports=([a-z0-9,]+)'/g)].flatMap((match) => match[1].split(','))
    );
    for (const slug of named) assert.ok(imported.has(slug), `html/${part} names ${slug} but does not import it`);
  }
});

test('every concept has an example in every setup the switch offers, and an HTML one imports what it names', () => {
  const setups = CONCEPT_SETUPS.map((setup) => setup.id);
  assert.deepEqual([...setups].sort(), Object.keys(GUIDE).sort(), 'the switch offers a setup the guide does not, or misses one');
  for (const [id, samples] of Object.entries(CONCEPT_EXAMPLES)) {
    assert.deepEqual(Object.keys(samples).sort(), [...setups].sort(), `${id} is missing a setup`);
  }
  for (const [id, sample] of concepts('html')) {
    const named = new Set([...sample.code.matchAll(/data-pattern="([a-z0-9]+)"/g)].map((match) => match[1]));
    const imported = new Set(
      [...sample.code.matchAll(/patterns\?exports=([a-z0-9,]+)'/g)].flatMap((match) => match[1].split(','))
    );
    for (const slug of named) assert.ok(imported.has(slug), `concept html/${id} names ${slug} but does not import it`);
  }
});

// The live result above a concept's example is drawn from CONCEPT_PREVIEWS,
// one entry per concept for all six setups, so each entry is held to every
// setup's code, as a recipe's preview is: what the preview draws, the code
// draws. Where a setup writes one tag per pattern, the count is held too.
test('every concept has a preview, and each preview draws what its code does in every setup', () => {
  const squash = (text) => text.replace(/\s+/g, '');
  const TAGS = { react: /<TabbiedPattern\b/g, vue: /<TabbiedPattern\b/g, element: /<tabbied-pattern\b/g, html: /\bdata-pattern="/g };

  assert.deepEqual(Object.keys(CONCEPT_PREVIEWS).sort(), Object.keys(CONCEPT_EXAMPLES).sort(), 'a concept has no preview');
  for (const [id, spec] of Object.entries(CONCEPT_PREVIEWS)) {
    for (const [setup, sample] of Object.entries(CONCEPT_EXAMPLES[id])) {
      const where = `concept ${setup}/${id}`;
      const code = sample.code;
      const flat = squash(code).toLowerCase();

      if (TAGS[setup]) assert.equal(code.match(TAGS[setup])?.length, spec.patterns.length, `${where} draws a different number of patterns`);
      for (const pattern of spec.patterns) {
        assert.match(code, new RegExp(`\\b${pattern.design}\\b`), `${where} draws no ${pattern.design}`);
        if (pattern.seed) assert.ok(code.includes(pattern.seed), `${where} has no seed ${pattern.seed}`);
        for (const color of pattern.palette ?? []) {
          assert.ok(flat.includes(squash(color).toLowerCase()), `${where} has no color ${color}`);
        }
        for (const [option, value] of Object.entries(pattern.options ?? {})) {
          assert.match(code, new RegExp(`${option}[^\\n]*${String(value).replace('.', '\\.')}`), `${where} has no ${option} ${value}`);
        }
        if (pattern.fit) assert.ok(code.includes(pattern.fit), `${where} has no fit ${pattern.fit}`);
        const numbers = {
          density: pattern.density,
          cellSize: pattern.cellSize,
          height: pattern.height,
          redrawInterval: pattern.redrawInterval,
          'coverRender width': pattern.coverRender?.width,
          'coverRender height': pattern.coverRender?.height,
          'canvas width': pattern.canvas?.width,
          'canvas height': pattern.canvas?.height,
        };
        for (const [key, value] of Object.entries(numbers)) {
          if (value !== undefined) assert.ok(code.includes(String(value)), `${where} has no ${key} ${value}`);
        }
        if (pattern.aspectRatio) assert.ok(flat.includes(squash(pattern.aspectRatio)), `${where} is not ${pattern.aspectRatio}`);
        if (pattern.ariaLabel) assert.ok(code.includes(pattern.ariaLabel), `${where} has no label ${pattern.ariaLabel}`);
      }
      for (const label of spec.buttons ?? []) assert.ok(code.includes(label), `${where} has no button ${label}`);
    }
  }
});
