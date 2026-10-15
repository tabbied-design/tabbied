import Link from 'next/link';
import t from './HomePage.module.css';
import styles from './BeyondWebsites.module.css';

// "Good patterns go beyond websites": the pattern library's pitch, in two
// pictures of what a pattern becomes off the web. Three framed prints, and a
// pattern exported with a transparent ground and laid over a photograph in a
// design tool.

/** The three prints, left to right: the frame's width in the row, its moulding, and the picture. */
const PRINTS = [
  { src: '/images/home/gallery/radiantswirl.webp', width: 480, height: 480, frame: 'wood', size: 'large' },
  { src: '/images/home/gallery/truchetrings.webp', width: 400, height: 600, frame: 'white', size: 'medium' },
  { src: '/images/home/gallery/scatteredgems.webp', width: 480, height: 480, frame: 'wood', size: 'small' },
] as const;

export default function BeyondWebsites() {
  return (
    <section className={styles.section} aria-labelledby="beyond-websites-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 id="beyond-websites-title" className={t.title}>
            Good patterns go beyond websites.
          </h2>
          <p className={`${t.lede} ${styles.lede}`}>
            Create something for your next print, package, or project.
          </p>
          <div className={styles.links}>
            <Link href="/patterns" prefetch={false} className={t.textLink}>
              Explore customizable patterns &#x2197;
            </Link>
          </div>
        </div>

        <div className={styles.examples}>
          <div>
            <div className={styles.wall}>
              <div className={styles.prints} role="img" aria-label="Three Tabbied patterns, framed as prints on a wall">
                {PRINTS.map((print) => (
                  <div
                    key={print.src}
                    className={`${styles.frame} ${styles[print.frame]} ${styles[print.size]}`}
                  >
                    <img
                      src={print.src}
                      width={print.width}
                      height={print.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <span className={styles.formats}>PNG &#xB7; SVG &#xB7; React</span>
            </div>
            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>Print and display.</h3>
              <p className={styles.captionText}>
                Frame a pattern as wall art, or use it on packaging, posters, and stationery.
              </p>
            </div>
          </div>

          <div>
            <img
              className={styles.layered}
              src="/images/home/gallery/pattern-layer.webp"
              width={1600}
              height={959}
              alt="A Tabbied snow pattern layered over a product photo in a design tool"
              loading="lazy"
              decoding="async"
            />
            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>Layer a pattern over any graphic.</h3>
              <p className={styles.captionText}>
                Export with a transparent background and drop it into your design tool as a fill or
                overlay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
