import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import { RequestsPanel } from 'components/admin/panels';

export const metadata: Metadata = { title: 'Requests - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage
      eyebrow="Beta access"
      title="Template requests"
      lede="First requests get an email after about 5 minutes, and the 5 templates are added when the person follows its link. Later requests, from people who have used those too, wait here for review. Reply by email and choose how many to grant."
    >
      <RequestsPanel />
    </AdminPage>
  );
}
