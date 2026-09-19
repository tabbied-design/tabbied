import { buildAuth } from '../auth';
import { isDev, type Env } from '../env';

/**
 * Every route that spends money or writes resolves the caller first. Takes the
 * bindings and the headers rather than the context, so it stays independent of
 * Hono's generics and is trivially callable from a test.
 *
 * With no BETTER_AUTH_SECRET the answer is "nobody", not a lookup. Only
 * `/api/auth/*` used to check for the secret (and answer 503); every other
 * route built better-auth regardless, and better-auth falls back to a
 * well-known default secret outside NODE_ENV=production - which workerd never
 * sets. With the cookie cache on, a session cookie signed with that default
 * would have been accepted here with no database read at all. Dev keeps the
 * default so `.dev.vars` need not carry a secret.
 */
export function authConfigured(env: Env): boolean {
  return Boolean(env.BETTER_AUTH_SECRET) || isDev(env);
}

export async function requireUser(env: Env, headers: Headers): Promise<string | null> {
  if (!authConfigured(env)) return null;

  const auth = buildAuth(env);
  const session = await auth.api.getSession({ headers });

  return session?.user?.id ?? null;
}
