import { linearTiming, TransitionSeries, type TransitionPresentation } from '@remotion/transitions';
import { AbsoluteFill } from 'remotion';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;

/** Frames each transition overlaps the two scenes it joins. */
const TRANSITION = 16;

export type Scene = {
  Scene: React.FC;
  frames: number;
  /** How this scene takes over from the one before it. */
  // Presentations differ in their props; the series only passes them through.
  enter?: TransitionPresentation<any>;
};

/** The film's length once the transitions' overlaps are taken out. */
export const filmDuration = (scenes: Scene[]) =>
  scenes.reduce((sum, scene) => sum + scene.frames, 0) - (scenes.length - 1) * TRANSITION;

/** The scenes in order, each handed over by its `enter` transition. */
export const Film: React.FC<{ scenes: Scene[] }> = ({ scenes }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <TransitionSeries>
      {scenes.flatMap(({ Scene, frames, enter }, index) => [
        enter ? (
          <TransitionSeries.Transition
            key={`enter-${index}`}
            presentation={enter}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />
        ) : null,
        <TransitionSeries.Sequence key={`scene-${index}`} durationInFrames={frames}>
          <Scene />
        </TransitionSeries.Sequence>,
      ])}
    </TransitionSeries>
  </AbsoluteFill>
);
