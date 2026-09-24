'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useSessionUser } from 'lib/authClient';
import AccountHeader from './AccountHeader';
import styles from './account.module.css';

/**
 * The frame every account page sits in: the light masthead, then an eyebrow,
 * a title and the page. There is no sub-navigation: the overview is the
 * account, and a page beyond it (settings, sites) carries one link back to
 * it, as the 2026 designs draw it. It waits for the session and
 * turns a signed-out visitor away with a link. Shared so the five pages
 * differ only in their body.
 *
 * A static export has no server-side route protection and needs none: the
 * page renders a signed-out state client-side, and the *data* is protected
 * at the API, which is the only place protection is ever real.
 */
export default function AccountPage({
  eyebrow = 'Account',
  title,
  badge,
  lede,
  action,
  back = true,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** A pill on the title's baseline - the plan the account is on. */
  badge?: string;
  lede?: ReactNode;
  /** Something to do, beside the title - the "+ New Studio request" pill. */
  action?: { href: string; label: string };
  /** The link back to the overview; the overview itself has none. */
  back?: boolean;
  children: ReactNode;
}) {
  const { user, isPending } = useSessionUser();

  return (
    <>
      <AccountHeader />
      <div className={styles.shell}>
        {isPending ? (
          <div className={styles.gate}>
            <p className={styles.quiet}>Checking your session...</p>
          </div>
        ) : !user ? (
          <div className={styles.gate}>
            <p className={styles.eyebrow}>Account</p>
            <h1 className={styles.title}>You're signed out</h1>
            <p className={styles.lede}>
              Signing in is only needed to generate with AI. Patterns, templates
              and library matches are open to everyone.{' '}
              <Link href="/sign-in?next=%2Faccount">Sign in</Link> or{' '}
              <Link href="/sign-up">create an account</Link>.
            </p>
          </div>
        ) : (
          <>
            {back ? (
              <Link href="/account/" prefetch={false} className={styles.backLink}>
                &#x2190; Account overview
              </Link>
            ) : null}
            <div className={styles.head}>
              <div>
                <p className={styles.eyebrow}>{eyebrow}</p>
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{title}</h1>
                  {badge ? <span className={styles.badge}>{badge}</span> : null}
                </div>
                {lede ? <p className={styles.lede}>{lede}</p> : null}
              </div>
              {action ? (
                <Link href={action.href} prefetch={false} className={styles.cta}>
                  {action.label}
                </Link>
              ) : null}
            </div>
            {children}
          </>
        )}
      </div>
    </>
  );
}
