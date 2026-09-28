'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import { PersonName, planLabel, type UserRow } from './panels';
import UserActions from './UserActions';
import { useAdminData } from './useAdminData';
import styles from './admin.module.css';

// Disposable accounts for trying what a member sees. The Worker makes them
// (POST /api/admin/test-users), verified and only on the reserved domain, one
// per call because each one hashes its password with scrypt in plain JS; this
// page loops and says how far it got. The password is shown once, here, since
// only its hash is kept.

/** The most one press makes. */
const MAX_BATCH = 10;

/** Base-36 characters from the CSPRNG: the password is a live sign-in. */
function randomSlug(length: number) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)), (byte) => (byte % 36).toString(36)).join('');
}

const day = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

export default function TestUsersPanel() {
  const { user: me } = useSessionUser();
  const { data, error, reload } = useAdminData<{ testDomain: string; users: UserRow[] }>(
    '/api/admin/users?scope=test&limit=200'
  );

  const [count, setCount] = useState(1);
  // Drawn after mount: a random default in the prerendered HTML would not
  // match the first client render, and a fixed one would be public in git.
  const [password, setPassword] = useState('');
  const [prefix, setPrefix] = useState('');
  const [progress, setProgress] = useState<number | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [made, setMade] = useState<{ emails: string[]; password: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [removeAll, setRemoveAll] = useState<'idle' | 'confirm' | 'busy'>('idle');

  useEffect(() => {
    setPassword((current) => current || `test-${randomSlug(8)}`);
  }, []);

  if (!data) return <p className={styles.quiet}>{error ?? 'Loading...'}</p>;

  const domain = data.testDomain;
  const creating = progress !== null;

  const create = async (event: FormEvent) => {
    event.preventDefault();
    if (creating) return;

    const secret = password.trim();

    if (secret.length < 8) {
      setCreateError('The password needs at least 8 characters.');
      return;
    }

    setCreateError(null);
    setCopied(false);

    const emails: string[] = [];

    for (let index = 0; index < count; index++) {
      setProgress(index + 1);
      try {
        const { user } = await apiFetch<{ user: { email: string } }>('/api/admin/test-users', {
          method: 'POST',
          body: JSON.stringify({ password: secret, prefix: count === 1 && prefix.trim() ? prefix.trim() : undefined }),
        });
        emails.push(user.email);
      } catch (cause) {
        const why = cause instanceof ApiError ? cause.message : 'Could not reach the server.';
        setCreateError(emails.length ? `Made ${emails.length} of ${count}, then: ${why}` : why);
        break;
      }
    }

    setProgress(null);

    if (emails.length > 0) {
      setMade({ emails, password: secret });
      setPrefix('');
      reload();
    }
  };

  const copy = async () => {
    if (!made) return;
    try {
      await navigator.clipboard.writeText(made.emails.map((email) => `${email}\t${made.password}`).join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // No clipboard permission: the text is on the page to select.
    }
  };

  const clearAll = async () => {
    setRemoveAll('busy');
    setMessage(null);
    try {
      await apiFetch('/api/admin/test-users', { method: 'DELETE' });
      setMade(null);
    } catch (cause) {
      setMessage(cause instanceof ApiError ? cause.message : 'Could not remove them.');
    }
    setRemoveAll('idle');
    reload();
  };

  return (
    <div className={styles.cards}>
      <form className={styles.card} onSubmit={(event) => void create(event)}>
        <h2 className={styles.h3}>Create test users</h2>
        <p className={styles.cardSub}>
          Made verified on a reserved @{domain} address: no confirmation email goes out, and nothing sent there
          arrives.
        </p>

        <div className={styles.formRow}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>How many</span>
            <input
              className={`${styles.input} ${styles.inputCount}`}
              type="number"
              min={1}
              max={MAX_BATCH}
              value={count}
              disabled={creating}
              onChange={(event) => setCount(Math.max(1, Math.min(MAX_BATCH, Number(event.target.value) || 1)))}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Password</span>
            <input
              className={`${styles.input} ${styles.inputMono}`}
              type="text"
              value={password}
              disabled={creating}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {count === 1 ? (
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                Email <span className={styles.fieldHint}>(optional)</span>
              </span>
              <span className={styles.emailField}>
                <input
                  className={`${styles.input} ${styles.inputMono}`}
                  type="text"
                  placeholder="test-abc12"
                  value={prefix}
                  disabled={creating}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(event) => setPrefix(event.target.value)}
                />
                <span className={styles.emailDomain}>@{domain}</span>
              </span>
            </label>
          ) : null}
          <button type="submit" className={`${styles.button} ${styles.buttonIcon}`} disabled={creating || !password}>
            <Plus size={16} aria-hidden="true" />
            {creating
              ? count > 1
                ? `Creating ${progress} of ${count}...`
                : 'Creating...'
              : count > 1
                ? `Create ${count} test users`
                : 'Create test user'}
          </button>
        </div>

        {createError ? (
          <p className={styles.error} role="alert" style={{ marginTop: 16, marginBottom: 0 }}>
            {createError}
          </p>
        ) : null}

        {made ? (
          <div className={styles.made}>
            <div className={styles.madeHead}>
              <p className={styles.madeTitle}>
                Made {made.emails.length === 1 ? '1 account' : `${made.emails.length} accounts`}. Keep the password:
                it is not shown again.
              </p>
              <button type="button" className={styles.small} onClick={() => void copy()}>
                {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}{' '}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className={styles.madeList}>
              {made.emails.map((email) => `${email}   ${made.password}`).join('\n')}
            </pre>
            <p className={styles.madeNote}>
              Sign in with these from a private window, or choose Impersonate below to see the site as one in this
              browser.
            </p>
          </div>
        ) : null}
      </form>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <h2 className={styles.h3}>Existing test users</h2>
            <p className={styles.cardSub}>
              {data.users.length === 1 ? '1 account' : `${data.users.length} accounts`} on @{domain}
            </p>
          </div>
          <div className={styles.toolbar}>
            {removeAll === 'confirm' ? (
              <>
                <span className={styles.cardSub}>Remove all {data.users.length}?</span>
                <button type="button" className={styles.dialogDanger} onClick={() => void clearAll()}>
                  Yes, remove all
                </button>
                <button type="button" className={styles.small} onClick={() => setRemoveAll('idle')}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {data.users.length > 0 ? (
                  <button
                    type="button"
                    className={`${styles.quietAction} ${styles.quietDanger}`}
                    disabled={removeAll === 'busy'}
                    onClick={() => setRemoveAll('confirm')}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                    {removeAll === 'busy' ? 'Removing...' : 'Remove all'}
                  </button>
                ) : null}
                <button type="button" className={styles.quietAction} onClick={reload}>
                  <RefreshCw size={15} aria-hidden="true" />
                  Refresh
                </button>
              </>
            )}
          </div>
        </div>

        {message ? (
          <p className={styles.error} role="alert" style={{ marginTop: 16 }}>
            {message}
          </p>
        ) : null}

        {data.users.length === 0 ? (
          <p className={styles.emptyCenter}>No test users yet. Create some above.</p>
        ) : (
          <div className={`${styles.scroll} ${styles.testTable}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Template quota</th>
                  <th>Created</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {data.users.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.testPerson}>
                      <PersonName row={row} self={row.id === me?.id} />
                      <span className={`${styles.personEmail} ${styles.mono}`}>{row.email}</span>
                    </td>
                    <td>
                      <span className={styles.plan}>{planLabel(row.plan)}</span>
                    </td>
                    <td>
                      {row.chosen} / {row.allowance}
                    </td>
                    <td className={styles.cellDim}>{day(row.createdAt)}</td>
                    <td className={styles.menuCell}>
                      <UserActions row={row} self={row.id === me?.id} onChanged={reload} onError={setMessage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className={styles.footnote}>
          Test users are ordinary accounts, told apart only by the reserved @{domain} domain, and safe to remove at
          any time. Every account is on the {planLabel()} plan during the beta, test users too, and each starts with the
          same template allowance as anyone. A ban or a removal reaches the Worker at once; a page already open as
          that account can take up to five minutes to notice (the session cookie cache).
        </p>
      </div>
    </div>
  );
}
