import type { Metadata } from 'next';
import AdminPage from 'components/admin/AdminPage';
import { TemplatesPanel } from 'components/admin/panels';
import { TEMPLATE_COUNT } from 'lib/siteCounts';

export const metadata: Metadata = { title: 'Templates - Admin', robots: { index: false, follow: false } };

// A server component, so the count is derived (lib/siteCounts).
export default function Page() {
  return (
    <AdminPage
      eyebrow="Library"
      title="Templates"
      lede={`The ${TEMPLATE_COUNT} packaged sites, what each can take, and how many sites were built on it.`}
    >
      <TemplatesPanel />
    </AdminPage>
  );
}
