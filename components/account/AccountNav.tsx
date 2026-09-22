'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './account.module.css';

// Pictures and Usage are not listed for the first launch. Both exist only for
// the generation flow - the pictures are its references, and every cap in
// worker/lib/quota.ts is one of its endpoints - so with that flow held back they
// would report a feature nobody can reach. The routes still build and answer.
const LINKS = [
  ['/account/', 'Overview'],
  ['/account/sites/', 'Custom sites'],
  ['/account/downloads/', 'Downloads'],
  ['/account/settings/', 'Settings'],
] as const;

/** The account area's own navigation - one row under the masthead, current page marked. */
export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Account">
      {LINKS.map(([href, label]) => {
        const current = pathname === href || pathname === href.replace(/\/$/, '');
        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className={`${styles.navLink} ${current ? styles.navOn : ''}`}
            aria-current={current ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
