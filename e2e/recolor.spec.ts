// Pictures that follow the palette (components/Artwork.tsx) have to actually
// follow it. The failure is silent: an image that ignores the palette looks
// right until somebody re-colors the page, and then it is the one thing on it
// still wearing the old colors.
//
// Each template that renders artwork is re-colored the way the customizer
// does it, by new values for the palette custom properties on its edit root,
// and every picture's pixels must move. A pattern fill re-colors through its
// pattern instead, so it must carry the role map that lets the engine reach
// it. The HTML package must carry each mask inline, or a page opened from
// disk, which is how its README says to open it, draws blank boxes.
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.join(__dirname, '..');
const TEMPLATE_DIR = path.join(REPO_ROOT, 'out', 'templates');
const SLUGS = fs.existsSync(TEMPLATE_DIR)
  ? fs
      .readdirSync(TEMPLATE_DIR)
      .filter((slug) => {
        const file = path.join(TEMPLATE_DIR, slug, 'site', 'index.html');
        return fs.existsSync(file) && fs.readFileSync(file, 'utf-8').includes('data-artwork=');
      })
  : [];

// Far from any template's own colors, and a light and a dark version so the
// ground always changes lightness.
const LIGHT = ['#FFF4E8', '#2B1B3D', '#6C3FD1', '#E4572E', '#8A7F99', '#EFE3F5', '#1F8A70'];
const DARK = ['#101820', '#F2EFE6', '#F2AA4C', '#5FB3A1', '#3A4A5C', '#1B2733', '#C94F6D'];

async function recolor(page: Page) {
  await page.evaluate(
    ({ LIGHT, DARK }) => {
      const root = document.querySelector('[data-edit-root]') as HTMLElement;
      const names = (root.getAttribute('data-edit-vars') ?? '').split(',').filter(Boolean);
      const ground = getComputedStyle(root).getPropertyValue(`--${names[0]}`).trim();
      const palette = parseInt(ground.slice(1, 3), 16) < 128 ? LIGHT : DARK;
      names.forEach((name, i) => root.style.setProperty(`--${name}`, palette[i % palette.length]));
    },
    { LIGHT, DARK }
  );
}

test.describe('pictures that follow the palette', () => {
  test.skip(SLUGS.length === 0, 'run `npm run build` first');

  // Fonts are not under test and hang without outbound network.
  test.beforeEach(async ({ page }) => {
    await page.route(/https:\/\/(use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) =>
      route.abort()
    );
  });

  for (const slug of SLUGS) {
    test(`${slug}: every picture moves with a re-color`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.goto(`/templates/${slug}/site/`, { waitUntil: 'load' });

      const pictures = page.locator('[data-artwork]');
      const count = await pictures.count();
      expect(count).toBeGreaterThan(0);

      const before: (Buffer | null)[] = [];
      const kinds: string[] = [];

      for (let i = 0; i < count; i++) {
        const picture = pictures.nth(i);
        const kind = (await picture.getAttribute('class')) ?? '';
        kinds.push(kind);

        if (kind.includes('artwork--fill')) {
          // Re-colored through its pattern, by the engine: the host must say how.
          expect(await picture.getAttribute('data-edit-roles'), `${slug}: a pattern fill needs a role map`).toBeTruthy();
          before.push(null);
          continue;
        }

        await picture.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        before.push(await picture.screenshot({ animations: 'disabled' }));
      }

      await recolor(page);

      for (let i = 0; i < count; i++) {
        const shot = before[i];
        if (!shot) continue;

        const picture = pictures.nth(i);
        await picture.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        const after = await picture.screenshot({ animations: 'disabled' });
        const moved = await page.evaluate(
          async ([a, b]) => {
            const load = (base64: string) =>
              new Promise<ImageData>((resolve) => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const context = canvas.getContext('2d')!;
                  context.drawImage(img, 0, 0);
                  resolve(context.getImageData(0, 0, img.width, img.height));
                };
                img.src = `data:image/png;base64,${base64}`;
              });
            const [one, two] = await Promise.all([load(a), load(b)]);
            if (one.width !== two.width || one.height !== two.height) return 255;
            let total = 0;
            for (let p = 0; p < one.data.length; p += 4) {
              total +=
                Math.abs(one.data[p] - two.data[p]) +
                Math.abs(one.data[p + 1] - two.data[p + 1]) +
                Math.abs(one.data[p + 2] - two.data[p + 2]);
            }
            return total / ((one.data.length / 4) * 3);
          },
          [shot.toString('base64'), after.toString('base64')]
        );

        expect(moved, `${slug}: picture ${i + 1} (${kinds[i]}) ignored the re-color`).toBeGreaterThan(6);
      }
    });
  }

  test('the HTML package carries every mask inline', () => {
    const downloads = path.join(REPO_ROOT, 'out', 'downloads');
    test.skip(!fs.existsSync(downloads), 'run `npm run build` first');

    for (const slug of SLUGS) {
      const file = path.join(downloads, slug, 'index.html');
      if (!fs.existsSync(file)) continue;
      const html = fs.readFileSync(file, 'utf-8');

      expect(html, `${slug}: a mask left as a file URL`).not.toMatch(/--artwork-mask:url\(\.\//);
      if (/artwork--(mask|masks|tint|fill)\b/.test(html)) {
        expect(html, `${slug}: a masked picture with no inline mask`).toContain('--artwork-mask:url(data:image/webp;base64,');
      }
    }
  });
});
