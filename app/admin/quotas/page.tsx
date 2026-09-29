import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import { QuotasPanel } from 'components/admin/panels';

export const metadata: Metadata = { title: 'Quotas - Admin', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AdminPage eyebrow="Caps" title="Quotas" lede="The daily ceilings on each paid endpoint, and how many templates an account may choose. Read-only: they are constants in the code, and the steps below change them.">
      <QuotasPanel />
    </AdminPage>
  );
}
