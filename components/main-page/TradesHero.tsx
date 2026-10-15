'use client';

import { useRef, useState, type CSSProperties, type FocusEvent } from 'react';
import Link from 'next/link';
import BrowserBar from './MockBrowser';
import { FIRST_TRADE, MOCK_FONTS, PATTERNS, SECOND_TRADE, TRADES, type Trade } from './homeData';
import styles from './TradesHero.module.css';

// The homepage's hero: the pitch on the left, and on the right two windows
// onto sites for two trades, the one chosen last in front of the one before
// it. Along the hero's foot, a row of fourteen tabs, one per trade, each a
// strip of the pattern its site wears; pointing at one, focusing it or
// clicking it puts its site in the large window and moves the one that was
// there to the small one.
//
// The tabs rise in on load as a CSS animation, staggered by index, so they
// arrive with the first paint rather than after hydration and stop for
// reduced motion without a script. The row is wider than any screen and
// centered; a tab reached by keyboard that sits past an edge slides the row
// until it shows.

/** How far from the band's edges a focused tab is brought, in px. */
const EDGE = 16;

const article = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

/** The colors and faces a window paints a trade's site in, as the properties its rules read. */
function siteVars(trade: Trade, size: 'large' | 'small'): CSSProperties {
  const font = MOCK_FONTS[trade.font];
  const brandSize = (size === 'large' ? 2.6 : 3) * font.scale;
  const headSize = (size === 'large' ? 6.4 : 8.6) * font.scale;
  // The small window's headline is a step lighter, except in a face that
  // has only the one weight to give.
  const headWeight = size === 'large' || font.headWeight === 400 ? font.headWeight : 300;

  return {
    '--site-bg': trade.bg,
    '--site-ink': trade.ink,
    '--site-muted': trade.muted,
    '--site-button-bg': trade.buttonBg,
    '--site-button-ink': trade.buttonInk,
    '--site-brand': `${font.brandWeight} ${brandSize.toFixed(2)}cqw ${font.family}`,
    '--site-head': `${headWeight} ${headSize.toFixed(2)}cqw / ${font.lineHeight} ${font.family}`,
  } as CSSProperties;
}

export default function TradesHero({ templateCount }: { templateCount: number }) {
  const [shown, setShown] = useState({ front: FIRST_TRADE, back: SECOND_TRADE });
  const [shift, setShift] = useState(0);
  const bandRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const front = TRADES[shown.front];
  const back = TRADES[shown.back];

  const pick = (index: number) =>
    setShown((current) =>
      current.front === index ? current : { front: index, back: current.front }
    );

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
            <Link href="/templates" prefetch={false} className={styles.cta}>
              Pick your template
            </Link>
          </div>
          <p className={styles.note}>{templateCount} free templates. No account needed.</p>
        </div>

        <div
          className={styles.showcase}
          role="img"
          aria-label={`Sample websites for ${article(front.label)} ${front.label.toLowerCase()} and ${article(back.label)} ${back.label.toLowerCase()}`}
        >
          <div className={styles.large} style={siteVars(front, 'large')}>
            <BrowserBar domain={front.domain} />
            <div className={styles.siteHead}>
              <span className={styles.brand}>{front.brand}</span>
              <span className={styles.nav}>
                {front.nav.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            </div>
            <div className={styles.siteBody}>
              <div>
                <div className={styles.headline}>{front.head}</div>
                <div className={styles.sub}>{front.sub}</div>
                <span className={styles.button}>{front.cta}</span>
              </div>
              <div className={styles.art}>
                <img
                  src={PATTERNS[front.pattern].src}
                  width={PATTERNS[front.pattern].width}
                  height={PATTERNS[front.pattern].height}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.strip}>
              {front.strip.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className={styles.small} style={siteVars(back, 'small')}>
            <BrowserBar domain={back.domain} className={styles.smallBar} />
            <div className={styles.siteHead}>
              <span className={styles.brand}>{back.brand}</span>
              <span className={styles.nav}>
                {back.nav.slice(0, 3).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            </div>
            <div className={styles.siteBody}>
              <div>
                <div className={styles.headline}>{back.head}</div>
                <span className={styles.button}>{back.cta}</span>
              </div>
              <div className={styles.art}>
                <img
                  src={PATTERNS[back.pattern].src}
                  width={PATTERNS[back.pattern].width}
                  height={PATTERNS[back.pattern].height}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.band} ref={bandRef}>
        <div
          className={styles.row}
          ref={rowRef}
          role="group"
          aria-label="Trades"
          style={{ '--shift': `${shift}px` } as CSSProperties}
        >
          {TRADES.map((trade, index) => {
            const on = index === shown.front;
            const art = PATTERNS[trade.pattern];

            return (
              <span
                key={trade.label}
                className={styles.slot}
                style={{ '--i': index } as CSSProperties}
              >
                <button
                  type="button"
                  className={styles.tab}
                  style={{ height: trade.tabHeight + 24 }}
                  aria-label={`Preview ${article(trade.label)} ${trade.label.toLowerCase()} template`}
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
                    src={art.src}
                    width={art.width}
                    height={art.height}
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
