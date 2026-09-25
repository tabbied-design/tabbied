'use client';

// The templates the signed-in person has chosen, shared by every component on
// a page: one read per page (and one more after a choice), not one per card.
// The rule is the Worker's (worker/lib/templates.ts); this is only what the
// page draws.
import { useEffect, useSyncExternalStore } from 'react';
import { apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';

export type ChosenTemplate = {
  slug: string;
  chosenAt: string;
  /** The newest site the person customized from it, if any. */
  site: { id: string; updatedAt: string } | null;
};

/**
 * A person's latest "Request more". Round 1 is answered by an emailed link
 * ('sent', then 'activated'); later rounds by the team ('pending', then
 * 'granted' or 'declined'). See worker/lib/templates.ts.
 */
export type TemplateRequest = {
  round: number;
  status: 'sent' | 'activated' | 'pending' | 'granted' | 'declined';
  granted: number;
  role: string | null;
  building: string | null;
  sites: string | null;
  /** Round 1: when the email is due, and when its link lapses. */
  sendAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export type MyTemplates = {
  used: number;
  total: number;
  left: number;
  chosen: ChosenTemplate[];
  request: TemplateRequest | null;
  /** Whether the emailed-link request has been made: every later one is reviewed. */
  firstUsed: boolean;
};

/** What a first request's link adds. */
export const FIRST_REQUEST_GRANT = 5;

/** Whether a request is still waiting on something: the email, or the team. */
export const isOpen = (request: TemplateRequest | null) =>
  request !== null && (request.status === 'sent' || request.status === 'pending');

export type MyTemplatesState =
  | { status: 'signed-out' }
  | { status: 'loading' }
  | { status: 'error' }
  | ({ status: 'ready' } & MyTemplates);

/** The allowance while nothing has been read: what the page promises. */
export const FREE_TEMPLATES = 5;

let state: MyTemplatesState = { status: 'loading' };
/** The newest read; an older one that answers after it is ignored. */
let newest: Promise<void> | null = null;
let loadedFor: string | null = null;
const listeners = new Set<() => void>();

function set(next: MyTemplatesState) {
  state = next;
  listeners.forEach((listener) => listener());
}

/**
 * Read the person's templates again, e.g. after a choice. Every call is a new
 * request and only the newest settles the store: a read already in flight left
 * before the choice was posted, so sharing it would answer from before it.
 */
export function refreshMyTemplates(): Promise<void> {
  const read: Promise<void> = apiFetch<MyTemplates>('/api/account/templates')
    .then((body) => {
      if (newest === read) set({ status: 'ready', ...body });
    })
    .catch(() => {
      if (newest === read) set({ status: 'error' });
    });

  newest = read;

  return read;
}

/**
 * Make a template the person's. Resolves with the new counts, or throws the
 * Worker's own sentence (every template chosen, signed out) for a toast.
 */
export async function chooseTemplate(slug: string): Promise<void> {
  await apiFetch('/api/account/templates', { method: 'POST', body: JSON.stringify({ slug }) });
  await refreshMyTemplates();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The person's templates, read once per page and per signed-in account. */
export function useMyTemplates(): MyTemplatesState {
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
    void refreshMyTemplates();
  }, [userId, isPending]);

  return isPending ? { status: 'loading' } : current;
}

/** The chosen template with this slug, when the person has it. */
export function chosenOf(templates: MyTemplatesState, slug: string): ChosenTemplate | null {
  return templates.status === 'ready' ? (templates.chosen.find((row) => row.slug === slug) ?? null) : null;
}

/** The customizer for a chosen template: the person's newest site, or a fresh draft. */
export function customizeHref(slug: string, chosen: ChosenTemplate | null): string {
  return chosen?.site ? `/studio/site/?id=${chosen.site.id}` : `/studio/customize/?slug=${slug}`;
}

/** Start a zip download the way a link with `download` would. */
export function startDownload(href: string): void {
  const anchor = document.createElement('a');

  anchor.href = href;
  anchor.download = '';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}
