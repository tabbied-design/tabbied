import SamePageLink from 'components/SamePageLink';
import GitHubMark from 'components/GitHubMark';
import { Logo } from 'components/logo';
import FooterAccountLink from './FooterAccountLink';
import styles from './HomeFooter.module.css';

// The site's footer, as the 14 October designs draw it: the lockup and the
// masthead's destinations on one line, the copyright and the thanks under
// them. Two tones, like the masthead: `light` under the homepage, `dark`
// under the template gallery and the docs. It declares its own tokens, so it
// reads the same under any page wrapper.
//
// The design's bottom line is the copyright alone; the legal pages and the
// GitHub mark stay beside it, because the Template License (Terms of
// Service, section 7) is linked from everywhere and this is where a reader
// looks for it. Under the docs (`developers`) a line of every docs page sits
// between the two, in the order the /docs landing page lists them: a new docs
// page joins DEVELOPER_LINKS and the landing page's cards.

const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';

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

export default function HomeFooter({
  tone = 'dark',
  developers = false,
}: {
  tone?: 'dark' | 'light';
  /** List every docs page, under the docs. */
  developers?: boolean;
}) {
  return (
    <footer className={styles.footer} data-tone={tone}>
      <div className={styles.row}>
        <SamePageLink href="/" className={styles.logo} aria-label="Tabbied home" prefetch={false}>
          <Logo size={21} wordSize={19} />
        </SamePageLink>
        <nav className={styles.links} aria-label="Footer">
          <SamePageLink href="/templates" prefetch={false}>
            Website templates
          </SamePageLink>
          <SamePageLink href="/patterns" prefetch={false}>
            Patterns
          </SamePageLink>
          <SamePageLink href="/docs" prefetch={false}>
            For developers
          </SamePageLink>
          <FooterAccountLink />
        </nav>
      </div>

      {developers ? (
        <nav className={styles.docs} aria-label="Developer docs">
          <span className={styles.docsLabel}>Docs</span>
          {DEVELOPER_LINKS.map(([href, label]) => (
            <SamePageLink key={href} href={href} prefetch={false}>
              {label}
            </SamePageLink>
          ))}
        </nav>
      ) : null}

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
          <span>&copy; {new Date().getFullYear()} tabbied</span>
          <SamePageLink href="/privacy-policy" prefetch={false}>
            Privacy Policy
          </SamePageLink>
          <SamePageLink href="/terms-of-service" prefetch={false}>
            Terms of Service
          </SamePageLink>
        </span>
        <span>
          Special thanks to{' '}
          <a href="https://css-doodle.com/" target="_blank" rel="noreferrer" className={styles.thanks}>
            CSS-Doodle
          </a>
        </span>
      </div>
    </footer>
  );
}
