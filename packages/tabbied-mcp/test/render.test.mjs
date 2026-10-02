// render_design's own checks, which run before the CLI is spawned, so they
// need no browser. One real render at the end runs where Chromium can be
// launched (TABBIED_CHROMIUM, or a Playwright browser already installed) and
// is skipped elsewhere, which includes CI's package job.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

import { renderTool } from '../dist/node/render.js';

const require = createRequire(import.meta.url);
const catalog = JSON.parse(
  fs.readFileSync(require.resolve('tabbied/catalog.json'), 'utf-8')
);

const tool = renderTool(catalog);
const render = (args) => tool.run(args);
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'tabbied-render-test-'));
const scratchFolders = () =>
  new Set(fs.readdirSync(os.tmpdir()).filter((name) => name.startsWith('tabbied-')));

test('render_design writes files, so it says it is not read-only', () => {
  assert.deepEqual(tool.definition.annotations, {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
  });
  const { properties } = tool.definition.inputSchema;
  assert.equal(properties.slug.minLength, 1);
  assert.equal(properties.width.minimum, 1);
  assert.equal(properties.scale.minimum, 1);
  assert.ok(properties.scale.maximum >= 2);
});

test('a relative out path is refused, not written beside the server', async () => {
  const result = await render({ slug: 'radius', format: 'png', out: 'hero.png' });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /absolute path/);
});

test('an out path whose extension disagrees with format is refused', async () => {
  const result = await render({
    slug: 'radius',
    format: 'png',
    out: path.join(scratch, 'hero.svg'),
  });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /must end in \.png/);
});

test('sizes and scales outside their range are refused', async () => {
  for (const args of [{ scale: 0 }, { width: -10 }, { height: 0 }, { width: 1.5 }]) {
    const result = await render({ slug: 'radius', format: 'png', ...args });
    assert.equal(result.isError, true, JSON.stringify(args));
  }
});

test('one option cannot smuggle another past its checks', async () => {
  const result = await render({
    slug: 'radius',
    format: 'png',
    options: { grid: '8x12; frequency: 9' },
  });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /no ";"/);

  const unknown = await render({ slug: 'radius', format: 'png', options: { nope: 1 } });
  assert.equal(unknown.isError, true);
  assert.match(unknown.content[0].text, /has no option "nope"/);
});

// ---- with a browser --------------------------------------------------------

function browserAvailable() {
  if (process.env.TABBIED_CHROMIUM) return true;
  try {
    const { chromium } = require('playwright-core');
    return fs.existsSync(chromium.executablePath());
  } catch {
    return false;
  }
}

test(
  'a render that fails reports the CLI message and leaves no scratch folder',
  { skip: !browserAvailable() && 'no Chromium to launch' },
  async () => {
    const before = scratchFolders();
    const result = await render({
      slug: 'radius',
      format: 'png',
      palette: ['notacolor', 'alsonot'],
    });
    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /tabbied: --palette: "notacolor", "alsonot" are not CSS colors/);
    assert.doesNotMatch(result.content[0].text, /\(node:\d+\)/);
    const added = [...scratchFolders()].filter((name) => !before.has(name));
    assert.deepEqual(added, [], 'the scratch folder was removed');
  }
);

test(
  'an SVG written to a path is cut to the size asked for, and a seed may start with --',
  { skip: !browserAvailable() && 'no Chromium to launch' },
  async () => {
    const out = path.join(scratch, 'hero.svg');
    const result = await render({
      slug: 'radius',
      format: 'svg',
      out,
      width: 320,
      height: 180,
      seed: '--browser',
    });
    assert.ok(!result.isError, result.content[0].text);
    assert.match(fs.readFileSync(out, 'utf-8'), /viewBox="0 0 320 180"/);
  }
);

test.after(() => fs.rmSync(scratch, { recursive: true, force: true }));
