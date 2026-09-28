'use client';

import { authClient, signOut } from './authClient';

// An admin seeing the site as someone else, to troubleshoot what they see.
// better-auth's admin plugin does the work: impersonate-user swaps the session
// cookie for one of the person's (marked `impersonatedBy`, an hour long) and
// keeps the admin's own in a signed `admin_session` cookie, which
// stop-impersonating puts back. The /api/admin routes read the role off the
// session, so while it lasts the admin tier is closed to them too, and it
// refuses to start on another admin or a banned account.

/** The page the admin started from, per tab, so stopping goes back to it. */
const RETURN_KEY = 'tabbied:impersonation-return';

const FALLBACK = '/admin/users/';

export async function startImpersonating(userId: string): Promise<void> {
  const { error } = await authClient.admin.impersonateUser({ userId });

  if (error) throw new Error(error.message ?? 'Could not sign in as that account.');

  try {
    window.sessionStorage.setItem(RETURN_KEY, `${window.location.pathname}${window.location.search}`);
  } catch {
    // No storage: stopping lands on the users page instead.
  }

  // A full load rather than a push, so nothing on the page keeps the admin's
  // session in memory. The account overview is what the person sees first.
  window.location.assign('/account/');
}

export async function stopImpersonating(): Promise<void> {
  let back = FALLBACK;

  try {
    back = window.sessionStorage.getItem(RETURN_KEY) ?? FALLBACK;
    window.sessionStorage.removeItem(RETURN_KEY);
  } catch {
    // As above.
  }

  // No body; the client's types ask for a query all the same.
  const { error } = await authClient.admin.stopImpersonating({ query: {} });

  if (error) {
    // The admin's own session is gone (it expired, or was signed out
    // elsewhere): leave the borrowed one too, and sign in again.
    await signOut().catch(() => undefined);
    window.location.assign(`/sign-in/?next=${encodeURIComponent(back)}`);
    return;
  }

  window.location.assign(back);
}
