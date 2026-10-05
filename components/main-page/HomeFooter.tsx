import SamePageLink from 'components/SamePageLink';
import GitHubMark from 'components/GitHubMark';
import styles from './HomeFooter.module.css';

// The dark shell's footer, under the homepage, the template gallery and the
// docs; the legal pages and the 404 keep components/Footer. Four columns on
// a desktop: the name with the contact lines under it, Product, and the
// docs over the last two. The masthead leads to the docs' landing page;
// every docs page is listed here, and GitHub (as its mark) and the legal
// pages sit in the bottom bar beside the copyright. Studio is left out while
// the generation flow is held back (see CLAUDE.md, "Studio"); the artboard's
// "Colophon" is a page nobody has written.

const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';

// The docs, one link per setup, in the order the /docs landing page lists
// them. A new docs page joins this list and the landing page's cards. They
// are set in two of the footer's columns, read down.
const DEVELOPER_LINKS = [
  ['/docs', 'Overview'],
  ['/docs/concepts', 'Concepts'],
  ['/docs/react', 'React'],
  ['/docs/vue', 'Vue'],
  ['/docs/svelte', 'Svelte'],
  ['/docs/web-component', 'Web component'],
  ['/docs/html', 'Plain HTML'],
  ['/docs/javascript', 'JavaScript'],
  ['/docs/mcp', 'MCP server'],
] as const;

/** Rows for the two developer columns: the links, split in half. */
const DEVELOPER_ROWS = Math.ceil(DEVELOPER_LINKS.length / 2);

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.wordmark}>Tabbied</div>
          <p className={styles.blurb}>
            Generative patterns and website templates, drawn live in your
            browser.
          </p>
          <div className={styles.contact}>
            <p>
              <a href="mailto:hello@tabbied.com">hello@tabbied.com</a>
            </p>
            <p>
              Built by{' '}
              <a
                href="https://www.syunghong.com/"
                target="_blank"
                rel="noreferrer"
              >
                Sy
              </a>{' '}
              &amp;{' '}
              <a
                href="https://www.behance.net/yejoopark"
                target="_blank"
                rel="noreferrer"
              >
                Park
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className={styles.heading}>Product</h2>
          <ul className={styles.links}>
            <li>
              <SamePageLink href="/patterns" prefetch={false}>
                Patterns
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/templates" prefetch={false}>
                Websites
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/account" prefetch={false}>
                My account
              </SamePageLink>
            </li>
          </ul>
        </div>

        <div className={styles.developers}>
          <h2 className={styles.heading}>For Developers</h2>
          <ul
            className={`${styles.links} ${styles.developerLinks}`}
            style={{ gridTemplateRows: `repeat(${DEVELOPER_ROWS}, auto)` }}
          >
            {DEVELOPER_LINKS.map(([href, label]) => (
              <li key={href}>
                <SamePageLink href={href} prefetch={false}>
                  {label}
                </SamePageLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.legal}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="Tabbied on GitHub"
            className={styles.github}
          >
            <GitHubMark size={18} />
          </a>
          <span>&copy; {new Date().getFullYear()} Tabbied</span>
          <SamePageLink href="/privacy-policy" prefetch={false}>
            Privacy Policy
          </SamePageLink>
          <SamePageLink href="/terms-of-service" prefetch={false}>
            Terms of Service
          </SamePageLink>
        </span>
        <span>
          Special thanks to{' '}
          <a
            href="https://css-doodle.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.thanks}
          >
            CSS-Doodle
          </a>
        </span>
      </div>
    </footer>
  );
}
