import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import AccountOverview from 'components/account/AccountOverview';
import { TEMPLATE_INDEX } from 'lib/templateIndex';
import styles from 'components/studio/studio.module.css';

export const metadata: Metadata = {
  title: 'Account - Tabbied',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${styles.page} ${plexMono.variable} ${plexSans.variable}`}>
      <AccountOverview index={TEMPLATE_INDEX} />
    </div>
  );
}
