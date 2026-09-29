// Writes public/email/tabbied-lockup.png, the lockup at the head of every
// designed email (worker/lib/mail.ts, LOCKUP). Mail cannot use the site's
// own lockup: Gmail strips inline <svg> and ignores web fonts, so the mail
// carries a picture of it instead. This takes that picture from the real
// thing, components/logo/Logo in the built export, so the two cannot drift:
// run it after the mark or the wordmark changes.
//
//   npm run build && node scripts/capture-email-lockup.mjs
//
// The export is served through Playwright's router, so no server is needed.
// If the drawn size changes, update LOCKUP's width and height to a third of
// the PNG's (it is captured at 3x).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const target = path.join(root, 'public/email/tabbied-lockup.png');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };

if (!fs.existsSync(path.join(out, 'terms-of-service/index.html'))) {
  console.error('No export in out/: run `npm run build` first.');
  process.exit(1);
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 800, height: 400 }, deviceScaleFactor: 3 });

await page.route('http://lockup.local/**', (route) => {
  let file = path.join(out, decodeURIComponent(new URL(route.request().url()).pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
  return route.fulfill({ body: fs.readFileSync(file), contentType: TYPES[path.extname(file)] ?? 'application/octet-stream' });
});
// Anything else (the typekit and analytics a page asks for) is not part of the lockup.
await page.route(/^https?:\/\/(?!lockup\.local)/, (route) => route.abort());

await page.goto('http://lockup.local/terms-of-service/');
const lockup = page.locator('a[aria-label="Tabbied home"] > span').first();
await lockup.waitFor();
await page.evaluate(() => document.fonts.ready);

// The email's sizes: a 20px mark, a 19px word, 10px apart, in ink, on the
// card's white (not transparent, so a client's dark mode cannot lose it).
const face = await lockup.evaluate((el) => {
  el.style.setProperty('--logo-word-size', '19px');
  el.style.setProperty('--logo-gap', '10px');
  el.style.color = '#0e0e13';
  el.style.background = '#ffffff';
  el.style.padding = '2px 0';
  return [...document.fonts].some((font) => /Cormorant/i.test(font.family) && font.status === 'loaded');
});

if (!face) {
  console.error('The wordmark did not draw in Cormorant Garamond; not writing a fallback picture.');
  process.exit(1);
}

await lockup.screenshot({ path: target });
await browser.close();

const png = fs.readFileSync(target);
console.log(`wrote ${path.relative(root, target)}: ${png.readUInt32BE(16)} x ${png.readUInt32BE(20)} (drawn at a third of that)`);
