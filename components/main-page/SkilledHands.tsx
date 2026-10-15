'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import Link from 'next/link';
import useMediaQuery from 'lib/useMediaQuery';
import BrowserBar from './MockBrowser';
import GalleryLink from './GalleryLink';
import type { SlideCategory, SlideView } from './homeShowcase';
import t from './HomePage.module.css';
import styles from './SkilledHands.module.css';

// "The world still runs on skilled hands": a carousel of trades, each slide a
// photograph of the work with a real template for it in front, filtered by
// the chips above it, which are the gallery's own categories.
//
// It advances on its own every SLIDE_SECONDS, and the clock is the active
// dot's fill: a CSS animation whose end steps the carousel. So the dot shows
// exactly how long is left, pausing is `animation-play-state`, and under
// reduced motion the stylesheet removes the animation, which removes the
// autoplay with it (the pause button goes too, having nothing to pause). It
// also holds still while the section is off screen, under a mouse, while it
// is being dragged, and while it has keyboard focus.
//
// A slide is dragged or swiped sideways; the dots are a tab list (one tab
// stop, arrow keys between them), and the slide's arrow, like the site in
// front, opens the template's preview.

const SLIDE_SECONDS = 6;

/** Past this, a drag lands on the next slide; a quicker flick needs less. */
const DRAG_DISTANCE = 60;
const FLICK_DISTANCE = 20;
const FLICK_SPEED = 0.5;

type Category = 'All' | SlideCategory['name'];

type Drag = { x: number; y: number; time: number; id: number; axis: 'x' | 'y' | null };

export default function SkilledHands({
  templateCount,
  slides: allSlides,
  categories,
}: {
  templateCount: number;
  slides: SlideView[];
  categories: SlideCategory[];
}) {
  const [category, setCategory] = useState<Category>('All');
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const sectionRef = useRef<HTMLElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragRef = useRef<Drag | null>(null);
  // Set by a sideways drag, so the click that ends it does not also open a
  // slide or follow its link.
  const movedRef = useRef(false);

  const slides = category === 'All' ? allSlides : allSlides.filter((slide) => slide.category === category);
  const chosen = categories.find((entry) => entry.name === category);
  const count = slides.length;
  const current = Math.min(index, count - 1);
  const autoplay = !reduced;
  const running = autoplay && !userPaused && !hovered && !focused && inView && dragX === null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // In view once any of it reaches the middle half of the screen, however
    // tall the section is against the screen.
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[entries.length - 1].isIntersecting),
      { rootMargin: '-25% 0px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const go = (next: number) => setIndex(Math.max(0, Math.min(count - 1, next)));

  const advance = () => setIndex((i) => (Math.min(i, count - 1) + 1) % count);

  const choose = (next: Category) => {
    setCategory(next);
    setIndex(0);
  };

  // -- Dragging ---------------------------------------------------------------

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      id: event.pointerId,
      axis: null,
    };
    movedRef.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.id) return;

    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;

    // The first few pixels decide the axis: a vertical move is the page
    // scrolling (touch-action leaves it to the browser) and is let go.
    if (!drag.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (drag.axis === 'x') event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (drag.axis !== 'x') return;

    movedRef.current = true;
    // Past either end the track follows at a third of the pointer, the
    // rubber band that says there is nothing more that way.
    const atEdge = (current === 0 && dx > 0) || (current === count - 1 && dx < 0);
    setDragX(atEdge ? dx * 0.35 : dx);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || event.pointerId !== drag.id) return;

    if (drag.axis !== 'x') {
      movedRef.current = false;
      return;
    }

    const dx = event.clientX - drag.x;
    const speed = Math.abs(dx) / Math.max(1, performance.now() - drag.time);
    const far = Math.abs(dx) > DRAG_DISTANCE || (speed > FLICK_SPEED && Math.abs(dx) > FLICK_DISTANCE);

    setDragX(null);
    if (far) go(current + (dx < 0 ? 1 : -1));
    // The click that follows this pointerup still sees the drag.
    setTimeout(() => {
      movedRef.current = false;
    }, 0);
  };

  // -- Pausing ----------------------------------------------------------------

  // A pointer resting on the section holds it: the mouse only, since a tap
  // fires enter with no leave to follow.
  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setHovered(true);
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setHovered(false);
  };

  // Keyboard focus holds it too; focus left by a click on a chip does not,
  // or one click would stop the carousel until the next click elsewhere.
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if ((event.target as Element).matches(':focus-visible')) setFocused(true);
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  // -- The dots, as a tab list ------------------------------------------------

  const onDotsKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: count - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;

    event.preventDefault();
    const target = (next + count) % count;
    setIndex(target);
    dotRefs.current[target]?.focus();
  };

  const trackStyle = {
    transform: `translateX(calc(50% - var(--slide-w) / 2 - ${current} * (var(--slide-w) + var(--slide-gap)) + ${dragX ?? 0}px))`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="skilled-hands-title"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={styles.head}>
        <h2 id="skilled-hands-title" className={`${t.title} ${styles.title}`}>
          The world still runs on skilled hands.
        </h2>
        <p className={`${t.lede} ${styles.lede}`}>
          Start the business you've been thinking about, with a website as well made as your work.
        </p>
        <div className={styles.filters}>
          {(['All', ...categories.map((entry) => entry.name)] as Category[]).map((name) => (
            <button
              key={name}
              type="button"
              className={styles.filter}
              aria-pressed={name === category}
              onClick={() => choose(name)}
            >
              {name}
            </button>
          ))}
          {/* The chip's own category in the gallery, or the whole of it. */}
          <GalleryLink
            href={chosen ? `/templates/?category=${chosen.slug}` : '/templates'}
            className={styles.browseAll}
          >
            <span>
              {chosen ? `Browse all ${chosen.count} in ${chosen.name}` : `Browse all ${templateCount}`} &#x2192;
            </span>
          </GalleryLink>
        </div>
      </div>

      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Templates for skilled trades"
        data-dragging={dragX !== null ? '' : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (movedRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        <div className={styles.track} style={trackStyle}>
          {slides.map((slide, k) => {
            const on = k === current;

            return (
              <div
                key={slide.slug}
                id={`skilled-slide-${k}`}
                className={styles.slide}
                role="tabpanel"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${count}: ${slide.name}`}
                aria-hidden={!on}
                data-current={on ? '' : undefined}
                onClick={() => {
                  if (!on) go(k);
                }}
              >
                <img
                  className={styles.photo}
                  src={`/images/home/slides/${slide.photo}.webp`}
                  width={1600}
                  height={900}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className={styles.shade} />
                <div className={styles.caption}>
                  <div className={styles.category}>{slide.category}</div>
                  <h3 className={styles.name}>{slide.name}</h3>
                  <p className={styles.description}>{slide.description}</p>
                </div>

                {/* The arrow below is the way in for a keyboard or a screen
                    reader; this is the same link for a pointer, so a click on
                    the picture of the site opens that site. On a slide that is
                    not current, a click brings the slide forward instead. */}
                <Link
                  href={slide.href}
                  prefetch={false}
                  className={styles.mock}
                  style={{ '--site-bg': slide.colors[0] } as CSSProperties}
                  aria-hidden="true"
                  tabIndex={-1}
                  draggable={false}
                  onClick={(event) => {
                    if (!on) event.preventDefault();
                  }}
                >
                  <BrowserBar domain={`tabbied.com/templates/${slide.slug}`} />
                  <img
                    className={styles.shot}
                    src={slide.shot}
                    width={960}
                    height={720}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </Link>

                <div className={styles.typeChip}>
                  <span className={styles.swatches} aria-hidden="true">
                    {slide.colors.map((color, i) => (
                      <span key={`${color}-${i}`} style={{ backgroundColor: color }} />
                    ))}
                  </span>
                  {slide.display ? (
                    <span className={styles.setIn}>
                      Set in <span>{slide.display}</span>
                    </span>
                  ) : null}
                </div>

                <Link
                  href={slide.href}
                  prefetch={false}
                  className={styles.open}
                  aria-label={`Preview ${slide.name}, ${slide.kind} template`}
                  tabIndex={on ? undefined : -1}
                  draggable={false}
                >
                  &#x2192;
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <span />
        <div className={styles.dots} role="tablist" aria-label="Slides" onKeyDown={onDotsKey}>
          {slides.map((slide, k) => {
            const on = k === current;

            return (
              <button
                key={slide.slug}
                ref={(element) => {
                  dotRefs.current[k] = element;
                }}
                type="button"
                role="tab"
                className={styles.dot}
                aria-selected={on}
                aria-controls={`skilled-slide-${k}`}
                aria-label={slide.name}
                tabIndex={on ? 0 : -1}
                onClick={() => go(k)}
              >
                <span className={styles.dotMark}>
                  {on ? (
                    <span
                      // A new key per slide (and per filter) restarts the fill.
                      key={`${category}-${k}`}
                      className={styles.fill}
                      style={{
                        animationDuration: `${SLIDE_SECONDS}s`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                      onAnimationEnd={advance}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        {autoplay ? (
          <button
            type="button"
            className={styles.play}
            aria-label={userPaused ? 'Play carousel' : 'Pause carousel'}
            onClick={() => setUserPaused((paused) => !paused)}
          >
            {userPaused ? <span className={styles.playIcon} /> : <span className={styles.pauseIcon} />}
          </button>
        ) : null}
      </div>
    </section>
  );
}
