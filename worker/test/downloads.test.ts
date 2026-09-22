import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, signIn } from './helpers';

// A template zip is a signed-in act counted against the month's cap, and the
// route tells a navigation apart from a fetch: a click on a download link is
// sent where the answer is, a fetch gets JSON.

const ZIP = `${ORIGIN}/downloads/verdant-html.zip`;
const CAP = 30;

const asNavigation = (cookie?: string) => ({
  ...(cookie ? { cookie } : {}),
  'sec-fetch-mode': 'navigate',
  accept: 'text/html,application/xhtml+xml',
});
const asFetch = (cookie?: string) => ({ ...(cookie ? { cookie } : {}), 'sec-fetch-mode': 'cors', accept: '*/*' });

describe('template downloads', () => {
  it('sends a signed-out click to sign in, back to the page it came from', async () => {
    const response = await SELF.fetch(ZIP, {
      redirect: 'manual',
      headers: { ...asNavigation(), referer: `${ORIGIN}/templates/verdant/` },
    });
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/sign-in/?next=%2Ftemplates%2Fverdant%2F');

    // A fetch gets the status, not a page.
    expect((await SELF.fetch(ZIP, { headers: asFetch() })).status).toBe(401);
  });

  it('serves the zip to a signed-in person, counts it, and stops at the cap', async () => {
    const cookie = await signIn('downloader@example.com');

    const first = await SELF.fetch(ZIP, { headers: asNavigation(cookie) });
    expect(first.status).toBe(200);
    expect(first.headers.get('content-type')).toContain('zip');

    const usage = async () =>
      ((await SELF.fetch(`${ORIGIN}/api/account/usage`, { headers: { cookie } }).then((r) => r.json())) as {
        downloads: { used: number; cap: number; resetsAt: string };
      }).downloads;

    expect(await usage()).toMatchObject({ used: 1, cap: CAP });

    // A zip the packager never wrote is a 404 that counts nothing.
    expect((await SELF.fetch(`${ORIGIN}/downloads/no-such-site-html.zip`, { headers: asFetch(cookie) })).status).toBe(404);
    expect((await usage()).used).toBe(1);

    for (let n = 1; n < CAP; n += 1) {
      expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    }
    expect((await usage()).used).toBe(CAP);

    // The cap: a fetch is told in JSON, a click is sent to the account page.
    const capped = await SELF.fetch(ZIP, { headers: asFetch(cookie) });
    expect(capped.status).toBe(429);
    expect(((await capped.json()) as { error: string }).error).toContain(`all ${CAP} template downloads`);

    const clicked = await SELF.fetch(ZIP, { redirect: 'manual', headers: asNavigation(cookie) });
    expect(clicked.status).toBe(302);
    expect(clicked.headers.get('location')).toBe('/account/?downloads=capped');
    expect((await usage()).used).toBe(CAP);
  });

  it('other files under /downloads are plain assets', async () => {
    const page = await SELF.fetch(`${ORIGIN}/downloads/verdant/`, { headers: asNavigation() });
    expect(page.status).toBe(200);
    expect(await page.text()).toContain('<html');
  });

  it('an admin can give the month back', async () => {
    const cookie = await signIn('spent@example.com');
    const boss = await signIn('resetter@example.com');
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('resetter@example.com').run();
    const { id } = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('spent@example.com').first<{ id: string }>())!;

    for (let n = 0; n < CAP; n += 1) {
      expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    }
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(429);

    // The role is read past the cookie cache on the admin routes, so the
    // cookie from sign-in is enough once the row says admin.
    const detail = (await SELF.fetch(`${ORIGIN}/api/admin/users/${id}`, { headers: { cookie: boss } }).then((r) => r.json())) as {
      downloads: { used: number; cap: number };
    };
    expect(detail.downloads).toMatchObject({ used: CAP, cap: CAP });

    const reset = await SELF.fetch(`${ORIGIN}/api/admin/users/${id}/downloads/reset`, {
      method: 'POST',
      headers: { cookie: boss, origin: ORIGIN },
    });
    expect(reset.status, await reset.text()).toBe(200);

    // The ledger keeps whole seconds, so a download in the reset's own
    // second cannot be told from one just before it and goes uncounted; the
    // next second is where the new count starts.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    const after = (await SELF.fetch(`${ORIGIN}/api/admin/users/${id}`, { headers: { cookie: boss } }).then((r) => r.json())) as {
      downloads: { used: number };
    };
    expect(after.downloads.used).toBe(1);

    // Not for members.
    expect((await SELF.fetch(`${ORIGIN}/api/admin/users/${id}/downloads/reset`, { method: 'POST', headers: { cookie, origin: ORIGIN } })).status).toBe(404);
  });
});
