'use client';

import { useEffect, useRef, useState } from 'react';
import { sectionIndex, type DocsSection } from './sections';
import styles from './ReactDocs.module.css';

// The contents rail, with a scroll-spy highlight. A sticky column beside the
// article on desktop; below the desktop breakpoint, a row of pills pinned to
// the top of the viewport that scrolls sideways (see ReactDocs.module.css).
export default function DocsNav({ sections }: { sections: DocsSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) {
      return;
    }

    // The active section is the last heading above the top quarter of the
    // viewport - cheap to compute on the observer's intersection edges.
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.25;
        let current: string | null = headings[0].id;

        for (const heading of headings) {
          if (heading.getBoundingClientRect().top <= line) {
            current = heading.id;
          }
        }

        setActiveId(current);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0, 1] }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [sections]);

  // In the pill row the current section can be off the side of the screen, so
  // it is scrolled into view. Only the row overflows, which is how this tells
  // it from the desktop column.
  useEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller || !activeId || scroller.scrollWidth <= scroller.clientWidth) {
      return;
    }

    const link = scroller.querySelector<HTMLElement>(`a[href="#${activeId}"]`);

    if (!link) {
      return;
    }

    const margin = 24;
    const start = link.offsetLeft - scroller.offsetLeft;
    const end = start + link.offsetWidth;
    const viewStart = scroller.scrollLeft;
    const viewEnd = viewStart + scroller.clientWidth;
    let left: number | null = null;

    if (start < viewStart + margin) {
      left = start - margin;
    } else if (end > viewEnd - margin) {
      left = end - scroller.clientWidth + margin;
    }

    if (left !== null) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scroller.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [activeId]);

  return (
    <nav className={styles.docsNav} aria-label="On this page">
      <p className={styles.docsNavTitle}>On this page</p>
      <div className={styles.docsNavScroll} ref={scrollRef}>
        <ul className={styles.docsNavList}>
          {sections.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={
                  activeId === id
                    ? `${styles.docsNavLink} ${styles.docsNavLinkActive}`
                    : styles.docsNavLink
                }
                aria-current={activeId === id ? 'location' : undefined}
              >
                <span className={styles.docsNavIndex} aria-hidden="true">
                  {sectionIndex(i + 1)}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
