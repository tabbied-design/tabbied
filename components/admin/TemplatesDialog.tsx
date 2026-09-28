'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui-components/react/dialog';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { plexMono, plexSans } from 'lib/fonts';
import { useAdminData } from './useAdminData';
import styles from './admin.module.css';

// A person's templates, as an admin handles them: take chosen ones back (some,
// or all of them) and add to the limit without a request. Taking one back also
// deletes the person's sites made on it, pictures included, and says so before
// it happens; adding can email them. Every rule is the Worker's
// (/api/admin/users/:id/templates/remove and /grants); this is the form.

type Person = { id: string; name: string; email: string };

type Detail = {
  sites: { id: string; slug: string; title: string }[];
  templates: {
    used: number;
    total: number;
    left: number;
    chosen: { slug: string; createdAt: string }[];
    grants: { id: string; granted: number; note: string; grantedBy: string | null; createdAt: string }[];
  };
};

/** The most one grant adds; the Worker holds the same number. */
const MAX_GRANT = 20;

const day = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** A list read aloud: "a", "a and b", "a, b and c". */
const listed = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

const failure = (cause: unknown) => (cause instanceof ApiError ? cause.message : 'That did not work.');

function Body({
  person,
  profileLink,
  onChanged,
  onClose,
}: {
  person: Person;
  profileLink: boolean;
  onChanged: () => void;
  onClose: () => void;
}) {
  const { data, error, reload } = useAdminData<Detail>(`/api/admin/users/${person.id}`);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState<'selected' | 'all' | null>(null);
  const [amount, setAmount] = useState(5);
  const [note, setNote] = useState('');
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  if (!data) return <p className={styles.quiet}>{error ?? 'Loading...'}</p>;

  const { templates } = data;
  const sitesOn = (slug: string) => data.sites.filter((row) => row.slug === slug).length;
  const targets = confirming === 'all' ? templates.chosen.map((row) => row.slug) : [...selected];
  const sitesGoing = targets.reduce((sum, slug) => sum + sitesOn(slug), 0);

  const act = async (work: () => Promise<string>) => {
    setBusy(true);
    setMessage(null);
    try {
      setMessage({ ok: true, text: await work() });
      reload();
      onChanged();
    } catch (cause) {
      setMessage({ ok: false, text: failure(cause) });
    } finally {
      setBusy(false);
    }
  };

  const remove = () =>
    act(async () => {
      const body = confirming === 'all' ? { all: true } : { slugs: targets };
      const answer = await apiFetch<{ removed: string[]; sitesDeleted: number }>(
        `/api/admin/users/${person.id}/templates/remove`,
        { method: 'POST', body: JSON.stringify(body) }
      );
      setSelected(new Set());
      setConfirming(null);
      return `Removed ${plural(answer.removed.length, 'template')}${answer.sitesDeleted ? ` and ${plural(answer.sitesDeleted, 'customized site')}` : ''}.`;
    });

  const grant = () =>
    act(async () => {
      const answer = await apiFetch<{ total: number; mailed: boolean | null }>(`/api/admin/users/${person.id}/grants`, {
        method: 'POST',
        body: JSON.stringify({ granted: amount, note, notify }),
      });
      setNote('');
      const mailed = answer.mailed === false ? ` The email to ${person.email} did not send.` : answer.mailed ? ` ${person.email} has been told.` : '';
      return `Added ${plural(amount, 'template')}. They can now choose ${answer.total}.${mailed}`;
    });

  const takeBack = (id: string, granted: number) =>
    act(async () => {
      const answer = await apiFetch<{ total: number }>(`/api/admin/users/${person.id}/grants/${id}`, { method: 'DELETE' });
      return `Took back ${plural(granted, 'template')}. They can now choose ${answer.total}.`;
    });

  const toggle = (slug: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <>
      <p className={styles.dialogBody} style={{ marginBottom: 18 }}>
        {templates.used} of {templates.total} chosen, {templates.left} left.
      </p>

      {message ? (
        <p className={message.ok ? styles.ok : styles.error} role="status">
          {message.text}
        </p>
      ) : null}

      <h3 className={styles.dialogSection}>Chosen templates</h3>
      {templates.chosen.length === 0 ? (
        <p className={styles.quiet}>Nothing chosen yet.</p>
      ) : (
        <ul className={styles.tplList}>
          {templates.chosen.map((row) => {
            const sites = sitesOn(row.slug);
            return (
              <li key={row.slug}>
                <label className={styles.tplRow}>
                  <input
                    type="checkbox"
                    checked={selected.has(row.slug)}
                    disabled={busy || confirming !== null}
                    onChange={() => toggle(row.slug)}
                  />
                  <span className={styles.tplName}>{row.slug}</span>
                  <span className={styles.tplMeta}>
                    chosen {day(row.createdAt)}
                    {sites ? `, ${plural(sites, 'customized site')}` : ''}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {confirming ? (
        <div className={styles.confirmBox} role="alert">
          <p>
            Remove {confirming === 'all' ? `all ${plural(targets.length, 'template')}` : listed(targets)} from {person.email}?
            {sitesGoing
              ? ` This also deletes ${plural(sitesGoing, 'customized site')} made on ${targets.length === 1 ? 'it' : 'them'}, pictures included.`
              : ''}{' '}
            It cannot be undone.
          </p>
          <div className={styles.dialogActions}>
            <button type="button" className={styles.dialogCancel} disabled={busy} onClick={() => setConfirming(null)}>
              Cancel
            </button>
            <button type="button" className={styles.dialogDanger} disabled={busy} onClick={() => void remove()}>
              {busy ? 'Removing...' : confirming === 'all' ? 'Reset all' : `Remove ${plural(targets.length, 'template')}`}
            </button>
          </div>
        </div>
      ) : templates.chosen.length > 0 ? (
        <div className={styles.dialogActions} style={{ justifyContent: 'flex-start' }}>
          <button
            type="button"
            className={styles.dialogCancel}
            disabled={busy || selected.size === 0}
            onClick={() => setConfirming('selected')}
          >
            Remove selected{selected.size ? ` (${selected.size})` : ''}
          </button>
          <button type="button" className={styles.dialogCancel} disabled={busy} onClick={() => setConfirming('all')}>
            Reset all
          </button>
        </div>
      ) : null}

      <div className={styles.dialogRule} />

      <h3 className={styles.dialogSection}>Add to their limit</h3>
      <div className={styles.grantRow}>
        <div className={styles.stepper}>
          <button type="button" aria-label="One fewer" disabled={busy || amount <= 1} onClick={() => setAmount(amount - 1)}>
            &#x2212;
          </button>
          <span aria-live="polite">{amount}</span>
          <button type="button" aria-label="One more" disabled={busy || amount >= MAX_GRANT} onClick={() => setAmount(amount + 1)}>
            +
          </button>
        </div>
        <input
          className={`${styles.input} ${styles.grantNote}`}
          type="text"
          placeholder="Note for admins (optional)"
          aria-label="Note for admins"
          maxLength={500}
          value={note}
          disabled={busy}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>
      <label className={styles.checkRow}>
        <input type="checkbox" checked={notify} disabled={busy} onChange={(event) => setNotify(event.target.checked)} />
        Email {person.email}
      </label>
      <button type="button" className={styles.button} disabled={busy} onClick={() => void grant()}>
        Add {plural(amount, 'template')}
      </button>

      {templates.grants.length > 0 ? (
        <>
          <h3 className={styles.dialogSection} style={{ marginTop: 22 }}>
            Added by admins
          </h3>
          <ul className={styles.tplList}>
            {templates.grants.map((row) => (
              <li key={row.id} className={styles.grantItem}>
                <span>
                  +{row.granted} on {day(row.createdAt)}
                  {row.grantedBy ? ` by ${row.grantedBy}` : ''}
                  {row.note ? <span className={styles.tplMeta}> &#xB7; {row.note}</span> : null}
                </span>
                <button type="button" className={styles.undo} disabled={busy} onClick={() => void takeBack(row.id, row.granted)}>
                  Take back
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className={styles.dialogActions} style={{ marginTop: 24 }}>
        {profileLink ? (
          <Link href={`/admin/users/?id=${person.id}`} prefetch={false} className={styles.dialogLink}>
            Full profile
          </Link>
        ) : null}
        <button type="button" className={styles.dialogCancel} onClick={onClose}>
          Done
        </button>
      </div>
    </>
  );
}

export default function TemplatesDialog({
  person,
  open,
  onOpenChange,
  onChanged,
  profileLink = true,
}: {
  person: Person;
  open: boolean;
  /** Offer the way to the person's page; not when this is that page. */
  profileLink?: boolean;
  onOpenChange: (open: boolean) => void;
  /** Something changed on the server: the page behind reloads. */
  onChanged: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.dialogBackdrop} />
        {/* Portaled outside the shell, so it declares both faces it reads. */}
        <Dialog.Popup className={`${styles.dialog} ${styles.dialogWide} ${plexMono.variable} ${plexSans.variable}`}>
          <Dialog.Title className={styles.dialogTitle}>Templates for {person.name || person.email}</Dialog.Title>
          {/* Mounted only while open, so its read is fresh each time. */}
          {open ? (
            <Body person={person} profileLink={profileLink} onChanged={onChanged} onClose={() => onOpenChange(false)} />
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
