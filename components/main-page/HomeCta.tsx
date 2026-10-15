import GalleryLink from './GalleryLink';
import t from './HomePage.module.css';
import styles from './HomeCta.module.css';

// The last word before the footer: one line and one way in.
export default function HomeCta() {
  return (
    <section className={styles.section} aria-labelledby="home-cta-title">
      <div className={styles.band}>
        <h2 id="home-cta-title" className={`${t.title} ${styles.title}`}>
          Make your next website feel like you.
        </h2>
        <div className={styles.actions}>
          <GalleryLink href="/templates" className={styles.button}>
            Find your template
          </GalleryLink>
        </div>
      </div>
    </section>
  );
}
