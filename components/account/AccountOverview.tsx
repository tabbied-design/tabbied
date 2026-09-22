'use client';

// The account's front page: the month's template downloads against the cap,
// where the AI tier stands, and the sites a person has customized.
//
// Two reads: the sites, which are the whole of what a person can make for
// the first launch (the generation flow is held back, so the history no
// longer merges generations in beside them), and the usage, for the one
// number the artboard's ring meters, the template downloads the Worker
// counts (worker/lib/downloads.ts). The AI card beside the ring carries "Not
// yet available" and a sentence about a later release, because every AI cap
// belongs to an endpoint nothing links to.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Info } from 'lucide-react';
import type { SiteSummary } from 'lib/studioDocument';
import { apiFetch } from 'lib/apiFetch';
import AccountPage from './AccountPage';
import shell from './account.module.css';
import styles from './AccountOverview.module.css';

/** What /api/account/usage says about the month's template downloads. */
type Downloads = { used: number; cap: number; resetsAt: string };

type Loaded = { sites: SiteSummary[]; downloads: Downloads | null };

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

/** "Today, 6:42 PM", "Yesterday, 9:18 PM", "Aug 31, 2:14 PM". */
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

/** "Oct 1": the day the month's count starts over. */
const resetsOn = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

/**
 * The artboard's ring: a track and an arc over it, rotated a quarter turn so
 * the arc starts at twelve. The dash array is the arc's length against the
 * rest of the circumference, so a full cap closes the ring exactly.
 */
function Gauge({ used, cap }: { used: number; cap: number }) {
  const r = 41;
  const circumference = 2 * Math.PI * r;
  const arc = cap > 0 ? Math.min(1, used / cap) * circumference : 0;

  return (
    <div className={styles.gauge}>
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r={r} fill="none" stroke="oklch(0 0 0 / 0.09)" strokeWidth="9" />
        {arc > 0 ? (
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="#0e0e13"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference - arc}`}
          />
        ) : null}
      </svg>
      <span className={styles.gaugeValue}>{used}</span>
    </div>
  );
}

function toRows({ sites }: Loaded): Row[] {
  return sites
    .map<Row>((site) => ({
      key: `site:${site.id}`,
      title: site.title,
      at: new Date(site.updatedAt),
      palette: site.palette,
      detail: site.stance ? `${site.stance} on ${site.templateName}` : site.templateName,
      href: `/studio/site/?id=${site.id}`,
      action: 'Open site',
    }))
    .sort((a, b) => b.at.getTime() - a.at.getTime());
}

export default function AccountOverview() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [newestFirst, setNewestFirst] = useState(true);
  // A download link answered by the Worker with "the cap is spent" lands
  // here with ?downloads=capped. Read after mount, the way the gallery reads
  // its page: a search param read during render bails the static route out.
  const [capped, setCapped] = useState(false);

  useEffect(() => {
    setCapped(new URLSearchParams(window.location.search).get('downloads') === 'capped');
  }, []);

  useEffect(() => {
    let live = true;

    Promise.all([
      apiFetch<{ sites: SiteSummary[] }>('/api/studio/sites'),
      // The usage failing should not take the sites with it.
      apiFetch<{ downloads?: Downloads }>('/api/account/usage').catch(() => null),
    ])
      .then(([{ sites }, usage]) => {
        if (live) setState({ status: 'ready', sites, downloads: usage?.downloads ?? null });
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
  const downloads = state.status === 'ready' ? state.downloads : null;

  return (
    <AccountPage
      eyebrow="My account"
      title="Usage this month"
      badge="Free plan"
      lede="Tabbied is free while we're in beta. There are no paid tiers yet, so every account gets the same limits."
    >
      {capped ? (
        <p className={styles.notice} role="status">
          You have used all {downloads?.cap ?? 30} template downloads for this month.
          {downloads ? ` The count starts over on ${resetsOn(downloads.resetsAt)}.` : ''}
        </p>
      ) : null}

      {/* One bordered box split in two, as the artboard draws it: the ring on
          paper counting the month's template downloads, and the AI card in
          ink, which spans its half with the name, a "Not yet available" pill
          opposite it, the credits it will meter, a hatched track standing in
          for the bar, and the sentence. */}
      <div className={styles.cards}>
        <div className={styles.gaugeCard}>
          {downloads ? (
            <>
              <Gauge used={downloads.used} cap={downloads.cap} />
              <div>
                <p className={styles.gaugeLabel}>
                  Template downloads
                  <span
                    className={styles.gaugeInfo}
                    title="Every zip you take counts, HTML or React, from the gallery, a template's page or the customizer. Customizing itself is free."
                    aria-label="Every zip you take counts, HTML or React, from the gallery, a template's page or the customizer. Customizing itself is free."
                    role="img"
                  >
                    <Info size={14} aria-hidden="true" />
                  </span>
                </p>
                <p className={styles.gaugeCount}>
                  {downloads.used} of {downloads.cap} this month
                </p>
                <p className={styles.gaugeResets}>Resets {resetsOn(downloads.resetsAt)}</p>
              </div>
            </>
          ) : (
            <p className={shell.quiet}>
              {state.status === 'loading'
                ? "Reading this month's downloads..."
                : 'Downloads are not available right now.'}
            </p>
          )}
        </div>

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
                {row.action} <ArrowRight size={14} aria-hidden="true" />
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
