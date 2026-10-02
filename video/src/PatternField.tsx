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
//
// Outside a morph the field is muted: transitions are switched off except
// while a morph this component started is frozen, and finished if one slips
// through. Anything else that animates runs on the browser's clock, so a
// frame would catch it wherever it happened to be.
//
// The one that did: Remotion renders the composition into a detached node
// and then moves it into the canvas, which disconnects and reconnects every
// <css-doodle>. On reconnect css-doodle reloads, from a setTimeout when the
// element has no text left (its first load empties it), and a reload rebuilds
// the shadow root, dropping any style put there. Under load that timer fired
// after the field was ready and the cells animated in, so the first frames of
// a 4-tab render disagreed with a 1-tab one. So the doodle keeps a space of
// text, which makes a reconnect reload at once instead of later, and a
// MutationObserver puts the mute back the moment a rebuild removes it: that
// runs before the rebuilt cells get their styles, so they arrive without a
// transition. A rebuild during a frozen morph drops its animations, so the
// field forgets what it showed and the next frame sets the morph up again.

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

// A frozen morph is paused, so this leaves it alone.
function finishRunning(host: HTMLElement) {
  for (const animation of animationsOf(host)) {
    if (animation.playState === 'running') animation.finish();
  }
}

// The override createPattern holds under reduced motion (MUTE_TRANSITIONS in
// packages/tabbied/src/core/createPattern.ts), in the doodle's shadow root
// because the cell styles live there. Re-asserted after every update, since
// css-doodle can regenerate the shadow root and take the style with it.
const MUTE =
  'cssd-cell,cssd-cell *,cssd-cell::before,cssd-cell::after{transition:none !important;animation-play-state:paused !important}';

function setMuted(host: HTMLElement, muted: boolean) {
  for (const doodle of host.querySelectorAll('css-doodle')) {
    const root = doodle.shadowRoot;
    if (!root) continue;
    const style = root.querySelector('style[data-video-mute]');
    if (muted && !style) {
      const mute = document.createElement('style');
      mute.setAttribute('data-video-mute', '');
      mute.textContent = MUTE;
      root.appendChild(mute);
    } else if (!muted && style) {
      style.remove();
    }
  }
}

// Watch each doodle's shadow root for a rebuild (see the note at the top).
function watchRebuilds(host: HTMLElement, onRebuild: () => void): () => void {
  const observers: MutationObserver[] = [];
  for (const doodle of host.querySelectorAll('css-doodle')) {
    if (!doodle.textContent) doodle.textContent = ' ';
    if (!doodle.shadowRoot) continue;
    const observer = new MutationObserver(() => {
      if (!doodle.shadowRoot?.querySelector('style[data-video-mute]')) onRebuild();
    });
    observer.observe(doodle.shadowRoot, { childList: true });
    observers.push(observer);
  }
  return () => observers.forEach((observer) => observer.disconnect());
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
  const muted = useRef(true);

  // Mount once: a field is authored once per scene and its props do not change
  // under it. The queue starts with the mount, so every frame waits for it.
  useLayoutEffect(() => {
    const host = hostRef.current!;
    const handle = delayRender(`mount ${pattern.slug}`);
    const first = steps[0];
    let unwatch = () => {};
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
      .then(() => {
        setMuted(host, true);
        unwatch = watchRebuilds(host, () => {
          if (frozen.current) {
            frozen.current = null;
            shown.current = '';
            muted.current = true;
          }
          setMuted(host, muted.current);
        });
      })
      // Past createPattern's own first-paint mute, so nothing it releases is
      // still pending when the first frame is drawn.
      .then(nextFrame)
      .then(nextFrame)
      .then(nextFrame)
      .then(() => {
        finishRunning(host);
        shown.current = 'hold:0';
        continueRender(handle);
      });
    return () => {
      unwatch();
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

  function apply(index: number) {
    const step = steps[index];
    controller.current!.update({
      seed: step.seed,
      palette: step.palette,
      options: step.options,
    });
  }

  function mute(on: boolean) {
    muted.current = on;
    setMuted(hostRef.current!, on);
  }

  // Apply a step muted, so it lands without a transition.
  async function settle(index: number) {
    const host = hostRef.current!;
    mute(true);
    apply(index);
    mute(true);
    await nextFrame();
    finishRunning(host);
  }

  async function show({ from, to, progress }: Target) {
    if (!controller.current) return;
    const host = hostRef.current!;
    finishRunning(host);
    if (progress === null) {
      release();
      if (shown.current === `hold:${from}`) return;
      await settle(from);
      shown.current = `hold:${from}`;
      return;
    }
    if (shown.current !== `morph:${from}`) {
      release();
      if (shown.current !== `hold:${from}`) await settle(from);
      // Unmuted for exactly the change this morph is made of.
      mute(false);
      apply(to);
      await nextFrame();
      const animations = animationsOf(host);
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

  // Finish a frozen morph, which leaves the field on the morph's target, and
  // mute the field again.
  function release() {
    if (!frozen.current) return;
    for (const animation of frozen.current.animations) animation.finish();
    frozen.current = null;
    mute(true);
    if (shown.current.startsWith('morph:')) shown.current = '';
  }

  return (
    <div
      ref={hostRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
    />
  );
}
