#!/usr/bin/env node
// The `tabbied` CLI: render any preset to SVG/PNG (or a PNG frame sequence)
// from the command line, and query the catalog while you're at it.
//
//   npx tabbied render radius --seed k9Pz --size 1600x900 --out hero.svg
//   npx tabbied render bight --frames 90 --reseed-every 30 --out frames/
//   npx tabbied list --tag dots --density dense
//   npx tabbied info radius
//
// Rendering runs css-doodle in a real headless browser, the only faithful
// renderer there is. The browser comes from whichever Playwright the caller
// already has (`playwright`, `playwright-core`, or `@playwright/test`), so
// this package doesn't drag a browser download into every install.
//
// The pattern definitions come from the compiled catalog in dist, so the CLI
// works from the published tarball, not just the repo checkout.
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { patterns, isPatternSlug } from './patterns.generated.js';
import { splitTopLevel } from './core/splitTopLevel.js';
import type { PatternDefinition, OptionValue } from './core/types.js';

const require = createRequire(import.meta.url);
const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

type RenderArgs = {
  slug: string;
  out: string;
  seed: string;
  palette: string[] | null;
  options: Record<string, OptionValue>;
  width: number;
  height: number;
  fit: 'grid' | 'cover' | 'fixed';
  format: 'svg' | 'png';
  scale: number;
  frames: number;
  reseedEvery: number;
  browser: string | null;
};

const HELP = `tabbied - render Tabbied's generative patterns from the command line

Usage:
  tabbied render <slug> --out <file|dir> [options]
  tabbied list [--tag t] [--mood m] [--density d] [--good-for g] [--query text]
  tabbied info <slug>

Render options:
  --out <path>          Destination. Extension picks the format (.svg | .png);
                        with --frames, a directory for the sequence.
  --format <svg|png>    Output format, for an --out without that extension.
  --seed <string>       Fixed seed (default: random). Same seed = same image.
  --palette <colors>    Comma-separated CSS colors, background first.
  --options "<pairs>"   Option values, "id: value; id2: value2".
  --size <WxH>          Output size in px (default 960x960).
  --fit <mode>          grid | cover | fixed (default grid).
  --scale <n>           PNG device-scale factor (default 2).
  --frames <n>          Render a PNG sequence of n frames into --out/, named
                        frame-000.png on (more digits past frame 999).
  --reseed-every <n>    Frames between reseeds in a sequence (default 30).
  --browser <path>      Chromium executable (or set TABBIED_CHROMIUM).

Every flag also takes the form --flag=value, for a value that starts with --.

Rendering needs Playwright, looked up from the current directory first:
  npm i -D playwright && npx playwright install chromium
or, with nothing installed:
  npx -y -p tabbied -p playwright tabbied render <slug> --out <file>

The catalog behind list/info also ships as tabbied/catalog.json, and the full
agent-facing reference is https://tabbied.com/llms-full.txt.`;

// Continuation lines are indented, so a caller reading stderr (render_design
// in tabbied-mcp) can tell the whole message from whatever else is there.
function fail(message: string): never {
  console.error(`tabbied: ${message.replace(/\n/g, '\n  ')}`);
  process.exit(1);
}

// ---- catalog commands ------------------------------------------------------

type CatalogDesign = {
  slug: string;
  name: string;
  description?: string;
  tags: string[];
  mood: string[];
  density: string;
  goodFor: string[];
  preview: string;
  svgExport: { supported: boolean; note?: string };
};

function readCatalog(): { designs: CatalogDesign[] } {
  return JSON.parse(
    readFileSync(path.join(packageRoot, 'catalog.json'), 'utf-8')
  );
}

function runList(flags: Map<string, string>): void {
  const { designs } = readCatalog();
  const tag = flags.get('tag');
  const mood = flags.get('mood');
  const density = flags.get('density');
  const goodFor = flags.get('good-for');
  const query = flags.get('query')?.toLowerCase();

  // The filters are a closed vocabulary, so a value outside it is a typo, not
  // an empty result: name the values that exist instead of printing 0/N.
  const vocabulary: [string, string | undefined, string[]][] = [
    ['tag', tag, designs.flatMap((design) => design.tags)],
    ['mood', mood, designs.flatMap((design) => design.mood)],
    ['density', density, designs.map((design) => design.density)],
    ['good-for', goodFor, designs.flatMap((design) => design.goodFor)],
  ];
  for (const [flag, value, values] of vocabulary) {
    const known = [...new Set(values)].sort();
    if (value !== undefined && !known.includes(value)) {
      fail(`unknown --${flag} "${value}". Valid values:\n${known.join(', ')}`);
    }
  }

  const matches = designs.filter(
    (design) =>
      (!tag || design.tags.includes(tag)) &&
      (!mood || design.mood.includes(mood)) &&
      (!density || design.density === density) &&
      (!goodFor || design.goodFor.includes(goodFor)) &&
      (!query ||
        `${design.slug} ${design.name} ${design.description ?? ''}`
          .toLowerCase()
          .includes(query))
  );

  // Columns as wide as their longest entry, so a long slug cannot push the
  // rest of its row out of line.
  const slugWidth = Math.max(0, ...matches.map((design) => design.slug.length));
  const densityWidth = Math.max(0, ...matches.map((design) => design.density.length));

  for (const design of matches) {
    console.log(
      `${design.slug.padEnd(slugWidth)}  ${design.density.padEnd(densityWidth)}  [${design.tags.join(
        ', '
      )}] - ${design.name}`
    );
  }
  console.log(`\n${matches.length}/${designs.length} designs`);
}

function runInfo(slug: string): void {
  const design = readCatalog().designs.find((entry) => entry.slug === slug);
  if (!design) fail(`unknown design "${slug}" - try \`tabbied list\``);
  console.log(JSON.stringify(design, null, 2));
}

// ---- argument parsing ------------------------------------------------------

// `--name value` or `--name=value`. The second form is the only way to pass a
// value that itself starts with `--` (a seed of "--browser", say), which the
// first would read as a missing value followed by another flag.
function parseFlags(argv: string[]): Map<string, string> {
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) fail(`unexpected argument "${arg}"`);
    const equals = arg.indexOf('=');
    if (equals !== -1) {
      flags.set(arg.slice(2, equals), arg.slice(equals + 1));
      continue;
    }
    const name = arg.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      fail(`--${name} needs a value (write --${name}=<value> for one starting with --)`);
    }
    flags.set(name, next);
    i += 1;
  }
  return flags;
}

// Option values are typed by the definition (a numeric-looking select choice
// stays a string), mirroring the data-* attribute contract in hydrate.ts, and
// held to the ranges and choices the definition declares.
function parseOptions(
  definition: PatternDefinition,
  raw: string
): Record<string, OptionValue> {
  const values: Record<string, OptionValue> = {};
  for (const entry of raw.split(';')) {
    if (!entry.trim()) continue;
    const separator = entry.indexOf(':');
    if (separator === -1) fail(`--options entry "${entry.trim()}" needs "id: value"`);
    const id = entry.slice(0, separator).trim();
    const value = entry.slice(separator + 1).trim();
    const option = definition.options.find((candidate) => candidate.id === id);
    if (!option) {
      fail(
        `"${definition.slug}" has no option "${id}" (has: ${definition.options
          .map((candidate) => candidate.id)
          .join(', ') || 'none'})`
      );
    }
    if (option.type === 'Slider') {
      const numeric = Number(value);
      if (value === '' || !Number.isFinite(numeric)) fail(`option "${id}" needs a number`);
      if (
        (option.min !== undefined && numeric < option.min) ||
        (option.max !== undefined && numeric > option.max)
      ) {
        fail(`option "${id}" must be between ${option.min} and ${option.max}, got ${numeric}`);
      }
      values[id] = numeric;
    } else if (option.type === 'ToggleSwitch') {
      if (!['true', 'false', ''].includes(value)) fail(`option "${id}" must be true or false`);
      values[id] = value === 'true' || value === '';
    } else {
      // The grid is the one choice that is a shape rather than a name: the
      // grid and cover fits derive their own, and `fixed` draws any CxR.
      const isGrid = id === 'grid' && /^\d+x\d+$/.test(value);
      if (option.options && !option.options.includes(value) && !isGrid) {
        fail(`option "${id}" must be one of ${option.options.join(', ')}, got "${value}"`);
      }
      values[id] = value;
    }
  }
  return values;
}

// Whether each entry is a CSS color is the browser's call (see
// invalidColors), made once the page is up; this only catches an empty list.
function parsePalette(raw: string): string[] {
  const colors = splitTopLevel(raw, ',');
  if (colors.length === 0) fail('--palette needs at least one CSS color');
  return colors;
}

function parseRenderArgs(argv: string[]): RenderArgs {
  const slug = argv[0];
  if (!slug || slug.startsWith('--')) fail('usage: tabbied render <slug> --out <path>');
  if (!isPatternSlug(slug)) fail(`unknown design "${slug}" - try \`tabbied list\``);
  const definition = patterns[slug];

  const flags = parseFlags(argv.slice(1));
  const out = flags.get('out');
  if (!out) fail('--out is required');

  const size = flags.get('size') ?? '960x960';
  const sizeMatch = /^(\d+)x(\d+)$/.exec(size);
  if (!sizeMatch || Number(sizeMatch[1]) < 1 || Number(sizeMatch[2]) < 1) {
    fail(`--size must be WxH in whole px, at least 1x1, got "${size}"`);
  }

  const fit = flags.get('fit') ?? 'grid';
  if (!['grid', 'cover', 'fixed'].includes(fit)) fail(`--fit must be grid | cover | fixed`);

  const scale = Number(flags.get('scale') ?? 2);
  if (!(scale > 0 && scale <= 8)) fail(`--scale must be a number above 0 and at most 8`);

  const frames = Number(flags.get('frames') ?? 0);
  if (!Number.isInteger(frames) || frames < 0) fail(`--frames must be a whole number`);
  const reseedEvery = Number(flags.get('reseed-every') ?? 30);
  if (!Number.isInteger(reseedEvery) || reseedEvery < 1) {
    fail(`--reseed-every must be a whole number of frames, at least 1`);
  }
  const extension = path.extname(out).toLowerCase();
  let format = flags.get('format') as 'svg' | 'png' | undefined;
  if (format && format !== 'svg' && format !== 'png') fail(`--format must be svg | png`);
  if (!format) {
    if (frames > 0) format = 'png';
    else if (extension === '.svg') format = 'svg';
    else if (extension === '.png') format = 'png';
    else fail(`--out needs a .svg or .png extension (or pass --format)`);
  }
  if (format === 'svg' && frames > 0) fail('--frames renders PNG sequences only');

  return {
    slug,
    out,
    seed: flags.get('seed') ?? Math.random().toString(36).slice(2, 6),
    // Split at paren depth zero: the help promises comma-separated CSS
    // colors, and `rgb(0, 0, 0)` is one of them, not three fragments.
    palette: flags.has('palette') ? parsePalette(flags.get('palette')!) : null,
    options: flags.has('options')
      ? parseOptions(definition, flags.get('options')!)
      : {},
    width: Number(sizeMatch![1]),
    height: Number(sizeMatch![2]),
    fit: fit as RenderArgs['fit'],
    format,
    scale,
    frames,
    reseedEvery,
    browser: flags.get('browser') ?? process.env.TABBIED_CHROMIUM ?? null,
  };
}

// ---- rendering -------------------------------------------------------------

// The page needs the package's ESM by URL; a throwaway local server is the
// one approach that works everywhere (file:// module imports don't).
const MIME: Record<string, string> = {
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.html': 'text/html',
};

const PAGE = `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:#fff}#stage{overflow:hidden}</style>
<div id="stage"></div>
<script type="importmap">{"imports":{"css-doodle":"/css-doodle.js"}}</script>
<script type="module">
  import 'css-doodle';
  import { createPattern } from '/pkg/dist/core/index.js';
  window.__mount = (definition, config) => new Promise((ready) => {
    const stage = document.getElementById('stage');
    stage.style.width = config.width + 'px';
    stage.style.height = config.height + 'px';
    stage.style.background = (config.palette && config.palette[0]) || definition.palette?.[0] || '#fff';
    window.__controller = createPattern(stage, { ...config, pattern: definition, onReady: ready });
  });
  window.__redraw = (seed) => { window.__controller.redraw(seed); };
  window.__invalidColors = (colors) => colors.filter((color) => !CSS.supports('color', color));
  // The file is cut to the stage, so it shows what the PNG of the same
  // arguments shows. A grid canvas is oversized to whole tracks and the host
  // clips it, which exportSvg's clip undoes. A cover render is drawn at its
  // own resolution and scaled into the host, so its export is in render px:
  // the host's transform is put back around it, then cut to the stage.
  window.__exportSvg = async (width, height) => {
    const controller = window.__controller;
    const { a: scale, e: x, f: y } = new DOMMatrixReadOnly(
      getComputedStyle(controller.element).transform
    );
    if (scale === 1 && x === 0 && y === 0) {
      const { svg, warnings } = await controller.exportSvg({ clip: { width, height } });
      return { svg, warnings };
    }
    const { svg, warnings } = await controller.exportSvg();
    const open = /^<svg\\b[^>]*>/.exec(svg)[0];
    const body = svg.slice(open.length, svg.lastIndexOf('</svg>'));
    const attributes = open.slice(4, -1).replace(/\\s(?:viewBox|width|height)="[^"]*"/g, '');
    const matrix = [scale, 0, 0, scale, x, y].map((n) => +n.toFixed(6)).join(' ');
    return {
      svg:
        '<svg' + attributes + ' width="' + width + '" height="' + height +
        '" viewBox="0 0 ' + width + ' ' + height + '">' +
        '<clipPath id="tabbied-stage"><rect width="' + width + '" height="' + height + '"/></clipPath>' +
        '<g clip-path="url(#tabbied-stage)"><g transform="matrix(' + matrix + ')">' + body + '</g></g></svg>',
      warnings,
    };
  };
</script>`;

// Playwright is never a dependency of this package (it would put a browser
// download in every install), so it is looked up where the caller has it.
// The caller's project comes first: under `npx tabbied`, this file sits in
// npx's cache, and a bare import() resolves from here, so a Playwright the
// project installed was never found. Then this package's own location, which
// is what finds one installed beside it (`npx -p tabbied -p playwright`, or
// tabbied-mcp's render_design under `npx -p tabbied-mcp -p playwright`).
const PLAYWRIGHT_PACKAGES = ['playwright', 'playwright-core', '@playwright/test'];

async function loadChromium(): Promise<{ chromium: any }> {
  const bases = [path.join(process.cwd(), 'noop.js'), fileURLToPath(import.meta.url)];
  for (const base of bases) {
    for (const name of PLAYWRIGHT_PACKAGES) {
      let resolved: string;
      try {
        resolved = createRequire(base).resolve(name);
      } catch {
        continue; // not installed from here; try the next one
      }
      // require.resolve picks the CommonJS entry, whose exports may only be
      // reachable through `default` once imported as ESM.
      const loaded = await import(pathToFileURL(resolved).href);
      const chromium = loaded.chromium ?? loaded.default?.chromium;
      if (chromium) return { chromium };
    }
  }
  fail(
    `rendering needs Playwright, and none was found from ${process.cwd()} or beside tabbied.\n` +
      'In a project, install it there:\n' +
      '  npm i -D playwright && npx playwright install chromium\n' +
      'Or run the CLI with Playwright beside it, nothing installed:\n' +
      '  npx -y -p tabbied -p playwright tabbied render <slug> --out <file>\n' +
      'For the tabbied-mcp server, start it as:\n' +
      '  npx -y -p tabbied-mcp -p playwright tabbied-mcp\n' +
      'Playwright then needs a browser once: npx playwright install chromium\n' +
      '(or point --browser or TABBIED_CHROMIUM at a Chromium binary).'
  );
}

async function launchChromium(chromium: any, executablePath: string | null): Promise<any> {
  try {
    return await chromium.launch(executablePath ? { executablePath } : {});
  } catch (error) {
    // Playwright's own message is a boxed banner; its first line says enough.
    const reason = (error instanceof Error ? error.message : String(error)).split('\n')[0];
    fail(
      `could not start Chromium (${reason}).\n` +
        'Install the browser Playwright expects: npx playwright install chromium\n' +
        'or point --browser (or TABBIED_CHROMIUM) at a Chromium binary.'
    );
  }
}

async function runRender(args: RenderArgs): Promise<void> {
  const definition = patterns[args.slug as keyof typeof patterns];

  if (args.format === 'svg' && (definition as PatternDefinition).svgExport === false) {
    fail(
      `"${args.slug}" paints effects SVG cannot represent (svgExport: false) - render it as PNG instead`
    );
  }

  const cssDoodlePath = require.resolve('css-doodle');

  const server = createServer((request, response) => {
    const url = decodeURIComponent((request.url ?? '/').split('?')[0]);
    let file: string | null = null;
    if (url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(PAGE);
      return;
    }
    if (url === '/css-doodle.js') file = cssDoodlePath;
    else if (url.startsWith('/pkg/')) {
      // Inside the package by path, not by prefix: `/x/tabbied-other/...`
      // starts with `/x/tabbied` too.
      const candidate = path.join(packageRoot, url.slice('/pkg/'.length));
      const relative = path.relative(packageRoot, candidate);
      if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) file = candidate;
    }
    try {
      if (!file) throw new Error('not found');
      const body = readFileSync(file);
      response
        .writeHead(200, {
          'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream',
        })
        .end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;

  const { chromium } = await loadChromium();
  const browser = await launchChromium(chromium, args.browser);

  try {
    const context = await browser.newContext({
      viewport: { width: args.width, height: args.height },
      deviceScaleFactor: args.scale,
      // Sequences must cut between frames, not catch mid-transition blurs;
      // the controller mutes the authored transitions under reduced motion.
      reducedMotion: args.frames > 0 ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    page.on('pageerror', (error: Error) =>
      console.error(`  pageerror: ${error.message.split('\n')[0]}`)
    );
    await page.goto(`http://127.0.0.1:${port}/`);

    // An entry the browser cannot parse as a color is dropped by CSS without
    // a word, and the render comes out blank, so it is refused here instead.
    // Thrown rather than failed, so the browser still closes.
    if (args.palette) {
      const invalid: string[] = await page.evaluate(
        (colors: string[]) => (window as any).__invalidColors(colors),
        args.palette
      );
      if (invalid.length > 0) {
        throw new Error(
          `--palette: ${invalid.map((color) => `"${color}"`).join(', ')} ` +
            `${invalid.length === 1 ? 'is not a CSS color' : 'are not CSS colors'} ` +
            '(use hex, rgb(), hsl(), oklch() or a color name)'
        );
      }
    }

    const config = {
      seed: args.seed,
      fit: args.fit,
      width: args.width,
      height: args.height,
      ...(args.palette ? { palette: args.palette } : {}),
      ...(Object.keys(args.options).length ? { options: args.options } : {}),
    };
    await page.evaluate(
      ([def, cfg]: [unknown, unknown]) =>
        (window as any).__mount(def, cfg),
      [definition, config] as [unknown, unknown]
    );
    await page.waitForTimeout(600); // let the first arrangement settle

    if (args.frames > 0) {
      mkdirSync(args.out, { recursive: true });
      // Three digits at least, so ffmpeg's `frame-%03d.png` reads any sequence
      // under a thousand frames; a longer one takes as many as its last index.
      const pad = Math.max(3, String(args.frames - 1).length);
      for (let frame = 0; frame < args.frames; frame += 1) {
        if (frame > 0 && frame % args.reseedEvery === 0) {
          const generation = frame / args.reseedEvery;
          await page.evaluate(
            (seed: string) => (window as any).__redraw(seed),
            `${args.seed}-${generation}`
          );
          await page.waitForTimeout(60);
        }
        const name = `frame-${String(frame).padStart(pad, '0')}.png`;
        await page
          .locator('#stage')
          .screenshot({ path: path.join(args.out, name) });
      }
      console.log(
        `rendered ${args.frames} frames of ${args.slug} into ${args.out.replace(/[\\/]+$/, '')}/ ` +
          `(reseed every ${args.reseedEvery})`
      );
    } else if (args.format === 'png') {
      mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
      await page.locator('#stage').screenshot({ path: args.out });
      console.log(
        `rendered ${args.slug} -> ${args.out} (${args.width}x${args.height} @${args.scale}x, seed ${args.seed})`
      );
    } else {
      const { svg, warnings } = await page.evaluate(
        ([width, height]: [number, number]) => (window as any).__exportSvg(width, height),
        [args.width, args.height] as [number, number]
      );
      mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
      writeFileSync(args.out, svg);
      for (const warning of warnings ?? []) console.warn(`  note: ${warning}`);
      console.log(
        `exported ${args.slug} -> ${args.out} (${args.width}x${args.height}, seed ${args.seed})`
      );
    }
  } finally {
    await browser.close();
    server.close();
  }
}

// ---- entry -----------------------------------------------------------------

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);

  if (!command || command === '--help' || command === 'help') {
    console.log(HELP);
    return;
  }
  if (command === 'list') {
    runList(parseFlags(rest));
    return;
  }
  if (command === 'info') {
    if (!rest[0]) fail('usage: tabbied info <slug>');
    runInfo(rest[0]);
    return;
  }
  if (command === 'render') {
    await runRender(parseRenderArgs(rest));
    return;
  }
  fail(`unknown command "${command}" - try \`tabbied --help\``);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
