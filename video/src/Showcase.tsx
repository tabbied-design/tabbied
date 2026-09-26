import { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { FONT_FACES } from './brand';
import { Patterns } from './scenes/Patterns';
import { Recolor } from './scenes/Recolor';
import { Editor } from './scenes/Editor';
import { Templates } from './scenes/Templates';
import { Site } from './scenes/Site';
import { Code } from './scenes/Code';
import { Outro } from './scenes/Outro';

// The running order, in frames at 30fps. Neighbors cross-fade over FADE
// frames, which the total below accounts for.
const SCENES = [
  { id: 'patterns', component: Patterns, frames: 105 },
  { id: 'recolor', component: Recolor, frames: 110 },
  { id: 'editor', component: Editor, frames: 105 },
  { id: 'templates', component: Templates, frames: 110 },
  { id: 'site', component: Site, frames: 105 },
  { id: 'code', component: Code, frames: 110 },
  { id: 'outro', component: Outro, frames: 90 },
];
const FADE = 10;

export const SHOWCASE_FRAMES =
  SCENES.reduce((sum, scene) => sum + scene.frames, 0) - FADE * (SCENES.length - 1);

export function Showcase() {
  // Hold the first frame until every face has loaded, so no frame is drawn
  // in a fallback font.
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONT_FACES.map((face) => document.fonts.load(face))).then(() => continueRender(handle));
  }, [handle]);

  return (
    <TransitionSeries>
      {SCENES.flatMap(({ id, component: Scene, frames }, i) => [
        ...(i > 0
          ? [
              <TransitionSeries.Transition
                key={`${id}-in`}
                presentation={fade()}
                timing={linearTiming({ durationInFrames: FADE })}
              />,
            ]
          : []),
        <TransitionSeries.Sequence key={id} durationInFrames={frames}>
          <Scene />
        </TransitionSeries.Sequence>,
      ])}
    </TransitionSeries>
  );
}
