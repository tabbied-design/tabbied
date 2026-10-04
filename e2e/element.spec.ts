import { test, expect, type Page, type Route } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// <tabbied-pattern>, both ways a page gets it:
//
// - The CDN path: one script tag for dist/element/tabbied-element.js, and a
//   design named by slug, loaded from dist/patterns/ beside it. The files are
//   served from the built package exactly as a CDN serves a published one
//   (same folders, nothing resolved), under a made-up origin, so the
//   element's own relative `../patterns/` is what is tested.
// - The bundler path: tabbied/element imported by the site's own bundle on
//   /package-test (app/package-test/ElementProbe.tsx), designs registered
//   with definePatterns() or given as a property, nothing fetched.

const DIST = path.join(__dirname, '..', 'packages', 'tabbied', 'dist');
const CDN = 'https://cdn.test/npm/tabbied@local/dist';

const page_ = (body: string) => `<!doctype html>
<html><head><meta charset="utf-8"></head>
<body style="margin: 0">
${body}
<script type="module" src="${CDN}/element/tabbied-element.js"></script>
</body></html>`;

/** Serve dist/ under the CDN origin and `html` at its index; count design fetches. */
const serveCdn = async (page: Page, html: string) => {
  const designs: string[] = [];

  await page.route(`${CDN}/**`, (route: Route) => {
    const relative = new URL(route.request().url()).pathname.replace('/npm/tabbied@local/dist/', '');

    if (relative === 'index.html') {
      return route.fulfill({ contentType: 'text/html', body: html });
    }

    const file = path.join(DIST, relative);

    if (relative.startsWith('patterns/')) designs.push(path.basename(relative, '.js'));
    if (!file.startsWith(DIST) || !fs.existsSync(file)) return route.fulfill({ status: 404 });

    return route.fulfill({
      contentType: 'text/javascript',
      headers: { 'access-control-allow-origin': '*' },
      body: fs.readFileSync(file),
    });
  });

  return designs;
};

const ground = (page: Page, selector: string) =>
  page.evaluate((s) => {
    const el = document.querySelector(`${s} css-doodle`);
    return el ? getComputedStyle(el).getPropertyValue('--color0').trim() : null;
  }, selector);

test.describe('<tabbied-pattern> from a CDN', () => {
  const MARKUP = `<tabbied-pattern id="a" pattern="radius" seed="k9Pz"
    palette="#0B1020, #3E8BFF, #3FFFB2"
    style="display: block; width: 480px; aspect-ratio: 3 / 2; background: #0B1020"></tabbied-pattern>
  <div id="park"></div>`;

  test('the box is right before the script, and the slug loads alone', async ({ page }) => {
    // The inline style alone draws the box: measure it with the script held.
    await page.route(`${CDN}/element/tabbied-element.js`, (route) => route.abort());
    await serveCdn(page, page_(MARKUP));
    await page.goto(`${CDN}/index.html`);
    const before = (await page.locator('#a').boundingBox())!;
    expect([before.width, before.height]).toEqual([480, 320]);

    await page.unrouteAll({ behavior: 'ignoreErrors' });
    const designs = await serveCdn(page, page_(MARKUP));
    await page.goto(`${CDN}/index.html`);

    const doodle = page.locator('#a css-doodle');
    await expect(doodle).toBeAttached({ timeout: 15000 });
    expect((await page.locator('#a').boundingBox())!.height).toBe(320);
    expect(await doodle.getAttribute('data-seed')).toBe('k9Pz');
    expect(await ground(page, '#a')).toBe('#0B1020');
    await expect(page.locator('#a')).toHaveAttribute('aria-hidden', 'true');
    // One design fetched, the one named: not the catalog.
    expect(designs).toEqual(['radius']);
  });

  test('attribute changes update the same pattern; a new slug loads its file', async ({ page }) => {
    const designs = await serveCdn(page, page_(MARKUP));
    await page.goto(`${CDN}/index.html`);
    const doodle = page.locator('#a css-doodle');
    await expect(doodle).toBeAttached({ timeout: 15000 });
    const first = await doodle.elementHandle();

    await page.evaluate(() => document.querySelector('#a')!.setAttribute('palette', '#ff0000, #00ff00'));
    await expect.poll(() => ground(page, '#a')).toBe('#ff0000');
    expect(await doodle.evaluate((el, prior) => el === prior, first)).toBe(true);

    // Removing it goes back to the design's own colors.
    await page.evaluate(() => document.querySelector('#a')!.removeAttribute('palette'));
    await expect.poll(() => ground(page, '#a')).not.toBe('#ff0000');

    await page.evaluate(() => document.querySelector('#a')!.setAttribute('pattern', 'windowpane'));
    await expect.poll(() => designs).toEqual(['radius', 'windowpane']);
    await expect
      .poll(() => page.evaluate(() => document.querySelector('#a')!.querySelector('css-doodle')?.getAttribute('data-seed')))
      .toBe('k9Pz');
  });

  test('a move keeps the pattern; a removal tears it down', async ({ page }) => {
    await serveCdn(page, page_(MARKUP));
    await page.goto(`${CDN}/index.html`);
    await expect(page.locator('#a css-doodle')).toBeAttached({ timeout: 15000 });

    const kept = await page.evaluate(async () => {
      const el = document.querySelector('#a')!;
      const doodle = el.querySelector('css-doodle');
      document.querySelector('#park')!.append(el);
      await new Promise((resolve) => setTimeout(resolve, 50));
      return el.querySelector('css-doodle') === doodle;
    });
    expect(kept).toBe(true);

    const removed = await page.evaluate(async () => {
      const el = document.querySelector('#a')!;
      el.remove();
      await new Promise((resolve) => setTimeout(resolve, 50));
      return { children: el.querySelectorAll('css-doodle').length, controller: (el as any).controller };
    });
    expect(removed).toEqual({ children: 0, controller: null });
  });

  test('methods, events, and a slug that does not exist', async ({ page }) => {
    await serveCdn(
      page,
      page_(`${MARKUP}<tabbied-pattern id="b" pattern="notadesign" style="display: block; height: 50px"></tabbied-pattern>`)
    );
    const warnings: string[] = [];
    page.on('console', (message) => message.type() === 'warning' && warnings.push(message.text()));
    await page.addInitScript(() => {
      (window as any).__events = [];
      document.addEventListener(
        'ready',
        (event) => (window as any).__events.push(`ready:${(event.target as Element).id}`),
        true
      );
      document.addEventListener(
        'error',
        (event) => (window as any).__events.push(`error:${(event.target as Element).id}`),
        true
      );
    });
    await page.goto(`${CDN}/index.html`);
    await expect(page.locator('#a css-doodle')).toBeAttached({ timeout: 15000 });

    await expect.poll(() => page.evaluate(() => (window as any).__events.sort())).toEqual(['error:b', 'ready:a']);
    expect(warnings.join('\n')).toContain('could not load the "notadesign" design');

    const exported = await page.evaluate(async () => {
      const el = document.querySelector('#a') as any;
      el.redraw('wxyz');
      const { svg } = await el.exportSvg();
      return { seed: el.querySelector('css-doodle').getAttribute('data-seed'), svg: svg.slice(0, 4) };
    });
    expect(exported).toEqual({ seed: 'wxyz', svg: '<svg' });
  });
});

test.describe('<tabbied-pattern> in a bundled app', () => {
  test('registered slugs and definition properties draw with nothing fetched', async ({ page }) => {
    const fetched: string[] = [];
    page.on('request', (request) => {
      if (/\/patterns\/[a-z0-9]+\.js$/.test(new URL(request.url()).pathname)) fetched.push(request.url());
    });

    await page.goto('/package-test');
    const registered = page.locator('#element-registered css-doodle');
    const property = page.locator('#element-property css-doodle');
    await expect(registered).toBeAttached({ timeout: 15000 });
    await expect(property).toBeAttached({ timeout: 15000 });

    const box = (await page.locator('#element-registered').boundingBox())!;
    expect([box.width, box.height]).toEqual([480, 320]);
    expect(await ground(page, '#element-registered')).toBe('#0B1020');

    // A React prop change reaches the element as an attribute update.
    const first = await registered.elementHandle();
    await page.click('#element-warm');
    await expect.poll(() => ground(page, '#element-registered')).toBe('#FFF4E6');
    expect(await registered.evaluate((el, prior) => el === prior, first)).toBe(true);

    expect(fetched).toEqual([]);
  });
});
