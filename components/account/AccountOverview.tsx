'use client';

// The account's front page: the templates a person has chosen.
//
// During the beta every account chooses five website templates, and once a
// template is chosen its colors and patterns can be changed and it can be
// downloaded as often as the person likes (worker/lib/templates.ts). So the
// page is that: a ring counting the chosen against the allowance, the AI
// card beside it ("Not yet available", every AI cap belongs to an endpoint
// nothing links to), and a table of the chosen templates, each with its
// Download menu (the customized version when there is a saved site, and the
// original in both formats) and the way into the customizer. Below the rows
// is either the empty slot, leading to the gallery, or, at the limit, the
// one "Request more" message the beta allows.
//
// Two query parameters arrive from elsewhere and are read after mount (a
// search param read during render bails the static route out):
// `?templates=full`, where the Worker sends a download click it refused,
// and `?request=1`, the choose dialog's "Request more".
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui-components/react/dialog';
import { Menu } from '@base-ui-components/react/menu';
import { ArrowRight } from 'lucide-react';
import Toaster, { toaster } from 'components/Toaster';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import {
  FREE_TEMPLATES,
  customizeHref,
  refreshMyTemplates,
  useMyTemplates,
  type ChosenTemplate,
  type MyTemplates,
} from 'lib/myTemplates';
import { downloadCustomisedSite } from 'lib/studioDownload';
import type { TemplateIndexEntry } from 'lib/templateIndex';
import AccountPage from './AccountPage';
import shell from './account.module.css';
import styles from './AccountOverview.module.css';

/** "Sep 22", or "Sep 22, 2025" outside this year. */
function day(value: string | Date): string {
  const date = new Date(value);

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() === new Date().getFullYear() ? {} : { year: 'numeric' }),
  });
}

/**
 * The artboard's ring: a track and an arc over it, rotated a quarter turn so
 * the arc starts at twelve. The dash array is the arc's length against the
 * rest of the circumference, so a full allowance closes the ring exactly.
 */
function Gauge({ used, total }: { used: number; total: number }) {
  const r = 41;
  const circumference = 2 * Math.PI * r;
  const arc = total > 0 ? Math.min(1, used / total) * circumference : 0;

  return (
    <div className={styles.gauge}>
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r={r} fill="none" stroke="oklch(0 0 0 / 0.09)" strokeWidth="9" />
        {arc > 0 ? (
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="#0e0e13"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference - arc}`}
          />
        ) : null}
      </svg>
      <span className={styles.gaugeValue}>{used}</span>
    </div>
  );
}

/**
 * A small tile in the template's own colors: its ground under a motif in
 * its first ink. Which motif is a function of the slug, so a template keeps
 * its tile; the artboard drew the same four.
 */
function Thumb({ entry }: { entry: TemplateIndexEntry | undefined }) {
  const ground = entry?.colors[0] ?? '#f4f4f3';
  const ink = entry?.colors[1] ?? '#0e0e13';
  const soft = `color-mix(in oklab, ${ink} 55%, ${ground})`;
  const motif = [...(entry?.slug ?? '')].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 4;
  const image = [
    `repeating-radial-gradient(circle at 20% 118%, ${soft} 0 1px, transparent 1px 9px)`,
    `repeating-linear-gradient(-45deg, ${soft} 0 5px, transparent 5px 14px)`,
    `radial-gradient(${soft} 1.5px, transparent 1.7px) 0 0 / 12px 12px`,
    `repeating-linear-gradient(0deg, ${soft} 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, ${soft} 0 1px, transparent 1px 16px)`,
  ][motif];

  return <span className={styles.thumb} style={{ background: `${image}, ${ground}` }} aria-hidden="true" />;
}

async function saveCustomised(siteId: string) {
  try {
    toaster.add({ title: 'Preparing your customized download...' });
    await downloadCustomisedSite(siteId);
  } catch (cause) {
    toaster.add({ title: cause instanceof Error ? cause.message : 'Could not build the download.' });
  }
}

/** One chosen template: its name and kind, when it was customized and added, and what to do with it. */
function TemplateRow({ row, entry }: { row: ChosenTemplate; entry: TemplateIndexEntry | undefined }) {
  const name = entry?.name ?? row.slug;

  return (
    <div className={`${shell.row} ${styles.columns}`}>
      <div className={styles.templateCell}>
        <Thumb entry={entry} />
        <div className={styles.templateText}>
          <Link href={`/templates/${row.slug}/`} prefetch={false} className={shell.rowTitle}>
            {name}
          </Link>
          <p className={shell.rowMeta}>
            {entry?.topic ?? 'Template'}
            <span className={styles.narrowOnly}>
              {' '}
              &#xB7; {row.site ? `Customized ${day(row.site.updatedAt)}` : 'Not customized yet'}
            </span>
          </p>
        </div>
      </div>
      <p className={`${styles.date} ${row.site ? '' : styles.dateQuiet}`}>
        {row.site ? day(row.site.updatedAt) : 'Not yet'}
      </p>
      <p className={styles.date}>{day(row.chosenAt)}</p>
      <div className={styles.rowActions}>
        <Menu.Root>
          <Menu.Trigger className={styles.download}>
            Download <span className={styles.caret} aria-hidden="true">&#x25BE;</span>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner side="bottom" align="end" sideOffset={8} className={styles.positioner}>
              <Menu.Popup className={styles.menu}>
                {row.site ? (
                  <>
                    <Menu.Group>
                      <Menu.GroupLabel className={styles.menuLabel}>Your customized version</Menu.GroupLabel>
                      <Menu.Item className={styles.menuItem} onClick={() => saveCustomised(row.site!.id)}>
                        HTML &amp; CSS
                      </Menu.Item>
                    </Menu.Group>
                    <Menu.Separator className={styles.menuRule} />
                  </>
                ) : null}
                <Menu.Group>
                  <Menu.GroupLabel className={styles.menuLabel}>
                    {row.site ? `Original ${name}` : `${name} (original)`}
                  </Menu.GroupLabel>
                  <Menu.Item className={styles.menuItem} render={<a href={`/downloads/${row.slug}-html.zip`} download />}>
                    HTML &amp; CSS
                  </Menu.Item>
                  <Menu.Item className={styles.menuItem} render={<a href={`/downloads/${row.slug}-react.zip`} download />}>
                    React project
                  </Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
        <Link href={customizeHref(row.slug, row)} prefetch={false} className={shell.rowAction}>
          Customize <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** "Request more": the one message the beta allows, in a dialog. */
function RequestDialog({
  open,
  onOpenChange,
  mine,
  email,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mine: MyTemplates;
  email: string;
}) {
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const sent = mine.request !== null;

  const send = async () => {
    setBusy(true);

    try {
      await apiFetch('/api/account/templates/request', { method: 'POST', body: JSON.stringify({ note }) });
      await refreshMyTemplates();
    } catch (cause) {
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not send that. Try again.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.dialog}>
          <Dialog.Close className={styles.dialogClose} aria-label="Close">
            &#xD7;
          </Dialog.Close>
          <p className={styles.dialogCount}>
            {mine.used} of {mine.total} chosen &#xB7; {mine.left} left
          </p>
          <Dialog.Title className={styles.dialogTitle}>Need more templates?</Dialog.Title>
          {sent ? (
            <>
              <div className={styles.sent}>
                <p className={styles.sentTitle}>
                  {mine.request!.status === 'granted'
                    ? `Granted: ${mine.request!.granted} more`
                    : mine.request!.status === 'declined'
                      ? 'We could not add more this time'
                      : 'Message sent'}
                </p>
                <p className={styles.sentBody}>
                  {mine.request!.status === 'pending'
                    ? `We'll reply to ${email} within a few days. You can send one message during beta.`
                    : 'You can send one message during beta, and we have answered yours by email.'}
                </p>
              </div>
              <div className={styles.dialogActions}>
                <Dialog.Close className={styles.primary}>Done</Dialog.Close>
              </div>
            </>
          ) : (
            <>
              <Dialog.Description className={styles.dialogBody}>
                You&apos;ve chosen all {mine.total} templates. Tell us what you&apos;re building and what
                you&apos;d need from Tabbied, and we&apos;ll reply by email.
              </Dialog.Description>
              <textarea
                className={styles.textarea}
                rows={4}
                maxLength={2000}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Your projects, how you use Tabbied, what would help"
                aria-label="Your message"
              />
              <div className={styles.dialogActions}>
                <Dialog.Close className={styles.secondary}>Cancel</Dialog.Close>
                <button type="button" className={styles.primary} onClick={send} disabled={busy || !note.trim()}>
                  Send
                </button>
              </div>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function AccountOverview({ index }: { index: TemplateIndexEntry[] }) {
  const templates = useMyTemplates();
  const { user } = useSessionUser();
  const [full, setFull] = useState(false);
  const [asking, setAsking] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const bySlug = new Map(index.map((entry) => [entry.slug, entry]));
  const mine = templates.status === 'ready' ? templates : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFull(params.get('templates') === 'full');
    setAsking(params.get('request') === '1');
  }, []);

  const used = mine?.used ?? 0;
  const total = mine?.total ?? FREE_TEMPLATES;
  const left = mine?.left ?? FREE_TEMPLATES;
  const names = mine?.chosen.map((row) => bySlug.get(row.slug)?.name ?? row.slug) ?? [];
  const tip = 'A template counts once, the first time you customize or download it. After that, downloads are unlimited.';

  return (
    <AccountPage
      eyebrow="Account overview"
      title="Your templates"
      back={false}
      badge="Free beta"
      lede={`Choose ${total} website templates for free during beta. Once you choose one, you can change its colors and patterns and download it as often as you like.`}
    >
      {full && mine && mine.left === 0 ? (
        <p className={styles.notice} role="status">
          You have chosen all {total} of your templates. Keep customizing and downloading those,
          or ask for more below.
        </p>
      ) : null}

      {/* One bordered box split in two, as the artboard draws it: the ring on
          paper counting the chosen templates, and the AI card in ink. */}
      <div className={styles.cards}>
        <div className={styles.gaugeCard}>
          {mine ? (
            <>
              <Gauge used={used} total={total} />
              <div>
                <div className={styles.gaugeLabel}>
                  Templates chosen
                  <span className={styles.tipWrap}>
                    <button
                      type="button"
                      className={styles.tipButton}
                      aria-label="How templates are counted"
                      aria-expanded={tipOpen}
                      onClick={() => setTipOpen((open) => !open)}
                      onBlur={() => setTipOpen(false)}
                    >
                      i
                    </button>
                    {tipOpen ? (
                      <span className={styles.tip} role="tooltip">
                        {tip}
                      </span>
                    ) : null}
                  </span>
                </div>
                <p className={styles.gaugeCount}>
                  {used} of {total} chosen &#xB7; {left} left
                </p>
                {names.length > 0 ? <p className={styles.gaugeNames}>{names.join(', ')}</p> : null}
              </div>
            </>
          ) : (
            <p className={shell.quiet}>
              {templates.status === 'error' ? 'Your templates are not available right now.' : 'Reading your templates...'}
            </p>
          )}
        </div>

        <div className={styles.dark}>
          <div className={styles.darkHead}>
            <p className={styles.cardLabel}>AI usage</p>
            <span className={styles.notYet}>Not yet available</span>
          </div>
          <p className={styles.creditsLabel}>AI credits: words and pictures</p>
          <div className={styles.creditsTrack} aria-hidden="true" />
          <p className={styles.darkNote}>
            Generating custom images and copy with AI is coming in a later release.
          </p>
        </div>
      </div>

      <div className={styles.recentsHead}>
        <div className={styles.recentsTitle}>
          <h2 className={shell.h2}>Chosen templates</h2>
          <span className={styles.count}>
            {used} of {total}
          </span>
        </div>
        {left > 0 ? (
          <Link href="/templates" prefetch={false} className={shell.cta}>
            Browse templates
          </Link>
        ) : null}
      </div>

      <div className={shell.panel}>
        <div className={`${styles.head} ${styles.columns}`} aria-hidden="true">
          <span>Template</span>
          <span>Customized</span>
          <span>Added</span>
          <span />
        </div>

        {templates.status === 'loading' ? (
          [0, 1].map((i) => (
            <div key={i} className={`${shell.row} ${styles.columns}`} aria-hidden="true">
              <div className={styles.skeleton} style={{ width: '60%' }} />
              <div className={styles.skeleton} style={{ width: '50%' }} />
              <div className={styles.skeleton} style={{ width: '50%' }} />
              <div />
            </div>
          ))
        ) : templates.status === 'error' ? (
          <p className={shell.empty}>Could not load your templates right now.</p>
        ) : mine ? (
          <>
            {mine.chosen.map((row) => (
              <TemplateRow key={row.slug} row={row} entry={bySlug.get(row.slug)} />
            ))}
            {mine.left > 0 ? (
              <Link href="/templates" prefetch={false} className={styles.slot}>
                <span className={styles.slotPlus} aria-hidden="true">
                  +
                </span>
                <span>
                  <span className={styles.slotTitle}>
                    {mine.left === 1 ? '1 template left' : `${mine.left} templates left`}
                  </span>
                  <span className={styles.slotNote}>
                    Choose {mine.left === 1 ? 'it' : 'them'} from the template library
                  </span>
                </span>
              </Link>
            ) : (
              <div className={styles.limit}>
                <div>
                  <p className={styles.limitTitle}>You&apos;ve chosen all {mine.total} templates</p>
                  <p className={styles.limitNote}>Keep customizing and downloading these as often as you like.</p>
                </div>
                <button type="button" className={styles.primary} onClick={() => setAsking(true)}>
                  {mine.request ? 'Message sent' : 'Request more'}
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>

      {mine && mine.left === 0 ? (
        <RequestDialog open={asking} onOpenChange={setAsking} mine={mine} email={user?.email ?? 'you'} />
      ) : null}
      <Toaster />
    </AccountPage>
  );
}
