import { test, expect } from '@playwright/test';

test.describe('Tabbied site', () => {
  test('home page renders the hero and links into the gallery', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Tabbied/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Free patterns and\s+websites/ })
    ).toBeVisible();

    // Every figure is derived from the catalog at build time (lib/siteCounts),
    // so this asserts the shape rather than the value.
    const patternsStat = page.getByRole('link', { name: /^\d+ Patterns$/ });
    await expect(patternsStat).toBeVisible();
    const patternCount = Number(
      (await patternsStat.textContent())?.match(/\d+/)?.[0]
    );
    expect(patternCount).toBeGreaterThan(1);

    // The same number appears in the hero sentence and on "View all".
    await expect(
      page.getByText(
        new RegExp(`growing library of ${patternCount} customizable patterns`)
      )
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: `View all ${patternCount}` })
    ).toBeVisible();

    await page.getByRole('link', { name: 'Make your pattern' }).click();

    await expect(page).toHaveURL(/\/patterns/);
    await expect(
      page.getByRole('heading', { name: 'Pick a pattern' })
    ).toBeVisible();
  });

  test('the homepage animates only when motion is welcome', async ({
    page,
  }) => {
    // The hero grid, the marquees and the orbiting squares all run on their own
    // clocks; under `prefers-reduced-motion` every one of them has to stop, not
    // merely slow down.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const rail = page.locator('[class*="HomeTemplates-module"][class*="track"]');
    await expect(rail.first()).toHaveCSS('animation-name', 'none');

    const before = await page
      .locator('[class*="HomeHero-module"][class*="skylineCell"]')
      .first()
      .getAttribute('style');
    await page.waitForTimeout(3000);
    const after = await page
      .locator('[class*="HomeHero-module"][class*="skylineCell"]')
      .first()
      .getAttribute('style');

    expect(after).toBe(before);
  });

  test('patterns gallery links into a pattern editor', async ({
    page,
  }) => {
    await page.goto('/patterns');

    await page.getByRole('heading', { name: 'Radius' }).click();

    await page.waitForURL(/\/patterns\/radius/, { timeout: 15000 });
    await expect(
      page.getByRole('link', { name: 'Back to gallery' })
    ).toBeVisible({ timeout: 15000 });
  });

  test('gallery pagination is reflected in the URL and survives reload', async ({
    page,
  }) => {
    await page.goto('/patterns');

    // Page 2: the URL gains ?page=2, the grid shows a new design, and the
    // page lands at the top with its heading focused.
    const firstCard = page.locator('main a[href^="/patterns/"] h2').first();
    const beforeName = await firstCard.textContent();
    const two = page.getByRole('link', { name: 'Page 2', exact: true });
    await expect(two).toHaveAttribute('href', '/patterns/?page=2');
    await two.scrollIntoViewIfNeeded();
    await two.click();
    await expect(page).toHaveURL(/[?&]page=2/);
    await expect(firstCard).not.toHaveText(beforeName ?? '');
    await expect(page.getByRole('heading', { level: 1, name: 'Pick a pattern' })).toBeFocused();
    await expect(page.getByRole('heading', { level: 1, name: 'Pick a pattern' })).toBeInViewport();
    const page2Name = await firstCard.textContent();

    // A reload lands directly on page 2 (the URL is the source of truth).
    await page.reload();
    await expect(page).toHaveURL(/[?&]page=2/);
    await expect(firstCard).toHaveText(page2Name ?? '');

    // Back returns to page 1 (the page param is dropped).
    await page.goBack();
    await expect(page).toHaveURL(/\/patterns\/?$/);
    await expect(firstCard).toHaveText(beforeName ?? '');
  });

  test('the gallery grid reflows when the window narrows', async ({ page }) => {
    // Guards the minmax(0, 1fr) tracks. With a bare `1fr`, a scrolled-past
    // `content-visibility: auto` card floors its track at the size it last
    // rendered at, and a narrowed window overflows until a reload.
    await page.setViewportSize({ width: 1640, height: 1000 });
    await page.goto('/patterns');
    await page
      .locator('main css-doodle')
      .first()
      .waitFor({ state: 'attached', timeout: 15000 });

    // Scroll far enough that lower cards render and are then skipped again.
    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(500);
    await page.mouse.wheel(0, -1600);
    await page.waitForTimeout(500);

    // The grid is the div whose direct children are the card links.
    const grid = page
      .locator('main div')
      .filter({ has: page.locator('> a h2') })
      .first();
    await expect(grid).toBeVisible();

    for (const width of [1400, 1200, 1000]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.waitForTimeout(200);
    }

    // No horizontal overflow in the grid, and none on the document either.
    await expect
      .poll(
        () => grid.evaluate((el) => el.scrollWidth - el.clientWidth),
        { timeout: 5000 }
      )
      .toBe(0);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      )
    ).toBe(0);
  });

  test('the gallery sidebar stays fixed while the grid scrolls', async ({
    page,
  }) => {
    await page.goto('/patterns');
    await page
      .locator('main css-doodle')
      .first()
      .waitFor({ state: 'attached', timeout: 15000 });

    // The rail is fixed to the window, so scrolling the grid leaves its pinned
    // "Mixed" row in place. No "New palette" button: the pencil on a row makes
    // one.
    const random = page
      .locator('aside')
      .getByRole('button', { name: /^Mixed/ });
    await expect(page.locator('aside').getByRole('button', { name: /New Palette/ })).toHaveCount(0);
    const before = await random.boundingBox();
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(300);
    const after = await random.boundingBox();

    expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThan(4);
  });

  test('the palette rail shows a scrollable, infinite palette list', async ({
    page,
  }) => {
    await page.goto('/patterns');
    await page
      .locator('main css-doodle')
      .first()
      .waitFor({ state: 'attached', timeout: 15000 });

    // The rail is a bounded scroll container listing every palette, loading
    // more rows as it scrolls.
    const findScroller = () =>
      page.evaluate(() => {
        const el = [...document.querySelectorAll('aside *')].find(
          (e) =>
            getComputedStyle(e).overflowY === 'auto' &&
            e.scrollHeight > e.clientHeight + 8
        );
        return el ? (el as HTMLElement).querySelectorAll('button').length : 0;
      });

    const rows0 = await findScroller();
    expect(rows0).toBeGreaterThan(0);

    // Scrolling to the bottom loads more rows (infinite scroll).
    await page.evaluate(() => {
      const el = [...document.querySelectorAll('aside *')].find(
        (e) =>
          getComputedStyle(e).overflowY === 'auto' &&
          e.scrollHeight > e.clientHeight + 8
      );
      if (el) (el as HTMLElement).scrollTop = (el as HTMLElement).scrollHeight;
    });

    await expect.poll(findScroller).toBeGreaterThan(rows0);
  });

  test('"Back to gallery" returns to the previous scroll position', async ({
    page,
  }) => {
    await page.goto('/patterns');
    // Wait for hydration (a live thumbnail mounts) so the gallery's scroll
    // listener is attached before we scroll.
    await page
      .locator('main css-doodle')
      .first()
      .waitFor({ state: 'attached', timeout: 15000 });

    // The gallery is paginated, so scroll as far as this page allows.
    const maxScroll = await page.evaluate(() => {
      const el = document.scrollingElement!;
      const max = el.scrollHeight - window.innerHeight;
      window.scrollTo(0, max);
      return max;
    });
    test.skip(maxScroll < 40, 'gallery too short to scroll on this viewport');

    // The gallery persists its scroll position so it can be restored on return.
    await expect
      .poll(() =>
        page.evaluate(() =>
          Number(sessionStorage.getItem('tabbied:gallery-scroll-y'))
        )
      )
      .toBeGreaterThan(20);
    const before = await page.evaluate(() => window.scrollY);

    // Open a card fully in view, so Playwright does not auto-scroll to click it.
    const href = await page.evaluate(() => {
      const inView = [
        ...document.querySelectorAll('main a[href^="/patterns/"]'),
      ].find((el) => {
        const r = el.getBoundingClientRect();
        return r.top > 60 && r.bottom < window.innerHeight - 60;
      });
      return inView?.getAttribute('href') ?? null;
    });
    expect(href, 'expected a gallery card link within the viewport').not.toBeNull();
    await page.locator(`main a[href="${href}"]`).click();

    await page.getByRole('link', { name: 'Back to gallery' }).click();
    await expect(page).toHaveURL(/\/patterns\/?$/);

    // The gallery is restored to (approximately) where it was left.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(before - 80);
  });

  test('patterns gallery renders live css-doodle thumbnails', async ({
    page,
  }) => {
    await page.goto('/patterns');

    // Thumbnails are live <TabbiedPattern fit="cover">s: one must mount and
    // actually paint cells, not an empty grid.
    await page.waitForFunction(() => !!window.customElements.get('css-doodle'));
    await expect(
      page.locator('[data-pattern="radius"] css-doodle')
    ).toBeAttached({
      timeout: 15000,
    });

    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const el = document.querySelector(
              '[data-pattern="radius"] css-doodle'
            );
            if (!el || !el.shadowRoot) return 0;
            return [...el.shadowRoot.querySelectorAll('cssd-cell')].filter(
              (cell) => {
                const bg = getComputedStyle(cell).backgroundColor;
                return bg && bg !== 'rgba(0, 0, 0, 0)';
              }
            ).length;
          }),
        { timeout: 10000 }
      )
      .toBeGreaterThan(1);
  });

  test('pattern editor renders the css-doodle and controls', async ({
    page,
  }) => {
    await page.goto('/patterns/radius');

    // The css-doodle web component must register and mount on the client.
    await page.waitForFunction(() => !!window.customElements.get('css-doodle'));
    await expect(
      page.locator('[data-pattern="radius"] css-doodle')
    ).toBeAttached();

    await expect(
      page.getByRole('button', { name: 'Shuffle', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Export' })
    ).toBeVisible();

    // Option controls coming from the pattern definition: the grid is a
    // "Grid density" slider, 0 to 1, read out as that number; the grid the
    // plate resolves to at that cell size is named in the caption. The count
    // depends on the viewport, so only its shape is asserted there.
    await expect(page.getByText('Grid density')).toBeVisible();
    const slider = page.getByRole('slider', { name: 'Grid density' });
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('aria-valuenow', '0.5');
    await expect(page.getByText('0.50', { exact: true })).toBeVisible();
    await expect(page.locator('figcaption').getByText(/\d+\u00D7\d+ grid/)).toBeVisible();

    // The grid must paint its cells: css-doodle >= 0.5 reinterpreted
    // `@random(1)`, which collapses the default pattern to one shape unshimmed.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const el = document.querySelector(
              '[data-pattern="radius"] css-doodle'
            );
            if (!el || !el.shadowRoot) return 0;
            return [...el.shadowRoot.querySelectorAll('cssd-cell')].filter(
              (cell) => {
                const bg = getComputedStyle(cell).backgroundColor;
                return bg && bg !== 'rgba(0, 0, 0, 0)';
              }
            ).length;
          }),
        { timeout: 10000 }
      )
      .toBeGreaterThan(1);
  });

  test('changing an option syncs to the URL query (next/navigation)', async ({
    page,
  }) => {
    // Seed query param triggers the URL <-> state synchronization.
    await page.goto('/patterns/radius?seed=0000');

    // Wait until state has been written back into the URL: the density, not
    // the grid, which is derived from the viewer's plate and never linked.
    await expect(page).toHaveURL(/density=0\.5/);
    await expect(page).not.toHaveURL(/grid=/);

    // One step down the density slider is 0.05 coarser.
    await page.getByRole('slider', { name: 'Grid density' }).focus();
    await page.keyboard.press('ArrowLeft');

    await expect(page).toHaveURL(/density=0\.45/);
    await expect(page.getByRole('slider', { name: 'Grid density' })).toHaveAttribute(
      'aria-valuenow',
      '0.45'
    );
    await expect(page.getByText('0.45', { exact: true })).toBeVisible();
  });

  test('the density slider sets the cell size, and the grid follows the plate', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=0000');

    const readout = page.locator('figcaption').getByText(/\d+\u00D7\d+ grid/);
    await expect(readout).toBeVisible();
    const cells = (text: string) => {
      const match = /(\d+)\u00D7(\d+) grid/.exec(text);

      return match ? Number(match[1]) * Number(match[2]) : 0;
    };
    const atHalf = cells(await readout.innerText());

    // The coarsest stop is the 180px cell, so a 2:3 plate that fits the
    // viewport holds far fewer cells than it does at 0.5; the finest is the
    // 36px cell, so it holds more. The mounted doodle follows the readout.
    const slider = page.getByRole('slider', { name: 'Grid density' });
    await slider.focus();
    await page.keyboard.press('Home');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await expect(page).toHaveURL(/density=0(&|$)/);
    await expect.poll(async () => cells(await readout.innerText())).toBeLessThan(atHalf);

    await page.keyboard.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '1');
    await expect.poll(async () => cells(await readout.innerText())).toBeGreaterThan(atHalf);

    const finest = cells(await readout.innerText());
    await expect
      .poll(() =>
        page.evaluate(() => {
          const el = document.querySelector('[data-pattern="radius"] css-doodle');

          return el?.shadowRoot?.querySelectorAll('cssd-cell').length ?? 0;
        })
      )
      .toBe(finest);
  });

  test('changing the aspect ratio remaps the grid to keep square cells', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=0000');

    // Default portrait ratio, at the default density.
    await expect(page).toHaveURL(/aspectRatio=2%3A3/);
    await expect(page).toHaveURL(/density=0\.5/);

    // Switch to a square canvas: the grid re-derives from the square plate
    // at the same cell size, so it comes out square, and the density is
    // untouched. Aspect ratios are icon tiles named by their id.
    await page.getByRole('button', { name: '1:1' }).click();

    await expect(page).toHaveURL(/aspectRatio=1%3A1/);
    await expect(page).toHaveURL(/density=0\.5/);
    await expect(page.locator('figcaption').getByText(/(?<!\d)(\d+)\u00D7\1 grid/)).toBeVisible();
  });

  test('palette colors can be removed and re-added within the pattern bounds', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=0000');

    // Radius opens at its default of 6 colors, which is also its maximum, so
    // only the remove button starts enabled. (Each color slot is a native
    // <input type="color"> swatch - background plus inks - so count those.)
    await expect(page.locator('input[type="color"]')).toHaveCount(6, {
      timeout: 15000,
    });
    const addButton = page.getByRole('button', { name: 'Add color' });
    const removeButton = page.getByRole('button', { name: 'Remove color' });
    await expect(addButton).toBeDisabled();

    // Removing a color drops a swatch and the URL carries one fewer palette
    // param (the param count doubles as the color count on shared links).
    await removeButton.click();
    await expect(page.locator('input[type="color"]')).toHaveCount(5);
    await expect
      .poll(() => new URL(page.url()).searchParams.getAll('palette').length)
      .toBe(5);
    await expect(addButton).toBeEnabled();

    // Re-adding restores the slot.
    await addButton.click();
    await expect(page.locator('input[type="color"]')).toHaveCount(6);
    await expect(addButton).toBeDisabled();
  });

  test('a background image sits behind the pattern, and leaves with the color back', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=0000');

    await expect(page.locator('input[type="color"]')).toHaveCount(6, { timeout: 15000 });
    const stageFrame = page.locator('figure > div').first();

    // A one-pixel PNG is picture enough: what matters is that choosing it
    // makes the ground transparent (so it can show through) and puts it on
    // the stage behind the pattern.
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.getByLabel('Background image').setInputFiles({
      name: 'ground.png',
      mimeType: 'image/png',
      buffer: png,
    });

    await expect
      .poll(() => stageFrame.evaluate((el) => getComputedStyle(el).backgroundImage))
      .toContain('blob:');
    // The swatch and the transparent toggle stand down while a picture is set.
    await expect(page.locator('input[type="color"]')).toHaveCount(5);
    // The control that clears it is an X beside the caption, named in full.
    const removeImage = page.getByRole('button', {
      name: 'Remove the background image',
    });
    await expect(removeImage).toBeVisible();
    await expect
      .poll(() => new URL(page.url()).searchParams.getAll('palette')[0])
      .toMatch(/00$/);

    // Removing it brings the color back exactly as it was.
    await removeImage.click();
    await expect(page.locator('input[type="color"]')).toHaveCount(6);
    await expect
      .poll(() => stageFrame.evaluate((el) => getComputedStyle(el).backgroundImage))
      .toBe('none');
    await expect
      .poll(() => new URL(page.url()).searchParams.getAll('palette')[0])
      .not.toMatch(/00$/);
  });

  test('slider controls display their current value', async ({ page }) => {
    await page.goto('/patterns/radius?seed=0000');

    // Radius opens at frequency 1, shown as "1.0" beside the slider.
    await expect(page.getByText('Frequency')).toBeVisible();
    await expect(page.getByText('1.0', { exact: true })).toBeVisible();
  });

  test('gallery cards link with a seed so edits sync to the URL', async ({
    page,
  }) => {
    await page.goto('/patterns');

    // Without a query param on the link, the editor never mirrors state into
    // the URL, so customizations made after entering from the gallery would
    // not survive a refresh or be shareable.
    await page.locator('a[href*="/patterns/radius"]').first().click();

    // The static export uses trailing slashes, so match /patterns/radius/?seed=...
    await page.waitForURL(/\/patterns\/radius\/?\?/, { timeout: 15000 });
    await expect(page).toHaveURL(/seed=0000/);
    // A first visit is the random spread, so the card's link also carries
    // the palette it was wearing, and the editor opens in it.
    expect(new URL(page.url()).searchParams.getAll('palette').length).toBeGreaterThan(1);

    await page.getByRole('slider', { name: 'Grid density' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/density=0\.55/);
  });

  test('editor opens directly in the state described by a shared URL', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=ZZZZ&density=0.75&aspectRatio=1%3A1');

    // Initial state comes from the URL (not corrected after mount), so the
    // density slider must already sit on the linked value.
    await expect(page.getByRole('slider', { name: 'Grid density' })).toHaveAttribute(
      'aria-valuenow',
      '0.75'
    );
    await expect(page.getByRole('button', { name: '1:1' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('an older link naming a grid opens at the density that grid had', async ({
    page,
  }) => {
    // llms.txt told agents to write `grid=CxR` links, so one is read as the
    // density whose cell that grid had on the original plate (9 along the
    // long edge is 0.5), and the URL is rewritten to the form written now.
    await page.goto('/patterns/radius?seed=ZZZZ&grid=9x9&aspectRatio=1%3A1');

    await expect(page.getByRole('slider', { name: 'Grid density' })).toHaveAttribute(
      'aria-valuenow',
      '0.5'
    );
    await expect(page).toHaveURL(/density=0\.5/);
    await expect(page).toHaveURL(/aspectRatio=1%3A1/);
    await expect(page).not.toHaveURL(/grid=/);
  });
});

test.describe('Tabbied site (mobile viewport)', () => {
  test.use({ viewport: { width: 390, height: 664 } });

  test('the editor header shuffles the layout and drops the export menu (7d)', async ({
    page,
  }) => {
    await page.goto('/patterns/radius?seed=0000');

    // The compact header is two circles: Shuffle, which draws the layout
    // again and nothing else, and Export.
    const shuffleBtn = page.getByRole('button', { name: 'Shuffle', exact: true });
    const exportBtn = page.getByRole('button', { name: 'Export', exact: true });
    await expect(shuffleBtn).toBeVisible({ timeout: 15000 });
    await expect(exportBtn).toBeVisible();

    await shuffleBtn.click();
    await expect(page).not.toHaveURL(/seed=0000/);

    // Export is a dropdown under its button, as on the desktop, not a sheet
    // that replaces the rail.
    await exportBtn.click();
    await expect(
      page.getByRole('menuitem', { name: 'Copy React component' })
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toHaveCount(0);

    // The plate's caption is hidden on the band; the name is in the heading
    // for assistive tech. The rail is still there under the band.
    await expect(page.locator('figcaption')).toBeHidden();
    await expect(page.getByRole('heading', { name: 'Colors' })).toBeVisible();

    // The palettes are a strip with "View all" over it, which opens every
    // palette in a sheet over the editor.
    await expect(page.getByRole('textbox', { name: 'Search palettes' })).toHaveCount(0);
    await page.getByRole('button', { name: 'View all' }).click();
    const close = page.getByRole('button', { name: 'Close palette browser' });
    await expect(close).toBeVisible();
    await close.click();
    await expect(close).toHaveCount(0);
  });

  test('the gallery shows palettes as a horizontal chip shelf (7a)', async ({
    page,
  }) => {
    await page.goto('/patterns');

    // Below the two-column breakpoint the rail becomes a horizontal chip
    // shelf, "Mixed" first, with a trailing "All" browser pill. No "New
    // palette" anywhere.
    await expect(page.locator('aside')).toBeHidden();
    await expect(
      page.getByRole('button', { name: /^Mixed/ })
    ).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'New Palette' })).toHaveCount(0);

    const allPill = page.getByRole('button', { name: /^All/ });
    await expect(allPill).toBeVisible();

    // Tapping "All" swaps the shelf for the embedded palette browser.
    await allPill.click();
    await expect(
      page.getByRole('button', { name: 'Close palette browser' })
    ).toBeVisible();
  });

  test('the homepage menu holds the destinations and the way in on mobile', async ({
    page,
  }) => {
    await page.goto('/');

    // Below 768px the inline nav is display:none and the hamburger opens a
    // menu of the three destinations and Sign in. GitHub and Docs are in the
    // footer, not up here.
    const trigger = page.getByRole('button', { name: 'Menu' });
    await expect(trigger).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toBeHidden();

    await trigger.click();

    const menu = page.getByRole('menu');
    await expect(menu.getByRole('menuitem', { name: 'Home' })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: 'Patterns' })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: 'Sign in' })).toHaveAttribute(
      'href',
      /\/sign-in/
    );

    await menu.getByRole('menuitem', { name: 'Websites' }).click();
    await expect(page).toHaveURL(/\/templates/);
  });

  test('the content pages draw the same menu on mobile', async ({ page }) => {
    // The shared masthead is exercised on a page in the light tone.
    await page.goto('/privacy-policy');

    await page.getByRole('button', { name: 'Menu' }).click();

    const menu = page.getByRole('menu');
    await expect(menu.getByRole('menuitem', { name: 'Websites' })).toBeVisible();

    // Choosing a destination navigates and closes the menu.
    await menu.getByRole('menuitem', { name: 'Patterns' }).click();
    await expect(page).toHaveURL(/\/patterns/);
    await expect(page.getByRole('menu')).toHaveCount(0);
  });
});

test.describe('Studio', () => {
  const BICYCLES = 'Handbuilt bicycle frames for road cyclists, bold and industrial.';

  test('matches a description to three real template sites', async ({
    page,
  }) => {
    await page.goto('/studio');

    // Signed out, the library match is the path - it needs no account and no
    // Worker, which is what this spec runs against (`serve out`).
    const match = page.getByRole('button', { name: 'Match from the library' });
    await expect(match).toBeDisabled();

    await page.getByLabel('Your business').fill(BICYCLES);
    await expect(match).toBeEnabled();

    // Generating is the other button, and it is a session away - signed out it
    // sends you to sign in rather than spending anything.
    await expect(
      page.getByRole('button', { name: 'Generate websites' })
    ).toBeEnabled();

    await match.click();

    await page.waitForURL(/\/studio\/results/, { timeout: 15000 });

    const cards = page.locator('article');
    await expect(cards).toHaveCount(3);

    // The whole point of matching against the library rather than generating:
    // every card has to lead somewhere that already exists.
    const previews = await page
      .getByRole('link', { name: 'Preview' })
      .evaluateAll((links) => links.map((l) => l.getAttribute('href')));

    expect(previews).toHaveLength(3);

    for (const href of previews) {
      expect(href).toMatch(/^\/templates\/[a-z0-9-]+\/site\/$/);
      const response = await page.request.get(href);
      expect(response.status(), `${href} should be a real page`).toBe(200);
    }

    // Download points at the zip the packaging step writes for that same site.
    const downloads = await page
      .getByRole('link', { name: 'Download' })
      .evaluateAll((links) => links.map((l) => l.getAttribute('href')));

    expect(downloads).toEqual(
      previews.map((href) => `/downloads/${href.split('/')[2]}-html.zip`)
    );
  });

  test('the same description always gives the same three', async ({ page }) => {
    // The match is a pure function of the query string, which is what makes a
    // results link worth sharing.
    const names = async (description: string) => {
      await page.goto(`/studio/results/?q=${encodeURIComponent(description)}`);
      return page.locator('article h2').allTextContents();
    };

    const first = await names(BICYCLES);
    const again = await names(BICYCLES);
    expect(again).toEqual(first);

    const other = await names(
      'A quiet, elegant perfume house. Monochrome and restrained.'
    );
    expect(other).not.toEqual(first);
  });
});

test.describe('Template preview and customize', () => {
  test('a template is framed with one thing to do with it, behind a sign-in', async ({ page }) => {
    // The frame loads the live template page, whose typekit and Google Fonts
    // stylesheets can hang in a sandbox with no outbound network, and `load`
    // would wait for them through the iframe. The bar is what is asserted.
    await page.goto('/templates/verdant/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('iframe')).toHaveAttribute('src', '/templates/verdant/site/');
    // next/link writes the export's trailing slash.
    await expect(page.getByRole('link', { name: 'All templates' })).toHaveAttribute('href', '/templates/');

    // Signed out (no Worker behind the export), the one button asks for a
    // sign-in first, with the customizer as the way back; Customize and the
    // downloads are behind it, not beside it.
    await expect(page.getByRole('link', { name: 'Customize' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Download' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Use this template' }).click();

    const card = page.getByRole('dialog', { name: 'Sign in to use this template' });
    await expect(card).toBeVisible();
    await expect(card.getByRole('link', { name: 'Log in' })).toHaveAttribute(
      'href',
      /\/sign-in\/?\?next=%2Fstudio%2Fcustomize%2F%3Fslug%3Dverdant/
    );
    await expect(card.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      /\/sign-up\/?\?next=%2Fstudio%2Fcustomize%2F%3Fslug%3Dverdant/
    );
  });

  test('the gallery leads to the framed preview, and a visitor is asked to sign in', async ({ page }) => {
    await page.goto('/templates');

    const card = page.locator('a[href="/templates/verdant/"]').first();
    await expect(card).toBeAttached();

    // The artboard's guest footer: "HTML . React" and "Sign in to use". The
    // zips and the customizer are behind a sign-in, and a template spends
    // one of the person's five when it is first taken.
    await expect(page.getByRole('link', { name: 'Sign in to use' }).first()).toBeVisible();
    await expect(page.locator('a[href^="/downloads/"]')).toHaveCount(0);
    await expect(page.locator('a[href="/studio/customize/?slug=verdant"]')).toHaveCount(0);
  });

  test('signed in, the menu says what taking a template costs and asks first', async ({ page }) => {
    await page.route('**/api/auth/get-session', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          session: { id: 's', userId: 'u1', expiresAt: '2030-01-01T00:00:00Z' },
          user: { id: 'u1', name: 'Pat', email: 'pat@example.com', emailVerified: true, role: null },
        }),
      })
    );
    await page.route('**/api/account/templates', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          used: 4,
          total: 5,
          left: 1,
          chosen: ['solstice', 'werkraum', 'cobalt-works', 'mistral-cycles'].map((slug) => ({ slug, chosenAt: '2026-09-01T00:00:00Z', site: null })),
          request: null,
        }),
      })
    );
    await page.goto('/templates/verdant/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Use this template' }).click();
    const menu = page.getByRole('menu');
    await expect(menu.getByText('4 of 5 templates chosen')).toBeVisible();
    await expect(menu.getByText(/uses your last template/)).toBeVisible();

    // A download of a template not yet theirs goes through the dialog.
    await menu.getByRole('menuitem', { name: /Static HTML/ }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('This uses your last template.', { exact: false })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Use template & download' })).toBeVisible();
  });

  test('customizing while signed out goes to sign-in with the way back', async ({ page }) => {
    // No Worker behind the export: the session read fails and reads as
    // signed out, which is the case a fresh visitor is in.
    await page.goto('/studio/customize/?slug=verdant');

    await page.waitForURL(/\/sign-in\/?\?next=/, { timeout: 15000 });
    expect(decodeURIComponent(new URL(page.url()).searchParams.get('next') ?? '')).toBe(
      '/studio/customize/?slug=verdant'
    );
  });
});

test.describe('Shared site header', () => {
  test('carries the three destinations and marks the current one', async ({
    page,
  }) => {
    await page.goto('/templates');

    // Home / Patterns / Websites in the middle, Sign in on the right. GitHub
    // and Docs are in the footer, not the bar.
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Patterns' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tabbied on GitHub' })).toHaveCount(0);

    // At desktop widths the inline nav replaces the hamburger entirely.
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();

    // "Websites" is the current section; it is flagged for assistive tech.
    await expect(nav.getByRole('link', { name: 'Websites' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(nav.getByRole('link', { name: 'Patterns' })).not.toHaveAttribute(
      'aria-current',
      'page'
    );

    // The content pages draw the same bar in ink, and a page with no matching
    // destination highlights nothing.
    await page.goto('/docs/react');
    await expect(nav.getByRole('link', { name: 'Patterns' })).toBeVisible();
    await expect(page.locator('header a[aria-current="page"]')).toHaveCount(0);
  });

  test('a browser that was signed in draws a placeholder, not Sign in, until the session answers', async ({
    page,
  }) => {
    await page.addInitScript(() => window.localStorage.setItem('tabbied:signed-in', '1'));
    // Hold the session back, then answer that nobody is signed in.
    let answer: (() => void) | null = null;
    await page.route('**/api/auth/get-session', async (route) => {
      await new Promise<void>((resolve) => {
        answer = resolve;
      });
      await route.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
    });

    await page.goto('/templates');
    const bar = page.locator('header[data-tone]').first();
    await expect(bar).toHaveAttribute('data-session', 'likely');
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toBeHidden();

    await expect.poll(() => answer !== null).toBe(true);
    answer!();
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toBeVisible();
    await expect(bar).not.toHaveAttribute('data-session', 'likely');
    // The wrong hint is cleared, so the next page draws Sign in at once.
    expect(await page.evaluate(() => window.localStorage.getItem('tabbied:signed-in'))).toBeNull();
  });

  test('the gallery pins the bar over its own rail', async ({ page }) => {
    await page.goto('/patterns');

    // The bar is the shared one, and the rail beside it carries the palette
    // chrome.
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Patterns' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(page.getByRole('heading', { name: 'Pick a pattern' })).toBeVisible();
    await expect(page.locator('aside')).toBeVisible();
  });

  test('is not used on the individual pattern editor', async ({ page }) => {
    await page.goto('/patterns/radius');

    // The editor keeps its own header...
    await expect(
      page.getByRole('link', { name: 'Back to gallery' })
    ).toBeVisible({ timeout: 15000 });

    // ...and never renders the shared site nav.
    await expect(page.getByRole('navigation', { name: 'Main' })).toHaveCount(0);
  });
});

test.describe('Share cards and canonical URLs', () => {
  const head = async (page: import('@playwright/test').Page, path: string) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    return page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? null,
      card: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') ?? null,
      title: document.title,
    }));
  };

  test('the site\'s pages carry them, and a template page does not', async ({ page }) => {
    expect(await head(page, '/')).toMatchObject({
      canonical: 'https://tabbied.com/',
      image: 'https://tabbied.com/og.png',
      card: 'summary_large_image',
    });
    expect(await head(page, '/patterns/radius/')).toMatchObject({
      canonical: 'https://tabbied.com/patterns/radius/',
      image: 'https://tabbied.com/previews/radius.webp',
      title: 'Customize Radius - Tabbied',
    });
    expect(await head(page, '/templates/verdant/')).toMatchObject({
      canonical: 'https://tabbied.com/templates/verdant/',
    });
    expect((await head(page, '/patterns/')).title).toBe('Pick a pattern - Tabbied');

    // The template page is what the downloads are made from: tabbied.com's
    // card and canonical would ride into every site built on it.
    expect(await head(page, '/templates/verdant/site/')).toMatchObject({ canonical: null, image: null, card: null });
  });
});

test.describe('React component docs page', () => {
  test('documents the component with live examples', async ({ page }) => {
    await page.goto('/docs/react');

    await expect(page.getByText('npm install tabbied')).toBeVisible();

    // The examples render real patterns through the package component, so the
    // custom element must register and a doodle mount.
    await page.waitForFunction(() => !!window.customElements.get('css-doodle'));
    await expect(
      page.locator('[data-pattern="radius"] css-doodle').first()
    ).toBeAttached({ timeout: 15000 });
  });
});
