---
"tabbied": minor
---

Two copies of the library on one page (the CDN element beside an esm.sh import, or two bundles on a CMS page) no longer share instance ids: each copy counted from `t0`, so their first patterns matched each other's style rule and one drew in the other's palette. The counter now lives on `globalThis`, and ids take a form (`t-0`) that cannot collide with an older copy's.

`tabbied/element/react-jsx` types `<tabbied-pattern>` in React's JSX: `import 'tabbied/element/react-jsx'` once, and a TypeScript React app can use the tag directly, attributes typed, without "Property 'tabbied-pattern' does not exist on type 'JSX.IntrinsicElements'". It is empty at runtime.

`tabbied list` lines its columns up for any slug length. `tabbied render --frames` names frames with three digits at least (`frame-000.png`), so `ffmpeg -i frame-%03d.png` reads any sequence of up to 1,000 frames; a sequence under 100 frames used to be named with one or two. The README pins the CDN element to an exact version, says to self-host the whole `dist/element/` folder (the element loads two chunks beside it), and gives the SVG converter's real size, about 12 KB gzipped once minified.
