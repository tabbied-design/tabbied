// Palettes from the Tabbied palette library (lib/paletteLibrary.ts in the
// tabbied repo, the list the pattern editor and the template customizer
// offer). Background first, then the inks: the same shape every Tabbied
// `palette` prop takes. Each scene of the video wears a different one.
export type Palette = { name: string; colors: string[] };

const palette = (name: string, ...colors: string[]): Palette => ({ name, colors });

export const TOUCAN = palette('Toucan', '#0b132b', '#ffce00', '#ff5714', '#1ba1e2', '#f5f5f5');
export const GASLIGHT = palette('Gaslight', '#1a1712', '#d9a441', '#8a6a2f', '#efe2c6');
export const BLUEPRINT = palette('Blueprint', '#12345b', '#ffffff', '#8fb8d9', '#f2c94c');
export const NOCTURNE = palette('Nocturne', '#0d0b1a', '#3a2f6b', '#6f5bb5', '#c2b3f0');
export const RISOGRAPH = palette('Risograph', '#fffdf5', '#ff5c5c', '#3ad1c6', '#f5c518', '#2b2b2b');
export const FORMICA = palette('Formica', '#f0efe8', '#4aa8a0', '#d9a441', '#2b2b2b');
export const HOT_WIRE = palette('Hot Wire', '#0d0221', '#ff2a6d', '#05d9e8', '#d1f7ff');
export const DECO = palette('Deco', '#12100e', '#c9a227', '#e8dcc0', '#2b6b6b');
export const LETTERPRESS = palette('Letterpress', '#f4f0e6', '#1a1a1a', '#6b6357', '#b03a2e');

// The closing montage cycles through these.
export const MONTAGE = [
  palette('Bauhaus', '#f4f1ea', '#d7263d', '#1b6ca8', '#f7b32b', '#232529'),
  palette('Neon', '#0d0d12', '#3fffb2', '#3eecff', '#ff3d8b'),
  palette('Sunset', '#2b1d3a', '#ff6b6b', '#ffd23e', '#ff3d8b', '#7048e8'),
  palette('Offset', '#231f20', '#00aeef', '#ec008c', '#fff200', '#ffffff'),
  palette('Memphis', '#fdfdf8', '#ff3d8b', '#3eecff', '#ffd23e', '#2b2b2b'),
  palette('De Stijl', '#f7f5ef', '#1a1a1a', '#d92b1c', '#f2c811', '#1b4fa8'),
  palette('Arcade', '#12002e', '#ff2079', '#00e5ff', '#f9f871', '#7a04eb'),
  palette('Seventies', '#f5e6c8', '#d1495b', '#edae49', '#00798c', '#30638e'),
  palette('Cyanotype', '#0a3352', '#f0f6fa', '#7fb2d4', '#1f5f8a'),
  palette('Peacock', '#04303b', '#036c5f', '#00b4a0', '#ffd166', '#ef476f'),
  palette('Lagoon', '#04252b', '#0d9488', '#5eead4', '#fef9c3'),
  palette('Ember', '#1a0f0a', '#e0511f', '#ff9f1c', '#ffe8c7'),
];
