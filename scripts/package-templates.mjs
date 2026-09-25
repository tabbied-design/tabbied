// Packages a template site as a downloadable, framework-free HTML template.
//
// The static export is the source of truth: a template is derived from the
// HTML `next build` rendered, never hand-ported (see "Downloadable templates"
// in CLAUDE.md).
//
// What comes out is a folder somebody can open from the filesystem and edit:
//
//   werkraum/
//     index.html          the export, minus the Next runtime, plain class names
//     styles/base.css     the site's global reset, verbatim
//     styles/werkraum.css the page's own stylesheet - the authored source file,
//                         comments and all, NOT the minified build output
//     images/             only the images this page references
//     README.md
//
// The build's CSS is minified with hashed class names
// (.werkraum-module__N8Ibmq__page). Rather than un-minify that, this ships the
// *authored* module file and rewrites the hashed names in the HTML back to the
// plain ones it uses.
//
// Usage:
//   node scripts/package-templates.mjs                # every packageable site
//   node scripts/package-templates.mjs werkraum       # one site
//   node scripts/package-templates.mjs --out-dir dist/downloads
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const exportDir = path.join(repoRoot, 'out');
// Derived, never typed: both READMEs quote it.
const DESIGN_COUNT = fsSync
  .readdirSync(path.join(repoRoot, 'packages', 'tabbied', 'patterns'))
  .filter((file) => file.endsWith('.json')).length;

/** The entities the export writes into <title> and attributes, undone. */
const unescapeHtml = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const templateDir = path.join(repoRoot, 'app', 'templates');
const publicDir = path.join(repoRoot, 'public');
const globalsCss = path.join(repoRoot, 'styles', 'globals.css');

// Sites the packager knowingly can't handle, skipped with their reason. Anything
// not in here that throws exits non-zero, which is what makes this safe to wire
// into a build.
const KNOWN_UNSUPPORTED = new Map();

// ---- archiving -----------------------------------------------------------

// `zip -qr <name>.zip <dir>`, in-process with fflate. Don't reintroduce a PATH
// lookup: Cloudflare's Workers Builds image ships `unzip` but not `zip`.
//
// Archived from the *parent*, so `dirName` is the first path segment of every
// entry and the zip expands into a named folder.
async function zipDirectory(parentDir, dirName, zipName) {
  /** @type {Record<string, [Uint8Array, { mtime: Date }]>} */
  const entries = {};

  // Zip entry names are always POSIX-separated, whatever the host uses.
  const entryName = (relativePath) => relativePath.split(path.sep).join('/');

  const walk = async (relativeDir) => {
    const absoluteDir = path.join(parentDir, relativeDir);
    // Every directory gets its own zero-length `<name>/` entry, as `zip -r`
    // writes one: it is the only record of an empty one, and a site with no
    // images would otherwise lose the `images/` (or `public/`) its README lists.
    entries[`${entryName(relativeDir)}/`] = [
      new Uint8Array(0),
      { mtime: (await fs.stat(absoluteDir)).mtime },
    ];

    const dirents = await fs.readdir(absoluteDir, { withFileTypes: true });
    for (const dirent of dirents) {
      const relativePath = path.join(relativeDir, dirent.name);
      if (dirent.isDirectory()) {
        await walk(relativePath);
        continue;
      }
      const absolutePath = path.join(parentDir, relativePath);
      entries[entryName(relativePath)] = [
        await fs.readFile(absolutePath),
        // The real mtime, as `zip -r` keeps it; fflate would stamp the time
        // the archive was written.
        { mtime: (await fs.stat(absolutePath)).mtime },
      ];
    }
  };

  await walk(dirName);

  const target = path.join(parentDir, zipName);
  await fs.rm(target, { force: true });
  // Level 6 is both `zip`'s default and fflate's.
  await fs.writeFile(target, zipSync(entries, { level: 6 }));

  return (await fs.stat(target)).size;
}

// ---- HTML surgery --------------------------------------------------------

// Everything Next.js needs to hydrate and nothing a static page does: the
// runtime chunks, the RSC flight payload inlined in <script>, and the
// stylesheet links that point into /_next/.
const stripNextRuntime = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*\bas="script"[^>]*>/g, '')
    .replace(/<link[^>]*href="\/_next\/[^"]*"[^>]*>/g, '');

// Tabbied's own share card, canonical URL, favicons, manifest, tile and theme
// color: they resolve against tabbied.com, and a site made from the template
// must not carry them. The template pages set none of the first two, so those
// lines are a backstop.
const stripSiteChrome = (html) =>
  html
    .replace(/<meta[^>]*property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta[^>]*name="twitter:[^"]*"[^>]*>/g, '')
    .replace(/<link[^>]*rel="canonical"[^>]*>/g, '')
    .replace(/<link[^>]*rel="manifest"[^>]*>/g, '')
    .replace(/<link[^>]*rel="(icon|apple-touch-icon|mask-icon)"[^>]*>/g, '')
    .replace(/<meta[^>]*name="msapplication-TileColor"[^>]*>/g, '')
    .replace(/<meta[^>]*name="theme-color"[^>]*>/g, '');

// Traces of the renderer that mean nothing without it: Suspense boundary
// markers (matched exactly, so comments the page's author wrote survive),
// the empty div React parks them in, and the stylesheet-ordering attribute
// React uses to hoist <link>s.
const stripReactArtifacts = (html) =>
  html
    .replace(/<!--\/?\$[!?]?-->/g, '')
    .replace(/<div hidden(?:="")?>\s*<\/div>/g, '')
    .replace(/\s*data-precedence="[^"]*"/g, '');

/**
 * Rewrite hashed CSS-module class names back to the plain names the authored
 * stylesheet uses: `werkraum-module__N8Ibmq__heroTitle` -> `heroTitle`.
 *
 * Fails loudly on the two things that would silently corrupt a template: more
 * than one CSS module on the page (this ships exactly one stylesheet), and two
 * hashed names that collapse onto the same plain name (which would merge two
 * unrelated rules).
 */
function dehashClassNames(html, slug) {
  const hashedClass = /([A-Za-z0-9_-]+)-module__([A-Za-z0-9_]+)__([A-Za-z0-9_-]+)/g;
  const modules = new Set();
  const collisions = new Map();

  for (const [, moduleName, hash, localName] of html.matchAll(hashedClass)) {
    modules.add(`${moduleName}-module__${hash}__`);

    const seen = collisions.get(localName);
    const source = `${moduleName}__${hash}`;

    if (seen && seen !== source) {
      throw new Error(
        `${slug}: two CSS modules both define ".${localName}" - de-hashing ` +
          `would merge them. Package this site by hand or rename one.`
      );
    }

    collisions.set(localName, source);
  }

  if (modules.size > 1) {
    throw new Error(
      `${slug}: page uses ${modules.size} CSS modules (${[...modules].join(
        ', '
      )}). This packager ships one stylesheet per site.`
    );
  }

  return {
    html: html.replace(hashedClass, (_m, _module, _hash, localName) => localName),
    // Which module the page's classes came from, and which of its classes the
    // page actually uses - both needed to pick and trim the stylesheet.
    moduleName: [...modules][0]?.replace(/-module__[A-Za-z0-9_]+__$/, '') ?? null,
    usedClasses: new Set(collisions.keys()),
  };
}

/**
 * The stylesheet to ship, and whether it is shared. A site's own
 * `<slug>.module.css` ships verbatim; the sites built on the shared
 * TemplateSite component have none and get the component's, trimmed later by
 * trimUnusedRules.
 */
async function resolveStylesheet(slug, moduleName) {
  const own = path.join(templateDir, slug, 'site', `${slug}.module.css`);

  try {
    return { css: await fs.readFile(own, 'utf-8'), shared: false };
  } catch {
    // Fall through to the shared component sheet the page's classes came from.
  }

  if (!moduleName) {
    throw new Error(`${slug}: no CSS module on the page and no ${slug}.module.css`);
  }

  const sharedPath = path.join(
    repoRoot,
    'components',
    'template',
    `${moduleName}.module.css`
  );

  try {
    return { css: await fs.readFile(sharedPath, 'utf-8'), shared: true };
  } catch {
    throw new Error(
      `${slug}: page uses ${moduleName}.module.css, which isn't at ` +
        `${path.relative(repoRoot, sharedPath)}`
    );
  }
}

/**
 * Point every asset at the template's own folder, and report which files need
 * copying. The build appends a content hash (`?v=d9e0e0f1`) to bust the cache
 * behind a stable slug; a template served from disk doesn't need it.
 */
function rewriteImagePaths(html) {
  const used = new Set();
  // Flattening keeps only the file name, so two same-named files from two
  // folders would silently overwrite each other. Fail instead.
  const byBasename = new Map();

  const rewritten = html.replace(
    /\/images\/([A-Za-z0-9/_-]+\.(?:webp|png|jpg|jpeg|svg|avif))(\?v=[a-z0-9]+)?/g,
    (_match, relativePath) => {
      const basename = path.basename(relativePath);
      const previous = byBasename.get(basename);

      if (previous && previous !== relativePath) {
        throw new Error(
          `two images flatten to images/${basename}: ${previous} and ${relativePath}`
        );
      }

      byBasename.set(basename, relativePath);
      used.add(relativePath);
      return `./images/${basename}`;
    }
  );

  return { html: rewritten, used: [...used] };
}

/** The pattern slugs the page mounts, in first-appearance order. */
const patternSlugs = (html) => [
  ...new Set([...html.matchAll(/data-pattern="([a-z0-9]+)"/g)].map((m) => m[1])),
];

// ---- CSS -----------------------------------------------------------------

/**
 * The authored stylesheet, made valid outside the CSS-modules pipeline.
 * `:global(img)` is not CSS (a browser drops the whole rule), and once class
 * names are plain, unwrapping it to `img` is exactly equivalent. `composes:`
 * is removed by dropComposes.
 */
function prepareStylesheet(css, slug, usedClasses) {
  return dropComposes(css, slug, usedClasses).replace(
    /:global\(([^)]*)\)/g,
    '$1'
  );
}

/**
 * Remove `composes:` declarations, having checked they were already resolved.
 *
 * CSS Modules resolves a local `composes` in the *markup*:
 * `.h2Light { composes: h2 }` compiles to `class="...__h2Light ...__h2"`, and
 * both rules are already in the sheet, so the declaration is inert. That is a
 * premise about the build's output, so it is verified: a page using the
 * composing class without the composed one fails. `composes ... from` would
 * be a second module, which dehashClassNames already rejects.
 */
function dropComposes(css, slug, usedClasses) {
  const problems = [];

  // CSS Modules only allows `composes` in a single-class block, so a
  // nesting-free block match is safe.
  const out = css.replace(
    /\.([A-Za-z0-9_-]+)([^{}]*)\{([^{}]*)\}/g,
    (rule, className, _rest, body) => {
      const declarations = [...body.matchAll(/composes\s*:\s*([^;}]+)/g)];

      if (declarations.length === 0) return rule;

      for (const [, value] of declarations) {
        for (const composed of value.trim().split(/\s+/)) {
          if (usedClasses.has(className) && !usedClasses.has(composed)) {
            problems.push(
              `.${className} composes .${composed}, but the markup carries ` +
                `only .${className} - the build did not resolve it`
            );
          }
        }
      }

      return rule.replace(/[ \t]*composes\s*:[^;}]+;?\n?/g, '');
    }
  );

  if (problems.length > 0) {
    throw new Error(`${slug}: ${problems.join('; ')}`);
  }

  return out;
}

/**
 * Drop rules that can never match the page. Only the shared
 * TemplateSite.module.css is trimmed; it carries layout kits for other sites.
 *
 * Conservative: a rule goes only when some class it needs is absent from the
 * page. A selector with no class (`html`, `:root`) is always kept, and lists
 * are filtered per selector, so `.used, .dead` keeps `.used`. Safe only
 * because the packaged page has no framework left to add a class after load.
 */
function trimUnusedRules(css, usedClasses) {
  // Every class the selector requires. `.a.b .c:hover::after` -> a, b, c.
  const classesIn = (selector) =>
    [...selector.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)].map((m) => m[1]);

  const keepSelector = (selector) => {
    const classes = classesIn(selector);
    return classes.length === 0 || classes.every((c) => usedClasses.has(c));
  };

  // Split on the commas between selectors, not the ones inside `:is(.a, .b)`
  // or `:not(.a, .b)`, which a naive split breaks into invalid CSS.
  const splitSelectorList = (text) => {
    const parts = [];
    let depth = 0;
    let current = '';

    for (const char of text) {
      if (char === '(') depth += 1;
      else if (char === ')') depth = Math.max(0, depth - 1);

      if (char === ',' && depth === 0) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    parts.push(current);

    return parts.map((part) => part.trim()).filter(Boolean);
  };

  // Scanning must skip comments: one contains a literal `{ color: inherit }`,
  // which desynchronizes a naive brace count. Don't simplify this back to
  // `indexOf('{')`.
  const COMMENT = /\/\*[\s\S]*?\*\//g;

  // Index of the next `char` at top level, ignoring anything inside a comment.
  const scan = (source, from, chars) => {
    let index = from;

    while (index < source.length) {
      if (source[index] === '/' && source[index + 1] === '*') {
        const close = source.indexOf('*/', index + 2);
        index = close === -1 ? source.length : close + 2;
        continue;
      }
      if (chars.includes(source[index])) return index;
      index += 1;
    }

    return -1;
  };

  const walk = (source) => {
    let out = '';
    let index = 0;

    while (index < source.length) {
      const brace = scan(source, index, '{');

      if (brace === -1) {
        out += source.slice(index);
        break;
      }

      // Match the block this brace opens, comments excepted.
      let depth = 1;
      let end = brace + 1;
      while (end < source.length && depth > 0) {
        const next = scan(source, end, '{}');
        if (next === -1) { end = source.length; break; }
        depth += source[next] === '{' ? 1 : -1;
        end = next + 1;
      }

      const prelude = source.slice(index, brace);
      const body = source.slice(brace + 1, end - 1);
      // Comments are stripped before parsing the selector, since they may name
      // classes, and put back on the way out.
      const selectorText = prelude.replace(COMMENT, '').trim();

      if (/^@(media|supports|container|layer)/.test(selectorText)) {
        const inner = walk(body);
        // An at-rule whose every child was dropped goes with them.
        if (inner.trim()) out += `${prelude}{${inner}}`;
      } else if (selectorText.startsWith('@')) {
        out += `${prelude}{${body}}`; // @font-face, @keyframes: keep whole
      } else {
        const kept = splitSelectorList(selectorText).filter(keepSelector);

        if (kept.length) {
          const comments = (prelude.match(COMMENT) ?? []).join('\n');
          out += `\n${comments ? comments + '\n' : ''}${kept.join(',\n')} {${body}}\n`;
        }
      }

      index = end;
    }

    return out;
  };

  return walk(css);
}

// ---- React package -------------------------------------------------------

// The React format is a copy of the page, not a port: a template page is
// already a plain React component whose only Next.js API is
// `export const metadata`. Only the frame around it changes, and Vite resolves
// `.module.css` natively, so the CSS ships untransformed.

// Packages a template page may import that are *not* copied in as source,
// keyed to the range the scaffold installs. `tabbied` itself is always a
// dependency, pinned separately from the workspace version.
const TEMPLATES_PACKAGE_VERSION = `^${
  JSON.parse(
    fsSync.readFileSync(
      path.join(repoRoot, 'packages', 'tabbied-templates', 'package.json'),
      'utf-8'
    )
  ).version
}`;

const EXTERNAL_DEPENDENCIES = new Map([
  ['lucide-react', '^1.17.0'],
  ['tabbied-templates', TEMPLATES_PACKAGE_VERSION],
]);

// Local modules a page may import by workspace path, and where each lands.
const LOCAL_IMPORTS = new Map([
  ['components/Figure', { from: 'components/Figure.tsx', to: 'Figure.tsx' }],
  ['components/template/TemplateSite', { from: 'components/template/TemplateSite.tsx', to: 'TemplateSite.tsx' }],
  ['components/template/templateData', { from: 'components/template/templateData.ts', to: 'templateData.ts' }],
  ['components/template/templateContent', { from: 'components/template/templateContent.ts', to: 'templateContent.ts' }],
  ['components/template/templateSections', { from: 'components/template/templateSections.ts', to: 'templateSections.ts' }],
  ['components/template/generatedImages', { from: 'components/template/generatedImages.ts', to: 'generatedImages.ts' }],
  ['components/template/ImageCard', { from: 'components/template/ImageCard.tsx', to: 'ImageCard.tsx' }],
  ['components/template/TemplateMenu', { from: 'components/template/TemplateMenu.tsx', to: 'TemplateMenu.tsx' }],
]);

/** Strip the one Next-ism and point local imports at their copied neighbors. */
function toStandaloneComponent(source, componentName) {
  let out = source
    .replace(/^import type \{ Metadata \}[^\n]*\n/m, '')
    // `export const metadata = { ... };` - lifted into index.html instead.
    .replace(/^export const metadata(?::\s*Metadata)?\s*=\s*\{[\s\S]*?\n\};\n/m, '');

  for (const [specifier, target] of LOCAL_IMPORTS) {
    out = out.replaceAll(`'${specifier}'`, `'./${target.to.replace(/\.tsx?$/, '')}'`);
  }

  out = out.replaceAll(`'lib/generated/images'`, `'./images'`);

  // The page's default export is the app's root component.
  out = out.replace(/export default function \w+\(/, `export default function ${componentName}(`);

  return out.replace(/\n{3,}/g, '\n\n').trimStart();
}

/**
 * Which local modules a set of sources pulls in, transitively: by workspace
 * path (`components/template/TemplateSite`) or relatively from a sibling
 * (`./templateContent`). Every copy lands flat in `src/`, so the relative ones
 * already resolve and only have to be present.
 */
function collectLocalImports(sources) {
  const needed = new Map();
  const queue = [...sources];

  const siblingsOf = (from) => {
    const dir = path.dirname(from);
    return [...LOCAL_IMPORTS.entries()].filter(
      ([, target]) => path.dirname(target.from) === dir
    );
  };

  while (queue.length > 0) {
    const { source, from } = queue.pop();
    const candidates = [
      ...LOCAL_IMPORTS.entries(),
      ...(from ? siblingsOf(from) : []),
    ];

    for (const [specifier, target] of candidates) {
      if (needed.has(specifier)) continue;

      const base = path.basename(target.from, path.extname(target.from));
      const byPath = new RegExp(`['"]${specifier}['"]`).test(source);
      const byRelative = new RegExp(`['"]\\./${base}['"]`).test(source);

      if (!byPath && !byRelative) continue;

      needed.set(specifier, target);
      queue.push({
        source: fsSync.readFileSync(path.join(repoRoot, target.from), 'utf-8'),
        from: target.from,
      });
    }
  }

  return needed;
}

const REACT_README = (slug, name, version) => `# ${name} - React template

The same page as the HTML download, as a Vite + React app.

\`\`\`bash
npm install
npm run dev
\`\`\`

\`\`\`
src/App.tsx              the page - edit this
src/${slug}.module.css${' '.repeat(Math.max(0, 12 - slug.length))} its stylesheet, a CSS module
src/main.tsx             mounts App
public/images/           the photography this page uses
\`\`\`

## The patterns

Blocks of pattern are \`<TabbiedPattern>\` elements from
[tabbied](https://www.npmjs.com/package/tabbied) (v${version}), rendered live by
[css-doodle](https://css-doodle.com/) - not images:

\`\`\`tsx
<TabbiedPattern pattern={ortho} palette={['transparent', '#C9C8C1']} fit="grid" />
\`\`\`

Swap \`pattern\` for any of the ${DESIGN_COUNT} designs (see https://tabbied.com), change
\`palette\` to recolor, or set \`seed\` to pin one arrangement.

## Images

The photography is AI-generated and ships with this template.
`;

async function packageReactSite(slug, outDir, version, name, images) {
  const pageSource = await fs.readFile(
    path.join(templateDir, slug, 'site', 'page.tsx'),
    'utf-8'
  );

  const locals = collectLocalImports([
    { source: pageSource, from: path.join('app/templates', slug, 'site', 'page.tsx') },
  ]);
  const siteDir = path.join(outDir, `${slug}-react`);
  const srcDir = path.join(siteDir, 'src');

  await fs.rm(siteDir, { recursive: true, force: true });
  await fs.mkdir(srcDir, { recursive: true });
  await fs.mkdir(path.join(siteDir, 'public', 'images'), { recursive: true });

  await fs.writeFile(
    path.join(srcDir, 'App.tsx'),
    toStandaloneComponent(pageSource, 'App')
  );

  // The dependencies are derived from what the shipped source imports, not
  // maintained by hand: a missing one fails in somebody else's folder.
  const externals = new Set();
  const noteExternals = (source) => {
    for (const name of EXTERNAL_DEPENDENCIES.keys()) {
      if (new RegExp(`from '${name}(?:/[^']*)?'`).test(source)) {
        externals.add(name);
      }
    }
  };

  noteExternals(pageSource);

  for (const target of locals.values()) {
    const source = await fs.readFile(path.join(repoRoot, target.from), 'utf-8');
    noteExternals(source);
    await fs.writeFile(
      path.join(srcDir, target.to),
      toStandaloneComponent(source, path.basename(target.to, path.extname(target.to)))
    );
  }

  // Figure reads intrinsic dimensions from the site-wide manifest; ship only
  // the entries this page can ask for, so the template carries no other site.
  if (locals.has('components/Figure')) {
    const manifest = JSON.parse(
      (await fs.readFile(path.join(repoRoot, 'lib/generated/images.js'), 'utf-8'))
        .replace(/^[\s\S]*?export default /, '')
        .replace(/;\s*$/, '')
    );
    // Entries keep their site `base`, since the images keep their sub-paths.
    const mine = Object.fromEntries(
      Object.entries(manifest).filter(([id]) =>
        images.some((file) => path.basename(file, '.webp') === id)
      )
    );
    await fs.writeFile(
      path.join(srcDir, 'images.ts'),
      `// Intrinsic dimensions for this page's images, so it reserves layout\n` +
        `// space before they load. Trimmed from the site-wide manifest.\n` +
        `export default ${JSON.stringify(mine, null, 2)} as Record<string, { hash: string; width: number; height: number; base?: string }>;\n`
    );
  }

  const own = path.join(templateDir, slug, 'site', `${slug}.module.css`);
  if (fsSync.existsSync(own)) {
    await fs.copyFile(own, path.join(srcDir, `${slug}.module.css`));
  }
  if (locals.has('components/template/TemplateSite')) {
    await fs.copyFile(
      path.join(repoRoot, 'components/template/TemplateSite.module.css'),
      path.join(srcDir, 'TemplateSite.module.css')
    );
  }

  await fs.copyFile(globalsCss, path.join(srcDir, 'base.css'));

  // Images keep their site sub-paths (`sites/...`, `template/...`), unlike the
  // HTML package: the source asks for them by their authored URL (ImageCard
  // hardcodes `/images/template/<id>.webp`), and Vite answers a miss under
  // `public/` with index.html, so flattening blanks them silently.
  for (const relativePath of images) {
    const destination = path.join(siteDir, 'public', 'images', relativePath);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(path.join(publicDir, 'images', relativePath), destination);
  }

  const dependencies = {
    react: '^19.2.0',
    'react-dom': '^19.2.0',
    tabbied: `^${version}`,
    ...Object.fromEntries(
      [...externals].sort().map((name) => [name, EXTERNAL_DEPENDENCIES.get(name)])
    ),
  };

  await fs.writeFile(
    path.join(siteDir, 'package.json'),
    JSON.stringify(
      {
        name: `${slug}-template`,
        private: true,
        type: 'module',
        scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
        dependencies,
        devDependencies: {
          '@vitejs/plugin-react': '^5.0.0',
          typescript: '^5.9.0',
          vite: '^7.1.0',
        },
      },
      null,
      2
    ) + '\n'
  );

  await fs.writeFile(
    path.join(siteDir, 'vite.config.ts'),
    `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });\n`
  );

  await fs.writeFile(
    path.join(siteDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          lib: ['DOM', 'DOM.Iterable', 'ES2020'],
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          allowImportingTsExtensions: true,
          noEmit: true,
          resolveJsonModule: true,
        },
        include: ['src'],
      },
      null,
      2
    ) + '\n'
  );

  await fs.writeFile(
    path.join(srcDir, 'main.tsx'),
    `import { StrictMode } from 'react';\n` +
      `import { createRoot } from 'react-dom/client';\n` +
      `import App from './App';\n` +
      `import './base.css';\n\n` +
      `createRoot(document.getElementById('root')!).render(\n` +
      `  <StrictMode>\n    <App />\n  </StrictMode>\n);\n`
  );

  // The <head> Next's metadata export gave the page on the site.
  await fs.writeFile(
    path.join(siteDir, 'index.html'),
    `<!doctype html>\n<html lang="en">\n  <head>\n` +
      `    <meta charset="utf-8" />\n` +
      `    <meta name="viewport" content="width=device-width, initial-scale=1" />\n` +
      `    <title>${escapeHtml(name)}</title>\n` +
      `    <link rel="preconnect" href="https://fonts.googleapis.com" />\n` +
      `    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n` +
      `  </head>\n  <body>\n    <div id="root"></div>\n` +
      `    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>\n`
  );

  await fs.writeFile(
    path.join(siteDir, 'README.md'),
    REACT_README(slug, name, version)
  );

  return zipDirectory(outDir, `${slug}-react`, `${slug}-react.zip`);
}

// ---- emit ----------------------------------------------------------------

const README = (slug, name, version, slugs) => `# ${name}

A Tabbied template, packaged as a plain HTML template. No build step, no
framework - open \`index.html\` in a browser and it runs.

\`\`\`
index.html            the page
styles/base.css       global reset
styles/${slug}.css${' '.repeat(Math.max(0, 14 - slug.length))}this page's stylesheet - edit this one
images/               the photography this page uses
\`\`\`

## The patterns are live, not images

The blocks of pattern are generated in the browser by
[css-doodle](https://css-doodle.com/) through
[tabbied](https://www.npmjs.com/package/tabbied). Each one is a plain \`<div>\`
that describes itself in \`data-\` attributes:

\`\`\`html
<div data-pattern="${slugs[0]}" data-palette="transparent, #C9C8C1"
     data-fit="grid" data-redraw-interval="5200"></div>
\`\`\`

Change \`data-palette\` to recolor it, \`data-pattern\` to swap the design
(${DESIGN_COUNT} to choose from - see https://tabbied.com), \`data-seed\` to pin a
particular arrangement, or drop \`data-redraw-interval\` to hold it still.
The script at the bottom of \`index.html\` is what brings them to life; remove
it and the patterns disappear.

## Fonts

The page links its webfonts from Google Fonts and Adobe Fonts. Self-host them
if you'd rather not depend on a CDN.

## Images

The photography is AI-generated and ships with this template.

## Credits

Patterns by [Tabbied](https://tabbied.com) (tabbied@${version}), MIT licensed.
`;

const bootstrapScript = (version, slugs) => `
    <!-- Brings the [data-pattern] blocks above to life. Pinned to a version so
         the template keeps rendering the way it looked when you downloaded it. -->
    <script type="module">
      import { hydratePatterns } from 'https://esm.sh/tabbied@${version}';
      import { ${slugs.join(
        ', '
      )} } from 'https://esm.sh/tabbied@${version}/patterns';

      hydratePatterns({ patterns: { ${slugs.join(', ')} } });
    </script>
`;

// TemplateMenu's close-on-link/outside-click/Escape behavior, for the package
// with no React left. A plain script rather than part of the bootstrap, since
// the Studio preview replaces the esm.sh bootstrap and this should survive it.
const MENU_SCRIPT = `
    <!-- Closes the small-screen menu on a followed link, a click outside, or Escape. -->
    <script>
      document.addEventListener('click', function (event) {
        document.querySelectorAll('details.template-menu[open]').forEach(function (menu) {
          if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
        });
      });
      document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('details.template-menu[open]').forEach(function (menu) {
          menu.open = false;
          menu.querySelector('summary').focus();
        });
      });
    </script>
`;

async function packageSite(slug, outDir, version) {
  const source = path.join(exportDir, 'templates', slug, 'site', 'index.html');

  let html;

  try {
    html = await fs.readFile(source, 'utf-8');
  } catch {
    throw new Error(
      `${slug}: no static export at ${path.relative(repoRoot, source)} - ` +
        `run \`npm run build\` first.`
    );
  }

  const slugs = patternSlugs(html);

  if (slugs.length === 0) {
    throw new Error(`${slug}: no [data-pattern] elements in the export.`);
  }

  html = stripReactArtifacts(stripSiteChrome(stripNextRuntime(html)));

  const dehashed = dehashClassNames(html, slug);
  const { moduleName, usedClasses } = dehashed;
  html = dehashed.html;

  const images = rewriteImagePaths(html);
  html = images.html;

  // The two stylesheets replace the /_next/ links that were just stripped.
  html = html.replace(
    '</head>',
    '<link rel="stylesheet" href="./styles/base.css"/>' +
      `<link rel="stylesheet" href="./styles/${slug}.css"/></head>`
  );
  html = html.replace(
    '</body>',
    `${html.includes('template-menu') ? MENU_SCRIPT : ''}${bootstrapScript(version, slugs)}  </body>`
  );

  const siteDir = path.join(outDir, slug);
  await fs.rm(siteDir, { recursive: true, force: true });
  await fs.mkdir(path.join(siteDir, 'styles'), { recursive: true });
  await fs.mkdir(path.join(siteDir, 'images'), { recursive: true });

  await fs.writeFile(path.join(siteDir, 'index.html'), html);
  await fs.copyFile(globalsCss, path.join(siteDir, 'styles', 'base.css'));

  const stylesheet = await resolveStylesheet(slug, moduleName);
  let siteCss = prepareStylesheet(stylesheet.css, slug, usedClasses);

  if (stylesheet.shared) {
    const before = siteCss.length;
    siteCss = trimUnusedRules(siteCss, usedClasses);
    stylesheet.trimmedPercent = Math.round((1 - siteCss.length / before) * 100);
  }

  await fs.writeFile(path.join(siteDir, 'styles', `${slug}.css`), siteCss);

  for (const relativePath of images.used) {
    await fs.copyFile(
      path.join(publicDir, 'images', relativePath),
      path.join(siteDir, 'images', path.basename(relativePath))
    );
  }

  // The page's <title> is the site's name, with the export's entities decoded.
  const name = unescapeHtml(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? slug);
  await fs.writeFile(
    path.join(siteDir, 'README.md'),
    README(slug, name, version, slugs)
  );

  const size = await zipDirectory(outDir, slug, `${slug}-html.zip`);

  const reactSize = await packageReactSite(slug, outDir, version, name, images.used);

  return {
    slug,
    patterns: slugs.length,
    images: images.used.length,
    size,
    reactSize,
    sharedCss: stylesheet.shared ? stylesheet.trimmedPercent : null,
  };
}

// ---- cli -----------------------------------------------------------------

const args = process.argv.slice(2);
const outDirIndex = args.indexOf('--out-dir');

if (outDirIndex !== -1 && !args[outDirIndex + 1]) {
  console.error('package-templates: --out-dir needs a path');
  process.exit(1);
}

const outDir = path.resolve(
  repoRoot,
  // Not out/templates, which is the exported /templates route.
  outDirIndex === -1 ? 'out/downloads' : args[outDirIndex + 1]
);
// Positional args are slugs. A flag's value is not one.
const flagValueIndexes = new Set(
  args.flatMap((arg, index) => (arg.startsWith('--') ? [index + 1] : []))
);
const requested = args.filter(
  (arg, index) => !arg.startsWith('--') && !flagValueIndexes.has(index)
);

// Templates pin the package version so a download keeps rendering the way it
// looked. The workspace version is already bumped by changesets when a release
// builds the site; override it to package against an unreleased build.
const versionIndex = args.indexOf('--tabbied-version');
const version =
  versionIndex !== -1
    ? args[versionIndex + 1]
    : JSON.parse(
        await fs.readFile(
          path.join(repoRoot, 'packages', 'tabbied', 'package.json'),
          'utf-8'
        )
      ).version;

// A template site is app/templates/<slug>/site/page.tsx; the folder also
// holds the framed preview's [slug] route.
const packageable = (await fs.readdir(templateDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => fsSync.existsSync(path.join(templateDir, slug, 'site', 'page.tsx')))
  .sort();

const targets = requested.length > 0 ? requested : packageable;

// Packaging everything wipes the folder first, so a retired site can't linger
// in the deploy. Naming a slug repackages just that one, in place.
if (requested.length === 0) {
  await fs.rm(outDir, { recursive: true, force: true });
}

await fs.mkdir(outDir, { recursive: true });

let written = 0;
let skipped = 0;
let failed = 0;

for (const slug of targets) {
  const knownReason = KNOWN_UNSUPPORTED.get(slug);

  // A site named explicitly is still attempted, for a fresh error message.
  if (knownReason && requested.length === 0) {
    skipped += 1;
    console.log(`package-templates: skipping ${slug} - ${knownReason}`);
    continue;
  }

  try {
    const result = await packageSite(slug, outDir, version);
    written += 1;
    console.log(
      `package-templates: ${result.slug} - ${result.patterns} pattern(s), ` +
        `${result.images} image(s), html ${(result.size / 1024).toFixed(0)} KB ` +
        `+ react ${(result.reactSize / 1024).toFixed(0)} KB` +
        (result.sharedCss !== null
          ? ` (shared stylesheet, ${result.sharedCss}% trimmed)`
          : '')
    );
  } catch (error) {
    failed += 1;
    console.error(`package-templates: ${slug} - ${error.message}`);
  }
}

console.log(
  `package-templates: wrote ${written} template(s) to ` +
    `${path.relative(repoRoot, outDir)}` +
    (skipped > 0 ? `, skipped ${skipped} known-unsupported` : '') +
    (failed > 0 ? `, ${failed} FAILED` : '')
);

if (failed > 0) {
  process.exitCode = 1;
}
