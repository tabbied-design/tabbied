import type { ReactNode } from 'react';
import styles from './grid.module.css';

type ContainerProps = {
  className?: string;
  children?: ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={className ? `${styles.container} ${className}` : styles.container}>
      {children}
    </div>
  );
}
