#!/usr/bin/env node
// Derive each template site's editable-section spec from the static export.
//
// Everything is read out of out/templates/<slug>/site/index.html (text, image
// sources, pattern configuration, palette), so the spec describes the bytes
// that shipped, as the download packager does.
//
// **This script is also the build gate.** An annotation that resolves to
// nothing (an image slot with no <img>, two elements sharing an id while
// saying different things) exits non-zero; otherwise the editor's control
// would silently do nothing.
//
// Runs inside `npm run build`, between the two `next build` passes, and writes
// into public/ so the second pass exports it.
//
//   npm run editable            every annotated site
//   npm run editable solstice   just one
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  SPEC_VERSION,
  extractFromHtml,
  validateSpec,
  hasErrors,
  formatProblems,
  declaredCopyRoles,
  decodeEntities,
} from 'tabbied-templates';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const exportDir = path.join(repoRoot, 'out', 'templates');
const outDir = path.join(repoRoot, 'public', 'editable');
const catalogPath = path.join(repoRoot, 'public', 'editable-catalog.json');
const designCatalogPath = path.join(
  repoRoot,
  'packages',
  'tabbied',
  'catalog.json'
);

const only = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));

if (!existsSync(exportDir)) {
  console.error(
    'editable: out/templates is missing - run `next build` first ' +
      '(`npm run build` does this for you).'
  );
  process.exit(1);
}

// Option ranges come from the design catalog, so a pattern slot carries the
// bounds `get_design` publishes. Without them a slot still extracts, with no
// typed controls or validation.
let designOptions = () => undefined;

if (existsSync(designCatalogPath)) {
  const catalog = JSON.parse(readFileSync(designCatalogPath, 'utf8'));
  const byslug = new Map(
    catalog.designs.map((design) => [design.slug, design.options ?? []])
  );

  designOptions = (slug) => byslug.get(slug);
} else {
  console.warn(
    'editable: packages/tabbied/catalog.json is missing - pattern slots will ' +
      'carry no option ranges. Run `npm run build:packages`.'
  );
}

const titleOf = (html) => {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);

  // The separator before the site name: a middle dot, a pipe or a hyphen.
  return match
    ? decodeEntities(match[1].replace(/\s*[\u00b7|-]\s*Tabbied\s*$/i, '')).trim()
    : '';
};

// The name the gallery shows, read off the framed preview page's
// `tabbied:template-name` meta (app/templates/[slug]/page.tsx). A template's
// own <title> carries a tagline, and both are entity-encoded.
const galleryNameOf = (slug) => {
  const previewPath = path.join(repoRoot, 'out', 'templates', slug, 'index.html');

  if (!existsSync(previewPath)) return '';

  const match = /<meta\s+name="tabbied:template-name"\s+content="([^"]*)"/i.exec(
    readFileSync(previewPath, 'utf8')
  );

  return match ? decodeEntities(match[1]).trim() : '';
};

const fontsOf = (html) => {
  const href = /<link[^>]+href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"/i.exec(
    html
  );

  return href ? { href: href[1].replace(/&amp;/g, '&') } : undefined;
};

const slugs = readdirSync(exportDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  // out/templates/<slug>/ is the framed preview; the site is its site/.
  .filter((slug) => existsSync(path.join(exportDir, slug, 'site', 'index.html')))
  .filter((slug) => only.length === 0 || only.includes(slug))
  .sort();

if (only.length > 0) {
  const missing = only.filter((slug) => !slugs.includes(slug));

  if (missing.length > 0) {
    console.error(`editable: no exported page for ${missing.join(', ')}`);
    process.exit(1);
  }
}

// Generating everything rewrites the folder, so a retired site can't linger in
// the deploy. Naming slugs updates those in place.
if (only.length === 0) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const failures = [];
const specs = [];
let skipped = 0;

for (const slug of slugs) {
  const pagePath = path.join(exportDir, slug, 'site', 'index.html');
  const html = readFileSync(pagePath, 'utf8');
  const { slots, root, problems } = extractFromHtml(html, { designOptions });

  // A site with no annotations is not a failure, just one the editor cannot
  // open yet.
  if (!root && slots.length === 0) {
    skipped += 1;
    continue;
  }

  if (!root) {
    failures.push(
      `${slug}: ${slots.length} slot(s) but no [data-edit-root] - nothing ` +
        'declares how the palette is derived'
    );
    continue;
  }

  if (problems.length > 0) {
    failures.push(...problems.map((problem) => `${slug}: ${problem}`));
    continue;
  }

  const brand = slots.find((slot) => slot.id === 'brand.name');
  const fonts = fontsOf(html);
  const spec = {
    specVersion: SPEC_VERSION,
    site: {
      slug,
      name:
        galleryNameOf(slug) ||
        (brand && brand.kind === 'text' ? brand.value : '') ||
        titleOf(html) ||
        slug,
    },
    palette: {
      colors: root.colors,
      derivation: root.derivation,
      ...(root.flatSections ? { flatSections: true } : {}),
      // A `vars` page owns its property names, so the spec carries them, or a
      // re-color would have nowhere to write.
      ...(root.varNames ? { varNames: root.varNames } : {}),
    },
    ...(fonts ? { fonts } : {}),
    slots,
  };

  const specProblems = validateSpec(spec);

  if (hasErrors(specProblems)) {
    failures.push(`${slug}:\n${formatProblems(specProblems)}`);
    continue;
  }

  writeFileSync(
    path.join(outDir, `${slug}.json`),
    `${JSON.stringify(spec, null, 2)}\n`
  );

  specs.push(spec);
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`editable: ${failure}`);
  console.error(
    `editable: ${failures.length} problem(s) - every annotation must resolve ` +
      'to exactly one thing in the export.'
  );
  process.exit(1);
}

const counts = (spec, kind) =>
  spec.slots.filter((slot) => slot.kind === kind).length;

// The aggregate index the MCP `list_templates` tool serves, small enough to
// return whole. Merged rather than rewritten when slugs are named, so
// `npm run editable <slug>` keeps the other templates.
const entryOf = (spec) => ({
    slug: spec.site.slug,
    name: spec.site.name,
    href: `/templates/${spec.site.slug}/site/`,
    spec: `/editable/${spec.site.slug}.json`,
    palette: spec.palette.colors,
    patterns: [
      ...new Set(
        spec.slots
          .filter((slot) => slot.kind === 'pattern')
          .map((slot) => slot.config.slug)
      ),
    ],
    // Which pieces of brand copy this template can be handed; Studio reads it
    // to decide whether a direction can be previewed *as* the business.
    copyRoles: declaredCopyRoles(spec),
    slots: {
      text: counts(spec, 'text'),
      image: counts(spec, 'image'),
      pattern: counts(spec, 'pattern'),
    },
    downloads: {
      html: `/downloads/${spec.site.slug}-html.zip`,
      react: `/downloads/${spec.site.slug}-react.zip`,
    },
});

const previous =
  only.length > 0 && existsSync(catalogPath)
    ? JSON.parse(readFileSync(catalogPath, 'utf8')).templates ?? []
    : [];
const regenerated = new Set(specs.map((spec) => spec.site.slug));
const templates = [
  ...previous.filter((entry) => !regenerated.has(entry.slug)),
  ...specs.map(entryOf),
].sort((a, b) => a.slug.localeCompare(b.slug));

const catalog = {
  specVersion: SPEC_VERSION,
  generated: templates.length,
  templates,
};

writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

const totals = specs.reduce(
  (sum, spec) => ({
    text: sum.text + counts(spec, 'text'),
    image: sum.image + counts(spec, 'image'),
    pattern: sum.pattern + counts(spec, 'pattern'),
  }),
  { text: 0, image: 0, pattern: 0 }
);

console.log(
  `editable: ${specs.length} site(s) - ${totals.text} text, ${totals.image} ` +
    `image, ${totals.pattern} pattern slots; ${skipped} not yet annotated`
);
