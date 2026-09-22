import { Suspense } from 'react';
import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import StudioHeader from 'components/studio/StudioHeader';
import SiteShare from 'components/studio/SiteShare';
import styles from 'components/studio/studio.module.css';

export const metadata: Metadata = {
  title: 'Shared site - Tabbied',
  description: 'A website made with Tabbied.',
  robots: { index: false, follow: false },
};

export default function SharePage() {
  return (
    <div className={`${styles.page} ${plexMono.variable} ${plexSans.variable}`}>
      <StudioHeader backHref="/templates" backLabel="Make your own from a template" title="Shared" />
      <Suspense>
        <SiteShare />
      </Suspense>
    </div>
  );
}
