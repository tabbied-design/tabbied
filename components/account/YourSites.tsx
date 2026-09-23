'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { SiteSummary } from 'lib/studioDocument';
import { apiFetch, ApiError } from 'lib/apiFetch';
import shell from './account.module.css';
import styles from './YourSites.module.css';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; sites: SiteSummary[] };

const when = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * The sites this person has made, newest first. Session-scoped on the API side.
 *
 * Delete asks twice, in place: the first press turns the row's actions into
 * a confirmation, since a deleted site takes its revisions with it and there
 * is nothing to restore it from.
 */
export default function YourSites() {
  const [state, setState] = useState<State>({ status: 'loading' });
  /** The row asking "Delete?", or being deleted. */
  const [confirming, setConfirming] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setDeleting(id);
    setError(null);

    try {
      await apiFetch(`/api/studio/sites/${encodeURIComponent(id)}`, { method: 'DELETE' });
      setState((prev) =>
        prev.status === 'ready' ? { ...prev, sites: prev.sites.filter((site) => site.id !== id) } : prev
      );
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Could not delete that site.');
    } finally {
      setDeleting(null);
      setConfirming(null);
    }
  };

  useEffect(() => {
    let live = true;

    apiFetch<{ sites: SiteSummary[] }>('/api/studio/sites')
      .then(({ sites }) => {
        if (live) setState({ status: 'ready', sites });
      })
      .catch(() => {
        if (live) setState({ status: 'error' });
      });

    return () => {
      live = false;
    };
  }, []);

  return (
    <div className={shell.panel}>
      {error ? (
        <p className={shell.empty} role="alert">
          {error}
        </p>
      ) : null}
      <div className={`${shell.tableHead} ${styles.columns}`} aria-hidden="true">
        <div>Site</div>
        <div>Direction and template</div>
        <div />
      </div>

      {state.status === 'loading' ? (
        <p className={shell.empty}>Loading your sites...</p>
      ) : state.status === 'error' ? (
        <p className={shell.empty}>Could not load your sites right now.</p>
      ) : state.sites.length === 0 ? (
        <p className={shell.empty}>
          No sites yet. Pick a <Link href="/templates">template</Link> and customize its
          colors and patterns.
        </p>
      ) : (
        state.sites.map((site) => (
          <div key={site.id} className={`${shell.row} ${styles.columns}`}>
            <Link href={`/studio/site/?id=${site.id}`} prefetch={false} className={styles.link}>
              <span className={styles.swatches} aria-hidden="true">
                {site.palette.slice(0, 4).map((color, index) => (
                  <span key={`${color}-${index}`} style={{ background: color }} />
                ))}
              </span>
              <span>
                <span className={styles.title}>{site.title}</span>
                <span className={shell.rowMeta} style={{ display: 'block' }}>
                  Updated {when(site.updatedAt)}
                </span>
              </span>
            </Link>
            <span className={shell.rowValue}>
              {site.stance ? `${site.stance} on ${site.templateName}` : site.templateName}
            </span>
            {confirming === site.id ? (
              <span className={styles.actions}>
                <button
                  type="button"
                  className={`${shell.rowAction} ${styles.danger}`}
                  disabled={deleting !== null}
                  onClick={() => void remove(site.id)}
                  aria-label={`Delete ${site.title} for good`}
                >
                  {deleting === site.id ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  className={styles.quietAction}
                  disabled={deleting !== null}
                  onClick={() => setConfirming(null)}
                >
                  Keep
                </button>
              </span>
            ) : (
              <span className={styles.actions}>
                <Link href={`/studio/site/?id=${site.id}`} prefetch={false} className={shell.rowAction}>
                  Open <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className={styles.quietAction}
                  onClick={() => setConfirming(site.id)}
                  aria-label={`Delete ${site.title}`}
                >
                  Delete
                </button>
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
