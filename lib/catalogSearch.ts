// The two galleries' searches.
//
// - A design's keywords are its slug and name, its catalog tags, moods and
//   uses, and its description, as the MCP server's search_designs reads them
//   (packages/tabbied-mcp/src/tools.ts, `designKeywords`), and every word
//   typed must appear somewhere in them, so "dots" finds the designs tagged
//   dots in both, not only the one called Dotset.
// - A template's are its slug, name, category and what the business is, the
//   fields list_templates reads (packages/tabbied-mcp/src/templates.ts), but
//   matched by word rather than by substring: a person types the trade
//   ("plumber", "dog groomer", "landscaper") and the topics name the work
//   ("Plumbing and heating contractor", "Mobile dog grooming"). So each word
//   is reduced to a stem on both sides (`stem`), a few trades that share no
//   stem are joined by hand (`TRADE_WORDS`), and a word typed matches a word
//   of the template that has its stem or starts with it. Inside a word is
//   not a match, so "hair" no longer finds Two Chairs Counseling. The MCP
//   tool still matches substrings; an agent rephrases a query that missed.
//
// No imports, on purpose: lib/catalogSearch.test.mjs runs this file under
// Node's own TypeScript support.

export type SearchableDesign = {
  slug: string;
  name: string;
  description?: string;
  tags?: readonly string[];
  mood?: readonly string[];
  goodFor?: readonly string[];
};

/** One lowercase string to search, built once per design on the server. */
export function designKeywords(design: SearchableDesign): string {
  return [
    design.slug,
    design.name,
    ...(design.tags ?? []),
    ...(design.mood ?? []),
    ...(design.goodFor ?? []),
    design.description ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

export type SearchableTemplate = {
  slug: string;
  name: string;
  category?: string;
  topic?: string;
};

function templateKeywords(template: SearchableTemplate): string {
  return [template.slug, template.name, template.category ?? '', template.topic ?? ''].join(' ').toLowerCase();
}

/** The query's words; an empty query matches everything. */
const queryTerms = (query: string): string[] => query.toLowerCase().split(/\s+/).filter(Boolean);

export function matchesQuery(keywords: string, query: string): boolean {
  return queryTerms(query).every((term) => keywords.includes(term));
}

// -- Templates, by word ------------------------------------------------------

/** Lowercase letters and digits, accents dropped ("Cafe" for "Caf\u00e9"), one entry per word. */
const words = (text: string): string[] =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/**
 * A word with its plural and up to two endings of the trade taken off, so
 * the forms a trade goes by meet: plumber, plumbers and plumbing are all
 * "plumb"; baker and bakery "bak"; florist "flor"; electrician "electric";
 * upholsterer and upholstery "upholst". Not a linguist's stemmer, and it
 * need not be: the two sides of a match go through the same function, so a
 * stem only has to be the same for the words that belong together, and
 * short words are left whole.
 */
export function stem(word: string): string {
  let w = word;

  if (w.length > 4 && w.endsWith('ies')) w = `${w.slice(0, -3)}y`;
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);

  for (let pass = 0; pass < 2; pass += 1) {
    const found = ENDINGS.find(([ending, keep]) => w.length - ending.length >= keep && w.endsWith(ending));
    if (!found) break;
    w = w.slice(0, -found[0].length);
  }

  return w;
}

/** An ending, and the letters a word must keep after it is taken off. Longest first. */
const ENDINGS: readonly (readonly [string, number])[] = [
  ['ing', 3],
  ['ery', 3],
  ['ian', 4],
  ['ist', 3],
  ['er', 3],
  ['y', 4],
  ['e', 4],
];

/**
 * Trades a person names by a word the templates do not use, each group a
 * set of words that should find one another. Kept narrow on purpose: a
 * group's words are added to every template that has one of them, so a word
 * that also names a category ("wellness"), or a kind of place many trades
 * share ("salon", "clinic", "school", "repair"), would make one trade find
 * dozens. The forms of one word need no group; `stem` already joins them.
 */
export const TRADE_WORDS: readonly (readonly string[])[] = [
  ['hairdresser', 'hairdressing', 'hairstylist', 'hair'],
  ['barber', 'barbershop'],
  ['cafe', 'coffee', 'coffeehouse'],
  ['restaurant', 'diner', 'bistro', 'eatery'],
  ['lawyer', 'attorney', 'law', 'solicitor'],
  ['accountant', 'accounting', 'bookkeeping', 'bookkeeper', 'tax', 'cpa'],
  ['realtor', 'realty', 'real'],
  ['mechanic', 'auto'],
  ['hvac', 'heating', 'furnace'],
  ['electrical', 'electrician', 'electric'],
  ['plumber', 'drain'],
  ['dentist', 'dental', 'orthodontist'],
  ['vet', 'veterinary', 'veterinarian'],
  ['doctor', 'medicine', 'gp', 'physician'],
  ['therapist', 'therapy', 'counseling', 'counselling', 'counselor'],
  ['decorator', 'decorating'],
  ['carpenter', 'carpentry', 'joiner', 'joinery', 'woodwork'],
  ['builder', 'contractor'],
  ['cleaner', 'maid', 'janitorial'],
  ['florist', 'flower', 'floral'],
  ['baker', 'bakehouse', 'patisserie', 'pastry'],
  ['pizza', 'pizzeria'],
  ['gym', 'fitness'],
  ['tailor', 'alteration', 'seamstress'],
  ['nail', 'manicure', 'pedicure'],
  ['spa', 'massage'],
  ['tutor', 'tuition'],
  ['mover', 'removal'],
  ['bar', 'pub', 'tavern', 'taproom'],
  ['wedding', 'bridal', 'bride'],
  ['pet', 'dog'],
];

/** Every stem a stem stands for: itself, and the rest of its trade's group. */
const SYNONYMS: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, Set<string>>();

  for (const group of TRADE_WORDS) {
    const stems = group.map(stem);
    for (const one of stems) {
      const set = map.get(one) ?? new Set<string>();
      for (const other of stems) set.add(other);
      map.set(one, set);
    }
  }

  return new Map([...map].map(([key, set]) => [key, [...set]]));
})();

/** A template's words, each with its stem, and every stem its trade's words add. */
export type TemplateIndex = {
  /** The words as written, for a word still being typed ("plu"). */
  words: readonly string[];
  stems: ReadonlySet<string>;
};

export function indexTemplate(template: SearchableTemplate): TemplateIndex {
  const all = words(templateKeywords(template));
  const stems = new Set<string>();

  for (const word of all) {
    const one = stem(word);
    stems.add(one);
    for (const other of SYNONYMS.get(one) ?? []) stems.add(other);
  }

  return { words: all, stems };
}

/**
 * How well a template answers a query, 0 for not at all. Every word typed
 * must match a word of the template: by stem (2), so plumber finds
 * plumbing, or as the start of one (1), so a word half typed already finds
 * its templates. A gallery lists the stem matches first, so "car" shows the
 * car wash before the cardiologist. "plumber" does not find Plumbline
 * Payroll at all: plumbline is neither its stem nor a word that starts with
 * "plumber".
 */
function scoreTemplate(index: TemplateIndex, query: string): number {
  let score = 0;

  for (const term of words(query)) {
    if (index.stems.has(stem(term))) score += 2;
    else if (index.words.some((word) => word.startsWith(term))) score += 1;
    else return 0;
  }

  return score;
}

export const matchesTemplate = (index: TemplateIndex, query: string): boolean => scoreTemplate(index, query) > 0;

/** The templates that answer a query, best first, in their own order within a score. */
export function searchTemplates<T>(items: readonly T[], indexOf: (item: T) => TemplateIndex, query: string): T[] {
  if (words(query).length === 0) return [...items];

  return items
    .map((item, order) => ({ item, order, score: scoreTemplate(indexOf(item), query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(({ item }) => item);
}

/** Edits between two words, stopping early past `limit`. */
function distance(a: string, b: string, limit: number): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    let best = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(previous[j] + 1, row[j - 1] + 1, previous[j - 1] + cost);
      best = Math.min(best, row[j]);
    }

    if (best > limit) return limit + 1;
    previous = row;
  }

  return previous[b.length];
}

/** How many letters a short word may be off by, and a longer one. */
const tolerance = (word: string): number => (word.length <= 4 ? 1 : 2);

const sharedStart = (a: string, b: string): number => {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n += 1;
  return n;
};

/**
 * What to offer when a search finds nothing: queries a letter or two from
 * the one typed that would find something ("plumer" -> "plumber",
 * "lanscaper" -> "landscaping"), taken from the templates' own words and the
 * trade words above, compared as typed and as stems. Each word typed that
 * matches nothing is swapped for its nearest; the words that already match
 * are kept.
 */
export function suggestQueries(indexes: readonly TemplateIndex[], query: string, limit = 3): string[] {
  const typed = words(query);
  if (typed.length === 0) return [];

  const vocabulary = [...new Set([...indexes.flatMap((index) => index.words), ...TRADE_WORDS.flat()])].filter(
    (word) => word.length >= 3 && !/^\d+$/.test(word)
  );
  const finds = (candidate: string) => indexes.some((index) => matchesTemplate(index, candidate));

  const options = typed.map((term) => {
    if (finds(term)) return [term];

    const termStem = stem(term);

    return vocabulary
      .map((word) => {
        const asTyped = distance(term, word, tolerance(term));
        const asStem = distance(termStem, stem(word), tolerance(termStem));

        return {
          word,
          d: asTyped <= tolerance(term) ? asTyped : asStem <= tolerance(termStem) ? asStem : Infinity,
          start: sharedStart(term, word),
        };
      })
      .filter(({ d }) => d !== Infinity)
      .sort((a, b) => a.d - b.d || b.start - a.start || a.word.length - b.word.length)
      .map(({ word }) => word);
  });

  if (options.some((list) => list.length === 0)) return [];

  // The nearest first: vary one word at a time from the best of each.
  const suggestions = new Set<string>();
  const best = options.map((list) => list[0]);

  for (let i = 0; i < options.length && suggestions.size < limit; i += 1) {
    for (const option of options[i]) {
      const candidate = best.map((word, k) => (k === i ? option : word)).join(' ');
      if (candidate !== typed.join(' ') && finds(candidate)) suggestions.add(candidate);
      if (suggestions.size >= limit) break;
    }
  }

  return [...suggestions];
}
