# The Tabbied showcase videos

Two 1080p30 product videos, authored in [Remotion](https://www.remotion.dev)
(React), telling the same story two ways:

- **Showcase** (`src/Showcase.tsx`, ~22s): the product itself, with the pattern
  library, the editor, the template gallery and a site in a browser window.
- **Motion** (`src/motion/`, ~21s): motion graphics, told in type and shapes
  (see "The motion cut" below).

The patterns in both are live Tabbied designs rendered by the package, not
recordings; the product scenes are screenshots of the real site.

```bash
# once, at the repo root: the package the video renders patterns with
npm ci && npm run build --workspace tabbied

# here
npm ci
npm run studio                 # scrub either timeline in a browser
npm run render                 # out/tabbied-showcase.mp4
npm run render:motion          # out/tabbied-motion.mp4
```

Rendering needs a Chromium. Remotion downloads its own headless shell unless
`TABBIED_CHROMIUM` points at one already installed (the variable the
`tabbied` CLI reads too). Each video takes about a minute to render on four
cores; `--concurrency=N` sets how many browser tabs share it.

## Why it is its own package

`video/` is not an npm workspace: Remotion and its bundled ffmpeg are about
260 packages the site never needs, so they stay out of the root install and
out of every deploy's `npm ci`. It is excluded from the site's tsconfig for
the same reason `worker/` is, and CI typechecks it in its own job. It takes
`tabbied` from `../packages/tabbied` through a `file:` dependency, so it
always renders the designs this checkout has.

## Where everything comes from

Nothing in the video is typed in by hand if the repo already knows it.

- **Counts, palettes, template list**: `scripts/prepare.mjs`, run before every
  render and studio session, reads the same sources `lib/siteCounts.ts` does
  (the package catalog, `lib/paletteLibrary.ts`, `lib/templateOrder.ts`) and
  copies the gallery's committed screenshots from `public/template-shots/`.
  Its output is gitignored.
- **Product screenshots** (`public/ui/`) are committed, so a render needs no
  running site. `npm run capture` retakes them from `npm run dev` at the repo
  root; do that after changing a page it shoots. It also writes
  `capture.json`: the shots' sizes, and where the editor's palette rows were,
  which is where the pointer in the editor scene clicks.
- **The code sample** is colored by the docs page's own tokenizer
  (`components/react-docs-page/highlight.ts`).

## Live patterns, frame by frame

On the site a pattern moves by reseeding, and each design's own CSS
transition (~400ms) morphs one arrangement into the next on the browser's
clock. Remotion renders a frame by jumping to it, often in several tabs at
once and out of order, so a running transition would be caught at a random
point. `PatternField` never lets one run: it pauses every animation a change
starts and sets `currentTime` from the frame number, which keeps the
design's easing and stretches it to the morph length a scene asks for.

Each frame is rendered from the frame number alone. Whatever the field shows,
it is brought to that frame's state first, and outside a morph it is muted,
so nothing it does on its own clock can reach a frame. The trap that made the
mute necessary: Remotion moves the composition into its canvas after
rendering it, every `<css-doodle>` reconnects, and css-doodle reloads on a
timer that, under load, fires after the field is ready; the rebuilt cells
then animated in. `PatternField.tsx` has the details. With it, both videos
render byte-identical with `--concurrency=1` and `--concurrency=4`.

Not every design's transition covers its whole change: some animate only a
size or an angle and cut the colors, and some paint with gradients, which CSS
cannot interpolate. That is how they behave on the site too, but in a video
it reads as a flicker, so the scenes use designs that morph through, and the
recolor scene dissolves between two fields instead of relying on the design.

## The motion cut

Seven beats, each in its own file under `src/motion/`, laid end to end in
`Motion.tsx`: a field opening cell by cell under "Generative patterns.", the
count of designs cut out of the ground so a field shows through the digits,
three recolors, four densities side by side, the template screenshots on a
tilted board, the install line, and the lockup. Each beat hands over with a
cut of its own rather than a cross-fade, from the pieces in `kit.tsx`:

- **A grid wipe**, square cells growing corner to corner until the frame is
  ground, or shrinking to reveal it: the pattern engine's own grid as the cut.
- **A zoom through the 8** of "338" until the field fills the frame. The
  palette beat opens on the same design, seed and palette, so the hand-over
  is invisible.
- **Bar wipes** in the incoming palette's colors; the field underneath is
  swapped while they cover it.
- **A circle** opening onto the lockup. It is a radial-gradient mask, not a
  `clip-path`: a clip-path circle's anti-aliased edge came out a few pixels
  different from one browser tab to the next, which is enough to break a
  byte-identical render.

Type sits on solid blocks of the ground color (`Tag`), never on a gradient
over the pattern. Which design and palette each beat uses is `MOTION` in
`scripts/prepare.mjs`, all calm library palettes, checked against the
catalog and the library on every render.

## Licensing

Remotion is free for individuals and for companies with up to three
employees; beyond that it needs a company license
(<https://www.remotion.dev/license>).

## Not in it yet

No music or voiceover. Remotion takes an `<Audio>` track per scene or for the
whole composition when there is one to use.
