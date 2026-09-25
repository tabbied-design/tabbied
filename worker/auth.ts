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

// better-auth over D1, built per request. It is a factory for the same reason
// `buildServer` is on the MCP side: an isolate is shared across requests, so a
// module-scope singleton capturing bindings breaks under concurrency.
// Construction does no I/O.

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
 * or unset means nobody is an admin by configuration. `/api/health` reports
 * how many (never the addresses), which is how a deploy that silently lost
 * the setting is told apart from one that has it.
 */
export function configuredAdmins(env: Env): string[] {
  return (env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0);
}

function isConfiguredAdmin(env: Env, email: string): boolean {
  return configuredAdmins(env).includes(email.trim().toLowerCase());
}

/**
 * The one statement behind admins-by-configuration: give the role to the row
 * `where` names, if that row is named in ADMIN_EMAILS and does not have it
 * yet. Both call sites use it, so the rule has one implementation. One UPDATE
 * rather than a read and a write keeps it atomic and idempotent. better-auth
 * stores addresses lower-cased, but the comparison says `lower()` anyway.
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
        // `role <> 'admin'` alone is NULL for the NULL role every account
        // predating the admin plugin's migration carries, so it would match
        // none of the accounts this exists to promote.
        sql`(${schema.user.role} is null or ${schema.user.role} <> 'admin')`
      )
    );
}

export function buildAuth(env: Env) {
  const db = drizzle(env.DB, { schema });

  return betterAuth({
    // Unset only in dev: every caller checks first (`authConfigured`, or the
    // 503 on /api/auth/*), since better-auth would otherwise sign cookies with
    // a well-known default.
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.PUBLIC_ORIGIN,
    basePath: '/api/auth',

    // Roles, bans and impersonation. Every /api/admin/* route reads the role
    // server-side; the pages hiding themselves is cosmetic.
    plugins: [admin()],

    // Admins by configuration, promoted before the session is minted. A new
    // account is caught by the user hook below; an existing one signing in
    // has to be caught here, in front of the endpoint, not in a
    // `session.create` hook: `signInEmail` reads the user row, creates the
    // session, then sets the cookie from the row it read first, and with
    // `cookieCache` on that row is what `getSession` answers from. A role
    // written after the fact is missing from the very session that triggered
    // it. `worker/test/admin.test.ts` pins the session, not just the row.
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
            // The catch-all, for a session minted by a path the hook above
            // does not see (a social callback, the auto-sign-in on a
            // verification link). Those wait out the cookie cache before the
            // role shows in the session; nothing goes unpromoted.
            await grantConfiguredAdmin(env, db, eq(schema.user.id, created.userId));
          },
        },
      },
    },

    database: drizzleAdapter(db, { provider: 'sqlite', schema }),

    session: {
      // A signed, short-lived copy of the session in the cookie, so an
      // authenticated request costs no database read. Five minutes (the
      // upstream default) is how long a revocation can take to be felt.
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },

    rateLimit: {
      // The default is an in-memory map per isolate, which counts a
      // distributed brute force as unrelated attempts. D1 is one shared count.
      storage: 'database',
    },

    emailAndPassword: {
      enabled: true,
      // The account cannot sign in until the link is followed, which is also
      // the first gate on a throwaway address spending AI budget.
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
      // With no verification mail configured better-auth asks for the password
      // instead, which is the right friction for an irreversible action.
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
      // Same origin in production. In dev :3000 and :8787 are cross-port,
      // which is same-site by the cookie spec, so only Secure gives way for
      // plain http.
      useSecureCookies: !isDev(env),
    },

    // Beside PUBLIC_ORIGIN (the baseURL fallback), two kinds of origin:
    //
    // In dev, any loopback origin rather than a list of ports: the site, the
    // Worker, `npm run preview` and a test harness each pick their own, and a
    // hardcoded list rejects the rest as "Invalid origin".
    //
    // On a preview deployment, its own *.workers.dev origin, so sign-in works
    // on every branch's host. It is trusted only when same-origin with the
    // host the request arrived on, and a preview's cookie is host-only, so it
    // never reaches production.
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
 * host this request arrived on. A request from any other page carries that
 * page's origin, not this host's.
 */
function isPreviewOrigin(origin: string, request: Request): boolean {
  try {
    const { hostname } = new URL(origin);

    return hostname.endsWith('.workers.dev') && origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
