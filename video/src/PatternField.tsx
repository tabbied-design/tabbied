import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { continueRender, delayRender, useCurrentFrame } from 'remotion';
import {
  createPattern,
  type FitMode,
  type OptionValue,
  type PatternController,
  type PatternDefinition,
} from 'tabbied';

// A live Tabbied pattern whose motion is a function of the frame number.
//
// On the site a pattern moves by reseeding on a timer, and each design's own
// CSS transition (~400ms) morphs one arrangement into the next. That clock is
// the browser's, so Remotion, which renders a frame by jumping to it (often
// in several tabs at once, out of order), would catch the morph at random
// points. So this component never lets a transition run: it pauses every
// Animation a change starts and sets its currentTime from the frame. The
// easing stays the design's own, only stretched to `morph` frames.
//
// Each frame is rendered from nothing but the frame number: whatever the
// field currently shows, it is brought to the target state first. That is
// what keeps it correct when a tab renders frames out of order.

export type PatternStep = {
  seed: string;
  palette?: string[];
  options?: Record<string, OptionValue>;
};

type Props = {
  pattern: PatternDefinition;
  /** Arrangements in order; the field holds each, then morphs to the next. */
  steps: PatternStep[];
  /** Frames each step holds before morphing. */
  hold: number;
  /** Frames a morph takes. */
  morph: number;
  /** Morph the last step back into the first, so the field loops. */
  loop?: boolean;
  /** Shift this field's timeline, so tiles in a wall do not move in step. */
  offset?: number;
  fit?: FitMode;
  density?: number;
  style?: CSSProperties;
};

type Target = { from: number; to: number; progress: number | null };

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

function animationsOf(host: HTMLElement): Animation[] {
  const out: Animation[] = [];
  for (const doodle of host.querySelectorAll('css-doodle')) {
    if (doodle.shadowRoot) out.push(...doodle.shadowRoot.getAnimations());
  }
  return out;
}

export function PatternField({
  pattern,
  steps,
  hold,
  morph,
  loop = true,
  offset = 0,
  fit = 'grid',
  density = 0.5,
  style,
}: Props) {
  const frame = useCurrentFrame();
  const hostRef = useRef<HTMLDivElement>(null);
  const controller = useRef<PatternController | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const shown = useRef<string>('');
  const frozen = useRef<{ animations: Animation[]; end: number } | null>(null);

  // Mount once: a field is authored once per scene and its props do not change
  // under it. The queue starts with the mount, so every frame waits for it.
  useLayoutEffect(() => {
    const host = hostRef.current!;
    const handle = delayRender(`mount ${pattern.slug}`);
    const first = steps[0];
    queue.current = new Promise<void>((ready) => {
      controller.current = createPattern(host, {
        pattern,
        seed: first.seed,
        palette: first.palette,
        options: first.options,
        fit,
        density,
        onReady: ready,
      });
    })
      // createPattern mutes transitions for the first two frames; a change
      // made inside that window would cut instead of morph.
      .then(nextFrame)
      .then(nextFrame)
      .then(nextFrame)
      .then(() => {
        shown.current = 'hold:0';
        continueRender(handle);
      });
    return () => {
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const handle = delayRender(`frame ${frame} of ${pattern.slug}`);
    const target = targetAt(frame + offset);
    queue.current = queue.current
      .then(() => show(target))
      .then(() => continueRender(handle));
  }, [frame]);

  function targetAt(f: number): Target {
    const cycle = hold + morph;
    const count = steps.length;
    const index = Math.floor(Math.max(f, 0) / cycle);
    const within = Math.max(f, 0) % cycle;
    if (!loop && index >= count - 1) {
      return { from: count - 1, to: count - 1, progress: null };
    }
    const from = index % count;
    const to = (from + 1) % count;
    if (within < hold || count < 2) return { from, to, progress: null };
    // The last morph frame lands exactly on the next step.
    return { from, to, progress: (within - hold + 1) / morph };
  }

  // Apply a step's config and let the change settle instantly.
  async function settle(index: number) {
    const step = steps[index];
    controller.current!.update({
      seed: step.seed,
      palette: step.palette,
      options: step.options,
    });
    await nextFrame();
    await nextFrame();
    for (const animation of animationsOf(hostRef.current!)) animation.finish();
  }

  async function show({ from, to, progress }: Target) {
    if (!controller.current) return;
    if (progress === null) {
      if (shown.current === `hold:${from}`) return;
      release();
      await settle(from);
      shown.current = `hold:${from}`;
      return;
    }
    if (shown.current !== `morph:${from}`) {
      release();
      if (shown.current !== `hold:${from}`) await settle(from);
      const step = steps[to];
      controller.current.update({
        seed: step.seed,
        palette: step.palette,
        options: step.options,
      });
      await nextFrame();
      const animations = animationsOf(hostRef.current!);
      let end = 0;
      for (const animation of animations) {
        animation.pause();
        end = Math.max(end, Number(animation.effect?.getComputedTiming().endTime ?? 0));
      }
      frozen.current = { animations, end };
      shown.current = `morph:${from}`;
    }
    const { animations, end } = frozen.current!;
    for (const animation of animations) animation.currentTime = progress * end;
  }

  // Finish a frozen morph, which leaves the field on the morph's target.
  function release() {
    if (!frozen.current) return;
    for (const animation of frozen.current.animations) animation.finish();
    frozen.current = null;
    if (shown.current.startsWith('morph:')) shown.current = '';
  }

  return (
    <div
      ref={hostRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
    />
  );
}
