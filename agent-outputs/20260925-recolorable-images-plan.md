# Images that follow the palette - plan - 2026-09-25

A planning note, not an implementation. The question: how do we make
template imagery whose color changes with the site's palette, the way the
Tabbied patterns already do, so a customizer re-color (or an agent's edits
document) moves the pictures along with the page?

Everything below was read off the code at commit `3421294` (main).

---

## 1. The constraint that decides the design

A re-color today is **inline custom properties and nothing else**. On a
bespoke page `applyEdits` writes `--paper`, `--ink`, ... onto the root
(`data-edit-root="vars"`), the stylesheet reads `var(--...)`, and a pattern
field follows through its `data-edit-roles` map. The engine never sets a
class, never swaps a file, and `trimUnusedRules` ships a stylesheet cut to
the classes already in the markup.

So the rule for a recolorable image is: **its color must be a pure function
of the palette custom properties, resolved by the browser.** If it is, it
re-colors in the customizer, in the Studio preview, in the HTML download and
in the React download with no change to the engine at all. Anything that
needs a script to repaint the image, or a different file per palette, breaks
that and should be rejected.

That rules out the obvious-looking tool, too:

- `filter: hue-rotate() saturate()` cannot hit a target color. It rotates
  every hue in the image by the same angle, so it can take the accent to
  "roughly teal" while taking the bread with it, and the angle has to be
  computed from the old and new palette in JS (CSS cannot turn `var(--accent)`
  into an angle). It is a tint, not a re-color. Keep it out.

## 2. Four techniques, by kind of image

Each one takes its color from `var(--role)` and needs nothing but CSS.

### 2a. One-ink artwork as a mask (line art, stamps, icons, engravings)

The file carries only shape, in its alpha channel; the color is a CSS
background painted through it:

```css
.art {
  aspect-ratio: 1;
  background: var(--accent);
  -webkit-mask: var(--art) center / contain no-repeat;
  mask: var(--art) center / contain no-repeat;
}
```

```tsx
<span className={s.art} style={{ '--art': 'url(/images/sites/x-mono.webp?v=...)' }} role="img" aria-label="..." />
```

Exact palette match, any role, one file. Two or three inks is two or three
masks stacked. `rewriteImagePaths` in `scripts/package-templates.mjs` already
rewrites any `/images/...webp` it finds in the HTML, inline `url()`s
included, so the HTML package works as is; the React package keeps the
authored URL, which is already how it copies images.

Generation: ask GPT Image for black ink on white (opaque), not for
transparency - thin lines survive a luminance key far better than a
model-made alpha. Promotion derives the alpha from luminance
(`alpha = 1 - L`, with a levels step to clean paper tone and JPEG noise) and
writes a white-on-transparent WebP.

### 2b. Flat illustration as color separations (the best fit for Tabbied)

A flat illustration is a few inks. Generate it in a **key palette** of
widely separated hues (pure red, green, blue, black on white), then split it
at promotion into one alpha layer per key, and paint each layer with a role:

```json
{ "id": "osteria-lume-still-life", "recolor": "layers",
  "keys": { "#FF0000": 2, "#0000FF": 5, "#000000": 1 } }
```

Two ways to ship the layers:

- **Vectorized to inline SVG** (recommended): trace each layer (potrace,
  which has a pure-JS port) into `<path>`s and emit one `<g
  style="fill: var(--accent)">` per role. Crisp at any size, a few KB, no
  request, and exactly the role-map model the patterns already use: an image
  becomes one more thing that reads `--ink` and `--accent`.
- **Raster masks** (the fallback when a trace loses too much): one
  `-mask.webp` per layer, stacked as in 2a.

This is the technique that makes an image look like it belongs to the
pattern next to it, because both are flat fields in the same four inks. It
is also the one that needs the most care at generation time (section 4).

### 2c. Photographs as a duotone

A photograph cannot be separated, but it can be mapped: shadows to one role,
highlights to another. Pure CSS, the classic two-blend duotone:

```css
.duo { position: relative; background: var(--pale); isolation: isolate; }
.duo img { filter: grayscale(1) contrast(1.1); mix-blend-mode: multiply; }
.duo::after { content: ''; position: absolute; inset: 0;
              background: var(--ink); mix-blend-mode: lighten; }
```

Dark areas take `--ink`, light areas take `--pale`, everything between is a
blend of the two. An SVG `<filter>` with `feFlood flood-color: var(--ink)`
is the more exact alternative (CSS can set `flood-color`, so it follows the
vars), at the cost of an inline `<defs>` per page.

Two cautions. Pick the two roles from a pair the palette already keeps
readable (ink over paper); a light-on-light pair turns the photo to fog.
And a duotone is a mood, not a picture of the thing: it suits portraits,
interiors, landscapes, textures, and it is wrong for food and products
whose real color is the point. The seven cut-outs in the 2026-09-25 batch
(a loaf, a croissant, a flat white, a bouquet, a pint, a teapot, a violin)
should stay as they are.

### 2d. A cut-out filled with the pattern

The cut-outs we already generate have a real alpha channel. Use that alpha
as a mask over a Tabbied pattern field, and the object becomes "made of" the
pattern; add the photo's own luminance back on top with
`mix-blend-mode: multiply` and it keeps its form and shading while wearing
the palette. It re-colors because the pattern does, and it is the most
Tabbied-looking of the four. Cost: a pattern mount per image (count it with
`scripts/gallery-cost.mjs`), and the pattern's data-edit slot sits on the
wrapper, so the image and its field re-color together.

## 3. Where it plugs in

Keep the image pipeline's shape (`docs/image-pipeline.md`): per-image
behavior is a property of the prompt, and it drives every step after it.

1. **`data/image-prompts.json`** gains `recolor: "none" | "mono" | "layers" |
   "duotone"` (default `"none"`, so nothing that exists changes) and, for
   `layers`, the key-to-role map.
2. **`scripts/promote-images.mjs`** does the derivation: luminance key for
   `mono`, separation (and optionally tracing) for `layers`, a grayscale
   WebP for `duotone`. It fails loudly the way the alpha check does: a
   `layers` image whose separation leaves more than a few percent of pixels
   unassigned is a bad generation, not something to ship.
3. **`lib/generated/images.js`** records `recolor` and the layer list, so
   the component knows what it is rendering.
4. **A component beside `Figure`** (`Artwork`, say) renders the right markup
   for each kind and takes `roles` (`roles={[1, 2]}`), writing them as
   inline custom properties (`--art-1: var(--ink)`). Inline custom
   properties are exactly what the engine is allowed to write, so an edits
   document can later reassign an image's roles without a new mechanism.
5. **The editable spec** gets the roles: the annotator emits
   `data-edit-image-roles="1,2"` the way it emits `data-edit-roles` on a
   pattern, the generator carries it into `public/editable/<slug>.json`,
   and the customizer can say "this picture follows Ink and Accent".
6. **The packager** needs to learn the new files: the separations or masks
   ride along with the image they belong to, and `e2e/templates.spec.ts`
   asserts the React package serves every mask URL, as it does for images.
7. **A gate**, because this fails silently like everything else here: an
   e2e that re-colors a page through `applyEdits` and samples pixels inside
   each recolorable image, asserting they moved toward the new role colors.
   An image that ignores the palette looks fine until someone re-colors it.

## 4. Getting images the separation can use

GPT Image does not obey a palette exactly, so the prompt has to make the
separation easy, and promotion has to clean up after it:

- One subject, flat color regions, no gradients, no texture, no shadows,
  no outlines in a fifth color. "Flat vector-style illustration, solid fills
  only" does most of the work.
- Key colors as far apart as possible (pure primaries plus black on white).
  Classify each pixel to the nearest key in Lab, split anti-aliased edge
  pixels between their two nearest keys so edges stay smooth, and merge
  islands under a few pixels into their neighbor.
- For `mono`, black on white at `quality: "low"` is enough; the trace is
  what makes it crisp.
- Generate a few candidates per image and keep the one that separates
  cleanest; at low quality on gpt-image-2.5-flare that is fractions of a
  cent each.

## 5. Suggested order

1. **Spike on one template** (a day or two): one `mono` mark, one `layers`
   illustration traced to SVG, one `duotone` photo and one pattern-filled
   cut-out, re-colored through the customizer, the HTML download and the
   React download, checked in Safari and on a phone.
2. **Pipeline**: the `recolor` field, promotion, manifest and component
   (section 3, steps 1-4), plus the pixel gate.
3. **Spec and customizer**: roles in the editable spec, and a line in the
   rail saying which pictures follow the palette.
4. **Templates designed for it**: a batch whose imagery is `layers`
   illustrations from the start, the art and the patterns authored in the
   same four inks.

## 6. Decisions for the owner

- **Which technique leads.** Recommended: `layers` traced to SVG for
  illustration, `duotone` for photography, pattern-filled cut-outs as the
  signature move, and `none` for food and products.
- **Whether a person may reassign an image's roles** in the customizer, or
  only follow the page's palette. Following is free; reassigning needs the
  spec and rail work in step 3.
- **Whether to back-fill** the existing templates' photography with
  duotone versions, or keep recolorable imagery for new templates only.
