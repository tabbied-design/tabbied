import { Fragment } from 'react';
import Link from 'next/link';
import { tokenize } from 'components/react-docs-page/highlight';
import { CopyCode, SamplePattern } from './DevelopersLive';
import { DEV_SAMPLE } from './homeData';
import t from './HomePage.module.css';
import styles from './ForDevelopers.module.css';

// "For developers": the package's pitch, with a code card that is a whole
// working file. It uses the real API (TabbiedPattern from tabbied/react, a
// design from tabbied/patterns, as the React docs do), and the strip under it
// is that file's output, drawn live from the same constants.

const quote = (text: string) => `'${text}'`;

const CODE = `import { TabbiedPattern } from 'tabbied/react';
import { ${DEV_SAMPLE.design} } from 'tabbied/patterns';

const colors = [${DEV_SAMPLE.palette.map(quote).join(', ')}];

export const Hero = () => (
  <TabbiedPattern pattern={${DEV_SAMPLE.design}} palette={colors} height={${DEV_SAMPLE.height}} />
);`;

const LINE_COUNT = CODE.split('\n').length;

const TOKEN_CLASS = {
  comment: styles.comment,
  string: styles.string,
  keyword: styles.keyword,
  tag: styles.tag,
} as const;

/** The sample, colored at build time by the docs' own tokenizer. */
function Highlighted({ code }: { code: string }) {
  return tokenize(code).map((token, i) => {
    if (token.kind === 'plain') {
      return <Fragment key={i}>{token.text}</Fragment>;
    }

    // A tag token is `<Name`; the design colors the name and leaves the
    // bracket plain.
    if (token.kind === 'tag') {
      const [, bracket, name] = /^(<\/?)(.*)$/.exec(token.text) ?? ['', '', token.text];

      return (
        <Fragment key={i}>
          {bracket}
          <span className={TOKEN_CLASS.tag}>{name}</span>
        </Fragment>
      );
    }

    return (
      <span key={i} className={TOKEN_CLASS[token.kind]}>
        {token.text}
      </span>
    );
  });
}

export default function ForDevelopers() {
  return (
    <section id="developers" className={styles.section} aria-labelledby="developers-title">
      <div className={styles.inner}>
        <div>
          <div className={styles.eyebrow}>For developers</div>
          <h2 id="developers-title" className={`${t.title} ${styles.title}`}>
            Patterns, built into your project.
          </h2>
          <p className={`${t.lede} ${styles.lede}`}>Bring Tabbied into your code.</p>
          <Link href="/docs" prefetch={false} className={`${t.textLink} ${styles.more}`}>
            Explore developer tools &#x2197;
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.bar}>
            <span>Hero.jsx</span>
            <CopyCode code={CODE} />
          </div>
          <div className={styles.code}>
            <div className={styles.lines} aria-hidden="true">
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className={styles.source}>
              <code>
                <Highlighted code={CODE} />
              </code>
            </pre>
          </div>
          <SamplePattern />
        </div>
      </div>
    </section>
  );
}
