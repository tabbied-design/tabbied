import type { ReactNode } from 'react';
import { plexMono, plexSans } from 'lib/fonts';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
import DocsNav from './DocsNav';
import type { DocsSection } from './sections';
import home from 'components/main-page/home.module.css';
import styles from './ReactDocs.module.css';

const NPM_URL = 'https://www.npmjs.com/package/tabbied';
const PACKAGE_URL = 'https://github.com/tabbied-design/tabbied/tree/main/packages/tabbied';

/**
 * The frame of a docs page for one of the tabbied package's entry points
 * (/docs/svelte, /docs/vue): the light section of the homepage shell, the
 * masthead, the heading block with its version chips, the contents rail
 * beside the article, and the dark footer. The same parts /docs/react and
 * /docs/mcp draw inline.
 */
export default function DocsShell({
  title,
  lede,
  chips,
  sections,
  children,
}: {
  title: string;
  lede: ReactNode;
  chips: string[];
  sections: DocsSection[];
  children: ReactNode;
}) {
  return (
    <div className={`${home.home} ${plexMono.variable} ${plexSans.variable} ${styles.page}`}>
      <div className={`${home.columnRule} ${home.columnRuleLeft}`} aria-hidden="true" />
      <div className={`${home.columnRule} ${home.columnRuleRight}`} aria-hidden="true" />

      <div className={styles.paper}>
        <SiteNav tone="light" />

        <main className={styles.main}>
          <div className={styles.inner}>
            <header className={styles.head}>
              <div>
                <p className={styles.eyebrow}>Documentation</p>
                <h1 className={styles.title}>{title}</h1>
              </div>
              <div>
                <p className={styles.lede}>{lede}</p>
                <div className={styles.meta}>
                  {chips.map((chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                  <a className={styles.chipLink} href={NPM_URL} target="_blank" rel="noreferrer">
                    npm
                  </a>
                  <a className={styles.chipLink} href={PACKAGE_URL} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </header>

            <div className={styles.docs}>
              <DocsNav sections={sections} />
              <article className={styles.article}>
                {children}
                <footer className={styles.articleFooter}>
                  <p>
                    Found a problem or missing something? Open an issue on{' '}
                    <a
                      href="https://github.com/tabbied-design/tabbied/issues"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                    . The props, fit modes, palettes and options are the same
                    in every entry point; the{' '}
                    <a href="/docs/react/">React docs</a> cover them with live
                    examples.
                  </p>
                </footer>
              </article>
            </div>
          </div>
        </main>
      </div>

      <HomeFooter />
    </div>
  );
}
