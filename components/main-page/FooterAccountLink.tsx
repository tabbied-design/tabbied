'use client';

import SamePageLink from 'components/SamePageLink';
import { useSessionUser } from 'lib/authClient';

// The footer's last link: "Log in" as the design draws it, or the account for
// someone already signed in, who has nothing to log into. The export draws
// the signed-out face, the same as the masthead does.

export default function FooterAccountLink() {
  const { user } = useSessionUser();

  return user ? (
    <SamePageLink href="/account" prefetch={false}>
      My account
    </SamePageLink>
  ) : (
    <SamePageLink href="/sign-in?next=%2Faccount" prefetch={false}>
      Log in
    </SamePageLink>
  );
}
