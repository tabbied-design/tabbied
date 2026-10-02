import type { Timing } from '../timeline';

// Scene lengths in frames, each long enough for its line of narration
// (scripts/narration/grace-hopper.json) and the film under a minute.
export const TIMING = [
  { id: 'title', frames: 155 },
  { id: 'clocks', frames: 190 },
  { id: 'markOne', frames: 190 },
  { id: 'bug', frames: 205 },
  { id: 'compiler', frames: 190 },
  { id: 'cobol', frames: 160 },
  { id: 'nanosecond', frames: 205 },
  { id: 'admiral', frames: 220 },
  { id: 'quote', frames: 235 },
  { id: 'outro', frames: 175 },
] as const satisfies Timing;

export type SceneId = (typeof TIMING)[number]['id'];
