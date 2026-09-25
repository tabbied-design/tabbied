// Rendering gate for batch 12: every design paints, keeps its cells across a
// reseed (so transitions animate), re-inks on that reseed, renders identically
// on a transparent background, and logs no console errors. The harness is
// render-sweep.mjs; validate-svg-batch12.mjs is the export half of the gate.
//
// The transparent-background pass matters most here: much of batch 12 fades
// its ink out with a mask, and a masked fade is only a real hole if nothing
// behind it is painted in the background color. Contact sheets land in
// /tmp/sheet-b12-*.png, the transparent pass over a checkerboard.
// Set CHROMIUM_PATH to use a browser other than Playwright's own download, and
// ONLY=slug,slug to narrow the run while authoring.
import { batch12 } from './pattern-defs-12.mjs';
import { runRenderSweep } from './render-sweep.mjs';

await runRenderSweep({ defs: batch12, label: 'b12' });
