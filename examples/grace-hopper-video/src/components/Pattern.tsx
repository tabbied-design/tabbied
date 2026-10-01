import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { TabbiedPattern, type TabbiedPatternProps } from 'tabbied/react';

/**
 * TabbiedPattern, made safe to photograph.
 *
 * A pattern draws after mount (its grid is derived from the measured box), and
 * a new seed or palette is drawn by an effect after the render that asked for
 * it. Remotion would otherwise take the frame's picture before either landed,
 * so this holds the frame with delayRender() until the pattern has painted:
 * once for the first draw (TabbiedPattern's onReady) and once for every frame
 * whose seed, palette or options changed.
 *
 * Two rules keep a render deterministic, and the scenes follow both: the seed
 * is a function of the frame (never `redrawInterval`, which is a clock), and
 * a pattern's box is never resized during a shot (a resize re-derives the grid
 * on a debounce). Move, scale and clip the box with transforms instead.
 */
export const Pattern: React.FC<TabbiedPatternProps> = ({ onReady, ...props }) => {
  const name = props.pattern.name;
  const [mount] = useState(() => delayRender(`Drawing the ${name} pattern`));
  const drawn = useRef(false);

  const handleReady = useCallback(() => {
    drawn.current = true;
    continueRender(mount);
    onReady?.();
  }, [mount, onReady]);

  // A scene that ends before its pattern drew must not hold the render.
  useEffect(
    () => () => {
      if (!drawn.current) continueRender(mount);
    },
    [mount]
  );

  const signature = JSON.stringify([
    props.seed,
    props.palette,
    props.options,
    props.density,
    props.cellSize,
  ]);
  const previous = useRef(signature);
  const pending = useRef<number | null>(null);

  // Taken during the commit, so the frame is held before Remotion can look.
  useLayoutEffect(() => {
    if (previous.current === signature) return;
    previous.current = signature;
    pending.current = delayRender(`Redrawing the ${name} pattern`);
  }, [signature, name]);

  // Effects run child first, so TabbiedPattern has pushed the change into the
  // <css-doodle> by now; two frames later it has been styled and painted.
  useEffect(() => {
    const handle = pending.current;
    if (handle === null) return;
    pending.current = null;

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      continueRender(handle);
    };
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(release);
    });

    return () => {
      cancelAnimationFrame(raf);
      release();
    };
  }, [signature]);

  return <TabbiedPattern {...props} onReady={handleReady} />;
};

/** A seed that changes every `every` frames: a stop-motion reseed. */
export const beatSeed = (base: string, frame: number, every: number) =>
  `${base}-${Math.floor(frame / every)}`;
