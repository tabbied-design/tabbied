import Link from 'next/link';
import StudioSpark from './StudioSpark';
import styles from './HomeFooter.module.css';

// The dark shell's footer, under the homepage, the template gallery and the
// docs. The legal pages and the 404 keep the shared light Footer in
// components/Footer.
//
// Docs and GitHub live here rather than in the masthead: the bar is for the
// three destinations, and this is where the artboards put everything else. The
// legal pages stay listed because they exist; the artboard's "Colophon" is a
// page nobody has written.

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
              <Link href="/patterns" prefetch={false}>
                Patterns
              </Link>
            </li>
            <li>
              <Link href="/templates" prefetch={false}>
                Websites
              </Link>
            </li>
            <li>
              <Link href="/studio" prefetch={false} className={styles.studio}>
                <StudioSpark size={10} />
                Studio
              </Link>
            </li>
            <li>
              <Link href="/account" prefetch={false}>
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Resources</h2>
          <ul className={styles.links}>
            <li>
              <Link href="/docs/react" prefetch={false}>
                Docs
              </Link>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/privacy-policy" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" prefetch={false}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <p className={styles.contact}>
            <a href={`${GITHUB_URL}issues`} target="_blank" rel="noreferrer">
              Questions and requests
            </a>
            <br />
            Built by <a href="https://www.syunghong.com/">Sy</a> &amp;{' '}
            <a href="https://www.behance.net/yejoopark">Park</a>
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} tabbied</span>
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
