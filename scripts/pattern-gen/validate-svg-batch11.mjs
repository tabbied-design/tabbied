// SVG-export gate for batch 11: every design must export as native SVG with
// *no* caveat (no `svgExport: false`, no `svgExportNote`, no converter
// warning) and with pixel parity to the live render. The lints in
// generate-batch11.mjs only reject CSS known to be unsafe; this runs the
// shipped converter over every rendered design and is the real gate. The
// harness is svg-sweep.mjs.
//
// Usage:
//   npm run build --workspace tabbied     # the sweep injects dist/
//   node scripts/pattern-gen/validate-svg-batch11.mjs
//   SLUGS=ridgeline,swapcut node scripts/pattern-gen/validate-svg-batch11.mjs
//
// Env: SLUGS (comma-separated slugs; defaults to the whole batch),
//      CHROMIUM_PATH, SVG_SEEDS (comma-separated, default two),
//      SVG_ARTIFACTS (dir for failure artifacts: out.svg / mine.png / ref.png).
import { batch11 } from './pattern-defs-11.mjs';
import { runSvgSweep } from './svg-sweep.mjs';

await runSvgSweep({
  defs: batch11,
  label: 'batch-11',
  artifactsPrefix: 'tabbied-svg-b11',
});
