import { and, asc, eq, sql } from 'drizzle-orm';
import { templateChoice, templateRequest } from '../db/schema';
import type { Db } from './quota';

// The templates a person has made theirs.
//
// During the beta every account may choose five website templates. A
// template is chosen explicitly ("Choose template"), or on the first
// download of it, or on the first customizer save of it; once chosen it is
// downloaded and customized as often as the person likes. An admin can add
// more by granting a "Request more" message (`templateRequest`).
//
// This replaced a cap of thirty distinct templates a month. What stayed is
// the shape of the claim: the check and the write are one statement
// (`claimTemplate`), because read, compare, then write let a burst of
// concurrent downloads all read a count under the limit before any wrote.

export const FREE_TEMPLATES = 5;

/** How many extra templates an admin may grant in one answer. */
export const MAX_GRANT = 20;

/** The SQL for a person's allowance: the free five plus a granted request. */
const allowanceSql = (userId: string) => sql`(
  ${FREE_TEMPLATES} + coalesce((
    select granted from template_request
    where user_id = ${userId} and status = 'granted'
  ), 0)
)`;

export type ChosenTemplate = { slug: string; createdAt: Date };

export type TemplateStatus = {
  chosen: ChosenTemplate[];
  used: number;
  total: number;
  left: number;
};

/** This person's chosen templates in the order they chose them, against their allowance. */
export async function templateStatus(db: Db, userId: string): Promise<TemplateStatus> {
  const [chosen, allowance] = await Promise.all([
    db
      .select({ slug: templateChoice.slug, createdAt: templateChoice.createdAt })
      .from(templateChoice)
      .where(eq(templateChoice.userId, userId))
      .orderBy(asc(templateChoice.createdAt), sql`rowid`),
    db.get<{ total: number }>(sql`select ${allowanceSql(userId)} as total`),
  ]);
  const total = Number(allowance?.total ?? FREE_TEMPLATES);
  const used = chosen.length;

  // An early account backfilled with more than five keeps them all; it simply
  // has none left, never a negative number.
  return { chosen, used, total, left: Math.max(0, total - used) };
}

/** Whether this template is already one of this person's. */
export async function hasChosen(db: Db, userId: string, slug: string): Promise<boolean> {
  const [row] = await db
    .select({ id: templateChoice.id })
    .from(templateChoice)
    .where(and(eq(templateChoice.userId, userId), eq(templateChoice.slug, slug)))
    .limit(1);

  return row !== undefined;
}

export type Claim =
  /** Already theirs, or chosen by this call (`id` then names the new row). */
  | { ok: true; id: string | null }
  /** Not theirs, and every template they may choose is chosen. */
  | { ok: false };

/**
 * Make a template this person's, if it is not already and they have one
 * left. The insert's own WHERE does the counting, so concurrent claims cannot
 * all slip under the allowance, and the unique (user, slug) index makes a
 * second claim of the same template a no-op rather than a second row.
 *
 * `id` is the row this call wrote, or null when the template was already
 * theirs; a caller whose follow-up fails (a zip that does not exist) gives a
 * new row back with `releaseTemplate`.
 */
export async function claimTemplate(db: Db, userId: string, slug: string): Promise<Claim> {
  const id = crypto.randomUUID();
  const result = await db.run(sql`
    insert or ignore into template_choice (id, user_id, slug)
    select ${id}, ${userId}, ${slug}
    where (select count(*) from template_choice where user_id = ${userId}) < ${allowanceSql(userId)}
  `);

  if ((result.meta.changes ?? 0) > 0) return { ok: true, id };

  // Nothing written: either it was already theirs (the unique index ignored
  // the insert) or they had none left.
  return (await hasChosen(db, userId, slug)) ? { ok: true, id: null } : { ok: false };
}

/** Give back a choice this request made and could not follow through on. */
export async function releaseTemplate(db: Db, id: string): Promise<void> {
  await db.delete(templateChoice).where(eq(templateChoice.id, id));
}

/** Whether a template could be taken right now: theirs, or one left. */
export async function mayTake(db: Db, userId: string, slug: string): Promise<boolean> {
  if (await hasChosen(db, userId, slug)) return true;

  return (await templateStatus(db, userId)).left > 0;
}

/** The sentence a refused claim answers with, for a toast or a JSON error. */
export const limitMessage = (total: number) =>
  `You have chosen all ${total} of your templates. Keep customizing and downloading those, or ask for more from your account page.`;

// ---- "Request more" ---------------------------------------------------------

export type RequestStatus = 'pending' | 'granted' | 'declined';

export const REQUEST_STATUSES: readonly RequestStatus[] = ['pending', 'granted', 'declined'];

/** The longest message a person may send. */
export const REQUEST_NOTE_MAX = 2000;

/** This person's request, if they have sent one. */
export async function requestOf(db: Db, userId: string) {
  const [row] = await db
    .select()
    .from(templateRequest)
    .where(eq(templateRequest.userId, userId))
    .limit(1);

  return row ?? null;
}
