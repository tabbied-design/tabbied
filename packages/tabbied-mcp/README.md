# tabbied-mcp

An [MCP](https://modelcontextprotocol.io) server for
[Tabbied](https://tabbied.com): search 382 generative pattern designs, look at
them, and render them to SVG or PNG - from Claude Code, Claude Desktop, Cursor,
or any other MCP client.

## Use it without installing anything

The same server runs at `https://tabbied.com/mcp`, with no account or key:

```bash
claude mcp add --transport http tabbied https://tabbied.com/mcp   # Claude Code
codex mcp add tabbied --url https://tabbied.com/mcp               # Codex
```

- **Claude** (web and desktop): Customize, Connectors, + Add, Add custom
  connector; enter the URL and choose "No sign in".
- **ChatGPT**: turn on Developer mode (Settings, Security and login), then add
  it under [Plugins](https://chatgpt.com/plugins) with the URL as a public
  endpoint. ChatGPT reaches hosted servers only.
- **Codex**: the command above, or `[mcp_servers.tabbied]` with
  `url = "https://tabbied.com/mcp"` in `~/.codex/config.toml`, which the CLI,
  the IDE extension and the ChatGPT desktop app share.
- **Cursor** and other clients that read an `mcpServers` JSON file (VS Code's
  `.vscode/mcp.json` uses `servers` with `"type": "http"` instead):

```jsonc
{
  "mcpServers": {
    "tabbied": { "url": "https://tabbied.com/mcp" }
  }
}
```

## Or run it locally, and render real files

The local server adds `render_design`, which the remote one cannot offer:
rendering a css-doodle pattern needs a real browser. It drives Chromium through
Playwright, which this package does not install, so start the server with
Playwright beside it, and download the browser once:

```bash
npx playwright install chromium

claude mcp add tabbied -- npx -y -p tabbied-mcp -p playwright tabbied-mcp   # Claude Code
codex mcp add tabbied -- npx -y -p tabbied-mcp -p playwright tabbied-mcp    # Codex
```

Claude Desktop (`claude_desktop_config.json`), Cursor and other clients that
start local servers from JSON:

```jsonc
{
  "mcpServers": {
    "tabbied": {
      "command": "npx",
      "args": ["-y", "-p", "tabbied-mcp", "-p", "playwright", "tabbied-mcp"]
    }
  }
}
```

A Playwright installed in the project the server starts in is found too
(`npm i -D playwright`), and `TABBIED_CHROMIUM` points it at a Chromium binary
of your own. Without either, `npx -y tabbied-mcp` serves the other six tools,
and `render_design` says what to install. Needs Node 20 or later.

## Tools

| Tool | What it does |
| --- | --- |
| `search_designs` | Filter by motif, mood, density, intended use, free text, or SVG-export support. |
| `get_design` | The full record for one slug, plus ready-to-paste code for React, Vue, Svelte, the web component, plain HTML and plain JavaScript (`framework` picks one). |
| `preview_design` | The rendered preview image for up to six designs, so the model can *look*. |
| `get_docs` | The complete API reference (`llms-full.txt`). |
| `list_templates` | The Tabbied website templates, a page at a time, filtered by category or by words. |
| `get_template` | One template's editable-section spec, its download links, and how to edit each format. |
| `render_design` | SVG or PNG at any size, seed, palette, and option set. **Local only.** |

Slugs are opaque - `cleat`, `karst`, `radius` - so the intended flow is
`search_designs` to narrow, `preview_design` to look, then `get_design` for the
options and the code for the project's setup. Choosing off tags alone is the
main way this goes wrong.

The website templates are licensed per Tabbied account, not with this package:
downloading one needs an account that has chosen it, under the
[Template License](https://tabbied.com/terms-of-service/#template-license).

Setup for each client, the tools and example prompts are also on
[tabbied.com/docs/mcp](https://tabbied.com/docs/mcp/).

## Programmatic use

The package is ESM only (the `tabbied-mcp` bin is unaffected). Its main entry
point is runtime-agnostic (no node imports), so it can be embedded in a Worker
or any Web-standard server. It exposes the tools and an `McpServer` factory;
the transport is the MCP SDK's. On Node, `tabbied-mcp/node` has the readers the
bin itself uses:

```ts
import { createMcpHandler } from '@modelcontextprotocol/server';
import { buildServer, catalogTools } from 'tabbied-mcp';
import {
  fetchDocs,
  fetchPreview,
  fetchTemplate,
  fetchTemplateCatalog,
  loadCatalog,
} from 'tabbied-mcp/node';

const tools = catalogTools({
  catalog: await loadCatalog(),
  fetchPreview,
  fetchDocs,
  fetchTemplateCatalog,
  fetchTemplate,
});

// A Web-standard fetch handler, for Bun.serve, Deno.serve or a Node adapter.
export default {
  fetch: createMcpHandler(() => buildServer(tools)).fetch,
};
```

Pass the *factory*, not a built server: MCP v2 is stateless and the handler
constructs one server per request.

Only `catalog` is required. Each fetcher adds tools, and one left out drops
them: `fetchPreview` gives `preview_design`, `fetchDocs` gives `get_docs`,
`fetchTemplateCatalog` gives `list_templates`, and with `fetchTemplate` as
well, `get_template`. With all five, as above, it serves the same six tools as
the hosted server at `https://tabbied.com/mcp`. `renderTool(catalog)`, also
from `tabbied-mcp/node`, is `render_design`, for a host with a browser.

The Node readers take the catalog and the docs from the installed `tabbied`
package and the rest from tabbied.com. A Worker cannot use them, so it passes
its own: each is an async function returning the same JSON (`Catalog`,
`TemplateCatalog` and the rest are exported types), and the hosted server's
read its own static assets.

Built on [`@modelcontextprotocol/server`](https://www.npmjs.com/package/@modelcontextprotocol/server)
v2, so it speaks the stateless `2026-07-28` revision and still serves 2025-era
clients. `docs/mcp-server.md` in the repository has the details.

## License

MIT
