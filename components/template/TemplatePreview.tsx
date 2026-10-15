'use client';

// A template in a frame, with one thing to do with it: use it.
//
// "Use this template" is the only action, and the same for everyone, since
// nothing about a template needs an account: a menu headed by that promise,
// then Customize (not on a phone, where the customizer's rail is not offered)
// and the two original downloads. For a signed-in person who saved a
// customization of this template, Customize opens their newest saved site.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui/react/menu';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import LogoMark from 'components/logo/LogoMark';
import { initials } from 'components/nav';
import ImpersonationNotice from 'components/nav/ImpersonationNotice';
import { signOut, useSessionUser } from 'lib/authClient';
import { stopImpersonating } from 'lib/impersonation';
import { ebGaramond, plexMono, plexSans } from 'lib/fonts';
import { customizeHref as customizerFor, savedOf, useSavedTemplates } from 'lib/savedTemplates';
import useMediaQuery from 'lib/useMediaQuery';
import { withArticle } from 'lib/article';
import styles from './TemplatePreview.module.css';

export default function TemplatePreview({
  slug,
  name,
  topic,
}: {
  slug: string;
  name: string;
  /** Names the page and the frame for a screen reader, which the URL in the
      bar does not. */
  topic: string;
}) {
  const { user, isPending, impersonating } = useSessionUser();
  const router = useRouter();
  // The width SiteWorkspace.module.css hides the customizer's rail below.
  const narrow = useMediaQuery('(max-width: 768px)');

  const saved = useSavedTemplates();
  const customizeHref = customizerFor(slug, savedOf(saved, slug));

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
      <ImpersonationNotice />
      {/* The page's heading, for a screen reader and an outline: the bar is
          chrome and the template is in a frame, so nothing else names it. */}
      <h1 className={styles.srOnly}>
        {name}, {withArticle(topic.toLowerCase())} website template
      </h1>

      <header className={styles.bar}>
        <Link href="/templates" prefetch={false} className={styles.back} aria-label="All templates">
          <LogoMark size={21} className={styles.backMark} />
          <span className={styles.backLabel}>Websites</span>
        </Link>

        <div className={styles.actions}>
          <Menu.Root>
            <Menu.Trigger className={styles.use}>{useLabel}</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner className={styles.positioner} side="bottom" align="end" sideOffset={10}>
                <Menu.Popup className={`${styles.menu} ${styles.useMenu}`}>
                  <p className={styles.usageNote}>Free to customize and download. No account needed.</p>
                  {/* The note closes with a rule of its own, so the one under
                      Customize goes with it on a phone. */}
                  {narrow ? null : (
                    <>
                      <Menu.Item className={styles.option} render={<Link href={customizeHref} prefetch={false} />}>
                        <span className={styles.optionTitle}>Customize</span>
                        <span className={styles.optionNote}>Change colors and patterns</span>
                      </Menu.Item>
                      <Menu.Separator className={styles.menuRule} />
                    </>
                  )}
                  <div className={styles.menuLabel}>Download original</div>
                  {(
                    [
                      ['html', 'Static HTML & CSS', 'Drop on any host'],
                      ['react', 'React project', 'Components, ready for a repo'],
                    ] as const
                  ).map(([format, title, note]) => (
                    <Menu.Item
                      key={format}
                      className={styles.option}
                      render={<a href={`/downloads/${slug}-${format}.zip`} download />}
                    >
                      <span className={styles.optionTitle}>{title}</span>
                      <span className={styles.optionNote}>{note}</span>
                    </Menu.Item>
                  ))}
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
                    <div className={styles.menuEmail}>
                      {impersonating ? `Viewing as ${user.email}` : user.email}
                    </div>
                    <Menu.Separator className={styles.menuRule} />
                    <Menu.Item className={styles.menuItem} render={<Link href="/account/" prefetch={false} />}>
                      My account
                    </Menu.Item>
                    <Menu.Item className={styles.menuItem} render={<Link href="/patterns/" prefetch={false} />}>
                      Patterns
                    </Menu.Item>
                    <Menu.Item className={styles.menuItem} render={<Link href="/templates/" prefetch={false} />}>
                      Website templates
                    </Menu.Item>
                    <Menu.Item className={styles.menuItem} render={<Link href="/account/settings/" prefetch={false} />}>
                      Settings
                    </Menu.Item>
                    <Menu.Separator className={styles.menuRule} />
                    {/* A borrowed session ends by handing the admin's back. */}
                    <Menu.Item
                      className={styles.menuItem}
                      onClick={async () => {
                        if (impersonating) {
                          await stopImpersonating().catch(() => undefined);
                          return;
                        }
                        await signOut();
                        router.push('/');
                      }}
                    >
                      {impersonating ? 'Stop impersonating' : 'Log out'}
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
            <a className={styles.open} href={`/templates/${slug}/site/`} target="_blank" rel="noopener">
              Open in new tab
              <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
          <iframe
            className={styles.iframe}
            src={`/templates/${slug}/site/`}
            title={`${name} - the ${topic.toLowerCase()} template`}
          />
        </div>
      </div>

    </div>
  );
}
