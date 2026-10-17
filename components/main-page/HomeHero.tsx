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
import type { SlideView } from './homeShowcase';
import styles from './HomeHero.module.css';

// The homepage's hero (the 15 October design): the pitch and the way into the
// gallery, then a carousel of trades on the hero's ink, each slide a
// photograph of the work with a real template for it in front. Under it, "The
// world still runs on skilled hands." beside the dots and the pause button.
//
// It advances on its own every SLIDE_SECONDS, and the clock is the active
// dot's fill: a CSS animation whose end steps the carousel. So the dot shows
// exactly how long is left, pausing is `animation-play-state`, and under
// reduced motion the stylesheet removes the animation, which removes the
// autoplay with it (the pause button goes too, having nothing to pause). It
// also holds still while the hero is off screen, while a mouse rests on the
// slides, while it is being dragged, and while it has keyboard focus.
//
// A slide is dragged or swiped sideways; the dots are a tab list (one tab
// stop, arrow keys between them), and the slide's arrow, like the site in
// front, opens the template's preview.

const SLIDE_SECONDS = 6;

/** Past this, a drag lands on the next slide; a quicker flick needs less. */
const DRAG_DISTANCE = 60;
const FLICK_DISTANCE = 20;
const FLICK_SPEED = 0.5;

type Drag = { x: number; y: number; time: number; id: number; axis: 'x' | 'y' | null };

export default function HomeHero({ templateCount, slides }: { templateCount: number; slides: SlideView[] }) {
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

  // A pointer resting on the slides holds them: the mouse only, since a tap
  // fires enter with no leave to follow. Not the whole hero, or reading the
  // headline would stop the carousel.
  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setHovered(true);
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setHovered(false);
  };

  // Keyboard focus holds it too; focus left by a click on a dot does not, or
  // one click would stop the carousel until the next click elsewhere.
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
      className={styles.hero}
      aria-labelledby="home-hero-title"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={styles.head}>
        <h1 id="home-hero-title" className={styles.title}>
          Free website templates for <span className={styles.keep}>every trade.</span>
        </h1>
        <GalleryLink href="/templates" className={styles.cta}>
          Pick your template
        </GalleryLink>
        <p className={styles.note}>{templateCount} free templates, patterns included.</p>
      </div>

      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Templates for skilled trades"
        data-dragging={dragX !== null ? '' : undefined}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
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
            // The first slide is in the first screen; the rest wait their turn.
            const loading = k === 0 ? 'eager' : 'lazy';

            return (
              <div
                key={slide.slug}
                id={`home-slide-${k}`}
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
                  loading={loading}
                  fetchPriority={k === 0 ? 'high' : undefined}
                  decoding="async"
                  draggable={false}
                />
                <div className={styles.shade} />
                <div className={styles.caption}>
                  <h2 className={styles.trade}>{slide.trade}</h2>
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
                    loading={loading}
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
        <p className={styles.tagline}>The world still runs on skilled hands.</p>
        <div className={styles.buttons}>
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
                  aria-controls={`home-slide-${k}`}
                  aria-label={slide.name}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(k)}
                >
                  <span className={styles.dotMark}>
                    {on ? (
                      <span
                        // A new key per slide restarts the fill.
                        key={k}
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
      </div>
    </section>
  );
}
