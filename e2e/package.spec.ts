import { test, expect, type Page } from '@playwright/test';

// Coverage for the `tabbied` package itself (via the built dist the site
// consumes), driven through app/package-test/page.tsx. The gallery and editor
// already dogfood the cover and fixed fits; this spec covers the adaptive
// grid fit - the package default - and the box props that size the element
// the pattern renders into.

const paintedCells = (page: Page, hostSelector: string) =>
  page.evaluate((selector) => {
    const el = document.querySelector(`${selector} css-doodle`);
    if (!el || !el.shadowRoot) return 0;
    return [...el.shadowRoot.querySelectorAll('cssd-cell')].filter((cell) => {
      const bg = getComputedStyle(cell).backgroundColor;
      return bg && bg !== 'rgba(0, 0, 0, 0)';
    }).length;
  }, hostSelector);

// The longest transition any cell declares, in ms: the designs author a ~400ms
// ease, and the controller mutes it by injecting `transition: none !important`
// into the shadow root. The max is independent of which cells a seed painted.
const maxCellTransitionMs = (page: Page, hostSelector: string) =>
  page.evaluate((selector) => {
    const el = document.querySelector(`${selector} css-doodle`);
    if (!el || !el.shadowRoot) return -1;

    return [...el.shadowRoot.querySelectorAll('cssd-cell')].reduce(
      (longest, cell) =>
        Math.max(
          longest,
          ...getComputedStyle(cell)
            .transitionDuration.split(',')
            .map((value) => parseFloat(value) * 1000 || 0)
        ),
      0
    );
  }, hostSelector);

const cellCount = (page: Page, hostSelector: string) =>
  page.evaluate((selector) => {
    const el = document.querySelector(`${selector} css-doodle`);
    return el?.shadowRoot?.querySelectorAll('cssd-cell').length ?? 0;
  }, hostSelector);

// The laid-out track sizes of the shadow grid, in CSS px. Fractional tracks
// are what draw a hairline seam at every cell edge.
const gridTrackPx = (page: Page, hostSelector: string) =>
  page.evaluate((selector) => {
    const el = document.querySelector(`${selector} css-doodle`);
    const grid = el?.shadowRoot?.querySelector('cssd-grid');

    if (!grid) return { cols: [] as number[], rows: [] as number[] };

    const cs = getComputedStyle(grid);

    return {
      cols: cs.gridTemplateColumns.split(' ').map(parseFloat),
      rows: cs.gridTemplateRows.split(' ').map(parseFloat),
    };
  }, hostSelector);

test.describe('tabbied package (component test page)', () => {
  test('fit="grid" adapts the cell grid to the container size', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    await page.waitForFunction(() => !!window.customElements.get('css-doodle'));
    const doodle = page.locator('#fit-grid [data-pattern="radius"] css-doodle');
    await expect(doodle).toBeAttached({ timeout: 15000 });

    // The canvas covers its host box, snapped up to a whole number of grid
    // tracks so no cell boundary lands on a sub-pixel; the host clips the
    // overflow.
    const host = page.locator('#fit-grid [data-pattern="radius"]');
    const hostBox = (await host.boundingBox())!;
    const doodleBox = (await doodle.boundingBox())!;
    const {
      cols: cols_px,
      rows: rows_px,
    } = await gridTrackPx(page, '#fit-grid [data-pattern="radius"]');
    const cols = cols_px.length;
    const rows = rows_px.length;

    expect(doodleBox.width).toBeGreaterThanOrEqual(hostBox.width - 1);
    expect(doodleBox.height).toBeGreaterThanOrEqual(hostBox.height - 1);
    // The cell is even (designs that halve their cell land on whole pixels)
    // and square (a quarter-turn rotation of an oblong swaps its axes and
    // leaves a strip of the cell uncovered).
    expect((doodleBox.width / cols) % 2).toBeCloseTo(0, 1);
    expect((doodleBox.height / rows) % 2).toBeCloseTo(0, 1);
    expect(doodleBox.width / cols).toBeCloseTo(doodleBox.height / rows, 1);
    await expect(page.locator('#fit-grid [data-pattern="radius"]')).toHaveCSS(
      'overflow',
      'hidden'
    );

    // Every track is a whole pixel - the property the snap exists to hold.
    for (const px of [...cols_px, ...rows_px]) {
      expect(Math.abs(px - Math.round(px))).toBeLessThan(0.01);
    }

    // ~36px target cells: a ~1152x320 box must get a clearly 2-D grid, and
    // the pattern must actually paint.
    const wideCount = await cellCount(page, '#fit-grid [data-pattern="radius"]');
    expect(wideCount).toBeGreaterThan(100);
    await expect
      .poll(() => paintedCells(page, '#fit-grid [data-pattern="radius"]'), {
        timeout: 10000,
      })
      .toBeGreaterThan(1);

    // Shrinking the container re-derives a coarser grid (debounced ~180ms).
    await page.setViewportSize({ width: 480, height: 800 });
    await expect
      .poll(() => cellCount(page, '#fit-grid [data-pattern="radius"]'), {
        timeout: 10000,
      })
      .toBeLessThan(wideCount);
  });

  test('fit="cover" tiles a grid pattern with whole cells (no mid-cell crop)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const selector = '#fit-cover [data-pattern="radius"]';
    const doodle = page.locator(`${selector} css-doodle`);
    await expect(doodle).toBeAttached({ timeout: 15000 });

    await expect
      .poll(() => paintedCells(page, selector), { timeout: 10000 })
      .toBeGreaterThan(1);

    // The adapted render matches the host's aspect ratio, so the scaled canvas
    // covers the wide box. It overshoots by under one scaled cell: the scale
    // is quantized (rounded up) so a cell lands on a whole device pixel.
    const hostBox = (await page.locator(selector).boundingBox())!;
    const doodleBox = (await doodle.boundingBox())!;
    const { cell, scale } = await page.evaluate((sel) => {
      const d = document.querySelector(`${sel} css-doodle`)!;
      const grid = d.shadowRoot!.querySelector('cssd-grid')!;
      return {
        cell: parseFloat(getComputedStyle(grid).gridTemplateColumns),
        scale: new DOMMatrixReadOnly(getComputedStyle(d).transform).a,
      };
    }, selector);

    expect(doodleBox.width).toBeGreaterThanOrEqual(hostBox.width - 1);
    expect(doodleBox.height).toBeGreaterThanOrEqual(hostBox.height - 1);
    expect(doodleBox.width - hostBox.width).toBeLessThan(cell * scale);
    expect(doodleBox.height - hostBox.height).toBeLessThan(cell * scale);

    // The invariant the quantization exists for: a cell edge lands on a whole
    // pixel after the transform, which snapping the render box alone does not
    // give.
    const scaledCell = cell * scale;
    expect(Math.abs(scaledCell - Math.round(scaledCell))).toBeLessThan(0.02);

    // And the cells it is tiled with stay near-square (the on-screen cell
    // rect includes the cover scaling transform).
    const cellRatio = await page.evaluate((sel) => {
      const el = document.querySelector(`${sel} css-doodle`);
      const cell = el?.shadowRoot?.querySelector('cssd-cell');
      if (!cell) return 0;
      const rect = cell.getBoundingClientRect();
      return rect.width / rect.height;
    }, selector);
    expect(cellRatio).toBeGreaterThan(0.8);
    expect(cellRatio).toBeLessThan(1.25);
  });

  test('maxWidth + aspectRatio size the box without a sized parent', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const selector = '#box-bounded [data-pattern="radius"]';
    await expect(page.locator(`${selector} css-doodle`)).toBeAttached({
      timeout: 15000,
    });

    await expect
      .poll(() => paintedCells(page, selector), { timeout: 10000 })
      .toBeGreaterThan(1);

    // The section is far wider than 480px, so maxWidth is what's binding, and
    // the height comes from aspect-ratio rather than from any parent.
    const hostBox = (await page.locator(selector).boundingBox())!;
    expect(hostBox.width).toBeCloseTo(480, 0);
    expect(hostBox.height).toBeCloseTo(320, 0);

    // Narrower than the cap: the box tracks the container again, and the
    // ratio still sets the height.
    await page.setViewportSize({ width: 420, height: 800 });
    await expect
      .poll(async () => (await page.locator(selector).boundingBox())!.width, {
        timeout: 10000,
      })
      .toBeLessThan(480);

    const narrowBox = (await page.locator(selector).boundingBox())!;
    expect(narrowBox.width / narrowBox.height).toBeCloseTo(3 / 2, 1);
  });

  test('fit="fixed" draws at its own canvas size', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const host = page.locator('#fit-fixed [data-pattern="radius"]');
    await expect(host.locator('css-doodle')).toBeAttached({ timeout: 15000 });

    // The box takes the canvas size rather than filling the (much wider)
    // section, so `fixed` is the one fit with an inherent size.
    const hostBox = (await host.boundingBox())!;
    expect(hostBox.width).toBeCloseTo(300, 0);
    expect(hostBox.height).toBeCloseTo(450, 0);

    // Non-decorative mode exposes an accessible image role.
    await expect(host).toHaveRole('img');
    await expect(host).toHaveAccessibleName('Radius');
  });

  // The redraw timer lives in the core controller, so this also covers the
  // vanilla entry point. The seed rides on data-seed, which makes a redraw
  // observable.
  test('redrawInterval rotates the seed, and paused holds it', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const ticking = page.locator('#redraw-interval [data-pattern="radius"] css-doodle');
    await expect(ticking).toBeAttached({ timeout: 15000 });
    // Both sections sit below the fold, and an off-screen host drops its
    // ticks by design.
    await ticking.scrollIntoViewIfNeeded();

    const first = await ticking.getAttribute('data-seed');
    await expect
      .poll(() => ticking.getAttribute('data-seed'), { timeout: 10000 })
      .not.toBe(first);

    // Same interval, gated off: the seed must not move. Scrolled into view
    // first so the viewport gate isn't what's holding it.
    const held = page.locator('#redraw-paused [data-pattern="radius"] css-doodle');
    await held.scrollIntoViewIfNeeded();
    await expect(held).toBeAttached({ timeout: 15000 });

    const pinned = await held.getAttribute('data-seed');
    await page.waitForTimeout(1500); // several intervals at 250ms
    expect(await held.getAttribute('data-seed')).toBe(pinned);
  });

  // Declarative mounting, the path a packaged HTML template takes.
  test('hydratePatterns mounts patterns from data-* attributes alone', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const basic = page.locator('#hydrate-basic');
    await basic.scrollIntoViewIfNeeded();
    await expect(basic.locator('css-doodle')).toBeAttached({ timeout: 15000 });

    await expect
      .poll(() => paintedCells(page, '#hydrate-basic'), { timeout: 10000 })
      .toBeGreaterThan(1);

    // The declared seed and palette must be what actually rendered.
    await expect(basic.locator('css-doodle')).toHaveAttribute(
      'data-seed',
      'k9Pz'
    );
    const inks = await page.evaluate(() => {
      const el = document.querySelector('#hydrate-basic css-doodle');
      return [
        ...new Set(
          [...(el?.shadowRoot?.querySelectorAll('cssd-cell') ?? [])].map(
            (cell) => getComputedStyle(cell).backgroundColor
          )
        ),
      ];
    });
    // #3E8BFF and #3FFFB2 from data-palette, nothing from radius's authored set.
    expect(inks.join(' ')).toMatch(/rgb\(62, 139, 255\)|rgb\(63, 255, 178\)/);

    // data-options is typed by the definition, so "4x6" stays the string the
    // ButtonSelectGroup declares and drives a 4x6 grid. Read under
    // fit:"fixed", since the grid fit would re-derive cols x rows from the box.
    const options = page.locator('#hydrate-options');
    await options.scrollIntoViewIfNeeded();
    await expect(options.locator('css-doodle')).toBeAttached({ timeout: 15000 });
    await expect
      .poll(() => cellCount(page, '#hydrate-options'), { timeout: 10000 })
      .toBe(24);

    // data-width / data-height sized the fixed canvas.
    const canvas = (await options.locator('css-doodle').boundingBox())!;
    expect(canvas.width).toBeCloseTo(240, 0);
    expect(canvas.height).toBeCloseTo(360, 0);

    // An unknown slug is skipped without taking its neighbors down.
    await expect(
      page.locator('#hydrate-unknown css-doodle')
    ).toHaveCount(0);
  });

  // The authored cell transitions fire on any re-render, including a
  // resize's re-derived grid.
  test('cell transitions animate normally by default', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const selector = '#fit-grid [data-pattern="radius"]';
    await expect(page.locator(`${selector} css-doodle`)).toBeAttached({
      timeout: 15000,
    });

    // The first paint is muted for two frames (nothing to morph from), then
    // the override lifts and the authored ease takes over.
    await expect
      .poll(() => maxCellTransitionMs(page, selector), { timeout: 10000 })
      .toBeGreaterThan(0);
  });

  test('prefers-reduced-motion mutes the cell transitions, including across a resize', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const selector = '#fit-grid [data-pattern="radius"]';
    await expect(page.locator(`${selector} css-doodle`)).toBeAttached({
      timeout: 15000,
    });
    await expect
      .poll(() => paintedCells(page, selector), { timeout: 10000 })
      .toBeGreaterThan(1);

    expect(await maxCellTransitionMs(page, selector)).toBe(0);

    // Force a real re-render: a narrower box derives a different grid after
    // the ~180ms debounce.
    const before = await cellCount(page, selector);
    await page.setViewportSize({ width: 640, height: 800 });
    await expect
      .poll(() => cellCount(page, selector), { timeout: 10000 })
      .not.toBe(before);

    // The re-render stayed muted: css-doodle regenerates the shadow root, and
    // the mute is re-asserted after it.
    expect(await maxCellTransitionMs(page, selector)).toBe(0);
  });

  test('redrawInterval is skipped under prefers-reduced-motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/package-test');

    const doodle = page.locator('#redraw-interval [data-pattern="radius"] css-doodle');
    await expect(doodle).toBeAttached({ timeout: 15000 });
    await doodle.scrollIntoViewIfNeeded();

    const pinned = await doodle.getAttribute('data-seed');
    await page.waitForTimeout(1500);
    expect(await doodle.getAttribute('data-seed')).toBe(pinned);
  });
});
