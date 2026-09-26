import { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { FONT_FACES } from './brand';
import { Open } from './scenes/Open';
import { Hero } from './scenes/Hero';
import { Wall } from './scenes/Wall';
import { Recolor } from './scenes/Recolor';
import { Editor } from './scenes/Editor';
import { Templates } from './scenes/Templates';
import { Site } from './scenes/Site';
import { Code } from './scenes/Code';
import { Outro } from './scenes/Outro';

// The running order, in frames at 30fps. Neighbors cross-fade over FADE
// frames, which the total below accounts for.
const SCENES = [
  { id: 'open', component: Open, frames: 90 },
  { id: 'hero', component: Hero, frames: 180 },
  { id: 'wall', component: Wall, frames: 180 },
  { id: 'recolor', component: Recolor, frames: 210 },
  { id: 'editor', component: Editor, frames: 200 },
  { id: 'templates', component: Templates, frames: 200 },
  { id: 'site', component: Site, frames: 190 },
  { id: 'code', component: Code, frames: 190 },
  { id: 'outro', component: Outro, frames: 150 },
];
const FADE = 15;

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
