import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import { DownloadsPanel } from 'components/admin/panels';

export const metadata: Metadata = { title: 'Downloads - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage
      eyebrow="Library"
      title="Downloads"
      lede="Every template's downloads, by guests and by signed-in accounts, by format, and how many were customized first."
    >
      <DownloadsPanel />
    </AdminPage>
  );
}
