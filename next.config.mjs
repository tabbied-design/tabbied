/** @type {import('next').NextConfig} */

// A pure static export: out/ is served as Workers static assets, and only the
// paths wrangler.jsonc's `run_worker_first` names reach worker/index.ts.
//
// Consequences handled elsewhere:
//  - Response headers live in public/_headers, which wrangler reads.
//  - There is no /_next/image optimizer, so the marketing images are
//    pre-sized into public/images by scripts/optimize-images.mjs.
//  - `npm start` runs `serve out`; `npm run preview` runs the real Worker.
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Emit every page as <route>/index.html, so any static file server resolves it.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Otherwise the dev server appends an "agent rules" block to CLAUDE.md on
  // every start, with an em dash `check:typography` rejects. CLAUDE.md is
  // maintained by hand.
  agentRules: false,
};

export default nextConfig;
