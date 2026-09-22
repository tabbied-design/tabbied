import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import AccountPage from 'components/account/AccountPage';
import YourDownloads from 'components/account/YourDownloads';
import styles from 'components/studio/studio.module.css';

export const metadata: Metadata = {
  title: 'Downloads - Tabbied',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${styles.page} ${plexMono.variable} ${plexSans.variable}`}>
      <AccountPage
        title="Downloads"
        lede="The templates you have taken in the last six months, newest first. A template counts once a month toward your thirty, so taking it again is free."
        action={{ href: '/templates', label: 'Browse templates' }}
      >
        <YourDownloads />
      </AccountPage>
    </div>
  );
}
