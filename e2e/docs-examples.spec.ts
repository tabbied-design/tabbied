import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

import { SIZING_CASES, sizingCode, variantFor, type Setup } from '../components/react-docs-page/examples/sizing';
import { ELEMENT_RECIPES } from '../components/react-docs-page/examples/recipes/element';
import { HTML_RECIPES } from '../components/react-docs-page/examples/recipes/html';
import type { Recipe } from '../components/react-docs-page/examples/recipes/types';
import { GUIDE } from '../components/react-docs-page/examples/guide';

// The docs pages' examples, run in a browser against the built package.
//
// - Sizing: every case in components/react-docs-page/examples/sizing.ts, in
//   the three setups whose code is the page itself (plain JavaScript, the web
//   component, plain HTML), drawn in an 800px-wide parent in an 800px-tall
//   window and measured against the box its page says it draws. React, Vue
//   and Svelte resolve the same box props as the JavaScript form
//   (resolveBoxStyle), and lib/docsExamples.test.mjs compiles their code.
// - Recipes and guide samples: every HTML and web component recipe, and the
//   sample under every shared live demo (examples/guide.ts), as written, with
//   esm.sh and jsdelivr answered from packages/tabbied/dist. Each pattern must
//   mount, and pressing every control must not throw.
//
// Nothing here touches the site: the pages are served under a made-up origin,
// so run `npm run build:packages` first, as the element spec needs.

const REPO = path.join(__dirname, '..');
const DIST = path.join(REPO, 'packages', 'tabbied', 'dist');
const DOODLE = path.join(REPO, 'node_modules', 'css-doodle', 'css-doodle.min.js');
const VERSION: string = JSON.parse(fs.readFileSync(path.join(REPO, 'packages', 'tabbied', 'package.json'), 'utf8')).version;

const ORIGIN = 'https://docs-examples.test';
const ESM = `https://esm.sh/tabbied@${VERSION}`;
const JSDELIVR = `https://cdn.jsdelivr.net/npm/tabbied@${VERSION}/dist`;

// esm.sh rewrites the core's bare `css-doodle` import on its side; served
// from dist/ as built, the page needs the import map that stands in for it.
const IMPORT_MAP = JSON.stringify({
  imports: {
    'css-doodle': `${ORIGIN}/css-doodle.js`,
    tabbied: `${ORIGIN}/dist/core/index.js`,
    'tabbied/patterns': `${ORIGIN}/dist/patterns.generated.js`,
    'tabbied/element': `${ORIGIN}/dist/element/index.js`,
  },
});

const document_ = (body: string) => `<!doctype html>
<html><head><meta charset="utf-8">
<script type="importmap">${IMPORT_MAP}</script>
</head>
<body style="margin: 0; font: 16px/1.5 sans-serif">
${body}
</body></html>`;

const script = (file: string) => ({
  contentType: 'text/javascript',
  headers: { 'access-control-allow-origin': '*' },
  body: fs.readFileSync(file),
});

/** A file under dist/, or null for a path that leaves it. */
const distFile = (relative: string) => {
  const file = path.join(DIST, relative);
  return file.startsWith(DIST) && fs.existsSync(file) ? file : null;
};

/** Serve `html` at the origin's index, dist/ under every name the examples use for it. */
const serve = async (page: Page, html: string) => {
  await page.route(`${ORIGIN}/**`, (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === '/index.html') return route.fulfill({ contentType: 'text/html', body: html });
    if (pathname === '/css-doodle.js') return route.fulfill(script(DOODLE));

    // /dist/ for the import map, /vendor/tabbied/ for the self-hosting recipe.
    const relative = pathname.replace(/^\/(dist|vendor\/tabbied)\//, '');
    const file = relative === pathname ? null : distFile(relative);
    return file ? route.fulfill(script(file)) : route.fulfill({ status: 404 });
  });

  await page.route(`${JSDELIVR}/**`, (route) => {
    const file = distFile(new URL(route.request().url()).pathname.replace(`/npm/tabbied@${VERSION}/dist/`, ''));
    return file ? route.fulfill(script(file)) : route.fulfill({ status: 404 });
  });

  // esm.sh answers a module that re-exports the built one.
  await page.route(`${ESM}**`, (route) => {
    const { pathname } = new URL(route.request().url());
    const target = pathname.endsWith('/patterns') ? 'patterns.generated.js' : 'core/index.js';
    return route.fulfill({
      contentType: 'text/javascript',
      headers: { 'access-control-allow-origin': '*' },
      body: `export * from '${ORIGIN}/dist/${target}';`,
    });
  });
};

/** Every uncaught error and unhandled rejection on the page. */
const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
};

const MOUNTED = `[data-pattern], tabbied-pattern`;

/** How many of the page's patterns have no <css-doodle> yet. */
const unmounted = (page: Page) =>
  page.evaluate((selector) => [...document.querySelectorAll(selector)].filter((el) => !el.querySelector('css-doodle')).length, MOUNTED);

test.use({ viewport: { width: 1000, height: 800 } });

test.describe('sizing cases draw the box their page says', () => {
  const SETUPS: Setup[] = ['javascript', 'element', 'html'];

  const host = (setup: Setup, id: string) =>
    setup === 'javascript' ? `#pattern-${id}` : `[data-case="${id}"] ${setup === 'element' ? 'tabbied-pattern' : '[data-pattern]'}`;

  /** All the cases on one page, each in its own 800px parent. */
  const pageFor = (setup: Setup) => {
    const sections: string[] = [];
    const scripts: string[] = [];

    for (const sizing of SIZING_CASES) {
      const { code } = sizingCode(setup, sizing)!;
      let markup = code;

      if (setup === 'javascript') {
        // The markup is in the snippet's leading comments; the rest is the script.
        const lines = code.split('\n');
        markup = lines.filter((line) => line.startsWith('// ')).map((line) => line.slice(3)).join('\n');
        scripts.push(`{\n${lines.filter((line) => !line.startsWith('// ')).join('\n')}\n}`);
        markup = markup.replace('id="pattern"', `id="pattern-${sizing.id}"`);
        scripts[scripts.length - 1] = scripts[scripts.length - 1].replace(`'#pattern'`, `'#pattern-${sizing.id}'`);
      }

      sections.push(`<section data-case="${sizing.id}" style="width: 800px; margin-bottom: 48px">\n${markup}\n</section>`);
    }

    const boot = {
      javascript: `<script type="module">
import { createPattern, resolveBoxStyle } from 'tabbied';
import { radius } from 'tabbied/patterns';
${scripts.join('\n')}
</script>`,
      element: `<script type="module" src="${JSDELIVR}/element/tabbied-element.js"></script>`,
      html: `<script type="module">
import { hydratePatterns } from '${ESM}';
import { radius } from '${ESM}/patterns?exports=radius';
hydratePatterns({ patterns: { radius } });
</script>`,
    }[setup as 'javascript' | 'element' | 'html'];

    return document_(`${sections.join('\n')}\n${boot}`);
  };

  for (const setup of SETUPS) {
    test(setup, async ({ page }) => {
      const errors = collectErrors(page);
      await serve(page, pageFor(setup));
      await page.goto(`${ORIGIN}/index.html`);

      // A box with height mounts a canvas; a 0px one is the case being shown.
      const drawn = SIZING_CASES.filter((sizing) => variantFor(setup, sizing)!.result.h > 0);
      await expect
        .poll(
          () =>
            page.evaluate(
              (selectors) => selectors.filter((selector) => !document.querySelector(`${selector} css-doodle`)).length,
              drawn.map((sizing) => host(setup, sizing.id))
            ),
          { timeout: 20000 }
        )
        .toBe(0);

      for (const sizing of SIZING_CASES) {
        const { result } = variantFor(setup, sizing)!;
        const measured = await page.evaluate((selector) => {
          const el = document.querySelector(selector)!;
          const box = el.getBoundingClientRect();
          const parent = el.parentElement!.getBoundingClientRect();
          return { w: Math.round(box.width), h: Math.round(box.height), parentW: Math.round(parent.width), parentH: Math.round(parent.height) };
        }, host(setup, sizing.id));
        const label = `${setup} / ${sizing.id}`;

        if (result.followsContent) {
          // As tall as the copy makes its parent, whatever the font draws.
          expect(measured.h, label).toBeGreaterThan(0);
          expect([measured.w, measured.h], label).toEqual([measured.parentW, measured.parentH]);
        } else {
          expect([measured.w, measured.h], label).toEqual([result.w, result.h]);
        }
        if (result.parentH !== undefined) expect(measured.parentH, label).toBe(result.parentH);
      }

      expect(errors).toEqual([]);
    });
  }
});

test.describe('recipes run as written', () => {
  /** The page for a recipe: its HTML as is, or a script recipe in a module. */
  const pageFor = (recipe: Recipe) => {
    const code = recipe.code.replaceAll('@VERSION@', VERSION);
    return document_(recipe.lang === 'html' ? code : `<div id="app"></div>\n<script type="module">\n${code}\n</script>`);
  };

  /** Press every control the recipe draws, the way a person would. */
  const useControls = async (page: Page) => {
    for (const button of await page.locator('button').all()) {
      await expect(button).toBeEnabled();
      await button.click();
    }
    for (const select of await page.locator('select').all()) {
      const values = await select.locator('option').evaluateAll((options) => options.map((option) => (option as HTMLOptionElement).value));
      for (const value of values.reverse()) await select.selectOption(value);
    }
    for (const input of await page.locator('input[type="range"]').all()) {
      await input.evaluate((el: HTMLInputElement) => {
        el.value = el.min;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
    }
    for (const pattern of await page.locator(MOUNTED).all()) {
      await pattern.hover({ force: true });
      await page.mouse.move(0, 0);
    }
  };

  // A guide sample is run the way a recipe is.
  const guide = (setup: 'html' | 'element') =>
    Object.entries(GUIDE[setup]).map(
      ([part, sample]) =>
        [setup, { id: `guide-${part}`, group: 'layout', title: part, says: '', ...sample } as Recipe] as const
    );

  const recipes = [
    ...HTML_RECIPES.map((recipe) => ['html', recipe] as const),
    ...ELEMENT_RECIPES.map((recipe) => ['element', recipe] as const),
    ...guide('html'),
    ...guide('element'),
  ];

  for (const [setup, recipe] of recipes) {
    test(`${setup} / ${recipe.id}`, async ({ page }) => {
      const errors = collectErrors(page);
      await serve(page, pageFor(recipe));
      await page.goto(`${ORIGIN}/index.html`);

      // 'later' starts empty: its patterns arrive with the button.
      if (recipe.id !== 'later') await expect.poll(() => page.locator(MOUNTED).count(), { timeout: 20000 }).toBeGreaterThan(0);
      await expect.poll(() => unmounted(page), { timeout: 20000 }).toBe(0);

      const before = await page.locator(MOUNTED).count();
      await useControls(page);
      // A pattern added after load mounts too.
      if (recipe.id === 'later') expect(await page.locator(MOUNTED).count()).toBe(before + 1);
      await expect.poll(() => unmounted(page), { timeout: 20000 }).toBe(0);

      // The design the page leaves out is the one onError takes away.
      if (recipe.id === 'unknown') expect(await page.locator('[data-pattern="notimported"]').count()).toBe(0);

      expect(errors).toEqual([]);
    });
  }
});
