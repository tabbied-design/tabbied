// The account area and the admin tier, rendered against a stubbed session.
//
// Sessions come from /api/auth/get-session, which the export has no Worker
// behind here, so each test answers it itself: no session, a member's, an
// admin's. What is under test is the pages' own logic - who sees the nav,
// who sees "Not found", that the data lands in the tables - not better-auth.
// The account's templates come from /api/account/templates, stubbed the same
// way.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const REQUIRED = ['account', 'account/sites', 'account/usage', 'admin', 'admin/users', 'admin/requests'].map((route) =>
  path.join(REPO_ROOT, 'out', route, 'index.html')
);

const session = (role: string | null) => ({
  session: { id: 's', userId: 'u1', expiresAt: '2030-01-01T00:00:00Z' },
  user: { id: 'u1', name: 'Pat', email: 'pat@example.com', emailVerified: true, role },
});

const stubSession = (page: Page, role: string | null | 'none') =>
  page.route('**/api/auth/get-session', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: role === 'none' ? 'null' : JSON.stringify(session(role)) })
  );

test.describe('account and admin pages', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  // The layout links typekit and Google Fonts; with no outbound network those
  // requests hang until a proxy resets them and `load` waits on stylesheets.
  // Nothing under test needs the fonts, so they are refused outright.
  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('signed out, the account area asks you to sign in', async ({ page }) => {
    await stubSession(page, 'none');
    await page.goto('/account/sites/');
    // The heading uses a typographic apostrophe; match the words.
    await expect(page.getByRole('heading', { name: /signed out/ })).toBeVisible();
  });

  test('a member sees their sites and usage', async ({ page }) => {
    await stubSession(page, null);
    await page.route('**/api/studio/sites', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sites: [{ id: 'abc', slug: 'verdant', templateName: 'Verdant', title: 'Ye Joo Park', stance: 'Warmly Grounded', palette: ['#fff', '#000'], revisions: 3, createdAt: '2026-09-01T00:00:00Z', updatedAt: '2026-09-02T00:00:00Z' }],
        }),
      })
    );
    await page.route('**/api/account/usage', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resetsAt: '2026-09-03T00:00:00Z',
          usage: [{ endpoint: 'site', label: 'sites', used: 2, cap: 10 }],
          recent: [],
          downloads: { used: 4, cap: 30, resetsAt: '2026-10-01T00:00:00Z' },
        }),
      })
    );

    await page.goto('/account/sites/');
    // No sub-navigation: one link back to the overview.
    await expect(page.getByRole('navigation', { name: 'Account' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /Account overview/ })).toHaveAttribute('href', '/account/');
    await expect(page.getByRole('link', { name: /Ye Joo Park/ })).toHaveAttribute('href', '/studio/site/?id=abc');

    // The masthead's menu: a member gets no way into the admin area.
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Admin' })).toHaveCount(0);
    await page.keyboard.press('Escape');
    // The table names the site's direction and template, and no longer
    // counts its revisions.
    await expect(page.getByText('Warmly Grounded on Verdant')).toBeVisible();
    await expect(page.getByText(/revisions?$/)).toHaveCount(0);

    // A site can be deleted, after a second press that says so.
    const deletes: string[] = [];
    await page.route('**/api/studio/sites/abc', (route) => {
      deletes.push(route.request().method());
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"deleted":"abc"}' });
    });
    await page.getByRole('button', { name: 'Delete Ye Joo Park', exact: true }).click();
    expect(deletes).toHaveLength(0);
    await page.getByRole('button', { name: 'Delete Ye Joo Park for good' }).click();
    await expect(page.getByRole('link', { name: /Ye Joo Park/ })).toHaveCount(0);
    expect(deletes).toEqual(['DELETE']);

    await page.goto('/account/usage/');
    await expect(page.getByText('2 / 10 today')).toBeVisible();
  });

  test('the overview is the chosen templates, and the one "Request more" at the limit', async ({ page }) => {
    await stubSession(page, null);
    const mine = {
      used: 2,
      total: 5,
      left: 3,
      chosen: [
        { slug: 'verdant', chosenAt: '2026-06-30T00:00:00Z', site: { id: 'abc', updatedAt: '2026-09-22T00:00:00Z' } },
        { slug: 'solstice', chosenAt: '2026-07-12T00:00:00Z', site: null },
      ],
      request: null as null | { status: string; granted: number; createdAt: string },
    };
    await page.route('**/api/account/templates', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mine) })
    );

    await page.goto('/account/');
    await expect(page.getByRole('heading', { name: 'Your templates' })).toBeVisible();
    await expect(page.getByText('2 of 5 chosen', { exact: false }).first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Account' })).toHaveCount(0);

    // A customized template opens its site; one not yet customized, a draft.
    const customize = page.getByRole('link', { name: /Customize/ });
    await expect(customize.nth(0)).toHaveAttribute('href', '/studio/site/?id=abc');
    await expect(customize.nth(1)).toHaveAttribute('href', '/studio/customize/?slug=solstice');

    // The Download menu offers the customized version only where there is one.
    await page.getByRole('button', { name: /Download/ }).nth(0).click();
    await expect(page.getByText('Your customized version')).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'React project' })).toHaveAttribute('href', '/downloads/verdant-react.zip');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: /Download/ }).nth(1).click();
    await expect(page.getByText('Your customized version')).toHaveCount(0);
    await page.keyboard.press('Escape');

    await expect(page.getByRole('link', { name: /3 templates left/ })).toHaveAttribute('href', '/templates/');

    // At the limit: the slot becomes the one message the beta allows.
    Object.assign(mine, {
      used: 5,
      left: 0,
      chosen: [...mine.chosen, ...['cobalt-works', 'werkraum', 'hopscotch-museum'].map((slug) => ({ slug, chosenAt: '2026-08-01T00:00:00Z', site: null }))],
    });
    const sent: unknown[] = [];
    await page.route('**/api/account/templates/request', (route) => {
      sent.push(route.request().postDataJSON());
      mine.request = { status: 'pending', granted: 0, createdAt: '2026-09-23T00:00:00Z' };
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ request: mine.request }) });
    });

    // A download the Worker refused lands here and says why.
    await page.goto('/account/?templates=full');
    await expect(page.getByRole('status')).toContainText('chosen all 5 of your templates');
    await expect(page.getByText("You've chosen all 5 templates")).toBeVisible();

    await page.getByRole('button', { name: 'Request more' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Need more templates?' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Send' })).toBeDisabled();
    await dialog.getByRole('textbox').fill('A studio in Portland building sites for cafes.');
    await dialog.getByRole('button', { name: 'Send' }).click();
    await expect(dialog.getByText('Message sent')).toBeVisible();
    expect(sent).toEqual([{ note: 'A studio in Portland building sites for cafes.' }]);
  });

  test('the admin tier is "Not found" to a member and a dashboard to an admin', async ({ page }) => {
    await stubSession(page, null);
    await page.goto('/admin/');
    await expect(page.getByRole('heading', { name: 'Not found' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Admin' })).toHaveCount(0);

    await stubSession(page, 'admin');
    await page.route('**/api/admin/overview', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users: 42, newUsersThisWeek: 5, generationsThisWeek: 17, sitesThisWeek: 6, fallbackRate: 0.12, aiCallsToday: 9, aiCostToday: 0.734, imagesThisWeek: 3, templatesChosen: 105, averageChosen: 2.5, freeTemplates: 5, pendingRequests: 1 }),
      })
    );
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users: [{ id: 'u2', name: 'Sam', email: 'sam@example.com', emailVerified: true, role: null, banned: false, createdAt: '2026-09-01T00:00:00Z', sites: 1, generations: 2, chosen: 5, allowance: 5 }] }),
      })
    );

    await page.goto('/admin/');
    await expect(page.getByRole('navigation', { name: 'Admin' })).toBeVisible();
    await expect(page.getByText('42')).toBeVisible();
    await expect(page.getByText('12%')).toBeVisible();
    await expect(page.getByText('105')).toBeVisible();

    // And an admin's masthead menu names the way in.
    await page.goto('/account/');
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Admin' })).toHaveAttribute('href', '/admin/');
    await page.keyboard.press('Escape');

    await page.goto('/admin/users/');
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Make admin' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ban' })).toBeVisible();
    await expect(page.getByText('5 / 5')).toBeVisible();
    await expect(page.getByText('All 5 chosen')).toBeVisible();

    // Requests: a message from someone at the limit, granted with the stepper.
    const decisions: unknown[] = [];
    await page.route('**/api/admin/requests?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          free: 5,
          counts: { pending: 1, granted: 0, declined: 0 },
          requests: [{ id: 'r1', userId: 'u2', name: 'Sam', email: 'sam@example.com', note: 'Six cafes in Portland.', status: 'pending', granted: 0, decidedAt: null, createdAt: '2026-09-22T00:00:00Z', chosen: 5 }],
        }),
      })
    );
    await page.route('**/api/admin/requests/r1', (route) => {
      decisions.push(route.request().postDataJSON());
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ request: { id: 'r1', status: 'granted', granted: 3 }, mailed: true }) });
    });
    await page.goto('/admin/requests/');
    await expect(page.getByText('Six cafes in Portland.')).toBeVisible();
    await page.getByRole('button', { name: 'One more' }).click();
    await page.getByRole('button', { name: 'Grant 3' }).click();
    await expect.poll(() => decisions).toEqual([{ status: 'granted', granted: 3 }]);
  });
});
