import { Hono } from 'hono';
import { and, desc, eq, gte, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { aiUsage } from '../db/schema';
import type { Env } from '../env';
import { HISTORY_MONTHS, downloadStatus, recentDownloads } from '../lib/downloads';
import { loadEditableCatalog } from '../lib/templateAssets';
import { DAILY_CAPS, startOfUtcDay, type Endpoint } from '../lib/quota';
import { requireUser } from '../lib/session';

// A person's own account data beyond what better-auth serves: today's spend
// against the caps, the month's template downloads against theirs, the
// templates they have taken lately, and the recent ledger. Session-scoped
// throughout.

const account = new Hono<{ Bindings: Env }>();

account.get('/usage', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your usage.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const since = startOfUtcDay();

  const today = await db
    .select({ endpoint: aiUsage.endpoint, calls: sql<number>`count(*)` })
    .from(aiUsage)
    .where(and(eq(aiUsage.userId, userId), gte(aiUsage.createdAt, since)))
    .groupBy(aiUsage.endpoint);

  const used = new Map(today.map((row) => [row.endpoint, Number(row.calls)]));

  const usage = (Object.keys(DAILY_CAPS) as Endpoint[]).map((endpoint) => ({
    endpoint,
    label: DAILY_CAPS[endpoint].label,
    used: used.get(endpoint) ?? 0,
    cap: DAILY_CAPS[endpoint].calls,
  }));

  const recent = await db
    .select({
      endpoint: aiUsage.endpoint,
      model: aiUsage.model,
      promptTokens: aiUsage.promptTokens,
      completionTokens: aiUsage.completionTokens,
      imageCount: aiUsage.imageCount,
      createdAt: aiUsage.createdAt,
    })
    .from(aiUsage)
    .where(eq(aiUsage.userId, userId))
    .orderBy(desc(aiUsage.createdAt))
    .limit(30);

  const downloads = await downloadStatus(db, userId);

  return c.json({
    resetsAt: new Date(since.getTime() + 86_400_000),
    usage,
    recent,
    downloads: { used: downloads.used, cap: downloads.cap, resetsAt: downloads.resetsAt },
  });
});

// The templates this person took in the last six months, newest first, each
// named from the template catalog the deployment serves (a slug is all the
// ledger keeps, and a name that changed with a re-packaging should read as it
// reads now). A template the catalog no longer lists keeps its slug.
account.get('/downloads', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your downloads.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const [rows, catalog] = await Promise.all([
    recentDownloads(db, userId),
    loadEditableCatalog(c.env, c.req.raw).catch(() => null),
  ]);
  const names = new Map((catalog?.templates ?? []).map((entry) => [entry.slug, entry.name ?? entry.slug]));

  return c.json({
    months: HISTORY_MONTHS,
    downloads: rows.map((row) => ({
      slug: row.slug,
      name: names.get(row.slug) ?? row.slug,
      format: row.format,
      createdAt: row.createdAt,
    })),
  });
});

export default account;
