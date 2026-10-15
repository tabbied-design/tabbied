# Response to the 2026-10-15 guest audit

The audit (Claude Cowork, signed-out guest, desktop Chrome at about 1400px and a
390px frame) found both of Sy's proposals live and listed fifteen issues. This
is what was done about each, in the same order, with what was checked. The
changes are in one pull request; anything marked "decision" is left for Park
and Sy.

| Item | Priority | Outcome |
|---|---|---|
| T-01 Search misses trade words | P1 | Fixed |
| T-02 Homepage showcase is not the library | P1 | Fixed: the homepage now shows real templates |
| T-03 No event analytics | P1 | Mostly in place already; two gaps fixed, the rest needs a policy decision |
| T-04 Canonical points at a redirect | P1 | Not reproduced; one dashboard change suggested |
| T-05 Page 1 buries the trades | P2 | Fixed (editorial; easy to revert) |
| T-06 Two taxonomies | P2 | Fixed |
| T-07 Grid skips the preview pages | P2 | Decision; the homepage now links to them |
| T-08 No editor on phones | P2 | Decision; a "Send yourself the link" button added |
| T-09 Text and photos not editable | P2 | Decision |
| T-10 First click on the hero button | P3 | Cause found and fixed |
| T-11 Pattern tiles blank at first | P3 | Not changed; cause and options below |
| T-12 "Leave site?" prompt | P3 | Mostly correct as it was; one case fixed |
| T-13 Phone placeholder cut off | P3 | Fixed |
| T-14 Palette buttons unnamed | P3 | Not reproduced |
| T-15 Photos beside "in place of stock photos" | P3 | Kept; decision for Sy |

## P1

### T-01 Search: fixed

The gallery's search was a substring match of every word typed against the
slug, name, category and topic, the same rule the MCP server's
`list_templates` uses. A person types the trade and the topics name the work,
so "plumber" missed "Plumbing and heating contractor", and "hair" found "Two
Chairs Counseling".

It now matches by word (`lib/catalogSearch.ts`, `searchTemplates`):

- Both sides go through one small stemmer, so plumber, plumbers and plumbing
  meet, as do baker and bakery, groomer and grooming, upholsterer and
  upholstery, electrician and electric.
- A short hand-kept list joins trades that share no stem: hvac and heating,
  lawyer and attorney, accountant and bookkeeping, dentist and dental, vet
  and veterinary, cafe and coffee, joiner and carpentry. It deliberately
  leaves out words many trades share ("salon", "clinic", "school") and
  category names ("wellness"), which would make one trade find dozens.
- A word is matched whole or as the start of a word, never inside one, and
  a word still being typed ("plu") matches the words it starts. Matches by
  stem are listed before matches by start only, so "car" shows the car wash
  before the cardiologist.
- A search that finds nothing offers the nearest search that does ("plumer":
  "Did you mean plumber or plumbing?"; "lanscaper": landscaping), then a few
  common trades, then the existing "tell us which trade to add".

Appendix A, rerun against the registries (`lib/templateSearch.test.mjs`
pins every row):

| Query | Before | Now |
|---|---|---|
| plumber | 0 | Northside Plumbing (Plumbline Payroll is not matched) |
| landscaper | 0 | Fernhill Gardens |
| dog groomer | 0 | Muddy Paws, Pawsh |
| groomer | 0 | Muddy Paws, Pawsh, Velvet |
| electrician | 1 | Live Wire Electric |
| baker / bakery | 3 | Crumb Bakehouse, Rye & Levain, Za'atar & Co., Petit Four |
| hair | 4, with Two Chairs | Fringe, Ringlet Curl Studio, Veil & Brush; no Two Chairs |
| upholsterer | 0 | Tack & Button |
| hvac | 0 | Northwind Heating & Air, Northside Plumbing |

The MCP tool still matches substrings. An agent rephrases a query that
missed, so it was left alone; porting the matcher there is a small follow-up
if wanted (it is a published package, so it needs a changeset).

### T-02 Homepage showcase: fixed

Park's instruction was to update the homepage wherever it used Sy's Claude
Design file unaltered. It did in three sections: the hero's two windows and
fourteen trade tabs, the "skilled hands" carousel, and the "Any template"
demo were all the design's own mock data (fictional businesses, invented
domains, the design's own pattern stills and palettes with names that are not
the catalog's, six display faces loaded only for the mockups). All three now
show real templates:

- **Hero.** Each trade tab names a real template, and the two windows are
  those templates' own screenshots under a browser bar showing their real
  address. Each window links to the template's preview page. The tabs are
  strips of the pattern each template wears, in its own colors, captured off
  the live page (`scripts/capture-home-tabs.mjs`).
- **Carousel.** Each slide is a real template in front of the trade's
  photograph, with its real palette and the face its headline is set in, and
  the arrow (and the window) opens that template, not a search.
- **"Any template. Entirely your own."** The window is now the template's
  actual download in an iframe, recolored and re-patterned live by the same
  engine and runtime the customizer uses, so the palette shown is the one
  Download would ship. The palettes offered are the library's and the
  patterns are catalog designs, by their real names. It loads only when the
  section is near the screen and shows the template's screenshot until then.

| Was (design) | Where | Now |
|---|---|---|
| Lumen (hair salon) | Hero, opening window | Fringe (fringe-salon) |
| Kettle Plumbing | Hero, second window | Northside Plumbing |
| Thread & Frame, Keyway, Morrow, Scruff, Hale & Hem, Rose & Stem, Crumb, Oak & Joint, Brightline, Fieldwork, Kiln Studio, Northside (barber) | Hero tabs | Tack & Button, Keyway Locksmiths, Morrow Coffee, Muddy Paws, Running Stitch, Wild Stem, Rye & Levain, True Grain Carpentry, Live Wire Electric, Fernhill Gardens, Wheelhouse Ceramics, Stropline Barbers |
| Black Koi Tattoo | Carousel | Inkwell Tattoo |
| La Esquina Tacos | Carousel | El Farolito |
| Fringe Salon | Carousel | Ringlet Curl Studio (Fringe is in the hero) |
| Scruff Grooming | Carousel | Pawsh |
| Crumb Bakehouse | Carousel | Crumb Bakehouse |
| Thread & Hem (tailors) | Carousel | Stitch Lane |
| Grain Joinery | Carousel | Oxbow |
| Form & Field (landscapers) | Carousel | Heartwood Arborists (the photograph is pruning) |
| Ashby Plumbing | Carousel | Northside Plumbing |
| Studio Nova | "Any template" | Live Wire Electric, live |

So that this cannot drift again, the homepage data now holds only slugs and
the editorial choices (which template stands for a trade, a slide's photo and
sentence); a server module resolves names, kinds, categories, colors and
screenshots from the registries, and the export fails on a slug that is not a
template. A new e2e check opens every template link on the homepage and
expects a 200. The six mockup-only fonts are no longer loaded.

### T-03 Analytics: mostly in place; two gaps fixed; the rest is a decision

The audit looked for third-party scripts and found only Cloudflare Web
Analytics. The counting is first-party, by design (the Privacy Policy says
there are no analytics trackers): every template zip is counted by the Worker
as it is served, signed in or not (`download` table), and the customizer
reports `customize` (opened on a template), `save-gate` (a guest pressed
Save) and `gate-save` (those edits were saved after signing up) to
`/api/events`. The admin overview shows downloads over 30 days and how many
had no account, customizer sessions and how many reached the save gate, new
accounts and how many started from a save, and saved templates.

Customized downloads are not invisible either: the customizer builds them
from the same zips, which the Worker counts. But two things were wrong, and
are fixed:

- A customized download was counted as an ordinary one, and a customized
  React download counted as two (the React builder fetches the HTML package
  too). The customizer now says what each fetch is for; the helper fetch is
  not counted, and a customized download is one download plus a
  `download-customized` event. No migration was needed.
- The overview now shows how many of the 30 days' downloads were customized,
  and a "Most downloaded" list: the ten templates with the most downloads in
  the last 7 days.

Not done, because each records something the Privacy Policy currently says
is not collected ("Browsing, customizing and downloading ... does not send
what you make to us"; counts are "which template, and when"):

- Zero-result searches (the words typed). This is the most useful of the
  three for deciding which trades to add next. Suggested policy line under
  "Without an account": "We also keep searches in the template gallery that
  found nothing, without linking them to you or your address." It would be
  one more event kind and a list on the overview.
- Palette and pattern changes per template.
- UTM or referrer source per customizer session. Cloudflare Web Analytics
  already reports referrers per page, which may be enough to compare social
  posts without storing anything new.

### T-04 Canonical host: not reproduced

On 2026-10-15, with a desktop Chrome user agent, `https://tabbied.com/` and
`https://tabbied.com/templates/northside-plumbing/` answer 200 directly, with
no redirect, and so do the same paths on `www.tabbied.com`. The canonical
links, `og:url` and the sitemap all name the apex, which is the host that
answers, so they do not point at a redirect. (The auditor may have opened the
site from a `www` link and read the address bar.)

What is worth doing is the other direction: `www` serves the whole site as a
duplicate. The canonicals already consolidate it for search engines, but a
301 from `www.tabbied.com/*` to `https://tabbied.com/$1` would settle it.
That has to be a Cloudflare redirect rule in the dashboard: static assets are
served before the Worker runs, and `_redirects` cannot match on host.

## P2

### T-05 Page 1 order: fixed (editorial)

`GALLERY_LEAD` now opens with 24 everyday trades: the florist, barber,
baker, electrician, dog groomer and landscaper the gallery's own heading
names, then plumber, cafe, hair salon, tattoo, roofer, food truck, locksmith,
dentist, heating, sourdough bakery, tailor, ceramics, auto repair, cleaning,
carpentry, upholstery, decorating and fencing. The 23 templates picked for
the top of page 1 on 2026-10-02 follow, in their order, so page 1 is the
trades and then those picks. The lead is an editorial choice by design, so
this is one list in `lib/templateOrder.ts` to change back if Sy prefers.
The institutional templates were not moved to a category of their own.

### T-06 Two taxonomies: fixed

The carousel's chips are now the gallery's own categories, taken from the
slides' templates (Services, Studio, Food & drink, Wellness & sport), and
"Browse all" follows the chip into the gallery's matching filter ("Browse
all 88 in Services" opens `/templates/?category=services`).

### T-07 Cards skip the preview pages: decision

Cards going straight to the customizer is the 14 October design and Sy's own
ask (jump straight into the editor), so it was not changed. The preview pages
stay in the sitemap, and the homepage now links to 22 of them. If internal
links matter more than the one-click start, options are a small "Preview"
link on each card, or a link to the preview from the customizer's bar.

### T-08 No editor on phones: decision; one addition

The phone layout without the editor is deliberate (the rail does not fit;
preview and download work). The audit's minimum is in: the phone notice now
has a "Send yourself the link" button, which opens the phone's share sheet
(mail, messages, notes) or copies the link where there is none. A palette and
pattern sheet for phones is the larger option and is a product call.

### T-09 Text and photos: decision

No change. The options in the audit (a "make it yours with AI" guide built on
each download's `AGENTS.md`, a line for people who build sites for others,
in-editor text editing and publishing) are product decisions for Park and
Sy. The engine and the Worker routes for text and picture edits already
exist (Studio's), so in-editor text editing is mostly a UI change.

## P3

### T-10 First click on the hero button: cause found, fixed

The button is a client-side link with prefetching off, so a click starts
fetching the gallery's payload (about 105 KB compressed: every card's pattern
definition) and nothing visible happens until it arrives. On a slower
connection that is a second or two, which reads as a click that did nothing.
The homepage's links into the gallery now start that fetch when a pointer
reaches them, a finger touches them or they take focus, and still not on
page load.

### T-11 Pattern tiles blank at first: not changed

The tiles are live patterns, and they wait for the whole design catalog
(about 89 KB compressed) and css-doodle before the first one draws. The
committed previews are in each design's own colors, while the gallery opens
in "Random per pattern" palettes, so showing a preview first would flash the
wrong colors and then change. Two options for later: draw the first page's
previews only when the palette is the design's own, or load per-design
entries (`tabbied/patterns/<slug>`) so the first tiles do not wait for the
whole catalog.

### T-12 "Leave site?" prompt: mostly correct; one case fixed

A guest's edits are not kept across a reload in general: they are stashed
only when the save dialog's "Create an account" or "Log in" link is
followed, which is most likely how the audit saw them survive. So the prompt
is right in general. It is now skipped in the case the audit names: a guest
who has just downloaded the current draft has those changes in the zip, and
the next change asks again. A saved site still asks, since its account copy
is behind until Save.

### T-13 Phone placeholder: fixed

At 390px the field leaves about 224px for the placeholder, and "Search by
trade, e.g. plumber" measured 210px in a fallback face, so it lost its last
letter in the real one. Phones now read "Your trade, e.g. plumber".

### T-14 Palette buttons unnamed: not reproduced

Each palette row in the Colors tab is a button whose visible text is the
palette's name (it is the accessible name), and it carries `aria-pressed`;
the pencil beside it is "Edit <palette>". Checked in Chromium's accessibility
tree on a customized template.

### T-15 Photographs: kept

The trade photographs are the design's art direction for the homepage's own
sections. What the hero's "patterns in place of stock photos" describes is
the templates, and every slide now shows a real template in front of its
photograph, so the contrast is the point of the section. If Sy would rather
the carousel used patterns too, it is a change to the slide images alone.

## Checked

- `npm run test:lib` (the new template search tests included),
  `npm run typecheck:worker`, the site's TypeScript, `npm run check:typography`.
- `npm run build`, and the Worker tests for the counting change.
- The homepage at 1440px and 390px, the gallery's search and empty state at
  390px, and the "Any template" demo recoloring and re-patterning Live Wire
  Electric against the built export.
