'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useSessionUser } from 'lib/authClient';
import { stopImpersonating } from 'lib/impersonation';
import styles from './ImpersonationNotice.module.css';

/**
 * While an admin is signed in as someone else (lib/impersonation.ts), a pill
 * in the corner of every page with a bar says whose account this is and how
 * to leave it. Fixed and portaled to the body, so it moves nothing: the bars
 * state their heights (CLAUDE.md, "The masthead"), and the dark one's
 * backdrop blur would otherwise make itself the pill's containing block.
 * Nothing renders until the session answers, so the prerender never has it.
 */
export default function ImpersonationNotice() {
  const { user, impersonating } = useSessionUser();
  const [leaving, setLeaving] = useState(false);

  if (!user || !impersonating) return null;

  return createPortal(
    <div className={styles.notice} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>
        Viewing as <strong>{user.email}</strong>
      </span>
      <button
        type="button"
        className={styles.stop}
        disabled={leaving}
        onClick={() => {
          setLeaving(true);
          stopImpersonating().catch(() => setLeaving(false));
        }}
      >
        {leaving ? 'Stopping...' : 'Stop impersonating'}
      </button>
    </div>,
    document.body
  );
}
