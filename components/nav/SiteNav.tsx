'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from '@base-ui-components/react/menu';
import { Logo } from 'components/logo';
import { plexMono } from 'lib/fonts';
import { signOut, useSessionUser } from 'lib/authClient';
import styles from './SiteNav.module.css';

// The site's masthead, in the two tones the design draws it in: ink on paper
// for the library, the account pages and the content pages, and paper on the
// dark shell for the homepage and the template gallery. One component, so
// the three destinations and the way into an account are the same everywhere
// and a change to either is made once.
//
// What it shows follows the session. Signed out: Home / Patterns / Websites
// in the middle and "Sign in" on the right. Signed in: the first destination
// becomes My Account and the right-hand slot is the person's initials, which
// open a menu naming the account and letting them leave it. Below 768px the
// destinations fold into that same menu (or, signed out, into one behind a
// hamburger), which is what the artboards do.
//
// GitHub and Docs are not up here; the footer carries them. The masthead is
// for the three places a visitor goes, not for everything the site links to.

export type NavTone = 'dark' | 'light';

const DESTINATIONS = [
  ['/patterns', 'Patterns'],
  ['/templates', 'Websites'],
] as const;

const SIGN_IN = '/sign-in?next=%2Faccount';

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
  /** Pin the bar to the top of the viewport (the library scrolls under it). */
  sticky?: boolean;
  className?: string;
}) {
  const { user } = useSessionUser();
  const router = useRouter();
  const pathname = normalize(usePathname() ?? '/');

  const home = user ? (['/account', 'My Account'] as const) : (['/', 'Home'] as const);
  const links = [home, ...DESTINATIONS] as const;

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const item = (href: string, label: string, extra?: string) => (
    <Menu.Item
      key={href}
      className={extra ? `${styles.menuItem} ${extra}` : styles.menuItem}
      render={<Link href={href} prefetch={false} />}
    >
      {label}
    </Menu.Item>
  );

  return (
    <header
      className={[plexMono.variable, styles.nav, sticky && styles.sticky, className]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
    >
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
            <Menu.Trigger className={styles.avatar} aria-label="Account menu">
              {initials(user.name, user.email)}
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
                  {item('/account', 'My Account')}
                  {/* The two destinations, only where the inline nav is gone. */}
                  {item('/patterns', 'Patterns', styles.narrowOnly)}
                  {item('/templates', 'Websites', styles.narrowOnly)}
                  {item('/account/settings', 'Settings')}
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
        ) : (
          <>
            <Link href={SIGN_IN} className={styles.signIn} prefetch={false}>
              Sign in
            </Link>

            <Menu.Root>
              <Menu.Trigger className={styles.hamburger} aria-label="Menu">
                <span />
                <span />
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner
                  className={styles.positioner}
                  side="bottom"
                  align="end"
                  sideOffset={2}
                >
                  <Menu.Popup className={styles.menu}>
                    {item('/', 'Home')}
                    {item('/patterns', 'Patterns')}
                    {item('/templates', 'Websites')}
                    <Menu.Separator className={styles.menuRule} />
                    {item(SIGN_IN, 'Sign in')}
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
