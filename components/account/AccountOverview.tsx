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
import { ArrowRight } from 'lucide-react';
import Toaster, { toaster } from 'components/Toaster';
import { ApiError, apiFetch } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import {
  FIRST_REQUEST_GRANT,
  FREE_TEMPLATES,
  customizeHref,
  isOpen,
  refreshMyTemplates,
  useMyTemplates,
  type ChosenTemplate,
  type MyTemplates,
} from 'lib/myTemplates';
import type { TemplateIndexEntry } from 'lib/templateIndex';
import DownloadMenu, { type DownloadMenuClasses } from 'components/template/DownloadMenu';
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

/** The Download menu in this module's shape; the menu itself is DownloadMenu's. */
const MENU: DownloadMenuClasses = {
  trigger: styles.download,
  caret: styles.caret,
  positioner: styles.positioner,
  menu: styles.menu,
  menuLabel: styles.menuLabel,
  menuItem: styles.menuItem,
  menuRule: styles.menuRule,
};

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
        <DownloadMenu name={name} chosen={row} side="bottom" classes={MENU} />
        <Link href={customizeHref(row.slug, row)} prefetch={false} className={shell.rowAction}>
          Customize <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** The answers the request forms offer; the Worker accepts only these. */
const ROLES = ['Freelancer', 'Agency', 'Business owner', 'Designer', 'Developer', 'Student', 'Other'];
const BUILDING = ['Client sites', 'My own business', 'Personal projects', 'School or learning'];
const SITES = ['1-2', '3-10', '10+'];
const NEED = ['5', '10', '20+'];
const PAY = ['Yes', 'Maybe', 'Not right now'];

/** One question answered by a row of chips, one of which may be chosen. */
function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className={styles.question}>
      <legend className={styles.questionLabel}>{label}</legend>
      <div className={styles.chipRow}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.chip}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * "Request more", in the two shapes the 24 September designs give it. A
 * first request is three quick questions, answered by an emailed link that
 * adds 5 (so it says "Get 5 more templates" and "Send request"); a later one
 * carries those answers forward (with an Edit) and asks how many, whether
 * the person would pay, a link and what they are for, and goes to the team
 * ("Send for review"). After sending, the dialog says which of the two
 * happens next.
 */
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
  const second = mine.firstUsed;
  const last = mine.request;
  const [role, setRole] = useState<string | null>(null);
  const [building, setBuilding] = useState<string | null>(null);
  const [sites, setSites] = useState<string | null>(null);
  const [editPrior, setEditPrior] = useState(false);
  const [need, setNeed] = useState<string | null>(null);
  const [pay, setPay] = useState<string | null>(null);
  const [fairPrice, setFairPrice] = useState('');
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  // A later request starts from the last one's answers.
  const prior = second && last?.role ? { role: last.role, building: last.building, sites: last.sites } : null;
  const showFirstFields = !prior || editPrior;
  const answers = {
    role: role ?? (showFirstFields ? null : prior?.role ?? null),
    building: building ?? (showFirstFields ? null : prior?.building ?? null),
    sites: sites ?? (showFirstFields ? null : prior?.sites ?? null),
  };
  const ready = second
    ? Boolean(need && pay && note.trim()) && (!showFirstFields || Boolean(answers.role && answers.building && answers.sites))
    : Boolean(answers.role && answers.building && answers.sites);

  const send = async () => {
    setBusy(true);

    try {
      const body: Record<string, string> = { note: note.trim() };
      if (answers.role) body.role = answers.role;
      if (answers.building) body.building = answers.building;
      if (answers.sites) body.sites = answers.sites;
      if (second) {
        body.need = need!;
        body.pay = pay!;
        if (fairPrice.trim()) body.fairPrice = fairPrice.trim();
        if (link.trim()) body.link = link.trim();
      }
      await apiFetch('/api/account/templates/request', { method: 'POST', body: JSON.stringify(body) });
      setSent(true);
      await refreshMyTemplates();
    } catch (cause) {
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not send that. Try again.' });
    } finally {
      setBusy(false);
    }
  };

  const title = sent ? 'Request received' : second ? 'Request more templates' : `Get ${FIRST_REQUEST_GRANT} more templates`;

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
          <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
          {sent ? (
            <>
              <div className={styles.sent}>
                <p className={styles.sentTitle}>{second ? 'Sent for review' : 'Check your inbox soon'}</p>
                <p className={styles.sentBody}>
                  {second
                    ? `This is your second request, so someone on our team will read it. We'll reply to ${email} within 2 business days.`
                    : `We'll email ${email} within about 5 minutes. Click the link in that email to add ${FIRST_REQUEST_GRANT} more templates to your account.`}
                </p>
              </div>
              <div className={styles.dialogActions}>
                <Dialog.Close className={styles.primary}>Done</Dialog.Close>
              </div>
            </>
          ) : (
            <>
              <Dialog.Description className={styles.dialogBody}>
                {second
                  ? `You've used your ${mine.total} templates. A person on our team reads every second request and replies within 2 business days.`
                  : `Answer three quick questions and we'll email you a link that adds ${FIRST_REQUEST_GRANT} more templates, usually within 5 minutes.`}
              </Dialog.Description>

              <div className={styles.form}>
                {prior && !editPrior ? (
                  <div className={styles.prior}>
                    <div>
                      <p className={styles.priorLabel}>From your last request</p>
                      <p className={styles.priorSummary}>
                        {[prior.role, prior.building, prior.sites ? `${prior.sites} sites in 3 months` : null]
                          .filter(Boolean)
                          .join(' \u00B7 ')}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={styles.priorEdit}
                      onClick={() => {
                        setRole(prior.role);
                        setBuilding(prior.building);
                        setSites(prior.sites);
                        setEditPrior(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : null}

                {showFirstFields ? (
                  <>
                    <Chips label="What best describes you?" options={ROLES} value={answers.role} onChange={setRole} />
                    <Chips label="What are you building?" options={BUILDING} value={answers.building} onChange={setBuilding} />
                    <Chips
                      label="How many sites do you expect to make in the next 3 months?"
                      options={SITES}
                      value={answers.sites}
                      onChange={setSites}
                    />
                  </>
                ) : null}

                {second ? (
                  <>
                    <Chips label="How many more do you need?" options={NEED} value={need} onChange={setNeed} />
                    <Chips label="Would you pay for more templates?" options={PAY} value={pay} onChange={setPay} />
                    {pay === 'Yes' || pay === 'Maybe' ? (
                      <input
                        className={styles.input}
                        value={fairPrice}
                        maxLength={120}
                        onChange={(event) => setFairPrice(event.target.value)}
                        placeholder="What would feel fair? (optional)"
                        aria-label="What would feel fair?"
                      />
                    ) : null}
                    <label className={styles.question}>
                      <span className={styles.questionLabel}>Link to your work (optional)</span>
                      <input
                        className={styles.input}
                        value={link}
                        maxLength={300}
                        onChange={(event) => setLink(event.target.value)}
                        placeholder="yourstudio.com"
                      />
                    </label>
                  </>
                ) : null}

                <label className={styles.question}>
                  <span className={styles.questionLabel}>
                    {second ? 'What would you use more templates for?' : 'Anything else we should know? (optional)'}
                  </span>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    maxLength={2000}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder={
                      second
                        ? 'The projects or clients you have lined up'
                        : 'A link to your work, or what would make Tabbied more useful'
                    }
                  />
                </label>
              </div>

              <div className={styles.dialogActions}>
                <Dialog.Close className={styles.secondary}>Cancel</Dialog.Close>
                <button type="button" className={styles.primary} onClick={send} disabled={busy || !ready}>
                  {second ? 'Send for review' : 'Send request'}
                </button>
              </div>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** What the row under a full table says, from where the person's request stands. */
function limitState(mine: MyTemplates, email: string, now: number) {
  const request = mine.request;

  if (request?.round === 1 && request.status === 'sent') {
    const due = request.sendAt ? new Date(request.sendAt).getTime() : 0;
    const lapsed = request.expiresAt ? new Date(request.expiresAt).getTime() < now : false;

    if (lapsed) {
      return {
        dot: 'wait' as const,
        title: 'Your link has expired',
        body: `Send a new one to ${email} and follow it within 7 days to add ${FIRST_REQUEST_GRANT} more templates.`,
        action: 'resend' as const,
      };
    }

    return due > now
      ? {
          dot: 'wait' as const,
          title: 'Request received',
          body: `Your email is on its way to ${email}. It usually arrives within 5 minutes.`,
          action: null,
        }
      : {
          dot: 'ok' as const,
          title: 'Request approved',
          body: `We sent a link to ${email}. Open it to add ${FIRST_REQUEST_GRANT} more templates.`,
          action: 'resend' as const,
        };
  }

  if (request?.status === 'pending') {
    return {
      dot: 'wait' as const,
      title: 'Request in review',
      body: `Our team is reviewing your request. We'll reply to ${email} within 2 business days.`,
      action: null,
    };
  }

  return mine.firstUsed
    ? {
        dot: null,
        title: `You've chosen all ${mine.total} templates`,
        body: 'Need more? Send a request and our team will review it personally.',
        action: 'request' as const,
      }
    : {
        dot: null,
        title: `You've chosen all ${mine.total} templates`,
        body: `Request ${FIRST_REQUEST_GRANT} more for free. It takes under a minute, and approval arrives by email.`,
        action: 'request' as const,
      };
}

/** "Kalla, Lucid, Motomo, Nectar, Ripple, +5 more": five names, then a count. */
function namesLine(names: string[]): string {
  return names.length > 5 ? `${names.slice(0, 5).join(', ')}, +${names.length - 5} more` : names.join(', ');
}

/** What following the emailed link came to, as the account page says it. */
const ACTIVATION_NOTES: Record<string, string> = {
  used: 'That link has already been used. Your templates are below.',
  expired: 'That link has expired. You can send yourself a new one below.',
  unknown: 'That link is no longer valid. If you asked for a new one, use the newest email.',
};

export default function AccountOverview({ index }: { index: TemplateIndexEntry[] }) {
  const templates = useMyTemplates();
  const { user } = useSessionUser();
  const [full, setFull] = useState(false);
  const [asking, setAsking] = useState(false);
  const [wantsRequest, setWantsRequest] = useState(false);
  // `?activated=5` after the emailed link worked, or why it did not.
  const [activated, setActivated] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  // The clock the limit row reads: a first request's email is "on its way"
  // until its send time, then "sent". Ticks while that wait is on screen.
  const [now, setNow] = useState(() => Date.now());
  const [tipOpen, setTipOpen] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const bySlug = new Map(index.map((entry) => [entry.slug, entry]));
  const mine = templates.status === 'ready' ? templates : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFull(params.get('templates') === 'full');
    setWantsRequest(params.get('request') === '1');
    setActivated(params.get('activated'));
  }, []);

  // `?request=1` (a gallery card's "Request more") opens the form once the
  // templates are read, and only when a request can be made: with one
  // already open, the row under the table says where it stands.
  useEffect(() => {
    if (!wantsRequest || !mine) return;
    setWantsRequest(false);
    if (mine.left === 0 && !isOpen(mine.request)) setAsking(true);
  }, [wantsRequest, mine]);

  const waitingOnEmail =
    mine?.request?.round === 1 && mine.request.status === 'sent' && mine.request.sendAt
      ? new Date(mine.request.sendAt).getTime()
      : 0;

  useEffect(() => {
    if (waitingOnEmail <= Date.now()) return;
    const timer = setTimeout(() => setNow(Date.now()), waitingOnEmail - Date.now() + 1000);
    return () => clearTimeout(timer);
  }, [waitingOnEmail, now]);

  const resend = async () => {
    setResending(true);

    try {
      await apiFetch('/api/account/templates/request/resend', { method: 'POST' });
      await refreshMyTemplates();
      setNow(Date.now());
      toaster.add({ title: `Sent again to ${user?.email ?? 'your inbox'}` });
    } catch (cause) {
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not send that. Try again.' });
    } finally {
      setResending(false);
    }
  };

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
      lede={`Choose ${FREE_TEMPLATES} website templates for free during beta. Once you choose one, you can change its colors and patterns and download it as often as you like.`}
    >
      {activated && /^\d+$/.test(activated) && dismissed !== activated ? (
        <div className={styles.added} role="status">
          <span className={styles.addedMark} aria-hidden="true">
            &#x2713;
          </span>
          <div className={styles.addedText}>
            <p className={styles.addedTitle}>{activated} more templates added</p>
            <p className={styles.addedBody}>
              You can now choose up to {total} templates. Everything you&apos;ve already customized stays as it is.
            </p>
          </div>
          <Link href="/templates" prefetch={false} className={styles.addedAction}>
            Choose a template
          </Link>
          <button type="button" className={styles.addedClose} aria-label="Dismiss" onClick={() => setDismissed(activated)}>
            &#xD7;
          </button>
        </div>
      ) : activated && ACTIVATION_NOTES[activated] ? (
        <p className={styles.notice} role="status">
          {ACTIVATION_NOTES[activated]}
        </p>
      ) : null}

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
                {names.length > 0 ? <p className={styles.gaugeNames}>{namesLine(names)}</p> : null}
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
              (() => {
                const state = limitState(mine, user?.email ?? 'your inbox', now);

                return (
                  <div className={styles.limit}>
                    <div className={styles.limitText}>
                      {state.dot ? (
                        <span className={state.dot === 'ok' ? styles.dotOk : styles.dotWait} aria-hidden="true" />
                      ) : null}
                      <div>
                        <p className={styles.limitTitle}>{state.title}</p>
                        <p className={styles.limitNote}>{state.body}</p>
                      </div>
                    </div>
                    {state.action === 'request' ? (
                      <button type="button" className={styles.primary} onClick={() => setAsking(true)}>
                        {mine.firstUsed ? 'Request more' : `Request ${FIRST_REQUEST_GRANT} more`}
                      </button>
                    ) : state.action === 'resend' ? (
                      <button type="button" className={styles.secondary} onClick={resend} disabled={resending}>
                        {resending ? 'Sending...' : 'Resend email'}
                      </button>
                    ) : null}
                  </div>
                );
              })()
            )}
          </>
        ) : null}
      </div>

      {/* Opened from the row's button or by ?request=1 from a gallery card.
          Keyed so a reopened form starts empty. */}
      {mine && mine.left === 0 ? (
        <RequestDialog
          key={String(asking)}
          open={asking}
          onOpenChange={setAsking}
          mine={mine}
          email={user?.email ?? 'you'}
        />
      ) : null}
      <Toaster />
    </AccountPage>
  );
}
