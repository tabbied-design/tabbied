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
const REQUIRED = ['account', 'account/sites', 'admin', 'admin/users', 'admin/requests'].map((route) =>
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
    await expect(page.getByRole('menuitem', { name: 'React project' })).toHaveAttribute('href', '/downloads/verdant-react.zip');
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
        body: JSON.stringify({ users: [{ id: 'u2', name: 'Sam', email: 'sam@example.com', emailVerified: true, role: null, banned: false, createdAt: '2026-09-01T00:00:00Z', sites: 1, generations: 2, chosen: 5, allowance: 5 }] }),
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
