import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import EmailPreviewPanel from 'components/admin/EmailPreviewPanel';

export const metadata: Metadata = { title: 'Email preview - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage
      eyebrow="Mail"
      title="Email preview"
      lede="Every message the Worker sends, rendered by the code in worker/lib/mail.ts that sends it. Links carry a sample token that does nothing."
      ledeSpace={30}
    >
      <EmailPreviewPanel />
    </AdminPage>
  );
}
