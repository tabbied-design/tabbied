import type { Timing } from '../timeline';

// Scene lengths in frames, each long enough for its line of narration
// (scripts/narration/marmots.json).
export const TIMING = [
  { id: 'title', frames: 215 },
  { id: 'range', frames: 190 },
  { id: 'whistle', frames: 240 },
  { id: 'greeting', frames: 240 },
  { id: 'feast', frames: 185 },
  { id: 'sleep', frames: 230 },
  { id: 'huddle', frames: 230 },
  { id: 'groundhog', frames: 215 },
  { id: 'whistler', frames: 205 },
  { id: 'comeback', frames: 315 },
  { id: 'outro', frames: 190 },
] as const satisfies Timing;

export type SceneId = (typeof TIMING)[number]['id'];
