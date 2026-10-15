'use client';

import { useRef, useState, type CSSProperties, type FocusEvent } from 'react';
import Link from 'next/link';
import GalleryLink from './GalleryLink';
import BrowserBar from './MockBrowser';
import { FIRST_TRADE, SECOND_TRADE } from './homeData';
import type { HeroTradeView } from './homeShowcase';
import styles from './TradesHero.module.css';

// The homepage's hero: the pitch on the left, and on the right two windows
// onto real templates for two trades, the one chosen last in front of the one
// before it. Each window is the template's screenshot and a link to its
// preview, so what the hero shows is what a click opens. Along the hero's
// foot, a row of fourteen tabs, one per trade, each a strip of the pattern
// its template wears; pointing at one, focusing it or clicking it puts its
// template in the large window and moves the one that was there to the small
// one.
//
// The tabs rise in on load as a CSS animation, staggered by index, so they
// arrive with the first paint rather than after hydration and stop for
// reduced motion without a script. The row is wider than any screen and
// centered; a tab reached by keyboard that sits past an edge slides the row
// until it shows.

/** How far from the band's edges a focused tab is brought, in px. */
const EDGE = 16;

/** The address a window's bar shows: where the template actually is. */
const address = (trade: HeroTradeView) => `tabbied.com/templates/${trade.slug}`;

function Window({ trade, size }: { trade: HeroTradeView; size: 'large' | 'small' }) {
  return (
    <Link
      href={trade.href}
      prefetch={false}
      className={size === 'large' ? styles.large : styles.small}
      style={{ '--site-bg': trade.colors[0] } as CSSProperties}
      aria-label={`Preview ${trade.name}, ${trade.kind} template`}
    >
      <BrowserBar domain={address(trade)} className={size === 'small' ? styles.smallBar : undefined} />
      {/* Keyed, so a new template fades in rather than swapping under the old one. */}
      <img key={trade.slug} className={styles.shot} src={trade.shot} width={960} height={720} alt="" />
    </Link>
  );
}

export default function TradesHero({ templateCount, trades }: { templateCount: number; trades: HeroTradeView[] }) {
  const [shown, setShown] = useState({ front: FIRST_TRADE, back: SECOND_TRADE });
  const [shift, setShift] = useState(0);
  const bandRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const warmed = useRef(false);

  const front = trades[shown.front];
  const back = trades[shown.back];

  const pick = (index: number) =>
    setShown((current) =>
      current.front === index ? current : { front: index, back: current.front }
    );

  // A pointer or focus arriving at the row is someone about to browse it, so
  // every screenshot is fetched then, once, rather than on the first paint
  // (fourteen of them) or as each tab is reached (a blank window per tab).
  const warm = () => {
    if (warmed.current) return;
    warmed.current = true;

    for (const trade of trades) {
      const image = new Image();
      image.src = trade.shot;
    }
  };

  // Keyboard focus only: a click focuses the tab too, and sliding the row
  // under a pointer that has not moved would put the next tab under it.
  const reveal = (event: FocusEvent<HTMLButtonElement>) => {
    const slot = event.currentTarget.parentElement;
    const band = bandRef.current;
    const row = rowRef.current;

    if (!slot || !band || !row || !event.currentTarget.matches(':focus-visible')) {
      return;
    }

    // Measured from layout, not from the screen, so a slide still under way
    // does not skew the answer: the row is centered in the band, then shifted.
    const left = (band.clientWidth - row.offsetWidth) / 2 + slot.offsetLeft;
    const right = left + slot.offsetWidth;

    setShift((current) => {
      if (left + current < EDGE) return EDGE - left;
      if (right + current > band.clientWidth - EDGE) return band.clientWidth - EDGE - right;
      return current;
    });
  };

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="home-hero-title" className={styles.title}>
            Websites with personality.
          </h1>
          <p className={styles.intro}>
            For florists, electricians, bakers, and every trade in between, with generated patterns
            in place of stock photos.
          </p>
          <div className={styles.actions}>
            <GalleryLink href="/templates" className={styles.cta}>
              Pick your template
            </GalleryLink>
          </div>
          <p className={styles.note}>{templateCount} free templates. No account needed.</p>
        </div>

        <div className={styles.showcase}>
          <Window trade={front} size="large" />
          <Window trade={back} size="small" />
        </div>
      </div>

      <div className={styles.band} ref={bandRef}>
        <div
          className={styles.row}
          ref={rowRef}
          role="group"
          aria-label="Trades"
          style={{ '--shift': `${shift}px` } as CSSProperties}
          onPointerEnter={warm}
          onFocus={warm}
        >
          {trades.map((trade, index) => {
            const on = index === shown.front;

            return (
              <span
                key={trade.slug}
                className={styles.slot}
                style={{ '--i': index } as CSSProperties}
              >
                <button
                  type="button"
                  className={styles.tab}
                  style={{ height: trade.tabHeight + 24, backgroundColor: trade.colors[0] }}
                  aria-label={`${trade.label}: ${trade.name}`}
                  aria-pressed={on}
                  onMouseEnter={() => pick(index)}
                  onFocus={(event) => {
                    pick(index);
                    reveal(event);
                  }}
                  onClick={() => pick(index)}
                >
                  <img
                    className={styles.tabArt}
                    src={trade.tab}
                    width={400}
                    height={200}
                    alt=""
                    draggable={false}
                  />
                  <span className={styles.pill}>{trade.label}</span>
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
