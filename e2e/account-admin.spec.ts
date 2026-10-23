// The account area and the admin tier, rendered against a stubbed session.
//
// The export has no Worker behind it here, so each test answers
// /api/auth/get-session (and /api/studio/sites) itself. Under test is the
// pages' own logic (who sees the nav, who sees "Not found", that the data
// lands in the tables), not better-auth.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const REQUIRED = ['account', 'account/sites', 'admin', 'admin/users', 'admin/test-users', 'admin/emails'].map((route) =>
  path.join(REPO_ROOT, 'out', route, 'index.html')
);

const session = (role: string | null, impersonatedBy: string | null = null) => ({
  session: { id: 's', userId: 'u1', expiresAt: '2030-01-01T00:00:00Z', impersonatedBy },
  user: { id: 'u1', name: 'Pat', email: 'pat@example.com', emailVerified: true, role },
});

const stubSession = (page: Page, role: string | null | 'none', impersonatedBy: string | null = null) =>
  page.route('**/api/auth/get-session', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: role === 'none' ? 'null' : JSON.stringify(session(role, impersonatedBy)),
    })
  );

const userRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'u2', name: 'Sam', email: 'sam@example.com', emailVerified: true, role: null, banned: false,
  createdAt: '2026-09-01T00:00:00Z', plan: 'free', test: false, sites: 3, generations: 2, downloads: 12,
  ...overrides,
});

const DAY = 86_400_000;

/** A range of whole UTC days ending with today, as the Worker resolves one. */
const daysRange = (period: string, days: number) => {
  const end = new Date();
  end.setUTCHours(24, 0, 0, 0);
  return { period, start: new Date(end.getTime() - days * DAY).toISOString(), end: end.toISOString(), bucket: 'day', bucketSeconds: 86_400, buckets: days };
};

/** The range a stubbed admin read was asked for: a preset, or a custom pair. */
const askedRange = (url: string) => {
  const query = new URL(url).searchParams;
  const [from, to] = [query.get('from'), query.get('to')];
  if (from && to) {
    const start = Date.parse(`${from}T00:00:00Z`);
    const days = (Date.parse(`${to}T00:00:00Z`) - start) / DAY + 1;
    return { asked: `${from}..${to}`, range: { ...daysRange('custom', days), start: new Date(start).toISOString(), end: new Date(start + days * DAY).toISOString() } };
  }
  const period = query.get('period') ?? '30';
  return { asked: period, range: daysRange(period, period === 'all' ? 60 : Number(period)) };
};

/** /api/admin/overview's answer: today's bar has the sign-ups and downloads. */
const overviewBody = (range: ReturnType<typeof daysRange>) => ({
  range,
  users: 42, usersBefore: 30, newUsersThisWeek: 5, generationsThisWeek: 17, sitesThisWeek: 6, fallbackRate: 0.12, aiCallsToday: 9,
  aiCostToday: 0.734, imagesThisWeek: 3, downloads: 18940, anonymousDownloads: 15002, customizedDownloads: 2100,
  customizerSessions: 7212, saveGates: 410, newAccounts: 302, newAccountsFromSave: 214, savedTemplates: 1184,
  topDownloads: [{ slug: 'verdant', n: 40 }],
  signupSeries: [{ i: range.buckets - 1, n: 5, fromSave: 2 }],
  downloadSeries: [{ i: range.buckets - 1, n: 120, guests: 90, html: 80, react: 40, customized: 25 }],
});

test.describe('account and admin pages', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  // Fonts are not under test, and without outbound network their requests
  // hang and `load` waits on them.
  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('signed out, the account area asks you to log in', async ({ page }) => {
    await stubSession(page, 'none');
    await page.goto('/account/sites/');
    await expect(page.getByRole('heading', { name: /logged out/ })).toBeVisible();
    await expect(page.getByText('An account is only needed to save a customized template.')).toBeVisible();
  });

  test('a member sees their sites', async ({ page }) => {
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
    // The table names the site's direction and template, and does not count
    // its revisions.
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
  });

  test('the overview is the saved templates, each with its downloads and the way back in', async ({ page }) => {
    await stubSession(page, null);
    const site = (id: string, slug: string, title: string, templateName: string) => ({
      id, slug, title, templateName, stance: '', palette: ['#f4f1ea', '#1b1b1b'], revisions: 2,
      createdAt: '2026-06-30T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z',
    });
    await page.route('**/api/studio/sites', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ sites: [site('abc', 'verdant', 'Harbour Plants', 'Verdant'), site('def', 'solstice', 'Solstice', 'Solstice')] }),
      })
    );

    await page.goto('/account/');
    await expect(page.getByRole('heading', { name: 'Your templates' })).toBeVisible();
    await expect(page.getByText('Free beta')).toBeVisible();
    await expect(page.getByText('No limit on saves or downloads.')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Account' })).toHaveCount(0);
    // Nothing is counted against an allowance, and there is nothing to request.
    await expect(page.getByText(/chosen|Request more/)).toHaveCount(0);

    // Each saved site goes back into the customizer as itself.
    const editing = page.getByRole('link', { name: /Keep editing/ });
    await expect(editing.nth(0)).toHaveAttribute('href', '/studio/site/?id=abc');
    await expect(editing.nth(1)).toHaveAttribute('href', '/studio/site/?id=def');
    // A site named apart from its template names the template under it.
    await expect(page.getByText('Verdant template')).toBeVisible();

    // The Download menu: the customized version, then the original's two zips.
    await page.getByRole('button', { name: /Download/ }).nth(0).click();
    await expect(page.getByText('Your customized version')).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'React project' })).toHaveCount(2);
    await expect(page.getByRole('menuitem', { name: 'React project' }).last()).toHaveAttribute('href', '/downloads/verdant-react.zip');
    await page.keyboard.press('Escape');

    await expect(page.getByRole('link', { name: /Customize another template/ })).toHaveAttribute('href', '/templates/');
  });

  test('the admin tier is "Not found" to a member and a dashboard to an admin', async ({ page }) => {
    await stubSession(page, null);
    await page.goto('/admin/');
    await expect(page.getByRole('heading', { name: 'Not found' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Admin' })).toHaveCount(0);

    await stubSession(page, 'admin');
    await page.route('**/api/admin/overview?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(overviewBody(daysRange('30', 30))),
      })
    );
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ testDomain: 'tabbied.test', users: [userRow()] }),
      })
    );

    await page.goto('/admin/');
    await expect(page.getByRole('navigation', { name: 'Admin' })).toBeVisible();
    await expect(page.getByText('Templates are free to download without an account.', { exact: false })).toBeVisible();
    // The design's four: downloads with no account, customizer sessions, the
    // accounts made and how many began at the save gate, and what is saved.
    await expect(page.getByText('18,940')).toBeVisible();
    await expect(page.getByText('Last 30 days, 15,002 with no account', { exact: false })).toBeVisible();
    await expect(page.getByText('7,212')).toBeVisible();
    await expect(page.getByText('71% started from a save', { exact: false })).toBeVisible();
    await expect(page.getByText('1,184')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Requests' })).toHaveCount(0);

    // And an admin's masthead menu names the way in.
    await page.goto('/account/');
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Admin' })).toHaveAttribute('href', '/admin/');
    await page.keyboard.press('Escape');

    await page.goto('/admin/users/');
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Test users' })).toHaveAttribute('href', '/admin/test-users/');
    await expect(page.getByRole('link', { name: 'Email preview' })).toHaveAttribute('href', '/admin/emails/');
  });
});

test.describe('download statistics', () => {
  test.skip(
    [...REQUIRED, path.join(REPO_ROOT, 'out', 'admin', 'downloads', 'index.html')].some((file) => !fs.existsSync(file)),
    'run `npm run build` first'
  );

  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('downloads per template, by guests and signed in, for a chosen period', async ({ page }) => {
    await stubSession(page, 'admin');
    const asked: string[] = [];
    const row = (slug: string, name: string, counts: number[], lastAt: string | null = '2026-10-16T09:00:00Z') => {
      const [downloads, guests, html, react, customized] = counts;
      return { slug, name, retired: false, downloads, guests, signedIn: downloads - guests, html, react, customized, lastAt };
    };
    await page.route('**/api/admin/downloads?*', (route) => {
      const { asked: period, range } = askedRange(route.request().url());
      asked.push(period);
      const all = period === 'all';
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          range,
          totals: {
            downloads: all ? 900 : 120, guests: all ? 700 : 90, signedIn: all ? 200 : 30, html: 80, react: 40,
            customized: 25, customizedByGuests: 20, people: 12, templates: 2,
          },
          downloadSeries: [{ i: range.buckets - 1, n: 6, guests: 4, html: 5, react: 1, customized: 2 }],
          templates: [
            row('live-wire-electric', 'Live Wire Electric', [80, 60, 50, 30, 20]),
            row('crumb-bakehouse', 'Crumb Bakehouse', [40, 30, 30, 10, 5]),
            row('verdant', 'Verdant', [0, 0, 0, 0, 0], null),
          ],
        }),
      });
    });

    await page.goto('/admin/downloads/');
    await expect(page.getByRole('navigation', { name: 'Admin' }).getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/admin/downloads/'
    );

    // The site's totals, split by who took them.
    await expect(page.getByText('75% of downloads, with no account')).toBeVisible();
    await expect(page.getByText('by 12 people', { exact: false })).toBeVisible();

    // A row per template downloaded, most downloaded first; none hides the
    // templates with nothing until asked.
    const table = page.getByRole('table');
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(2);
    await expect(rows.first().locator('td')).toHaveText(['Live Wire Electric', '80', '60', '20', '50', '30', '20', /\S/]);
    await page.getByRole('button', { name: 'Include templates with none' }).click();
    await expect(rows).toHaveCount(3);

    // A heading sorts by its column.
    await table.getByRole('button', { name: 'Template' }).click();
    await expect(rows.first().locator('td').first()).toHaveText('Crumb Bakehouse');

    // Three charts read the same bars, each with its readout.
    await expect(page.getByRole('heading', { name: 'Downloads by day' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HTML and React' })).toBeVisible();
    await page.getByRole('img', { name: /^Customized downloads per day/ }).focus();
    await expect(page.getByText('customized (33%)')).toBeVisible();
    await expect(page.getByText('4 as they are')).toBeVisible();

    // The period is asked of the Worker.
    await page.getByRole('button', { name: 'All time' }).click();
    await expect(page.getByText('900', { exact: true })).toBeVisible();
    expect(asked).toEqual(['30', 'all']);
  });
});

test.describe('the overview', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('one range for every figure, and a readout on every bar', async ({ page }) => {
    await stubSession(page, 'admin');
    const asked: string[] = [];
    await page.route('**/api/admin/overview?*', (route) => {
      const { asked: period, range } = askedRange(route.request().url());
      asked.push(period);
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(overviewBody(range)) });
    });
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users: [] }) })
    );

    await page.goto('/admin/');
    await expect(page.getByText('Last 30 days, 410 asked to save')).toBeVisible();

    // Pointing at today's sign-ups reads them, with what came of them and
    // the running total; a day with none says so.
    const growth = page.getByRole('img', { name: /^New accounts per day/ });
    await growth.locator('[data-bar="29"]').hover();
    await expect(page.getByText('5 new users')).toBeVisible();
    await expect(page.getByText('2 started from a save')).toBeVisible();
    await expect(page.getByText('35 users in all')).toBeVisible();
    await growth.locator('[data-bar="3"]').hover();
    await expect(page.getByText('0 new users')).toBeVisible();
    await expect(page.getByText('30 users in all')).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(page.getByText('30 users in all')).toBeHidden();

    // The keyboard gets the same readout: focus is the latest bar, the
    // arrows walk back.
    const downloads = page.getByRole('img', { name: /^Downloads per day/ });
    await downloads.focus();
    await expect(page.getByText('120 downloads')).toBeVisible();
    await expect(page.getByText('90 guests')).toBeVisible();
    await expect(page.getByText('25 customized')).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByText('0 downloads')).toBeVisible();

    // A preset, then a custom range: everything under the row reads it.
    await page.getByRole('button', { name: '7 days' }).click();
    await expect(page.getByText('Last 7 days, 15,002 with no account', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Custom' }).click();
    await page.getByLabel('From', { exact: true }).fill('2026-10-01');
    await page.getByLabel('To', { exact: true }).fill('2026-10-14');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Oct 1 to Oct 14, 2026, 15,002 with no account', { exact: false })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Custom' })).toHaveAttribute('aria-pressed', 'true');
    expect(asked).toEqual(['30', '7', '2026-10-01..2026-10-14']);
  });
});

test.describe('acting on accounts', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('the directory: an account, saved templates, downloads, and a menu per row', async ({ page }) => {
    await stubSession(page, 'admin');
    let users = [
      userRow(),
      userRow({ id: 'u1', name: 'Pat', email: 'pat@example.com', role: 'admin', sites: 1 }),
      userRow({ id: 'u3', name: 'Test user abc12', email: 'test-abc12@tabbied.test', test: true, sites: 0 }),
      userRow({ id: 'u4', name: 'Robin', email: 'robin@example.com', emailVerified: false, sites: 0 }),
    ];
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users }) })
    );

    await page.goto('/admin/users/');
    // CSS Modules keep the authored name after a double underscore.
    const row = (text: string) => page.locator('[class*="__row"]').filter({ hasText: text });
    const sam = row('sam@example.com');
    await expect(sam.getByText('Free', { exact: true })).toBeVisible();
    // The account's plan, then what the person saved and downloaded; nothing
    // about a quota, since there is none.
    const head = await page.locator('[class*="__tableHead"]').innerText();
    expect(head).toMatch(/\bACCOUNT\b/);
    expect(head).not.toMatch(/ROLE|QUOTA|REMAINING/);
    expect(head).toMatch(/SAVED\nTEMPLATES/);
    expect(head).toMatch(/DOWNLOADS/);
    // No Status column: what it said is a badge by the name.
    expect(head).not.toMatch(/STATUS/);
    await expect(row('robin@example.com').getByText('Unverified', { exact: true })).toBeVisible();
    await expect(sam.locator('[data-label="Saved templates"]')).toHaveText('3');
    await expect(sam.locator('[data-label="Downloads"]')).toHaveText('12');
    // "Make admin" is gone; an admin is a tag by the name.
    await expect(page.getByRole('button', { name: /admin/i })).toHaveCount(0);
    await expect(row('pat@example.com').getByText('Admin', { exact: true })).toBeVisible();
    await expect(row('tabbied.test').getByText('Test', { exact: true })).toBeVisible();

    // Your own row offers nothing, and says why.
    await page.getByRole('button', { name: 'Actions for Pat' }).click();
    await expect(page.getByRole('menuitem', { name: 'Impersonate' })).toHaveAttribute('aria-disabled', 'true');
    await expect(page.getByRole('menuitem', { name: 'Remove' })).toHaveAttribute('aria-disabled', 'true');
    await expect(page.getByText('This is you.')).toBeVisible();
    await page.keyboard.press('Escape');

    // Ban goes to better-auth, then the list reloads.
    const bans: unknown[] = [];
    await page.route('**/api/auth/admin/ban-user', (route) => {
      bans.push(route.request().postDataJSON());
      users = users.map((row) => (row.id === 'u2' ? { ...row, banned: true } : row));
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"user":{}}' });
    });
    await page.getByRole('button', { name: 'Actions for Sam' }).click();
    await expect(page.getByRole('menuitem', { name: 'Manage templates' })).toHaveCount(0);
    await page.getByRole('menuitem', { name: 'Ban' }).click();
    await expect.poll(() => bans).toEqual([{ userId: 'u2', banReason: 'Banned from the admin page' }]);
    await expect(sam.getByText('Banned', { exact: true })).toBeVisible();

    // Remove asks first, then deletes through the admin API.
    const removed: string[] = [];
    await page.route('**/api/admin/users/u2', (route) => {
      removed.push(route.request().method());
      users = users.filter((row) => row.id !== 'u2');
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"removed":"u2"}' });
    });
    await page.getByRole('button', { name: 'Actions for Sam' }).click();
    await expect(page.getByRole('menuitem', { name: 'Unban' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Remove' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Remove Sam?' })).toBeVisible();
    expect(removed).toEqual([]);
    await dialog.getByRole('button', { name: 'Remove account' }).click();
    await expect(dialog).toHaveCount(0);
    expect(removed).toEqual(['DELETE']);
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toHaveCount(0);
  });

  test('impersonating: into the account, a way back on every page, and back', async ({ page }) => {
    await stubSession(page, 'admin');
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users: [userRow()] }) })
    );
    await page.route('**/api/studio/sites', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ sites: [] }) })
    );
    const started: unknown[] = [];
    await page.route('**/api/auth/admin/impersonate-user', async (route) => {
      started.push(route.request().postDataJSON());
      // From here the browser holds Sam's session, marked as borrowed.
      await page.unroute('**/api/auth/get-session');
      await stubSession(page, null, 'u1');
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"session":{},"user":{}}' });
    });

    await page.goto('/admin/users/?filter=x');
    await page.getByRole('button', { name: 'Actions for Sam' }).click();
    await page.getByRole('menuitem', { name: 'Impersonate' }).click();
    await page.waitForURL('**/account/');
    expect(started).toEqual([{ userId: 'u2' }]);

    // Every page with a bar says whose account this is.
    const notice = page.getByRole('status').filter({ hasText: 'Viewing as' });
    await expect(notice).toContainText('pat@example.com');
    await expect(notice.getByRole('button', { name: 'Stop impersonating' })).toBeVisible();

    // The account menu says whose account this is, and its last item hands
    // the admin's session back rather than signing out of both.
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByText('Viewing as pat@example.com').first()).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Stop impersonating' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Log out' })).toHaveCount(0);
    await page.keyboard.press('Escape');

    // The admin pages are closed while it lasts, and say how to get them back.
    await page.goto('/admin/');
    await expect(page.getByRole('heading', { name: /You are viewing as/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stop impersonating' })).toBeVisible();

    const stopped: string[] = [];
    const signedOut: string[] = [];
    await page.route('**/api/auth/sign-out', (route) => {
      signedOut.push(route.request().method());
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    });
    await page.route('**/api/auth/admin/stop-impersonating', async (route) => {
      stopped.push(route.request().method());
      await page.unroute('**/api/auth/get-session');
      await stubSession(page, 'admin');
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"session":{},"user":{}}' });
    });
    // Stopped from the account menu, where "Log out" used to be.
    await page.goto('/account/');
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByRole('menuitem', { name: 'Stop impersonating' }).click();
    // Back where the admin started, still signed in as the admin.
    await page.waitForURL(/\/admin\/users\/\?filter=x$/);
    expect(stopped).toEqual(['POST']);
    expect(signedOut).toEqual([]);
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toBeVisible();
  });

  test('test users: made one at a time, credentials shown once, removed together', async ({ page }) => {
    await stubSession(page, 'admin');
    let users: ReturnType<typeof userRow>[] = [];
    await page.route('**/api/admin/users?*', (route) => {
      expect(new URL(route.request().url()).searchParams.get('scope')).toBe('test');
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users }) });
    });
    const made: { password: string; prefix?: string }[] = [];
    await page.route('**/api/admin/test-users', (route) => {
      if (route.request().method() === 'DELETE') {
        users = [];
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{"removed":3}' });
      }
      const body = route.request().postDataJSON() as { password: string; prefix?: string };
      made.push(body);
      const email = `${body.prefix ?? `test-${made.length}`}@tabbied.test`;
      users = [userRow({ id: `t${made.length}`, name: `Test user ${made.length}`, email, test: true, sites: 0 }), ...users];
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { id: `t${made.length}`, email } }) });
    });

    await page.goto('/admin/test-users/');
    await expect(page.getByText('No test users yet')).toBeVisible();
    const password = page.getByRole('textbox', { name: 'Password' });
    await expect(password).toHaveValue(/^test-[a-z0-9]{8}$/);
    await page.getByRole('textbox', { name: /Email/ }).fill('checkout-flow');
    await page.getByRole('button', { name: 'Create test user' }).click();
    await expect(page.getByText('checkout-flow@tabbied.test').first()).toBeVisible();
    expect(made).toEqual([{ password: await password.inputValue(), prefix: 'checkout-flow' }]);

    // Several at once: the address field goes, one call each.
    await page.getByRole('spinbutton', { name: 'How many' }).fill('2');
    await expect(page.getByRole('textbox', { name: /Email/ })).toHaveCount(0);
    await page.getByRole('button', { name: 'Create 2 test users' }).click();
    await expect(page.getByText('Made 2 accounts')).toBeVisible();
    expect(made.slice(1).map((body) => body.prefix)).toEqual([undefined, undefined]);
    await expect(page.getByText('3 accounts on @tabbied.test')).toBeVisible();

    await page.getByRole('button', { name: 'Remove all' }).click();
    await page.getByRole('button', { name: 'Yes, remove all' }).click();
    await expect(page.getByText('No test users yet')).toBeVisible();
  });

  test('email preview: every message, drawn as sent, and a test copy to yourself', async ({ page }) => {
    await stubSession(page, 'admin');
    await page.route('**/api/admin/emails', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          provider: 'resend',
          to: 'pat@example.com',
          emails: [
            { key: 'verify', name: 'Account confirmation', to: 'person', when: 'Sign-up (better-auth)', subject: 'Confirm your Tabbied account', text: 'Confirm your Tabbied account:\n\nhttps://tabbied.com/x', html: null },
            { key: 'reset', name: 'Password reset', to: 'person', when: 'Forgot password (better-auth)', subject: 'Reset your Tabbied password', text: 'Hi Pat,', html: '<!DOCTYPE html><html><body><h1>Reset your password</h1></body></html>' },
          ],
        }),
      })
    );
    const sent: unknown[] = [];
    await page.route('**/api/admin/emails/test', (route) => {
      sent.push(route.request().postDataJSON());
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"to":"pat@example.com","provider":"resend"}' });
    });

    await page.goto('/admin/emails/');
    await expect(page.getByRole('heading', { name: 'Account confirmation' })).toBeVisible();
    await expect(page.getByText('Confirm your Tabbied account:', { exact: false })).toBeVisible();
    await expect(page.frameLocator('iframe[title="Password reset email"]').getByRole('heading', { name: 'Reset your password' })).toBeVisible();

    await page.getByRole('combobox', { name: 'Email to send' }).selectOption('reset');
    await page.getByRole('button', { name: 'Send test email' }).click();
    await expect(page.getByText('Password reset is on its way to pat@example.com.')).toBeVisible();
    expect(sent).toEqual([{ key: 'reset' }]);
  });
});
