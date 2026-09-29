// A library palette chosen in the customizer has to leave a template
// readable. lib/studioPalettes.ts fits one to a template's roles by
// contrast, not by position (its header says why); this holds every template
// to that under the five library palettes most likely to break a page,
// fitted by that function and applied through the engine's own properties,
// the way the rail applies a choice.
//
// What is measured is the page, not the palette: every run of visible text
// against the background it actually sits on (its own and its ancestors'
// background colors, composited), in the template's own colors and then in
// each fitted palette. Text that read at 3:1 and no longer does is lost.
// Text whose color or background did not move at all is a literal in the
// template's stylesheet, which no palette can reach, and is left to the
// template; text over a background image or gradient is skipped, since the
// measure cannot see through one.
//
// It is a ratchet, not a zero. What is still lost comes from how particular
// templates are built (a section filled with an accent role under text in
// another, where the library has no second color to keep them apart), not
// from the fit, so palette-fit.known.json records each template's loss as it
// stands and a template may not lose more than a point beyond it. A template
// missing from the file is held to nothing lost at all, which is the bar for
// a new one. When a template gets better the test says so; tighten the file
// with `UPDATE_PALETTE_FIT=1 npx playwright test e2e/palette-fit.spec.ts`.
//
// The pages load with JavaScript off: the text and its colors are all in
// the export's HTML and CSS, and without the pattern runtime a recolor
// restyles the page in a few milliseconds instead of re-rendering every
// field. Transitions are off too, or a background still easing toward the
// new palette is measured in the old one.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { propertiesForPalette, type TemplateSpec } from 'tabbied-templates';
import { PALETTE_LIBRARY } from '../lib/paletteLibrary';
import { fitPalette } from '../lib/studioPalettes';

const REPO_ROOT = path.join(__dirname, '..');
const SPEC_DIR = path.join(REPO_ROOT, 'out', 'editable');
const SLUGS = fs.existsSync(SPEC_DIR)
  ? fs
      .readdirSync(SPEC_DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.slice(0, -'.json'.length))
      .filter((slug) => fs.existsSync(path.join(REPO_ROOT, 'out', 'templates', slug, 'site', 'index.html')))
  : [];

// Midnight Oil is dark with a first ink that nearly vanishes into its
// ground, Sorbet a pastel ground with every ink pastel too, and Ember dark
// with hot inks: the three CLAUDE.md checks a page by. Mono is near-black
// and one grey on white, with no second color to spare, and Electric is neon
// on black, every ink as bright as the next.
const STRESS = ['lib-midnightoil', 'lib-sorbet', 'lib-ember', 'lib-mono', 'lib-electric'];

/** Percent of a page's text each template loses, by palette id, as it stands. */
const KNOWN_FILE = path.join(__dirname, 'palette-fit.known.json');
const KNOWN: Record<string, Record<string, number>> = fs.existsSync(KNOWN_FILE)
  ? JSON.parse(fs.readFileSync(KNOWN_FILE, 'utf-8'))
  : {};

/** How far past its recorded loss a template may drift, in percentage points. */
const SLACK = 1;

type Run = [chars: number, ratio: number, text: string, color: string, background: string];

/** Apply `properties` to the edit root and measure every run of visible text. */
async function measure(page: Page, properties: Record<string, string>): Promise<Run[]> {
  return page.evaluate((properties) => {
    const root = (document.querySelector('[data-edit-root]') as HTMLElement | null) ?? document.body;
    for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value);

    // Any CSS color (color-mix, oklch, a keyword) resolves to RGBA on a canvas.
    const canvas = Object.assign(document.createElement('canvas'), { width: 1, height: 1 });
    const context = canvas.getContext('2d', { willReadFrequently: true })!;
    const rgba = (css: string): number[] => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillStyle = css;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const luminance = ([r, g, b]: number[]) => {
      const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const over = (top: number[], under: number[]) => [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);

    const texts = new Map<Element, string>();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const value = walker.currentNode.nodeValue?.trim();
      const element = walker.currentNode.parentElement;
      if (!value || !element || element.closest('script, style, noscript')) continue;
      texts.set(element, `${texts.get(element) ?? ''} ${value}`);
    }

    const runs: [number, number, string, string, string][] = [];
    for (const [element, text] of texts) {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (box.width < 2 || box.height < 2 || style.visibility !== 'visible') continue;

      let opacity = 1;
      let unknown = false;
      const layers: number[][] = [];
      for (let node: Element | null = element; node; node = node.parentElement) {
        const own = getComputedStyle(node);
        opacity *= Number(own.opacity);
        const background = rgba(own.backgroundColor);
        if (background[3] > 0) layers.push(background);
        if (background[3] >= 1) break;
        if (own.backgroundImage !== 'none') {
          unknown = true;
          break;
        }
      }
      const color = rgba(style.color);
      if (unknown || opacity < 0.05 || color[3] === 0) continue;

      const background = layers.reduceRight((under, layer) => over(layer, under), [255, 255, 255, 1]);
      const ink = over([color[0], color[1], color[2], color[3] * opacity], background);
      const [light, dark] = [luminance(ink), luminance(background)].sort((a, b) => b - a);
      runs.push([
        text.trim().length,
        (light + 0.05) / (dark + 0.05),
        text.trim().slice(0, 48),
        color.join(),
        background.map(Math.round).join(),
      ]);
    }

    return runs;
  }, properties);
}

test.describe('a library palette keeps a template readable', () => {
  test.skip(SLUGS.length === 0, 'run `npm run build` first');
  test.setTimeout(10 * 60 * 1000);

  test('text that reads in the template colors still reads in each fitted stress palette', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    // Only the stylesheet matters: pictures and web fonts change no color.
    await page.route(/\.(woff2?|ttf|otf|webp|png|jpe?g|avif|gif|svg)(\?|$)|fonts\.googleapis|fonts\.gstatic|typekit/, (route) =>
      route.abort()
    );

    const palettes = STRESS.map((id) => PALETTE_LIBRARY.find((palette) => palette.id === id)!);
    const measured: Record<string, Record<string, number>> = {};
    const worse: string[] = [];
    const better: string[] = [];

    for (const slug of SLUGS) {
      const spec = JSON.parse(fs.readFileSync(path.join(SPEC_DIR, `${slug}.json`), 'utf-8')) as TemplateSpec;
      await page.goto(`/templates/${slug}/site/`, { waitUntil: 'load' });
      // A card that eases its background-color over 180ms still reads the
      // old palette when measured the moment after a recolor. (Not
      // addStyleTag, which waits on a load event no script is left to fire.)
      await page.evaluate(() => {
        const style = document.createElement('style');
        style.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }';
        document.head.append(style);
      });

      const authored = await measure(page, propertiesForPalette(spec.palette));

      for (const palette of palettes) {
        const colors = fitPalette(palette.colors, spec.palette.colors);
        const runs = await measure(page, propertiesForPalette(spec.palette, colors));
        expect(runs.length, `${slug} keeps its text`).toBe(authored.length);

        let total = 0;
        const lost: Run[] = [];
        runs.forEach((run, i) => {
          const [chars, ratio, , color, background] = run;
          const [, was, , wasColor, wasBackground] = authored[i];
          total += chars;
          if (was >= 3 && ratio < 3 && color !== wasColor && background !== wasBackground) lost.push(run);
        });

        const share = Math.round((1000 * lost.reduce((sum, [chars]) => sum + chars, 0)) / Math.max(1, total)) / 10;
        const known = KNOWN[slug]?.[palette.id] ?? 0;
        if (share > 0) (measured[slug] ??= {})[palette.id] = share;

        if (share > known + (known > 0 ? SLACK : 0)) {
          const examples = lost
            .slice(0, 3)
            .map(([, ratio, text]) => `"${text}" at ${ratio.toFixed(2)}:1`)
            .join(', ');
          worse.push(`${slug} in ${palette.name}: ${share}% of its text lost (recorded ${known}%): ${examples}`);
        } else if (share < known - SLACK) {
          better.push(`${slug} in ${palette.name}: ${share}% (recorded ${known}%)`);
        }
      }
    }

    await context.close();

    if (process.env.UPDATE_PALETTE_FIT) {
      fs.writeFileSync(KNOWN_FILE, `${JSON.stringify(measured, null, 2)}\n`);
      return;
    }

    if (better.length > 0) {
      console.log(`palette-fit: ${better.length} better than recorded; tighten the file:\n  ${better.join('\n  ')}`);
    }
    expect(worse).toEqual([]);
  });
});
