'use client';

// The one confirmation before a template becomes one of a person's five.
//
// Every way to take a template that is not already the person's (Choose
// template on a card, Customize or a download from the preview's menu) asks
// first, because it spends one of a small number: the dialog says how many
// are chosen, what this one costs, and that after it the template is
// unlimited. At the limit it says so instead, names the ones that are
// chosen, and points at the account page, where "Request more" lives.
//
// The Worker is what enforces the rule (worker/lib/templates.ts); a person
// who skips this dialog, by opening a zip's URL, is held to the same five.
import { useCallback, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui-components/react/dialog';
import { toaster } from 'components/Toaster';
import { ApiError } from 'lib/apiFetch';
import {
  FREE_TEMPLATES,
  chooseTemplate,
  chosenOf,
  useMyTemplates,
  type MyTemplatesState,
} from 'lib/myTemplates';
import styles from './ChooseTemplate.module.css';

export type TemplateAction = 'choose' | 'customize' | 'download';

type Pending = { slug: string; name: string; action: TemplateAction; run: () => void };

const CTA: Record<TemplateAction, string> = {
  choose: 'Choose template',
  customize: 'Use template & customize',
  download: 'Use template & download',
};

const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? '' : 's'}`;

/** "Choosing Kalla uses 1 of your 3 remaining templates.", for a menu's header. */
export function choiceNote(templates: MyTemplatesState, slug: string, name: string): string {
  if (templates.status !== 'ready') return '';
  if (chosenOf(templates, slug)) return `${name} is already one of your templates. Download it as often as you like.`;
  if (templates.left === 0) return `You've chosen all ${templates.total} templates. ${name} isn't one of them.`;
  if (templates.left === 1) {
    return `Choosing ${name} uses your last template. After that, customize and download it as often as you like.`;
  }

  return `Choosing ${name} uses 1 of your ${templates.left} remaining templates.`;
}

/** The count and its bar: "4 of 5 templates chosen" over a track. */
export function TemplateUsage({ templates, tone = 'light' }: { templates: MyTemplatesState; tone?: 'light' | 'menu' }) {
  const used = templates.status === 'ready' ? templates.used : 0;
  const total = templates.status === 'ready' ? templates.total : FREE_TEMPLATES;
  const left = Math.max(0, total - used);

  return (
    <div className={tone === 'menu' ? styles.usageMenu : undefined}>
      <div className={styles.usageRow}>
        <span className={styles.usageLabel}>
          {used} of {total} templates chosen
        </span>
        <span className={styles.usageLeft}>{left} left</span>
      </div>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${Math.min(100, (used / Math.max(1, total)) * 100)}%` }} />
      </div>
    </div>
  );
}

/**
 * `guard(slug, name, action, run)` runs `run` at once for a template the
 * person has, and otherwise asks first; `dialog` is the element to render.
 * `names` turns the chosen slugs into the names the at-limit dialog lists.
 */
export function useTemplateGate(names: Readonly<Record<string, string>>): {
  guard: (slug: string, name: string, action: TemplateAction, run: () => void) => void;
  dialog: ReactNode;
  templates: MyTemplatesState;
} {
  const templates = useMyTemplates();
  const [pending, setPending] = useState<Pending | null>(null);
  const [busy, setBusy] = useState(false);

  const guard = useCallback(
    (slug: string, name: string, action: TemplateAction, run: () => void) => {
      if (chosenOf(templates, slug)) {
        run();
        return;
      }

      setPending({ slug, name, action, run });
    },
    [templates]
  );

  const confirm = async () => {
    if (!pending) return;
    setBusy(true);

    try {
      await chooseTemplate(pending.slug);
      setPending(null);
      if (pending.action === 'choose') {
        toaster.add({ title: `${pending.name} is now yours. Customize or download it any time.` });
      }
      pending.run();
    } catch (cause) {
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not choose that template.' });
    } finally {
      setBusy(false);
    }
  };

  const ready = templates.status === 'ready' ? templates : null;
  const left = ready?.left ?? FREE_TEMPLATES;
  const total = ready?.total ?? FREE_TEMPLATES;
  const name = pending?.name ?? '';
  const atLimit = ready !== null && left === 0;

  const dialog = (
    <Dialog.Root open={pending !== null} onOpenChange={(open) => (open ? null : setPending(null))}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <TemplateUsage templates={templates} />
          <Dialog.Title className={styles.title}>
            {atLimit ? `You've chosen all ${total} templates` : `Use ${name} as one of your templates?`}
          </Dialog.Title>
          <Dialog.Description className={styles.body}>
            {atLimit
              ? `${name} isn't one of them. During beta, each account gets ${total} templates. You can keep customizing and downloading the ones you have.`
              : `${left === 1 ? 'This uses your last template.' : `You have ${plural(left, 'template')} left.`} Once ${name} is yours, you can change its colors and patterns and download it as often as you like.`}
          </Dialog.Description>

          {atLimit ? (
            <>
              <div className={styles.chips}>
                {ready.chosen.map((row) => (
                  <span key={row.slug} className={styles.chip}>
                    {names[row.slug] ?? row.slug}
                  </span>
                ))}
              </div>
              <div className={styles.actions}>
                <Link href="/account/" prefetch={false} className={styles.secondary}>
                  View my templates
                </Link>
                {ready.request ? null : (
                  <Link href="/account/?request=1" prefetch={false} className={styles.primary}>
                    Request more
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className={styles.actions}>
              <Dialog.Close className={styles.secondary}>Cancel</Dialog.Close>
              <button type="button" className={styles.primary} onClick={confirm} disabled={busy || !ready}>
                {pending ? CTA[pending.action] : ''}
              </button>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );

  return { guard, dialog, templates };
}
