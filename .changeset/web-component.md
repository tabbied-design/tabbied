---
"tabbied": minor
---

`<tabbied-pattern>`, a custom element: the patterns in plain HTML and in any framework that renders HTML.

**Additions**

- `tabbied/element` defines `<tabbied-pattern>`. Its attributes are the names `hydratePatterns()` reads without `data-` (`pattern`, `seed`, `palette`, `options`, `fit`, `density`, ...), and a change to one redraws in place. `palette`, `options` and `pattern` are also properties, taking an array, an object and a definition. It has `redraw()`, `exportImage()`, `exportSvg()`, `refresh()` and `controller`, and fires `ready` and `error`. Moving it in the page keeps its pattern.
- `dist/element/tabbied-element.js` is the element as one self-contained file for a CDN (css-doodle bundled; the SVG converter a separate chunk loaded by `exportSvg()`). It loads each design the page names, and only those, from `dist/patterns/` beside it.
- `tabbied/patterns/<slug>`: every design as its own module, a default export with no imports.
- `definePatterns()` registers designs for a bundled app, which then ships only those; `setPatternsBase()` points slug loading at a copy of `dist/patterns/` elsewhere. Importing `tabbied/element` on a server is safe.
