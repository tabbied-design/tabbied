import { linearTiming, TransitionSeries, type TransitionPresentation } from '@remotion/transitions';
import { AbsoluteFill } from 'remotion';
import { TRANSITION, type Timing } from '../timeline';

export { FPS, HEIGHT, WIDTH } from '../timeline';

export type Cast<Id extends string> = Record<
  Id,
  {
    Scene: React.FC;
    /** How this scene takes over from the one before it. */
    // Presentations differ in their props; the series only passes them through.
    enter?: TransitionPresentation<any>;
  }
>;

/**
 * The scenes in the order and at the lengths `timing` gives, each handed over
 * by its `enter` transition. The lengths live in a plain module (timing.ts)
 * so the audio script lays the narration on the same clock.
 */
export const Film = <Id extends string>({ timing, cast }: { timing: Timing; cast: Cast<Id> }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <TransitionSeries>
      {timing.flatMap(({ id, frames }) => {
        const { Scene, enter } = cast[id as Id];
        return [
          enter ? (
            <TransitionSeries.Transition
              key={`enter-${id}`}
              presentation={enter}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />
          ) : null,
          <TransitionSeries.Sequence key={id} durationInFrames={frames}>
            <Scene />
          </TransitionSeries.Sequence>,
        ];
      })}
    </TransitionSeries>
  </AbsoluteFill>
);
