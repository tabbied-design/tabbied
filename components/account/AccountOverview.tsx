'use client';

// The account's front page, as the 14 October designs draw it: the
// customizations a person has saved. Every template is free to customize and
// download without an account, so there is nothing here to count against: a
// card with how many are saved, the AI card beside it, and a table of the
// saved sites, each with its downloads and the way back into the customizer,
// ending in the way to customize another.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Toaster from 'components/Toaster';
import { customizeHref, useSavedTemplates } from 'lib/savedTemplates';
import type { SiteSummary } from 'lib/studioDocument';
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
 * A small tile in the colors the site wears now: its ground under a motif in
 * its first ink. The motif is a function of the template, so a template
 * keeps its tile.
 */
function Thumb({ slug, colors }: { slug: string; colors: readonly string[] }) {
  const ground = colors[0] ?? '#f4f4f3';
  const ink = colors[1] ?? '#0e0e13';
  const soft = `color-mix(in oklab, ${ink} 55%, ${ground})`;
  const motif = [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 4;
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
  menuNote: styles.menuNote,
};

/** One saved site: its name and template, when it was saved and made, and what to do with it. */
function SiteRow({ site, entry }: { site: SiteSummary; entry: TemplateIndexEntry | undefined }) {
  const templateName = entry?.name ?? site.templateName;
  // The template is named under the site only when the site is called
  // something else.
  const kind = site.title === templateName ? (entry?.topic ?? 'Template') : `${templateName} template`;

  return (
    <div className={`${styles.tplRow} ${styles.columns}`}>
      <div className={styles.templateCell}>
        <Thumb slug={site.slug} colors={site.palette.length ? site.palette : (entry?.colors ?? [])} />
        <div className={styles.templateText}>
          <Link href={customizeHref(site.slug, site)} prefetch={false} className={shell.rowTitle}>
            {site.title}
          </Link>
          <p className={shell.rowMeta}>
            {kind}
            <span className={styles.narrowOnly}> &#xB7; Saved {day(site.updatedAt)}</span>
          </p>
        </div>
      </div>
      <p className={styles.date}>{day(site.updatedAt)}</p>
      <p className={`${styles.date} ${styles.dateAdded}`}>{day(site.createdAt)}</p>
      <div className={styles.rowActions}>
        <DownloadMenu name={templateName} slug={site.slug} siteId={site.id} side="bottom" classes={MENU} />
        <Link href={customizeHref(site.slug, site)} prefetch={false} className={styles.customize}>
          Keep editing
          <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** "Kalla, Nectar, Lucid", or the first five and how many more. */
function namesLine(names: string[]): string {
  return names.length > 5 ? `${names.slice(0, 5).join(', ')}, +${names.length - 5} more` : names.join(', ');
}

export default function AccountOverview({ index }: { index: TemplateIndexEntry[] }) {
  const saved = useSavedTemplates();
  const bySlug = new Map(index.map((entry) => [entry.slug, entry]));
  const sites = saved.status === 'ready' ? saved.sites : [];
  const names = sites.map((site) => site.title);

  return (
    <AccountPage
      eyebrow="Account overview"
      title="Your templates"
      back={false}
      badge="Free beta"
      lede="Every template is free to customize and download, as often as you like. Customizations you save live here, so you can come back and keep editing."
    >
      {/* One bordered box split in two, as the artboard draws it: what is
          saved on paper, and the AI card in ink. */}
      <div className={styles.cards}>
        <div className={styles.savedCard}>
          {saved.status === 'ready' ? (
            <>
              <p className={styles.savedCount}>{sites.length}</p>
              <div>
                <p className={styles.savedLabel}>Saved templates</p>
                {names.length > 0 ? <p className={styles.savedNames}>{namesLine(names)}</p> : null}
                <p className={styles.savedNote}>No limit on saves or downloads.</p>
              </div>
            </>
          ) : (
            <p className={shell.quiet}>
              {saved.status === 'error' ? 'Your templates are not available right now.' : 'Reading your templates...'}
            </p>
          )}
        </div>

        <div className={styles.dark}>
          <div className={styles.darkHead}>
            <p className={styles.cardLabel}>AI usage</p>
            <span className={styles.notYet}>Not yet available</span>
          </div>
          <p className={styles.creditsLabel}>AI credits: words &amp; pictures</p>
          <div className={styles.creditsTrack} aria-hidden="true" />
          <p className={styles.darkNote}>
            Generating custom images and copy with AI is coming in a later release.
          </p>
        </div>
      </div>

      <div className={styles.recentsHead}>
        <div className={styles.recentsTitle}>
          <h2 className={shell.h2}>Saved templates</h2>
          {saved.status === 'ready' ? <span className={styles.count}>{sites.length}</span> : null}
        </div>
        <Link href="/templates" prefetch={false} className={`${shell.cta} ${styles.browse}`}>
          Browse templates
        </Link>
      </div>

      <div className={shell.panel}>
        <div className={`${styles.head} ${styles.columns}`} aria-hidden="true">
          <span>Template</span>
          <span>Last saved</span>
          <span>Created</span>
          <span />
        </div>

        {saved.status === 'loading' ? (
          [0, 1].map((i) => (
            <div key={i} className={`${styles.tplRow} ${styles.columns}`} aria-hidden="true">
              <div className={styles.skeleton} style={{ width: '60%' }} />
              <div className={styles.skeleton} style={{ width: '50%' }} />
              <div className={styles.skeleton} style={{ width: '50%' }} />
              <div />
            </div>
          ))
        ) : saved.status === 'error' ? (
          <p className={shell.empty}>Could not load your templates right now.</p>
        ) : (
          sites.map((site) => <SiteRow key={site.id} site={site} entry={bySlug.get(site.slug)} />)
        )}

        <Link href="/templates" prefetch={false} className={styles.slot}>
          <span className={styles.slotPlus} aria-hidden="true">
            +
          </span>
          <span>
            <span className={styles.slotTitle}>
              {sites.length > 0 ? 'Customize another template' : 'Customize a template'}
            </span>
            <span className={styles.slotNote}>Pick one from the template library</span>
          </span>
        </Link>
      </div>

      <Toaster />
    </AccountPage>
  );
}
