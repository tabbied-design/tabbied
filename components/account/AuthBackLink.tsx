'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { safeNext } from 'lib/safeNext';
import styles from './AuthShell.module.css';

// The way out of the account forms, on its own so that reading `?next=` costs
// only this button. It follows the same `?next=` the form returns to on
// success, so leaving and finishing land in the same place: a same-origin
// path only (lib/safeNext), else the homepage.

export default function AuthBackLink() {
  const back = safeNext(useSearchParams().get('next'), '/');

  return (
    <Link href={back} prefetch={false} className={styles.back} aria-label="Go back">
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5.5 8 12l6.5 6.5" />
      </svg>
    </Link>
  );
}
