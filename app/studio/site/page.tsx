import { Suspense } from 'react';
import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import { DESIGN_CHOICES } from 'lib/designCatalog';
import StudioSite from 'components/studio/StudioSite';
import styles from 'components/studio/studio.module.css';

export const metadata: Metadata = {
  title: 'Customize your site - Tabbied',
  description: 'A website on the template it was built on, with its colors and patterns yours to change.',
  robots: { index: false, follow: false },
};

export default function StudioSitePage() {
  return (
    <div className={`${styles.page} ${plexMono.variable} ${plexSans.variable}`}>
      {/* The site id arrives in the query string, so everything below reads
          useSearchParams and needs a boundary to prerender behind. The design
          list is read here, server-side, and passed down as plain data, so
          the catalog itself never reaches the browser. */}
      <Suspense>
        <StudioSite designs={DESIGN_CHOICES} />
      </Suspense>
    </div>
  );
}
