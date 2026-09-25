'use client';

import { useEffect } from 'react';
import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { API_BASE } from './apiFetch';

// The browser half of better-auth. `baseURL` is set only in development (site
// :3000, Worker :8787); in production the client infers the origin and the
// default `/api/auth` basePath. Do not pass a relative `/api/auth` instead: the
// client validates it at construction, at module scope, during the export,
// where there is no origin, and every page importing this fails to prerender.
export const authClient = createAuthClient({
  ...(API_BASE ? { baseURL: `${API_BASE}/api/auth` } : {}),
  // Roles, bans, impersonation for the admin pages; the server's role gate
  // is what decides.
  plugins: [adminClient()],
});

export const { signIn, signUp } = authClient;

/** What the UI actually needs off a session. */
export type SessionUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  /** Set by the admin plugin; 'admin' opens /admin. */
  role?: string | null;
};

/**
 * better-auth infers the session type from the server config in worker/, which
 * is outside the site's tsconfig, so the client types `data` as `never`. The
 * narrowing happens once, here, against SessionUser.
 */
export function useSessionUser(): {
  user: SessionUser | null;
  isPending: boolean;
} {
  const { data, isPending } = authClient.useSession();
  const session = data as unknown as { user?: SessionUser } | null;
  const user = session?.user ?? null;

  // Keep the masthead's hint (SESSION_HINT_KEY) in step with the session.
  useEffect(() => {
    if (isPending) return;

    try {
      if (user) window.localStorage.setItem(SESSION_HINT_KEY, '1');
      else window.localStorage.removeItem(SESSION_HINT_KEY);
    } catch {
      // Storage refused: no hint, which is the signed-out chrome anyway.
    }
  }, [user, isPending]);

  return { user, isPending };
}

/**
 * Set in a browser that was signed in last time, so the masthead draws a
 * placeholder instead of flashing "Sign in" while the session is fetched
 * (every page is prerendered signed out). Only a hint: the session decides,
 * and a wrong hint costs a placeholder for one fetch.
 */
export const SESSION_HINT_KEY = 'tabbied:signed-in';

export function readSessionHint(): boolean {
  try {
    return window.localStorage.getItem(SESSION_HINT_KEY) === '1';
  } catch {
    return false;
  }
}

export const signOut = async () => {
  try {
    window.localStorage.removeItem(SESSION_HINT_KEY);
  } catch {
    // As above.
  }

  return authClient.signOut({});
};
