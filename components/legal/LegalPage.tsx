import type { ReactNode } from 'react';
import MainHeader from 'components/main-page/MainHeader';
import Footer from 'components/Footer';
import styles from './LegalPage.module.css';

// The frame of the Terms of Service and the Privacy Policy: the light
// masthead (scripts/capture-email-lockup.mjs photographs the lockup in it on
// /terms-of-service/, so it stays), one readable column, and the content
// pages' footer. The documents themselves are plain h2 / h3 / p / ul inside,
// styled here, so editing one is editing prose.

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /** "October 2, 2026": when the text last changed in substance. */
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <MainHeader />

      <main className={styles.main}>
        <article className={styles.doc}>
          <h1>{title}</h1>
          <p className={styles.updated}>Last updated: {updated}</p>
          {children}
        </article>
      </main>

      <Footer />
    </>
  );
}

/** The plain-language summary at the top of each document. */
export function InShort({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.summary} aria-label="Summary">
      <h2>In short</h2>
      {children}
    </aside>
  );
}
