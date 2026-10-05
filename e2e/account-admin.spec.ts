// The account area and the admin tier, rendered against a stubbed session.
//
// The export has no Worker behind it here, so each test answers
// /api/auth/get-session (and /api/account/templates) itself. Under test is the
// pages' own logic (who sees the nav, who sees "Not found", that the data
// lands in the tables), not better-auth.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const REQUIRED = ['account', 'account/sites', 'admin', 'admin/users', 'admin/requests', 'admin/test-users', 'admin/emails'].map((route) =>
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
  createdAt: '2026-09-01T00:00:00Z', plan: 'free', test: false, sites: 1, generations: 2, chosen: 5, allowance: 5,
  ...overrides,
});

test.describe('account and admin pages', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  // Fonts are not under test, and without outbound network their requests
  // hang and `load` waits on them.
  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('signed out, the account area asks you to sign in', async ({ page }) => {
    await stubSession(page, 'none');
    await page.goto('/account/sites/');
    // The heading uses a typographic apostrophe; match the words.
    await expect(page.getByRole('heading', { name: /signed out/ })).toBeVisible();
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

  test('the overview is the chosen templates, and "Request more" in two rounds', async ({ page }) => {
    await stubSession(page, null);
    const mine = {
      used: 2,
      total: 5,
      left: 3,
      chosen: [
        { slug: 'verdant', chosenAt: '2026-06-30T00:00:00Z', site: { id: 'abc', updatedAt: '2026-09-22T00:00:00Z' } },
        { slug: 'solstice', chosenAt: '2026-07-12T00:00:00Z', site: null },
      ],
      request: null as null | Record<string, unknown>,
      firstUsed: false,
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
    // Both formats of the customized version, then the original's two zips.
    await expect(page.getByRole('menuitem', { name: 'React project' })).toHaveCount(2);
    await expect(page.getByRole('menuitem', { name: 'React project' }).last()).toHaveAttribute('href', '/downloads/verdant-react.zip');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: /Download/ }).nth(1).click();
    await expect(page.getByText('Your customized version')).toHaveCount(0);
    await page.keyboard.press('Escape');

    await expect(page.getByRole('link', { name: /3 templates left/ })).toHaveAttribute('href', '/templates/');

    // At the limit: the slot becomes the first request, answered by email.
    Object.assign(mine, {
      used: 5,
      left: 0,
      chosen: [...mine.chosen, ...['cobalt-works', 'werkraum', 'hopscotch-museum'].map((slug) => ({ slug, chosenAt: '2026-08-01T00:00:00Z', site: null }))],
    });
    const sent: unknown[] = [];
    await page.route('**/api/account/templates/request', (route) => {
      const body = route.request().postDataJSON() as Record<string, string>;
      sent.push(body);
      mine.request = {
        round: mine.firstUsed ? 2 : 1,
        status: mine.firstUsed ? 'pending' : 'sent',
        granted: 0,
        role: body.role ?? 'Freelancer',
        building: body.building ?? 'Client sites',
        sites: body.sites ?? '3-10',
        sendAt: new Date(Date.now() + 5 * 60_000).toISOString(),
        expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString(),
        createdAt: new Date().toISOString(),
      };
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ request: mine.request }) });
    });

    // A download the Worker refused lands here and says why.
    await page.goto('/account/?templates=full');
    await expect(page.getByRole('status')).toContainText('chosen all 5 of your templates');
    await expect(page.getByText("You've chosen all 5 templates")).toBeVisible();

    await page.getByRole('button', { name: 'Request 5 more' }).click();
    let dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Get 5 more templates' })).toBeVisible();
    const sendRequest = dialog.getByRole('button', { name: 'Send request' });
    await expect(sendRequest).toBeDisabled();
    await dialog.getByRole('button', { name: 'Designer' }).click();
    await dialog.getByRole('button', { name: 'Client sites' }).click();
    await dialog.getByRole('button', { name: '3-10' }).click();
    await sendRequest.click();
    await expect(dialog.getByText('Check your inbox soon')).toBeVisible();
    expect(sent).toEqual([{ note: '', role: 'Designer', building: 'Client sites', sites: '3-10' }]);
    await dialog.getByRole('button', { name: 'Done' }).click();

    // While the email is due, the row says it is on its way.
    await expect(page.getByText('Request received')).toBeVisible();
    await expect(page.getByText(/on its way to pat@example.com/)).toBeVisible();

    // The emailed link lands here: the banner, with the new allowance.
    Object.assign(mine, { total: 10, left: 5, firstUsed: true, request: { ...mine.request, status: 'activated', granted: 5 } });
    await page.goto('/account/?activated=5');
    await expect(page.getByText('5 more templates added')).toBeVisible();
    await expect(page.getByText('You can now choose up to 10 templates', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Choose a template' })).toHaveAttribute('href', '/templates/');
    await page.getByRole('button', { name: 'Dismiss' }).click();
    await expect(page.getByText('5 more templates added')).toHaveCount(0);

    // All ten chosen: the next request is reviewed, with the first answers carried.
    Object.assign(mine, {
      used: 10,
      left: 0,
      chosen: [...mine.chosen, ...['mistral-cycles', 'zenith-observatory', 'maison-ambre', 'nocturne', 'betonpark'].map((slug) => ({ slug, chosenAt: '2026-09-01T00:00:00Z', site: null }))],
    });
    await page.goto('/account/');
    await expect(page.getByText(/\+5 more$/)).toBeVisible();
    await page.getByRole('button', { name: 'Request more' }).click();
    dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Request more templates' })).toBeVisible();
    await expect(dialog.getByText('Designer', { exact: false })).toBeVisible();
    const review = dialog.getByRole('button', { name: 'Send for review' });
    await dialog.getByRole('button', { name: '10', exact: true }).click();
    await dialog.getByRole('button', { name: 'Maybe' }).click();
    await expect(review).toBeDisabled();
    await dialog.getByRole('textbox', { name: 'What would you use more templates for?' }).fill('Six cafes in Portland.');
    await review.click();
    await expect(dialog.getByText('Sent for review')).toBeVisible();
    expect(sent[1]).toEqual({ note: 'Six cafes in Portland.', role: 'Designer', building: 'Client sites', sites: '3-10', need: '10', pay: 'Maybe' });
    await dialog.getByRole('button', { name: 'Done' }).click();
    await expect(page.getByText('Request in review')).toBeVisible();
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
        body: JSON.stringify({ testDomain: 'tabbied.test', users: [userRow()] }),
      })
    );

    await page.goto('/admin/');
    await expect(page.getByRole('navigation', { name: 'Admin' })).toBeVisible();
    await expect(page.getByText('42')).toBeVisible();
    await expect(page.getByText('of 5 templates per user')).toBeVisible();
    await expect(page.getByText('105')).toBeVisible();

    // And an admin's masthead menu names the way in.
    await page.goto('/account/');
    await page.getByRole('button', { name: 'Account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Admin' })).toHaveAttribute('href', '/admin/');
    await page.keyboard.press('Escape');

    await page.goto('/admin/users/');
    await expect(page.getByRole('link', { name: 'sam@example.com' })).toBeVisible();
    // A full quota is the quota in red, not a status.
    await expect(page.locator('[class*="__quotaFull"]')).toContainText('5 / 5');
    await expect(page.getByRole('link', { name: 'Test users' })).toHaveAttribute('href', '/admin/test-users/');
    await expect(page.getByRole('link', { name: 'Email preview' })).toHaveAttribute('href', '/admin/emails/');

    // Requests: a message from someone at the limit, granted with the stepper.
    const decisions: unknown[] = [];
    await page.route('**/api/admin/requests?*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          free: 5,
          counts: { review: 1, link: 0, granted: 0, declined: 0 },
          requests: [
            {
              id: 'r1', userId: 'u2', name: 'Sam', email: 'sam@example.com', round: 2, status: 'pending', granted: 0,
              role: 'Agency', building: 'Client sites', sites: '10+', need: '20+', pay: 'Yes', fairPrice: '$15/month',
              link: 'northfold.studio', note: 'Six cafes in Portland.', sendAt: null, decidedAt: null,
              createdAt: '2026-09-22T00:00:00Z', chosen: 10, allowance: 10, firstActivatedAt: '2026-08-30T00:00:00Z',
            },
          ],
        }),
      })
    );
    await page.route('**/api/admin/requests/r1', (route) => {
      decisions.push(route.request().postDataJSON());
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ request: { id: 'r1', status: 'granted', granted: 3 }, mailed: true }) });
    });
    await page.goto('/admin/requests/');
    await expect(page.getByText('Six cafes in Portland.')).toBeVisible();
    await expect(page.getByText('2nd request')).toBeVisible();
    await expect(page.getByText(/Needs 20\+ more/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'northfold.studio' })).toHaveAttribute('href', 'https://northfold.studio');
    await page.getByRole('button', { name: 'One fewer' }).click();
    await page.getByRole('button', { name: 'One fewer' }).click();
    await page.getByRole('button', { name: 'Grant 3' }).click();
    await expect.poll(() => decisions).toEqual([{ status: 'granted', granted: 3 }]);
  });
});

test.describe('acting on accounts', () => {
  test.skip(REQUIRED.some((file) => !fs.existsSync(file)), 'run `npm run build` first');

  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('the directory: a plan, a template quota, and a menu per row', async ({ page }) => {
    await stubSession(page, 'admin');
    let users = [
      userRow(),
      userRow({ id: 'u1', name: 'Pat', email: 'pat@example.com', role: 'admin', chosen: 1 }),
      userRow({ id: 'u3', name: 'Test user abc12', email: 'test-abc12@tabbied.test', test: true, chosen: 0 }),
      userRow({ id: 'u4', name: 'Robin', email: 'robin@example.com', emailVerified: false, chosen: 0 }),
    ];
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users }) })
    );

    await page.goto('/admin/users/');
    // CSS Modules keep the authored name after a double underscore.
    const row = (text: string) => page.locator('[class*="__row"]').filter({ hasText: text });
    const sam = row('sam@example.com');
    await expect(sam.getByText('Free', { exact: true })).toBeVisible();
    // Plan where Role was, and the quota's heading on two lines.
    const head = await page.locator('[class*="__tableHead"]').innerText();
    expect(head).toMatch(/\bPLAN\b/);
    expect(head).not.toMatch(/ROLE/);
    expect(head).toMatch(/TEMPLATE\nQUOTA/);
    // No Status column: what it said is a badge by the name, or the quota's color.
    expect(head).not.toMatch(/STATUS/);
    await expect(row('robin@example.com').getByText('Unverified', { exact: true })).toBeVisible();
    await expect(sam.locator('[class*="__quotaFull"]')).toContainText('5 / 5');
    await expect(row('tabbied.test').locator('[class*="__quotaFull"]')).toHaveCount(0);
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

  test("managing a person's templates: remove some, reset, and add to the limit", async ({ page }) => {
    await stubSession(page, 'admin');
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users: [userRow({ chosen: 2 })] }) })
    );
    const detail = {
      user: { ...userRow({ chosen: 2 }), banReason: null, banExpires: null },
      sites: [{ id: 's1', slug: 'verdant', title: 'Sam Plants', updatedAt: '2026-09-02T00:00:00Z' }],
      generations: [],
      usageToday: [],
      templates: {
        used: 2,
        total: 8,
        left: 6,
        chosen: [
          { slug: 'verdant', createdAt: '2026-09-01T00:00:00Z' },
          { slug: 'solstice', createdAt: '2026-09-03T00:00:00Z' },
        ],
        grants: [] as unknown[],
      },
    };
    await page.route('**/api/admin/users/u2', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(detail) })
    );
    const removals: unknown[] = [];
    await page.route('**/api/admin/users/u2/templates/remove', (route) => {
      removals.push(route.request().postDataJSON());
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ removed: ['verdant'], sitesDeleted: 1, used: 1, total: 5 }) });
    });
    const grants: unknown[] = [];
    await page.route('**/api/admin/users/u2/grants', (route) => {
      const body = route.request().postDataJSON() as { limit: number; notify: boolean };
      grants.push(body);
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ grant: { id: 'g1', granted: body.limit - 8 }, total: body.limit, mailed: body.notify ? true : null }),
      });
    });

    await page.goto('/admin/users/');
    await page.getByRole('button', { name: 'Actions for Sam' }).click();
    await page.getByRole('menuitem', { name: 'Manage templates' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Templates for Sam' })).toBeVisible();
    await expect(dialog.getByText('1 customized site')).toBeVisible();

    // One template: the warning names the site that goes with it, and nothing is sent until confirmed.
    await dialog.getByRole('checkbox', { name: /verdant/ }).check();
    await dialog.getByRole('button', { name: 'Remove selected (1)' }).click();
    await expect(dialog.getByText(/Remove verdant from sam@example.com\? This also deletes 1 customized site/)).toBeVisible();
    expect(removals).toEqual([]);
    await dialog.getByRole('button', { name: 'Remove 1 template' }).click();
    await expect(dialog.getByText('Removed 1 template and 1 customized site.')).toBeVisible();
    expect(removals).toEqual([{ slugs: ['verdant'] }]);

    // Reset asks too, and sends "all" rather than a list.
    await dialog.getByRole('button', { name: 'Reset all' }).click();
    await dialog.getByRole('button', { name: 'Reset all' }).click();
    await expect.poll(() => removals).toEqual([{ slugs: ['verdant'] }, { all: true }]);

    // Lowering: never under five, and a decrease is not an email.
    const fewer = dialog.getByRole('button', { name: 'One fewer' });
    await expect(dialog.getByRole('button', { name: 'No change' })).toBeDisabled();
    for (let i = 0; i < 3; i++) await fewer.click();
    await expect(fewer).toBeDisabled();
    await expect(dialog.getByRole('checkbox', { name: /Email/ })).toHaveCount(0);
    await dialog.getByRole('button', { name: 'One more' }).click();
    await dialog.getByRole('button', { name: 'Lower to 6' }).click();
    await expect(dialog.getByText('Lowered their limit to 6.')).toBeVisible();

    // Raising: an admins-only note, and the email on by default.
    await dialog.getByRole('button', { name: 'One more' }).click();
    await dialog.getByRole('textbox', { name: 'Note for admins' }).fill('Workshop');
    await expect(dialog.getByRole('checkbox', { name: 'Email sam@example.com' })).toBeChecked();
    await dialog.getByRole('button', { name: 'Raise to 9' }).click();
    await expect(dialog.getByText('Raised their limit to 9. sam@example.com has been told.')).toBeVisible();
    expect(grants).toEqual([
      { limit: 6, note: '', notify: false },
      { limit: 9, note: 'Workshop', notify: true },
    ]);

    // The pencil beside the quota opens the same dialog.
    await dialog.getByRole('button', { name: 'Done' }).click();
    await expect(dialog).toHaveCount(0);
    await page.getByRole('button', { name: 'Manage templates for Sam' }).click();
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Templates for Sam' })).toBeVisible();
  });

  test('impersonating: into the account, a way back on every page, and back', async ({ page }) => {
    await stubSession(page, 'admin');
    await page.route('**/api/admin/users?*', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ testDomain: 'tabbied.test', users: [userRow()] }) })
    );
    await page.route('**/api/account/templates', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ used: 0, total: 5, left: 5, chosen: [], request: null, firstUsed: false }) })
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
    await expect(page.getByRole('menuitem', { name: 'Sign out' })).toHaveCount(0);
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
    // Stopped from the account menu, where "Sign out" used to be.
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
      users = [userRow({ id: `t${made.length}`, name: `Test user ${made.length}`, email, test: true, chosen: 0 }), ...users];
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
            { key: 'approval', name: 'Extra templates link', to: 'person', when: 'Later', subject: 'Your 5 extra templates are ready', text: 'Hi Pat,', html: '<!DOCTYPE html><html><body><h1>5 more templates, on us</h1></body></html>' },
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
    await expect(page.frameLocator('iframe[title="Extra templates link email"]').getByRole('heading', { name: '5 more templates, on us' })).toBeVisible();

    await page.getByRole('combobox', { name: 'Email to send' }).selectOption('approval');
    await page.getByRole('button', { name: 'Send test email' }).click();
    await expect(page.getByText('Extra templates link is on its way to pat@example.com.')).toBeVisible();
    expect(sent).toEqual([{ key: 'approval' }]);
  });
});
