'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FlaskConical,
  Gauge,
  Images,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
  MailOpen,
  Sparkles,
  Users,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from 'components/logo';
import { initials } from 'components/nav';
import { plexMono, plexSans } from 'lib/fonts';
import { apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import { stopImpersonating } from 'lib/impersonation';
import styles from './admin.module.css';

// The admin frame: a sidebar naming the sections, a topbar with the one
// action that spans them, and the page. The role check here decides only
// what to *render*; every /api/admin route reads the role itself and answers
// 404 to anyone else, so a person who defeats this sees an empty page and
// nothing more.

// Quotas is last and says it is read-only: its numbers are constants in the
// code, changed by a commit (the page says how), not from here.
const LINKS: [href: string, label: string, Icon: LucideIcon, readOnly?: boolean][] = [
  ['/admin/', 'Overview', LayoutDashboard],
  ['/admin/users/', 'Users', Users],
  ['/admin/test-users/', 'Test users', FlaskConical],
  ['/admin/requests/', 'Requests', Inbox],
  ['/admin/usage/', 'AI usage', Sparkles],
  ['/admin/generations/', 'Generations', WandSparkles],
  ['/admin/templates/', 'Templates', LayoutTemplate],
  ['/admin/uploads/', 'Uploads', Images],
  ['/admin/emails/', 'Email preview', MailOpen],
  ['/admin/quotas/', 'Quotas', Gauge, true],
];

type UserRow = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string | null;
  banned: boolean | null;
  createdAt: string;
  plan?: string;
  sites: number;
  generations: number;
  chosen: number;
  allowance: number;
};

/**
 * A CSV cell: quoted when it has to be, doubled quotes inside. Names and
 * addresses are what people typed, and a spreadsheet runs a cell that starts
 * like a formula (`=HYPERLINK(...)`, `@SUM`, `+cmd|...`) when the file is
 * opened; a leading apostrophe is how every spreadsheet is told "text". A
 * carriage return breaks a row as surely as a newline, so it quotes too.
 */
const cell = (value: unknown) => {
  const raw = value === null || value === undefined ? '' : String(value);
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** The most the directory answers in one call; the file says when it hit it. */
const EXPORT_PAGE = 200;

/**
 * Every user the directory can list, as a file. Built here rather than by the
 * API because the API already answers the same rows as JSON, and one more
 * representation of them is not worth one more route to gate.
 */
async function exportUsers() {
  const { users } = await apiFetch<{ users: UserRow[] }>(`/api/admin/users?limit=${EXPORT_PAGE}`);
  const header = ['id', 'name', 'email', 'verified', 'plan', 'role', 'banned', 'joined', 'templates_chosen', 'template_allowance', 'sites', 'generations'];
  const lines = users.map((user) =>
    [
      user.id,
      user.name,
      user.email,
      user.emailVerified,
      user.plan ?? 'free',
      user.role ?? 'user',
      Boolean(user.banned),
      user.createdAt,
      user.chosen,
      user.allowance,
      user.sites,
      user.generations,
    ]
      .map(cell)
      .join(',')
  );
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  // A directory past the page size is a partial file, and the name says so
  // rather than leaving it to be discovered against the users page's count.
  const scope = users.length >= EXPORT_PAGE ? `-first-${EXPORT_PAGE}` : '';
  anchor.download = `tabbied-users-${new Date().toISOString().slice(0, 10)}${scope}.csv`;
  anchor.click();
  // Revoking synchronously has cancelled the download in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export default function AdminPage({
  eyebrow = 'Admin',
  title,
  lede,
  ledeSpace,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  /** The gap under the lede, where a page's design sets its own (34px by default). */
  ledeSpace?: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { user, isPending, impersonating } = useSessionUser();
  const [exporting, setExporting] = useState<'busy' | 'failed' | null>(null);
  const [leaving, setLeaving] = useState(false);

  if (isPending) {
    return (
      <div className={styles.wrap}>
        <p className={styles.quiet}>Checking your session...</p>
      </div>
    );
  }

  // An admin looking through someone's account has, for now, their access:
  // none. The way back is here as well as in the corner pill, since this is
  // where an admin comes looking for it.
  if (user && impersonating) {
    return (
      <div className={`${styles.wrap} ${plexSans.variable}`}>
        <h1 className={styles.title}>You are viewing as {user.email}</h1>
        <p className={styles.quiet}>The admin pages come back when you stop impersonating.</p>
        <button
          type="button"
          className={styles.button}
          disabled={leaving}
          onClick={() => {
            setLeaving(true);
            stopImpersonating().catch(() => setLeaving(false));
          }}
        >
          {leaving ? 'Stopping...' : 'Stop impersonating'}
        </button>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Not found</h1>
        <p className={styles.quiet}>
          <Link href="/">Home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.shell} ${plexMono.variable} ${plexSans.variable}`}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo} aria-label="Tabbied home" prefetch={false}>
          <Logo gap={11} />
        </Link>

        <nav className={styles.nav} aria-label="Admin">
          {LINKS.map(([href, label, Icon, readOnly]) => {
            const current = pathname === href || pathname === href.replace(/\/$/, '');
            return (
              <Link
                key={href}
                href={href}
                prefetch={false}
                className={`${styles.navLink} ${current ? styles.navOn : ''}`}
                aria-current={current ? 'page' : undefined}
              >
                <Icon className={styles.navIcon} size={17} strokeWidth={1.75} aria-hidden="true" />
                {label}
                {readOnly ? (
                  <span className={styles.navTag}>
                    <Lock size={11} strokeWidth={2} aria-hidden="true" />
                    Read-only
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sideFoot}>
          <span className={styles.sideAvatar} aria-hidden="true">
            {initials(user.name, user.email)}
          </span>
          <div>
            <p className={styles.sideName}>{user.name}</p>
            <p className={styles.sideRole}>Administrator</p>
          </div>
        </div>
      </aside>

      <div className={styles.mainCol}>
        <div className={styles.topbar}>
          <span className={styles.topbarTitle}>Tabbied Admin</span>
          <button
            type="button"
            className={styles.button}
            disabled={exporting === 'busy'}
            onClick={() => {
              setExporting('busy');
              exportUsers()
                .then(() => setExporting(null))
                .catch(() => setExporting('failed'));
            }}
          >
            {exporting === 'busy'
              ? 'Exporting...'
              : exporting === 'failed'
                ? 'Export failed - try again'
                : 'Export users'}
          </button>
        </div>

        <main className={styles.main}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {lede ? (
            <p className={styles.lede} style={ledeSpace === undefined ? undefined : { marginBottom: ledeSpace }}>
              {lede}
            </p>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
