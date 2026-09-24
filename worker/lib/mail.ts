import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { devMail } from '../db/schema';
import type { Env } from '../env';
import { isDev } from '../env';

// Transactional mail, behind one function so better-auth's hooks never learn
// which provider is in use.
//
// With no RESEND_API_KEY *in development* the message is written to the
// dev_mail table instead of sent. That is not a stub for its own sake: it is
// how the e2e flow reads a verification link back without a mail provider, and
// how a developer confirms an account offline. It is confined to that one path,
// so production either sends or fails loudly.
//
//   npx wrangler d1 execute tabbied --local \
//     --command "SELECT url FROM dev_mail WHERE email = 'you@example.com'"

export type Mail = {
  to: string | string[];
  subject: string;
  /** The link the message is for, if any: what dev mail records to follow. */
  url?: string;
  text: string;
  /** Where a reply goes, when that is not us: the person a notice is about. */
  replyTo?: string;
};

/** The sender every message goes out as; `MAIL_FROM` overrides it. */
export const DEFAULT_FROM = 'Tabbied <hello@tabbied.com>';

const recipients = (to: string | string[]) => (Array.isArray(to) ? to : [to]);

export async function sendMail(env: Env, mail: Mail): Promise<void> {
  if (!env.RESEND_API_KEY) {
    if (!isDev(env)) {
      // Production with no provider is a misconfiguration, not a fallback: a
      // silently-swallowed verification mail strands the account.
      throw new Error('RESEND_API_KEY is not set');
    }

    const db = drizzle(env.DB, { schema });
    const url = mail.url ?? '';

    // One row per address: the newest message is the only one worth having,
    // and an unbounded log of dev mail is just litter in the dev database.
    for (const to of recipients(mail.to)) {
      const email = to.toLowerCase();
      const values = { subject: mail.subject, url, body: mail.text };

      await db
        .insert(devMail)
        .values({ email, ...values, createdAt: new Date() })
        .onConflictDoUpdate({ target: devMail.email, set: values });
    }
    console.log(`[mail:dev] ${mail.subject} -> ${recipients(mail.to).join(', ')}${url ? `\n  ${url}` : ''}`);
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM || DEFAULT_FROM,
      to: recipients(mail.to),
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    // Resend says why in the body (an unverified domain, a bad key); the
    // status alone reads the same for all of them.
    const detail = await response.text().catch(() => '');
    throw new Error(`mail send failed: ${response.status} ${detail.slice(0, 200)}`);
  }
}

/**
 * Who hears about things the team acts on: `TEAM_EMAIL` (comma-separated),
 * else the configured admins, else the sender's own address.
 */
export function teamRecipients(env: Env): string[] {
  const list = (value?: string) =>
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  const team = list(env.TEAM_EMAIL);

  if (team.length > 0) return team;

  const admins = list(env.ADMIN_EMAILS);

  if (admins.length > 0) return admins;

  return [/<([^>]+)>/.exec(env.MAIL_FROM || DEFAULT_FROM)?.[1] ?? 'hello@tabbied.com'];
}

/** The site's own origin for links in a message, from the request that caused it. */
const adminLink = (origin: string | undefined) => `${origin ?? 'https://tabbied.com'}/admin/requests/`;

/** "Request more" arrived: tell the team, with a reply going to the person. */
export async function notifyTemplateRequest(
  env: Env,
  request: { name: string; email: string; note: string; used: number; total: number; origin?: string }
): Promise<void> {
  await sendMail(env, {
    to: teamRecipients(env),
    replyTo: request.email,
    subject: `More templates: ${request.name || request.email}`,
    text: [
      `${request.name || request.email} <${request.email}> has chosen ${request.used} of ${request.total} templates and asked for more.`,
      '',
      request.note,
      '',
      `Grant or decline it: ${adminLink(request.origin)}`,
      'Replying to this message writes to them directly.',
    ].join('\n'),
  });
}

/** An admin answered: tell the person, in a sentence they can act on. */
export async function notifyRequestDecision(
  env: Env,
  decision: { email: string; status: 'granted' | 'declined'; granted: number; total: number; origin?: string }
): Promise<void> {
  const account = `${decision.origin ?? 'https://tabbied.com'}/account/`;
  const granted = decision.status === 'granted';

  await sendMail(env, {
    to: decision.email,
    replyTo: teamRecipients(env)[0],
    subject: granted ? 'You have more Tabbied templates' : 'About your request for more Tabbied templates',
    text: granted
      ? [
          `Thanks for telling us what you're building. We've added ${decision.granted} template${decision.granted === 1 ? '' : 's'} to your account, so you can now choose ${decision.total} in all.`,
          '',
          `Choose them from the template library: ${account}`,
        ].join('\n')
      : [
          "Thanks for telling us what you're building. We can't add templates to your account right now, but you can keep customizing and downloading the ones you have as often as you like.",
          '',
          `Your templates: ${account}`,
          '',
          'Reply to this message if you want to tell us more.',
        ].join('\n'),
  });
}
