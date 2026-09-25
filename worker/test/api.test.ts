import { SELF, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { ORIGIN, json } from './helpers';

// These drive the real Worker over real (local) bindings: the routing, the
// auth gate, the trusted origins, the R2 media path. Nothing here reaches the
// AI upstream.

describe('the platform tier', () => {
  it('lists the social providers it can complete - none, here', async () => {
    // The test environment configures no client ids, so the list is empty.
    const response = await SELF.fetch('https://x/api/auth-providers');

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ providers: [] });
  });

  it('answers a miss under /api with JSON, not the site 404 page', async () => {
    // A sub-app's notFound handler is not used once it is mounted with
    // route(), so this would otherwise fall through to the marketing 404.
    const response = await SELF.fetch('https://x/api/nope');

    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toContain('application/json');
  });
});

describe('the session gate', () => {
  // Every route that is a person's own, each with a body it would otherwise
  // accept: /api/studio/make reads the body before it asks for a session.
  const ROUTES: [method: string, path: string, body?: unknown][] = [
    ['POST', '/api/studio/directions', { description: 'a bakery in a small coastal town' }],
    ['POST', '/api/studio/direction-image', { generationId: 'whatever', index: 0 }],
    ['POST', '/api/studio/make', { description: 'A bakery in a small coastal town, sourdough and coffee.' }],
    ['GET', '/api/studio/generations'],
    ['POST', '/api/studio/sites', { generationId: 'whatever0', index: 0 }],
    ['GET', '/api/studio/sites'],
    ['POST', '/api/studio/sites/nope/revise', { instruction: 'Make the headline warmer.' }],
    ['POST', '/api/studio/sites/nope/images', { slot: 'hero.photo' }],
    ['GET', '/api/account/usage'],
    ['POST', '/api/uploads', {}],
    ['GET', '/api/uploads'],
  ];

  it('refuses an anonymous request on every signed-in route', async () => {
    for (const [method, path, body] of ROUTES) {
      const response = await SELF.fetch(`${ORIGIN}${path}`, {
        method,
        headers: json,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      expect(response.status, `${method} ${path}`).toBe(401);
    }
  });

  it('404s a generation that does not exist', async () => {
    // Reads are unauthenticated by design (the id is the capability), so a bad
    // link is "not found", never "not allowed".
    const response = await SELF.fetch('https://x/api/studio/generations/nope');

    expect(response.status).toBe(404);
  });
});

describe('media', () => {
  it('serves an object from R2 as immutable', async () => {
    const key = 'gen/testgeneration/0.webp';
    await env.MEDIA.put(key, new Uint8Array([1, 2, 3]), {
      httpMetadata: { contentType: 'image/webp' },
    });

    const response = await SELF.fetch(`https://x/api/media/${key}`);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/webp');
    // A key is written once and never rewritten.
    expect(response.headers.get('cache-control')).toContain('immutable');
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(
      new Uint8Array([1, 2, 3])
    );
  });

  it('404s a key that is not there', async () => {
    const response = await SELF.fetch('https://x/api/media/gen/absent/9.webp');

    expect(response.status).toBe(404);
  });

  it.each([
    ['a prefix it does not own', 'secrets/key'],
    ['a traversal segment', 'gen/../../etc/passwd'],
  ])('refuses %s', async (_label, key) => {
    const response = await SELF.fetch(`https://x/api/media/${key}`);

    expect(response.status).toBe(404);
  });
});

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
