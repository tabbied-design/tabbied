import styles from './MockBrowser.module.css';

// The top of a browser window, for the homepage's pictures of websites: three
// dots, the address in a pill, and a spacer that keeps the pill centered.
// Every size is in `cqw` of the mockup around it (a size container), so a
// mockup scales as one picture; each mockup sets the bar's proportions
// through the --mb-* properties on its own class.
export default function BrowserBar({ domain, className }: { domain: string; className?: string }) {
  return (
    <div className={className ? `${styles.bar} ${className}` : styles.bar}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.address}>{domain}</span>
      <span className={styles.spacer} />
    </div>
  );
}
