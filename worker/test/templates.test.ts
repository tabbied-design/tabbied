import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import app from '../index';
import type { Env } from '../env';
import { ORIGIN, json, signIn } from './helpers';

// Every template is free to download and customize without an account. The
// zip route serves anyone and logs each zip it serves, with the person when
// one is signed in; an account is only for saving a customization, and there
// is no count of those to run out of. The site's product events
// (routes/events.ts) are counted beside the downloads.

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

const userId = async (email: string) =>
  (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind(email).first<{ id: string }>())!.id;

/** The download log for one template, oldest first. The storage is shared by the file, so each test reads its own slug. */
const logOf = async (slug: string) =>
  (
    await env.DB.prepare('SELECT user_id AS userId, format FROM download WHERE slug = ? ORDER BY rowid')
      .bind(slug)
      .all<{ userId: string | null; format: string }>()
  ).results;

describe('template downloads', () => {
  it('serves a zip to anyone, and logs it with no user', async () => {
    const [slug] = await otherSlugs(1);

    // A click and a fetch alike: nothing redirects to sign in any more.
    const clicked = await SELF.fetch(zipFor(slug), { redirect: 'manual', headers: asNavigation() });
    expect(clicked.status).toBe(200);
    expect(clicked.headers.get('content-type')).toContain('zip');
    await clicked.arrayBuffer();

    const fetched = await SELF.fetch(zipFor(slug, 'react'), { headers: asFetch() });
    expect(fetched.status).toBe(200);
    await fetched.arrayBuffer();

    expect(await logOf(slug)).toEqual([
      { userId: null, format: 'html' },
      { userId: null, format: 'react' },
    ]);
  });

  it('logs a signed-in download against the person, as often as they take it', async () => {
    const cookie = await signIn('downloader@example.com');
    const me = await userId('downloader@example.com');
    const slugs = await otherSlugs(8);

    // Well past the five the beta allowed, and the same one twice.
    for (const slug of [...slugs.slice(1), slugs[1]]) {
      const response = await SELF.fetch(zipFor(slug), { headers: asFetch(cookie) });
      expect(response.status, slug).toBe(200);
      await response.arrayBuffer();
    }

    expect(await logOf(slugs[1])).toEqual([
      { userId: me, format: 'html' },
      { userId: me, format: 'html' },
    ]);
    expect(await logOf(slugs[7])).toEqual([{ userId: me, format: 'html' }]);
  });

  it('a session that cannot be read still downloads, as anonymous', async () => {
    // Past the eight the test above takes, so the log is this test's alone.
    const slug = (await otherSlugs(10))[9];
    const response = await SELF.fetch(zipFor(slug, 'react'), {
      headers: asFetch('better-auth.session_token=not-a-real-session'),
    });
    expect(response.status).toBe(200);
    await response.arrayBuffer();

    expect(await logOf(slug)).toEqual([{ userId: null, format: 'react' }]);
  });

  it('an auth tier with no secret, or a changed one, still downloads, as anonymous', async () => {
    // The route is called with altered bindings, so the cookie was signed by
    // a secret the Worker no longer has, or the Worker has none at all.
    const cookie = await signIn('rotated@example.com');
    const slug = (await otherSlugs(12))[11];
    const base = env as unknown as Env;

    for (const bindings of [
      { ...base, BETTER_AUTH_SECRET: undefined, DEV: undefined },
      { ...base, BETTER_AUTH_SECRET: 'a-secret-the-cookie-was-not-signed-with' },
    ]) {
      const response = await app.request(zipFor(slug), { headers: asFetch(cookie) }, bindings);
      expect(response.status).toBe(200);
      await response.arrayBuffer();
    }

    expect(await logOf(slug)).toEqual([
      { userId: null, format: 'html' },
      { userId: null, format: 'html' },
    ]);
  });

  it('a HEAD, or a range resuming a copy, is served and writes nothing', async () => {
    const before = (await logOf('verdant')).length;

    const head = await SELF.fetch(zipFor('verdant'), { method: 'HEAD', headers: asFetch() });
    expect(head.status).toBe(200);

    const resumed = await SELF.fetch(zipFor('verdant'), { headers: { ...asFetch(), range: 'bytes=100-' } });
    expect(resumed.ok).toBe(true);
    await resumed.arrayBuffer();

    expect(await logOf('verdant')).toHaveLength(before);

    // A range from the first byte is a copy starting, and counts.
    const fromStart = await SELF.fetch(zipFor('verdant'), { headers: { ...asFetch(), range: 'bytes=0-' } });
    expect(fromStart.ok).toBe(true);
    await fromStart.arrayBuffer();
    expect(await logOf('verdant')).toHaveLength(before + 1);
  });

  it('a zip the packager never wrote is a 404 and logs nothing', async () => {
    const cookie = await signIn('missing@example.com');

    expect((await SELF.fetch(zipFor('no-such-site'), { headers: asFetch() })).status).toBe(404);
    expect((await SELF.fetch(zipFor('no-such-site', 'react'), { headers: asFetch(cookie) })).status).toBe(404);
    expect(await logOf('no-such-site')).toEqual([]);
  });

  it('other files under /downloads are plain assets', async () => {
    const page = await SELF.fetch(`${ORIGIN}/downloads/verdant/`, { headers: asNavigation() });
    expect(page.status).toBe(200);
    expect(await page.text()).toContain('<html');
  });

  it("never serves the React package's unzipped source, signed in or not", async () => {
    // The zip is the one way it leaves; the folder it was made from is in
    // the deploy but must not answer.
    const cookie = await signIn('react-source@example.com');
    const before = (await logOf('verdant')).length;
    const paths = [
      '/downloads/verdant-react',
      '/downloads/verdant-react/',
      '/downloads/verdant-react/src/App.tsx',
      '/downloads/verdant-react/package.json',
      '/downloads/verdant-react/LICENSE.md',
    ];

    for (const path of paths) {
      for (const headers of [asNavigation(), asFetch(cookie)]) {
        const response = await SELF.fetch(`${ORIGIN}${path}`, { headers });
        expect(response.status, path).toBe(404);
      }
    }

    // and nothing was logged on the way
    expect(await logOf('verdant')).toHaveLength(before);
  });
});

describe('saving a customization', () => {
  it('saves a site on any number of templates, with no count to check', async () => {
    const cookie = await signIn('customizer@example.com');
    const me = await userId('customizer@example.com');
    const save = (slug: string) =>
      SELF.fetch(`${ORIGIN}/api/studio/sites`, {
        method: 'POST',
        headers: { ...json, cookie },
        body: JSON.stringify({ slug }),
      });

    // Seven templates, two more than the beta's five, and one of them twice.
    // The burst gate (three a minute) is cleared between saves: it is not
    // what this is about.
    const slugs = ['verdant', ...(await otherSlugs(6)), 'verdant'];

    for (const slug of slugs) {
      await env.DB.prepare('DELETE FROM rate_window WHERE key = ?').bind(`site:${me}`).run();
      const made = await save(slug);
      expect(made.status, `${slug}: ${await made.clone().text()}`).toBe(200);
    }

    const sites = (await SELF.fetch(`${ORIGIN}/api/studio/sites`, { headers: { cookie } }).then((r) => r.json())) as {
      sites: { slug: string }[];
    };
    expect(sites.sites).toHaveLength(slugs.length);

    // Saving signed out is still an account's act.
    expect((await SELF.fetch(`${ORIGIN}/api/studio/sites`, { method: 'POST', headers: json, body: JSON.stringify({ slug: 'verdant' }) })).status).toBe(401);
  });

  it('the routes that chose, requested and granted templates are gone', async () => {
    const cookie = await signIn('former-chooser@example.com');

    for (const [method, path] of [
      ['GET', '/api/account/templates'],
      ['POST', '/api/account/templates'],
      ['POST', '/api/account/templates/request'],
      ['POST', '/api/account/templates/request/resend'],
      ['GET', '/api/account/templates/activate?token=PREVIEW-ONLY-not-a-real-token'],
    ]) {
      const response = await SELF.fetch(`${ORIGIN}${path}`, {
        method,
        redirect: 'manual',
        headers: { ...json, cookie },
        ...(method === 'POST' ? { body: JSON.stringify({ slug: 'verdant' }) } : {}),
      });
      expect(response.status, `${method} ${path}`).toBe(404);
      expect(await response.json(), path).toEqual({ error: 'Not found' });
    }
  });
});

describe('product events', () => {
  const send = (body: unknown, headers: Record<string, string> = {}) =>
    SELF.fetch(`${ORIGIN}/api/events`, {
      method: 'POST',
      headers: { ...json, ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });

  type Row = { kind: string; slug: string | null; userId: string | null };

  /** Every event row for a slug, or with no slug when it is null. */
  const rowsOf = async (slug: string | null) =>
    (
      await env.DB.prepare(
        `SELECT kind, slug, user_id AS userId FROM event WHERE ${slug === null ? 'slug IS NULL' : 'slug = ?'} ORDER BY rowid`
      )
        .bind(...(slug === null ? [] : [slug]))
        .all<Row>()
    ).results;

  it('counts each kind, with the person when one is signed in', async () => {
    const [slug] = await otherSlugs(1);
    const cookie = await signIn('eventful@example.com');
    const me = await userId('eventful@example.com');

    expect((await send({ kind: 'customize', slug })).status).toBe(204);
    expect((await send({ kind: 'save-gate', slug })).status).toBe(204);
    const saved = await send({ kind: 'gate-save', slug }, { cookie });
    expect(saved.status).toBe(204);
    expect(await saved.text()).toBe('');

    expect(await rowsOf(slug)).toEqual([
      { kind: 'customize', slug, userId: null },
      { kind: 'save-gate', slug, userId: null },
      { kind: 'gate-save', slug, userId: me },
    ]);

    // The slug is optional.
    const before = (await rowsOf(null)).length;
    expect((await send({ kind: 'customize' })).status).toBe(204);
    expect(await rowsOf(null)).toHaveLength(before + 1);
  });

  it('refuses what is not one of its events, and writes nothing', async () => {
    const before = await env.DB.prepare('SELECT count(*) AS n FROM event').first<{ n: number }>();

    for (const body of [
      { kind: 'download' },
      { kind: 'customize', slug: 'Not A Slug' },
      { kind: 'customize', slug: 'x'.repeat(81) },
      { slug: 'verdant' },
      'not json',
    ]) {
      const response = await send(body);
      expect(response.status, JSON.stringify(body)).toBe(400);
    }

    expect(await env.DB.prepare('SELECT count(*) AS n FROM event').first<{ n: number }>()).toEqual(before);
    expect((await send({ kind: 'customize', note: 'x'.repeat(4000) })).status).toBe(413);
  });

  it('holds one address to sixty a minute, and no other', async () => {
    const from = (ip: string) => ({ 'cf-connecting-ip': ip });

    for (let n = 0; n < 60; n++) {
      expect((await send({ kind: 'customize', slug: 'burst-test' }, from('203.0.113.7'))).status, `event ${n + 1}`).toBe(204);
    }

    const limited = await send({ kind: 'customize', slug: 'burst-test' }, from('203.0.113.7'));
    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toMatch(/^\d+$/);
    expect(await rowsOf('burst-test')).toHaveLength(60);

    expect((await send({ kind: 'customize', slug: 'burst-test' }, from('198.51.100.4'))).status).toBe(204);
  });
});
