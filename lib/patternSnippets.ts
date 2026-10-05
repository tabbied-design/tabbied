// The code the pattern editor's Export menu copies: which setups it offers,
// at which package version, and how each is labelled. The snippets themselves
// come from `tabbied/snippets`, the same builders the MCP server's get_design
// and the catalog's `usage` call, so the three cannot disagree. A snippet
// draws in an embed what the plate showed, at the size it showed it: the grid
// is left to the box and `density` carries the cell size.
//
// One import, from the workspace package: lib/patternSnippets.test.mjs runs
// this file under Node's own TypeScript support, with no bundler and no path
// aliases, after `npm run build:packages`.
import { buildSnippet as buildSetupSnippet, type SnippetInput } from 'tabbied/snippets';

export type { SnippetInput };

/** The setups the editor offers; `core` is the docs' and the MCP server's. */
export type SnippetKind = 'react' | 'vue' | 'svelte' | 'element' | 'html';

type SnippetSpec = {
  kind: SnippetKind;
  /** The menu item. */
  label: string;
  /** The toast once it is on the clipboard. */
  copied: string;
  /**
   * The first release of the package with this entry point. An entry the
   * site's own package version has not reached is not offered: a snippet
   * that imports what npm does not have yet fails for whoever pastes it.
   * The release workflow bumps the version in the same merge that
   * publishes, so a snippet appears on the site with its release.
   */
  since: string;
};

export const SNIPPETS: readonly SnippetSpec[] = [
  { kind: 'react', label: 'React component', copied: 'React component copied', since: '0.7.0' },
  { kind: 'vue', label: 'Vue component', copied: 'Vue component copied', since: '0.8.0' },
  { kind: 'svelte', label: 'Svelte action', copied: 'Svelte action copied', since: '0.8.0' },
  { kind: 'element', label: 'Web component', copied: 'Web component copied', since: '0.8.0' },
  { kind: 'html', label: 'HTML embed', copied: 'HTML embed copied', since: '0.7.0' },
];

const parts = (version: string) =>
  version
    .split('-')[0]
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);

/** `a >= b`, on major.minor.patch; a prerelease counts as its release. */
export function versionAtLeast(a: string, b: string): boolean {
  const [x, y] = [parts(a), parts(b)];

  for (let i = 0; i < 3; i += 1) {
    if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  }

  return true;
}

/** The snippets this version of the package can back. */
export function availableSnippets(version: string): SnippetSpec[] {
  return SNIPPETS.filter((spec) => versionAtLeast(version, spec.since));
}

export function buildSnippet(kind: SnippetKind, input: SnippetInput): string {
  return buildSetupSnippet(kind, input);
}
