'use client';

// The account's front page: what Studio has been asked for, and what today's
// spending looks like against the caps.
//
// Three reads, in parallel - sites, generations, usage - and one list made
// from the first two. A site and a generation are different things to the
// API (one is a full document on a template, the other is three directions
// to choose between) and the same thing to the person: a request they made
// and can go back to. So the history shows them together, newest first,
// each tagged with which kind it was.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { GenerationSummary, SiteSummary } from 'lib/studioDocument';
import { apiFetch } from 'lib/apiFetch';
import AccountPage from './AccountPage';
import shell from './account.module.css';
import styles from './AccountOverview.module.css';

type Usage = {
  resetsAt: string;
  usage: { endpoint: string; label: string; used: number; cap: number }[];
};

type Loaded = {
  sites: SiteSummary[];
  generations: GenerationSummary[];
  usage: Usage | null;
};

type State = { status: 'loading' } | { status: 'error' } | ({ status: 'ready' } & Loaded);

/** The cap the design gives the ring: the one a person spends first. */
const HEADLINE_ENDPOINT = 'sites';

const resetsAt = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

/**
 * The design's ring: a track and an arc over it, rotated a quarter turn so the
 * arc starts at twelve. The dash array is the arc's length against the rest of
 * the circumference, so a full cap closes the ring exactly.
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

/** One row of the history, whichever kind of request it was. */
type Request = {
  key: string;
  kind: 'site' | 'directions' | 'matched';
  title: string;
  at: Date;
  palette: string[];
  detail: string;
  href: string;
  action: string;
};

const KIND_LABEL: Record<Request['kind'], string> = {
  site: 'Make my website',
  directions: 'Three directions',
  matched: 'Matched from the library',
};

const KIND_CLASS: Record<Request['kind'], string> = {
  site: styles.tagSite,
  directions: styles.tagDirections,
  matched: styles.tagMatched,
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

function toRequests({ sites, generations }: Loaded): Request[] {
  const rows: Request[] = [
    ...sites.map<Request>((site) => ({
      key: `site:${site.id}`,
      kind: 'site',
      title: site.title,
      at: new Date(site.updatedAt),
      palette: site.palette,
      detail: `${site.stance ? `${site.stance} · ` : ''}${site.templateName} · ${plural(site.revisions, 'revision')}`,
      href: `/studio/site/?id=${site.id}`,
      action: 'Open site',
    })),
    ...generations.map<Request>((generation) => ({
      key: `generation:${generation.id}`,
      kind: generation.source === 'matched-fallback' ? 'matched' : 'directions',
      title: generation.description,
      at: new Date(generation.createdAt),
      palette: generation.directions[0]?.palette ?? [],
      detail:
        generation.directions.map((direction) => direction.name).join(' · ') +
        (generation.sites > 0 ? ` · ${plural(generation.sites, 'site')} made` : ''),
      href: `/studio/results/?g=${generation.id}`,
      action: 'View results',
    })),
  ];

  return rows.sort((a, b) => b.at.getTime() - a.at.getTime());
}

export default function AccountOverview() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [newestFirst, setNewestFirst] = useState(true);

  useEffect(() => {
    let live = true;

    Promise.all([
      apiFetch<{ sites: SiteSummary[] }>('/api/studio/sites'),
      apiFetch<{ generations: GenerationSummary[] }>('/api/studio/generations'),
      // Usage failing should not take the history with it.
      apiFetch<Usage>('/api/account/usage').catch(() => null),
    ])
      .then(([{ sites }, { generations }, usage]) => {
        if (live) setState({ status: 'ready', sites, generations, usage });
      })
      .catch(() => {
        if (live) setState({ status: 'error' });
      });

    return () => {
      live = false;
    };
  }, []);

  const requests = useMemo(
    () => (state.status === 'ready' ? toRequests(state) : []),
    [state]
  );
  const ordered = newestFirst ? requests : [...requests].reverse();

  const ready = state.status === 'ready' ? state : null;
  const rows = ready?.usage?.usage ?? [];
  const headline = rows.find((row) => row.endpoint === HEADLINE_ENDPOINT) ?? rows[0];
  const rest = rows.filter((row) => row !== headline);

  return (
    <AccountPage
      eyebrow="My account"
      title="Usage this month"
      badge="Free plan"
      lede="Tabbied is free while we're in beta. There are no paid tiers yet, so every account gets the same limits."
    >
      {/* One bordered box split in two, as the design draws it: the headline
          cap as a ring on paper, the rest of the day's spending on ink. The
          design's ring meters custom site downloads, which nothing counts;
          this meters the cap that is actually kept, so the gauge is reading
          something real. */}
      <div className={styles.cards}>
        <div className={styles.gaugeCard}>
          {headline ? (
            <>
              <Gauge used={headline.used} cap={headline.cap} />
              <div>
                <p className={styles.gaugeLabel}>{headline.label}</p>
                <p className={styles.gaugeCount}>
                  {headline.used} of {headline.cap} today
                </p>
                {ready?.usage ? (
                  <p className={styles.gaugeResets}>Resets {resetsAt(ready.usage.resetsAt)}</p>
                ) : null}
              </div>
            </>
          ) : (
            <p className={shell.quiet}>
              {state.status === 'loading'
                ? 'Reading today\'s usage...'
                : 'Usage is not available right now.'}
            </p>
          )}
        </div>

        <div className={styles.dark}>
          {/* The design hangs a status pill opposite the card's name, saying
              the tier is not available yet. It is, and the reset it would
              otherwise carry is already under the gauge, so the name stands
              alone rather than repeating it. */}
          <div className={styles.darkHead}>
            <p className={styles.cardLabel}>Today's AI usage</p>
          </div>
          {rest.length > 0 ? (
            <ul className={styles.meters}>
              {rest.map((row) => (
                <li key={row.endpoint}>
                  <div className={styles.meterHead}>
                    <span>{row.label}</span>
                    <strong>
                      {row.used} / {row.cap}
                    </strong>
                  </div>
                  <div className={styles.meterBar} aria-hidden="true">
                    <span style={{ width: `${Math.min(100, (row.used / row.cap) * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.darkQuiet}>
              {state.status === 'loading' ? 'Reading today\'s usage...' : 'Usage is not available right now.'}
            </p>
          )}
        </div>
      </div>

      <div className={styles.recentsHead}>
        <h2 className={shell.h2}>Recents</h2>
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
          <Link href="/studio" prefetch={false} className={shell.cta}>
            + New Studio request
          </Link>
        </div>
      </div>

      <div className={shell.panel}>
        <div className={`${shell.tableHead} ${styles.columns}`} aria-hidden="true">
          <div>Recent</div>
          <div>Request type</div>
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
              <div className={styles.skeleton} style={{ width: 120, height: 28, borderRadius: 999 }} />
              <div className={styles.skeleton} style={{ width: '70%' }} />
              <div />
            </div>
          ))
        ) : state.status === 'error' ? (
          <p className={shell.empty}>Could not load your history right now.</p>
        ) : ordered.length === 0 ? (
          <p className={shell.empty}>
            Nothing yet. Describe your business in <Link href="/studio">Studio</Link> and
            the results will be here to come back to.
          </p>
        ) : (
          ordered.map((request) => (
            <div key={request.key} className={`${shell.row} ${styles.columns}`}>
              <div>
                <p className={shell.rowTitle}>{request.title}</p>
                <p className={shell.rowMeta}>{when(request.at)}</p>
              </div>
              <div>
                <span className={`${styles.tag} ${KIND_CLASS[request.kind]}`}>
                  {KIND_LABEL[request.kind]}
                </span>
              </div>
              <p className={styles.detail}>
                {request.palette.length > 0 ? (
                  <span className={styles.swatches} aria-hidden="true">
                    {request.palette.slice(0, 4).map((color, index) => (
                      <span key={`${color}-${index}`} style={{ background: color }} />
                    ))}
                  </span>
                ) : null}
                {request.detail}
              </p>
              <Link href={request.href} prefetch={false} className={shell.rowAction}>
                {request.action} &rarr;
              </Link>
            </div>
          ))
        )}
      </div>

      <p className={shell.footnote}>
        Daily caps reset at midnight UTC. Matching from the library is always free and
        never counted.
      </p>
    </AccountPage>
  );
}
