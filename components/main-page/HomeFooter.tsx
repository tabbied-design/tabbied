import SamePageLink from 'components/SamePageLink';
import styles from './HomeFooter.module.css';

// The dark shell's footer, under the homepage, the template gallery and the
// docs; the legal pages and the 404 keep components/Footer. The masthead
// leads to the docs' landing page; every docs page and GitHub are listed
// here, and the legal pages sit in the bottom bar beside the copyright.
// Studio is left out while the generation flow is held back (see CLAUDE.md,
// "Studio"); the artboard's "Colophon" is a page nobody has written.

const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';

// The docs, one link per setup, in the order the /docs landing page lists
// them. A new docs page joins this list and the landing page's cards.
const DEVELOPER_LINKS = [
  ['/docs', 'Overview'],
  ['/docs/concepts', 'Concepts'],
  ['/docs/react', 'React'],
  ['/docs/vue', 'Vue'],
  ['/docs/svelte', 'Svelte'],
  ['/docs/web-component', 'Web component'],
  ['/docs/html', 'Plain HTML'],
  ['/docs/mcp', 'MCP server'],
] as const;


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

        <div>
          <h2 className={styles.heading}>Developers</h2>
          <ul className={styles.links}>
            {DEVELOPER_LINKS.map(([href, label]) => (
              <li key={href}>
                <SamePageLink href={href} prefetch={false}>
                  {label}
                </SamePageLink>
              </li>
            ))}
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <p className={styles.contact}>
            <a href="mailto:hello@tabbied.com">hello@tabbied.com</a>
          </p>
          <p className={styles.contact}>
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

      <div className={styles.bottom}>
        <span className={styles.legal}>
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
