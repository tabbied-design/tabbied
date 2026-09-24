import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import { RequestsPanel } from 'components/admin/panels';

export const metadata: Metadata = { title: 'Requests - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage
      eyebrow="Beta access"
      title="Messages from users at the limit"
      lede="Messages from people who have chosen all of their templates. Each person can send one. Reply by email, and choose how many templates to grant."
    >
      <RequestsPanel />
    </AdminPage>
  );
}
