import { SELF, env } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { AUTH_LINK_HOURS, verificationEmail } from '../lib/mail';
import { ORIGIN, json, signIn } from './helpers';

const ROUTES = ['overview', 'users', 'usage', 'generations', 'templates', 'uploads', 'quotas', 'mail', 'emails'];

const cookieOf = (response: Response) =>
  response.headers
    .getSetCookie()
    .map((c) => c.split(';')[0])
    // An expired cookie is the server clearing it, not one to send back.
    .filter((c) => !c.endsWith('='))
    .join('; ');

/** A fresh sign-in, so the session carries the role granted after sign-up. */
async function signInAgain(email: string, password = 'correct horse battery staple'): Promise<Response> {
  return SELF.fetch(`${ORIGIN}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: json,
    body: JSON.stringify({ email, password }),
  });
}

describe('the admin tier', () => {
  let member: string;
  let admin: string;

  beforeAll(async () => {
    member = await signIn('member@example.com');
    admin = await signIn('boss@example.com');
    // The first admin comes from outside the app (scripts/admin-grant.mjs
    // does this against D1); the test does it directly.
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('boss@example.com').run();
  });

  it('does not exist for anyone else', async () => {
    for (const route of ROUTES) {
      expect((await SELF.fetch(`${ORIGIN}/api/admin/${route}`)).status, route).toBe(404);
      expect((await SELF.fetch(`${ORIGIN}/api/admin/${route}`, { headers: { cookie: member } })).status, route).toBe(404);
    }
  });

  it('answers an admin on every route', async () => {
    // The role is read from the session, which the cookie cache may hold
    // for a few minutes; a fresh sign-in after the grant is the honest shape.
    const fresh = await SELF.fetch(`${ORIGIN}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: json,
      body: JSON.stringify({ email: 'boss@example.com', password: 'correct horse battery staple' }),
    });
    const cookie = fresh.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ') || admin;

    for (const route of ROUTES) {
      const response = await SELF.fetch(`${ORIGIN}/api/admin/${route}`, { headers: { cookie } });
      expect(response.status, `${route}: ${await response.clone().text()}`).toBe(200);
    }

    const overview = (await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie } }).then((r) => r.json())) as {
      users: number;
      signupsByDay: { day: string; n: number }[];
    };
    expect(overview.users).toBeGreaterThanOrEqual(2);
    // Both accounts were created moments ago, so today is a day with sign-ups.
    expect(overview.signupsByDay.reduce((sum, row) => sum + row.n, 0)).toBeGreaterThanOrEqual(2);

    const users = (await SELF.fetch(`${ORIGIN}/api/admin/users?q=member`, { headers: { cookie } }).then((r) => r.json())) as {
      users: { email: string }[];
    };
    expect(users.users.map((u) => u.email)).toEqual(['member@example.com']);
  });
});

describe('admins by configuration', () => {
  it('grants the role on sign-up to an address in ADMIN_EMAILS, case-insensitively', async () => {
    const cookie = await signIn('SECOND@example.com');
    const response = await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie } });
    expect(response.status).toBe(200);
  });

  it('promotes an existing account the next time it signs in', async () => {
    // Created as a plain member, then named in the setting: simulated by
    // clearing the role the hook just set and signing in again. The old
    // cookie stops working at once: the gate reads past the cookie cache.
    const first = await signIn('root@example.com');
    await env.DB.prepare("UPDATE user SET role = NULL WHERE email = ?").bind('root@example.com').run();
    expect((await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie: first } })).status).toBe(404);

    const again = await SELF.fetch(`${ORIGIN}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: json,
      body: JSON.stringify({ email: 'root@example.com', password: 'correct horse battery staple' }),
    });
    const cookie = again.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
    expect((await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie } })).status).toBe(200);

    const row = await env.DB.prepare('SELECT role FROM user WHERE email = ?').bind('root@example.com').first<{ role: string | null }>();
    expect(row?.role).toBe('admin');

    // And the session says so, which the row passing does not imply: the
    // pages read the role off the session the browser holds, and a promotion
    // written after the session was minted is missing from its cookie cache
    // (see the hooks in auth.ts).
    const session = (await SELF.fetch(`${ORIGIN}/api/auth/get-session`, { headers: { cookie } }).then((r) => r.json())) as {
      user?: { role?: string | null };
    } | null;
    expect(session?.user?.role).toBe('admin');
  });
});

describe('acting on accounts', () => {
  let admin: string;
  let adminId: string;

  beforeAll(async () => {
    await signIn('keeper@example.com');
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('keeper@example.com').run();
    admin = cookieOf(await signInAgain('keeper@example.com'));
    adminId = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('keeper@example.com').first<{ id: string }>())!.id;
  });

  const call = (path: string, init: RequestInit = {}) =>
    SELF.fetch(`${ORIGIN}/api/admin/${path}`, { ...init, headers: { ...json, cookie: admin, ...init.headers } });

  it('lists every account on the one plan there is', async () => {
    const body = (await call('users?q=keeper').then((r) => r.json())) as { users: { plan: string; test: boolean }[] };
    expect(body.users).toEqual([expect.objectContaining({ plan: 'free', test: false })]);
  });

  it('removes an account, its rows and its pictures, but never your own or an admin', async () => {
    await signIn('leaving@example.com');
    const { id } = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('leaving@example.com').first<{ id: string }>())!;
    const key = `up/${id}/picture.png`;

    await env.MEDIA.put(key, new Uint8Array([1, 2, 3]));
    await env.DB.prepare('INSERT INTO upload (id, user_id, key, content_type, bytes) VALUES (?, ?, ?, ?, ?)')
      .bind('upload-leaving', id, key, 'image/png', 3)
      .run();
    await env.DB.prepare('INSERT INTO template_choice (id, user_id, slug) VALUES (?, ?, ?)').bind('choice-leaving', id, 'verdant').run();

    expect((await call(`users/${adminId}`, { method: 'DELETE' })).status).toBe(400);

    await signIn('deputy@example.com');
    await env.DB.prepare("UPDATE user SET role = 'admin' WHERE email = ?").bind('deputy@example.com').run();
    const deputy = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('deputy@example.com').first<{ id: string }>())!;
    expect((await call(`users/${deputy.id}`, { method: 'DELETE' })).status).toBe(409);

    const response = await call(`users/${id}`, { method: 'DELETE' });
    expect(response.status, await response.clone().text()).toBe(200);

    const count = (table: string) =>
      env.DB.prepare(`SELECT count(*) AS n FROM ${table} WHERE user_id = ?`).bind(id).first<{ n: number }>().then((row) => row?.n);
    expect(await env.DB.prepare('SELECT id FROM user WHERE id = ?').bind(id).first()).toBeNull();
    // The rows cascade: D1 enforces the foreign keys.
    expect(await count('session')).toBe(0);
    expect(await count('account')).toBe(0);
    expect(await count('upload')).toBe(0);
    expect(await count('template_choice')).toBe(0);
    // The bytes do not, and went anyway.
    expect(await env.MEDIA.get(key)).toBeNull();

    expect((await call(`users/${id}`, { method: 'DELETE' })).status).toBe(404);
  });

  it('makes verified test accounts on the reserved domain, and removes them all', async () => {
    const made = await call('test-users', { method: 'POST', body: JSON.stringify({ password: 'test-abcdefgh', prefix: 'Checkout-Flow' }) });
    expect(made.status, await made.clone().text()).toBe(200);
    const { user } = (await made.json()) as { user: { email: string } };
    expect(user.email).toBe('checkout-flow@tabbied.test');

    // The same address twice is better-auth's refusal, said in words.
    const again = await call('test-users', { method: 'POST', body: JSON.stringify({ password: 'test-abcdefgh', prefix: 'checkout-flow' }) });
    expect(again.status).toBe(400);
    expect(((await again.json()) as { error: string }).error).toMatch(/exists/i);

    // Generated when no address is given; nothing but the domain is possible.
    const generated = (await call('test-users', { method: 'POST', body: JSON.stringify({ password: 'test-abcdefgh' }) }).then((r) => r.json())) as {
      user: { email: string };
    };
    expect(generated.user.email).toMatch(/^test-[a-z0-9]{5}@tabbied\.test$/);
    expect((await call('test-users', { method: 'POST', body: JSON.stringify({ password: 'test-abcdefgh', prefix: 'a@b.com' }) })).status).toBe(400);
    expect((await call('test-users', { method: 'POST', body: JSON.stringify({ password: 'short' }) })).status).toBe(400);

    // Verified: sign-in, which requires it, lets the account in with the password it was made with.
    expect((await signInAgain('checkout-flow@tabbied.test', 'test-abcdefgh')).status).toBe(200);

    // A lookalike on another domain is not a test account, and survives "Remove all".
    await signIn('someone@tabbied.testing.com');
    const listed = (await call('users?scope=test&limit=200').then((r) => r.json())) as { testDomain: string; users: { email: string; test: boolean }[] };
    expect(listed.testDomain).toBe('tabbied.test');
    expect(listed.users.map((row) => row.email).sort()).toEqual([generated.user.email, 'checkout-flow@tabbied.test'].sort());
    expect(listed.users.every((row) => row.test)).toBe(true);

    const cleared = (await call('test-users', { method: 'DELETE' }).then((r) => r.json())) as { removed: number };
    expect(cleared.removed).toBe(2);
    expect(((await call('users?scope=test').then((r) => r.json())) as { users: unknown[] }).users).toEqual([]);
    expect(await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('someone@tabbied.testing.com').first()).not.toBeNull();
  });

  it('previews every message and sends a test copy only to the admin asking', async () => {
    const preview = (await call('emails').then((r) => r.json())) as {
      provider: string;
      to: string;
      emails: { key: string; subject: string; text: string; html: string | null }[];
    };
    expect(preview.provider).toBe('dev-mail');
    expect(preview.to).toBe('keeper@example.com');
    expect(preview.emails.map((email) => email.key)).toEqual(['verify', 'reset', 'approval', 'request', 'granted', 'added', 'declined']);
    const approval = preview.emails.find((email) => email.key === 'approval')!;
    expect(approval.subject).toBe('Your 5 extra templates are ready');
    expect(approval.html).toContain('PREVIEW-ONLY');
    // The two better-auth mails are designed too, and carry the link twice:
    // on the button and written out for a client that will not follow it.
    for (const key of ['verify', 'reset']) {
      const html = preview.emails.find((email) => email.key === key)!.html!;
      expect(html, key).toContain('<!DOCTYPE html>');
      expect(html.match(/PREVIEW-ONLY/g)?.length, key).toBe(3);
    }

    // A body naming another address is ignored: there is no field for one.
    const sent = await call('emails/test', { method: 'POST', body: JSON.stringify({ key: 'reset', to: 'victim@example.com' }) });
    expect(sent.status, await sent.clone().text()).toBe(200);
    const mail = await env.DB.prepare('SELECT subject, url FROM dev_mail WHERE email = ?').bind('keeper@example.com').first<{ subject: string; url: string }>();
    expect(mail).toEqual({ subject: 'Reset your Tabbied password', url: expect.stringContaining('PREVIEW-ONLY') });
    expect(await env.DB.prepare('SELECT email FROM dev_mail WHERE email = ?').bind('victim@example.com').first()).toBeNull();

    expect((await call('emails/test', { method: 'POST', body: JSON.stringify({ key: 'nope' }) })).status).toBe(400);
  });

  it("takes chosen templates back, with the sites made on them, and adds to a person's limit", async () => {
    const cookie = await signIn('chooser@example.com');
    const { id } = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('chooser@example.com').first<{ id: string }>())!;
    for (const slug of ['verdant', 'solstice', 'cobalt-works']) {
      await env.DB.prepare('INSERT INTO template_choice (id, user_id, slug) VALUES (?, ?, ?)').bind(`choice-${slug}`, id, slug).run();
    }
    // A customized site on verdant, with a revision and a picture.
    await env.DB.prepare('INSERT INTO site (id, user_id, slug, title, spec_version, template_hash) VALUES (?, ?, ?, ?, ?, ?)')
      .bind('site-verdant', id, 'verdant', 'Pat Plants', 1, 'hash')
      .run();
    await env.DB.prepare('INSERT INTO revision (id, site_id, n, edits, source, model) VALUES (?, ?, ?, ?, ?, ?)')
      .bind('rev-verdant', 'site-verdant', 1, '{}', 'manual', 'none')
      .run();
    const picture = 'gen/site/site-verdant/1/hero.webp';
    await env.MEDIA.put(picture, new Uint8Array([1]));

    const remove = (body: unknown) => call(`users/${id}/templates/remove`, { method: 'POST', body: JSON.stringify(body) });

    // One template: its choice, its site, the site's revision and picture go; the rest stay.
    const one = (await remove({ slugs: ['verdant', 'never-chosen'] }).then((r) => r.json())) as {
      removed: string[];
      sitesDeleted: number;
      used: number;
    };
    expect(one).toMatchObject({ removed: ['verdant'], sitesDeleted: 1, used: 2 });
    expect(await env.DB.prepare('SELECT id FROM site WHERE id = ?').bind('site-verdant').first()).toBeNull();
    expect(await env.DB.prepare('SELECT id FROM revision WHERE id = ?').bind('rev-verdant').first()).toBeNull();
    expect(await env.MEDIA.get(picture)).toBeNull();

    // Reset: every other one.
    const all = (await remove({ all: true }).then((r) => r.json())) as { removed: string[]; used: number };
    expect(all.removed.sort()).toEqual(['cobalt-works', 'solstice']);
    expect(all.used).toBe(0);
    expect((await remove({})).status).toBe(400);

    // Adding to the limit: counted everywhere the allowance is read, mailed when asked.
    expect((await call(`users/${id}/grants`, { method: 'POST', body: JSON.stringify({ granted: 21 }) })).status).toBe(400);
    const grant = (await call(`users/${id}/grants`, {
      method: 'POST',
      body: JSON.stringify({ granted: 3, note: 'Workshop attendee', notify: true }),
    }).then((r) => r.json())) as { grant: { id: string }; total: number; mailed: boolean };
    expect(grant.total).toBe(8);
    expect(grant.mailed).toBe(true);
    const mail = await env.DB.prepare('SELECT subject, body FROM dev_mail WHERE email = ?').bind('chooser@example.com').first<{ subject: string; body: string }>();
    expect(mail?.subject).toBe('You have more Tabbied templates');
    expect(mail?.body).toContain('choose 8 in all');

    // The person's own page reads the same allowance.
    const theirs = (await SELF.fetch(`${ORIGIN}/api/account/templates`, { headers: { cookie } }).then((r) => r.json())) as { total: number };
    expect(theirs.total).toBe(8);
    const detail = (await call(`users/${id}`).then((r) => r.json())) as {
      templates: { total: number; grants: { granted: number; note: string; grantedBy: string | null }[] };
    };
    expect(detail.templates.grants).toEqual([expect.objectContaining({ granted: 3, note: 'Workshop attendee', grantedBy: 'keeper@example.com' })]);

    // A quiet grant sends nothing; taking one back lowers the limit again.
    const quiet = (await call(`users/${id}/grants`, { method: 'POST', body: JSON.stringify({ granted: 2, notify: false }) }).then((r) => r.json())) as {
      grant: { id: string };
      total: number;
      mailed: boolean | null;
    };
    expect(quiet).toMatchObject({ total: 10, mailed: null });
    const undone = (await call(`users/${id}/grants/${grant.grant.id}`, { method: 'DELETE' }).then((r) => r.json())) as { total: number };
    expect(undone.total).toBe(7);
    expect((await call(`users/${id}/grants/${grant.grant.id}`, { method: 'DELETE' })).status).toBe(404);
  });

  it('lets an admin see the site as a member, and come back', async () => {
    await signIn('troubled@example.com');
    const { id } = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('troubled@example.com').first<{ id: string }>())!;

    const start = await SELF.fetch(`${ORIGIN}/api/auth/admin/impersonate-user`, {
      method: 'POST',
      headers: { ...json, cookie: admin },
      body: JSON.stringify({ userId: id }),
    });
    expect(start.status, await start.clone().text()).toBe(200);
    // The browser keeps the admin_session cookie beside the new session.
    const jar = new Map([...admin.split('; '), ...cookieOf(start).split('; ')].map((pair) => [pair.split('=')[0], pair] as const));
    const as = [...jar.values()].join('; ');

    const session = (await SELF.fetch(`${ORIGIN}/api/auth/get-session`, { headers: { cookie: as } }).then((r) => r.json())) as {
      user: { email: string };
      session: { impersonatedBy: string | null };
    };
    expect(session.user.email).toBe('troubled@example.com');
    expect(session.session.impersonatedBy).toBe(adminId);
    // Seeing the site as them is exactly that: the admin tier is not theirs.
    expect((await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie: as } })).status).toBe(404);

    const stop = await SELF.fetch(`${ORIGIN}/api/auth/admin/stop-impersonating`, { method: 'POST', headers: { ...json, cookie: as } });
    expect(stop.status, await stop.clone().text()).toBe(200);
    const back = [...new Map([...as.split('; '), ...cookieOf(stop).split('; ')].map((pair) => [pair.split('=')[0], pair] as const)).values()].join('; ');
    expect((await SELF.fetch(`${ORIGIN}/api/admin/overview`, { headers: { cookie: back } })).status).toBe(200);
  });
});

describe('the account emails', () => {
  it('say how long the link lasts, and better-auth is told the same', async () => {
    const mail = verificationEmail({ name: 'Pat <b>Lee</b>', url: 'https://tabbied.com/x?token=a&b=c' });
    // A name reaches the markup as characters, and the link's ampersand as an entity.
    expect(mail.html).toContain('Hi Pat,');
    expect(mail.html).not.toContain('<b>');
    expect(mail.html).toContain('token=a&amp;b=c');
    expect(mail.text).toContain(`expires in ${AUTH_LINK_HOURS} hour`);

    // A real sign-up's link carries the lifetime the email states.
    await signIn('lifetime@example.com');
    const row = await env.DB.prepare('SELECT url FROM dev_mail WHERE email = ?').bind('lifetime@example.com').first<{ url: string }>();
    const token = new URL(row!.url).searchParams.get('token')!;
    const claims = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as { iat: number; exp: number };
    expect(claims.exp - claims.iat).toBe(AUTH_LINK_HOURS * 3600);
  });
});
