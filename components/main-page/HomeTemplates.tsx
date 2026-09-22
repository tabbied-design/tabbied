import Link from 'next/link';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';
import styles from './HomeTemplates.module.css';

// Two rails of template sites drifting in opposite directions. No state and no
// timers: the movement is a CSS animation over a list that is rendered twice, so
// this stays a server component and the whole strip is in the static HTML.

/** Every fifth site, which spreads the sample across the collection's families. */
const SHOWCASE = NEW_TEMPLATE_SITES.filter((_, i) => i % 5 === 0).slice(0, 10);

const ROWS = [SHOWCASE.slice(0, 5), SHOWCASE.slice(5, 10)];

type Site = (typeof SHOWCASE)[number];

/**
 * One card; the second copy of each row is the marquee's seam, not a second
 * list, so it is hidden from assistive tech and out of the tab order - a
 * keyboard user was tabbing through twenty links of which ten were the same
 * ten again.
 */
function Card({ site, clone = false }: { site: Site; clone?: boolean }) {
  return (
    <Link
      // The framed preview, not /template/<slug>/ itself: the frame carries
      // the way back to the gallery and the actions for taking the template,
      // which the bare page has none of. Same destination as a gallery card.
      href={`/templates/${site.slug}/`}
      prefetch={false}
      className={styles.card}
      aria-label={`${site.name} - ${site.topic}`}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
    >
      <span className={styles.chrome} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className={styles.thumb}>
        {/* A plain img: the export runs with images unoptimized, so
            next/image added its client runtime to the homepage to do what
            object-fit does. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/previews/${site.patternSlug}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          className={styles.thumbImage}
        />
      </span>
      {/* The card stands in for a site rather than listing it - the name is on
          the link itself, for anyone not reading the picture. */}
      <span className={styles.bars} aria-hidden="true">
        <span />
        <span />
      </span>
    </Link>
  );
}

export default function HomeTemplates({
  templateCount,
}: {
  templateCount: number;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.rowHeader}>
          <span className={styles.eyebrow}>Website templates</span>
          <Link href="/templates" prefetch={false} className={styles.browseAll}>
            Browse all sites &rarr;
          </Link>
        </div>

        <h2 className={styles.title}>
          {templateCount} sites,
          <br />
          one pattern engine
        </h2>

        <p className={styles.body}>
          Every template starts from the same generative core. Swap the pattern
          and the whole site updates with it.
        </p>
      </div>

      <div className={styles.rails}>
        {ROWS.map((row, i) => (
          <div key={i} className={styles.rail}>
            {/* The list is rendered twice and the track travels exactly half its
                width, so the loop has no seam to hide. */}
            <div className={styles.track} data-direction={i === 1 ? 'right' : 'left'}>
              {[0, 1].map((copy) =>
                row.map((site) => (
                  <Card key={`${copy}-${site.slug}`} site={site} clone={copy === 1} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <Link href="/templates" prefetch={false} className={styles.cta}>
          <span>Explore all {templateCount} templates</span>
          <span className={styles.ctaArrow} aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
