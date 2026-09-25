#!/usr/bin/env node
// The pattern runtime Studio's preview shell loads, bundled and same-origin.
//
// Studio previews the packaged download with an edits document applied. Its
// bootstrap imports tabbied from esm.sh, pinned, which is right for a stranger
// who unzipped it and wrong for this site, so the preview shell rewrites that
// script tag to import this file. It has to be a *bundle*:
// `tabbied/dist/core/register.js` does a bare `import 'css-doodle'`, which no
// browser resolves.
//
// The bundle carries the whole catalog, because "Shuffle patterns" can swap a
// field to any design and a missing one hydrates to a blank. The packaged HTML
// is still read, to check the packager wrote something this runtime can draw.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(repoRoot, 'public', 'studio', 'preview-runtime.js');

// The packager writes into public/downloads during a build and into
// out/downloads when re-run by hand. Read the build's first.
const downloadsDir = [
  path.join(repoRoot, 'public', 'downloads'),
  path.join(repoRoot, 'out', 'downloads'),
].find((candidate) => existsSync(candidate));

if (!downloadsDir) {
  console.error(
    'build-preview-runtime: no downloads folder - run `npm run templates` first.'
  );
  process.exit(1);
}

/** Every design any packaged template mounts, read out of the markup. */
function usedPatterns() {
  const slugs = new Set();

  for (const entry of readdirSync(downloadsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const file = path.join(downloadsDir, entry.name, 'index.html');

    if (!existsSync(file) || !statSync(file).isFile()) continue;

    // The packager's own pattern: a slug is lower-case alphanumerics.
    for (const match of readFileSync(file, 'utf-8').matchAll(
      /data-pattern="([a-z0-9]+)"/g
    )) {
      slugs.add(match[1]);
    }
  }

  return [...slugs].sort();
}

/** The whole catalog, by slug - what a field may be swapped to. */
function catalogPatterns() {
  const catalogPath = path.join(repoRoot, 'packages', 'tabbied', 'catalog.json');

  if (!existsSync(catalogPath)) {
    console.error(
      'build-preview-runtime: packages/tabbied/catalog.json is missing - run `npm run build:packages`.'
    );
    process.exit(1);
  }

  return JSON.parse(readFileSync(catalogPath, 'utf-8'))
    .designs.map((design) => design.slug)
    .sort();
}

const used = usedPatterns();

if (used.length === 0) {
  console.error(
    'build-preview-runtime: no [data-pattern] in public/downloads - the packager wrote nothing usable.'
  );
  process.exit(1);
}

const patterns = catalogPatterns();
const missing = used.filter((slug) => !patterns.includes(slug));

if (missing.length > 0) {
  console.error(
    `build-preview-runtime: the packaged templates mount ${missing.join(', ')}, which the catalog does not have.`
  );
  process.exit(1);
}

// The whole record rather than a named list: every design is wanted, and the
// generated module's `patterns` export is the one place they are all named.
const entry = [
  "import { hydratePatterns } from 'tabbied';",
  "import { patterns } from 'tabbied/patterns';",
  '',
  'export { hydratePatterns, patterns };',
  '',
  '// The shell calls this; keeping the call here means the injected script tag',
  '// is one line and carries no pattern names of its own.',
  'let mounted = [];',
  'export const hydrate = (options = {}) => (mounted = hydratePatterns({ patterns, ...options }));',
  '',
  '// The editor rewrites data-* on a pattern host and needs it drawn again.',
  '// hydratePatterns skips an element it already mounted, so this tears the',
  '// controllers down first - the same teardown/re-hydrate cycle the README',
  '// documents - and mounts from the attributes as they now are.',
  'export const rehydrate = () => {',
  '  for (const { controller } of mounted) controller.destroy();',
  '  return hydrate();',
  '};',
  '',
  '// Which designs this runtime can draw, for a shell that wants to check',
  '// before it writes a slug into the page.',
  'export const designs = Object.keys(patterns);',
  '',
].join('\n');

mkdirSync(path.dirname(outFile), { recursive: true });

const result = await build({
  stdin: { contents: entry, resolveDir: repoRoot, loader: 'js' },
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  legalComments: 'none',
  outfile: outFile,
  metafile: true,
});

const bytes = statSync(outFile).size;

console.log(
  `preview-runtime: ${patterns.length} pattern(s) (${used.length} mounted by a template), ${(bytes / 1024).toFixed(0)} KB` +
    (result.warnings.length ? ` - ${result.warnings.length} warning(s)` : '')
);
