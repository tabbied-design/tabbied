'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// A link into the template gallery that starts fetching it when a person
// shows they are about to follow it: a pointer over it, a finger on it, or
// keyboard focus. The gallery's payload is large (every card's pattern, about
// 100 KB compressed), so prefetching it on sight would charge every homepage
// visit for it, and not prefetching at all left a click with nothing to show
// for a second or two: the guest audit of 2026-10-15 clicked "Pick your
// template", saw nothing happen and clicked again.

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'prefetch'> & { href: string };

export default function GalleryLink({ href, onPointerEnter, onFocus, onTouchStart, ...rest }: Props) {
  const router = useRouter();
  const warm = () => router.prefetch(href);

  return (
    <Link
      href={href}
      prefetch={false}
      onPointerEnter={(event) => {
        warm();
        onPointerEnter?.(event);
      }}
      onFocus={(event) => {
        warm();
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        warm();
        onTouchStart?.(event);
      }}
      {...rest}
    />
  );
}
