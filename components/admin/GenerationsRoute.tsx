'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { GenerationsPanel, GenerationDetailPanel } from './panels';
import styles from './admin.module.css';

export default function GenerationsRoute() {
  const id = useSearchParams().get('id');

  if (id) {
    return (
      <>
        <p className={styles.quiet} style={{ marginBottom: 20 }}>
          <Link href="/admin/generations/" prefetch={false}><ArrowLeft size={13} aria-hidden="true" /> All generations</Link>
        </p>
        <GenerationDetailPanel id={id} />
      </>
    );
  }

  return <GenerationsPanel />;
}
