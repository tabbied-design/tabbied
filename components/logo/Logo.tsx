import type { CSSProperties } from 'react';
import { cormorantGaramond } from 'lib/fonts';
import LogoMark from './LogoMark';
import styles from './Logo.module.css';

// The masthead lockup: the mark plus the word. It renders no link of its own;
// each header wraps it in the anchor and label it already has.
//
// The wordmark's font variable is declared *here*, where the word is drawn,
// not on a route or the root layout. On `<html>` the class rides onto every
// template page, which draws no lockup, and the downloaded package then
// carries a class with no rule behind it (e2e/templates.spec.ts catches that).
export default function Logo({
  size = 20,
  wordSize = 18,
  gap = 10,
  className,
  style,
}: {
  size?: number;
  wordSize?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={[cormorantGaramond.variable, styles.lockup, className]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--logo-gap': `${gap}px`,
          '--logo-word-size': `${wordSize}px`,
          ...style,
        } as CSSProperties
      }
    >
      <LogoMark size={size} />
      <span className={styles.word}>tabbied</span>
    </span>
  );
}
