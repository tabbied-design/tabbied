import { test, expect, type Page } from '@playwright/test';

// tabbied/svelte and tabbied/vue in a browser, from the built package, through
// app/package-test/WrappersProbe.tsx. The server half (what SvelteKit and Nuxt
// paint before a script runs) is pinned by packages/tabbied/test/wrappers.test.mjs;
// this is the other half: the pattern mounts into that placeholder, follows a
// prop change without being rebuilt, keeps its clipping when the framework
// writes the style attribute again, and goes away with its element.

const KINDS = [
  { name: 'svelte', host: '#wrapper-svelte' },
  { name: 'vue', host: '#wrapper-vue-root > div' },
] as const;

type Kind = (typeof KINDS)[number]['name'];

const ready = (page: Page) =>
  page.waitForFunction(() => !!window.__wrappers?.svelte && !!window.__wrappers?.vue);

const paletteVar = (page: Page, host: string) =>
  page.evaluate((selector) => {
    const el = document.querySelector(`${selector} css-doodle`);
    return el ? getComputedStyle(el).getPropertyValue('--color0').trim() : null;
  }, host);

for (const { name, host } of KINDS) {
  test.describe(`tabbied/${name}`, () => {
    test('mounts into its placeholder at the box it was given', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 900 });
      await page.goto('/package-test');
      await ready(page);

      const doodle = page.locator(`${host} css-doodle`);
      await expect(doodle).toBeAttached({ timeout: 15000 });

      const box = (await page.locator(host).boundingBox())!;
      // maxWidth 480 at 3 / 2.
      expect(box.width).toBe(480);
      expect(box.height).toBe(320);

      await expect(page.locator(host)).toHaveAttribute('data-pattern', 'radius');
      await expect(page.locator(host)).toHaveAttribute('aria-hidden', 'true');
      expect(await page.locator(host).evaluate((el) => getComputedStyle(el).overflow)).toBe(
        'hidden'
      );
    });

    test('follows a prop change on the same element, clipping kept', async ({ page }) => {
      await page.goto('/package-test');
      await ready(page);

      const doodle = page.locator(`${host} css-doodle`);
      await expect(doodle).toBeAttached({ timeout: 15000 });
      const before = await doodle.elementHandle();

      await page.evaluate(
        (kind) => window.__wrappers![kind as Kind]!.update({ palette: ['#ff0000', '#00ff00'], maxWidth: 300 }),
        name
      );

      await expect.poll(() => paletteVar(page, host)).toBe('#ff0000');
      // The same <css-doodle>, updated rather than rebuilt.
      expect(await doodle.evaluate((el, prior) => el === prior, before)).toBe(true);

      const hostBox = (await page.locator(host).boundingBox())!;
      expect(hostBox.width).toBe(300);
      // The style attribute was written again (Svelte writes it whole); the
      // oversized canvas must still be clipped to the box.
      expect(await page.locator(host).evaluate((el) => getComputedStyle(el).overflow)).toBe(
        'hidden'
      );
      const doodleBox = (await doodle.boundingBox())!;
      expect(doodleBox.width).toBeGreaterThanOrEqual(hostBox.width);
    });

    test('a seed prop and redraw() reach the controller', async ({ page }) => {
      await page.goto('/package-test');
      await ready(page);
      await expect(page.locator(`${host} css-doodle`)).toBeAttached({ timeout: 15000 });

      const seed = (kind: string) =>
        page.evaluate((k) => window.__wrappers![k as Kind]!.controllerSeed!(), kind);

      expect(await seed(name)).toBe('k9Pz');
      await page.evaluate((kind) => window.__wrappers![kind as Kind]!.update({ seed: 'abcd' }), name);
      await expect.poll(() => seed(name)).toBe('abcd');
      await page.evaluate((kind) => window.__wrappers![kind as Kind]!.redraw!('wxyz'), name);
      await expect.poll(() => seed(name)).toBe('wxyz');
    });

    test('destroying it removes the pattern', async ({ page }) => {
      await page.goto('/package-test');
      await ready(page);
      await expect(page.locator(`${host} css-doodle`)).toBeAttached({ timeout: 15000 });

      await page.evaluate((kind) => window.__wrappers![kind as Kind]!.destroy(), name);
      await expect(page.locator(`${host} css-doodle`)).toHaveCount(0);
    });
  });
}
