import Link from 'next/link';
import styles from './HomeFooter.module.css';

// The dark shell's footer, under the homepage, the template gallery and the
// docs; the legal pages and the 404 keep components/Footer. Docs and GitHub
// live here rather than in the masthead, which is for the three destinations.
// Studio is left out while the generation flow is held back (see CLAUDE.md,
// "Studio"); the artboard's "Colophon" is a page nobody has written.

const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';

// Product Hunt's embed for the Tabbied 2.0 launch, as Product Hunt issued it.
const PRODUCT_HUNT_URL =
  'https://www.producthunt.com/products/tabbied?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-tabbied-2-0-pattern-website-generator';
const PRODUCT_HUNT_BADGE =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1267187&theme=dark&t=1790910639393';

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
          {/* A lazy <img> with its size set, as components/Footer does: the
              request to Product Hunt waits until the footer is near, never
              holds up the page's load event, and the row doesn't move when
              it arrives. */}
          <a
            href={PRODUCT_HUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_HUNT_BADGE}
              alt="Tabbied 2.0: Pattern & Website Generator - Free patterns and website templates, yours to shape. | Product Hunt"
              width={250}
              height={54}
              loading="lazy"
              decoding="async"
            />
          </a>
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
              <Link href="/account" prefetch={false}>
                My account
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
