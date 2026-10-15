'use client';

// The customizer's top row, over the canvas: the way back, and Download. The
// 14 October design dropped the dark bar the customizer had, with the
// account menu that was in it: the customizer is reached without an
// account, so it leads back to where it was opened from and offers nothing
// that needs one but Save, in the rail.
//
// Download is a menu of two packages, as the design draws it: the customized
// version, rebuilt in the browser with the site's colors and patterns in it
// (lib/studioDownload.ts), and the original template in both formats. Both
// are free and need no account. The customized HTML has the changes written
// into the page; the customized React project carries them in files of its
// own over the template's source, since the document cannot be written into
// JSX.
import Link from 'next/link';
import { Menu } from '@base-ui/react/menu';
import ImpersonationNotice from 'components/nav/ImpersonationNotice';
import styles from './CustomizerBar.module.css';

/** How each format carries the changes, said where the choice is made. */
export const CUSTOMIZED_FORMAT_NOTE =
  'Your colors and patterns are written into the HTML page, and laid over the React source in files of their own.';

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
  onDownloadReact,
  slug,
  templateName,
  colors,
  unsaved,
  editedAt,
}: {
  /** The viewer owns the site: the way back is the account. */
  mine: boolean;
  /**
   * The template slug of a site not saved yet: the way back is the gallery
   * it was opened from, since the account has nothing of it to show.
   */
  template?: string;
  downloading: boolean;
  onDownloadHtml: () => void;
  onDownloadReact: () => void;
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
  const back =
    mine && !template
      ? { href: '/account/', label: 'Your templates' }
      : { href: '/templates/', label: 'Templates' };

  return (
    <div className={styles.bar}>
      <ImpersonationNotice />
      <Link href={back.href} prefetch={false} className={styles.back} aria-label={`Back to ${back.label.toLowerCase()}`}>
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 12H4" />
          <path d="M10 6l-6 6 6 6" />
        </svg>
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
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />
            </svg>
            <span className={styles.downloadLabel}>{downloading ? 'Preparing...' : 'Download'}</span>
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
                    <Menu.Item
                      className={`${styles.dlButton} ${styles.dlSecondary}`}
                      aria-label="Your customized version, React project"
                      onClick={onDownloadReact}
                    >
                      React
                    </Menu.Item>
                  </div>
                  <p className={styles.dlFormatNote}>{CUSTOMIZED_FORMAT_NOTE}</p>
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
                    Free, unlimited downloads. No account needed. HTML &amp; CSS drops on any host;
                    React is ready for a repo.
                  </p>
                </div>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

      </div>
    </div>
  );
}
