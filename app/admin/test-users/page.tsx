import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import TestUsersPanel from 'components/admin/TestUsersPanel';

export const metadata: Metadata = { title: 'Test users - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage
      eyebrow="Directory"
      title="Test users"
      lede={'Disposable, pre-verified accounts for trying what a member sees: the template allowance, the "Request more" rounds, a customized download.'}
      ledeSpace={30}
    >
      <TestUsersPanel />
    </AdminPage>
  );
}
