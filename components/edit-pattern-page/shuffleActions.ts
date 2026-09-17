import { Palette, PanelsLeftBottom, Shuffle, type LucideIcon } from 'lucide-react';

// The three shuffle scopes, shared by the desktop split button
// (ShuffleMenuButton) and the mobile inline panel (7d). "Layout" reseeds the
// pattern, "Colors" rerolls the palette, and "Shuffle" does both.
//
// Layout is drawn as a divided frame rather than a reload, as the design has
// it: the icon names what is being rearranged, and a pair of circling arrows
// reads as "refresh the page" beside two that name their subject.
export type ShuffleAction = 'all' | 'layout' | 'colors';

export const SHUFFLE_STORAGE_KEY = 'tabbied.shuffleAction.v1';

export const SHUFFLE_ACTIONS: {
  id: ShuffleAction;
  label: string;
  Icon: LucideIcon;
}[] = [
  { id: 'all', label: 'Shuffle', Icon: Shuffle },
  { id: 'layout', label: 'Shuffle layout', Icon: PanelsLeftBottom },
  { id: 'colors', label: 'Shuffle colors', Icon: Palette },
];

export const isShuffleAction = (value: unknown): value is ShuffleAction =>
  value === 'all' || value === 'layout' || value === 'colors';
