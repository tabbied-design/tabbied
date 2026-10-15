// First-party product counts, the admin overview's "Customizer sessions" and
// "started from a save": one row per event in the Worker's `event` table
// (POST /api/events), with the person when a session exists and without
// otherwise. Fire and forget: a count that fails to land is never the
// visitor's problem, so nothing here throws or waits.
import { apiUrl } from 'lib/apiFetch';

/**
 * - `customize`: the customizer opened on a template.
 * - `save-gate`: a signed-out person pressed Save and was asked for an account.
 * - `gate-save`: the edits stashed at that gate were saved after signing in.
 */
export type ProductEvent = 'customize' | 'save-gate' | 'gate-save';

export function track(kind: ProductEvent, slug?: string): void {
  try {
    void fetch(apiUrl('/api/events'), {
      method: 'POST',
      credentials: 'include',
      // The request outlives a navigation that follows it (the gate's links).
      keepalive: true,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(slug ? { kind, slug } : { kind }),
    }).catch(() => undefined);
  } catch {
    // No fetch, or a refused request: the count is lost, nothing else.
  }
}
