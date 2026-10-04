import SamePageLink from 'components/SamePageLink';
import styles from './HomeFooter.module.css';

// The dark shell's footer, under the homepage, the template gallery and the
// docs; the legal pages and the 404 keep components/Footer. Docs and GitHub
// live here rather than in the masthead, which is for the three destinations.
// Studio is left out while the generation flow is held back (see CLAUDE.md,
// "Studio"); the artboard's "Colophon" is a page nobody has written.

const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';


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
          <h2 className={styles.heading}>Resources</h2>
          <ul className={styles.links}>
            <li>
              <SamePageLink href="/docs/react" prefetch={false}>
                Docs
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/docs/svelte" prefetch={false}>
                Svelte
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/docs/vue" prefetch={false}>
                Vue
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/docs/web-component" prefetch={false}>
                Web component
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/docs/mcp" prefetch={false}>
                MCP server
              </SamePageLink>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <SamePageLink href="/privacy-policy" prefetch={false}>
                Privacy Policy
              </SamePageLink>
            </li>
            <li>
              <SamePageLink href="/terms-of-service" prefetch={false}>
                Terms of Service
              </SamePageLink>
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
        <span>&copy; {new Date().getFullYear()} Tabbied</span>
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
