import { and, asc, desc, eq, sql, type SQL } from 'drizzle-orm';
import { templateChoice, templateRequest } from '../db/schema';
import type { Db } from './quota';

// The templates a person has made theirs.
//
// During the beta every account may choose five website templates. A
// template is chosen explicitly ("Choose template"), or on the first
// download of it, or on the first customizer save of it; once chosen it is
// downloaded and customized as often as the person likes. "Request more"
// (`templateRequest`) adds to that: a first request by an emailed link that
// adds FIRST_REQUEST_GRANT, a later one by an admin's grant.
//
// This replaced a cap of thirty distinct templates a month. What stayed is
// the shape of the claim: the check and the write are one statement
// (`claimTemplate`), because read, compare, then write let a burst of
// concurrent downloads all read a count under the limit before any wrote.

export const FREE_TEMPLATES = 5;

/** How many extra templates an admin may grant in one answer. */
export const MAX_GRANT = 20;

/** What a first request's emailed link adds. */
export const FIRST_REQUEST_GRANT = 5;

/** The statuses whose `granted` counts toward the allowance. */
const COUNTED = sql`('activated', 'granted')`;

/**
 * The SQL for a person's allowance: the free five plus every grant that
 * took. `userId` is a value, or a column expression for a list that wants
 * the subquery correlated to each of its rows (qualified by hand, as the
 * drizzle note in CLAUDE.md says). The inner table is aliased so a query
 * over template_request itself still correlates to its outer row.
 *
 * One implementation, deliberately: the admin directory carried a third
 * copy that read one row where this sums them and counted 'granted' alone,
 * so an account that had followed the emailed link read "10 / 5" there
 * while its own page and the claim agreed on 10 of 10.
 */
export const allowanceSql = (userId: string | SQL) => sql`(
  ${FREE_TEMPLATES} + coalesce((
    select sum(r.granted) from template_request r
    where r.user_id = ${userId} and r.status in ${COUNTED}
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
//
// Round 1 is a person's first request: three questions, then an email a few
// minutes later with a link that adds FIRST_REQUEST_GRANT when followed. The
// delay is the design's ("usually within 5 minutes"): it reads as a request
// that was looked at rather than a button that pays out. Resend holds the
// message (`scheduled_at`), so nothing here has to wake up later. Every
// later round goes to the team (`pending`, then `granted` or `declined`).

export type RequestStatus = 'sent' | 'activated' | 'pending' | 'granted' | 'declined';

export const REQUEST_STATUSES: readonly RequestStatus[] = ['sent', 'activated', 'pending', 'granted', 'declined'];

/** The statuses that are still waiting on something, one per person at most. */
export const OPEN_STATUSES: readonly RequestStatus[] = ['sent', 'pending'];

/** How long after a first request its email arrives. */
export const FIRST_REQUEST_DELAY_MS = 5 * 60_000;

/** How long an emailed link works. */
export const LINK_LIFETIME_MS = 7 * 86_400_000;

/** The longest message a person may send. */
export const REQUEST_NOTE_MAX = 2000;

/** The choices the forms offer, so an answer is one of them or refused. */
export const REQUEST_CHOICES = {
  role: ['Freelancer', 'Agency', 'Business owner', 'Designer', 'Developer', 'Student', 'Other'],
  building: ['Client sites', 'My own business', 'Personal projects', 'School or learning'],
  sites: ['1-2', '3-10', '10+'],
  need: ['5', '10', '20+'],
  pay: ['Yes', 'Maybe', 'Not right now'],
} as const;

/** This person's requests, newest first. */
export function requestsOf(db: Db, userId: string) {
  return db
    .select()
    .from(templateRequest)
    .where(eq(templateRequest.userId, userId))
    .orderBy(desc(templateRequest.createdAt), sql`rowid desc`);
}

/** This person's latest request, if they have sent one. */
export async function requestOf(db: Db, userId: string) {
  const [row] = await requestsOf(db, userId).limit(1);

  return row ?? null;
}

/** A random link token, and the hash that is all the database keeps of it. */
export async function newLinkToken(): Promise<{ token: string; hash: string }> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return { token, hash: await hashToken(token) };
}

export async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));

  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export type NewRequest = {
  round: number;
  role: string | null;
  building: string | null;
  sites: string | null;
  need?: string | null;
  pay?: string | null;
  fairPrice?: string | null;
  link?: string | null;
  note: string;
  tokenHash?: string | null;
  expiresAt?: Date | null;
  sendAt?: Date | null;
};

/**
 * Write a request, unless the person already has one open. One statement,
 * so two submits at once cannot both land: the second finds the first.
 * Null when one was already open.
 */
export async function openRequest(db: Db, userId: string, request: NewRequest): Promise<string | null> {
  const id = crypto.randomUUID();
  const status = request.round === 1 ? 'sent' : 'pending';
  const at = (date: Date | null | undefined) => (date ? Math.floor(date.getTime() / 1000) : null);
  const result = await db.run(sql`
    insert into template_request
      (id, user_id, round, status, role, building, sites, need, pay, fair_price, link, note, token_hash, expires_at, send_at)
    select ${id}, ${userId}, ${request.round}, ${status}, ${request.role}, ${request.building}, ${request.sites},
      ${request.need ?? null}, ${request.pay ?? null}, ${request.fairPrice ?? null}, ${request.link ?? null},
      ${request.note}, ${request.tokenHash ?? null}, ${at(request.expiresAt)}, ${at(request.sendAt)}
    where not exists (
      select 1 from template_request where user_id = ${userId} and status in ('sent', 'pending')
    )
  `);

  return (result.meta.changes ?? 0) > 0 ? id : null;
}

export type Activation =
  | { ok: true; userId: string; granted: number }
  | { ok: false; reason: 'unknown' | 'used' | 'expired' };

/**
 * Follow an emailed link: add the first request's templates, once. The
 * status test in the UPDATE is what makes the link single-use, even when a
 * mail scanner and the person follow it in the same second.
 */
export async function activateLink(db: Db, token: string, now = new Date()): Promise<Activation> {
  const hash = await hashToken(token);
  const [row] = await db
    .select()
    .from(templateRequest)
    .where(and(eq(templateRequest.tokenHash, hash), eq(templateRequest.round, 1)))
    .limit(1);

  if (!row) return { ok: false, reason: 'unknown' };
  if (row.status === 'activated') return { ok: false, reason: 'used' };
  if (row.expiresAt && row.expiresAt.getTime() < now.getTime()) return { ok: false, reason: 'expired' };

  const result = await db.run(sql`
    update template_request
    set status = 'activated', granted = ${FIRST_REQUEST_GRANT}, decided_at = ${Math.floor(now.getTime() / 1000)}
    where id = ${row.id} and status = 'sent'
  `);

  if ((result.meta.changes ?? 0) === 0) return { ok: false, reason: 'used' };

  return { ok: true, userId: row.userId, granted: FIRST_REQUEST_GRANT };
}
