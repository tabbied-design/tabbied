import type { ReactNode } from 'react';
import { plexMono, plexSans } from 'lib/fonts';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
import GitHubMark from 'components/GitHubMark';
import DocsNav from './DocsNav';
import type { DocsSection } from './sections';
import home from 'components/main-page/home.module.css';
import styles from './ReactDocs.module.css';

const NPM_URL = 'https://www.npmjs.com/package/tabbied';
const PACKAGE_URL = 'https://github.com/tabbied-design/tabbied/tree/main/packages/tabbied';

/**
 * The frame of a docs page (/docs, /docs/concepts and the six setup pages):
 * the light section of the homepage shell, the masthead, the heading block
 * with its version chips, the contents rail beside the article, and the dark
 * footer. /docs/mcp draws the same parts inline.
 *
 * `wide` is the Developers page's frame: no rail and no numbered sections,
 * since its parts are choices rather than steps, and a banner that runs the
 * full width of the window straight under the heading, in place of its rule.
 */
export default function DocsShell({
  title,
  lede,
  chips,
  sections = [],
  children,
  banner,
  layout = 'rail',
  linkConcepts = true,
}: {
  title: string;
  lede: ReactNode;
  chips: string[];
  /** The rail's entries; the wide layout has no rail. */
  sections?: DocsSection[];
  children: ReactNode;
  /** A piece the full width of the window between the heading block and the article (the Developers page's pattern). */
  banner?: ReactNode;
  /** The contents rail beside the article, or the article alone at the column's full width. */
  layout?: 'rail' | 'wide';
  /** The footer's pointer to /docs/concepts/, which that page itself leaves out. */
  linkConcepts?: boolean;
}) {
  return (
    <div className={`${home.home} ${plexMono.variable} ${plexSans.variable} ${styles.page}`}>
      <div className={`${home.columnRule} ${home.columnRuleLeft}`} aria-hidden="true" />
      <div className={`${home.columnRule} ${home.columnRuleRight}`} aria-hidden="true" />

      <div className={styles.paper}>
        <SiteNav tone="light" />

        <main className={styles.main}>
          <div className={styles.inner}>
            <header className={banner ? `${styles.head} ${styles.headOpen}` : styles.head}>
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
                    <GitHubMark size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </header>
          </div>

          {banner}

          <div className={styles.inner}>
            <div className={layout === 'wide' ? styles.wide : styles.docs}>
              {layout === 'rail' ? <DocsNav sections={sections} /> : null}
              <article className={layout === 'wide' ? `${styles.article} ${styles.wideArticle}` : styles.article}>
                {children}
                <footer className={styles.articleFooter}>
                  <p>
                    Found a problem or missing something? Open an issue on{' '}
                    <a
                      href="https://github.com/tabbied-design/tabbied/issues"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHubMark size={14} className={styles.inlineMark} />
                      GitHub
                    </a>
                    .
                    {linkConcepts ? (
                      <>
                        {' '}
                        The settings are the same in every setup; the{' '}
                        <a href="/docs/concepts/">Concepts</a> page says what
                        each one does.
                      </>
                    ) : null}
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
