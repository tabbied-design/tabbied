import { SELF, env } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { ORIGIN, json, signIn } from './helpers';

const ROUTES = ['overview', 'users', 'usage', 'generations', 'templates', 'uploads', 'quotas', 'mail'];

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
    expect(overview.signupsByDay.every((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.day))).toBe(true);

    // The member has asked Studio for one set of directions, and the row
    // says so: the per-user counts are correlated subqueries (see CLAUDE.md).
    const asked = await SELF.fetch(`${ORIGIN}/api/studio/directions`, {
      method: 'POST',
      headers: { ...json, cookie: member },
      body: JSON.stringify({ description: 'A bakery in a small coastal town, sourdough and coffee.' }),
    });
    expect(asked.status).toBe(200);

    const users = (await SELF.fetch(`${ORIGIN}/api/admin/users?q=member`, { headers: { cookie } }).then((r) => r.json())) as {
      users: { email: string; role: string | null; sites: number; generations: number }[];
    };
    expect(users.users.map((u) => u.email)).toEqual(['member@example.com']);
    expect(users.users[0].generations).toBe(1);
    expect(users.users[0].sites).toBe(0);

    const quotas = (await SELF.fetch(`${ORIGIN}/api/admin/quotas`, { headers: { cookie } }).then((r) => r.json())) as { editable: boolean };
    expect(quotas.editable).toBe(false);
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

describe('the api health report', () => {
  it('counts the configured admin addresses without naming them', async () => {
    const body = await SELF.fetch(`${ORIGIN}/api/health`).then((r) => r.json()) as Record<string, unknown>;

    // Two, from the vitest config's ADMIN_EMAILS.
    expect(body.adminEmails).toBe(2);
    expect(body.mail).toEqual({ provider: 'dev-mail', teamInboxes: 1 });
    expect(JSON.stringify(body)).not.toContain('example.com');
  });
});
