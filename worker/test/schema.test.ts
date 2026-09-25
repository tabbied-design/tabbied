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
