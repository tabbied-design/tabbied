// The credit card film's palettes, one per scene (see ../palettes.ts).
import { palette } from '../palettes';

export const EMERALD = palette('Emerald', '#04160f', '#046b48', '#0bd18a', '#d8f3dc');
export const PAPER = palette('Paper', '#fffdf5', '#232529', '#c9a227');
export const PRIMARY = palette('Primary', '#f7f7f5', '#e63946', '#1d3557', '#f1c40f', '#2a9d8f');
export const MINT = palette('Mint', '#eafff5', '#00b87a', '#232529', '#3e8bff');
export const LAVA = palette('Lava', '#1a0b0b', '#e63e00', '#ff8500', '#ffd500');
export const DUOTONE = palette('Duotone', '#f7f7f7', '#1f2937', '#ff4d6d');
export const COBALT = palette('Cobalt', '#0a1a3f', '#1e4fd6', '#3eecff', '#eef4ff');
export const SEAFOAM = palette('Seafoam', '#f2fdfb', '#88d9c0', '#3aa79b', '#264653');
export const VOLTAGE = palette('Voltage', '#04060f', '#0466c8', '#48cae4', '#e0fbfc');
export const BIOLUMINESCENCE = palette('Bioluminescence', '#03071e', '#00f5d4', '#00bbf9', '#9b5de5');
export const SIGNAL = palette('Signal', '#ffffff', '#0b0b0b', '#ff2d2d');

// The closing montage cycles through these.
export const MONTAGE = [
  palette('Brass', '#f7f2e2', '#c9a227', '#8a6f18', '#3a3010'),
  palette('Mint Chip', '#eafaf1', '#4ecca3', '#2b2b2b', '#a8dadc'),
  palette('Citrus', '#fffbe6', '#ff9f1c', '#2ec4b6', '#e71d36'),
  palette('Royal', '#0a0e2a', '#3a0ca3', '#f72585', '#4cc9f0', '#ffd60a'),
  palette('Jade', '#e9f5ef', '#3ba776', '#14532d', '#f4a261'),
  palette('Tangerine', '#fff4e6', '#ff7b00', '#ff9505', '#16697a', '#489fb5'),
  palette('Copper Patina', '#f0eee6', '#b87333', '#2e8b7d', '#1c3b3a'),
  palette('Sapphire', '#020c1b', '#123c69', '#2e77bb', '#a9d6ff', '#eaf4ff'),
  palette('Marigold', '#fff8e6', '#f4a300', '#e2571e', '#8c2f0d'),
  palette('Fizz', '#fdfffc', '#2ec4b6', '#ff9f1c', '#e71d36', '#011627'),
  palette('Toucan', '#0b132b', '#ffce00', '#ff5714', '#1ba1e2', '#f5f5f5'),
  palette('Gunmetal', '#22262b', '#4f565f', '#8a939c', '#d5dae0'),
];
