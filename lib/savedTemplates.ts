'use client';

// The templates the signed-in person has saved a customization of, shared by
// every component on a page: one read of their sites per page (and one more
// after a save), not one per card. Nothing here gates anything. Every
// template is free to customize and download without an account; an account
// only keeps what was saved, and this is how the gallery marks those
// templates "Saved" and sends Customize to the newest saved site rather than
// a fresh draft.
import { useEffect, useSyncExternalStore } from 'react';
import { apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import type { SiteSummary } from 'lib/studioDocument';

export type SavedTemplatesState =
  | { status: 'signed-out' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; sites: SiteSummary[] };

let state: SavedTemplatesState = { status: 'loading' };
/** The newest read; an older one that answers after it is ignored. */
let newest: Promise<void> | null = null;
let loadedFor: string | null = null;
const listeners = new Set<() => void>();

function set(next: SavedTemplatesState) {
  state = next;
  listeners.forEach((listener) => listener());
}

/**
 * Read the person's sites again, e.g. after a save. Every call is a new
 * request and only the newest settles the store.
 */
export function refreshSavedTemplates(): Promise<void> {
  const read: Promise<void> = apiFetch<{ sites: SiteSummary[] }>('/api/studio/sites')
    .then((body) => {
      if (newest === read) set({ status: 'ready', sites: body.sites });
    })
    .catch(() => {
      if (newest === read) set({ status: 'error' });
    });

  newest = read;

  return read;
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The person's saved sites, read once per page and per signed-in account. */
export function useSavedTemplates(): SavedTemplatesState {
  const { user, isPending } = useSessionUser();
  const current = useSyncExternalStore(subscribe, () => state, () => state);
  const userId = user?.id ?? null;

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      loadedFor = null;
      set({ status: 'signed-out' });
      return;
    }

    if (loadedFor === userId) return;
    loadedFor = userId;
    set({ status: 'loading' });
    void refreshSavedTemplates();
  }, [userId, isPending]);

  return isPending ? { status: 'loading' } : current;
}

/**
 * The person's newest saved site on this template, when there is one. The
 * listing is newest first, so the first match is it.
 */
export function savedOf(saved: SavedTemplatesState, slug: string): SiteSummary | null {
  return saved.status === 'ready' ? (saved.sites.find((site) => site.slug === slug) ?? null) : null;
}

/** The slugs the person has saved at least one site on, in no order. */
export function savedSlugs(saved: SavedTemplatesState): Set<string> {
  return new Set(saved.status === 'ready' ? saved.sites.map((site) => site.slug) : []);
}

/** The customizer for a template: the person's newest saved site, or a fresh draft. */
export function customizeHref(slug: string, site: Pick<SiteSummary, 'id'> | null): string {
  return site ? `/studio/site/?id=${site.id}` : `/studio/customize/?slug=${slug}`;
}
