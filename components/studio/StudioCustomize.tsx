'use client';

// The one door into the customizer from a template: /studio/customize/?slug=.
//
// The template preview's "Use this template" links here rather than holding
// the customizer itself, so there is one place the sign-in detour lives.
// Signed out, the person is sent to sign in with this page as the way back;
// signed in, the customizer opens on the template as an unsaved draft.
// Nothing is written until its first Save (see StudioSite): opening this page
// and leaving used to leave a copy of the template in the account, one per
// visit, phones included, where customizing is not even offered.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { DesignChoice } from 'lib/designCatalog';
import { useSessionUser } from 'lib/authClient';
import { chosenOf, useMyTemplates } from 'lib/myTemplates';
import StudioSite from './StudioSite';
import styles from './StudioPreview.module.css';

const SLUG = /^[a-z0-9-]{1,80}$/;

export default function StudioCustomize({ designs }: { designs: readonly DesignChoice[] }) {
  const params = useSearchParams();
  // Read once: the draft's first Save moves the address to the site's own
  // (/studio/site/?id=) in place, and the slug leaves the query with it.
  const [slug] = useState(() => params.get('slug') ?? '');
  const router = useRouter();
  const { user, isPending } = useSessionUser();
  const templates = useMyTemplates();

  const valid = SLUG.test(slug);

  useEffect(() => {
    if (!valid || isPending || user) return;

    const next = encodeURIComponent(`/studio/customize/?slug=${slug}`);
    router.replace(`/sign-in?next=${next}`);
  }, [valid, isPending, user, slug, router]);

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

  if (isPending || !user) {
    return (
      <p className={styles.notice} role="status">
        Checking your session...
      </p>
    );
  }

  // Saving would make this template one of the person's, and the Worker
  // refuses that when every one they may choose is chosen: say so before
  // they spend time on a draft that cannot be saved.
  if (templates.status === 'ready' && templates.left === 0 && !chosenOf(templates, slug)) {
    return (
      <p className={styles.notice} role="alert">
        You have chosen all {templates.total} of your templates, and this is not one of them. Keep
        customizing those from{' '}
        <Link href="/account/" className={styles.back} prefetch={false}>
          your account
        </Link>
        .
      </p>
    );
  }

  return <StudioSite designs={designs} template={slug} />;
}
