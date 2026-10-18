'use client';

// The customizer's top row, over the canvas: the way back, and Download (and,
// on a phone, where the canvas has no browser bar of its own, the button that
// opens the site in a new tab). The
// 14 October design dropped the dark bar the customizer had, with the
// account menu that was in it: the customizer is reached without an
// account, so it leads back to where it was opened from and offers nothing
// that needs one but Save, in the rail.
//
// Download is a menu, and what it holds follows what there is to download
// (the 17 October design). A template nobody has changed is one thing in two
// formats, so the menu is a choice of format. Once there is a customized
// version (a change on the canvas, or a saved site) it comes first, rebuilt
// in the browser with the site's colors and patterns in it
// (lib/studioDownload.ts), over the original template. Both are free and
// need no account. On a phone, where nothing can be customized, the menu is
// always the choice of format, and says what a larger screen is for: the
// notice that said so used to sit over the page.
import Link from 'next/link';
import { Menu } from '@base-ui/react/menu';
import { ExternalLink } from 'lucide-react';
import ImpersonationNotice from 'components/nav/ImpersonationNotice';
import useMediaQuery from 'lib/useMediaQuery';
import styles from './CustomizerBar.module.css';

/** Where the rail is hidden (SiteWorkspace.module.css), and the menu shortens. */
const PHONE = '(max-width: 768px)';

export default function CustomizerBar({
  mine,
  template,
  downloading,
  onDownloadHtml,
  onDownloadReact,
  slug,
  templateName,
  colors,
  customized,
  onOpenInNewTab,
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
  /** There is a customized version to offer: a saved site, or changes on the canvas. */
  customized: boolean;
  /** Open the site as it stands in a tab of its own. Shown here on a phone only. */
  onOpenInNewTab: () => void;
}) {
  const phone = useMediaQuery(PHONE);
  const saved = template === undefined;
  const back = mine && saved ? { href: '/account/', label: 'Your templates' } : { href: '/templates/', label: 'Templates' };
  const twoPanes = customized && !phone;

  // A phone has no rail, so the menu says what a larger screen is for: a
  // saved site's customized version is downloaded there too.
  const hint = !saved
    ? { lead: 'Need to customize?', rest: 'Open this page on a larger screen to change colors and patterns.' }
    : mine
      ? { lead: 'Want your customized version?', rest: 'Open this page on a larger screen to edit or download it.' }
      : { lead: 'Want this customized version?', rest: 'Open this page on a larger screen to download it.' };

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
        <button
          type="button"
          className={styles.openTab}
          title="Open in new tab"
          aria-label="Open in new tab"
          onClick={onOpenInNewTab}
        >
          <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <Menu.Root>
          <Menu.Trigger
            className={styles.download}
            disabled={downloading}
            aria-label={downloading ? 'Preparing the download' : 'Download'}
          >
            <span>{downloading ? 'Preparing...' : 'Download'}</span>
            {/* A menu, not a download: the arrow says the button opens. */}
            <svg
              className={styles.chevron}
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
              <Menu.Popup className={`${styles.menu} ${styles.downloadMenu}`}>
                {twoPanes ? (
                  <div className={styles.dlCustom}>
                    <div className={styles.dlTitle}>Customized version</div>
                    <div className={styles.dlSummary}>
                      <span className={styles.dlSwatches} aria-hidden="true">
                        {colors.slice(0, 5).map((color, index) => (
                          <span key={index} style={{ background: color }} />
                        ))}
                      </span>
                      <span className={styles.dlNote}>Your latest edits</span>
                    </div>
                    <div className={styles.dlActions}>
                      <Menu.Item
                        className={`${styles.dlButton} ${styles.dlPrimary}`}
                        aria-label="Customized version, HTML & CSS"
                        onClick={onDownloadHtml}
                      >
                        HTML &amp; CSS
                      </Menu.Item>
                      <Menu.Item
                        className={`${styles.dlButton} ${styles.dlPrimary}`}
                        aria-label="Customized version, React project"
                        onClick={onDownloadReact}
                      >
                        React
                      </Menu.Item>
                    </div>
                  </div>
                ) : null}
                <div className={styles.dlOriginal}>
                  {twoPanes ? (
                    <>
                      <div className={styles.dlTitle}>Original</div>
                      <div className={styles.dlSub}>As designed, without your edits</div>
                    </>
                  ) : (
                    <>
                      <div className={styles.dlTitle}>Choose a format</div>
                      <div className={styles.dlLead}>Free and unlimited.</div>
                    </>
                  )}
                  <div className={styles.dlActions}>
                    <Menu.Item
                      className={`${styles.dlButton} ${twoPanes ? styles.dlSecondary : styles.dlPrimary}`}
                      aria-label={`Original ${templateName}, HTML & CSS`}
                      render={<a href={`/downloads/${slug}-html.zip`} download />}
                    >
                      HTML &amp; CSS
                    </Menu.Item>
                    <Menu.Item
                      className={`${styles.dlButton} ${twoPanes ? styles.dlSecondary : styles.dlPrimary}`}
                      aria-label={`Original ${templateName}, React project`}
                      render={<a href={`/downloads/${slug}-react.zip`} download />}
                    >
                      React
                    </Menu.Item>
                  </div>
                  {twoPanes ? null : <p className={styles.dlZip}>Saves to your device as a .zip file.</p>}
                </div>
                {twoPanes ? (
                  <p className={styles.dlFoot}>Free and unlimited. Saves to your device as a .zip file.</p>
                ) : null}
                {phone ? (
                  <p className={styles.dlHint}>
                    <strong>{hint.lead}</strong> {hint.rest}
                  </p>
                ) : null}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </div>
  );
}
