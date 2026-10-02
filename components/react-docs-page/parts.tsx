import type { ReactNode } from 'react';
import styles from './ReactDocs.module.css';
import { sectionIndex, type DocsSection } from './sections';

// The pieces the docs pages (/docs/react, /docs/mcp) write their articles
// from, so the two read as one set of documentation. Server components.

/** Inline code, set in the mono. */
export function Code({ children }: { children: ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>;
}

/** An aside beside the prose, labelled so it reads as one. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.callout}>
      <span className={styles.calloutLabel}>Note</span>
      {children}
    </aside>
  );
}

/**
 * The section component for one page, bound to that page's SECTIONS. The
 * number above each heading is its place in the array, the same index the
 * contents rail shows, so reordering a section renumbers both; a section
 * missing from the array draws "00", the cue that it was forgotten.
 */
export function docsSection(sections: DocsSection[]) {
  return function Section({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: ReactNode;
  }) {
    const index = sections.findIndex((section) => section.id === id) + 1;

    return (
      <section id={id} className={styles.section}>
        <span className={styles.sectionIndex} aria-hidden="true">
          {sectionIndex(index)}
        </span>
        <h2 className={styles.subhead}>
          {title}
          <a className={styles.anchor} href={`#${id}`} aria-label={`Link to ${title}`}>
            #
          </a>
        </h2>
        {children}
      </section>
    );
  };
}
