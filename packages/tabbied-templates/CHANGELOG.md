# tabbied-templates

## 0.2.2

### Patch Changes

- [#113](https://github.com/tabbied-design/tabbied/pull/113) [`490cc6f`](https://github.com/tabbied-design/tabbied/commit/490cc6f1db68c2176a3d87c703728458b7984c59) Thanks [@subwaymatch](https://github.com/subwaymatch)! - The packages now point at their documentation. `tabbied`'s npm homepage is the React docs and its `llms.txt` links the new MCP docs page; `tabbied-mcp`'s homepage is that page (https://tabbied.com/docs/mcp/), and its README lists the two template tools. `get_template`'s "full reference" link pointed at a page that does not exist and now points at the editable-templates reference on GitHub. `tabbied-templates` ships a README.

- [#116](https://github.com/tabbied-design/tabbied/pull/116) [`088da7d`](https://github.com/tabbied-design/tabbied/commit/088da7d275a35550bf2ee56ca23100d72264e4be) Thanks [@subwaymatch](https://github.com/subwaymatch)! - The README says the package is ESM only. Editing one of a pattern field's options no longer drops the others: `options` are merged over the field's current set, and only a design swap replaces them. `validateSpec` and `validateEdits` return problems instead of throwing for any JSON (`null`, arrays, missing fields), and also check the palette derivation, slot kinds, palette roles past the end of the palette, and image sources: `javascript:` and every scheme but http(s), `blob:` and `data:image/` are refused, and never written. `isHexColor` accepts `#rgba`, as `toRgb` already did, and a wrong-kind error reads "an image slot".

## 0.2.1

### Patch Changes

- [#111](https://github.com/tabbied-design/tabbied/pull/111) [`9f4bc1c`](https://github.com/tabbied-design/tabbied/commit/9f4bc1cdb9af52368bee451657ff2f18f885d5d6) Thanks [@subwaymatch](https://github.com/subwaymatch)! - Ship the MIT license text in the package. `list_templates` and `get_template` now also return the license the Tabbied website templates are under: licensed per account, not to be copied from their previews.

## 0.2.0

### Minor Changes

- [#84](https://github.com/tabbied-design/tabbied/pull/84) [`8be10c1`](https://github.com/tabbied-design/tabbied/commit/8be10c12c4d4fb883ff95df3000632b056804588) Thanks [@subwaymatch](https://github.com/subwaymatch)! - `recolourablePatternSlots` is now `recolorablePatternSlots`, with the rest of the package's prose and comments moved to US spelling. The old name is gone rather than aliased; a caller renames the import and nothing else changes.
