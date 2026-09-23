'use client';

// A template in a frame, with one thing to do with it: use it.
//
// "Use this template" is the only action. Signed in, it opens a menu of the
// three ways to take a template: customize it (a link to /studio/customize/,
// which opens a draft and makes nothing until it is saved), download it as
// it is, or export the React project. On a phone the customizer's rail is
// not offered at all, so neither is Customize: the menu is the two downloads. Signed out, the same button opens a card that asks for a
// sign-in first, with the customizer as the way back, so a first visitor sees
// one button and one ask rather than two actions with different rules. The
// gate is this page's: the packaged zips are static assets, and Studio's
// results page still links them directly.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { Popover } from '@base-ui-components/react/popover';
import { ChevronDown } from 'lucide-react';
import { initials } from 'components/nav';
import { signOut, useSessionUser } from 'lib/authClient';
import { ebGaramond, plexMono, plexSans } from 'lib/fonts';
import useMediaQuery from 'lib/useMediaQuery';
import styles from './TemplatePreview.module.css';

export default function TemplatePreview({
  slug,
  name,
  topic,
}: {
  slug: string;
  name: string;
  /** Not drawn in the bar any more - both still name the frame for a screen
      reader, which "tabbied.com/template/<slug>/" does not. */
  topic: string;
}) {
  const { user, isPending } = useSessionUser();
  const router = useRouter();
  // The width SiteWorkspace.module.css hides the customizer's rail below.
  const narrow = useMediaQuery('(max-width: 768px)');

  const customizeHref = `/studio/customize/?slug=${slug}`;
  const next = encodeURIComponent(customizeHref);

  const useLabel = (
    <>
      <span className={styles.useLabel}>Use this template</span>
      <ChevronDown className={styles.chevron} size={15} aria-hidden="true" />
    </>
  );

  return (
    <div
      className={`${styles.page} ${plexMono.variable} ${plexSans.variable} ${ebGaramond.variable}`}
    >
      <header className={styles.bar}>
        <Link href="/templates" prefetch={false} className={styles.back} aria-label="All templates">
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
          <span className={styles.backLabel}>Websites</span>
        </Link>

        <div className={styles.actions}>
          {user ? (
            <Menu.Root>
              <Menu.Trigger className={styles.use}>{useLabel}</Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
                  <Menu.Popup className={styles.menu}>
                    {narrow ? null : (
                      <>
                        <Menu.Item
                          className={styles.option}
                          render={<Link href={customizeHref} prefetch={false} />}
                        >
                          <span className={styles.optionTitle}>Customize</span>
                          <span className={styles.optionNote}>Change colors and patterns</span>
                        </Menu.Item>
                        <Menu.Separator className={styles.menuRule} />
                      </>
                    )}
                    <Menu.Item
                      className={styles.option}
                      render={<a href={`/downloads/${slug}-html.zip`} download />}
                    >
                      <span className={styles.optionTitle}>Download as-is</span>
                      <span className={styles.optionNote}>Static HTML &amp; CSS, drop on any host</span>
                    </Menu.Item>
                    <Menu.Item
                      className={styles.option}
                      render={<a href={`/downloads/${slug}-react.zip`} download />}
                    >
                      <span className={styles.optionTitle}>Export React project</span>
                      <span className={styles.optionNote}>Components, ready for a repo</span>
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          ) : (
            <Popover.Root>
              <Popover.Trigger className={styles.use}>{useLabel}</Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
                  <Popover.Popup className={styles.signCard} aria-label="Sign in to use this template">
                    <Popover.Title className={styles.signTitle}>Sign in to use this template</Popover.Title>
                    <Popover.Description className={styles.signCopy}>
                      Customize it online, download it as-is, or export it as a React project.
                    </Popover.Description>
                    <div className={styles.signActions}>
                      <Link href={`/sign-in?next=${next}`} prefetch={false} className={styles.signIn}>
                        Log in
                      </Link>
                      <Link href={`/sign-up?next=${next}`} prefetch={false} className={styles.signUp}>
                        Sign up
                      </Link>
                    </div>
                    <p className={styles.signFree}>Free to use.</p>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          )}

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
          ) : null}
        </div>
      </header>

      <div className={styles.stage}>
        <div className={styles.frame}>
          <div className={styles.chrome}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.pill}>tabbied.com/template/{slug}/</span>
            <a className={styles.open} href={`/template/${slug}/`}>
              Open the page
            </a>
          </div>
          <iframe
            className={styles.iframe}
            src={`/template/${slug}/`}
            title={`${name} - the ${topic.toLowerCase()} template`}
          />
        </div>
      </div>
    </div>
  );
}
