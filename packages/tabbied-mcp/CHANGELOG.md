# tabbied-mcp

## 0.2.4

### Patch Changes

- [#113](https://github.com/tabbied-design/tabbied/pull/113) [`490cc6f`](https://github.com/tabbied-design/tabbied/commit/490cc6f1db68c2176a3d87c703728458b7984c59) Thanks [@subwaymatch](https://github.com/subwaymatch)! - The packages now point at their documentation. `tabbied`'s npm homepage is the React docs and its `llms.txt` links the new MCP docs page; `tabbied-mcp`'s homepage is that page (https://tabbied.com/docs/mcp/), and its README lists the two template tools. `get_template`'s "full reference" link pointed at a page that does not exist and now points at the editable-templates reference on GitHub. `tabbied-templates` ships a README.

- [#116](https://github.com/tabbied-design/tabbied/pull/116) [`088da7d`](https://github.com/tabbied-design/tabbied/commit/088da7d275a35550bf2ee56ca23100d72264e4be) Thanks [@subwaymatch](https://github.com/subwaymatch)! - `tabbied render` finds Playwright under npx: it looks from the current directory first, then beside its own install, so a project's Playwright is used by `npx tabbied`, and `npx -y -p tabbied -p playwright tabbied render ...` (or `npx -y -p tabbied-mcp -p playwright tabbied-mcp` for the MCP server) works with nothing installed. When none is found, or Chromium will not start, the message says exactly what to run, `npx playwright install chromium` included. An SVG is now cut to `--size` in every fit, as the PNG is (a 1600x900 grid render used to come out 1672x950). `--palette` entries that are not CSS colors, option values outside their range or choices, and sizes, scales or frame counts that make no sense fail with a message instead of rendering blank or wrong. Every flag also takes `--flag=value`, which is how a value starting with `--` is passed. `tabbied list` names the valid values when a filter is not one of them, and a frame sequence no longer reports `frames//`.

  `tabbied-mcp` needs Node 20 or later (its MCP SDK does) and is ESM only. `list_templates` answers a page at a time (`limit`, `offset`), one line per template with its category and what the business is, filters by `category`, and gives the full details with `detail`, where it used to return the whole index (127 KB). Every tool states its annotations, the server no longer advertises a tool list that can change, and empty slugs are refused. `get_design`'s React snippet is a component at the design's own aspect ratio, and its CLI command asks for a PNG when the design has no SVG export. `preview_design` fails when no slug resolves. The template tools say where the index lives when it cannot be reached, and every network read gives up after 10 seconds. `render_design` refuses relative `out` paths, an `out` whose extension disagrees with `format`, out-of-range sizes and scales, and option values that would smuggle in another option; it returns only the CLI's own message on a failure, and no longer leaves a temp folder behind. The Node readers the bin uses are exported from `tabbied-mcp/node`.

- Updated dependencies [[`490cc6f`](https://github.com/tabbied-design/tabbied/commit/490cc6f1db68c2176a3d87c703728458b7984c59), [`088da7d`](https://github.com/tabbied-design/tabbied/commit/088da7d275a35550bf2ee56ca23100d72264e4be), [`088da7d`](https://github.com/tabbied-design/tabbied/commit/088da7d275a35550bf2ee56ca23100d72264e4be)]:
  - tabbied@0.7.1

## 0.2.3

### Patch Changes

- [#111](https://github.com/tabbied-design/tabbied/pull/111) [`9f4bc1c`](https://github.com/tabbied-design/tabbied/commit/9f4bc1cdb9af52368bee451657ff2f18f885d5d6) Thanks [@subwaymatch](https://github.com/subwaymatch)! - Ship the MIT license text in the package. `list_templates` and `get_template` now also return the license the Tabbied website templates are under: licensed per account, not to be copied from their previews.

## 0.2.2

### Patch Changes

- [#90](https://github.com/tabbied-design/tabbied/pull/90) [`3421294`](https://github.com/tabbied-design/tabbied/commit/342129407ac2076c9cfa1fab5189ec9860bd9c26) Thanks [@subwaymatch](https://github.com/subwaymatch)! - `tabbied render --format` is listed in `--help` and accepts only `svg` or `png`. Any other value used to fall through to the SVG exporter (for a design that cannot export SVG too) and write an SVG under whatever name `--out` gave; it now fails with a message. The llms reference and the `search_designs` tool's `svgExport` description no longer say every unsupported design is a conic sweep: the 32 cover double and dashed borders, 3D transforms, `color-mix()` and exports that miss pixel parity too.

- Updated dependencies [[`8be10c1`](https://github.com/tabbied-design/tabbied/commit/8be10c12c4d4fb883ff95df3000632b056804588), [`3421294`](https://github.com/tabbied-design/tabbied/commit/342129407ac2076c9cfa1fab5189ec9860bd9c26), [`c0c10d1`](https://github.com/tabbied-design/tabbied/commit/c0c10d1582f5b05d18a0cb1b9821389abd48e74a), [`8be10c1`](https://github.com/tabbied-design/tabbied/commit/8be10c12c4d4fb883ff95df3000632b056804588), [`c79af0a`](https://github.com/tabbied-design/tabbied/commit/c79af0a493c8b75fe0a18d64bd9a74f245937809)]:
  - tabbied@0.7.0

## 0.2.1

### Patch Changes

- Updated dependencies [[`4f45e56`](https://github.com/tabbied-design/tabbied/commit/4f45e56a6a541944af5c648ae8d3932c738ea731)]:
  - tabbied@0.6.0

## 0.2.0

### Minor Changes

- [#60](https://github.com/tabbied-design/tabbied/pull/60) [`dc49bfb`](https://github.com/tabbied-design/tabbied/commit/dc49bfbfbd137a42773117cae2f631f71bdf4bd9) Thanks [@subwaymatch](https://github.com/subwaymatch)! - Add `tabbied-mcp`, an MCP server over the Tabbied design catalog.

  The same tools serve two transports: `https://tabbied.com/mcp` (nothing to
  install) and a `tabbied-mcp` stdio bin. Tools are `search_designs`,
  `get_design`, `preview_design` - which returns the rendered preview images, so
  an assistant can look at candidates rather than guess from opaque slugs - and
  `get_docs`. The local server adds `render_design` for real SVG/PNG output,
  which the remote one cannot offer because rendering a css-doodle pattern needs
  a browser.

  Built on `@modelcontextprotocol/server` v2, so it speaks the stateless
  `2026-07-28` revision - no `initialize` handshake, no session id, one server
  built per request - while still serving 2025-era clients. Tool schemas are
  plain JSON Schema with enums derived from the catalog being served, which the
  SDK also enforces on incoming arguments.

### Patch Changes

- Updated dependencies [[`f526357`](https://github.com/tabbied-design/tabbied/commit/f5263578e5b1993b6eaae2a29651e987888a6db5), [`772d747`](https://github.com/tabbied-design/tabbied/commit/772d74752534f8e1defa66f629e0f40fe0e0a620), [`772d747`](https://github.com/tabbied-design/tabbied/commit/772d74752534f8e1defa66f629e0f40fe0e0a620), [`f526357`](https://github.com/tabbied-design/tabbied/commit/f5263578e5b1993b6eaae2a29651e987888a6db5)]:
  - tabbied@0.5.0
