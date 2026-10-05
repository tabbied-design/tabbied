// The docs pages' examples, compiled: the sizing cases in every setup's
// spelling (components/react-docs-page/examples/sizing.ts) and every recipe
// (examples/recipes/*.ts). React's are type-checked against the package as
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

const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const VERSION = '0.0.0-test';
const withVersion = (code) => code.replaceAll('@VERSION@', VERSION);

const ALL = { react: REACT_RECIPES, vue: VUE_RECIPES, svelte: SVELTE_RECIPES, element: ELEMENT_RECIPES, html: HTML_RECIPES, javascript: JAVASCRIPT_RECIPES };

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

test('React recipes and sizing cases type-check against the package', () => {
  const dir = path.join(REPO, 'node_modules', '.cache', 'docs-examples-react');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const files = [];
  for (const recipe of REACT_RECIPES) {
    const file = `recipe-${recipe.id}.tsx`;
    writeFileSync(path.join(dir, file), withVersion(recipe.code));
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

test('Vue recipes and sizing cases compile', () => {
  const sources = [
    ...VUE_RECIPES.map((recipe) => [recipe.id, recipe.code]),
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
