import type { ReactNode } from 'react';
import styles from './grid.module.css';

type RowProps = {
  className?: string;
  children?: ReactNode;
};

export default function Row({ className, children }: RowProps) {
  return <div className={className ? `${styles.row} ${className}` : styles.row}>{children}</div>;
}
