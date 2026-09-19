import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, json, signIn } from './helpers';

describe('account usage', () => {
  it('needs a session', async () => {
    expect((await SELF.fetch(`${ORIGIN}/api/account/usage`)).status).toBe(401);
  });

  it('reports every cap, and counts what the person spent today', async () => {
    const cookie = await signIn('spender@example.com');

    const before = (await SELF.fetch(`${ORIGIN}/api/account/usage`, { headers: { cookie } }).then((r) => r.json())) as {
      usage: { endpoint: string; used: number; cap: number }[];
      recent: unknown[];
    };
    expect(before.usage.map((row) => row.endpoint).sort()).toEqual(['direction-image', 'directions', 'site', 'site-image']);
    expect(before.usage.every((row) => row.used === 0 && row.cap > 0)).toBe(true);
    expect(before.recent).toHaveLength(0);

    // A generation with no upstream is answered from the matcher and spends
    // nothing, so the ledger stays empty - which is the honest number.
    await SELF.fetch(`${ORIGIN}/api/studio/directions`, {
      method: 'POST',
      headers: { ...json, cookie },
      body: JSON.stringify({ description: 'A bakery in a small coastal town, sourdough and coffee.' }),
    });
    const after = (await SELF.fetch(`${ORIGIN}/api/account/usage`, { headers: { cookie } }).then((r) => r.json())) as {
      usage: { endpoint: string; used: number }[];
    };
    expect(after.usage.find((row) => row.endpoint === 'directions')?.used).toBe(0);
  });
});

describe('account history', () => {
  it('lists only the signed-in person\'s own generations, newest first', async () => {
    expect((await SELF.fetch(`${ORIGIN}/api/studio/generations`)).status).toBe(401);

    const cookie = await signIn('historian@example.com');
    const other = await signIn('bystander@example.com');

    for (const description of ['A bakery in a small coastal town, sourdough and coffee.', 'A modern design studio in Berlin, minimal and precise.']) {
      const made = await SELF.fetch(`${ORIGIN}/api/studio/directions`, {
        method: 'POST',
        headers: { ...json, cookie },
        body: JSON.stringify({ description }),
      });
      expect(made.status).toBe(200);
    }

    type Listing = {
      generations: { id: string; description: string; sites: number; directions: { name: string; palette: string[] }[] }[];
    };
    const mine = (await SELF.fetch(`${ORIGIN}/api/studio/generations`, { headers: { cookie } }).then((r) => r.json())) as Listing;
    expect(mine.generations.map((row) => row.description)).toEqual([
      'A modern design studio in Berlin, minimal and precise.',
      'A bakery in a small coastal town, sourdough and coffee.',
    ]);
    expect(mine.generations[0].sites).toBe(0);
    expect(mine.generations[0].directions).toHaveLength(3);
    expect(mine.generations[0].directions[0].palette.length).toBeGreaterThan(0);

    // The count has to be able to be something other than 0: the subquery is
    // one of the single-table selects drizzle renders with bare column names
    // (see CLAUDE.md), and written the obvious way it compared two columns of
    // `site` and answered 0 for every row.
    const made = await SELF.fetch(`${ORIGIN}/api/studio/sites`, {
      method: 'POST',
      headers: { ...json, cookie },
      body: JSON.stringify({ generationId: mine.generations[0].id, index: 0 }),
    });
    expect(made.status, await made.clone().text()).toBe(200);

    const after = (await SELF.fetch(`${ORIGIN}/api/studio/generations`, { headers: { cookie } }).then((r) => r.json())) as Listing;
    expect(after.generations.map((row) => row.sites)).toEqual([1, 0]);

    // Somebody else's list is empty: the rows are scoped by session, not by id.
    const theirs = (await SELF.fetch(`${ORIGIN}/api/studio/generations`, { headers: { cookie: other } }).then((r) => r.json())) as { generations: unknown[] };
    expect(theirs.generations).toHaveLength(0);
  });
});
