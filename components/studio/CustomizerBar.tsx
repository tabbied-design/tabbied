'use client';

// The customizer's top bar: the way back, Download, and the person. Dark,
// like the template preview's, so the chrome reads apart from the site on the
// canvas.
//
// Download is a menu of two packages, as the design draws it: the customized
// version, rebuilt in the browser with the site's colors and patterns in it
// (lib/studioDownload.ts), and the original template in both formats. The
// customized version is static HTML only, because the document cannot be
// applied to JSX; the React package is the template's own source.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { initials } from 'components/nav';
import { signOut, useSessionUser } from 'lib/authClient';
import styles from './CustomizerBar.module.css';

/** Where the way back leads, by who is looking at what. */
const BACK = {
  mine: { href: '/account/', label: 'My account', aria: 'Back to your templates' },
  visitor: { href: '/templates', label: 'Templates', aria: 'Back to the templates' },
};

/** "Edited Today" or "Edited Sep 22", as the design writes the last save. */
function editedLabel(when: string | Date): string {
  const date = new Date(when);

  if (Number.isNaN(date.getTime())) return '';
  if (date.toDateString() === new Date().toDateString()) return 'Edited Today';

  return `Edited ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

export default function CustomizerBar({
  mine,
  template,
  downloading,
  onDownloadHtml,
  slug,
  templateName,
  colors,
  unsaved,
  editedAt,
}: {
  /** The viewer owns the site: the way back is the account. */
  mine: boolean;
  /**
   * The template slug of a site not saved yet: the way back is the template
   * it was opened from, since the account has nothing of it to show.
   */
  template?: string;
  downloading: boolean;
  onDownloadHtml: () => void;
  /** The template the site is built on, for the original's two zips. */
  slug: string;
  templateName: string;
  /** The colors the page wears now, ground first. */
  colors: readonly string[];
  /** Changes on the canvas that no revision holds yet. */
  unsaved: boolean;
  /** When the latest revision was saved, or null for a site not saved yet. */
  editedAt: string | Date | null;
}) {
  const { user, isPending } = useSessionUser();
  const router = useRouter();
  const back = template
    ? { href: `/templates/${template}/`, label: 'Template', aria: 'Back to the template' }
    : mine
      ? BACK.mine
      : BACK.visitor;

  return (
    <header className={styles.bar}>
      <Link href={back.href} prefetch={false} className={styles.back} aria-label={back.aria}>
        <span className={styles.backCircle} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 5.5 8 12l6.5 6.5" />
          </svg>
        </span>
        <span className={styles.backLabel}>{back.label}</span>
      </Link>

      <div className={styles.actions}>
        <Menu.Root>
          <Menu.Trigger
            className={styles.download}
            disabled={downloading}
            aria-label={downloading ? 'Preparing the download' : 'Download'}
          >
            <svg
              className={styles.downloadIcon}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />
            </svg>
            <span className={styles.downloadLabel}>{downloading ? 'Preparing...' : 'Download'}</span>
            <span className={styles.caret} aria-hidden="true">
              &#x25BE;
            </span>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
              <Menu.Popup className={`${styles.menu} ${styles.downloadMenu}`}>
                <div className={styles.dlCustom}>
                  <div className={styles.dlHead}>
                    <span className={styles.dlTitle}>Your customized version</span>
                    <span className={styles.dlMeta}>
                      {unsaved ? 'Unsaved edits' : editedAt ? editedLabel(editedAt) : ''}
                    </span>
                  </div>
                  <div className={styles.dlSummary}>
                    <span className={styles.dlSwatches} aria-hidden="true">
                      {colors.slice(0, 5).map((color, index) => (
                        <span key={index} style={{ background: color }} />
                      ))}
                    </span>
                    <span className={styles.dlNote}>
                      {unsaved ? 'Includes your latest edits, saved or not.' : 'Your latest colors and patterns.'}
                    </span>
                  </div>
                  <div className={styles.dlActions}>
                    <Menu.Item
                      className={`${styles.dlButton} ${styles.dlPrimary}`}
                      aria-label="Your customized version, HTML & CSS"
                      onClick={onDownloadHtml}
                    >
                      HTML &amp; CSS
                    </Menu.Item>
                  </div>
                </div>
                <div className={styles.dlOriginal}>
                  <div className={styles.dlTitle}>Original {templateName}</div>
                  <div className={styles.dlSub}>As designed, without your edits</div>
                  <div className={styles.dlActions}>
                    <Menu.Item
                      className={`${styles.dlButton} ${styles.dlSecondary}`}
                      aria-label={`Original ${templateName}, HTML & CSS`}
                      render={<a href={`/downloads/${slug}-html.zip`} download />}
                    >
                      HTML &amp; CSS
                    </Menu.Item>
                    <Menu.Item
                      className={`${styles.dlButton} ${styles.dlSecondary}`}
                      aria-label={`Original ${templateName}, React project`}
                      render={<a href={`/downloads/${slug}-react.zip`} download />}
                    >
                      React
                    </Menu.Item>
                  </div>
                  <p className={styles.dlFoot}>
                    Unlimited downloads. HTML &amp; CSS drops on any host; React is ready for a repo.
                  </p>
                </div>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        {user ? (
          <Menu.Root>
            <Menu.Trigger className={styles.account} aria-label="Account menu">
              <span className={styles.avatar}>{initials(user.name, user.email)}</span>
              <span className={styles.lines} aria-hidden="true">
                <span />
                <span />
              </span>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
                <Menu.Popup className={`${styles.menu} ${styles.accountMenu}`}>
                  <div className={styles.menuEmail}>{user.email}</div>
                  <Menu.Separator className={styles.menuRule} />
                  <Menu.Item className={styles.menuItem} render={<Link href="/account/" prefetch={false} />}>
                    My account
                  </Menu.Item>
                  <Menu.Item className={styles.menuItem} render={<Link href="/patterns/" prefetch={false} />}>
                    Patterns
                  </Menu.Item>
                  {/* The customizer is under Websites, so that row is drawn as the current one. */}
                  <Menu.Item
                    className={`${styles.menuItem} ${styles.menuItemOn}`}
                    render={<Link href="/templates/" prefetch={false} />}
                  >
                    Websites
                  </Menu.Item>
                  <Menu.Item className={styles.menuItem} render={<Link href="/account/settings/" prefetch={false} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Separator className={styles.menuRule} />
                  <Menu.Item
                    className={styles.menuItem}
                    onClick={async () => {
                      await signOut();
                      router.push('/');
                    }}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        ) : isPending ? (
          <span className={styles.avatarGhost} aria-hidden="true" />
        ) : (
          <Link href="/sign-in?next=%2Faccount" className={styles.signIn} prefetch={false}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
