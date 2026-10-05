// Guards the parts of the CLI that run without a browser: the catalog
// commands (list/info/help) and render's argument checks; these pin the query
// surface agents script against. The few that render need Chromium, and run
// only where one can be launched (TABBIED_CHROMIUM, or a Playwright browser
// already installed), which leaves them out of CI's package job.
//
// Run with `npm test --workspace tabbied`, after `npm run build` has
// produced dist/cli.js and catalog.json.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
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
  assert.match(out, /--format <svg\|png>/);
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

test('list lines its columns up however long a slug is', () => {
  const rows = run('list').trim().split('\n').slice(0, -2);
  // The density column starts at the same place on every row.
  const starts = new Set(rows.map((row) => row.search(/\b(sparse|medium|dense)\b/)));

  assert.equal(starts.size, 1, `density starts at ${[...starts].join(', ')}`);
  assert.ok(rows.some((row) => row.startsWith('confettitriangles ')));
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

test('render rejects a --format it cannot write, and an --out it cannot read', () => {
  const fails = (args, message) =>
    assert.throws(
      () => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf-8', stdio: 'pipe' }),
      (error) => error.status === 1 && message.test(error.stderr),
      args.join(' ')
    );

  fails(['render', 'radius', '--out', 'hero.gif', '--format', 'gif'], /--format must be svg \| png/);
  fails(['render', 'radius', '--out', 'hero'], /--out needs a \.svg or \.png extension/);
});

const fails = (args, message) =>
  assert.throws(
    () => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf-8', stdio: 'pipe' }),
    (error) => error.status === 1 && message.test(error.stderr),
    args.join(' ')
  );

test('every flag also takes --flag=value, which is how a value can start with --', () => {
  const spaced = run('list', '--tag', 'dots', '--density', 'dense');
  assert.equal(run('list', '--tag=dots', '--density=dense'), spaced);

  // Parsed as a seed rather than a missing value, so the check that fails is
  // the next one along.
  fails(['render', 'radius', '--seed=--browser', '--out=hero'], /--out needs a \.svg or \.png extension/);
  fails(['render', 'radius', '--seed', '--browser', '--out', 'hero.png'], /--seed needs a value/);
});

test('list names the valid values when a filter is not one of them', () => {
  fails(['list', '--tag', 'unknown'], /unknown --tag "unknown"[\s\S]*dots/);
  fails(['list', '--density', 'medium-ish'], /unknown --density[\s\S]*sparse/);
});

test('render rejects sizes, scales, frame counts and option values out of range', () => {
  fails(['render', 'radius', '--out', 'x.png', '--size', '0x10'], /--size must be WxH/);
  fails(['render', 'radius', '--out', 'x.png', '--scale', '0'], /--scale must be/);
  fails(['render', 'radius', '--out', 'x/', '--frames', '-1'], /--frames must be/);
  fails(['render', 'radius', '--out', 'x.png', '--palette', ' , '], /--palette needs at least one/);
  fails(['render', 'radius', '--out', 'x.png', '--options', 'frequency: 9'], /between 0\.2 and 1/);
  fails(['render', 'radius', '--out', 'x.png', '--options', 'grid: huge'], /must be one of/);
});

// ---- with a browser --------------------------------------------------------

function browserAvailable() {
  if (process.env.TABBIED_CHROMIUM) return true;
  try {
    const { chromium } = createRequire(import.meta.url)('playwright-core');
    return existsSync(chromium.executablePath());
  } catch {
    return false;
  }
}

const withBrowser = { skip: !browserAvailable() && 'no Chromium to launch' };

test('an SVG is cut to the size asked for, in every fit', withBrowser, () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tabbied-cli-test-'));
  try {
    // A grid canvas is oversized to whole tracks, and a cover render is drawn
    // at its own resolution; the file must still be the stage, as the PNG is.
    for (const fit of ['grid', 'cover', 'fixed']) {
      const out = path.join(dir, `${fit}.svg`);
      run('render', 'radius', '--seed', 'k9Pz', '--size', '320x180', '--fit', fit, '--out', out);
      const root = /<svg\b[^>]*>/.exec(readFileSync(out, 'utf-8'))[0];
      assert.match(root, /viewBox="0 0 320 180"/, `${fit}: ${root}`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a palette entry that is not a CSS color fails before anything is written', withBrowser, () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tabbied-cli-test-'));
  try {
    const out = path.join(dir, 'x.png');
    fails(
      ['render', 'radius', '--palette', 'notacolor,rgb(0, 0, 0)', '--out', out],
      /"notacolor" is not a CSS color/
    );
    assert.equal(existsSync(out), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
