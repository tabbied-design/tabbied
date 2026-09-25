// The customizer: a site's latest revision, on its template.
//
// Same seam as e2e/studio-preview.spec.ts, one document up: a stored
// *revision* (every text slot) lands on the packaged page, the owner changes
// its colors and patterns through the engine live, and the page says what it
// knows about the document's state.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const SLUG = 'verdant';

const REQUIRED = [
  path.join(REPO_ROOT, 'out', 'studio', 'site', 'index.html'),
  path.join(REPO_ROOT, 'out', 'downloads', SLUG, 'index.html'),
  path.join(REPO_ROOT, 'out', 'studio', 'preview-runtime.js'),
  path.join(REPO_ROOT, 'out', 'editable', `${SLUG}.json`),
];

const siteDocument = (overrides: Record<string, unknown> = {}) => ({
  id: 'e2esite',
  mine: false,
  slug: SLUG,
  templateName: 'Verdant',
  title: 'Ye Joo Park',
  stance: 'Warmly Grounded',
  palette: ['#F7F4EF', '#7A3B1F', '#C98B5E', '#2E2018'],
  revisions: 1,
  createdAt: '2026-09-02T00:00:00Z',
  updatedAt: '2026-09-02T00:00:00Z',
  generationId: 'e2egen',
  directionIndex: 0,
  description: 'A realtor in Champaign, IL.',
  specVersion: 1,
  templateChanged: false,
  latest: {
    n: 1,
    source: 'ai',
    model: 'test',
    instruction: null,
    createdAt: '2026-09-02T00:00:00Z',
    edits: {
      specVersion: 1,
      slug: SLUG,
      edits: {
        text: {
          'brand.name': 'Ye Joo Park',
          'hero.title': 'Property, {em}made personal{/em}.',
          'hero.lede': 'Residential, commercial, and property management.',
          // Below the masthead - what the three-string preview cannot reach.
          'nav.0': 'Buy',
          'cta.primary': 'Book a valuation',
        },
        palette: ['#F7F4EF', '#7A3B1F', '#C98B5E', '#2E2018'],
      },
    },
  },
  ...overrides,
});

test.describe('studio site', () => {
  test.skip(
    REQUIRED.some((file) => !fs.existsSync(file)),
    'run `npm run build` first - needs the exported route, the packaged template and the preview runtime'
  );

  test('renders the latest revision, masthead and below', async ({ page }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(siteDocument()) })
    );

    await page.goto('/studio/site/?id=e2esite');

    const frame = page.frameLocator('iframe');
    await expect(frame.locator('[data-edit="brand.name"]').first()).toHaveText('Ye Joo Park', {
      timeout: 15_000,
    });
    await expect(frame.locator('[data-edit="hero.title"]')).toHaveText('Property, made personal.');
    await expect(frame.locator('[data-edit="hero.title"] em')).toHaveText('made personal');
    await expect(frame.locator('[data-edit="cta.primary"]').first()).toHaveText('Book a valuation');
    await expect(frame.locator('[data-edit="nav.0"]').first()).toHaveText('Buy');

    // The chrome names the site and its template; a first revision is not
    // numbered, since there is nothing to have gone back from.
    await expect(page.getByText('Ye Joo Park on Verdant')).toBeVisible();
    await expect(page.getByText(/revision \d/)).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveCount(0);

    // The document says `mine: false`: a visitor by link gets the page and no
    // editor.
    await expect(page.getByRole('complementary', { name: 'Customize this site' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Save/ })).toHaveCount(0);
  });

  test('says when the document is only the brand copy, and when the template moved', async ({
    page,
  }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          siteDocument({
            templateChanged: true,
            latest: { ...siteDocument().latest, source: 'fallback' },
          })
        ),
      })
    );

    await page.goto('/studio/site/?id=e2esite');

    await expect(page.getByText('only the brand name, headline and tagline')).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText('has been updated since this site was made')).toBeVisible();
  });

  test('the owner gets the customizer, and a color reaches the page live', async ({ page }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(siteDocument({ mine: true })),
      })
    );
    // Registered after, so it is tried first: the save, answered as revision 2.
    await page.route('**/api/studio/sites/e2esite/revisions', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ revision: 2 }),
      })
    );

    await page.goto('/studio/site/?id=e2esite');

    const frame = page.frameLocator('iframe');
    await expect(frame.locator('[data-edit="brand.name"]').first()).toHaveText('Ye Joo Park', {
      timeout: 15_000,
    });

    const rail = page.getByRole('complementary', { name: 'Customize this site' });
    await expect(rail).toBeVisible();

    // The first release changes colors and patterns; words and pictures are
    // named as not editable here, not offered and broken.
    await expect(rail.getByRole('tab', { name: 'Colors' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('region', { name: 'Ask for changes' })).toHaveCount(0);
    await rail.getByRole('tab', { name: 'Content' }).click();
    await expect(rail.getByText("can't be edited here yet")).toBeVisible();
    await rail.getByRole('tab', { name: 'Colors' }).click();

    const groundProperty = () =>
      frame
        .locator('[data-edit-root]')
        .evaluate((root) => (root as HTMLElement).style.getPropertyValue('--brand-0').trim().toLowerCase());

    // This document carries a palette of its own, which is none of the rows,
    // so nothing is lit until one is picked.
    const own = rail.getByRole('button', { name: 'Verdant (default)', exact: true });
    const cobalt = rail.getByRole('button', { name: 'Cobalt', exact: true });
    await expect(own).toHaveAttribute('aria-pressed', 'false');
    await expect(cobalt).toHaveAttribute('aria-pressed', 'false');

    // Picking a palette recolors the whole page: the ground lands on the
    // page's root as an inline property before anything is saved.
    await cobalt.click();
    await expect.poll(groundProperty).toBe('#0a1a3f');
    await expect(cobalt).toHaveAttribute('aria-pressed', 'true');

    // The per-role pickers did not go away with the list - the pencil on a row
    // opens them, seeded with the colors the page is wearing.
    await rail.getByRole('button', { name: 'Edit Cobalt' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByLabel('Ground value')).toHaveValue('#0a1a3f');
    await dialog.getByLabel('Ground value').fill('#0b2545');
    await dialog.getByRole('button', { name: 'Save changes' }).click();
    await expect.poll(groundProperty).toBe('#0b2545');

    // And the way back is the template's own row, not a reset of its own:
    // choosing it puts the template's palette back, not the document's.
    await expect(rail.getByRole('button', { name: 'Reset palette' })).toHaveCount(0);
    await own.click();
    await expect.poll(groundProperty).toBe('#f4faf0');
    await expect(own).toHaveAttribute('aria-pressed', 'true');

    await cobalt.click();
    await expect.poll(groundProperty).toBe('#0a1a3f');

    // Save is at the foot of the rail, beside the controls, not in the bar.
    const save = rail.getByRole('button', { name: 'Save changes' });
    await expect(save).toBeEnabled();
    await save.click();
    await expect(page.getByRole('button', { name: 'Saved to your custom sites' })).toBeVisible();
    await expect(page.getByText('(revision 2)')).toBeVisible();
  });

  test('shuffle swaps every pattern field, live, and reset puts the template back', async ({
    page,
  }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(siteDocument({ mine: true })),
      })
    );

    await page.goto('/studio/site/?id=e2esite');

    const frame = page.frameLocator('iframe');
    const hosts = frame.locator('[data-edit-pattern] [data-pattern]');
    await expect(hosts.first()).toBeAttached({ timeout: 15_000 });

    const before = await hosts.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('data-pattern'))
    );
    expect(before.length).toBeGreaterThan(0);

    const rail = page.getByRole('complementary', { name: 'Customize this site' });
    await rail.getByRole('tab', { name: 'Patterns' }).click();

    // One row per field, naming the design it draws now.
    await expect(rail.locator('li')).toHaveCount(before.length);

    await rail.getByRole('button', { name: 'Shuffle patterns' }).click();

    // Every host now names a different design, and it is mounted: the
    // runtime carries the whole catalog, so a swap is never a blank field.
    await expect
      .poll(() => hosts.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-pattern'))))
      .not.toEqual(before);
    const after = await hosts.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-pattern')));
    for (const [index, slug] of after.entries()) expect(slug).not.toBe(before[index]);
    await expect(frame.locator('[data-edit-pattern] css-doodle').first()).toBeAttached({
      timeout: 15_000,
    });

    await expect(rail.getByRole('button', { name: 'Save changes' })).toBeEnabled();

    // "Reset" appears beside Shuffle only once the page has changed.
    await rail.getByRole('button', { name: 'Reset patterns' }).click();
    await expect
      .poll(() => hosts.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-pattern'))))
      .toEqual(before);
  });

  test('one field can be given a design of its own, and put back on its own', async ({
    page,
  }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(siteDocument({ mine: true })),
      })
    );

    await page.goto('/studio/site/?id=e2esite');

    const frame = page.frameLocator('iframe');
    const hosts = frame.locator('[data-edit-pattern] [data-pattern]');
    await expect(hosts.first()).toBeAttached({ timeout: 15_000 });

    const before = await hosts.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('data-pattern'))
    );
    const target = before.includes('radius') ? 'lobe' : 'radius';
    const targetName = target === 'radius' ? 'Radius' : 'Lobe';

    const rail = page.getByRole('complementary', { name: 'Customize this site' });
    await rail.getByRole('tab', { name: 'Patterns' }).click();

    // Every row carries a pencil; none carries an undo until it has changed.
    const rows = rail.locator('li');
    await expect(rows).toHaveCount(before.length);
    await expect(rail.getByRole('button', { name: /^Change the .* pattern$/ })).toHaveCount(before.length);
    await expect(rail.getByRole('button', { name: /^Reset the .* pattern$/ })).toHaveCount(0);

    // The pencil opens the library for that field; a search narrows it and
    // choosing a design applies it to that field alone, live.
    await rows.first().getByRole('button', { name: /^Change the .* pattern$/ }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: /^Change the .* pattern$/ })).toBeVisible();
    await dialog.getByLabel('Search patterns').fill(targetName);
    await dialog.getByRole('button', { name: targetName, exact: true }).click();
    await expect(dialog).toHaveCount(0);

    await expect.poll(() => hosts.first().getAttribute('data-pattern')).toBe(target);
    const after = await hosts.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-pattern')));
    expect(after.slice(1)).toEqual(before.slice(1));
    await expect(rows.first().locator('img')).toHaveAttribute('src', `/previews/${target}.webp`);
    // And over it the design drawn live, in the colors the field wears.
    await expect(rows.first().locator('css-doodle')).toBeAttached({ timeout: 15_000 });
    await expect(rail.getByRole('button', { name: 'Save changes' })).toBeEnabled();

    // The changed row, and only that row, offers its own way back.
    const undo = rail.getByRole('button', { name: /^Reset the .* pattern$/ });
    await expect(undo).toHaveCount(1);
    await expect(rows.first().getByRole('button', { name: /^Reset the .* pattern$/ })).toBeVisible();
    await undo.click();

    await expect
      .poll(() => hosts.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-pattern'))))
      .toEqual(before);
    await expect(rail.getByRole('button', { name: /^Reset the .* pattern$/ })).toHaveCount(0);
  });

  test('customizing a template makes nothing until the first Save', async ({ page }) => {
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

    const made: unknown[] = [];
    await page.route('**/api/studio/sites', (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      made.push(route.request().postDataJSON());

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'e2edraft', source: 'template', revision: 1, title: 'Harbour Plants' }),
      });
    });

    await page.goto(`/studio/customize/?slug=${SLUG}`);

    const frame = page.frameLocator('iframe');
    await expect(frame.locator('[data-edit-root]')).toBeAttached({ timeout: 15_000 });

    // Opened, looked at, and not saved: nothing was made, and the page is
    // still the template's, named once rather than "Verdant on Verdant".
    const rail = page.getByRole('complementary', { name: 'Customize this site' });
    await expect(rail.getByRole('button', { name: 'No changes to save' })).toBeDisabled();
    await expect(page.getByText('Verdant', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Verdant on Verdant')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Back to the template' })).toHaveAttribute(
      'href',
      `/templates/${SLUG}/`
    );
    expect(made).toHaveLength(0);

    // A name and a palette, then Save: one site, with this document as its
    // first revision, and the page moves to the site's own address in place.
    await rail.getByLabel('Your site name').fill('Harbour Plants');
    await rail.getByLabel('Your site name').press('Enter');
    await rail.getByRole('button', { name: 'Cobalt', exact: true }).click();
    await rail.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.getByRole('button', { name: 'Saved to your custom sites' })).toBeVisible();
    expect(made).toHaveLength(1);
    expect(made[0]).toMatchObject({
      slug: SLUG,
      title: 'Harbour Plants',
      edits: { slug: SLUG, edits: { palette: expect.any(Array) } },
    });
    await expect(page).toHaveURL(/\/studio\/site\/\?id=e2edraft$/);
    await expect(page.getByText('Harbour Plants on Verdant')).toBeVisible();
    await expect(frame.locator('[data-edit-root]')).toBeAttached();
  });

  test('404 reads as a missing site, with a way back', async ({ page }) => {
    await page.route('**/api/studio/sites/**', (route) =>
      route.fulfill({ status: 404, contentType: 'application/json', body: '{"error":"Not found"}' })
    );

    await page.goto('/studio/site/?id=nope');

    await expect(page.getByText('does not exist or was removed')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Your templates', exact: true })).toBeVisible();
  });
});
