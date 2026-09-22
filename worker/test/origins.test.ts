import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, json } from './helpers';

// better-auth answers a request from an origin it does not trust with 403
// "Invalid origin" before it reads the body. PUBLIC_ORIGIN is trusted
// through baseURL; these are the two origins trusted beside it, and the
// ones that must stay untrusted.

const PREVIEW = 'https://a1b2c3d4-tabbied.example.workers.dev';

const signInFrom = (url: string, origin: string) =>
  SELF.fetch(`${url}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { ...json, origin },
    body: JSON.stringify({ email: 'nobody@example.com', password: 'not the password' }),
  });

describe('trusted origins', () => {
  it('trusts a preview deployment for a request that is same-origin with it', async () => {
    // Past the origin check: the credentials are wrong, which is the answer
    // the form gets on the production origin too.
    const preview = await signInFrom(PREVIEW, PREVIEW);
    expect(preview.status, await preview.text()).toBe(401);

    const production = await signInFrom(ORIGIN, ORIGIN);
    expect(production.status, await production.text()).toBe(401);
  });

  it('does not trust a workers.dev origin the request did not arrive on', async () => {
    // A page on any other workers.dev host, or on any other site, naming the
    // preview host as its origin is still someone else's page.
    const borrowed = await signInFrom(PREVIEW, 'https://evil.workers.dev');
    expect(borrowed.status).toBe(403);
    expect(await borrowed.text()).toContain('Invalid origin');

    const elsewhere = await signInFrom(ORIGIN, 'https://evil.example.com');
    expect(elsewhere.status).toBe(403);
    expect(await elsewhere.text()).toContain('Invalid origin');
  });
});
