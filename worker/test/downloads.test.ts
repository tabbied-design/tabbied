import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, signIn } from './helpers';

// A template zip is a signed-in act counted against the month's cap, and the
// route tells a navigation apart from a fetch: a click on a download link is
// sent where the answer is, a fetch gets JSON. The cap counts templates, so
// the tests take thirty different ones, read off the catalog the deployment
// serves.

const ZIP = `${ORIGIN}/downloads/verdant-html.zip`;
const CAP = 30;

const zipFor = (slug: string, format = 'html') => `${ORIGIN}/downloads/${slug}-${format}.zip`;

/** Thirty template slugs other than verdant, from the packaged catalog. */
async function otherSlugs(): Promise<string[]> {
  const { templates } = (await SELF.fetch(`${ORIGIN}/editable-catalog.json`).then((r) => r.json())) as {
    templates: { slug: string }[];
  };
  const slugs = templates.map((t) => t.slug).filter((slug) => slug !== 'verdant');
  expect(slugs.length).toBeGreaterThanOrEqual(CAP);

  return slugs.slice(0, CAP);
}

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

    // The same template again, and its other format, is still one.
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    expect((await SELF.fetch(zipFor('verdant', 'react'), { headers: asFetch(cookie) })).status).toBe(200);
    expect((await usage()).used).toBe(1);

    const others = await otherSlugs();

    for (const slug of others.slice(0, CAP - 1)) {
      expect((await SELF.fetch(zipFor(slug), { headers: asFetch(cookie) })).status, slug).toBe(200);
    }
    expect((await usage()).used).toBe(CAP);

    // The cap: a fetch is told in JSON, a click is sent to the account page.
    const capped = await SELF.fetch(zipFor(others[CAP - 1]), { headers: asFetch(cookie) });
    expect(capped.status).toBe(429);
    expect(((await capped.json()) as { error: string }).error).toContain(`all ${CAP} template downloads`);

    const clicked = await SELF.fetch(zipFor(others[CAP - 1]), { redirect: 'manual', headers: asNavigation(cookie) });
    expect(clicked.status).toBe(302);
    expect(clicked.headers.get('location')).toBe('/account/?downloads=capped');
    expect((await usage()).used).toBe(CAP);

    // A template already among the month's is free past the cap.
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    expect((await usage()).used).toBe(CAP);

    // The history names every zip taken, newest first, from the catalog.
    const history = (await SELF.fetch(`${ORIGIN}/api/account/downloads`, { headers: { cookie } }).then((r) => r.json())) as {
      months: number;
      downloads: { slug: string; name: string; format: string; createdAt: string }[];
    };
    expect(history.months).toBe(6);
    expect(history.downloads.length).toBe(CAP + 3);
    expect(history.downloads[0]).toMatchObject({ slug: 'verdant', format: 'html' });
    expect(history.downloads.find((row) => row.format === 'react')?.slug).toBe('verdant');
    expect(history.downloads[0].name).not.toBe('verdant');
    expect((await SELF.fetch(`${ORIGIN}/api/account/downloads`)).status).toBe(401);
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

    const others = await otherSlugs();

    for (const slug of others) {
      expect((await SELF.fetch(zipFor(slug), { headers: asFetch(cookie) })).status, slug).toBe(200);
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
