// The marmot film's palettes, one per scene (see ../palettes.ts).
import { palette } from '../palettes';

export const MARMOT = palette('Marmot', '#efe6d8', '#b58a5e', '#6f4f34', '#33291f');
export const HIGHLAND = palette('Highland', '#e6e9e4', '#8a9a86', '#4f6252', '#2b332c', '#a86a52');
export const SKY = palette('Sky', '#eaf6ff', '#5eaaef', '#2d6fb3', '#ffd166');
export const PEACHY = palette('Peachy', '#fff0e8', '#ffb4a0', '#f2785c', '#7a3b2e');
export const MEADOW = palette('Meadow', '#e7fce3', '#6ca31c', '#27305c');
// Reordered from the library's dark-to-light, so the glints (color 1) are the
// palest ink rather than one barely off the night.
export const SMALL_HOURS = palette('Small Hours', '#0b0e14', '#e8eef6', '#8fa3bd', '#3f5068', '#1e2633');
// Bark first: wovenkhaki weaves its first three colors (a ground and two
// threads), and the cream is the scene's own ground.
export const COCOA = palette('Cocoa', '#4b2e1e', '#d9b382', '#8d6346', '#f5ede1');
export const SUNDOG = palette('Sundog', '#fdf6e9', '#f2b705', '#e8663d', '#4f7fa8', '#2b2b2b');
export const BLIZZARD = palette('Blizzard', '#ffffff', '#dbe4ea', '#93a5b3', '#2f3a45');
export const FERN = palette('Fern', '#f4faf0', '#2d6a4f', '#95d5b2', '#1b4332');

// The closing montage cycles through these.
export const MONTAGE = [
  palette('Taiga', '#101c18', '#24463a', '#4f7f66', '#a8cbb5'),
  palette('Fjord', '#e8eff2', '#6d8a99', '#37525f', '#1a2a30', '#9db07a'),
  palette('Apricot', '#fff3e6', '#f7a55a', '#e26d3a', '#5a3320'),
  palette('Clover', '#eef6ea', '#4caf6d', '#2f6b45', '#183a28'),
  palette('Moss', '#20261c', '#5f7a34', '#a7c957', '#f2f5e9'),
  palette('Juniper', '#e9f0ec', '#3f6b56', '#243f34', '#c07a4b'),
  palette('Cornflower', '#eff3ff', '#6a8fe0', '#3a56a3', '#1c2545'),
  palette('Wisteria', '#f4f0fa', '#a892d6', '#6a55a3', '#332a4d'),
  palette('Marigold', '#fff8e6', '#f4a300', '#e2571e', '#8c2f0d'),
  palette('Thyme', '#eef0e4', '#8a9a5b', '#55663a', '#2e3524'),
  palette('Bluebird', '#eef6ff', '#3a7bd5', '#1b4f9c', '#f4a259', '#12233f'),
  palette('Robin', '#f4efe6', '#6ab7c4', '#e2603f', '#2f3b3a'),
];
