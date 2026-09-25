import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, json, signIn } from './helpers';

// Five templates per account during the beta. A template becomes a person's
// on its first download, its first customizer save, or "Choose template";
// after that it is theirs to take as often as they like. The zip route tells
// a navigation apart from a fetch: a click is sent where the answer is, a
// fetch gets JSON.

const FREE = 5;
const ZIP = `${ORIGIN}/downloads/verdant-html.zip`;

const zipFor = (slug: string, format = 'html') => `${ORIGIN}/downloads/${slug}-${format}.zip`;

/** Template slugs other than verdant, from the packaged catalog. */
async function otherSlugs(n: number): Promise<string[]> {
  const { templates } = (await SELF.fetch(`${ORIGIN}/editable-catalog.json`).then((r) => r.json())) as {
    templates: { slug: string }[];
  };
  const slugs = templates.map((t) => t.slug).filter((slug) => slug !== 'verdant');
  expect(slugs.length).toBeGreaterThanOrEqual(n);

  return slugs.slice(0, n);
}

const asNavigation = (cookie?: string) => ({
  ...(cookie ? { cookie } : {}),
  'sec-fetch-mode': 'navigate',
  accept: 'text/html,application/xhtml+xml',
});
const asFetch = (cookie?: string) => ({ ...(cookie ? { cookie } : {}), 'sec-fetch-mode': 'cors', accept: '*/*' });

type Mine = {
  used: number;
  total: number;
  left: number;
  chosen: { slug: string; chosenAt: string; site: { id: string; updatedAt: string } | null }[];
  request: { status: string; granted: number } | null;
};

const mine = async (cookie: string) =>
  (await SELF.fetch(`${ORIGIN}/api/account/templates`, { headers: { cookie } }).then((r) => r.json())) as Mine;

const choose = (cookie: string, slug: string) =>
  SELF.fetch(`${ORIGIN}/api/account/templates`, {
    method: 'POST',
    headers: { ...json, cookie },
    body: JSON.stringify({ slug }),
  });

const userId = async (email: string) =>
  (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind(email).first<{ id: string }>())!.id;

describe('template downloads', () => {
  it('sends a signed-out click to sign in, back to the page it came from', async () => {
    const response = await SELF.fetch(ZIP, {
      redirect: 'manual',
      headers: { ...asNavigation(), referer: `${ORIGIN}/templates/verdant/` },
    });
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/sign-in/?next=%2Ftemplates%2Fverdant%2F');

    expect((await SELF.fetch(ZIP, { headers: asFetch() })).status).toBe(401);
  });

  it('chooses a template on its first download and stops at five', async () => {
    const cookie = await signIn('downloader@example.com');

    const first = await SELF.fetch(ZIP, { headers: asNavigation(cookie) });
    expect(first.status).toBe(200);
    expect(first.headers.get('content-type')).toContain('zip');
    expect(await mine(cookie)).toMatchObject({ used: 1, total: FREE, left: FREE - 1 });

    // A zip the packager never wrote chooses nothing.
    expect((await SELF.fetch(zipFor('no-such-site'), { headers: asFetch(cookie) })).status).toBe(404);
    expect((await mine(cookie)).used).toBe(1);

    // The same template again, and its other format, is still one.
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    expect((await SELF.fetch(zipFor('verdant', 'react'), { headers: asFetch(cookie) })).status).toBe(200);
    expect((await mine(cookie)).used).toBe(1);

    const others = await otherSlugs(FREE);

    for (const slug of others.slice(0, FREE - 1)) {
      expect((await SELF.fetch(zipFor(slug), { headers: asFetch(cookie) })).status, slug).toBe(200);
    }
    expect(await mine(cookie)).toMatchObject({ used: FREE, left: 0 });

    // Full: a fetch is told in JSON, a click is sent to the account page.
    const refused = await SELF.fetch(zipFor(others[FREE - 1]), { headers: asFetch(cookie) });
    expect(refused.status).toBe(403);
    expect(refused.headers.get('content-type')).toContain('application/json');

    const clicked = await SELF.fetch(zipFor(others[FREE - 1]), { redirect: 'manual', headers: asNavigation(cookie) });
    expect(clicked.status).toBe(302);
    expect(clicked.headers.get('location')).toBe('/account/?templates=full');

    // A chosen template is unlimited.
    expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);

    const listed = await mine(cookie);
    expect(listed.chosen.map((row) => row.slug)).toEqual(['verdant', ...others.slice(0, FREE - 1)]);
    expect((await SELF.fetch(`${ORIGIN}/api/account/templates`)).status).toBe(401);
  });

  it('a HEAD, or a range resuming a copy, answers without choosing', async () => {
    const cookie = await signIn('prober@example.com');

    expect((await SELF.fetch(zipFor('verdant'), { method: 'HEAD', headers: asFetch(cookie) })).status).toBe(200);

    const resumed = await SELF.fetch(ZIP, { headers: { ...asFetch(cookie), range: 'bytes=100-' } });
    expect(resumed.ok).toBe(true);
    expect((await mine(cookie)).used).toBe(0);

    expect((await SELF.fetch(ZIP, { method: 'HEAD', headers: asFetch() })).status).toBe(401);
  });

  it('holds the allowance when every request arrives at once', async () => {
    const cookie = await signIn('stampede@example.com');
    const slugs = await otherSlugs(FREE + 12);

    const statuses = await Promise.all(
      slugs.map((slug) => SELF.fetch(zipFor(slug), { headers: asFetch(cookie) }).then((r) => r.status))
    );
    expect(statuses.filter((status) => status === 200)).toHaveLength(FREE);
    expect(statuses.filter((status) => status === 403)).toHaveLength(slugs.length - FREE);
    expect((await mine(cookie)).used).toBe(FREE);
  });

  it('other files under /downloads are plain assets', async () => {
    const page = await SELF.fetch(`${ORIGIN}/downloads/verdant/`, { headers: asNavigation() });
    expect(page.status).toBe(200);
    expect(await page.text()).toContain('<html');
  });
});

describe('choosing templates', () => {
  it('"Choose template" claims one without taking it, once', async () => {
    const cookie = await signIn('chooser@example.com');

    const chosen = await choose(cookie, 'verdant');
    expect(chosen.status).toBe(200);
    expect(await chosen.json()).toMatchObject({ slug: 'verdant', chosen: true, used: 1, left: FREE - 1 });

    const again = await choose(cookie, 'verdant');
    expect(await again.json()).toMatchObject({ chosen: false, used: 1 });

    expect((await choose(cookie, 'no-such-site')).status).toBe(404);
    expect((await choose(cookie, 'Not A Slug')).status).toBe(400);
  });

  it('the first customizer save chooses the template, and a full account cannot save a new one', async () => {
    const cookie = await signIn('customizer@example.com');
    const save = (slug: string) =>
      SELF.fetch(`${ORIGIN}/api/studio/sites`, {
        method: 'POST',
        headers: { ...json, cookie },
        body: JSON.stringify({ slug }),
      });

    const made = await save('verdant');
    expect(made.status, await made.clone().text()).toBe(200);
    const { id } = (await made.json()) as { id: string };

    const listed = await mine(cookie);
    expect(listed.used).toBe(1);
    expect(listed.chosen[0]).toMatchObject({ slug: 'verdant', site: { id } });

    for (const slug of await otherSlugs(FREE - 1)) {
      expect((await choose(cookie, slug)).status).toBe(200);
    }

    const [extra] = (await otherSlugs(FREE)).slice(-1);
    expect((await save(extra)).status).toBe(403);
    // A template already chosen saves again as another site.
    expect((await save('verdant')).status).toBe(200);
  });
});

describe('"Request more"', () => {
  const ask = (cookie: string, body: Record<string, string>) =>
    SELF.fetch(`${ORIGIN}/api/account/templates/request`, {
      method: 'POST',
      headers: { ...json, cookie },
      body: JSON.stringify(body),
    });

  /** The link in the person's latest dev mail (the approval email). */
  const linkFor = async (email: string) => {
    const row = await env.DB.prepare('SELECT url FROM dev_mail WHERE email = ?').bind(email).first<{ url: string }>();
    return row!;
  };

  const follow = (url: string) => SELF.fetch(url, { redirect: 'manual' });

  const FIRST = { role: 'Freelancer', building: 'Client sites', sites: '3-10' };
  const SECOND = { need: '10', pay: 'Maybe', fairPrice: '$10/month', link: 'studio.example', note: 'Six cafes in Portland.' };

  it('a first request emails a single-use link that adds five', async () => {
    const cookie = await signIn('asker@example.com');
    const slugs = await otherSlugs(FREE * 2 + 1);

    // Not before every template is chosen.
    expect((await ask(cookie, FIRST)).status).toBe(409);
    for (const slug of slugs.slice(0, FREE)) expect((await choose(cookie, slug)).status).toBe(200);

    expect((await ask(cookie, { role: 'Freelancer' })).status).toBe(400);
    expect((await ask(cookie, { ...FIRST, role: 'Astronaut' })).status).toBe(400);

    const before = Date.now();
    const sent = await ask(cookie, { ...FIRST, note: 'Mostly restaurants.' });
    expect(sent.status, await sent.clone().text()).toBe(200);
    const { request } = (await sent.json()) as { request: { round: number; status: string; sendAt: string } };
    expect(request).toMatchObject({ round: 1, status: 'sent' });
    // The email is scheduled a few minutes out, as the page promises.
    expect(new Date(request.sendAt).getTime()).toBeGreaterThanOrEqual(before + 4 * 60_000);

    // One open request at a time.
    expect((await ask(cookie, FIRST)).status).toBe(409);

    const mail = await linkFor('asker@example.com');
    expect(mail.url).toMatch(/\/api\/account\/templates\/activate\?token=/);

    // Following it (no session needed) adds five, once.
    const first = await follow(mail.url);
    expect(first.status).toBe(302);
    expect(first.headers.get('location')).toBe('/account/?activated=5');
    expect(await mine(cookie)).toMatchObject({ used: FREE, total: FREE * 2, left: FREE });
    expect((await follow(mail.url)).headers.get('location')).toBe('/account/?activated=used');
    expect((await follow(`${ORIGIN}/api/account/templates/activate?token=nope`)).headers.get('location')).toBe('/account/?activated=unknown');
    expect((await mine(cookie)).total).toBe(FREE * 2);

    // A second request goes to the team, with more to say.
    for (const slug of slugs.slice(FREE, FREE * 2)) expect((await choose(cookie, slug)).status).toBe(200);
    expect((await ask(cookie, { need: '10' })).status).toBe(400);
    const second = await ask(cookie, SECOND);
    expect(second.status, await second.clone().text()).toBe(200);
    expect(await second.json()).toMatchObject({ request: { round: 2, status: 'pending', role: 'Freelancer' } });

    const notice = await env.DB.prepare('SELECT subject, body FROM dev_mail WHERE email = ?').bind('team@example.com').first<{ subject: string; body: string }>();
    expect(notice?.subject).toContain('More templates');
    expect(notice?.body).toContain('Six cafes');
  });

  it('an admin answers the reviewed round, not the emailed one', async () => {
    const cookie = await signIn('asker2@example.com');
    const boss = await signIn('granter@example.com');
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('granter@example.com').run();
    const slugs = await otherSlugs(FREE * 2 + 1);

    for (const slug of slugs.slice(0, FREE)) await choose(cookie, slug);
    await ask(cookie, FIRST);
    await follow((await linkFor('asker2@example.com')).url);
    for (const slug of slugs.slice(FREE, FREE * 2)) await choose(cookie, slug);
    expect((await ask(cookie, SECOND)).status).toBe(200);

    // The directory reads the same allowance rule as the person's own page,
    // so an account that followed the emailed link counts that grant too.
    const directory = async () =>
      ((await SELF.fetch(`${ORIGIN}/api/admin/users?q=asker2`, { headers: { cookie: boss } }).then((r) => r.json())) as {
        users: { email: string; chosen: number; allowance: number }[];
      }).users.find((row) => row.email === 'asker2@example.com')!;
    expect(await directory()).toMatchObject({ chosen: FREE * 2, allowance: FREE * 2 });

    type Listed = { counts: Record<string, number>; requests: { id: string; email: string; round: number; chosen: number; allowance: number; firstActivatedAt: string | null; need: string }[] };
    const list = async (tab: string) =>
      (await SELF.fetch(`${ORIGIN}/api/admin/requests?tab=${tab}`, { headers: { cookie: boss } }).then((r) => r.json())) as Listed;

    const review = await list('review');
    const request = review.requests.find((row) => row.email === 'asker2@example.com')!;
    expect(request).toMatchObject({ round: 2, chosen: FREE * 2, allowance: FREE * 2, need: '10' });
    expect(request.firstActivatedAt).not.toBeNull();
    const linked = (await list('link')).requests.find((row) => row.email === 'asker2@example.com')!;
    expect(linked.round).toBe(1);

    const decide = (id: string, body: unknown, who = boss) =>
      SELF.fetch(`${ORIGIN}/api/admin/requests/${id}`, { method: 'POST', headers: { ...json, cookie: who }, body: JSON.stringify(body) });

    expect((await decide(request.id, { status: 'granted', granted: 3 }, cookie)).status).toBe(404);
    expect((await decide(request.id, { status: 'granted', granted: 0 })).status).toBe(400);
    // The emailed round is the person's to take, not the admin's.
    expect((await decide(linked.id, { status: 'declined' })).status).toBe(404);

    const granted = await decide(request.id, { status: 'granted', granted: 3 });
    expect(await granted.json()).toMatchObject({ request: { status: 'granted', granted: 3 }, mailed: true });
    expect(await mine(cookie)).toMatchObject({ used: FREE * 2, total: FREE * 2 + 3, left: 3 });
    expect(await directory()).toMatchObject({ chosen: FREE * 2, allowance: FREE * 2 + 3 });

    // Undo takes the grant away; nothing already chosen is taken back.
    await choose(cookie, slugs[FREE * 2]);
    expect((await decide(request.id, { status: 'pending' })).status).toBe(200);
    expect(await mine(cookie)).toMatchObject({ used: FREE * 2 + 1, total: FREE * 2, left: 0 });
  });

  it('a resent link replaces the old one, once the first is due, and a lapsed link says so', async () => {
    const cookie = await signIn('resender@example.com');
    const me = await userId('resender@example.com');
    for (const slug of await otherSlugs(FREE)) await choose(cookie, slug);
    await ask(cookie, FIRST);
    const old = (await linkFor('resender@example.com')).url;
    const resend = () =>
      SELF.fetch(`${ORIGIN}/api/account/templates/request/resend`, { method: 'POST', headers: { ...json, cookie } });

    // Not before the first email is due: Resend still holds that message,
    // and a new token now would make the link in it dead on arrival.
    const early = await resend();
    expect(early.status, await early.clone().text()).toBe(409);
    expect((await linkFor('resender@example.com')).url).toBe(old);

    await env.DB.prepare('UPDATE template_request SET send_at = unixepoch() - 60 WHERE user_id = ?').bind(me).run();
    const sent = await resend();
    expect(sent.status, await sent.clone().text()).toBe(200);
    const fresh = (await linkFor('resender@example.com')).url;
    expect(fresh).not.toBe(old);
    expect((await follow(old)).headers.get('location')).toBe('/account/?activated=unknown');

    // Each resend is a real email, so a few in a row is a burst: three tries
    // in ten minutes, the refused one above included.
    expect((await resend()).status).toBe(200);
    const limited = await resend();
    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toMatch(/^\d+$/);
    const newest = (await linkFor('resender@example.com')).url;
    expect(newest).not.toBe(fresh);

    await env.DB.prepare('UPDATE template_request SET expires_at = unixepoch() - 60 WHERE user_id = ?').bind(me).run();
    expect((await follow(newest)).headers.get('location')).toBe('/account/?activated=expired');
    expect((await mine(cookie)).total).toBe(FREE);
  });
});
