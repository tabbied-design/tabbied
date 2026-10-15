'use client';

// The one door into the customizer from a template: /studio/customize/?slug=.
//
// The gallery's cards and the template preview's "Use this template" lead
// here, and it opens for anyone: customizing and downloading need no account.
// The template opens as an unsaved draft, and nothing is written until its
// first Save, which is the one thing that asks for an account (the save gate
// in StudioSite).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { DesignChoice } from 'lib/designCatalog';
import { track } from 'lib/events';
import StudioSite from './StudioSite';
import styles from './StudioPreview.module.css';

const SLUG = /^[a-z0-9-]{1,80}$/;

export default function StudioCustomize({ designs }: { designs: readonly DesignChoice[] }) {
  const params = useSearchParams();
  // Read once: the draft's first Save moves the address to the site's own
  // (/studio/site/?id=) in place, and the slug leaves the query with it.
  const [slug] = useState(() => params.get('slug') ?? '');

  const valid = SLUG.test(slug);

  // One customizer session per visit, for the admin overview's count.
  useEffect(() => {
    if (valid) track('customize', slug);
  }, [valid, slug]);

  if (!valid) {
    return (
      <p className={styles.notice} role="alert">
        That template link is incomplete.{' '}
        <Link href="/templates" className={styles.back} prefetch={false}>
          All templates
        </Link>
        .
      </p>
    );
  }

  return <StudioSite designs={designs} template={slug} />;
}
