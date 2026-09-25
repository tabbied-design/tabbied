// Turning a packaged template into a preview of a generated direction.
//
// The artifact previewed is the download (out/downloads/<slug>/index.html):
// it has no framework left, so its `[data-pattern]` placeholders can be
// rewritten by the edits engine and mounted by a plain `hydratePatterns()`,
// where the live page mounts through React and ignores an outside write.
//
// Four changes are made to it, and no others:
//
//   1. A <base>, so the package's relative styles/ and images/ resolve inside
//      an iframe on another path.
//   2. The bootstrap's pinned esm.sh import is pointed at a same-origin bundle,
//      beside a script that keeps `#section` links in the page (see
//      `linkScript`).
//   3. The edits document, applied by the engine.
//   4. Every relative stylesheet, image and script reference is made absolute
//      under the package: Chromium's preload scanner ignores a <base> in an
//      about:srcdoc document and fetches against the page's URL first, which
//      fills the console with 404s.
import {
  applyEdits,
  type EditsDocument,
  type Problem,
  type TemplateSpec,
} from 'tabbied-templates';

/** The bundled, same-origin pattern runtime (scripts/build-preview-runtime.mjs). */
const PREVIEW_RUNTIME = '/studio/preview-runtime.js';

export const packagedTemplateUrl = (slug: string) => `/downloads/${slug}/`;

export const templateSpecUrl = (slug: string) => `/editable/${slug}.json`;

export type PreviewDocument = {
  /** Serialized HTML, ready for an iframe's srcdoc. */
  html: string;
  /** Anything the engine could not apply. Rendered, not swallowed. */
  problems: Problem[];
};

/**
 * The script injected in place of the packaged bootstrap. It names no
 * patterns: the runtime bundles the whole catalog and `hydrate()` closes over
 * it, so this is the same for every site.
 */
const bootstrap =
  `import { hydrate, rehydrate } from '${PREVIEW_RUNTIME}';\n` +
  'hydrate();\n' +
  // For the parent (same origin), to re-draw the patterns after it has
  // rewritten their attributes.
  'window.__tabbied = { rehydrate };\n';

/**
 * A `#work` link in a srcdoc document resolves against the <base> to
 * `/downloads/<slug>/#work`, never the document's own `about:srcdoc`, so the
 * browser navigates the frame to the raw package (a sandbox does not stop
 * that). Fragment links are handled here as the scroll the template meant.
 *
 * A classic script, not a line of the module above: a module waits on its
 * import, and a link clicked before then would navigate.
 */
const linkScript =
  'document.addEventListener("click", function (event) {\n' +
  '  var link = event.target instanceof Element ? event.target.closest(\'a[href^="#"]\') : null;\n' +
  '  if (!link || event.defaultPrevented || event.button !== 0) return;\n' +
  '  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;\n' +
  '  event.preventDefault();\n' +
  '  var id = decodeURIComponent(link.getAttribute("href").slice(1));\n' +
  '  var target = id ? document.getElementById(id) : null;\n' +
  '  if (target) target.scrollIntoView();\n' +
  '  else if (!id || id === "top") window.scrollTo(0, 0);\n' +
  '});\n';

/**
 * Rewrite the packaged bootstrap to load the same-origin runtime. Matched on
 * the esm.sh specifier the packager writes (scripts/package-templates.mjs), and
 * reported when missing rather than drawing a preview with no patterns.
 */
function rewriteBootstrap(documentEl: Document): Problem[] {
  const scripts = [
    ...documentEl.querySelectorAll('script[type="module"]'),
  ].filter((script) => script.textContent?.includes('esm.sh'));

  if (scripts.length === 0) {
    return [
      {
        level: 'error',
        path: 'runtime',
        message:
          'the packaged template has no esm.sh bootstrap to replace - its patterns will not render',
      },
    ];
  }

  scripts.forEach((script, index) => {
    // One script does the hydrating; any further one is a duplicate mount.
    script.textContent = index === 0 ? bootstrap : '';
  });

  const links = documentEl.createElement('script');
  links.textContent = linkScript;
  scripts[0].before(links);

  return [];
}

/** Attributes the preload scanner acts on, by element. */
const RESOURCE_ATTRIBUTES: ReadonlyArray<readonly [selector: string, attribute: string]> = [
  ['link[href]', 'href'],
  ['link[imagesrcset]', 'imagesrcset'],
  ['img[src], script[src], source[src], video[src], audio[src], track[src], iframe[src], embed[src]', 'src'],
  ['img[srcset], source[srcset]', 'srcset'],
  ['video[poster]', 'poster'],
];

/** Absolute, root-relative, fragment-only, protocol-relative or empty: not ours to touch. */
const NOT_RELATIVE = /^(?:[a-z][a-z0-9+.-]*:|\/|#|$)/i;

/**
 * `./styles/base.css` -> `/downloads/<slug>/styles/base.css`. Resolved with the
 * URL parser against a throwaway origin so `./` and `../` mean what they mean.
 */
function absolutise(value: string, root: string): string {
  if (NOT_RELATIVE.test(value.trim())) return value;

  const resolved = new URL(value.trim(), `https://package.invalid${root}`);

  return `${resolved.pathname}${resolved.search}${resolved.hash}`;
}

/** Each candidate of a srcset is a URL and an optional descriptor. */
function absolutiseSrcset(value: string, root: string): string {
  return value
    .split(',')
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);

      return [absolutise(url ?? '', root), ...descriptor].join(' ');
    })
    .join(', ');
}

/**
 * Make every relative resource reference absolute under the package (change 4
 * above). The <base> still resolves what this cannot see, such as a `url()`
 * in an inline style.
 */
function absolutiseResources(documentEl: Document, root: string): void {
  for (const [selector, attribute] of RESOURCE_ATTRIBUTES) {
    for (const element of documentEl.querySelectorAll(selector)) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;

      const rewritten = attribute.endsWith('srcset')
        ? absolutiseSrcset(value, root)
        : absolutise(value, root);

      if (rewritten !== value) element.setAttribute(attribute, rewritten);
    }
  }
}

/**
 * Build the preview document from the packaged HTML. The caller fetches it and
 * owns the request's errors; this is a pure transform.
 */
export function buildPreviewDocument(options: {
  html: string;
  spec: TemplateSpec;
  /** Any edits document - a three-string rebrand or a full revision. */
  edits: EditsDocument;
  slug: string;
}): PreviewDocument {
  const { html, spec, edits, slug } = options;
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const head = parsed.head;

  // First child: a <base> only governs the references that follow it.
  const base = parsed.createElement('base');
  base.setAttribute('href', packagedTemplateUrl(slug));
  head.insertBefore(base, head.firstChild);

  const problems = [
    ...rewriteBootstrap(parsed),
    ...applyEdits(parsed, spec, edits).problems,
  ];

  // After the edits, so an image the engine pointed at a template file is
  // covered too.
  absolutiseResources(parsed, packagedTemplateUrl(slug));

  return {
    html: `<!DOCTYPE html>${parsed.documentElement.outerHTML}`,
    problems,
  };
}
