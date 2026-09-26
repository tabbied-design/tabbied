// The packaged HTML templates: does a zip somebody downloads actually work?
//
// Keeps `scripts/package-templates.mjs` honest: the templates are derived from
// the static export, so a change to a template page silently reshapes them.
//
// Requires `npm run build && node scripts/package-templates.mjs`; the suite
// skips (loudly) rather than failing when the templates aren't there.
import { test, expect } from '@playwright/test';
import { unzipSync } from 'fflate';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const PACKAGE_DIR = path.join(REPO_ROOT, 'packages', 'tabbied');
const dirFor = (slug: string) =>
  path.join(REPO_ROOT, 'out', 'downloads', slug);

// One site per stylesheet path, since they fail differently. werkraum ships
// its own `<slug>.module.css` verbatim. solstice is built on the shared
// TemplateSite component, whose sheet is trimmed to what the page can match.
// hopscotch-museum's sheet uses `composes:`, which the packager drops after
// checking the build put both classes on the element.
const FIXTURES = [
  { slug: 'werkraum', shared: false, patterns: 8, hero: 'werkraum-hero.webp' },
  { slug: 'solstice', shared: true, patterns: 4, hero: null },
  { slug: 'hopscotch-museum', shared: false, patterns: 8, hero: null },
] as const;

// The template pins its bootstrap to the published package on esm.sh. Serving
// this branch's built dist in its place keeps the test offline and exercises
// the code about to ship.
const distFileFor = (url: string): string | null => {
  const pathname = new URL(url).pathname;

  if (/^\/tabbied@[^/]+\/patterns$/.test(pathname)) {
    return path.join(PACKAGE_DIR, 'dist', 'patterns.generated.js');
  }
  if (/^\/tabbied@[^/]+$/.test(pathname)) {
    return path.join(PACKAGE_DIR, 'dist', 'core', 'index.js');
  }
  // Relative imports inside the served modules resolve against esm.sh's root
  // (the base URL is /tabbied@x), so they arrive here as bare filenames.
  const file = path.join(PACKAGE_DIR, 'dist', 'core', path.basename(pathname));

  return fs.existsSync(file) ? file : null;
};

for (const fixture of FIXTURES) {
  const TEMPLATE_DIR = dirFor(fixture.slug);

  test.describe(`packaged HTML template (${fixture.slug})`, () => {
  test.skip(
    !fs.existsSync(path.join(TEMPLATE_DIR, 'index.html')),
    `run \`node scripts/package-templates.mjs ${fixture.slug}\` first`
  );

  test('opens standalone and brings its patterns up', async ({ page }) => {
    const cssDoodle = fs.readFileSync(
      path.join(REPO_ROOT, 'node_modules', 'css-doodle', 'css-doodle.min.js'),
      'utf-8'
    );

    await page.route('https://esm.sh/**', async (route) => {
      const url = route.request().url();

      // register.js imports 'css-doodle' as a bare specifier, which a browser
      // can't resolve on its own - serve it from the same origin.
      if (url.endsWith('/css-doodle')) {
        return route.fulfill({
          status: 200,
          body: cssDoodle,
          headers: { 'content-type': 'application/javascript' },
        });
      }

      const file = distFileFor(url);

      if (!file) return route.fulfill({ status: 404, body: '' });

      return route.fulfill({
        status: 200,
        body: fs
          .readFileSync(file, 'utf-8')
          // Only the import specifier - the same string appears as a tag name
          // in document.createElement('css-doodle'), which must not be touched.
          .replace(
            /\b(import|from)\s+(['"])css-doodle\2/g,
            '$1 "https://esm.sh/css-doodle"'
          ),
        headers: { 'content-type': 'application/javascript' },
      });
    });

    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    // The trailing slash is deliberate: `serve` rewrites `<dir>/index.html`
    // to an extensionless `<dir>`, every relative asset then resolves a level
    // too high, and this would silently test an unstyled page.
    await page.goto(`/downloads/${fixture.slug}/`);

    const hosts = page.locator('[data-pattern]');
    await expect(hosts).toHaveCount(fixture.patterns);

    // Every placeholder gets a live element, and they paint.
    await expect
      .poll(
        () => page.locator('[data-pattern] css-doodle').count(),
        { timeout: 20000 }
      )
      .toBe(fixture.patterns);

    await expect
      .poll(
        () =>
          page.evaluate(() =>
            [...document.querySelectorAll('css-doodle')].reduce(
              (total, element) =>
                total +
                (element.shadowRoot?.querySelectorAll('cssd-cell').length ?? 0),
              0
            )
          ),
        { timeout: 20000 }
      )
      .toBeGreaterThan(100);

    expect(errors).toEqual([]);
  });

  test('carries no build-tool residue', () => {
    const html = fs.readFileSync(
      path.join(TEMPLATE_DIR, 'index.html'),
      'utf-8'
    );

    // Hashed class names, the Next runtime and the RSC payload are exactly
    // what makes an export unusable as a template.
    expect(html).not.toMatch(/-module__[A-Za-z0-9_]+__/);
    expect(html).not.toContain('/_next/');
    expect(html).not.toContain('__next_f');
    expect(html).not.toMatch(/<!--\/?\$[!?]?-->/);
    expect(html).not.toContain('data-precedence');

    // Assets are relative, so the folder works opened from disk.
    expect(html).not.toMatch(/(?:src|href)="\/images\//);
    if (fixture.hero) expect(html).toContain(`./images/${fixture.hero}`);
    expect(html).toContain(`./styles/${fixture.slug}.css`);

    const css = fs.readFileSync(
      path.join(TEMPLATE_DIR, 'styles', `${fixture.slug}.css`),
      'utf-8'
    );

    // Readable, not minified, and free of CSS-modules-only syntax.
    expect(css).toContain('/*');
    expect(css).not.toContain(':global(');
    expect(css).not.toContain('composes:');

    // Every class the markup uses must survive into the stylesheet, in a
    // rule: comments are stripped first because they name classes too.
    const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const declared = new Set(
      [...withoutComments.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)].map((m) => m[1])
    );
    const onPage = new Set<string>();
    for (const attr of html.matchAll(/class="([^"]*)"/g)) {
      for (const name of attr[1].split(/\s+/)) if (name) onPage.add(name);
    }
    // Hooks rather than styles: lucide's icon classes and Figure's
    // `figure`/`figure--cutout` markers. A page that styles neither is not
    // missing anything.
    const HOOKS = new Set([
      'figure',
      'figure--cutout',
      // TemplateMenu's shape, declared in base.css (styles/globals.css).
      'template-menu',
      'template-menu__toggle',
      'template-menu__icon',
      'template-menu__panel',
      // Artwork's, likewise in base.css.
      'artwork',
      'artwork--mask',
      'artwork--masks',
      'artwork__layer',
      'artwork--vector',
      'artwork--duotone',
      'artwork--tint',
      'artwork--fill',
      'artwork__shade',
      'artwork--cover',
    ]);
    const orphans = [...onPage].filter(
      (name) =>
        !declared.has(name) && !name.startsWith('lucide') && !HOOKS.has(name)
    );
    expect(orphans, `classes used by the page but absent from its stylesheet`)
      .toEqual([]);

    // Braces balance: the trim walks the sheet by hand, skipping comments
    // that contain a literal `{`.
    expect((withoutComments.match(/\{/g) ?? []).length).toBe(
      (withoutComments.match(/\}/g) ?? []).length
    );

    // Every image the page references was copied in.
    for (const match of html.matchAll(/\.\/images\/([^"']+)/g)) {
      expect(
        fs.existsSync(path.join(TEMPLATE_DIR, 'images', match[1])),
        `${match[1]} should be packaged`
      ).toBe(true);
    }
  });
  });

  test.describe(`packaged React template (${fixture.slug})`, () => {
  const REACT_DIR = path.join(
    REPO_ROOT,
    'out',
    'downloads',
    `${fixture.slug}-react`
  );
  const EXPORTED_PAGE = path.join(
    REPO_ROOT,
    'out',
    'templates',
    fixture.slug,
    'site',
    'index.html'
  );

  test.skip(
    !fs.existsSync(path.join(REACT_DIR, 'src', 'App.tsx')) ||
      !fs.existsSync(EXPORTED_PAGE),
    `run \`npm run build\` then \`npm run templates ${fixture.slug}\` first`
  );

  // The React package ships the page's *source*, which asks for its images by
  // their authored URL (ImageCard hardcodes `/images/template/<id>`). A miss
  // is silent: Vite's dev server answers it with index.html and a 200. The
  // exported page, the same component tree, is the ground truth for what gets
  // requested.
  test('serves every image URL the page requests', () => {
    const exported = fs.readFileSync(EXPORTED_PAGE, 'utf-8');
    const requested = new Set(
      [
        ...exported.matchAll(
          /\/images\/([A-Za-z0-9/_-]+\.(?:webp|png|jpg|jpeg|svg|avif))/g
        ),
      ].map((match) => match[1])
    );

    expect(requested.size, 'fixture should exercise the image path')
      .toBeGreaterThan(0);

    const missing = [...requested].filter(
      (relativePath) =>
        !fs.existsSync(path.join(REACT_DIR, 'public', 'images', relativePath))
    );

    expect(missing, 'images the page asks for but the package does not serve')
      .toEqual([]);
  });

  // Figure builds its `src` from the manifest rather than from a literal, so
  // the trimmed manifest is a second way to point at a file that isn't there.
  test('the trimmed image manifest points at files that exist', () => {
    const manifestFile = path.join(REACT_DIR, 'src', 'images.ts');

    test.skip(
      !fs.existsSync(manifestFile),
      'site does not use Figure, so it ships no manifest'
    );

    const manifest: Record<string, { base?: string }> = JSON.parse(
      fs
        .readFileSync(manifestFile, 'utf-8')
        .replace(/^[\s\S]*?export default /, '')
        .replace(/\s*as Record<[\s\S]*$/, '')
        .trim()
    );

    expect(Object.keys(manifest).length).toBeGreaterThan(0);

    const unreachable = Object.entries(manifest)
      .map(([id, entry]) => `${entry.base ?? '/images/sites'}/${id}.webp`)
      .filter((url) => !fs.existsSync(path.join(REACT_DIR, 'public', url)));

    expect(unreachable, 'manifest entries with no file behind them').toEqual([]);
  });
  });
}

// The gallery's cards follow the account (lib/myTemplates.ts): a visitor is
// asked to sign in, a person sees Choose template or, for a template of
// theirs, Customize and a Download menu of the two zips. The session and the
// person's templates are stubbed, since `serve out` has no Worker.
const signedIn = {
  session: { id: 's', userId: 'u1', expiresAt: '2030-01-01T00:00:00Z' },
  user: { id: 'u1', name: 'Pat', email: 'pat@example.com', emailVerified: true, role: null },
};

test.describe('the /templates gallery', () => {
  test.skip(
    !fs.existsSync(path.join(REPO_ROOT, 'out', 'downloads', 'werkraum-html.zip')),
    'run `node scripts/package-templates.mjs` first'
  );

  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
  });

  test('a visitor is asked to sign in, and every card has both zips behind it', async ({ page }) => {
    await page.route('**/api/auth/get-session', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: 'null' })
    );
    await page.goto('/templates/');

    const cards = page.getByRole('region', { name: /^Templates/ });
    const asks = cards.getByRole('link', { name: 'Sign in to use' });
    await expect(asks.first()).toHaveAttribute('href', /^\/sign-in\/?\?next=%2Ftemplates%2F$/);
    // The zips and the customizer are behind that sign-in, not on the card.
    await expect(page.locator('a[href^="/downloads/"]')).toHaveCount(0);
    await expect(page.locator('a[href="/studio/customize/?slug=verdant"]')).toHaveCount(0);

    // Every card's template has both packages: a card for a site the
    // packager skipped would be a dead download once the template is chosen.
    // The gallery is paged, so walk every page and gather its cards.
    const total = Number((await page.getByRole('heading', { level: 1 }).textContent())?.match(/(\d+) sites/)?.[1]);
    const pages = Number(await page.getByRole('navigation', { name: 'Pages' }).getByRole('link').last().textContent());
    const slugs = new Set<string>();

    for (let n = 1; n <= pages; n++) {
      if (n > 1) await page.getByRole('navigation', { name: 'Pages' }).getByRole('link', { name: `Page ${n}` }).click();
      await expect(page).toHaveURL(n === 1 ? /\/templates\/$/ : new RegExp(`\\?page=${n}$`));
      const onPage = await cards.locator('a[href^="/templates/"][href$="/"]').evaluateAll((links) =>
        [...new Set(links.map((link) => link.getAttribute('href')!.split('/')[2]).filter(Boolean))]
      );
      expect(onPage.length).toBeLessThanOrEqual(50);
      expect(await asks.count()).toBe(onPage.length);
      onPage.forEach((slug) => slugs.add(slug));
    }

    expect(total).toBeGreaterThan(100);
    expect(slugs.size).toBe(total);
    for (const slug of slugs) {
      for (const format of ['html', 'react']) {
        expect(fs.existsSync(path.join(REPO_ROOT, 'out', 'downloads', `${slug}-${format}.zip`)), `${slug}-${format}.zip`).toBe(true);
      }
    }
  });

  test('the category and the page are in the URL, and the order is fixed and mixed', async ({ page }) => {
    await page.route('**/api/auth/get-session', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: 'null' })
    );
    const pager = page.getByRole('navigation', { name: 'Pages' });
    const cards = page.getByRole('region', { name: /^Templates/ });

    // A deep link opens on its view, and a card's sign-in comes back to it.
    // (No category runs past one page, so the category and the page are
    // opened separately.)
    await page.goto('/templates/?category=shop');
    await expect(page.getByRole('button', { name: 'Shop', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(cards.getByRole('link', { name: 'Sign in to use' }).first()).toHaveAttribute(
      'href',
      /next=%2Ftemplates%2F%3Fcategory%3Dshop$/
    );
    await page.goto('/templates/?page=2');
    await expect(pager.getByRole('link', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    await expect(cards.getByRole('link', { name: 'Sign in to use' }).first()).toHaveAttribute(
      'href',
      /next=%2Ftemplates%2F%3Fpage%3D2$/
    );

    // A chip starts its category on page 1; a page number keeps the category.
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(page).toHaveURL(/\/templates\/$/);
    const firstOfAll = await cards.locator('h3').first().textContent();
    await page.getByRole('button', { name: 'Food & drink' }).click();
    await expect(page).toHaveURL(/\?category=food-and-drink$/);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await pager.getByRole('link', { name: 'Page 3' }).click();
    await expect(page).toHaveURL(/\/templates\/\?page=3$/);
    await expect(cards.locator('h3').first()).not.toHaveText(firstOfAll!);

    // Back and forward walk the same steps.
    await page.goBack();
    await expect(page).toHaveURL(/\/templates\/$/);
    await expect(cards.locator('h3').first()).toHaveText(firstOfAll!);
    await page.goBack();
    await expect(page.getByRole('button', { name: 'Food & drink' })).toHaveAttribute('aria-pressed', 'true');
    await page.goForward();
    await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');

    // Past the last page is the last page; an unknown category is All.
    await page.goto('/templates/?page=99');
    await expect(pager.getByRole('link').last()).toHaveAttribute('aria-current', 'page');
    await page.goto('/templates/?category=nonsense');
    await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');

    // The order mixes the batches the templates were made in. A seed's
    // prefix names the batch (art-, min-, dir-, ...; the first five have
    // none), and no two neighbors on a page share one (lib/templateOrder.ts).
    const registry = fs.readFileSync(path.join(REPO_ROOT, 'lib', 'templateSites.ts'), 'utf-8');
    const batchOf = new Map(
      [...registry.matchAll(/slug: '([^']+)'.*?seed: '([a-z]+)-/g)].map((m) => [m[1], m[2]] as const)
    );
    await page.goto('/templates/');
    const firstPage = await cards.locator('a[href^="/templates/"][href$="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')!.split('/')[2]).filter(Boolean))]
    );
    // And the order is the committed one, which only grows at the end: a
    // page keeps its cards when templates are added.
    const committed = fs.readFileSync(path.join(REPO_ROOT, 'lib', 'templateOrder.ts'), 'utf-8');
    const galleryOrder = [...committed.slice(committed.indexOf('GALLERY_ORDER: readonly')).matchAll(/^  '([^']+)',$/gm)].map((m) => m[1]);
    expect(firstPage).toEqual(galleryOrder.slice(0, 50));

    const batches = firstPage.map((slug) => batchOf.get(slug) ?? 'first');
    expect(new Set(batches).size).toBeGreaterThanOrEqual(4);
    batches.slice(1).forEach((batch, i) => expect(batch, `${firstPage[i]} then ${firstPage[i + 1]}`).not.toBe(batches[i]));
  });

  test('a chosen template downloads a real zip, and choosing another asks first', async ({ page }) => {
    const chosen = ['werkraum'];
    const posted: unknown[] = [];

    await page.route('**/api/auth/get-session', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(signedIn) })
    );
    await page.route('**/api/account/templates', (route) => {
      if (route.request().method() === 'POST') {
        const body = route.request().postDataJSON() as { slug: string };
        posted.push(body);
        chosen.push(body.slug);
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ slug: body.slug, chosen: true }) });
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          used: chosen.length,
          total: 5,
          left: 5 - chosen.length,
          chosen: chosen.map((slug) => ({ slug, chosenAt: '2026-09-01T00:00:00Z', site: null })),
          request: null,
        }),
      });
    });

    await page.goto('/templates/');
    await expect(page.getByRole('button', { name: /^Yours \(1\)/ })).toBeVisible();
    await page.getByRole('button', { name: /^Yours/ }).click();

    const card = page.locator('a[href="/templates/werkraum/"]').locator('..');
    await expect(card.getByText('Yours', { exact: true })).toBeVisible();
    await expect(card.getByRole('link', { name: /Customize/ })).toHaveAttribute('href', '/studio/customize/?slug=werkraum');

    for (const [label, format] of [
      ['HTML & CSS', 'html'],
      ['React project', 'react'],
    ] as const) {
      await card.getByRole('button', { name: /Download/ }).click();
      const item = page.getByRole('menuitem', { name: label });
      await expect(item).toHaveAttribute('href', `/downloads/werkraum-${format}.zip`);
      const download = page.waitForEvent('download');
      await item.click();
      const file = await download;
      expect(file.suggestedFilename()).toBe(`werkraum-${format}.zip`);
      const bytes = fs.readFileSync(await file.path());

      // Actually parse it: the packager writes the archive itself (fflate),
      // and nothing else would notice a malformed one. unzipSync throws on a
      // bad central directory, and CRCs are checked per entry on inflate.
      const entries = unzipSync(bytes);
      const names = Object.keys(entries);
      expect(names.length).toBeGreaterThan(3);
      // Every entry sits under the one top-level folder the archive expands
      // into, rather than scattering into the download directory.
      const roots = new Set(names.map((name) => name.split('/')[0]));
      expect(roots.size).toBe(1);
      expect(names).toContain(`${[...roots][0]}/index.html`);
    }

    // Another template: Choose template asks, and only the confirm spends one.
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page.getByRole('button', { name: 'Choose template' }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('1 of 5 templates chosen')).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /as one of your templates\?$/ })).toBeVisible();
    await dialog.getByRole('button', { name: 'Cancel' }).click();
    expect(posted).toEqual([]);

    await page.getByRole('button', { name: 'Choose template' }).first().click();
    await page.getByRole('dialog').getByRole('button', { name: 'Choose template' }).click();
    await expect(page.getByRole('button', { name: /^Yours \(2\)/ })).toBeVisible();
    expect(posted).toHaveLength(1);
  });

  test('the React package is a runnable Vite app', async () => {
    const dir = path.join(REPO_ROOT, 'out', 'downloads', 'werkraum-react');

    for (const file of [
      'package.json',
      'vite.config.ts',
      'index.html',
      'src/main.tsx',
      'src/App.tsx',
      'src/werkraum.module.css',
    ]) {
      expect(fs.existsSync(path.join(dir, file)), `${file} missing`).toBe(true);
    }

    const app = fs.readFileSync(path.join(dir, 'src', 'App.tsx'), 'utf-8');
    // The page ships as authored; only the Next-isms and the workspace import
    // paths change. Anything left of either would fail `vite build`.
    expect(app).not.toContain("from 'next'");
    expect(app).not.toMatch(/export const metadata/);
    expect(app).not.toMatch(/from 'components\//);
    expect(app).not.toContain("'lib/generated/images'");
    expect(app).toContain("from 'tabbied/react'");
    expect(app).toContain("from 'tabbied/patterns'");

    // Vite resolves CSS modules itself, so unlike the HTML package the
    // stylesheet ships exactly as authored.
    const authored = fs.readFileSync(
      path.join(REPO_ROOT, 'app/templates/werkraum/site/werkraum.module.css'),
      'utf-8'
    );
    expect(fs.readFileSync(path.join(dir, 'src', 'werkraum.module.css'), 'utf-8'))
      .toBe(authored);

    const pkg = JSON.parse(
      fs.readFileSync(path.join(dir, 'package.json'), 'utf-8')
    );
    expect(pkg.dependencies).toHaveProperty('tabbied');
    expect(pkg.scripts.dev).toBe('vite');
  });
});
