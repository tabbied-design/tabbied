'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { apiFetch } from 'lib/apiFetch';
import shell from './account.module.css';
import styles from './YourDownloads.module.css';

type Download = {
  slug: string;
  /** The template's catalog name, or its slug when the catalog has no entry. */
  name: string;
  format: string;
  createdAt: string;
};

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; downloads: Download[] };

const FORMAT: Record<string, string> = { html: 'HTML', react: 'React' };

const when = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

/** A catalog name reads "Atelier Vane: Fashion label, Antwerp"; the title is the part before the colon. */
const split = (name: string): { title: string; note: string | null } => {
  const at = name.indexOf(':');

  return at === -1
    ? { title: name, note: null }
    : { title: name.slice(0, at).trim(), note: name.slice(at + 1).trim() || null };
};

/** The zips this person took in the last six months, newest first. Session-scoped on the API side. */
export default function YourDownloads() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let live = true;

    apiFetch<{ downloads: Download[] }>('/api/account/downloads')
      .then(({ downloads }) => {
        if (live) setState({ status: 'ready', downloads });
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
      <div className={`${shell.tableHead} ${styles.columns}`} aria-hidden="true">
        <div>Template</div>
        <div>Format</div>
        <div>Downloaded</div>
        <div />
      </div>

      {state.status === 'loading' ? (
        <p className={shell.empty}>Loading your downloads...</p>
      ) : state.status === 'error' ? (
        <p className={shell.empty}>Could not load your downloads right now.</p>
      ) : state.downloads.length === 0 ? (
        <p className={shell.empty}>
          Nothing in the last six months. Every <Link href="/templates">template</Link> comes
          as static HTML or a React project.
        </p>
      ) : (
        state.downloads.map((row, index) => {
          const { title, note } = split(row.name);

          return (
            <div
              key={`${row.slug}-${row.format}-${row.createdAt}-${index}`}
              className={`${shell.row} ${styles.columns}`}
            >
              <span className={styles.template}>
                <span className={styles.title}>{title}</span>
                {note ? (
                  <span className={shell.rowMeta} style={{ display: 'block' }}>
                    {note}
                  </span>
                ) : null}
              </span>
              <span className={shell.rowValue}>{FORMAT[row.format] ?? row.format}</span>
              <span className={shell.rowValue}>{when(row.createdAt)}</span>
              <Link href={`/templates/${row.slug}/`} prefetch={false} className={shell.rowAction}>
                Open <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
