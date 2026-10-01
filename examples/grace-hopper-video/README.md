# Grace Hopper, in 51 seconds

A short explainer about Grace Hopper, drawn with [Tabbied](https://tabbied.com)
patterns and rendered with [Remotion](https://www.remotion.dev). It exists to
show what Tabbied does in a video pipeline: every pattern on screen is a
`<TabbiedPattern>` whose seed, palette and density are functions of the frame
number, so the whole film is code and renders the same way every time.

- 1920x1080, 30 fps, 1,541 frames (51.4 s)
- 25 Tabbied designs across 21 palettes from the Tabbied palette library
- 8 cut-out pictures generated with `gpt-image-2.5-flare` at `quality: "low"`
  on a transparent background, each tinted into the palette of its scene

## Running it

This folder is a standalone project (it is not one of the repo's npm
workspaces, so the site's install never pulls Remotion). It uses `tabbied` from
npm, the same way any app would.

```bash
cd examples/grace-hopper-video
npm install
npm run studio     # scrub through it in Remotion Studio
npm run render     # writes out/grace-hopper.mp4
```

Remotion downloads its own headless Chrome on first use. Where that download
is blocked, point it at any Chromium you have:

```bash
npm run render -- --browser-executable=/path/to/chrome-headless-shell
```

A single frame, for checking a layout: `npm run still -- out/frame.png --frame=420`.

## The scenes

| Scene | Design | Palette | Picture | Transition in |
| --- | --- | --- | --- | --- |
| Title | `maze` (also inside the letters of HOPPER) | Toucan | portrait | - |
| 1906, the alarm clocks | `gyre` | Gaslight | alarm clock | clock wipe |
| 1944, the Harvard Mark I | `circuit` | Blueprint | the Mark I | wipe |
| 1947, the moth | `midnightblossoms` | Nocturne | taped moth | slide |
| 1952, the A-0 compiler | `hilbert`, density stepping 0.15 to 0.9 | Risograph | tape reel | wipe |
| 1959, COBOL | `gravure` | Formica | punched cards | slide |
| The nanosecond | `dipole` | Hot Wire | the 11.8 in wire | iris |
| 1986 and 2016 | `northstar` | Deco | medal | wipe |
| "We've always done it this way" | `halftone` | Letterpress | portrait | slide |
| Montage | 16 designs, each cycling 12 palettes | Bauhaus, Neon, Sunset, ... | - | clock wipe |

The chip in the corner of each scene prints the props of the pattern behind
it, seed included, as it changes.

## How a pattern is made safe to film

A Tabbied pattern is a live `<css-doodle>` element, made for a web page. Three
things keep it deterministic under Remotion, which photographs each frame in
several browser tabs at once and in any order:

1. **The seed is a function of the frame.** `beatSeed('1906', frame, 15)`
   returns `1906-0` for frames 0 to 14, `1906-1` for 15 to 29, and so on: a
   stop-motion reseed. `redrawInterval` is never used, because it is a clock.
2. **Transitions are muted** (`src/motion.ts`). Every design carries a ~400ms
   CSS transition so a reseed morphs on a page; a video would catch it at a
   different point in each render. Tabbied mutes all of it under
   `prefers-reduced-motion: reduce`, and Remotion's Chromium cannot emulate
   that media feature, so the composition answers that one query itself.
3. **Each frame waits for its pattern** (`src/components/Pattern.tsx`). The
   wrapper holds the frame with `delayRender()` until the first draw
   (`onReady`) and again whenever a frame changes the seed, palette, options or
   density. A pattern's box is never resized during a shot (a resize
   re-derives the grid on a debounce); scenes move, scale and clip boxes with
   transforms and `clip-path` instead.

## The pictures

`scripts/images.json` holds the prompts; `npm run images` sends them to the
OpenAI Images API (`OPENAI_API_KEY`) and writes `public/images/<id>.webp`:

```json
{ "model": "gpt-image-2.5-flare", "quality": "low", "background": "transparent" }
```

They are drawn in black and white on purpose. `src/components/Tinted.tsx` maps
each pixel's lightness along two or three colors of the scene's palette with
an SVG filter, leaving the alpha alone, so one file serves every palette (the
same portrait opens the film in Toucan blues and closes it in Letterpress
reds). The script refuses a "cut-out" with no transparent pixels, keeps the
raw PNGs in `generated/` (gitignored) so promoting again costs nothing, and
takes `--only <id>` and `--force` to redo one.

## Notes

- Fonts (Space Grotesk, IBM Plex Mono, Instrument Serif) are bundled from
  `@fontsource`, so a render needs no network.
- Remotion is free for individuals and small companies; larger companies need
  a [company license](https://www.remotion.dev/license).
- The likeness in the portrait is an illustration generated from a
  description, not a photograph.
