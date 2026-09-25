---
"tabbied": patch
"tabbied-mcp": patch
---

`tabbied render --format` is listed in `--help` and accepts only `svg` or `png`. Any other value used to fall through to the SVG exporter (for a design that cannot export SVG too) and write an SVG under whatever name `--out` gave; it now fails with a message. The llms reference and the `search_designs` tool's `svgExport` description no longer say every unsupported design is a conic sweep: the 32 cover double and dashed borders, 3D transforms, `color-mix()` and exports that miss pixel parity too.
