// Palettes are taken from the Tabbied palette library (lib/paletteLibrary.ts
// in the tabbied repo, the list the pattern editor and the template
// customizer offer). Background first, then the inks: the same shape every
// Tabbied `palette` prop takes. Each film keeps its own list beside it.
export type Palette = { name: string; colors: string[] };

export const palette = (name: string, ...colors: string[]): Palette => ({ name, colors });
