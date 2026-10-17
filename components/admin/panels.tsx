'use client';

// The admin panels, one per page. Tables over the /api/admin reads; what can
// be done to an account (impersonate, ban, remove) is the row's menu,
// UserActions.
import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { ApiError, apiFetch, apiUrl } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import { initials } from 'components/nav';
import UserActions from './UserActions';
import { cell, money, saveCsv, useAdminData, when } from './useAdminData';
import styles from './admin.module.css';

const Load = ({ error }: { error: string | null }) => (
  <p className={styles.quiet}>{error ?? 'Loading...'}</p>
);

const day = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

// ---- overview ---------------------------------------------------------------

type Overview = {
  users: number;
  newUsersThisWeek: number;
  generationsThisWeek: number;
  sitesThisWeek: number;
  fallbackRate: number;
  aiCallsToday: number;
  aiCostToday: number;
  imagesThisWeek: number;
  /** Every zip served in the last 30 days, anonymous ones included. */
  downloads30d: number;
  anonymousDownloads30d: number;
  /** Of those, the ones the customizer built. Absent from an older Worker. */
  customizedDownloads30d?: number;
  /** The week's most downloaded templates, original and customized together. */
  topDownloads7d?: { slug: string; n: number }[];
  /** Times the customizer was opened on a template, last 30 days. */
  customizerSessions30d: number;
  newAccounts30d: number;
  /** Of those, the accounts whose edits were saved through the save gate. */
  newAccountsFromSave30d: number;
  /** Saved customizations, across all accounts. */
  savedTemplates: number;
  saveGates30d: number;
  /** Absent from a Worker older than the chart: read as no sign-ups. */
  signupsByDay?: { day: string; n: number }[];
};

/** The last fourteen UTC days, oldest first, each with its count or zero. */
function fortnight(signups: { day: string; n: number }[] = []) {
  const counts = new Map(signups.map((row) => [row.day, row.n]));
  const today = new Date();

  return Array.from({ length: 14 }, (_, offset) => {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (13 - offset)));
    const key = date.toISOString().slice(0, 10);

    return {
      key,
      label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      short: String(date.getUTCDate()),
      n: counts.get(key) ?? 0,
    };
  });
}

function GrowthChart({ signups }: { signups?: { day: string; n: number }[] }) {
  const days = fortnight(signups);
  const total = days.reduce((sum, entry) => sum + entry.n, 0);
  const peak = Math.max(1, ...days.map((entry) => entry.n));

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHead}>
        <div>
          <h2 className={styles.h3}>User growth</h2>
          <p className={styles.cardSub}>New accounts by day, last 14 days (UTC)</p>
        </div>
        <span className={styles.badge}>
          {total === 1 ? '+1 user' : `+${total} users`}
        </span>
      </div>
      <div className={styles.bars} role="img" aria-label={`New accounts per day: ${days.map((entry) => `${entry.label} ${entry.n}`).join(', ')}`}>
        {days.map((entry) => (
          <div key={entry.key} className={styles.barCol}>
            <div
              className={`${styles.bar} ${entry.n === 0 ? styles.barEmpty : ''}`}
              style={{ height: `${Math.round((entry.n / peak) * 100)}%` }}
              title={`${entry.label}: ${entry.n}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.barLabels} aria-hidden="true">
        {/* A space between labels keeps the row fourteen numbers rather than
            one long one, to a screen reader or a text query; flex draws
            nothing for it. */}
        {days.map((entry, index) => (
          <span key={entry.key} className={styles.barLabel}>
            {index > 0 ? ' ' : ''}
            {entry.short}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The week's most downloaded templates, each a link to its live page. */
function TopDownloads({ rows = [] }: { rows?: { slug: string; n: number }[] }) {
  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHead}>
        <div>
          <h2 className={styles.h3}>Most downloaded</h2>
          <p className={styles.cardSub}>Templates by downloads, original and customized, last 7 days</p>
        </div>
        <Link href="/admin/downloads/" prefetch={false} className={styles.pill}>
          Every template <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className={styles.quiet}>No downloads this week.</p>
      ) : (
        <ol className={styles.topList}>
          {rows.map((row) => (
            <li key={row.slug} className={styles.topRow}>
              <a href={`/templates/${row.slug}/site/`} className={styles.topSlug}>
                {row.slug}
              </a>
              <span className={styles.topCount}>{row.n.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function OverviewPanel() {
  const { data, error } = useAdminData<Overview>('/api/admin/overview');

  if (!data) return <Load error={error} />;

  // The 14 October design's four, which measure what dropping the sign-in
  // did: downloads with no account, customizer sessions, the accounts made
  // (and how many began at the save gate), and what was saved. The
  // endpoint's other figures (generations, sites, fallbacks, AI calls and
  // cost) are Studio's, and the AI usage and Generations pages carry them.
  const fromSave = data.newAccounts30d
    ? Math.round((data.newAccountsFromSave30d / data.newAccounts30d) * 100)
    : 0;
  const stats: { label: string; value: string; note: string; dark?: boolean }[] = [
    {
      label: 'Downloads',
      value: data.downloads30d.toLocaleString(),
      note: `Last 30 days, ${data.anonymousDownloads30d.toLocaleString()} with no account${
        data.customizedDownloads30d === undefined ? '' : `, ${data.customizedDownloads30d.toLocaleString()} customized`
      }`,
    },
    {
      label: 'Customizer sessions',
      value: data.customizerSessions30d.toLocaleString(),
      note: `Last 30 days, ${data.saveGates30d.toLocaleString()} asked to save`,
    },
    {
      label: 'New accounts',
      value: data.newAccounts30d.toLocaleString(),
      note: data.newAccounts30d ? `Last 30 days, ${fromSave}% started from a save` : 'Last 30 days',
    },
    { label: 'Saved templates', value: data.savedTemplates.toLocaleString(), note: 'Across all accounts', dark: true },
  ];

  return (
    <>
      <ul className={styles.stats}>
        {stats.map((stat) => (
          <li key={stat.label} className={`${styles.stat} ${stat.dark ? styles.statDark : ''}`}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statNote}>{stat.note}</p>
          </li>
        ))}
      </ul>

      <GrowthChart signups={data.signupsByDay} />

      <TopDownloads rows={data.topDownloads7d} />

      <div className={styles.sectionHead}>
        <h2 className={styles.h2}>Recent users</h2>
        <Link href="/admin/users/" prefetch={false} className={styles.pill}>
          All users <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <UsersDirectory pageSize={8} compact />
    </>
  );
}

// ---- users ------------------------------------------------------------------

export type UserRow = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string | null;
  banned: boolean | null;
  createdAt: string;
  /** 'free' for everyone during the beta; the Worker says so (lib/users.ts). */
  plan?: string;
  /** Made by the Test users page, on the reserved domain. */
  test?: boolean;
  /** Saved customizations. */
  sites: number;
  generations: number;
  /** Template zips this account took while signed in. */
  downloads: number;
};

/** "free" as the directory prints it. */
export const planLabel = (plan = 'free') => plan.charAt(0).toUpperCase() + plan.slice(1);

/** The name, and what is worth knowing at a glance beside it. */
export function PersonName({ row, self }: { row: UserRow; self: boolean }) {
  return (
    <div className={styles.nameRow}>
      <p className={styles.personName}>{row.name || row.email}</p>
      {self ? <span className={styles.tag}>You</span> : null}
      {row.role === 'admin' ? <span className={styles.tag}>Admin</span> : null}
      {row.test ? <span className={`${styles.tag} ${styles.tagTest}`}>Test</span> : null}
      {/* What the Status column used to say, where the eye already is. */}
      {!row.emailVerified ? <span className={styles.tag}>Unverified</span> : null}
      {row.banned ? <span className={`${styles.tag} ${styles.tagBanned}`}>Banned</span> : null}
    </div>
  );
}

const FILTERS = ['All users', 'Active', 'Has saved', 'Banned', 'Admins', 'Unverified'] as const;
type Filter = (typeof FILTERS)[number];

const matchesFilter = (row: UserRow, filter: Filter) =>
  filter === 'All users'
    ? true
    : filter === 'Has saved'
      ? row.sites > 0
      : filter === 'Active'
      ? !row.banned && row.emailVerified
      : filter === 'Banned'
        ? Boolean(row.banned)
        : filter === 'Admins'
          ? row.role === 'admin'
          : !row.emailVerified;

/**
 * The directory: search goes to the API (it is what knows every row), the
 * filter and the pages are the browser's over what came back. There is no
 * Status column: a ban or a missing verification is a badge by the name.
 * The overview shows the first handful of it; the users page all of it.
 */
function UsersDirectory({ pageSize = 10, compact = false }: { pageSize?: number; compact?: boolean }) {
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All users');
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const { user: me } = useSessionUser();
  const { data, error, reload } = useAdminData<{ users: UserRow[] }>(
    `/api/admin/users?q=${encodeURIComponent(query)}&limit=${compact ? pageSize : 200}`
  );

  const rows = useMemo(() => (data?.users ?? []).filter((row) => matchesFilter(row, filter)), [data, filter]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const slice = rows.slice(start, start + pageSize);

  return (
    <>
      {compact ? null : (
        <div className={styles.sectionHead} style={{ marginTop: 0 }}>
          <p className={styles.quiet} style={{ margin: 0 }}>
            {data ? (rows.length === 1 ? '1 user' : `${rows.length} users`) : '...'}
          </p>
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.pill}
              onClick={() => {
                setFilter(FILTERS[(FILTERS.indexOf(filter) + 1) % FILTERS.length]);
                setPage(0);
              }}
              aria-label={`Showing ${filter.toLowerCase()}. Next filter`}
            >
              <span>{filter}</span>
              <ChevronDown className={styles.pillGlyph} size={14} aria-hidden="true" />
            </button>
            <form
              className={styles.search}
              onSubmit={(event) => {
                event.preventDefault();
                setQuery(draft.trim());
                setPage(0);
              }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="oklch(0.55 0.01 260)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4 4" />
              </svg>
              <input
                type="search"
                placeholder="Search users"
                aria-label="Search users by email or name"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </form>
          </div>
        </div>
      )}

      {message ? (
        <p className={styles.error} role="alert">
          {message}
        </p>
      ) : null}

      <div className={`${styles.panel} ${styles.scroll}`}>
        <div className={`${styles.tableHead} ${styles.userCols}`} aria-hidden="true">
          <div>User</div>
          <div>Account</div>
          <div>Registered</div>
          {/* Two lines, so the column is as narrow as its figures. */}
          <div>
            Saved
            <br />
            templates
          </div>
          <div>Downloads</div>
          <div />
        </div>

        {!data ? (
          <p className={styles.empty}>{error ?? 'Loading...'}</p>
        ) : slice.length === 0 ? (
          <p className={styles.empty}>No users match this view.</p>
        ) : (
          slice.map((row) => (
            <div key={row.id} className={`${styles.row} ${styles.userCols}`}>
              <div className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(row.name, row.email)}
                </span>
                <div className={styles.personText}>
                  <PersonName row={row} self={row.id === me?.id} />
                  <Link href={`/admin/users/?id=${row.id}`} prefetch={false} className={styles.personEmail}>
                    {row.email}
                  </Link>
                </div>
              </div>
              <div className={styles.cell} data-label="Account">
                <span className={styles.plan}>{planLabel(row.plan)}</span>
              </div>
              <div className={`${styles.cell} ${styles.cellDim}`} data-label="Registered">{day(row.createdAt)}</div>
              <div className={styles.cell} data-label="Saved templates">{row.sites}</div>
              <div className={styles.cell} data-label="Downloads">{row.downloads}</div>
              <div className={styles.actions}>
                <UserActions row={row} self={row.id === me?.id} onChanged={reload} onError={setMessage} />
              </div>
            </div>
          ))
        )}
      </div>

      {compact || !data ? null : (
        <div className={styles.pager}>
          <p className={styles.quiet} style={{ margin: 0, fontSize: 13 }}>
            {rows.length ? `Showing ${start + 1}-${start + slice.length} of ${rows.length}` : 'Nothing to show'}
          </p>
          <div className={styles.pages}>
            <button type="button" className={styles.page} disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Previous page">
              <ArrowLeft size={14} aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.page} ${i === current ? styles.pageOn : ''}`}
                aria-current={i === current ? 'page' : undefined}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" className={styles.page} disabled={current >= pageCount - 1} onClick={() => setPage(current + 1)} aria-label="Next page">
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function UsersPanel() {
  return <UsersDirectory pageSize={8} />;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.h3}>{title}</h2>
      {children}
    </div>
  );
}

export function UserDetailPanel({ id }: { id: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const { user: me } = useSessionUser();
  const router = useRouter();
  const { data, error, reload } = useAdminData<{
    user: UserRow & { banReason: string | null; banExpires: string | null };
    sites: { id: string; slug: string; title: string; updatedAt: string }[];
    generations: { id: string; description: string; source: string; model: string; createdAt: string }[];
    usageToday: { endpoint: string; calls: number; cost: number; cap: number | null }[];
    downloads: number;
  }>(`/api/admin/users/${id}`);

  if (!data) return <Load error={error} />;

  return (
    <div className={styles.cards}>
      {message ? (
        <p className={styles.error} role="alert" style={{ margin: 0 }}>
          {message}
        </p>
      ) : null}
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.person}>
            <span className={styles.avatar} aria-hidden="true">
              {initials(data.user.name, data.user.email)}
            </span>
            <div className={styles.personText}>
              <PersonName row={data.user} self={data.user.id === me?.id} />
              <span className={styles.personEmail}>{data.user.email}</span>
            </div>
          </div>
          <UserActions
            row={data.user}
            self={data.user.id === me?.id}
            onChanged={reload}
            onRemoved={() => router.push('/admin/users/')}
            onError={setMessage}
          />
        </div>
        <p className={styles.quiet} style={{ marginTop: 16, marginBottom: 0 }}>
          Joined {when(data.user.createdAt)}, {planLabel(data.user.plan)} plan,{' '}
          {data.user.role === 'admin' ? 'admin' : 'member'}, {data.user.emailVerified ? 'verified' : 'unverified'}
          {data.user.banned ? `, banned${data.user.banReason ? `: ${data.user.banReason}` : ''}` : ''}.{' '}
          {data.sites.length === 1 ? '1 saved template' : `${data.sites.length} saved templates`},{' '}
          {data.downloads === 1 ? '1 download' : `${data.downloads} downloads`} while logged in.
        </p>
      </div>

      <Section title="Today">
        {data.usageToday.length === 0 ? (
          <p className={styles.quiet} style={{ margin: 0 }}>No AI calls today.</p>
        ) : (
          <ul className={styles.plain}>
            {data.usageToday.map((u) => (
              <li key={u.endpoint}>
                {u.endpoint}: {u.calls}
                {u.cap ? ` / ${u.cap}` : ''}, {money(u.cost)}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Saved templates">
        {data.sites.length === 0 ? (
          <p className={styles.quiet} style={{ margin: 0 }}>None.</p>
        ) : (
          <ul className={styles.plain}>
            {data.sites.map((s) => (
              <li key={s.id}>
                <Link href={`/studio/site/?id=${s.id}`} prefetch={false}>{s.title}</Link>, {s.slug}, {when(s.updatedAt)}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Generations">
        {data.generations.length === 0 ? (
          <p className={styles.quiet} style={{ margin: 0 }}>None.</p>
        ) : (
          <ul className={styles.plain}>
            {data.generations.map((g) => (
              <li key={g.id}>
                <Link href={`/admin/generations/?id=${g.id}`} prefetch={false}>{g.description.slice(0, 80)}</Link>, {g.source}, {when(g.createdAt)}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}

// ---- usage ------------------------------------------------------------------

export function UsagePanel() {
  const [days, setDays] = useState(14);
  const { data, error } = useAdminData<{
    days: number;
    byDay: { day: string; endpoint: string; calls: number; promptTokens: number; completionTokens: number; images: number; cost: number }[];
    topUsers: { userId: string; email: string; calls: number; cost: number }[];
  }>(`/api/admin/usage?days=${days}`);

  return (
    <>
      <div className={styles.toolbar} style={{ marginBottom: 18 }}>
        {[7, 14, 30, 90].map((n) => (
          <button key={n} type="button" className={`${styles.pill} ${n === days ? styles.pillOn : ''}`} onClick={() => setDays(n)}>
            {n} days
          </button>
        ))}
      </div>
      {!data ? (
        <Load error={error} />
      ) : (
        <>
          <div className={`${styles.panel} ${styles.scroll}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Endpoint</th>
                  <th>Calls</th>
                  <th>Prompt tokens</th>
                  <th>Output tokens</th>
                  <th>Images</th>
                  <th>Cost (est.)</th>
                </tr>
              </thead>
              <tbody>
                {data.byDay.map((r, i) => (
                  <tr key={i}>
                    <td>{r.day}</td>
                    <td>{r.endpoint}</td>
                    <td>{r.calls}</td>
                    <td>{r.promptTokens.toLocaleString()}</td>
                    <td>{r.completionTokens.toLocaleString()}</td>
                    <td>{r.images}</td>
                    <td>{money(r.cost)}</td>
                  </tr>
                ))}
                {data.byDay.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.empty}>Nothing in this window.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Top users</h2>
          </div>
          <div className={styles.card}>
            {data.topUsers.length === 0 ? (
              <p className={styles.quiet} style={{ margin: 0 }}>No AI calls in this window.</p>
            ) : (
              <ul className={styles.plain}>
                {data.topUsers.map((u) => (
                  <li key={u.userId}>
                    <Link href={`/admin/users/?id=${u.userId}`} prefetch={false}>{u.email}</Link>, {u.calls} calls, {money(u.cost)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
}

// ---- generations ------------------------------------------------------------

export function GenerationsPanel() {
  const { data, error } = useAdminData<{ generations: { id: string; userEmail: string; description: string; source: string; model: string; createdAt: string; sites: number }[] }>('/api/admin/generations?limit=100');
  if (!data) return <Load error={error} />;
  return (
    <div className={`${styles.panel} ${styles.scroll}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>When</th>
            <th>Who</th>
            <th>Description</th>
            <th>Source</th>
            <th>Model</th>
            <th>Sites</th>
          </tr>
        </thead>
        <tbody>
          {data.generations.map((g) => (
            <tr key={g.id}>
              <td>{when(g.createdAt)}</td>
              <td>{g.userEmail}</td>
              <td className={styles.wide}>
                <Link href={`/admin/generations/?id=${g.id}`} prefetch={false}>{g.description.slice(0, 90)}</Link>
              </td>
              <td>{g.source}</td>
              <td>{g.model}</td>
              <td>{g.sites}</td>
            </tr>
          ))}
          {data.generations.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>No generations yet.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export function GenerationDetailPanel({ id }: { id: string }) {
  const { data, error } = useAdminData<{ id: string; userEmail: string; description: string; source: string; model: string; responseId: string | null; createdAt: string; result: unknown; sites: { id: string; title: string; slug: string; revisions: number }[] }>(`/api/admin/generations/${id}`);
  if (!data) return <Load error={error} />;
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <p className={styles.quiet}>
          {data.userEmail}, {when(data.createdAt)}, {data.source}, {data.model}
          {data.responseId ? `, ${data.responseId}` : ''}
        </p>
        <p style={{ margin: '0 0 12px', font: '400 16px / 1.6 var(--a-sans)' }}>{data.description}</p>
        <p className={styles.quiet} style={{ margin: 0 }}>
          <Link href={`/studio/results/?g=${data.id}`} prefetch={false}>Open the results page</Link>
        </p>
      </div>
      <Section title="Sites made from it">
        {data.sites.length === 0 ? (
          <p className={styles.quiet} style={{ margin: 0 }}>None.</p>
        ) : (
          <ul className={styles.plain}>
            {data.sites.map((s) => (
              <li key={s.id}>
                <Link href={`/studio/site/?id=${s.id}`} prefetch={false}>{s.title}</Link>, {s.slug}, {s.revisions} revisions
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section title="Document">
        <pre className={styles.pre}>{JSON.stringify(data.result, null, 2)}</pre>
      </Section>
    </div>
  );
}

// ---- downloads --------------------------------------------------------------

type DownloadPeriod = '7' | '30' | '90' | 'all';

const PERIODS: [DownloadPeriod, string][] = [
  ['7', 'Last 7 days'],
  ['30', 'Last 30 days'],
  ['90', 'Last 90 days'],
  ['all', 'All time'],
];

type TemplateDownloads = {
  slug: string;
  name: string;
  /** Downloaded, but no longer in the catalog. */
  retired: boolean;
  downloads: number;
  /** Taken with no account. */
  guests: number;
  signedIn: number;
  html: number;
  react: number;
  /** Of `downloads`, the ones the customizer built. */
  customized: number;
  lastAt: string | null;
};

type Downloads = {
  period: DownloadPeriod;
  totals: {
    downloads: number;
    guests: number;
    signedIn: number;
    html: number;
    react: number;
    customized: number;
    customizedByGuests: number;
    /** Accounts that downloaded while signed in. */
    people: number;
    /** Templates downloaded at least once in the period. */
    templates: number;
  };
  /** How many days the chart covers: the period, or the last 90 for all time. */
  chartDays: number;
  byDay: { day: string; guests: number; signedIn: number }[];
  templates: TemplateDownloads[];
};

type SortKey = 'name' | 'downloads' | 'guests' | 'signedIn' | 'html' | 'react' | 'customized' | 'lastAt';

const COLUMNS: [SortKey, string][] = [
  ['name', 'Template'],
  ['downloads', 'Downloads'],
  ['guests', 'Guests'],
  ['signedIn', 'Signed in'],
  ['html', 'HTML'],
  ['react', 'React'],
  ['customized', 'Customized'],
  ['lastAt', 'Last download'],
];

const percent = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '0%');

/** The last `count` UTC days, oldest first, each with its two counts or zero. */
function downloadDays(rows: Downloads['byDay'], count: number) {
  const byDay = new Map(rows.map((row) => [row.day, row]));
  const today = new Date();

  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (count - 1 - offset)));
    const key = date.toISOString().slice(0, 10);
    const row = byDay.get(key);

    return {
      key,
      label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      guests: row?.guests ?? 0,
      signedIn: row?.signedIn ?? 0,
    };
  });
}

/** Downloads per day, each bar the guests' share under the signed-in one. */
function DownloadChart({ data }: { data: Downloads }) {
  const days = downloadDays(data.byDay, data.chartDays);
  const peak = Math.max(1, ...days.map((entry) => entry.guests + entry.signedIn));
  // A label every few bars, so a month or a quarter still reads.
  const every = Math.ceil(days.length / 15);

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHead}>
        <div>
          <h2 className={styles.h3}>Downloads by day</h2>
          <p className={styles.cardSub}>
            {data.period === 'all' ? 'The last 90 days' : `The last ${data.chartDays} days`} (UTC), guests and signed in
          </p>
        </div>
        <ul className={styles.legend} aria-hidden="true">
          <li>
            <span className={styles.swatchGuest} />
            Guests
          </li>
          <li>
            <span className={styles.swatchSigned} />
            Signed in
          </li>
        </ul>
      </div>
      <div
        className={`${styles.bars} ${days.length > 30 ? styles.barsDense : ''}`}
        role="img"
        aria-label={`Downloads per day: ${days
          .filter((entry) => entry.guests + entry.signedIn > 0)
          .map((entry) => `${entry.label} ${entry.guests} guests, ${entry.signedIn} signed in`)
          .join('; ') || 'none'}`}
      >
        {days.map((entry) => {
          const total = entry.guests + entry.signedIn;

          return (
            <div key={entry.key} className={styles.barCol} title={`${entry.label}: ${entry.guests} guests, ${entry.signedIn} signed in`}>
              {total === 0 ? (
                <div className={`${styles.bar} ${styles.barEmpty}`} />
              ) : (
                <div className={styles.barStack} style={{ height: `${Math.round((total / peak) * 100)}%` }}>
                  {entry.signedIn > 0 ? <div className={styles.barSigned} style={{ flexGrow: entry.signedIn }} /> : null}
                  {entry.guests > 0 ? <div className={styles.barGuest} style={{ flexGrow: entry.guests }} /> : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={`${styles.barLabels} ${days.length > 30 ? styles.barsDense : ''}`} aria-hidden="true">
        {days.map((entry, index) => (
          <span key={entry.key} className={styles.barLabel}>
            {index > 0 ? ' ' : ''}
            {index % every === 0 ? entry.label : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DownloadsPanel() {
  const [period, setPeriod] = useState<DownloadPeriod>('30');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({ key: 'downloads', descending: true });
  const { data, error } = useAdminData<Downloads>(`/api/admin/downloads?period=${period}`);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const value = (row: TemplateDownloads) => (sort.key === 'lastAt' ? row.lastAt ?? '' : row[sort.key]);

    return (data?.templates ?? [])
      .filter((row) => showAll || row.downloads > 0)
      .filter((row) => !needle || row.name.toLowerCase().includes(needle) || row.slug.includes(needle))
      .sort((a, b) => {
        const [x, y] = [value(a), value(b)];
        const order = typeof x === 'string' ? x.localeCompare(String(y)) : x - (y as number);
        // Ties fall back to the name, so the order is stable.
        return (sort.descending ? -order : order) || a.name.localeCompare(b.name);
      });
  }, [data, query, showAll, sort]);

  const label = PERIODS.find(([key]) => key === period)?.[1] ?? '';

  const exportRows = () => {
    const header = ['slug', 'name', 'downloads', 'guests', 'signed_in', 'html', 'react', 'customized', 'last_download'];
    const lines = rows.map((row) =>
      [row.slug, row.name, row.downloads, row.guests, row.signedIn, row.html, row.react, row.customized, row.lastAt ?? '']
        .map(cell)
        .join(',')
    );
    saveCsv(`tabbied-downloads-${period === 'all' ? 'all-time' : `${period}-days`}-${new Date().toISOString().slice(0, 10)}.csv`, [
      header.join(','),
      ...lines,
    ]);
  };

  return (
    <>
      <div className={styles.toolbar} role="group" aria-label="Period">
        {PERIODS.map(([key, name]) => (
          <button
            key={key}
            type="button"
            className={`${styles.pill} ${key === period ? styles.pillOn : ''}`}
            aria-pressed={key === period}
            onClick={() => setPeriod(key)}
          >
            {name}
          </button>
        ))}
      </div>

      {!data || data.period !== period ? (
        <Load error={error} />
      ) : (
        <>
          <ul className={styles.stats} style={{ marginTop: 22 }}>
            <li className={styles.stat}>
              <p className={styles.statLabel}>Downloads</p>
              <p className={styles.statValue}>{data.totals.downloads.toLocaleString()}</p>
              <p className={styles.statNote}>
                {label}, {data.totals.html.toLocaleString()} HTML and {data.totals.react.toLocaleString()} React, of{' '}
                {data.totals.templates.toLocaleString()} {data.totals.templates === 1 ? 'template' : 'templates'}
              </p>
            </li>
            <li className={styles.stat}>
              <p className={styles.statLabel}>Guests</p>
              <p className={styles.statValue}>{data.totals.guests.toLocaleString()}</p>
              <p className={styles.statNote}>
                {percent(data.totals.guests, data.totals.downloads)} of downloads, with no account
              </p>
            </li>
            <li className={styles.stat}>
              <p className={styles.statLabel}>Signed in</p>
              <p className={styles.statValue}>{data.totals.signedIn.toLocaleString()}</p>
              <p className={styles.statNote}>
                {percent(data.totals.signedIn, data.totals.downloads)} of downloads, by{' '}
                {data.totals.people === 1 ? '1 person' : `${data.totals.people.toLocaleString()} people`}
              </p>
            </li>
            <li className={`${styles.stat} ${styles.statDark}`}>
              <p className={styles.statLabel}>Customized</p>
              <p className={styles.statValue}>{data.totals.customized.toLocaleString()}</p>
              <p className={styles.statNote}>
                Built in the customizer, {data.totals.customizedByGuests.toLocaleString()} by guests
              </p>
            </li>
          </ul>

          <DownloadChart data={data} />

          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>By template</h2>
            <div className={styles.toolbar}>
              <button
                type="button"
                className={`${styles.pill} ${showAll ? styles.pillOn : ''}`}
                aria-pressed={showAll}
                onClick={() => setShowAll((value) => !value)}
              >
                Include templates with none
              </button>
              <button type="button" className={styles.pill} onClick={exportRows} disabled={rows.length === 0}>
                Export CSV
              </button>
              <label className={styles.search}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="oklch(0.55 0.01 260)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l4 4" />
                </svg>
                <input
                  type="search"
                  placeholder="Search templates"
                  aria-label="Search templates"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.scroll}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {COLUMNS.map(([key, name]) => {
                    const on = sort.key === key;

                    return (
                      <th
                        key={key}
                        aria-sort={on ? (sort.descending ? 'descending' : 'ascending') : 'none'}
                        className={key === 'name' ? undefined : styles.numeric}
                      >
                        <button
                          type="button"
                          className={styles.sortButton}
                          onClick={() =>
                            setSort((current) =>
                              current.key === key
                                ? { key, descending: !current.descending }
                                : // Figures read largest first, names from A.
                                  { key, descending: key !== 'name' }
                            )
                          }
                        >
                          {name}
                          {on ? <span aria-hidden="true">{sort.descending ? ' \u2193' : ' \u2191'}</span> : null}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length} className={styles.quiet}>
                      {query.trim() ? 'No template matches that search.' : `No downloads in this period.`}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.slug}>
                      <td>
                        {row.retired ? (
                          <span>{row.name} (retired)</span>
                        ) : (
                          <a href={`/templates/${row.slug}/site/`}>{row.name}</a>
                        )}
                      </td>
                      <td className={styles.numeric}>{row.downloads.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.guests.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.signedIn.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.html.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.react.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.customized.toLocaleString()}</td>
                      <td className={styles.numeric}>{row.lastAt ? when(row.lastAt) : '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// ---- templates, uploads, quotas, mail ---------------------------------------

export function TemplatesPanel() {
  const { data, error } = useAdminData<{ templates: { slug: string; name: string; copyRoles: string[]; slots: Record<string, number>; patterns: string[]; sites: number }[] }>('/api/admin/templates');
  if (!data) return <Load error={error} />;
  return (
    <div className={`${styles.panel} ${styles.scroll}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Template</th>
            <th>Sites</th>
            <th>Brand roles</th>
            <th>Text</th>
            <th>Images</th>
            <th>Patterns</th>
          </tr>
        </thead>
        <tbody>
          {data.templates.map((t) => (
            <tr key={t.slug}>
              <td>
                <Link href={`/templates/${t.slug}/site/`} prefetch={false}>{t.name}</Link>
              </td>
              <td>{t.sites}</td>
              <td>{t.copyRoles.length ? t.copyRoles.join(', ') : ' - '}</td>
              <td>{t.slots.text ?? 0}</td>
              <td>{t.slots.image ?? 0}</td>
              <td className={styles.wide}>{t.patterns.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UploadsPanel() {
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { data, error, reload } = useAdminData<{ uploads: { id: string; src: string; bytes: number; note: string | null; createdAt: string; userEmail: string }[] }>('/api/admin/uploads?limit=100');
  if (!data) return <Load error={error} />;
  if (data.uploads.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>No uploads.</p>
      </div>
    );
  }
  return (
    <>
    {message ? (
      <p className={styles.error} role="alert">
        {message}
      </p>
    ) : null}
    <ul className={styles.grid}>
      {data.uploads.map((u) => (
        <li key={u.id} className={styles.thumb}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={apiUrl(u.src)} alt={u.note ?? ''} />
          <div className={styles.thumbFoot}>
            <span className={styles.quiet} title={u.userEmail}>{u.userEmail}</span>
            <button
              type="button"
              className={styles.small}
              disabled={busy !== null}
              onClick={async () => {
                setBusy(u.id);
                setMessage(null);
                // A refused delete says why rather than reloading silently.
                try {
                  await apiFetch(`/api/admin/uploads/${u.id}`, { method: 'DELETE' });
                } catch (cause) {
                  setMessage(cause instanceof ApiError ? cause.message : 'Could not remove that picture.');
                } finally {
                  setBusy(null);
                }
                reload();
              }}
            >
              {busy === u.id ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
}

export function QuotasPanel() {
  const { data, error } = useAdminData<{ caps: Record<string, { calls: number; label: string }>; editable: boolean }>('/api/admin/quotas');
  if (!data) return <Load error={error} />;
  return (
    <>
      {/* Scrollable like the other tables: the cells do not wrap, so a
          phone would otherwise cut off the third column. */}
      <div className={`${styles.panel} ${styles.scroll}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Daily cap</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.caps).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v.calls}</td>
                <td>{v.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.card} ${styles.howTo}`}>
        <h2 className={styles.h3}>Changing a quota</h2>
        <p className={styles.quiet}>
          These are constants in the code rather than settings, so a change ships like any other code change. A
          settings table would be a database read on every request.
        </p>
        <ol className={styles.steps}>
          <li>
            Change the number where it is defined:
            <ul>
              <li>
                Daily AI caps (the table above): <code>DAILY_CAPS</code> in <code>worker/lib/quota.ts</code>.
              </li>
              <li>
                Burst limits (requests a minute): the <code>BURST</code> table at the top of{' '}
                <code>worker/routes/account.ts</code>, <code>sites.ts</code> and <code>studio.ts</code>.
              </li>
            </ul>
          </li>
          <li>
            Check it locally: <code>npm run test:worker</code>, then <code>npm run build</code>, which rebuilds the
            pages that print a number.
          </li>
          <li>
            Merge to main. The deploy rebuilds the site and the Worker, and the new numbers apply from the next
            request: no migration, and no stored data changes.
          </li>
        </ol>
      </div>
    </>
  );
}
