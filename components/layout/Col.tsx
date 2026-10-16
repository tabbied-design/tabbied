import type { CSSProperties, ReactNode } from 'react';
import styles from './grid.module.css';

/** A span number (out of 12) or a span with an offset. */
type ColSpec = number | { span?: number; offset?: number };

type Breakpoint = 'md' | 'lg';

type ColProps = {
  md?: ColSpec;
  lg?: ColSpec;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

const breakpoints: Breakpoint[] = ['md', 'lg'];

const toPercent = (n: number) => `${+((n / 12) * 100).toFixed(4)}%`;

export default function Col({
  className,
  style,
  children,
  ...spans
}: ColProps) {
  const vars: Record<string, string> = {};

  for (const bp of breakpoints) {
    const spec = spans[bp];
    if (spec == null) continue;

    const { span, offset } = typeof spec === 'number' ? { span: spec } : spec;

    if (span != null) vars[`--col-${bp}`] = toPercent(span);
    if (offset != null) vars[`--off-${bp}`] = offset === 0 ? '0' : toPercent(offset);
  }

  const classes = className ? `${styles.col} ${className}` : styles.col;

  return (
    <div className={classes} style={{ ...vars, ...style } as CSSProperties}>
      {children}
    </div>
  );
}
