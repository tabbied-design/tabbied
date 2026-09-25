import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { devMail } from '../db/schema';
import type { Env } from '../env';
import { isDev } from '../env';

// Transactional mail, behind one function so better-auth's hooks never learn
// which provider is in use.
//
// With no RESEND_API_KEY in development the message is written to the
// dev_mail table instead of sent: that is how the tests read a verification
// link back and how a developer confirms an account offline. Production either
// sends or fails loudly.
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
  /** An HTML body beside the text one, for a message that is designed. */
  html?: string;
  /** Deliver later rather than now (Resend holds it; dev mail writes it now). */
  sendAt?: Date;
};

/** The sender every message goes out as; `MAIL_FROM` overrides it. */
const DEFAULT_FROM = 'Tabbied <hello@tabbied.com>';

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

    // One row per address: only the newest message is worth having.
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
      ...(mail.html ? { html: mail.html } : {}),
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      ...(mail.sendAt && mail.sendAt.getTime() > Date.now() ? { scheduled_at: mail.sendAt.toISOString() } : {}),
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

/** The admin requests page, on the configured origin the caller passes. */
const adminLink = (origin: string | undefined) => `${origin ?? 'https://tabbied.com'}/admin/requests/`;

/** Text for HTML: a person's name reaches the markup as characters, never as tags. */
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

/** A first name to greet with, or nothing when the account has none. */
const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? '';

/**
 * The first request's email: a link that adds the templates when followed
 * (the 24 September design, "5 more templates, on us"). Inline styles and a
 * table, because a mail client reads no stylesheet and little layout.
 */
export async function sendApprovalLink(
  env: Env,
  approval: { email: string; name: string; url: string; granted: number; total: number; sendAt?: Date }
): Promise<void> {
  const hi = firstName(approval.name);
  const greeting = hi ? `Hi ${hi},` : 'Hi,';
  const body = `Thanks for telling us about your work. Click below to add ${approval.granted} more website templates to your account, and you'll be able to choose up to ${approval.total}.`;
  const after =
    'If you need more after these, send another request from your account. Our team reviews those personally and replies within 2 business days.';
  const sans = "'IBM Plex Sans',Helvetica,Arial,sans-serif";

  await sendMail(env, {
    to: approval.email,
    subject: `Your ${approval.granted} extra templates are ready`,
    url: approval.url,
    sendAt: approval.sendAt,
    text: [
      greeting,
      '',
      body,
      '',
      `Add ${approval.granted} templates: ${approval.url}`,
      '',
      'The link works once and expires in 7 days.',
      '',
      after,
      '',
      'The Tabbied team',
    ].join('\n'),
    html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f5f7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 16px 80px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e6e7ea;border-radius:14px">
<tr><td style="padding:44px 44px 36px;font-family:${sans};color:#0e0e13">
<p style="margin:0 0 40px;font:300 19px Georgia,serif">tabbied</p>
<p style="margin:0 0 12px;font:500 11px 'IBM Plex Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#0f766e">Your request</p>
<h1 style="margin:0 0 18px;font:700 32px/1.15 ${sans};letter-spacing:-.015em">${approval.granted} more templates, on us</h1>
<p style="margin:0 0 14px;font:400 16px/1.65 ${sans};color:#3a3b40">${escapeHtml(greeting)}</p>
<p style="margin:0 0 28px;font:400 16px/1.65 ${sans};color:#3a3b40">${escapeHtml(body)}</p>
<a href="${escapeHtml(approval.url)}" style="display:inline-block;padding:15px 28px;border-radius:999px;background:#0e0e13;color:#ffffff;font:600 15px ${sans};text-decoration:none">Add ${approval.granted} templates</a>
<p style="margin:16px 0 36px;font:400 13.5px/1.6 ${sans};color:#6b6d74">The link works once and expires in 7 days.</p>
<div style="height:1px;background:#e6e7ea;margin-bottom:24px"></div>
<p style="margin:0 0 20px;font:400 14.5px/1.6 ${sans};color:#55575e">${escapeHtml(after)}</p>
<p style="margin:0;font:400 14.5px/1.6 ${sans};color:#55575e">The Tabbied team</p>
</td></tr></table>
<p style="max-width:600px;margin:0 auto;padding:18px 4px 0;font:400 12px/1.6 ${sans};color:#7a7c83;text-align:left">You're getting this because you requested more templates on tabbied.com.</p>
</td></tr></table></body></html>`,
  });
}

/** A request for review arrived: tell the team, with a reply going to the person. */
export async function notifyTemplateRequest(
  env: Env,
  request: {
    name: string;
    email: string;
    note: string;
    used: number;
    total: number;
    answers?: string[];
    origin?: string;
  }
): Promise<void> {
  await sendMail(env, {
    to: teamRecipients(env),
    replyTo: request.email,
    subject: `More templates: ${request.name || request.email}`,
    text: [
      `${request.name || request.email} <${request.email}> has chosen ${request.used} of ${request.total} templates and asked for more.`,
      '',
      ...(request.answers?.length ? [...request.answers, ''] : []),
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
