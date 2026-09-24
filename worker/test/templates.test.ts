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
    expect(((await refused.json()) as { error: string }).error).toContain(`all ${FREE} of your templates`);

    const clicked = await SELF.fetch(zipFor(others[FREE - 1]), { redirect: 'manual', headers: asNavigation(cookie) });
    expect(clicked.status).toBe(302);
    expect(clicked.headers.get('location')).toBe('/account/?templates=full');

    // A chosen template is unlimited.
    for (let i = 0; i < 3; i += 1) {
      expect((await SELF.fetch(ZIP, { headers: asFetch(cookie) })).status).toBe(200);
    }

    const listed = await mine(cookie);
    expect(listed.chosen.map((row) => row.slug)).toEqual(['verdant', ...others.slice(0, FREE - 1)]);
    expect((await SELF.fetch(`${ORIGIN}/api/account/templates`)).status).toBe(401);
  });

  it('a HEAD, or a range resuming a copy, answers without choosing', async () => {
    const cookie = await signIn('prober@example.com');

    for (let i = 0; i < 10; i += 1) {
      expect((await SELF.fetch(zipFor('verdant'), { method: 'HEAD', headers: asFetch(cookie) })).status).toBe(200);
    }

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
  it('is one message, sent at the limit, that an admin grants or declines', async () => {
    const cookie = await signIn('asker@example.com');
    const boss = await signIn('granter@example.com');
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('granter@example.com').run();

    const ask = (note: string) =>
      SELF.fetch(`${ORIGIN}/api/account/templates/request`, {
        method: 'POST',
        headers: { ...json, cookie },
        body: JSON.stringify({ note }),
      });

    // Not before every template is chosen.
    expect((await ask('A studio in Portland.')).status).toBe(409);

    const slugs = await otherSlugs(FREE + 2);

    for (const slug of slugs.slice(0, FREE)) {
      expect((await choose(cookie, slug)).status).toBe(200);
    }

    expect((await ask('')).status).toBe(400);
    const sent = await ask('A studio in Portland building sites for cafes.');
    expect(sent.status, await sent.clone().text()).toBe(200);
    expect((await ask('And another thing.')).status).toBe(409);
    expect((await mine(cookie)).request).toMatchObject({ status: 'pending', granted: 0 });

    // The team heard about it (dev mail, since the tests hold no mail key).
    const notice = await env.DB.prepare('SELECT subject, body FROM dev_mail WHERE email = ?')
      .bind('team@example.com')
      .first<{ subject: string; body: string }>();
    expect(notice?.subject).toContain('More templates');
    expect(notice?.body).toContain('cafes');

    const list = (await SELF.fetch(`${ORIGIN}/api/admin/requests`, { headers: { cookie: boss } }).then((r) => r.json())) as {
      counts: Record<string, number>;
      requests: { id: string; email: string; chosen: number }[];
    };
    const request = list.requests.find((row) => row.email === 'asker@example.com')!;
    expect(request).toMatchObject({ chosen: FREE });
    expect(list.counts.pending).toBeGreaterThanOrEqual(1);

    const decide = (body: unknown, who = boss) =>
      SELF.fetch(`${ORIGIN}/api/admin/requests/${request.id}`, {
        method: 'POST',
        headers: { ...json, cookie: who },
        body: JSON.stringify(body),
      });

    expect((await decide({ status: 'granted', granted: 2 }, cookie)).status).toBe(404);
    expect((await decide({ status: 'granted', granted: 0 })).status).toBe(400);

    const granted = await decide({ status: 'granted', granted: 2 });
    expect(granted.status, await granted.clone().text()).toBe(200);
    expect(await granted.json()).toMatchObject({ request: { status: 'granted', granted: 2 }, mailed: true });
    expect(await mine(cookie)).toMatchObject({ used: FREE, total: FREE + 2, left: 2 });
    expect((await choose(cookie, slugs[FREE])).status).toBe(200);

    const told = await env.DB.prepare('SELECT subject FROM dev_mail WHERE email = ?')
      .bind('asker@example.com')
      .first<{ subject: string }>();
    expect(told?.subject).toBe('You have more Tabbied templates');

    // Undo takes the grant away; nothing already chosen is taken back.
    expect((await decide({ status: 'pending' })).status).toBe(200);
    expect(await mine(cookie)).toMatchObject({ used: FREE + 1, total: FREE, left: 0 });

    const detail = (await SELF.fetch(`${ORIGIN}/api/admin/users/${await userId('asker@example.com')}`, {
      headers: { cookie: boss },
    }).then((r) => r.json())) as { templates: { used: number; total: number } };
    expect(detail.templates).toMatchObject({ used: FREE + 1, total: FREE });
  });
});
