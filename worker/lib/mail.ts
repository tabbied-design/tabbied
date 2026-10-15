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
  /** An HTML body beside the text one, for a message that is designed. */
  html?: string;
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
    }),
  });

  if (!response.ok) {
    // Resend says why in the body (an unverified domain, a bad key); the
    // status alone reads the same for all of them.
    const detail = await response.text().catch(() => '');
    throw new Error(`mail send failed: ${response.status} ${detail.slice(0, 200)}`);
  }
}

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
 * The lockup at the head of every designed message: public/email/, captured
 * from components/logo/Logo at 3x on the card's white, drawn at this size. An
 * image, not the inline SVG the site draws, because Gmail strips <svg> from
 * mail, and not live text, because mail clients ignore the web font.
 */
const LOCKUP = { path: '/email/tabbied-lockup.png', width: 88, height: 25 };

/**
 * The parts of a designed message, as plain text: the layout escapes all of
 * it, so a person's name reaches the markup as characters, never as tags.
 */
type Designed = {
  /** Where the lockup image is served from: PUBLIC_ORIGIN for real mail. */
  origin: string;
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
 * The one layout every designed message shares (the 24 September design).
 * Inline styles and tables, because a mail client reads no stylesheet and
 * little layout. The fonts load where a client allows it (Apple Mail, iOS)
 * and fall back elsewhere. The lockup is a hosted PNG (LOCKUP); a client that
 * blocks remote images shows its alt text, set in a serif like the wordmark.
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
<img src="${escapeHtml(`${mail.origin}${LOCKUP.path}`)}" width="${LOCKUP.width}" height="${LOCKUP.height}" alt="tabbied" style="display:block;width:${LOCKUP.width}px;height:${LOCKUP.height}px;margin:0 0 40px;border:0;outline:none;text-decoration:none;font:300 19px Georgia,serif;color:#0e0e13">
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
export function verificationEmail(confirm: { name: string; url: string; origin: string }): Message {
  const greeting = greetingFor(confirm.name);
  const body = 'Confirm this address to finish setting up your Tabbied account.';
  const expiry = `The link expires in ${hours(AUTH_LINK_HOURS)}.`;
  const after = "If you didn't sign up for Tabbied, you can ignore this email.";

  return {
    subject: 'Confirm your Tabbied account',
    url: confirm.url,
    text: [greeting, '', `${body} Follow this link:`, '', confirm.url, '', expiry, '', after, '', 'The Tabbied team'].join('\n'),
    html: designedHtml({
      origin: confirm.origin,
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
export function resetPasswordEmail(reset: { name: string; url: string; origin: string }): Message {
  const greeting = greetingFor(reset.name);
  const body = 'Someone asked to reset the password for your Tabbied account. Choose a new one below.';
  const expiry = `The link works once and expires in ${hours(AUTH_LINK_HOURS)}.`;
  const after = "If you didn't ask for this, ignore this email: your password stays as it is.";

  return {
    subject: 'Reset your Tabbied password',
    url: reset.url,
    text: [greeting, '', body, '', reset.url, '', expiry, '', after, '', 'The Tabbied team'].join('\n'),
    html: designedHtml({
      origin: reset.origin,
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
