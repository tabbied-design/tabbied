'use client';

// The one ask for an account in the customizer, as the 14 October design
// draws it: a signed-out person who presses Save is offered a free account
// (or to log in) to keep their edits, and is told downloading never needs
// one. Either link stashes the draft first (lib/pendingSave.ts), so the edits
// survive the detour and are saved by the customizer when it is opened again
// with a session; "Not now" goes back to customizing.
import Link from 'next/link';
import { Dialog } from '@base-ui/react/dialog';
import styles from './SaveGate.module.css';

export default function SaveGate({
  open,
  onOpenChange,
  templateName,
  next,
  onLeave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
  /** Where the account forms send the person back to: this customizer. */
  next: string;
  /** Called as either link is followed, to stash the draft. */
  onLeave: () => void;
}) {
  const query = `next=${encodeURIComponent(next)}&intent=save`;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <p className={styles.eyebrow}>Save your edits</p>
          <Dialog.Title className={styles.title}>Create a free account to save {templateName}</Dialog.Title>
          <Dialog.Description className={styles.lede}>
            An account keeps your customized sites so you can come back and keep editing. Your current
            colors and patterns carry over. Downloading never needs an account.
          </Dialog.Description>
          <div className={styles.actions}>
            <Link href={`/sign-up?${query}`} prefetch={false} className={styles.primary} onClick={onLeave}>
              Create free account
            </Link>
            <Link href={`/sign-in?${query}`} prefetch={false} className={styles.secondary} onClick={onLeave}>
              Log in
            </Link>
          </div>
          <Dialog.Close className={styles.later}>Not now, keep customizing</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
