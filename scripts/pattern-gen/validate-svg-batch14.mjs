// SVG-export gate for batch 14: every design must export as native SVG with
// *no* caveat (no `svgExport: false`, no `svgExportNote`, no converter
// warning) and with pixel parity to the live render. The harness is
// svg-sweep.mjs, run over the written pattern files.
//
// Usage:
//   npm run build --workspace tabbied     # the sweep injects dist/
//   node scripts/pattern-gen/validate-svg-batch14.mjs
//   SLUGS=a,b node scripts/pattern-gen/validate-svg-batch14.mjs
//
// Env: SLUGS, CHROMIUM_PATH, SVG_SEEDS, SVG_GRID, SVG_CELL, SVG_ARTIFACTS
// (see svg-sweep.mjs).
import { batch14 } from './pattern-defs-14.mjs';
import { runSvgSweep } from './svg-sweep.mjs';

await runSvgSweep({
  defs: batch14,
  label: 'batch-14',
  artifactsPrefix: 'tabbied-svg-b14',
});
