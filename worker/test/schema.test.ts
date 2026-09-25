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
    };
    expect(body.status).toBe('ok');
    expect(body.schema.expected).toBe(latest);
    expect(body.schema.applied).toBe(latest);
    expect(body.schema.current).toBe(true);
  });

  it('answers a genuine miss as a 404 while the schema is current', async () => {
    const response = await SELF.fetch(`${ORIGIN}/api/studio/sites/nope`);
    expect(response.status).toBe(404);
  });

  // 0005 rebuilt `site` and `revision`, child first, and the rebuilt child
  // referenced the parent by its temporary name. This pins that the rename
  // rewrote the reference: a foreign key left pointing at `__new_site` would
  // fail every insert.
  it('leaves revision referencing site after the rebuild', async () => {
    const { results } = await env.DB.prepare('PRAGMA foreign_key_list(revision)').all<{
      table: string;
      from: string;
      on_delete: string;
    }>();
    expect(results).toHaveLength(1);
    expect(results[0].table).toBe('site');
    expect(results[0].from).toBe('site_id');
    expect(results[0].on_delete).toBe('CASCADE');

    const columns = await env.DB.prepare('PRAGMA table_info(site)').all<{ name: string; notnull: number }>();
    const nullable = new Map(columns.results.map((column) => [column.name, column.notnull === 0]));
    expect(nullable.get('generation_id')).toBe(true);
    expect(nullable.get('direction_index')).toBe(true);
    expect(nullable.get('slug')).toBe(false);
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
