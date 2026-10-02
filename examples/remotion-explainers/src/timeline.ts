// A film's clock, with no React and no browser in it, so the audio script
// (scripts/audio.ts, plain Node) reads the same numbers the films are cut to.
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Frames each transition overlaps the two scenes it joins. */
export const TRANSITION = 16;

export type Timing = readonly { id: string; frames: number }[];

/** The frame each scene starts on, its transition in included. */
export const sceneStarts = (timing: Timing) => {
  const starts: number[] = [];
  let at = 0;
  for (const scene of timing) {
    starts.push(at);
    at += scene.frames - TRANSITION;
  }
  return starts;
};

/** The film's length once the transitions' overlaps are taken out. */
export const timelineDuration = (timing: Timing) =>
  timing.reduce((sum, scene) => sum + scene.frames, 0) - (timing.length - 1) * TRANSITION;
