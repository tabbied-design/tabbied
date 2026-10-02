---
"tabbied": patch
---

`aspectRatio` accepts the editor's `W:H` form (`"2:3"`) and writes it as CSS's `2 / 3`; passed through as it was, it was an invalid `aspect-ratio`, and the box drew nothing. In a development build, a pattern whose box measures 0px says so once in the console (a parent with no height is the usual cause) instead of waiting silently. SVG exports carry `width` and `height` equal to their viewBox, so design tools open them at the size they were drawn. Nine designs that had no description have one. The README says the package is ESM only and lists the `tabbied/svg-export` entry point, and the esm.sh examples pin a version.
