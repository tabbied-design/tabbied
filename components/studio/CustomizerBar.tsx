'use client';

// The customizer's top bar: the way back, Download, and the person.
//
// Dark, like the template preview's, so the chrome reads apart from the site
// on the canvas. Save is not up here: it sits at the foot of the rail, next
// to the controls that make the changes it saves.
//
// Download is a menu because there are two packages and they are not the
// same thing. The static package is rebuilt in the browser with the site's
// colours and patterns in it (lib/studioDownload.ts); the React package is the
// template's source, which the customizer's document cannot be applied to,
// and the menu says so rather than implying otherwise. The design draws a
// gauge of downloads used above the two; nothing counts downloads yet (the
// account's usage page says the same), so the gauge waits for a counter
// rather than reading a number nobody keeps.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { ArrowDownToLine, ChevronDown } from 'lucide-react';
import { initials } from 'components/nav';
import { signOut, useSessionUser } from 'lib/authClient';
import styles from './CustomizerBar.module.css';

export default function CustomizerBar({
  mine,
  downloading,
  onDownloadHtml,
  reactHref,
}: {
  /** The viewer owns the site: the way back is the account. */
  mine: boolean;
  downloading: boolean;
  onDownloadHtml: () => void;
  reactHref: string;
}) {
  const { user, isPending } = useSessionUser();
  const router = useRouter();

  return (
    <header className={styles.bar}>
      <Link
        href={mine ? '/account/sites/' : '/templates'}
        prefetch={false}
        className={styles.back}
        aria-label={mine ? 'Back to your sites' : 'Back to the templates'}
      >
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
        <span className={styles.backLabel}>{mine ? 'My account' : 'Templates'}</span>
      </Link>

      <div className={styles.actions}>
        <Menu.Root>
          <Menu.Trigger
            className={styles.download}
            disabled={downloading}
            aria-label={downloading ? 'Preparing the download' : 'Download'}
          >
            <ArrowDownToLine className={styles.downloadIcon} size={18} aria-hidden="true" />
            <span className={styles.downloadLabel}>{downloading ? 'Preparing...' : 'Download'}</span>
            <ChevronDown className={styles.chevron} size={15} aria-hidden="true" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
              <Menu.Popup className={styles.menu}>
                <div className={styles.menuHead}>Includes your colours and patterns</div>
                <Menu.Item className={styles.option} onClick={onDownloadHtml}>
                  <span className={styles.optionTitle}>Static HTML &amp; CSS</span>
                  <span className={styles.optionNote}>One folder, drop on any host</span>
                </Menu.Item>
                <Menu.Separator className={styles.menuRule} />
                <div className={styles.menuHead}>The template as authored</div>
                <Menu.Item
                  className={styles.option}
                  render={<a href={reactHref} download />}
                >
                  <span className={styles.optionTitle}>React project</span>
                  <span className={styles.optionNote}>
                    Source components; your colours and patterns are not applied here yet
                  </span>
                </Menu.Item>
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
                <Menu.Popup className={styles.menu}>
                  <div className={styles.menuEmail}>{user.email}</div>
                  <Menu.Separator className={styles.menuRule} />
                  <Menu.Item className={styles.menuItem} render={<Link href="/account/" prefetch={false} />}>
                    My account
                  </Menu.Item>
                  <Menu.Item className={styles.menuItem} render={<Link href="/account/sites/" prefetch={false} />}>
                    Custom sites
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
