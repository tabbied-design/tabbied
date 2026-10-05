// One recipe on a setup's docs page: a whole, paste-ready file, grouped into
// the page's sections. The recipe lists are plain data (no runtime imports),
// so lib/docsExamples.test.mjs can load them under Node's own TypeScript
// support and compile every one.

export type RecipeGroup = 'layout' | 'state' | 'integration';

export type Recipe = {
  /** Unique on its page; the heading's anchor is `recipe-<id>`. */
  id: string;
  group: RecipeGroup;
  title: string;
  /** What it does and why, with `code` spans. */
  says: string;
  /** The panel's label: the file it would live in. */
  file: string;
  lang: 'tsx' | 'ts' | 'vue' | 'svelte' | 'html';
  /** `@VERSION@` stands for the package version a CDN URL pins. */
  code: string;
};
