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

/** What `sendMail` will do with a message: `/api/health` and the admin's Email preview both say it. */
export const mailProvider = (env: Env): 'resend' | 'dev-mail' | 'none' =>
  env.RESEND_API_KEY ? 'resend' : isDev(env) ? 'dev-mail' : 'none';

/**
 * What a message says, apart from who it goes to and when. Every message the
 * Worker sends is built by one of the functions below and handed to
 * `sendMail`, and the admin's Email preview renders the same functions, so the
 * page shows the bytes a person receives rather than a copy of them.
 */
export type Message = Pick<Mail, 'subject' | 'text' | 'html' | 'url'>;


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
 * How long better-auth's confirmation and reset links last. auth.ts hands the
 * same number to both settings, so what an email says is what the link does.
 */
export const AUTH_LINK_HOURS = 1;

const hours = (n: number) => `${n} hour${n === 1 ? '' : 's'}`;

/** "Hi Pat," or, for an account with no name, "Hi,". */
const greetingFor = (name: string) => {
  const hi = firstName(name);
  return hi ? `Hi ${hi},` : 'Hi,';
};

/**
 * The parts of a designed message, as plain text: the layout escapes all of
 * it, so a person's name reaches the markup as characters, never as tags.
 */
type Designed = {
  eyebrow: string;
  title: string;
  /** Above the button: the greeting, then what the message is for. */
  lead: string[];
  action: { label: string; url: string };
  /** Under the button, small. */
  note: string;
  /** Write the link out under the note, for a client that will not follow the button. */
  spellOut?: boolean;
  /** Under the rule, ending with the sign-off. */
  after: string[];
  /** Under the card: why this address got it. */
  footer: string;
};

/**
 * The one layout every designed message shares (the 24 September design,
 * first drawn for "5 more templates, on us"). Inline styles and tables,
 * because a mail client reads no stylesheet and little layout. The fonts load
 * where a client allows it (Apple Mail, iOS) and fall back elsewhere. The mark
 * is components/logo/LogoMark's paths, inline: a client that drops SVG
 * (Gmail) is left with the wordmark alone.
 */
function designedHtml(mail: Designed): string {
  const sans = "'IBM Plex Sans',Helvetica,Arial,sans-serif";
  // The design's oklch colors as hex, since few mail clients read oklch():
  // ink at 0.3, 0.4, 0.5 and 0.55 lightness, and an 8% black rule on white.
  // The eyebrow's green (#005c44) and the page (#f2f3f6) are written inline.
  const text = '#2b2e33';
  const quiet = '#45484d';
  const note = '#606369';
  const faint = '#6e7278';
  const rule = '#ebebeb';
  // Paragraphs `between` apart, the last one `last` from what follows.
  const lines = (list: string[], style: string, between: string, last: string) =>
    list
      .map((line, index) => `<p style="margin:${index === list.length - 1 ? last : between};${style}">${escapeHtml(line)}</p>`)
      .join('\n');
  const spelled = mail.spellOut
    ? `<br><a href="${escapeHtml(mail.action.url)}" style="color:${text};text-decoration:underline;word-break:break-all">${escapeHtml(mail.action.url)}</a>`
    : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&amp;family=IBM+Plex+Sans:wght@400;600&amp;family=IBM+Plex+Mono:wght@500&amp;display=swap" rel="stylesheet">
</head><body style="margin:0;padding:0;background:#f2f3f6">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f3f6;padding:40px 16px 80px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${rule};border-radius:14px">
<tr><td style="padding:44px 44px 36px;font-family:${sans};color:#0e0e13">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 40px"><tr>
<td style="padding:0 10px 0 0;vertical-align:middle"><svg viewBox="107 92 391 391" width="20" height="20" style="display:block" aria-hidden="true"><g fill="none" stroke="#0e0e13" stroke-width="17"><path d="M191 261 H277 C277 172.6 205.4 101 116 101 V311 C116 401.1 188.7 474 277 474 V312 H221"/><path d="M414 261 H328 C328 172.6 399.6 101 489 101 V311 C489 401.1 416.3 474 328 474 V312 H391"/></g></svg></td>
<td style="vertical-align:middle;font:300 19px 'Cormorant Garamond',Georgia,serif;color:#0e0e13">tabbied</td>
</tr></table>
<p style="margin:0 0 12px;font:500 11px 'IBM Plex Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#005c44">${escapeHtml(mail.eyebrow)}</p>
<h1 style="margin:0 0 18px;font:700 32px/1.15 'Proxima Nova',${sans};letter-spacing:-.015em">${escapeHtml(mail.title)}</h1>
${lines(mail.lead, `font:400 16px/1.65 ${sans};color:${text}`, '0 0 14px', '0 0 28px')}
<a href="${escapeHtml(mail.action.url)}" style="display:inline-block;padding:15px 28px;border-radius:999px;background:#0e0e13;color:#ffffff;font:600 15px ${sans};text-decoration:none">${escapeHtml(mail.action.label)}</a>
<p style="margin:16px 0 36px;font:400 13.5px/1.6 ${sans};color:${note}">${escapeHtml(mail.note)}${spelled}</p>
<div style="height:1px;background:${rule};margin-bottom:24px"></div>
${lines(mail.after, `font:400 14.5px/1.6 ${sans};color:${quiet}`, '0 0 20px', '0')}
</td></tr></table>
<p style="max-width:600px;margin:0 auto;padding:18px 4px 0;font:400 12px/1.6 ${sans};color:${faint};text-align:left">${escapeHtml(mail.footer)}</p>
</td></tr></table></body></html>`;
}

/** Sign-up's confirmation link (better-auth's `sendVerificationEmail`). */
export function verificationEmail(confirm: { name: string; url: string }): Message {
  const greeting = greetingFor(confirm.name);
  const body = 'Confirm this address to finish setting up your Tabbied account.';
  const expiry = `The link expires in ${hours(AUTH_LINK_HOURS)}.`;
  const after = "If you didn't sign up for Tabbied, you can ignore this email.";

  return {
    subject: 'Confirm your Tabbied account',
    url: confirm.url,
    text: [greeting, '', `${body} Follow this link:`, '', confirm.url, '', expiry, '', after, '', 'The Tabbied team'].join('\n'),
    html: designedHtml({
      eyebrow: 'Your account',
      title: 'Confirm your email',
      lead: [greeting, body],
      action: { label: 'Confirm email', url: confirm.url },
      note: `${expiry} If the button does nothing, paste this link into your browser:`,
      spellOut: true,
      after: [after, 'The Tabbied team'],
      footer: "You're getting this because this address was used to sign up on tabbied.com.",
    }),
  };
}

/** "Forgot password" (better-auth's `sendResetPassword`). */
export function resetPasswordEmail(reset: { name: string; url: string }): Message {
  const greeting = greetingFor(reset.name);
  const body = 'Someone asked to reset the password for your Tabbied account. Choose a new one below.';
  const expiry = `The link works once and expires in ${hours(AUTH_LINK_HOURS)}.`;
  const after = "If you didn't ask for this, ignore this email: your password stays as it is.";

  return {
    subject: 'Reset your Tabbied password',
    url: reset.url,
    text: [greeting, '', body, '', reset.url, '', expiry, '', after, '', 'The Tabbied team'].join('\n'),
    html: designedHtml({
      eyebrow: 'Your account',
      title: 'Reset your password',
      lead: [greeting, body],
      action: { label: 'Choose a new password', url: reset.url },
      note: `${expiry} If the button does nothing, paste this link into your browser:`,
      spellOut: true,
      after: [after, 'The Tabbied team'],
      footer: "You're getting this because a password reset was asked for on tabbied.com with this address.",
    }),
  };
}

/** The first request's email: a link that adds the templates when followed. */
export function approvalEmail(approval: { name: string; url: string; granted: number; total: number }): Message {
  const greeting = greetingFor(approval.name);
  const body = `Thanks for telling us about your work. Click below to add ${approval.granted} more website templates to your account, and you'll be able to choose up to ${approval.total}.`;
  const after =
    'If you need more after these, send another request from your account. Our team reviews those personally and replies within 2 business days.';

  return {
    subject: `Your ${approval.granted} extra templates are ready`,
    url: approval.url,
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
    html: designedHtml({
      eyebrow: 'Your request',
      title: `${approval.granted} more templates, on us`,
      lead: [greeting, body],
      action: { label: `Add ${approval.granted} templates`, url: approval.url },
      note: 'The link works once and expires in 7 days.',
      after: [after, 'The Tabbied team'],
      footer: "You're getting this because you requested more templates on tabbied.com.",
    }),
  };
}

export async function sendApprovalLink(
  env: Env,
  approval: { email: string; name: string; url: string; granted: number; total: number; sendAt?: Date }
): Promise<void> {
  await sendMail(env, { to: approval.email, sendAt: approval.sendAt, ...approvalEmail(approval) });
}

type TemplateRequestNotice = {
  name: string;
  email: string;
  note: string;
  used: number;
  total: number;
  answers?: string[];
  origin?: string;
};

/** A request for review arrived: what the team reads. */
export function templateRequestEmail(request: TemplateRequestNotice): Message {
  return {
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
  };
}

/** Tell the team, with a reply going to the person. */
export async function notifyTemplateRequest(env: Env, request: TemplateRequestNotice): Promise<void> {
  await sendMail(env, { to: teamRecipients(env), replyTo: request.email, ...templateRequestEmail(request) });
}

type RequestDecision = { status: 'granted' | 'declined'; granted: number; total: number; origin?: string };

/** An admin answered: what the person reads, in a sentence they can act on. */
export function requestDecisionEmail(decision: RequestDecision): Message {
  const account = `${decision.origin ?? 'https://tabbied.com'}/account/`;
  const granted = decision.status === 'granted';

  return {
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
  };
}

/** Tell the person, with a reply going to the team. */
export async function notifyRequestDecision(env: Env, decision: RequestDecision & { email: string }): Promise<void> {
  await sendMail(env, { to: decision.email, replyTo: teamRecipients(env)[0], ...requestDecisionEmail(decision) });
}
