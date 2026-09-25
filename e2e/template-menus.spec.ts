// Every template's header links on a phone.
//
// A template that hides its header nav below a breakpoint carries
// components/template/TemplateMenu. The gate: at 390px, every link the header
// hides must be reachable through a visible menu that fits on the screen.
//
// The HTML package has no React left, so a plain script closes the menu on a
// followed link; that is checked against the packaged page itself.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const TEMPLATE_DIR = path.join(REPO_ROOT, 'out', 'templates');
const SLUGS = fs.existsSync(TEMPLATE_DIR)
  ? fs
      .readdirSync(TEMPLATE_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => fs.existsSync(path.join(TEMPLATE_DIR, slug, 'site', 'index.html')))
  : [];

test.describe('template headers on a phone', () => {
  test.skip(SLUGS.length === 0, 'run `npm run build` first');
  test.use({ viewport: { width: 390, height: 780 } });

  // Fonts are not under test and hang without outbound network.
  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) =>
      route.abort()
    );
  });

  test('every link a header hides is in a menu that fits the screen', async ({ page }) => {
    test.setTimeout(240_000);
    const failures: string[] = [];

    for (const slug of SLUGS) {
      await page.goto(`/templates/${slug}/site/`, { waitUntil: 'domcontentloaded' });

      const hidden = await page.evaluate(() => {
        const header = document.querySelector('header') ?? document.querySelector('nav');
        const shown = (element: Element) => {
          const box = element.getBoundingClientRect();
          return box.width > 0 && box.height > 0;
        };

        return [...(header?.querySelectorAll('nav a, ul a') ?? [])]
          .filter((link) => !link.closest('.template-menu') && !shown(link))
          .map((link) => link.getAttribute('href'));
      });

      if (hidden.length === 0) continue;

      const toggle = page.locator('.template-menu__toggle').first();

      if (!(await toggle.isVisible())) {
        failures.push(`${slug}: ${hidden.length} header link(s) hidden and no menu`);
        continue;
      }

      await toggle.click();
      const panel = page.locator('.template-menu__panel').first();
      await expect(panel).toBeVisible();

      const { hrefs, fits } = await panel.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return {
          hrefs: [...element.querySelectorAll('a')].map((link) => link.getAttribute('href')),
          fits: box.left >= 0 && box.right <= window.innerWidth + 0.5,
        };
      });
      const missing = hidden.filter((href) => !hrefs.includes(href));

      if (missing.length > 0) failures.push(`${slug}: menu lacks ${missing.join(', ')}`);
      if (!fits) failures.push(`${slug}: the open menu runs off the screen`);

      // A followed link closes it (the component's own handler, on the site).
      await panel.locator('a').first().click();
      await expect(page.locator('details.template-menu').first()).not.toHaveAttribute('open', '');
    }

    expect(failures).toEqual([]);
  });

  test('the downloaded HTML closes its menu without React', async ({ page }) => {
    const packaged = path.join(REPO_ROOT, 'out', 'downloads', 'werkraum', 'index.html');
    test.skip(!fs.existsSync(packaged), 'run `npm run build` first - needs the packaged template');

    // The bootstrap's esm.sh import is not what is under test.
    await page.route('https://esm.sh/**', (route) => route.abort());
    await page.goto('/downloads/werkraum/', { waitUntil: 'domcontentloaded' });

    const menu = page.locator('details.template-menu');
    await page.locator('.template-menu__toggle').click();
    await expect(menu).toHaveAttribute('open', '');

    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');

    await page.locator('.template-menu__toggle').click();
    await page.locator('.template-menu__panel a').first().click();
    await expect(menu).not.toHaveAttribute('open', '');
  });
});
