---
"tabbied": minor
"tabbied-mcp": minor
---

`tabbied/snippets` is a new entry point: `buildSnippet(setup, input)` writes the code that puts one design on a page in React, Vue, a Svelte action, the `<tabbied-pattern>` web component, plain HTML or plain JavaScript (`createPattern()`), the same builders the site's editor copies from. The catalog's `usage` now carries all six for an example design, where it had a React line and a bare import, and both markup snippets paint the design's ground color before the script runs.

`get_design` on the MCP server returns code for every setup (`react`, `vue`, `svelte`, `element`, `html`, `core`), from the same builders, and takes an optional `framework` to return only the one the project uses. The server's instructions and the tool descriptions name every setup, so an assistant working in a Vue or Svelte project no longer gets React code. A free-text `query` to `search_designs` now matches tags, moods and uses as well as names and descriptions, so `"circles"` finds the designs tagged circles.
