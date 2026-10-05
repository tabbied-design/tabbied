// The shape of the contents rail's entries, and the index a section wears in
// the rail and above its heading. Shared by the rail (a client component) and
// the page (a server component), so it lives in a module with no directive:
// a function exported from a 'use client' file cannot be called on the server.

export type DocsSection = { id: string; label: string };

/** "01", "02", ... */
export function sectionIndex(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * The sections of every setup page (React, Vue, Svelte, plain JavaScript,
 * the web component, plain HTML), in one order with one set of labels, so a
 * reader who knows one page knows where everything is on the others. The
 * Developers page is a menu, not a guide, and has none of them.
 */
export const SETUP_SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'sizing', label: 'Sizing' },
  { id: 'settings', label: 'Settings' },
  { id: 'updates', label: 'Updates, redraw and export' },
  { id: 'motion', label: 'Motion and accessibility' },
  { id: 'server', label: 'Server rendering' },
  { id: 'recipes-layout', label: 'Recipes: layout' },
  { id: 'recipes-state', label: 'Recipes: interaction' },
  { id: 'recipes-integration', label: 'Recipes: in an app' },
  { id: 'sizing-cases', label: 'Sizing, case by case' },
  { id: 'api', label: 'API reference' },
];
