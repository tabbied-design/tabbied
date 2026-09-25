// Rendering gate for batch 13: every design paints, keeps its cells across a
// reseed (so transitions animate), re-inks on that reseed, renders identically
// on a transparent background, and logs no console errors. The harness is
// render-sweep.mjs; validate-svg-batch13.mjs is the export half of the gate.
//
// The transparent-background pass matters here: this batch cuts every void
// with a mask or a clip, and a void is only a real hole if nothing behind it
// is painted in the background color. Contact sheets land in
// /tmp/sheet-b13-*.png, the transparent pass over a checkerboard.
// Set CHROMIUM_PATH to use a browser other than Playwright's own download, and
// ONLY=slug,slug to narrow the run while authoring.
import { batch13 } from './pattern-defs-13.mjs';
import { runRenderSweep } from './render-sweep.mjs';

await runRenderSweep({ defs: batch13, label: 'b13' });
