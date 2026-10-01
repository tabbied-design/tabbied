'use client';

import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Menu } from '@base-ui/react/menu';
import { Ban, Ellipsis, LayoutTemplate, Trash2, VenetianMask } from 'lucide-react';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { authClient } from 'lib/authClient';
import { plexSans } from 'lib/fonts';
import { startImpersonating } from 'lib/impersonation';
import TemplatesDialog from './TemplatesDialog';
import styles from './admin.module.css';

// The last cell of a row in the users directory and the test users list: an
// ellipsis opening what can be done to the account. Impersonate and Ban are
// better-auth's own endpoints; Remove is /api/admin/users/:id, which takes
// the person's pictures out of R2 too. The Worker refuses what this greys out
// (yourself, another admin, a banned account's session), so the reasons shown
// here are the Worker's, said before the click rather than after it.

export type AccountRow = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
};

/** Why an action is not offered on this row, or null when it is. */
function refusal(row: AccountRow, self: boolean) {
  if (self) return { impersonate: 'This is you.', ban: 'This is you.', remove: 'This is you.' };

  const admin = row.role === 'admin';

  return {
    impersonate: admin ? 'Admins cannot be impersonated.' : row.banned ? 'Unban the account to sign in as it.' : null,
    ban: null,
    remove: admin ? 'Admins are not removed from here.' : null,
  };
}

const message = (cause: unknown) =>
  cause instanceof ApiError || cause instanceof Error ? cause.message : 'That did not work.';

export default function UserActions({
  row,
  self,
  onChanged,
  onRemoved = onChanged,
  onError,
  profileLink = true,
}: {
  /** The templates dialog links to the person's page; not from that page. */
  profileLink?: boolean;
  row: AccountRow;
  /** The row is the admin looking at it. */
  self: boolean;
  /** Something changed on the server: reload the list. */
  onChanged: () => void;
  /** The account is gone; a page about it alone leaves rather than reloads. */
  onRemoved?: () => void;
  /** Say it above the list (null clears it). */
  onError: (message: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [managing, setManaging] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const why = refusal(row, self);
  const who = row.name || row.email;
  const notes = [...new Set([why.impersonate, why.ban, why.remove].filter(Boolean))];

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    onError(null);
    try {
      await action();
    } catch (cause) {
      onError(message(cause));
    } finally {
      setBusy(false);
    }
  };

  const toggleBan = () =>
    run(async () => {
      const result = row.banned
        ? await authClient.admin.unbanUser({ userId: row.id })
        : await authClient.admin.banUser({ userId: row.id, banReason: 'Banned from the admin page' });

      if (result.error) throw new Error(result.error.message ?? 'That did not work.');
      onChanged();
    });

  const remove = async () => {
    setBusy(true);
    setRemoveError(null);
    try {
      await apiFetch(`/api/admin/users/${row.id}`, { method: 'DELETE' });
      setConfirming(false);
      onRemoved();
    } catch (cause) {
      setRemoveError(message(cause));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Menu.Root>
        <Menu.Trigger className={styles.rowMenuTrigger} aria-label={`Actions for ${who}`} disabled={busy}>
          <Ellipsis size={18} aria-hidden="true" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className={styles.rowMenuPositioner} side="bottom" align="end" sideOffset={6}>
            <Menu.Popup className={`${styles.rowMenu} ${plexSans.variable}`}>
              <Menu.Item
                className={styles.rowMenuItem}
                disabled={why.impersonate !== null}
                onClick={() => void run(() => startImpersonating(row.id))}
              >
                <VenetianMask size={15} aria-hidden="true" />
                Impersonate
              </Menu.Item>
              <Menu.Item className={styles.rowMenuItem} disabled={why.ban !== null} onClick={() => void toggleBan()}>
                <Ban size={15} aria-hidden="true" />
                {row.banned ? 'Unban' : 'Ban'}
              </Menu.Item>
              <Menu.Item className={styles.rowMenuItem} onClick={() => setManaging(true)}>
                <LayoutTemplate size={15} aria-hidden="true" />
                Manage templates
              </Menu.Item>
              <Menu.Separator className={styles.rowMenuRule} />
              <Menu.Item
                className={`${styles.rowMenuItem} ${styles.rowMenuDanger}`}
                disabled={why.remove !== null}
                onClick={() => {
                  setRemoveError(null);
                  setConfirming(true);
                }}
              >
                <Trash2 size={15} aria-hidden="true" />
                Remove
              </Menu.Item>
              {notes.length > 0 ? <p className={styles.rowMenuNote}>{notes.join(' ')}</p> : null}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <TemplatesDialog person={row} open={managing} onOpenChange={setManaging} onChanged={onChanged} profileLink={profileLink} />

      <Dialog.Root open={confirming} onOpenChange={(open) => (busy ? null : setConfirming(open))}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.dialogBackdrop} />
          <Dialog.Popup className={`${styles.dialog} ${plexSans.variable}`}>
            <Dialog.Title className={styles.dialogTitle}>Remove {who}?</Dialog.Title>
            <Dialog.Description className={styles.dialogBody}>
              This deletes {row.email} for good: the sign-in, the chosen templates, customized sites, requests and
              uploaded pictures. It cannot be undone. The address can sign up again afterwards.
            </Dialog.Description>
            {removeError ? (
              <p className={styles.error} role="alert">
                {removeError}
              </p>
            ) : null}
            <div className={styles.dialogActions}>
              <Dialog.Close className={styles.dialogCancel} disabled={busy}>
                Cancel
              </Dialog.Close>
              <button type="button" className={styles.dialogDanger} disabled={busy} onClick={() => void remove()}>
                {busy ? 'Removing...' : 'Remove account'}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
