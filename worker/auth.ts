import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthMiddleware } from 'better-auth/api';
import { and, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema';
import type { Env } from './env';
import { isDev } from './env';
import { sendMail } from './lib/mail';

// better-auth over D1, built per request.
//
// It is a factory for the same reason `buildServer` is one on the MCP side:
// a Worker isolate is shared across requests and across *environments* during
// local dev, so capturing bindings in a module-scope singleton is a bug that
// only shows up under concurrency. Construction is cheap - no I/O - and the
// expensive part (session lookup) is a KV read, not a rebuild.

function socialProviders(env: Env) {
  const providers: Record<string, { clientId: string; clientSecret: string }> = {};

  // A provider is configured or it is absent - never half-declared, which
  // renders a sign-in button that 500s on click.
  if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
    providers.github = {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    };
  }
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    providers.google = {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    };
  }
  if (env.APPLE_CLIENT_ID && env.APPLE_CLIENT_SECRET) {
    providers.apple = {
      clientId: env.APPLE_CLIENT_ID,
      clientSecret: env.APPLE_CLIENT_SECRET,
    };
  }

  return providers;
}

/**
 * The providers the sign-in form may offer, in the order it shows them. The
 * form asks `/api/auth-providers` rather than guessing, so the only buttons
 * it draws are for providers this deployment can actually complete.
 */
export function configuredProviders(env: Env): string[] {
  const configured = socialProviders(env);

  return ['google', 'apple', 'github'].filter((name) => name in configured);
}

/**
 * The addresses named in ADMIN_EMAILS, lower-cased, in the order given. Empty
 * or unset means nobody is an admin by configuration. Exported so `/api/health`
 * can report *how many* there are: a deploy that has the setting and a deploy
 * that silently lost it are otherwise indistinguishable from outside, which is
 * the whole diagnosis of "I added my address and I still am not an admin". The
 * addresses themselves are never reported.
 */
export function configuredAdmins(env: Env): string[] {
  return (env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0);
}

/** Is this address in ADMIN_EMAILS? Empty or unset means nobody is. */
export function isConfiguredAdmin(env: Env, email: string): boolean {
  return configuredAdmins(env).includes(email.trim().toLowerCase());
}

/**
 * The one statement behind admins-by-configuration: give the role to the row
 * `where` names, if that row is named in ADMIN_EMAILS and does not have it
 * yet. Both call sites below pass a different `where` - the address a sign-in
 * arrived with, or the id a new session belongs to - and neither restates the
 * rule, so a promotion cannot mean one thing on one path and another on the
 * next.
 *
 * It is one UPDATE rather than a read and a write, which makes it atomic and
 * idempotent: it runs on every sign-in by a configured address and writes
 * nothing once the role is there. better-auth stores addresses lower-cased,
 * but the comparison says `lower()` anyway rather than trust that.
 */
async function grantConfiguredAdmin(
  env: Env,
  db: ReturnType<typeof drizzle>,
  where: SQL
): Promise<void> {
  const named = configuredAdmins(env);

  // Nobody configured: no statement at all, rather than one that cannot match.
  if (named.length === 0) return;

  await db
    .update(schema.user)
    .set({ role: 'admin' })
    .where(
      and(
        where,
        inArray(sql`lower(${schema.user.email})`, named),
        // `role <> 'admin'` alone is NULL for the NULL role that every account
        // predating the admin plugin's migration carries - i.e. exactly the
        // accounts this exists to promote - so it would match none of them.
        sql`(${schema.user.role} is null or ${schema.user.role} <> 'admin')`
      )
    );
}

export function buildAuth(env: Env) {
  const db = drizzle(env.DB, { schema });

  return betterAuth({
    // Missing in dev is survivable (the account is throwaway); missing in
    // production would silently sign cookies with a constant, so it throws
    // there via the same check the routes make before mounting.
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.PUBLIC_ORIGIN,
    basePath: '/api/auth',

    // Roles, bans and impersonation. The first admin is granted by hand
    // (`npm run admin:grant -- you@example.com`); after that /admin/users does
    // it. Every /api/admin/* route reads the role server-side - the pages
    // hiding themselves is cosmetic.
    plugins: [admin()],

    // Admins by configuration, promoted *before* the session is minted.
    //
    // `ADMIN_EMAILS` names accounts that get the role without anyone running
    // the grant script, and there are two moments to catch: the account being
    // created, and an account that predates the setting signing in. The first
    // is a database hook below. The second has to run here, in front of the
    // endpoint, and not in a `session.create` hook, because of what the role
    // is read from afterwards.
    //
    // `signInEmail` reads the user row, creates the session, and only then
    // calls `setSessionCookie(ctx, { session, user })` with the row it read
    // *first*. With `cookieCache` on, that row is what the browser is handed
    // and what `getSession` answers from for the cache's lifetime - so a
    // promotion written from `session.create.after` lands in D1 and is absent
    // from the very session it was triggered by. The nav drew no Admin link
    // and /admin rendered "Not found" for five minutes after doing everything
    // right, which is indistinguishable from the setting not working at all.
    // Promoting here means the row the endpoint goes on to read already says
    // admin. `worker/test/admin.test.ts` pins the session, not just the row.
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        // Only the one endpoint, and only when there is something to do: this
        // runs in front of every /api/auth/* request.
        if (ctx.path !== '/sign-in/email') return;
        if (!env.ADMIN_EMAILS) return;

        const email = (ctx.body as { email?: unknown } | undefined)?.email;

        if (typeof email !== 'string') return;

        await grantConfiguredAdmin(env, db, sql`lower(${schema.user.email}) = ${email.trim().toLowerCase()}`);
      }),
    },

    databaseHooks: {
      user: {
        create: {
          before: async (data) => ({
            data: isConfiguredAdmin(env, data.email) ? { ...data, role: 'admin' } : data,
          }),
        },
      },
      session: {
        create: {
          after: async (created) => {
            // The catch-all, for a session minted by any path the hook above
            // does not see: a social callback, where the address is not known
            // until the provider answers, or the auto-sign-in on a
            // verification link. Those pay the cookie cache's few minutes
            // before the role shows in the session; nothing goes unpromoted.
            await grantConfiguredAdmin(env, db, eq(schema.user.id, created.userId));
          },
        },
      },
    },

    database: drizzleAdapter(db, { provider: 'sqlite', schema }),

    session: {
      // A signed, short-lived copy of the session in the cookie itself, so the
      // common case - an authenticated request - costs no database read at
      // all. Five minutes is the upstream default and the right trade here:
      // revoking a session takes at most that long to be felt, and the
      // endpoints that spend money re-check nothing more sensitive than
      // identity.
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },

    rateLimit: {
      // The default is an in-memory map, which is per-isolate - a distributed
      // brute force against the credential endpoints would be counted as a
      // handful of unrelated attempts. D1 is shared, so it is one count.
      storage: 'database',
    },

    emailAndPassword: {
      enabled: true,
      // The account exists but cannot sign in until the link is followed. The
      // AI endpoints check the session, so this is also the first gate on
      // spending money for a throwaway address.
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendMail(env, {
          to: user.email,
          subject: 'Reset your Tabbied password',
          url,
          text: `Reset your Tabbied password:\n\n${url}\n\nIf you didn't ask for this, ignore it.`,
        });
      },
    },

    user: {
      // Deleting an account is the person's to do; with no verification mail
      // configured better-auth asks for the password instead, which is the
      // right friction for the only irreversible thing on the settings page.
      deleteUser: { enabled: true },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendMail(env, {
          to: user.email,
          subject: 'Confirm your Tabbied account',
          url,
          text: `Confirm your Tabbied account:\n\n${url}`,
        });
      },
    },

    socialProviders: socialProviders(env),

    advanced: {
      // The site and the API are the same origin in production, so the cookie
      // needs no cross-site relaxation. In dev they are :3000 and :8787, which
      // is cross-*port* - same-site by the cookie spec - so only Secure has to
      // give way for plain http.
      useSecureCookies: !isDev(env),
    },

    // Two origins beside PUBLIC_ORIGIN, and nothing else: the origin check
    // otherwise falls back to baseURL, which is the whole point of being
    // same-origin.
    //
    // In dev, any loopback origin rather than a list of ports. The site runs
    // on :3000 while the Worker runs on :8787, `npm run preview` picks its
    // own, and a test harness picks another again - a hardcoded pair silently
    // rejects every one it does not name, as "Invalid origin", which reads
    // like a bug in the form rather than a missing entry here.
    //
    // On a preview deployment, the deployment's own origin. Workers Builds
    // gives every branch and every version a *.workers.dev host, so a sign-in
    // there arrives from that host and not from PUBLIC_ORIGIN, and answered
    // "Invalid origin" on every preview. The host is trusted only for a
    // request that is same-origin with it (the Origin header naming the very
    // host the request arrived on), so nothing is gained by naming a
    // workers.dev origin from anywhere else; the cookie a preview issues is
    // host-only, so it never reaches production.
    trustedOrigins: (request) => {
      if (!request) {
        return [];
      }

      const origin = request.headers.get('origin');

      if (!origin) {
        return [];
      }

      const { hostname } = new URL(origin);

      if (isDev(env) && (hostname === 'localhost' || hostname === '127.0.0.1')) {
        return [origin];
      }

      return isPreviewOrigin(origin, request) ? [origin] : [];
    },
  });
}

/**
 * A preview deployment's own origin: a *.workers.dev host that is also the
 * host this request arrived on. Same-origin is the whole test, since a
 * request from any other page carries that page's origin, not this host's.
 */
export function isPreviewOrigin(origin: string, request: Request): boolean {
  try {
    const { hostname } = new URL(origin);

    return hostname.endsWith('.workers.dev') && origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
