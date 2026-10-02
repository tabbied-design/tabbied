---
"tabbied-templates": patch
---

The README says the package is ESM only. Editing one of a pattern field's options no longer drops the others: `options` are merged over the field's current set, and only a design swap replaces them. `validateSpec` and `validateEdits` return problems instead of throwing for any JSON (`null`, arrays, missing fields), and also check the palette derivation, slot kinds, palette roles past the end of the palette, and image sources: `javascript:` and every scheme but http(s), `blob:` and `data:image/` are refused, and never written. `isHexColor` accepts `#rgba`, as `toRgb` already did, and a wrong-kind error reads "an image slot".
