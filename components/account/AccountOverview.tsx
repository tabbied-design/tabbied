'use client';

// The account's front page: the sites a person has customized, and where the
// AI tier stands.
//
// One read - the sites - because that is the whole of what a person can make
// for the first launch. The generation flow is held back, so the history no
// longer merges generations in beside the sites and no longer tags a row with
// which kind of request it was: every row is a site.
//
// Usage is not read either. Every cap in worker/lib/quota.ts belongs to a
// generation endpoint, so with that flow held back the ring and the meters
// could only ever read zero - and a gauge reading a number nobody can move is
// worse than none, which is the same reason the artboard's template-download
// counter is not drawn. The artboard says what to draw instead: the AI card
// carrying "Not yet available" and a sentence about a later release.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { SiteSummary } from 'lib/studioDocument';
import { apiFetch } from 'lib/apiFetch';
import AccountPage from './AccountPage';
import shell from './account.module.css';
import styles from './AccountOverview.module.css';

type Loaded = { sites: SiteSummary[] };

type State = { status: 'loading' } | { status: 'error' } | ({ status: 'ready' } & Loaded);

/** One row of the list: a site the person customized. */
type Row = {
  key: string;
  title: string;
  at: Date;
  palette: string[];
  detail: string;
  href: string;
  action: string;
};

/** "Today, 6:42 PM" · "Yesterday, 9:18 PM" · "Aug 31, 2:14 PM". */
function when(value: Date): string {
  const now = new Date();
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const time = value.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  if (sameDay(value, now)) return `Today, ${time}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(value, yesterday)) return `Yesterday, ${time}`;

  const day = value.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(value.getFullYear() === now.getFullYear() ? {} : { year: 'numeric' }),
  });

  return `${day}, ${time}`;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function toRows({ sites }: Loaded): Row[] {
  return sites
    .map<Row>((site) => ({
      key: `site:${site.id}`,
      title: site.title,
      at: new Date(site.updatedAt),
      palette: site.palette,
      detail: `${site.stance ? `${site.stance} · ` : ''}${site.templateName} · ${plural(site.revisions, 'revision')}`,
      href: `/studio/site/?id=${site.id}`,
      action: 'Open site',
    }))
    .sort((a, b) => b.at.getTime() - a.at.getTime());
}

export default function AccountOverview() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [newestFirst, setNewestFirst] = useState(true);

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

  const rows = useMemo(() => (state.status === 'ready' ? toRows(state) : []), [state]);
  const ordered = newestFirst ? rows : [...rows].reverse();

  return (
    <AccountPage
      eyebrow="My account"
      title="Your account"
      badge="Free plan"
      lede="Tabbied is free while we're in beta. There are no paid tiers yet, so every account gets the same limits."
    >
      {/* The artboard's AI card, and only it. Its neighbor there is a
          template-download counter over a month, which nothing counts; the
          ring that stood here instead metered the `site` generation endpoint,
          and that cannot move while the flow is held back. So the card the
          artboard already wrote for this moment spans the box: the name, a
          "Not yet available" pill opposite it, the credits it will meter, a
          hatched track standing in for the bar, and the sentence. */}
      <div className={styles.cards}>
        <div className={styles.dark}>
          <div className={styles.darkHead}>
            <p className={styles.cardLabel}>AI usage</p>
            <span className={styles.notYet}>Not yet available</span>
          </div>
          <p className={styles.creditsLabel}>AI credits: words and pictures</p>
          <div className={styles.creditsTrack} aria-hidden="true" />
          <p className={styles.darkNote}>
            Generating custom images and copy with AI is coming in a later release.
          </p>
        </div>
      </div>

      <div className={styles.recentsHead}>
        <h2 className={shell.h2}>Custom sites</h2>
        <div className={styles.recentsActions}>
          <button
            type="button"
            className={styles.sort}
            onClick={() => setNewestFirst((value) => !value)}
            aria-label={newestFirst ? 'Sorted newest first. Show oldest first' : 'Sorted oldest first. Show newest first'}
          >
            <span>{newestFirst ? 'Newest first' : 'Oldest first'}</span>
            <ChevronDown className={styles.sortGlyph} size={14} aria-hidden="true" />
          </button>
          {/* The artboard sends this to the gallery: a site starts from a
              template, which is the one door into the customizer. */}
          <Link href="/templates" prefetch={false} className={shell.cta}>
            + Create new site
          </Link>
        </div>
      </div>

      <div className={shell.panel}>
        <div className={`${shell.tableHead} ${styles.columns}`} aria-hidden="true">
          <div>Site</div>
          <div>Details</div>
          <div />
        </div>

        {state.status === 'loading' ? (
          [0, 1].map((i) => (
            <div key={i} className={`${shell.row} ${styles.columns}`} aria-hidden="true">
              <div>
                <div className={styles.skeleton} style={{ width: '60%', marginBottom: 8 }} />
                <div className={styles.skeleton} style={{ width: '30%', height: 12 }} />
              </div>
              <div className={styles.skeleton} style={{ width: '70%' }} />
              <div />
            </div>
          ))
        ) : state.status === 'error' ? (
          <p className={shell.empty}>Could not load your history right now.</p>
        ) : ordered.length === 0 ? (
          <p className={shell.empty}>
            Nothing yet. Pick a <Link href="/templates">template</Link> and the site you
            make from it will be here to come back to.
          </p>
        ) : (
          ordered.map((row) => (
            <div key={row.key} className={`${shell.row} ${styles.columns}`}>
              <div>
                <p className={shell.rowTitle}>{row.title}</p>
                <p className={shell.rowMeta}>{when(row.at)}</p>
              </div>
              <p className={styles.detail}>
                {row.palette.length > 0 ? (
                  <span className={styles.swatches} aria-hidden="true">
                    {row.palette.slice(0, 4).map((color, index) => (
                      <span key={`${color}-${index}`} style={{ background: color }} />
                    ))}
                  </span>
                ) : null}
                {row.detail}
              </p>
              <Link href={row.href} prefetch={false} className={shell.rowAction}>
                {row.action} &rarr;
              </Link>
            </div>
          ))
        )}
      </div>

      <p className={shell.footnote}>
        Customizing a template's colors and patterns is free and is not counted.
      </p>
    </AccountPage>
  );
}
