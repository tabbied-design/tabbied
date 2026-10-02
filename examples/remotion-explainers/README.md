# Explainer films, drawn with Tabbied

Two short explainers drawn with [Tabbied](https://tabbied.com) patterns and
rendered with [Remotion](https://www.remotion.dev). They exist to show what
Tabbied does in a video pipeline: every pattern on screen is a
`<TabbiedPattern>` whose seed, palette and density are functions of the frame
number, so a film is code and renders the same way every time.

| Composition | Film | Length | Designs | Palettes | Pictures |
| --- | --- | --- | --- | --- | --- |
| `GraceHopper` | Grace Hopper, from the alarm clocks to COBOL | 59.4 s (1,781 frames) | 25 | 21 | 8 |
| `CreditCards` | Who pays for 1.5% cash back, and who keeps the profit | 108.3 s (3,249 frames) | 31 | 23 | 13 |

Both are 1920x1080 at 30 fps. Every palette is taken from the Tabbied palette
library, and every picture was generated with `gpt-image-2.5-flare` at
`quality: "low"` on a transparent background. Narration and music come from
ElevenLabs (Eleven v4 and Eleven Music) and are laid on afterwards; see
[Sound](#sound).

## Running them

This folder is a standalone project (it is not one of the repo's npm
workspaces, so the site's install never pulls Remotion). It uses `tabbied` from
npm, the same way any app would.

```bash
cd examples/remotion-explainers
npm install
npm run studio                 # scrub through either film in Remotion Studio
npm run render:grace-hopper    # writes out/grace-hopper.mp4
npm run render:credit-cards    # writes out/credit-cards.mp4
```

Remotion downloads its own headless Chrome on first use. Where that download
is blocked, point it at any Chromium you have:

```bash
npm run render:credit-cards -- --browser-executable=/path/to/chrome-headless-shell
```

A single frame, for checking a layout:
`npm run still -- CreditCards out/frame.png --frame=420`.

## Layout

```
src/
  components/   shared by both films: Pattern, Tinted, Type, Film, Montage
  grace-hopper/ Film.tsx, timing.ts, palettes.ts, scenes/
  credit-cards/ Film.tsx, timing.ts, palettes.ts, scenes/
  timeline.ts   frames per second, the transition length, scene starts
  motion.ts     the reduced-motion answer (below)
scripts/
  generate-images.mjs, prompts/<film>.json         the pictures
  audio.ts, narration/<film>.json                   the sound
  elevenlabs-stub.ts                                the API, for testing
public/images/<film>/<id>.webp
public/audio/<film>/                                narration, music, manifest
```

A film's `timing.ts` is the order and length of its scenes and nothing else,
so the audio script reads the same clock without loading React. `Film` plays
the scenes at those lengths with the transitions each `Film.tsx` names;
`Montage` is the closing wall of patterns and code both films end on. The chip in the corner of each scene prints the props of the pattern
behind it, seed included, as it changes.

## Grace Hopper

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

## The economics of credit cards

What a 1.5% cash back card costs, who pays for it, and who keeps the profit;
how debit differs; and whether phones or government digital money change it.

| Scene | What it says | Design | Palette | Pictures |
| --- | --- | --- | --- | --- |
| Title | Who pays for your 1.5% cash back? | `goldencoil` | Emerald | card |
| The purchase | $100 at a store; the store gets about $97.60 | `dotmatrix` | Paper | grocery bag, receipt |
| The split | $2.00 interchange to the issuer, $0.14 to the network, $0.26 to the processor | `mixtape`, `chain`, `terrain` as bars | Primary | bank, toll booth, terminal |
| Cash back | $2.00 - $1.50 = $0.50 before costs | `quoit` | Mint | coins |
| Interest | ~22% APR; over $130 billion in interest and fees in 2022 | `marbledarcs` | Lava | hourglass |
| Who pays | Every shopper through prices, and people who carry a balance | `misprint` | Duotone | price tag |
| Who profits | Issuers, networks, and Amex/Discover as both | `metro` | Cobalt | bank, toll booth, card |
| Debit | Durbin cap: about $0.27 on $100; EU credit cap 0.3% | `parity`, `odessa`, `battlement` as bars | Seafoam | piggy bank |
| Phones | A token on the same rails; Apple's reported 0.15% | `tidering`, on the phone's screen | Voltage | phone |
| Public money | Pix, UPI, the digital euro, the U.S. position | `comet` | Bioluminescence | circuit coin |
| Verdict | Phones change little; public rails squeeze fees | `damier` | Signal | scissors and card, circuit coin |
| Montage | 16 designs, each cycling 12 palettes | `eclipserings`, `truchetrings`, ... | Brass, Royal, Jade, ... | - |

The figures are typical U.S. values for a rewards credit card and are meant to
show the shape of the money, not any one card's terms. Sources for the
numbers on screen: the CFPB's 2023 credit card market report (interest and
fees in 2022), Regulation II (the Durbin cap: 21 cents + 0.05%, plus 1 cent
for fraud prevention), the EU Interchange Fee Regulation (0.3% on consumer
credit cards), Visa's fiscal year results, the Boston Fed's research on who
pays for card rewards, Executive Order 14178 (no federal CBDC) and the GENIUS
Act (stablecoins), both 2025.

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

`scripts/prompts/<film>.json` holds a film's prompts;
`npm run images -- <film>` sends them to the OpenAI Images API
(`OPENAI_API_KEY`) and writes `public/images/<film>/<id>.webp`:

```json
{ "model": "gpt-image-2.5-flare", "quality": "low", "background": "transparent" }
```

They are drawn in black and white on purpose. `src/components/Tinted.tsx` maps
each pixel's lightness along two or three colors of the scene's palette with
an SVG filter, leaving the alpha alone, so one file serves every palette (the
same portrait opens the Grace Hopper film in Toucan blues and closes it in
Letterpress reds). The script refuses a "cut-out" with no transparent pixels,
keeps the raw PNGs in `generated/<film>/` (gitignored) so promoting again
costs nothing, and takes `--only <id>` and `--force` to redo one.

## Sound

`scripts/audio.ts` makes each film's soundtrack with the ElevenLabs API and
lays it onto the render:

```bash
npm run render:grace-hopper          # the picture first: the mix copies its video stream
npm run audio -- grace-hopper        # narrate, compose, mix
npm run audio -- all --dry-run       # the plan and the character count, no calls
```

It reads the key from `ELEVENLABS_API_KEY.txt` in this folder (or at the repo
root, or `--key-file <path>`, or `ELEVENLABS_API_KEY`). The file is
gitignored in both places. The three steps can run alone (`--narrate`,
`--music`, `--mix`):

1. **Narration.** One line per scene from `scripts/narration/<film>.json`,
   spoken by `eleven_v4` through `POST /v1/text-to-speech/{voice_id}`, with the
   neighboring lines sent as `previous_text`/`next_text` so the delivery runs
   on from scene to scene. The lines use v4's inline audio tags (`[warm]`,
   `[curious]`, `[pause]`), one per clause, and spell their numbers out so the
   voice reads them as written. The Grace Hopper film is read by **Hope -
   upbeat and clear** (`tnSpp4vdxKPjI9w0GnoV`) and the credit card film by
   **Jarnathan - Confident and Versatile** (`c6SfcYrb2t09NHXiT80T`). Both are
   Voice Library voices; the script adds one to the account
   (`POST /v1/voices/add/...`) the first time it is missing.
2. **Music.** One instrumental bed a second longer than the film, from
   `POST /v1/music` on `music_v2_5` with `force_instrumental`, prompted from
   the same file.
3. **Mix.** ffmpeg places each line at its scene's start plus 10 frames,
   ducks the music under the voice with a sidechain compressor, fades it in
   and out, normalizes the whole to -16 LUFS and muxes it onto
   `out/<film>.mp4` as `out/<film>-narrated.mp4`, copying the video stream
   rather than encoding it again. It refuses a render whose length no longer
   matches `timing.ts`.

Each line has a window: from its start to 6 frames before the next line
starts. The scenes were lengthened to fit their lines at a measured 2.5 words
a second (the Grace Hopper film stays under a minute), and `--dry-run` checks
that estimate. A line that comes back longer than its window is asked for
once more at a faster `speed`, by as much as it overran and never past 1.15;
one still too long is named at the end, with the two files that fix it.

Every request is cached in `public/audio/<film>/manifest.json` by a hash of
what was asked (and of the API host), so a rerun pays only for lines that
changed; `--force` asks again. To try the whole pipeline without a key or
credits, run the stub, which answers the same routes with tones of the
right length:

```bash
npm run audio:stub &
ELEVENLABS_BASE_URL=http://localhost:8789 ELEVENLABS_API_KEY=stub npm run audio -- all
```

`npm run audio -- voices` lists the account's voices, and
`npm run audio -- voices Hope` searches the Voice Library. Check that the
account's plan includes the Music API before the first `--music`.

## Notes

- Fonts (Space Grotesk, IBM Plex Mono, Instrument Serif) are bundled from
  `@fontsource`, so a render needs no network.
- Remotion is free for individuals and small companies; larger companies need
  a [company license](https://www.remotion.dev/license).
- The portrait of Grace Hopper is an illustration generated from a
  description, not a photograph. The credit card film names companies to
  explain who earns what; it uses none of their marks.
