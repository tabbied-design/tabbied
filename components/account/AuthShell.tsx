import { Suspense } from 'react';
import Link from 'next/link';
import { Logo } from 'components/logo';
import AuthBackLink from './AuthBackLink';
import styles from './AuthShell.module.css';

// The frame around the five account forms: a bar with the way back and the
// lockup, and one card centered under it.
//
// A server component, deliberately. Only the back link and the form read the
// query string, each in its own Suspense boundary, so the bar and the card's
// frame are in the exported HTML. Reading `?next=` in the shell itself would
// bail the whole route out to client rendering, which paints the page blank
// until the bundle lands.

export default function AuthShell({
  children,
  className,
}: {
  children: React.ReactNode;
  /** The route's font variables - the eyebrow is the mono. */
  className?: string;
}) {
  return (
    <div className={[styles.shell, className].filter(Boolean).join(' ')}>
      <header className={styles.bar}>
        {/* The fallback holds the circle's place, so the bar does not reflow
            when the link arrives. */}
        <Suspense fallback={<span className={styles.back} aria-hidden="true" />}>
          <AuthBackLink />
        </Suspense>

        <Link href="/" prefetch={false} className={styles.home} aria-label="Tabbied home">
          <Logo />
        </Link>
      </header>

      <main className={styles.wrap}>
        <div className={styles.column}>{children}</div>
      </main>
    </div>
  );
}
