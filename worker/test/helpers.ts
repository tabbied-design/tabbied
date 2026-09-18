import { SELF, env } from 'cloudflare:test';
import { expect } from 'vitest';

// Shared by every suite that signs a person in. The session is a real one:
// sign up, read the verification link out of the dev mailbox (DEV=1 writes it
// to D1 rather than sending it), follow it, keep the cookie. That is the same
// path the e2e flow reads a link back through. This used to be copied into
// six files, each a little different.

export const ORIGIN = 'https://tabbied.com';
export const json = { 'content-type': 'application/json', origin: ORIGIN };

export async function signIn(email: string): Promise<string> {
  const signUp = await SELF.fetch(`${ORIGIN}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: json,
    body: JSON.stringify({ email, password: 'correct horse battery staple', name: 'Test' }),
  });
  expect(signUp.status, await signUp.text()).toBe(200);

  // better-auth stores the address lower-cased, and the mailbox is keyed by it.
  const mail = await env.DB.prepare('SELECT url FROM dev_mail WHERE email = ?')
    .bind(email.toLowerCase())
    .first<{ url: string }>();
  expect(mail?.url, `a verification mail for ${email}`).toBeTruthy();

  const verify = await SELF.fetch(mail!.url, { redirect: 'manual' });
  const cookies = verify.headers.getSetCookie().map((cookie) => cookie.split(';')[0]);
  expect(cookies.length, 'verification should sign the person in').toBeGreaterThan(0);

  return cookies.join('; ');
}
