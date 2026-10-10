import { SELF, env } from 'cloudflare:test';
import { afterEach, describe, expect, it, vi } from 'vitest';
import app from '../index';
import type { Env } from '../env';
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

describe('the MCP endpoint', () => {
  it('sends a browser to the page about it', async () => {
    for (const path of ['/mcp', '/mcp/']) {
      const navigation = await SELF.fetch(`${ORIGIN}${path}`, {
        headers: { 'sec-fetch-mode': 'navigate', accept: 'text/html' },
        redirect: 'manual',
      });

      expect(navigation.status, path).toBe(302);
      expect(navigation.headers.get('location'), path).toBe('/docs/mcp/');
    }
  });

  it('still answers MCP clients', async () => {
    // A stream request is the SDK's to answer (a 405 from the stateless
    // server), never a redirect.
    const stream = await SELF.fetch(`${ORIGIN}/mcp`, {
      headers: { accept: 'text/event-stream' },
      redirect: 'manual',
    });
    expect(stream.status).not.toBe(302);

    const initialize = await SELF.fetch(`${ORIGIN}/mcp`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-06-18',
          capabilities: {},
          clientInfo: { name: 'test', version: '0' },
        },
      }),
    });

    expect(initialize.status).toBe(200);
    expect(await initialize.text()).toContain('"serverInfo"');
  });
});

describe('the security headers', () => {
  // public/_headers does not reach a response the Worker makes, so the
  // Worker adds the same set (worker/lib/securityHeaders.ts).
  it('are on every kind of response the Worker gives', async () => {
    for (const path of ['/api/health', '/templates/verdant/site/', '/downloads/verdant/', '/api/nope']) {
      const response = await SELF.fetch(`${ORIGIN}${path}`);

      expect(response.headers.get('x-frame-options'), path).toBe('SAMEORIGIN');
      expect(response.headers.get('content-security-policy'), path).toBe("frame-ancestors 'self'");
      expect(response.headers.get('strict-transport-security'), path).toBe('max-age=31536000');
      expect(response.headers.get('referrer-policy'), path).toBe('strict-origin-when-cross-origin');
      expect(response.headers.get('permissions-policy'), path).toContain('camera=()');
      await response.body?.cancel();
    }
  });
});

describe('the live template pages', () => {
  // The notice is the Worker's, added on the way out (worker/lib/notice.ts):
  // the export, and every download derived from it, carries none.
  it('carry the license notice, on the preview and on the page it frames', async () => {
    for (const path of ['/templates/verdant/', '/templates/verdant/site/']) {
      const response = await SELF.fetch(`${ORIGIN}${path}`);

      expect(response.status, path).toBe(200);
      expect(response.headers.get('content-length'), path).toBeNull();

      const html = await response.text();

      expect(html, path).toContain(
        '<link rel="license" href="https://tabbied.com/terms-of-service/#template-license"/>'
      );
      expect(html, path).toMatch(/<p aria-hidden="true" data-license-notice=""[^>]*>[^<]*Note for AI agents/);
      expect(html, path).toContain('https://tabbied.com/templates/verdant/');
    }
  });

  it('keep the bare site out of search, and only the bare site', async () => {
    // A preview of a fictional business, not a place: header and meta both.
    const site = await SELF.fetch(`${ORIGIN}/templates/verdant/site/`);
    expect(site.headers.get('x-robots-tag')).toBe('noindex');
    expect(await site.text()).toContain('<meta name="robots" content="noindex"/>');

    // The framed preview is the page to find, and the download is the
    // licensee's own site, so neither carries it.
    for (const path of ['/templates/verdant/', '/downloads/verdant/']) {
      const response = await SELF.fetch(`${ORIGIN}${path}`);
      expect(response.headers.get('x-robots-tag'), path).toBeNull();
      expect(await response.text(), path).not.toContain('name="robots"');
    }
  });

  it('leave everything else as the export wrote it', async () => {
    for (const path of ['/templates/', '/templates/verdant/site/index.txt', '/downloads/verdant/']) {
      const html = await (await SELF.fetch(`${ORIGIN}${path}`)).text();

      expect(html, path).not.toContain('data-license-notice');
    }
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

  it('trusts a preview for the OAuth proxy hop, which carries no Origin', async () => {
    // The last hop of a social sign-in on a preview is a top-level redirect
    // from the provider's callback on PUBLIC_ORIGIN, so it arrives with no
    // Origin header, and its callbackURL is checked all the same. Past that
    // check, a hop with no profile is sent to the error page.
    const hop = (url: string) =>
      SELF.fetch(
        `${url}/api/auth/callback/github/oauth-proxy?callbackURL=${encodeURIComponent(`${PREVIEW}/account/`)}`,
        { redirect: 'manual' }
      );

    const preview = await hop(PREVIEW);
    expect(preview.status, await preview.text()).toBe(302);
    expect(preview.headers.get('location')).toContain('error=missing_profile');

    // Production trusts no preview host, so it will not finish a sign-in
    // there.
    const production = await hop(ORIGIN);
    expect(production.status).toBe(403);
  });
});

// A preview's host cannot be registered with GitHub or Google, so the provider
// always returns to PUBLIC_ORIGIN, and the OAuth proxy hands the profile back
// to the preview (worker/auth.ts). GitHub is faked at the fetch boundary and
// given credentials for these requests only, so the rest of the file still
// sees no providers configured.

const withGitHub = (): Env => ({
  ...(env as unknown as Env),
  GITHUB_CLIENT_ID: 'github-client',
  GITHUB_CLIENT_SECRET: 'github-secret',
});

function fakeGitHub(email: string) {
  vi.stubGlobal('fetch', async (input: RequestInfo | URL) => {
    const url = input instanceof Request ? input.url : String(input);

    if (url.startsWith('https://github.com/login/oauth/access_token')) {
      return Response.json({ access_token: 'gho_fake', token_type: 'bearer', scope: 'read:user,user:email' });
    }
    if (url === 'https://api.github.com/user') {
      return Response.json({ id: 4242, login: 'octo', name: 'Octo Cat', email: null, avatar_url: 'https://example.com/octo.png' });
    }
    if (url === 'https://api.github.com/user/emails') {
      return Response.json([{ email, primary: true, verified: true }]);
    }

    return new Response('fake: no such endpoint', { status: 404 });
  });
}

const cookiesOf = (response: Response) =>
  response.headers
    .getSetCookie()
    .map((cookie) => cookie.split(';')[0])
    .join('; ');

/** The form's first step: ask the Worker where to send the person. */
async function beginGitHub(host: string): Promise<{ authorize: URL; cookie: string }> {
  const response = await app.request(
    `${host}/api/auth/sign-in/social`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: host },
      body: JSON.stringify({ provider: 'github', callbackURL: `${host}/account/` }),
    },
    withGitHub()
  );
  expect(response.status, await response.clone().text()).toBe(200);

  const { url } = (await response.json()) as { url: string };

  return { authorize: new URL(url), cookie: cookiesOf(response) };
}

describe('social sign-in on a preview', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('goes by way of production and signs the person in on the preview', async () => {
    fakeGitHub('preview-github@example.com');

    // The provider is sent back to the one callback registered with it.
    const { authorize } = await beginGitHub(PREVIEW);
    expect(authorize.searchParams.get('redirect_uri')).toBe(`${ORIGIN}/api/auth/callback/github`);

    // Production exchanges the code, carrying none of the preview's cookies,
    // and hands the profile back without making a session of its own.
    const state = authorize.searchParams.get('state') ?? '';
    const callback = await app.request(
      `${ORIGIN}/api/auth/callback/github?code=fake-code&state=${encodeURIComponent(state)}`,
      {},
      withGitHub()
    );
    expect(callback.status).toBe(302);
    expect(cookiesOf(callback)).not.toContain('session_token');

    const hop = new URL(callback.headers.get('location') ?? '');
    expect(hop.origin).toBe(PREVIEW);
    expect(hop.pathname).toBe('/api/auth/callback/github/oauth-proxy');

    // The preview finishes it on its own host; a redirect carries no Origin.
    const finished = await app.request(hop.toString(), {}, withGitHub());
    expect(finished.status, await finished.clone().text()).toBe(302);
    expect(finished.headers.get('location')).toBe(`${PREVIEW}/account/`);

    const session = await app.request(
      `${PREVIEW}/api/auth/get-session`,
      { headers: { cookie: cookiesOf(finished) } },
      withGitHub()
    );
    const { user } = (await session.json()) as { user: { email: string; emailVerified: boolean } };
    expect(user.email).toBe('preview-github@example.com');
    expect(user.emailVerified).toBe(true);
  });

  it('is not proxied on production, which signs in directly', async () => {
    fakeGitHub('production-github@example.com');

    const { authorize, cookie } = await beginGitHub(ORIGIN);
    const state = authorize.searchParams.get('state') ?? '';

    const callback = await app.request(
      `${ORIGIN}/api/auth/callback/github?code=fake-code&state=${encodeURIComponent(state)}`,
      { headers: { cookie } },
      withGitHub()
    );
    expect(callback.status).toBe(302);
    expect(callback.headers.get('location')).toBe(`${ORIGIN}/account/`);
    expect(cookiesOf(callback)).toContain('session_token');
  });
});
