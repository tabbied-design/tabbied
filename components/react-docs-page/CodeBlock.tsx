import { Fragment } from 'react';
import styles from './ReactDocs.module.css';
import CopyButton from './CopyButton';
import { tokenize, type Token, type TokenKind } from './highlight';

// The bar names the sample: a title where one is given (a filename, the
// terminal), the language otherwise.
const LANG_LABEL = {
  tsx: 'tsx',
  ts: 'typescript',
  sh: 'shell',
} as const;

type CodeLang = keyof typeof LANG_LABEL;

const TOKEN_CLASS: Record<Exclude<TokenKind, 'plain'>, string> = {
  comment: styles.tokenComment,
  string: styles.tokenString,
  keyword: styles.tokenKeyword,
  tag: styles.tokenTag,
};

// A presentational code panel with a label bar, a copy button and light
// syntax colouring. Server component apart from the CopyButton island: the
// tokens are computed once, at build time.
export default function CodeBlock({
  code,
  title,
  lang = 'tsx',
  className,
}: {
  code: string;
  /** Optional label rendered in the panel's top bar (e.g. a filename). */
  title?: string;
  lang?: CodeLang;
  className?: string;
}) {
  // A shell line has no grammar worth colouring.
  const tokens: Token[] =
    lang === 'sh' ? [{ kind: 'plain', text: code }] : tokenize(code);

  return (
    <div
      className={[styles.codePanel, className].filter(Boolean).join(' ')}
    >
      <div className={styles.codePanelBar}>
        <span className={styles.codePanelTitle}>{title ?? LANG_LABEL[lang]}</span>
        <CopyButton code={code} />
      </div>
      <pre className={styles.codeBlock}>
        <code>
          {tokens.map((token, i) =>
            token.kind === 'plain' ? (
              <Fragment key={i}>{token.text}</Fragment>
            ) : (
              <span key={i} className={TOKEN_CLASS[token.kind]}>
                {token.text}
              </span>
            )
          )}
        </code>
      </pre>
    </div>
  );
}
