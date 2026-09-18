// Guards the CLI's catalog commands (list/info/help) - the parts that run
// without a browser. Rendering is exercised by hand and by consumers; these
// tests pin the query surface agents script against.
//
// Run with `npm test --workspace tabbied`, after `npm run build` has
// produced dist/cli.js and catalog.json.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cli = path.join(packageRoot, 'dist', 'cli.js');

// Derived, not pinned: a batch of new designs should not fail these tests.
const designCount = JSON.parse(
  readFileSync(path.join(packageRoot, 'catalog.json'), 'utf-8')
).designs.length;

const run = (...args) =>
  execFileSync(process.execPath, [cli, ...args], { encoding: 'utf-8' });

test('help prints usage and exits 0', () => {
  const out = run('--help');
  assert.match(out, /tabbied render <slug>/);
  assert.match(out, /tabbied list/);
});

test('list with no filters prints every design', () => {
  const out = run('list');
  assert.match(out, new RegExp(`${designCount}/${designCount} designs`));
});

test('list filters compose (tag + density)', () => {
  const out = run('list', '--tag', 'dots', '--density', 'dense');
  const lines = out.trim().split('\n');
  const summary = lines.at(-1);
  assert.match(summary, new RegExp(`^\\d+/${designCount} designs$`));

  // Every printed row names both the tag and the density it filtered on.
  for (const line of lines.slice(0, -2)) {
    assert.match(line, /dense/, line);
    assert.match(line, /dots/, line);
  }
});

test('info prints a full catalog entry as JSON', () => {
  const design = JSON.parse(run('info', 'radius'));
  assert.equal(design.slug, 'radius');
  assert.ok(Array.isArray(design.tags) && design.tags.length >= 2);
  assert.equal(
    design.preview,
    'https://tabbied.com/previews/radius.webp'
  );
});

test('unknown design and unknown command fail loudly', () => {
  for (const args of [['info', 'nosuchdesign'], ['nosuchcommand']]) {
    assert.throws(
      () => run(...args),
      (error) => error.status === 1,
      args.join(' ')
    );
  }
});
