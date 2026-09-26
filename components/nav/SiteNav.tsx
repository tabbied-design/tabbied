'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { Logo } from 'components/logo';
import { plexMono } from 'lib/fonts';
import { useSyncExternalStore } from 'react';
import { SESSION_HINT_KEY, readSessionHint, signOut, useSessionUser } from 'lib/authClient';
import useMediaQuery from 'lib/useMediaQuery';
import styles from './SiteNav.module.css';

// The site's masthead, in two tones: ink on paper (`light`) and paper on the
// dark shell (`dark`, the homepage and the template gallery). See CLAUDE.md,
// "The masthead - one bar, two tones".
//
// Signed out: Home / Patterns / Websites and "Sign in". Signed in: My account
// first, and the person's initials opening the account menu. Below 768px the
// destinations fold into that menu (signed out, into one behind a hamburger).
//
// A prerendered page cannot know who is looking, so the signed-out chrome
// draws until the session answers. A browser signed in last time
// (SESSION_HINT_KEY) would see "Sign in" flash to its initials, so the bar
// marks itself `data-session="likely"` and draws a placeholder instead: from
// the inline script before hydration, and from state after it.

/** Runs as the bar is parsed: the hint, before React has done anything. */
const HINT_SCRIPT = `try{localStorage.getItem(${JSON.stringify(
  SESSION_HINT_KEY
)})==='1'&&document.currentScript.parentElement.setAttribute('data-session','likely')}catch(e){}`;

const noSubscription = () => () => {};

type NavTone = 'dark' | 'light';

const DESTINATIONS = [
  ['/patterns', 'Patterns'],
  ['/templates', 'Websites'],
] as const;

/** Two letters for the circle: first and last name, or the start of the email. */
export function initials(name: string, email: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const text =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : (parts[0] ?? email).slice(0, 2);

  return text.toUpperCase();
}

// The export uses trailing slashes, so the live pathname is "/patterns/" while
// a nav href is "/patterns". Compare without the slash (keeping "/" itself).
function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export default function SiteNav({
  tone = 'light',
  sticky = false,
  className,
}: {
  tone?: NavTone;
  /** Pin the bar to the top of the viewport (the library scrolls under it).
      The dark tone is always pinned. */
  sticky?: boolean;
  className?: string;
}) {
  const { user, isPending } = useSessionUser();
  const hinted = useSyncExternalStore(noSubscription, readSessionHint, () => false);
  const likely = !user && isPending && hinted;
  const router = useRouter();
  const rawPathname = usePathname() ?? '/';
  const pathname = normalize(rawPathname);
  // The destinations join the account menu only where the inline nav has
  // folded, decided here rather than by `display: none`: a hidden menu item is
  // still in the list Base UI arrows through and a screen reader counts.
  // Menus open after mount, so the query's server value never draws.
  const narrow = useMediaQuery('(max-width: 767.98px)');

  // Signing in returns the person to the page they were on, except that the
  // homepage's signed-in face is the account.
  const signInHref = `/sign-in?next=${encodeURIComponent(
    pathname === '/' ? '/account' : rawPathname
  )}`;

  const home = user ? (['/account', 'My account'] as const) : (['/', 'Home'] as const);
  const links = [home, ...DESTINATIONS] as const;

  // Both dark artboards (the homepage and the template gallery) pin the bar.
  const pinned = sticky || tone === 'dark';

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  // The menu marks one item as the page you are on: the longest href that
  // matches, so Settings wins over My account on /account/settings.
  const menuHrefs = [
    '/',
    '/account',
    '/account/settings',
    '/admin',
    ...DESTINATIONS.map(([href]) => href),
  ];
  const menuCurrent = menuHrefs
    .filter(isCurrent)
    .reduce<string | null>((best, href) => (!best || href.length > best.length ? href : best), null);

  const item = (href: string, label: string) => (
    <Menu.Item
      key={href}
      className={styles.menuItem}
      render={
        <Link
          href={href}
          prefetch={false}
          aria-current={href === menuCurrent ? 'page' : undefined}
        />
      }
    >
      {label}
    </Menu.Item>
  );

  return (
    <header
      className={[plexMono.variable, styles.nav, pinned && styles.sticky, className]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
      data-session={likely ? 'likely' : undefined}
      // The inline script may have set data-session before hydration.
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: HINT_SCRIPT }} />

      <Link href="/" className={styles.logo} aria-label="Tabbied home" prefetch={false}>
        {/* A hair larger on the dark ground, which eats a little of the
            hairline stroke. */}
        <Logo size={tone === 'dark' ? 21 : 20} wordSize={tone === 'dark' ? 19 : 18} />
      </Link>

      <nav className={styles.links} aria-label="Main">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            aria-current={isCurrent(href) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className={styles.end}>
        {user ? (
          <Menu.Root>
            {/* The two rules say it opens: below 768px this is the only
                way into the menu, so the affordance has to be on it. */}
            <Menu.Trigger className={styles.account} aria-label="Account menu">
              <span className={styles.avatar}>{initials(user.name, user.email)}</span>
              <span className={styles.lines} aria-hidden="true">
                <span />
                <span />
              </span>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner
                className={styles.positioner}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <Menu.Popup className={styles.menu}>
                  <div className={styles.menuEmail}>{user.email}</div>
                  <Menu.Separator className={styles.menuRule} />
                  {item('/account', 'My account')}
                  {narrow && item('/patterns', 'Patterns')}
                  {narrow && item('/templates', 'Websites')}
                  {item('/account/settings', 'Settings')}
                  {/* This decides only whether the way in is drawn: every
                      /api/admin route checks the role again for itself. */}
                  {user.role === 'admin' && item('/admin', 'Admin')}
                  <Menu.Separator className={styles.menuRule} />
                  <Menu.Item
                    className={styles.menuItem}
                    onClick={async () => {
                      // Leave whether or not the sign-out call succeeded,
                      // so a rejection is never unhandled.
                      try {
                        await signOut();
                      } finally {
                        router.push('/');
                      }
                    }}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        ) : (
          <>
            <Link href={signInHref} className={styles.signIn} prefetch={false}>
              Sign in
            </Link>

            <Menu.Root>
              <Menu.Trigger className={styles.hamburger} aria-label="Menu">
                <span />
                <span />
              </Menu.Trigger>
              <Menu.Portal>
                {/* Opens 6px above the bar's hairline, where the artboards
                    hang the phone menu. */}
                <Menu.Positioner
                  className={styles.positioner}
                  side="bottom"
                  align="end"
                  sideOffset={10}
                >
                  <Menu.Popup className={styles.menu}>
                    {item('/', 'Home')}
                    {item('/patterns', 'Patterns')}
                    {item('/templates', 'Websites')}
                    <Menu.Separator className={styles.menuRule} />
                    {item(signInHref, 'Sign in')}
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </>
        )}
      </div>
    </header>
  );
}
