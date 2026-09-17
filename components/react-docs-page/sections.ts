// The shape of the contents rail's entries, and the index a section wears in
// the rail and above its heading. Shared by the rail (a client component) and
// the page (a server component), so it lives in a module with no directive:
// a function exported from a 'use client' file cannot be called on the server.

export type DocsSection = { id: string; label: string };

/** "01", "02", ... */
export function sectionIndex(n: number): string {
  return String(n).padStart(2, '0');
}
