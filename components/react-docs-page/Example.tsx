import type { ComponentProps, ReactNode } from 'react';
import CodeBlock from './CodeBlock';
import styles from './ReactDocs.module.css';

// Pairs a live preview (children) with the source that produced it. The live
// pattern is passed in as children - a client island - so this stays a server
// component.
export default function Example({
  code,
  lang,
  title,
  children,
}: {
  code: string;
  lang?: ComponentProps<typeof CodeBlock>['lang'];
  /** The sample's file name, for the code panel's bar. */
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.example}>
      <div className={styles.preview}>{children}</div>
      <CodeBlock code={code} lang={lang} title={title} />
    </div>
  );
}
