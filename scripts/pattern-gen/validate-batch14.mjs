// Rendering gate for batch 14: every design paints every cell with the gate
// wide open, keeps its cells across a reseed (so transitions animate),
// re-inks on that reseed, renders identically on a transparent background,
// and logs no console errors. The harness is render-sweep.mjs, run over the
// written pattern files; validate-svg-batch14.mjs is the export half.
// Contact sheets land in /tmp/sheet-b14-*.png.
//
// Set CHROMIUM_PATH to use a browser other than Playwright's own download,
// and ONLY=slug,slug to narrow the run. While a family is being authored,
// check-batch14.mjs runs the same gate from the definitions in memory.
import { batch14 } from './pattern-defs-14.mjs';
import { runRenderSweep } from './render-sweep.mjs';

await runRenderSweep({ defs: batch14, label: 'b14' });
