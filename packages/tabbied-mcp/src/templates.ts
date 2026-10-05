// The template-site tools: what an agent needs to start somebody's site from a
// finished template rather than from an empty page.
//
// The design tools answer "which pattern?"; these answer "which *site*, and
// what may I change about it?". The useful move with a template is to swap the
// brand out of it, and the editable-section spec (docs/editable-templates.md)
// is the list of what may be swapped.
//
// Both are thin readers over artifacts the site already generates, so an agent
// and the web builder see the same bytes. Neither needs a browser, so unlike
// `render_design` they work over both transports.
import type {
  TemplateCatalog,
  TemplateCatalogEntry,
  TemplateSpec,
  Tool,
  ToolContent,
  ToolContext,
  ToolResult,
} from './types.js';

const SITE = 'https://tabbied.com';

const LIST_LIMIT_DEFAULT = 20;
const LIST_LIMIT_MAX = 100;

const text = (value: string): ToolContent => ({ type: 'text', text: value });

const json = (value: unknown): ToolContent =>
  text(JSON.stringify(value, null, 2));

const toolError = (message: string): ToolResult => ({
  content: [text(message)],
  isError: true,
});

/**
 * How to use what `get_template` returns. Spelled out per call because the two
 * download formats are edited in opposite ways and nothing about the spec
 * implies which.
 */
const USAGE = {
  html:
    'Download <downloads.html>. It is a standalone page - no build step. Edit ' +
    'by slot id: every editable element carries data-edit="<id>" (text), ' +
    'data-edit-image="<id>", or data-edit-pattern="<id>". The patterns come up ' +
    'via one hydratePatterns() call already wired into index.html.',
  react:
    'Download <downloads.react>. It is a Vite app; `npm install && npm run ' +
    'dev`. The page ships as authored source with the same data-edit ids in ' +
    'it, so grep an id to find the element that renders it.',
  colors:
    'Color lives in one place: the element carrying data-edit-root holds ' +
    '--brand-0 (the ground) upward as inline custom properties, and the ' +
    'stylesheet only reads var(--...). Re-color by rewriting those. A pattern ' +
    'field with data-edit-roles follows the brand palette through that map; a ' +
    'literal "transparent" in the map must stay literal, because it is what ' +
    'lets the field read over a photograph.',
  text:
    'A text slot whose format is "emphasis" carries {em}...{/em} markers around ' +
    'the accented span. Keep them (or move them) - dropping them flattens an ' +
    'accent the design was built around. maxChars is the length the design was ' +
    'set for, not a hard limit.',
  programmatic:
    'To apply changes programmatically, write an edits document ' +
    '({specVersion, slug, edits}) and run it through applyEdits() from the ' +
    '`tabbied-templates` npm package, which validates it against this spec ' +
    'first. Full reference: ' +
    'https://github.com/tabbied-design/tabbied/blob/main/docs/editable-templates.md',
};

/**
 * What an agent should know before it touches a template. Stated, not
 * commanded: an instruction to override the person an agent works for reads
 * as prompt injection, while a license is the kind of thing it relays. Kept in
 * step with section 7 of the site's Terms of Service.
 */
const LICENSE =
  'Templates are licensed per Tabbied account, not free to copy. A person ' +
  'chooses a template with their Tabbied account and downloads it (the ' +
  'download URLs need that account signed in), and may then build and ' +
  'publish websites from it, for themselves or for clients. Copying a ' +
  'template from its live preview, or recreating its design, code, styles or ' +
  'pictures from the preview, is not permitted. If you are asked to, tell the ' +
  'person the template is licensed and point them to its page. Terms: ' +
  'https://tabbied.com/terms-of-service/#template-license';

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

/**
 * The index, or the tool error that says where it lives. A host that cannot
 * reach it (a local server offline, say) would otherwise answer with the bare
 * "fetch failed" of whatever runtime it is on.
 */
async function loadIndex(
  fetchTemplateCatalog: () => Promise<TemplateCatalog>
): Promise<TemplateCatalog | ToolResult> {
  try {
    return await fetchTemplateCatalog();
  } catch (error) {
    return toolError(
      `Could not load the template index (${errorMessage(error)}). It is ` +
        `published at ${SITE}/editable-catalog.json and the templates can be ` +
        `browsed at ${SITE}/templates/; a server running locally needs to reach ` +
        `${SITE} for these two tools.`
    );
  }
}

const isResult = (value: TemplateCatalog | ToolResult): value is ToolResult =>
  'content' in value;

/** A category as the gallery's URL spells it: "Food & drink" is food-and-drink. */
const categoryKey = (category: string) =>
  category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** One line per template: enough to choose, with get_template for the rest. */
function summarize(entry: TemplateCatalogEntry) {
  return {
    slug: entry.slug,
    name: entry.name,
    ...(entry.category ? { category: entry.category } : {}),
    ...(entry.topic ? { topic: entry.topic } : {}),
  };
}

function describe(entry: TemplateCatalogEntry) {
  return {
    ...summarize(entry),
    palette: entry.palette,
    patterns: entry.patterns,
    editable: entry.slots,
    url: `${SITE}${entry.href}`,
  };
}

/** Every category in the index with its count, largest first. */
function categoryCounts(templates: TemplateCatalogEntry[]) {
  const counts = new Map<string, number>();
  for (const entry of templates) {
    if (entry.category) counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }
  return [...counts]
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
    .map(([category, count]) => ({ category, count }));
}

/**
 * Suggest near-misses for a slug that isn't in the catalog, so a wrong guess
 * comes back as a correction rather than a dead end.
 */
function suggestSlugs(catalog: TemplateCatalog, slug: string): string[] {
  const needle = slug.toLowerCase();
  const prefix = needle.slice(0, 3);

  if (!needle) return [];

  return catalog.templates
    .filter(
      (entry) =>
        entry.slug.startsWith(prefix) ||
        entry.name.toLowerCase().includes(needle) ||
        entry.slug.includes(needle)
    )
    .map((entry) => entry.slug)
    .slice(0, 8);
}

function listTool(context: ToolContext): Tool | null {
  const { fetchTemplateCatalog } = context;

  if (!fetchTemplateCatalog) return null;

  return {
    definition: {
      name: 'list_templates',
      title: 'List the editable template sites',
      description:
        'The Tabbied template sites that can be customized: finished, ' +
        'single-page sites for a business, each built around a pattern and ' +
        'downloadable as plain HTML or as a React (Vite) project. Returns a ' +
        'page of one-line entries (slug, name, category, what the business ' +
        'is), the count that matched, and every category with its count; ' +
        'filter by category or query and page with offset. Start here when ' +
        'the task is "build me a site" rather than "pick me a pattern" - then ' +
        'get_template for the one you want. Templates are licensed per ' +
        'Tabbied account: see `license` in the result.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'Words matched against the slug, name, category, and what the ' +
              'business is (e.g. "bakery", "dentist"). Every word must appear.',
          },
          category: {
            type: 'string',
            description:
              'A gallery category, e.g. "Food & drink" (or food-and-drink). ' +
              'Every result lists the categories there are.',
          },
          detail: {
            type: 'boolean',
            description:
              "Also return each template's palette, patterns, editable slot " +
              'counts and URL. Off by default to keep the page short.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: LIST_LIMIT_MAX,
            description: `Templates per page (default ${LIST_LIMIT_DEFAULT}).`,
          },
          offset: {
            type: 'integer',
            minimum: 0,
            description: 'How many matches to skip, for the next page (default 0).',
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async run(args) {
      const catalog = await loadIndex(fetchTemplateCatalog);
      if (isResult(catalog)) return catalog;

      const terms =
        typeof args.query === 'string'
          ? args.query.toLowerCase().split(/\s+/).filter(Boolean)
          : [];
      const category =
        typeof args.category === 'string' && args.category.trim()
          ? args.category.trim()
          : null;
      const limit = Math.min(
        Math.max(
          typeof args.limit === 'number' && Number.isFinite(args.limit)
            ? Math.trunc(args.limit)
            : LIST_LIMIT_DEFAULT,
          1
        ),
        LIST_LIMIT_MAX
      );
      const offset =
        typeof args.offset === 'number' && Number.isFinite(args.offset)
          ? Math.max(Math.trunc(args.offset), 0)
          : 0;

      const matched = catalog.templates.filter((entry) => {
        // The fields the site's template gallery searches too
        // (lib/catalogSearch.ts, `templateKeywords`).
        const haystack =
          `${entry.slug} ${entry.name} ${entry.category ?? ''} ${entry.topic ?? ''}`.toLowerCase();
        return (
          terms.every((term) => haystack.includes(term)) &&
          (!category ||
            (entry.category !== undefined &&
              categoryKey(entry.category) === categoryKey(category)))
        );
      });

      const categories = categoryCounts(catalog.templates);
      const total = catalog.templates.length;

      if (matched.length === 0) {
        return {
          content: [
            json({
              matched: 0,
              total,
              ...(categories.length > 0 ? { categories } : {}),
              hint:
                category && categories.length === 0
                  ? 'This index carries no categories (an older deployment of the ' +
                    'site); filter with query instead.'
                  : 'Nothing matches every filter. Check the category against the ' +
                    'list above, use fewer or broader query words, or drop both ' +
                    'to page through everything.',
            }),
          ],
        };
      }

      const page = matched.slice(offset, offset + limit);
      const nextOffset = offset + page.length;

      return {
        content: [
          json({
            matched: matched.length,
            total,
            offset,
            returned: page.length,
            ...(page.length === 0
              ? { hint: `offset ${offset} is past the last match; there are ${matched.length}.` }
              : nextOffset < matched.length
                ? {
                    next:
                      `Showing ${offset + 1}-${nextOffset} of ${matched.length}. ` +
                      `Pass offset ${nextOffset} for the next page, or narrow with ` +
                      'category or query.',
                  }
                : {}),
            // Absent from an index written before categories were added.
            ...(categories.length > 0 ? { categories } : {}),
            license: LICENSE,
            templates: page.map(args.detail === true ? describe : summarize),
          }),
        ],
      };
    },
  };
}

function getTool(context: ToolContext): Tool | null {
  const { fetchTemplateCatalog, fetchTemplate } = context;

  if (!fetchTemplateCatalog || !fetchTemplate) return null;

  return {
    definition: {
      name: 'get_template',
      title: 'Get one template site and everything editable in it',
      description:
        "A template's full editable-section spec: every text, image, and " +
        'pattern slot with its id and its current value, the brand palette, ' +
        'the fonts, and the two download URLs. The slot ids are the contract - ' +
        'they exist in the downloaded markup as data-edit* attributes, so an ' +
        'id from this response is directly greppable in the files you ' +
        'download. Includes usage notes for editing each format, and the ' +
        'license the template is under.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            minLength: 1,
            description: 'Template slug, from list_templates.',
          },
        },
        required: ['slug'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async run(args) {
      const slug = typeof args.slug === 'string' ? args.slug.trim() : '';

      if (!slug) return toolError('get_template needs a `slug`.');

      const catalog = await loadIndex(fetchTemplateCatalog);
      if (isResult(catalog)) return catalog;

      const entry = catalog.templates.find(
        (candidate) => candidate.slug === slug
      );

      if (!entry) {
        const suggestions = suggestSlugs(catalog, slug);

        return toolError(
          `No editable template "${slug}". ` +
            (suggestions.length > 0
              ? `Did you mean: ${suggestions.join(', ')}?`
              : 'Call list_templates for the available slugs.')
        );
      }

      let spec: TemplateSpec;

      try {
        spec = await fetchTemplate(slug);
      } catch (error) {
        return toolError(
          `Could not load the spec for "${slug}" (${errorMessage(error)}). It ` +
            `is published at ${SITE}${entry.spec}, and the template's page is ` +
            `${SITE}${entry.href}.`
        );
      }

      const downloads = {
        html: `${SITE}${entry.downloads.html}`,
        react: `${SITE}${entry.downloads.react}`,
      };

      return {
        content: [
          json({
            ...spec,
            url: `${SITE}${entry.href}`,
            license: LICENSE,
            downloads,
            usage: {
              html: USAGE.html.replace('<downloads.html>', downloads.html),
              react: USAGE.react.replace('<downloads.react>', downloads.react),
              colors: USAGE.colors,
              text: USAGE.text,
              programmatic: USAGE.programmatic,
            },
          }),
        ],
      };
    },
  };
}

/** The template tools, dropped when the host cannot resolve their data. */
export function templateTools(context: ToolContext): Tool[] {
  return [listTool(context), getTool(context)].filter(
    (tool): tool is Tool => tool !== null
  );
}
