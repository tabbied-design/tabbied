// The account area and the admin tier, rendered against a stubbed session.
//
// Sessions come from /api/auth/get-session, which the export has no Worker
// behind here, so each test answers it itself: no session, a member's, an
// admin's. What is under test is the pages' own logic - who sees the nav,
// who sees "Not found", that the data lands in the tables - not better-auth.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const REQUIRED = ['account/sites', 'account/downloads', 'account/usage', 'admin', 'admin/users'].map((route) =>
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
    await expect(page.getByRole('navigation', { name: 'Account' })).toBeVisible();
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

    // The overview draws the artboard's ring: the month's template
    // downloads against the cap, and the day the count starts over.
    await page.goto('/account/');
    await expect(page.getByText('Template downloads')).toBeVisible();
    await expect(page.getByText('4 of 30 this month')).toBeVisible();
    await expect(page.getByText('Resets Oct 1')).toBeVisible();
    await expect(page.getByRole('status')).toHaveCount(0);

    // A download click the Worker turned away lands here with the reason.
    await page.goto('/account/?downloads=capped');
    await expect(page.getByRole('status')).toContainText('all 30 template downloads for this month');

    await page.goto('/account/usage/');
    await expect(page.getByText('2 / 10 today')).toBeVisible();

    // The downloads page: what was taken lately, named, with the way back.
    await page.route('**/api/account/downloads', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          months: 6,
          downloads: [
            { slug: 'verdant', name: 'Verdant: Garden studio, Champaign', format: 'react', createdAt: '2026-09-20T15:12:00Z' },
            { slug: 'verdant', name: 'Verdant: Garden studio, Champaign', format: 'html', createdAt: '2026-09-02T09:00:00Z' },
          ],
        }),
      })
    );
    await page.goto('/account/downloads/');
    await expect(page.getByRole('navigation', { name: 'Account' }).getByRole('link', { name: 'Downloads' })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByText('Verdant', { exact: true })).toHaveCount(2);
    await expect(page.getByText('React', { exact: true })).toBeVisible();
    await expect(page.getByText('HTML', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open' }).first()).toHaveAttribute('href', '/templates/verdant/');
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
        body: JSON.stringify({ users: 42, newUsersThisWeek: 5, generationsThisWeek: 17, sitesThisWeek: 6, fallbackRate: 0.12, aiCallsToday: 9, aiCostToday: 0.734, imagesThisWeek: 3 }),
      })
    );
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users: [{ id: 'u2', name: 'Sam', email: 'sam@example.com', emailVerified: true, role: null, banned: false, createdAt: '2026-09-01T00:00:00Z', sites: 1, generations: 2 }] }),
      })
    );

    await page.goto('/admin/');
    await expect(page.getByRole('navigation', { name: 'Admin' })).toBeVisible();
    await expect(page.getByText('42')).toBeVisible();
    await expect(page.getByText('12%')).toBeVisible();

    // And an admin's masthead menu names the way in.
    await page.goto('/account/');
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Admin' })).toHaveAttribute('href', '/admin/');
    await page.keyboard.press('Escape');

    await page.goto('/admin/users/');
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Make admin' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ban' })).toBeVisible();
  });
});
