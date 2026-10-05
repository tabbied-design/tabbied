// Builds dist/element/tabbied-element.js: <tabbied-pattern> with css-doodle
// bundled in, for a page that loads it with one script tag from a CDN or a
// copy of the package.
//
// dist/element/index.js (tsc's output, and what `tabbied/element` resolves to
// in a bundler) keeps a bare `import 'css-doodle'`, which no browser resolves
// on its own; this file has none. Two things it depends on:
//
// - It sits in dist/element/, beside index.js, so the element's
//   `../patterns/` still names dist/patterns/: a slug loads from the same
//   folder whichever of the two files the page used.
// - Splitting is on, so the SVG converter (about 12 KB gzipped) stays a chunk of
//   its own that exportSvg() fetches when it is called, as it is in the
//   package, instead of riding in every page that only draws.
import { build } from 'esbuild';
import { rm, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outdir = path.join(packageRoot, 'dist', 'element');

// Chunks from an earlier run carry other hashes; clear them so the published
// folder holds only what this build references.
for (const file of await readdir(outdir)) {
  if (file.startsWith('chunk-')) await rm(path.join(outdir, file));
}

const result = await build({
  entryPoints: { 'tabbied-element': path.join(outdir, 'index.js') },
  outdir,
  bundle: true,
  splitting: true,
  format: 'esm',
  target: 'es2020',
  minify: true,
  chunkNames: 'chunk-[hash]',
  legalComments: 'eof',
  metafile: true,
  logLevel: 'warning',
});

for (const [file, { bytes }] of Object.entries(result.metafile.outputs)) {
  console.log(`bundle-element: ${path.relative(packageRoot, file)} ${(bytes / 1024).toFixed(1)} KB`);
}
