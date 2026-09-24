'use client';

// A template in a frame, with one thing to do with it: use it.
//
// "Use this template" is the only action. Signed in, it opens a menu headed
// by how many of the person's five templates are chosen and what taking
// this one costs, then the ways to take it: customize it (a link to the
// customizer, which makes nothing until it is saved), or download the
// original as HTML or as the React project. A template that is not yet the
// person's asks first (ChooseTemplate.tsx), since taking it spends one of
// the five. On a phone the customizer's rail is not offered at all, so
// neither is Customize. Signed out, the same button opens a card that asks
// for a sign-in first, with the customizer as the way back.
//
// The bar's left edge is the Tabbied mark and "Websites", the way back to
// the gallery, as the artboard draws it.
import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { Popover } from '@base-ui-components/react/popover';
import { ChevronDown } from 'lucide-react';
import LogoMark from 'components/logo/LogoMark';
import { initials } from 'components/nav';
import Toaster from 'components/Toaster';
import { signOut, useSessionUser } from 'lib/authClient';
import { ebGaramond, plexMono, plexSans } from 'lib/fonts';
import { chosenOf, customizeHref as customizerFor, startDownload } from 'lib/myTemplates';
import useMediaQuery from 'lib/useMediaQuery';
import { TemplateUsage, choiceNote, useTemplateGate } from './ChooseTemplate';
import styles from './TemplatePreview.module.css';

export default function TemplatePreview({
  slug,
  name,
  topic,
  names,
}: {
  slug: string;
  name: string;
  /** Every template's name by slug, for the choose dialog's list. */
  names: Readonly<Record<string, string>>;
  /** Not drawn in the bar any more - both still name the frame for a screen
      reader, which "tabbied.com/templates/<slug>/site/" does not. */
  topic: string;
}) {
  const { user, isPending } = useSessionUser();
  const router = useRouter();
  // The width SiteWorkspace.module.css hides the customizer's rail below.
  const narrow = useMediaQuery('(max-width: 768px)');

  const { guard, dialog, templates } = useTemplateGate(useMemo(() => names, [names]));
  const chosen = chosenOf(templates, slug);
  const customizeHref = customizerFor(slug, chosen);
  const next = encodeURIComponent(`/studio/customize/?slug=${slug}`);

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
      {/* The page's heading, for a screen reader and an outline: the bar is
          chrome and the template is in a frame, so nothing else names it. */}
      <h1 className={styles.srOnly}>
        {name}, a {topic.toLowerCase()} website template
      </h1>

      <header className={styles.bar}>
        <Link href="/templates" prefetch={false} className={styles.back} aria-label="All templates">
          <LogoMark size={21} className={styles.backMark} />
          <span className={styles.backLabel}>Websites</span>
        </Link>

        <div className={styles.actions}>
          {user ? (
            <Menu.Root>
              <Menu.Trigger className={styles.use}>{useLabel}</Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
                  <Menu.Popup className={`${styles.menu} ${styles.useMenu}`}>
                    <div className={styles.usage}>
                      <TemplateUsage templates={templates} tone="menu" />
                      <p className={styles.usageNote}>{choiceNote(templates, slug, name)}</p>
                    </div>
                    {narrow ? null : (
                      <Menu.Item
                        className={styles.option}
                        render={<Link href={customizeHref} prefetch={false} />}
                        onClick={(event) => {
                          if (chosen) return;
                          event.preventDefault();
                          guard(slug, name, 'customize', () => router.push(customizeHref));
                        }}
                      >
                        <span className={styles.optionTitle}>Customize</span>
                        <span className={styles.optionNote}>Change colors and patterns</span>
                      </Menu.Item>
                    )}
                    <Menu.Separator className={styles.menuRule} />
                    <div className={styles.menuLabel}>Download original</div>
                    {(
                      [
                        ['html', 'Static HTML & CSS', 'Drop on any host'],
                        ['react', 'React project', 'Components, ready for a repo'],
                      ] as const
                    ).map(([format, title, note]) => {
                      const href = `/downloads/${slug}-${format}.zip`;

                      return (
                        <Menu.Item
                          key={format}
                          className={styles.option}
                          render={<a href={href} download />}
                          onClick={(event) => {
                            if (chosen) return;
                            event.preventDefault();
                            guard(slug, name, 'download', () => startDownload(href));
                          }}
                        >
                          <span className={styles.optionTitle}>{title}</span>
                          <span className={styles.optionNote}>{note}</span>
                        </Menu.Item>
                      );
                    })}
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
                    <Menu.Item className={styles.menuItem} render={<Link href="/patterns/" prefetch={false} />}>
                      Patterns
                    </Menu.Item>
                    <Menu.Item className={styles.menuItem} render={<Link href="/templates/" prefetch={false} />}>
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
          ) : null}
        </div>
      </header>

      <div className={styles.stage}>
        <div className={styles.frame}>
          <div className={styles.chrome}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.pill}>tabbied.com/templates/{slug}/site/</span>
            <a className={styles.open} href={`/templates/${slug}/site/`}>
              Open the page
            </a>
          </div>
          <iframe
            className={styles.iframe}
            src={`/templates/${slug}/site/`}
            title={`${name} - the ${topic.toLowerCase()} template`}
          />
        </div>
      </div>

      {dialog}
      <Toaster />
    </div>
  );
}
