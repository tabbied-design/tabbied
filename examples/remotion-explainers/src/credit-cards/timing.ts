import type { Timing } from '../timeline';

// Scene lengths in frames, each long enough for its line of narration
// (scripts/narration/credit-cards.json).
export const TIMING = [
  { id: 'title', frames: 195 },
  { id: 'purchase', frames: 240 },
  { id: 'split', frames: 335 },
  { id: 'cashBack', frames: 250 },
  { id: 'interest', frames: 280 },
  { id: 'whoPays', frames: 260 },
  { id: 'whoProfits', frames: 360 },
  { id: 'debit', frames: 350 },
  { id: 'phones', frames: 290 },
  { id: 'publicMoney', frames: 330 },
  { id: 'verdict', frames: 325 },
  { id: 'outro', frames: 210 },
] as const satisfies Timing;

export type SceneId = (typeof TIMING)[number]['id'];
