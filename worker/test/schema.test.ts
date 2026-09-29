import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import journal from '../migrations/meta/_journal.json';

// Whether the database the Worker was handed has this build's migrations:
// the health route says which migration is applied, and a schema-behind error
// is a 503 that names the cause.

const ORIGIN = 'https://tabbied.com';
const latest = journal.entries.at(-1)!.tag;

describe('the schema the deployment expects', () => {
  it('is reported by /api/health, and is current under the test migrations', async () => {
    const response = await SELF.fetch(`${ORIGIN}/api/health`);
    expect(response.status).toBe(200);

    const body = (await response.json()) as {
      status: string;
      schema: { expected: string; applied: string | null; current: boolean };
      adminEmails: number;
      mail: unknown;
    };
    expect(body.status).toBe('ok');
    expect(body.schema.expected).toBe(latest);
    expect(body.schema.applied).toBe(latest);
    expect(body.schema.current).toBe(true);

    // The same report counts the configured admin addresses (two, from the
    // vitest config's ADMIN_EMAILS) without naming them.
    expect(body.adminEmails).toBe(2);
    expect(body.mail).toEqual({ provider: 'dev-mail', teamInboxes: 1 });
    expect(JSON.stringify(body)).not.toContain('example.com');
  });

  it('counts a database ahead of the code as current, and one behind it as degraded', async () => {
    const health = async () =>
      (await SELF.fetch(`${ORIGIN}/api/health`).then((r) => r.json())) as {
        status: string;
        schema: { applied: string | null; current: boolean };
      };

    // Migrated before the code that reads it deployed: the safe order.
    await env.DB.prepare("INSERT INTO d1_migrations (name) VALUES ('9999_from_a_later_build.sql')").run();
    expect(await health()).toMatchObject({ status: 'ok', schema: { applied: '9999_from_a_later_build', current: true } });
    await env.DB.prepare("DELETE FROM d1_migrations WHERE name = '9999_from_a_later_build.sql'").run();

    // The latest migration never applied: behind, and said so.
    const newest = `${latest}.sql`;
    const row = await env.DB.prepare('SELECT id FROM d1_migrations WHERE name = ?').bind(newest).first<{ id: number }>();
    await env.DB.prepare('DELETE FROM d1_migrations WHERE name = ?').bind(newest).run();
    expect(await health()).toMatchObject({ status: 'degraded', schema: { current: false } });
    await env.DB.prepare('INSERT INTO d1_migrations (id, name) VALUES (?, ?)').bind(row!.id, newest).run();
    expect((await health()).status).toBe('ok');
  });

  // Last in the file on purpose: the storage is per test file, so the tables
  // stay dropped for anything that runs after this.
  it('answers a missing table as a 503 that names the cause, not a bare 500', async () => {
    await env.DB.prepare('DROP TABLE revision').run();
    await env.DB.prepare('DROP TABLE site').run();

    const response = await SELF.fetch(`${ORIGIN}/api/studio/sites/nope`);
    expect(response.status).toBe(503);

    const body = (await response.json()) as { error: string };
    expect(body.error).toMatch(/schema is behind/);
  });

});
