# The Tabbied showcase video

A ~49 second, 1080p30 product video, authored in [Remotion](https://www.remotion.dev)
(React). The patterns in it are live Tabbied designs rendered by the package,
not recordings; the product scenes are screenshots of the real site.

```bash
# once, at the repo root: the package the video renders patterns with
npm ci && npm run build --workspace tabbied

# here
npm ci
npm run studio                 # scrub the timeline in a browser
npm run render                 # out/tabbied-showcase.mp4
```

Rendering needs a Chromium. Remotion downloads its own headless shell unless
`TABBIED_CHROMIUM` points at one already installed (the variable the
`tabbied` CLI reads too). A render of the whole video takes a few minutes on
four cores; `--concurrency=N` sets how many browser tabs share it.

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
it is brought to that frame's state first; that is what lets a parallel
render match a sequential one. Rendered both ways, the wall scene's nine
fields came out identical in 99 frames of 100; the other differed by 49
anti-aliased pixels on a tile that was mid-scale, not in any field's state.

Not every design's transition covers its whole change: some animate only a
size or an angle and cut the colors, and some paint with gradients, which CSS
cannot interpolate. That is how they behave on the site too, but in a video
it reads as a flicker, so the scenes use designs that morph through, and the
recolor scene dissolves between two fields instead of relying on the design.

## Licensing

Remotion is free for individuals and for companies with up to three
employees; beyond that it needs a company license
(<https://www.remotion.dev/license>).

## Not in it yet

No music or voiceover. Remotion takes an `<Audio>` track per scene or for the
whole composition when there is one to use.
