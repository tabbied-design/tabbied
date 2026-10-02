import styles from './EditPatternFallback.module.css';

/**
 * What the server renders for a pattern page. The editor reads its state from
 * the query string, so it renders in the browser only (its Suspense boundary
 * bails out to the client at useSearchParams), and the exported page held no
 * heading or text at all for a crawler or an unfurler to read. This is the
 * page's heading and description, hidden the way the editor's own heading is,
 * until the editor replaces it.
 */
export default function EditPatternFallback({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className={styles.srOnly}>{name}</h1>
      {description ? <p className={styles.srOnly}>{description}</p> : null}
    </div>
  );
}
