// The customizer's edits, kept across the detour to make an account.
//
// Customizing and downloading need no account; saving does. A signed-out
// person who presses Save is asked to log in or make one (the save gate in
// StudioSite), and their draft is stashed here first, so whatever the way
// back is (a log-in, a sign-up and its confirmation email, a provider's
// round trip) the customizer finds the edits again, puts them on the canvas,
// and saves them once a session exists. localStorage, not the address: an
// edits document is too long for a query string and the confirmation link
// arrives in another tab.
import type { EditsDocument } from 'tabbied-templates';

const KEY = 'tabbied:pending-save';

/** How long a stash waits for its owner: past this it is someone else's afternoon. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type PendingSave = {
  slug: string;
  title: string;
  edits: EditsDocument;
  /** When it was stashed, as epoch milliseconds. */
  at: number;
};

export function stashPendingSave(save: Omit<PendingSave, 'at'>): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...save, at: Date.now() }));
  } catch {
    // Storage refused (a private window, a full quota): the edits are only
    // on the canvas, and the gate's links still lead to an account.
  }
}

/** The stash for this template, when there is a fresh one. */
export function readPendingSave(slug: string): PendingSave | null {
  try {
    const raw = window.localStorage.getItem(KEY);

    if (!raw) return null;

    const save = JSON.parse(raw) as Partial<PendingSave>;

    if (save.slug !== slug || typeof save.at !== 'number' || !save.edits || typeof save.edits !== 'object') {
      return null;
    }

    if (Date.now() - save.at > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }

    return save as PendingSave;
  } catch {
    return null;
  }
}

export function clearPendingSave(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
