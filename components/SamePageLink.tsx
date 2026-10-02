'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';

// A link that goes back to the top when it points at the page already open.
// Next's router treats a click on a link to the current URL as a navigation
// that is already done, so the footer's "Docs" on the docs page did nothing at
// all. Everything else (another page, a different query, a link with its own
// #fragment, a click with a modifier key) is left to Next as before.

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/** `/docs/react` and `/docs/react/` are one page (trailingSlash is on). */
const pagePath = (pathname: string): string => pathname.replace(/\/+$/, '') || '/';

export default function SamePageLink({ href, onClick, ...rest }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = new URL(href, window.location.href);
    const here = window.location;

    if (
      target.origin !== here.origin ||
      target.hash ||
      target.search !== here.search ||
      pagePath(target.pathname) !== pagePath(here.pathname)
    ) {
      return;
    }

    event.preventDefault();

    // Drop a #section the contents rail left behind, so the address is the
    // page's own again. The router's state rides along untouched.
    if (here.hash) {
      window.history.replaceState(window.history.state, '', `${here.pathname}${here.search}`);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
