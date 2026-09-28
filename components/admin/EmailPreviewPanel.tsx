'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { useAdminData } from './useAdminData';
import styles from './admin.module.css';

// Every message the Worker sends, as GET /api/admin/emails builds it: by the
// functions in worker/lib/mail.ts that send it, from sample data. An HTML
// message is drawn in a frame of its own, so neither page's styles reach the
// other; a text-only one is drawn as a mail client shows plain text.

type Email = {
  key: string;
  name: string;
  to: 'person' | 'team';
  when: string;
  subject: string;
  text: string;
  html: string | null;
};

type Preview = {
  provider: 'resend' | 'dev-mail' | 'none';
  /** The admin asking: the only address a test copy goes to. */
  to: string;
  emails: Email[];
};

/**
 * An HTML message in a sandboxed frame, grown to the message's own height on
 * load so each shows whole. Scripts stay off (mail clients run none);
 * same-origin is on only so the frame's height can be read.
 */
function MailFrame({ title, html }: { title: string; html: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(560);

  return (
    <iframe
      ref={frame}
      title={title}
      srcDoc={html}
      sandbox="allow-same-origin"
      className={styles.mailFrame}
      style={{ height }}
      onLoad={() => {
        const doc = frame.current?.contentDocument;
        if (doc) setHeight(doc.documentElement.scrollHeight + 2);
      }}
    />
  );
}

type Status = { kind: 'idle' | 'sending' } | { kind: 'sent' | 'failed'; message: string };

function SendTest({ preview }: { preview: Preview }) {
  const [key, setKey] = useState(preview.emails[0]?.key ?? '');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const off = preview.provider === 'none';

  const send = async () => {
    setStatus({ kind: 'sending' });
    try {
      await apiFetch('/api/admin/emails/test', { method: 'POST', body: JSON.stringify({ key }) });
      const name = preview.emails.find((email) => email.key === key)?.name ?? 'The email';
      setStatus({
        kind: 'sent',
        message:
          preview.provider === 'dev-mail'
            ? `${name} was written to the dev mailbox for ${preview.to}.`
            : `${name} is on its way to ${preview.to}.`,
      });
    } catch (cause) {
      setStatus({ kind: 'failed', message: cause instanceof ApiError ? cause.message : 'Could not reach the server.' });
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.h3}>Send a live test</h2>
      <p className={styles.cardSub}>Delivers the real message to your own inbox, to check how a mail client draws it.</p>
      <div className={styles.formRow}>
        <select
          className={styles.select}
          aria-label="Email to send"
          value={key}
          disabled={off || status.kind === 'sending'}
          onChange={(event) => setKey(event.target.value)}
        >
          {preview.emails.map((email) => (
            <option key={email.key} value={email.key}>
              {email.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonIcon}`}
          disabled={off || status.kind === 'sending'}
          onClick={() => void send()}
        >
          <Send size={15} aria-hidden="true" />
          {status.kind === 'sending' ? 'Sending...' : 'Send test email'}
        </button>
      </div>
      {status.kind === 'sent' || status.kind === 'failed' ? (
        <p className={status.kind === 'sent' ? styles.ok : styles.error} role="status" style={{ marginTop: 16, marginBottom: 0 }}>
          {status.message}
        </p>
      ) : null}
      <p className={styles.footnote}>
        {off ? (
          <>Sending is not configured here: RESEND_API_KEY is not set.</>
        ) : preview.provider === 'dev-mail' ? (
          <>
            No RESEND_API_KEY in this environment, so a test copy is written to the{' '}
            <Link href="/admin/mail/" prefetch={false}>
              dev mailbox
            </Link>{' '}
            instead of sent.
          </>
        ) : (
          <>
            Sent only to your own address, {preview.to}, with a sample link that confirms, resets and grants nothing.
          </>
        )}
      </p>
    </div>
  );
}

export default function EmailPreviewPanel() {
  const { data, error } = useAdminData<Preview>('/api/admin/emails');

  if (!data) return <p className={styles.quiet}>{error ?? 'Loading...'}</p>;

  return (
    <div className={styles.cards}>
      <SendTest preview={data} />

      {data.emails.map((email) => (
        <section key={email.key} className={styles.card} aria-labelledby={`mail-${email.key}`}>
          <div className={styles.cardHead}>
            <div>
              <h2 className={styles.h3} id={`mail-${email.key}`}>
                {email.name}
              </h2>
              <p className={styles.cardSub}>
                <strong className={styles.subjectLabel}>Subject:</strong> {email.subject}
              </p>
            </div>
            <span className={styles.badge}>{email.html ? 'HTML and text' : 'Plain text'}</span>
          </div>
          <p className={styles.mailMeta}>
            To {email.to === 'team' ? 'the team, replying to the person' : 'the person'} &#xB7; {email.when}
          </p>

          <div className={styles.mailStage}>
            {email.html ? (
              <MailFrame title={`${email.name} email`} html={email.html} />
            ) : (
              <pre className={styles.mailText}>{email.text}</pre>
            )}
          </div>

          {email.html ? (
            <details className={styles.mailDetails}>
              <summary>Plain-text version</summary>
              <pre className={styles.pre}>{email.text}</pre>
            </details>
          ) : null}
        </section>
      ))}
    </div>
  );
}
