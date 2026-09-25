import { Suspense } from 'react';
import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import AuthForm from 'components/account/AuthForm';
import AuthShell from 'components/account/AuthShell';

export const metadata: Metadata = {
  title: 'Sign in - Tabbied',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <AuthShell className={`${plexMono.variable} ${plexSans.variable}`}>
      {/* The form reads ?next= to return people where they were sent from. */}
      <Suspense>
        <AuthForm mode="sign-in" />
      </Suspense>
    </AuthShell>
  );
}
