'use client';

import { useId, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import BrowserBar from './MockBrowser';
import { MOCK_PALETTES, MOCK_PATTERNS, PATTERNS } from './homeData';
import t from './HomePage.module.css';
import styles from './MakeItYours.module.css';

// "Any template. Entirely your own.": one site, and a toolbar along its foot
// that recolors it and swaps its pattern, the two things the customizer
// changes. A picture of the customizer, not the customizer: the site is a
// mockup and the patterns are stills, and the toolbar's last button leads to
// the gallery, where the real one starts.

export default function MakeItYours() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [patternIndex, setPatternIndex] = useState(0);
  const paletteLabel = useId();
  const patternLabel = useId();

  const palette = MOCK_PALETTES[paletteIndex];
  const art = PATTERNS[MOCK_PATTERNS[patternIndex]];

  const siteStyle = {
    '--site-bg': palette.bg,
    '--site-ink': palette.ink,
    '--site-accent': palette.accent,
    '--site-accent-ink': palette.accentInk,
  } as CSSProperties;

  return (
    <section className={styles.section} aria-labelledby="make-it-yours-title">
      <div className={styles.inner}>
        <h2 id="make-it-yours-title" className={t.title}>
          Any template. Entirely your own.
        </h2>
        <p className={`${t.lede} ${styles.lede}`}>
          Change the palette. Swap the pattern. Download it as HTML/CSS or React.
        </p>

        <div
          className={styles.site}
          style={siteStyle}
          role="img"
          aria-label={`Studio Nova, a sample website, in the ${palette.name} palette with the ${art.name} pattern`}
        >
          <BrowserBar domain="studionova.co" className={styles.bar} />
          <div className={styles.siteHead}>
            <span className={styles.brand}>STUDIO NOVA</span>
            <span className={styles.nav}>
              <span>Work</span>
              <span>About</span>
              <span>Journal</span>
              <span>Contact</span>
            </span>
          </div>
          <div className={styles.siteBody}>
            <div>
              <div className={styles.headline}>Ideas in good company.</div>
              <div className={styles.sub}>
                A small design studio making brands, books and spaces for people who care about the
                details.
              </div>
              <span className={styles.button}>View work</span>
            </div>
            <div className={styles.art}>
              <img src={art.src} width={art.width} height={art.height} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.group}>
            <span className={styles.label} id={paletteLabel}>
              Palette
            </span>
            <div className={styles.options} role="group" aria-labelledby={paletteLabel}>
              {MOCK_PALETTES.map((option, k) => (
                <button
                  key={option.name}
                  type="button"
                  className={styles.swatch}
                  style={{ '--a': option.bg, '--b': option.accent } as CSSProperties}
                  aria-label={option.name}
                  title={option.name}
                  aria-pressed={k === paletteIndex}
                  onClick={() => setPaletteIndex(k)}
                />
              ))}
            </div>
          </div>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.group}>
            <span className={styles.label} id={patternLabel}>
              Pattern
            </span>
            <div className={styles.options} role="group" aria-labelledby={patternLabel}>
              {MOCK_PATTERNS.map((name, k) => {
                const thumb = PATTERNS[name];

                return (
                  <button
                    key={name}
                    type="button"
                    className={styles.thumb}
                    aria-label={thumb.name}
                    title={thumb.name}
                    aria-pressed={k === patternIndex}
                    onClick={() => setPatternIndex(k)}
                  >
                    <img
                      src={thumb.src}
                      width={thumb.width}
                      height={thumb.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <Link href="/templates" prefetch={false} className={styles.start}>
            Start with your own template
          </Link>
        </div>
      </div>
    </section>
  );
}
