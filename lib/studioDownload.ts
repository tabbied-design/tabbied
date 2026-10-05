// The download with the person's changes in it, built in the browser: a
// Worker has no DOM to apply the document with and would re-upload a large
// archive per click. Fetch the packaged zip, apply the document to its
// index.html with the same engine the canvas was drawn with, and zip it again.
//
// Beyond the engine's work, two things only: the bootstrap's import list is
// rewritten to the designs the page mounts now (a swapped field names one the
// packager never listed), and a picture Studio made, reached through
// /api/media, is shipped inside the archive, since an unzipped folder has no
// API behind it.
//
// The React project is the template's authored source, and a document of
// edits cannot be written into JSX. So the customized React download carries
// the result instead, read off the HTML page before and after the engine ran:
// the root's color properties as a stylesheet, and each changed pattern field
// as the attributes its host ends up with, which a thin TabbiedPattern wrapper
// applies over the props the page gives it (see REACT_WRAPPER below).
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate';
import {
  applyEdits,
  type EditsDocument,
  type Problem,
  type TemplateSpec,
} from 'tabbied-templates';
import { apiFetch } from 'lib/apiFetch';
import type { SiteDocument } from 'lib/studioDocument';
import { templateSpecUrl } from 'lib/studioPreview';

/** `zip`'s default and fflate's, the level the packager writes at. */
const ZIP_LEVEL = 6;

/** Every design the document mounts, sorted, for the bootstrap's import. */
const mountedDesigns = (doc: Document): string[] =>
  [
    ...new Set(
      [...doc.querySelectorAll('[data-pattern]')]
        .map((element) => element.getAttribute('data-pattern') ?? '')
        .filter((slug) => /^[a-z0-9]+$/.test(slug))
    ),
  ].sort();

/**
 * Point the packaged bootstrap at the designs the page mounts now. Matched on
 * the esm.sh specifier the packager writes (scripts/package-templates.mjs);
 * false when there is no such script, which a caller reports rather than
 * shipping a page whose patterns would not draw.
 */
function rewriteBootstrap(doc: Document): boolean {
  const script = [...doc.querySelectorAll('script[type="module"]')].find((candidate) =>
    candidate.textContent?.includes('esm.sh/tabbied')
  );

  if (!script) return false;

  const designs = mountedDesigns(doc);
  const list = designs.join(', ');
  const text = script.textContent ?? '';

  // The packager asks esm.sh for just the designs it imports (`?exports=`),
  // so the list is written in both places; a package from before that has
  // the bare specifier, and gets the parameter now.
  const exportsParam = designs.join(',');

  script.textContent = text
    .replace(
      /import \{[^}]*\} from '(https:\/\/esm\.sh\/tabbied@[^'?]*\/patterns)(?:\?exports=[^']*)?'/,
      `import { ${list} } from '$1?exports=${exportsParam}'`
    )
    .replace(/hydratePatterns\(\{ patterns: \{[^}]*\} \}\)/, `hydratePatterns({ patterns: { ${list} } })`);

  return true;
}

const extensionFor = (contentType: string): string => {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';
  return 'webp';
};

/**
 * Bring Studio's pictures into the archive. Each `/api/media/...` image is
 * fetched from this origin, written under images/, and the page pointed at
 * the copy. One that cannot be fetched is left as it was and reported.
 */
async function inlineMedia(
  doc: Document,
  slug: string,
  entries: Record<string, Uint8Array>
): Promise<Problem[]> {
  const problems: Problem[] = [];
  const images = [...doc.querySelectorAll('img[src^="/api/media/"]')];

  for (const [index, image] of images.entries()) {
    const src = image.getAttribute('src') ?? '';

    try {
      const response = await fetch(src);

      if (!response.ok) throw new Error(String(response.status));

      const file = `images/studio-${index + 1}.${extensionFor(response.headers.get('content-type') ?? '')}`;

      entries[`${slug}/${file}`] = new Uint8Array(await response.arrayBuffer());
      image.setAttribute('src', `./${file}`);
    } catch {
      problems.push({
        level: 'warning',
        path: 'images',
        message: `${src} could not be fetched and is still referenced by its URL`,
      });
    }
  }

  return problems;
}

/** One packaged download, unzipped. Each fetch is the Worker's claim too. */
async function fetchPackage(slug: string, format: 'html' | 'react'): Promise<Record<string, Uint8Array>> {
  const response = await fetch(`/downloads/${slug}-${format}.zip`);

  if (!response.ok) {
    // The Worker's claim answers a refused fetch (signed out, or every
    // template already chosen) with a JSON sentence, which is the toast.
    const said = await response
      .json()
      .then((body: { error?: string }) => body.error)
      .catch(() => undefined);

    throw new Error(said ?? `The ${slug} package is not available (${response.status}).`);
  }

  return unzipSync(new Uint8Array(await response.arrayBuffer()));
}

export type CustomisedArchive = {
  bytes: Uint8Array;
  problems: Problem[];
};

/**
 * The packaged HTML download for `slug`, with the document applied. The
 * archive keeps the package's entries, order and root folder, with index.html
 * replaced.
 */
export async function buildCustomisedArchive(options: {
  slug: string;
  spec: TemplateSpec;
  edits: EditsDocument;
}): Promise<CustomisedArchive> {
  const { slug, spec, edits } = options;
  const entries = await fetchPackage(slug, 'html');
  const page = `${slug}/index.html`;

  if (!entries[page]) {
    throw new Error(`The ${slug} package has no index.html.`);
  }

  const doc = new DOMParser().parseFromString(strFromU8(entries[page]), 'text/html');
  const problems = [...applyEdits(doc, spec, edits).problems];

  if (!rewriteBootstrap(doc)) {
    problems.push({
      level: 'error',
      path: 'runtime',
      message: 'the packaged template has no esm.sh bootstrap to update - its patterns would not draw',
    });
  }

  problems.push(...(await inlineMedia(doc, slug, entries)));

  entries[page] = strToU8(`<!DOCTYPE html>\n${doc.documentElement.outerHTML}\n`);

  return { bytes: zipSync(entries, { level: ZIP_LEVEL }), problems };
}

// ---- the React project ---------------------------------------------------

/** The attributes a pattern host is drawn from, the ones a field edit writes. */
const PATTERN_ATTRIBUTES = [
  'data-pattern',
  'data-seed',
  'data-palette',
  'data-options',
  'data-density',
  'data-cell-size',
] as const;

/** The element carrying `data-pattern` in a slot, as the engine finds it. */
const patternHost = (slot: Element): Element | null =>
  slot.hasAttribute('data-pattern') ? slot : slot.querySelector('[data-pattern]');

const hostAttributes = (host: Element | null): Record<string, string> =>
  Object.fromEntries(
    PATTERN_ATTRIBUTES.flatMap((name) => {
      const value = host?.getAttribute(name);
      return value == null ? [] : [[name, value]];
    })
  );

/** The root's custom properties, the ones a palette edit writes inline. */
const rootProperties = (doc: Document): Map<string, string> => {
  const root = doc.querySelector<HTMLElement>('[data-edit-root]');
  const properties = new Map<string, string>();

  if (!root) return properties;

  for (let index = 0; index < root.style.length; index += 1) {
    const name = root.style.item(index);
    if (name.startsWith('--')) properties.set(name, root.style.getPropertyValue(name).trim());
  }

  return properties;
};

export type ReactCustomizations = {
  /** Custom properties for the page's root, in the order the engine wrote them. */
  properties: [string, string][];
  /** Pattern fields that changed, by slot id: the host's attributes after the edit. */
  patterns: Record<string, Record<string, string>>;
};

/**
 * What the engine changed on the page, read off it before and after: the
 * root's color properties, and every pattern field whose host is drawn from
 * different attributes now. The engine adds and removes no elements, so the
 * two documents' slots line up by position.
 */
export function customizationsOf(before: Document, after: Document): ReactCustomizations {
  const was = rootProperties(before);
  const properties = [...rootProperties(after)].filter(([name, value]) => was.get(name) !== value);

  const beforeSlots = [...before.querySelectorAll('[data-edit-pattern]')];
  const patterns: ReactCustomizations['patterns'] = {};

  [...after.querySelectorAll('[data-edit-pattern]')].forEach((slot, index) => {
    const id = slot.getAttribute('data-edit-pattern');
    const now = hostAttributes(patternHost(slot));
    const then = hostAttributes(beforeSlots[index] ? patternHost(beforeSlots[index]) : null);

    if (id && now['data-pattern'] && JSON.stringify(now) !== JSON.stringify(then)) {
      patterns[id] = now;
    }
  });

  return { properties, patterns };
}

const customizationsCss = (properties: [string, string][]): string =>
  [
    `/* Your colors from Tabbied's customizer. The page's own stylesheet still`,
    `   declares the originals; these win because they come later and are marked`,
    `   !important, which also beats a value the page sets inline. Delete a line`,
    `   (or this file's import in main.tsx) to go back to the original. */`,
    `[data-edit-root] {`,
    ...properties.map(([name, value]) => `  ${name}: ${value} !important;`),
    `}`,
    ``,
  ].join('\n');

const customizationsModule = (patterns: ReactCustomizations['patterns']): string =>
  [
    `// Your pattern fields from Tabbied's customizer, by the data-edit-pattern id`,
    `// around each one in the page. Each entry is the field's settings as`,
    `// data-* attributes, read the way hydratePatterns() reads them, and`,
    `// customized.tsx applies it over the props the page gives TabbiedPattern.`,
    `// Delete an entry to go back to the props written in the page.`,
    `export const patterns: Record<string, Record<string, string>> = ${JSON.stringify(patterns, null, 2)};`,
    ``,
  ].join('\n');

/** The wrapper every TabbiedPattern import is pointed at when fields changed. */
const REACT_WRAPPER = (designs: string[]) => `// TabbiedPattern with your customizations applied: the same component, with
// the settings in customizations.ts laid over the props the page passes. A
// field is found by the data-edit-pattern id on the element around it, which
// is only known once it is on the page, so the wrapper marks its own
// placeholder with a class and looks itself up before the first paint.
import { forwardRef, useId, useLayoutEffect, useState } from 'react';
import {
  TabbiedPattern as Original,
  type TabbiedPatternHandle,
  type TabbiedPatternProps,
} from 'tabbied/react';
import { patternConfigFromElement } from 'tabbied';
import { ${designs.join(', ')} } from 'tabbied/patterns';
import { patterns } from './customizations';

export * from 'tabbied/react';

const DESIGNS = { ${designs.join(', ')} };

function overrideFor(id: string): Partial<TabbiedPatternProps> | null {
  const attributes = patterns[id];
  if (!attributes) return null;

  const element = document.createElement('div');
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);

  const config = patternConfigFromElement(element, DESIGNS);
  if (!config) return null;

  // A swapped design takes its own default options, not the old design's.
  return {
    pattern: config.pattern,
    options: config.options ?? {},
    ...(config.seed != null ? { seed: config.seed } : {}),
    ...(config.palette ? { palette: config.palette } : {}),
    ...(config.density != null ? { density: config.density } : {}),
    ...(config.cellSize != null ? { cellSize: config.cellSize } : {}),
  };
}

export const TabbiedPattern = forwardRef<TabbiedPatternHandle, TabbiedPatternProps>(
  function TabbiedPattern(props, ref) {
    const marker = \`tabbied-field-\${useId().replace(/[^a-zA-Z0-9_-]/g, '')}\`;
    const [override, setOverride] = useState<Partial<TabbiedPatternProps> | null>(null);

    useLayoutEffect(() => {
      const id = document
        .querySelector(\`.\${marker}\`)
        ?.closest('[data-edit-pattern]')
        ?.getAttribute('data-edit-pattern');

      if (id) setOverride(overrideFor(id));
    }, [marker]);

    return (
      <Original
        ref={ref}
        {...props}
        {...override}
        className={props.className ? \`\${props.className} \${marker}\` : marker}
      />
    );
  }
);
`;

const REACT_README_SECTION = (customizations: ReactCustomizations, leftOut: string[]) => {
  const files = [
    ...(customizations.properties.length
      ? ['- `src/customizations.css`: your colors, imported last by `src/main.tsx`.']
      : []),
    ...(Object.keys(customizations.patterns).length
      ? [
          '- `src/customizations.ts`: your pattern fields, by the `data-edit-pattern` id',
          '  around each one in the page.',
          "- `src/customized.tsx`: `TabbiedPattern` with those laid over the page's",
          "  props. The page's `tabbied/react` imports point here.",
        ]
      : []),
    '- `tabbied-edits.json`: the edits document itself, which',
    '  [tabbied-templates](https://www.npmjs.com/package/tabbied-templates) applies',
    '  to the HTML version of this page.',
  ];

  return [
    `## Your customizations`,
    ``,
    `This project is the template's source, with the colors and patterns you`,
    `chose in Tabbied's customizer applied over it rather than written into it,`,
    `so the page's own values are still there to go back to:`,
    ``,
    ...files,
    ``,
    `To make a change part of the source, write it into the page (\`src/App.tsx\`,`,
    `or the component it renders) and delete it from the customization files.`,
    ...(leftOut.length
      ? [
          ``,
          `Not carried into this project: ${leftOut.join(' and ')}. They are in`,
          `\`tabbied-edits.json\` and in the HTML version of your download.`,
        ]
      : []),
    ``,
  ].join('\n');
};

/**
 * The packaged React project for `slug`, with the document's colors and
 * pattern fields carried in as files of their own (see the head of this
 * module). Text and picture edits cannot be: they are reported, and left in
 * tabbied-edits.json.
 */
export async function buildCustomisedReactArchive(options: {
  slug: string;
  spec: TemplateSpec;
  edits: EditsDocument;
}): Promise<CustomisedArchive> {
  const { slug, spec, edits } = options;
  const [html, entries] = await Promise.all([fetchPackage(slug, 'html'), fetchPackage(slug, 'react')]);
  const page = html[`${slug}/index.html`];
  const main = Object.keys(entries).find((name) => name.endsWith('/src/main.tsx'));

  if (!page || !main) throw new Error(`The ${slug} package is missing its page.`);

  const root = main.slice(0, -'src/main.tsx'.length);
  const source = strFromU8(page);
  const parser = new DOMParser();
  const before = parser.parseFromString(source, 'text/html');
  const after = parser.parseFromString(source, 'text/html');
  const problems = [...applyEdits(after, spec, edits).problems];
  const customizations = customizationsOf(before, after);
  const designs = [
    ...new Set(Object.values(customizations.patterns).map((attributes) => attributes['data-pattern'])),
  ]
    .filter((design) => /^[a-z0-9]+$/.test(design))
    .sort();

  const leftOut = [
    ...(Object.keys(edits.edits.text ?? {}).length ? ['text'] : []),
    ...(Object.keys(edits.edits.images ?? {}).length ? ['pictures'] : []),
  ];
  for (const kind of leftOut) {
    problems.push({ level: 'warning', path: kind, message: `${kind} edits are not carried into the React project` });
  }

  if (customizations.properties.length) {
    entries[`${root}src/customizations.css`] = strToU8(customizationsCss(customizations.properties));
    // After the page's own sheets, so equal specificity goes to these.
    const mainSource = strFromU8(entries[main]);
    entries[main] = strToU8(
      mainSource.includes(`import './base.css';`)
        ? mainSource.replace(`import './base.css';`, `import './base.css';\nimport './customizations.css';`)
        : `${mainSource.trimEnd()}\n\nimport './customizations.css';\n`
    );
  }

  if (designs.length) {
    entries[`${root}src/customizations.ts`] = strToU8(customizationsModule(customizations.patterns));
    entries[`${root}src/customized.tsx`] = strToU8(REACT_WRAPPER(designs));

    for (const name of Object.keys(entries)) {
      if (!name.startsWith(`${root}src/`) || !/\.tsx?$/.test(name) || name.endsWith('/customized.tsx')) continue;

      const depth = name.slice(`${root}src/`.length).split('/').length - 1;
      const target = depth ? `${'../'.repeat(depth)}customized` : './customized';
      const text = strFromU8(entries[name]);

      if (text.includes(`from 'tabbied/react'`)) {
        entries[name] = strToU8(text.replaceAll(`from 'tabbied/react'`, `from '${target}'`));
      }
    }
  }

  entries[`${root}tabbied-edits.json`] = strToU8(`${JSON.stringify(edits, null, 2)}\n`);

  const readme = `${root}README.md`;
  if (entries[readme]) {
    const text = strFromU8(entries[readme]);
    const at = text.indexOf('\n## ');
    const section = REACT_README_SECTION(customizations, leftOut);
    entries[readme] = strToU8(at < 0 ? `${text}\n${section}` : `${text.slice(0, at + 1)}${section}\n${text.slice(at + 1)}`);
  }

  return { bytes: zipSync(entries, { level: ZIP_LEVEL }), problems };
}

/** `Park & Co.` to `park-and-co`; a name with nothing usable in it is `site`. */
export const archiveNameFor = (title: string): string =>
  title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'site';

/** Hand the bytes to the browser as a download. */
export function saveArchive(bytes: Uint8Array, fileName: string): void {
  const blob = new Blob([bytes as BlobPart], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  // Revoking synchronously can abort the just-started download.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/**
 * A saved site's customized download, from anywhere a site id is known: the
 * customizer's build, on the site's latest saved revision.
 */
export async function downloadCustomisedSite(siteId: string, format: 'html' | 'react' = 'html'): Promise<void> {
  const site = await apiFetch<SiteDocument>(`/api/studio/sites/${encodeURIComponent(siteId)}`);
  const specResponse = await fetch(templateSpecUrl(site.slug));

  if (!specResponse.ok) {
    throw new Error(`The ${site.templateName} template is not available right now.`);
  }

  const spec = (await specResponse.json()) as TemplateSpec;
  const build = format === 'react' ? buildCustomisedReactArchive : buildCustomisedArchive;
  const { bytes } = await build({ slug: site.slug, spec, edits: site.latest.edits });

  saveArchive(bytes, `${archiveNameFor(site.title)}-${format}.zip`);
}
