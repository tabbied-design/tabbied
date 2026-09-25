// The runtime-agnostic half of the server: the tool definitions and the
// `McpServer` factory. Nothing reachable from here may import node, because
// this entry point is what the Cloudflare Worker bundles; the local catalog
// reader and `render_design` live behind the bin. See docs/mcp-server.md.
export { buildServer } from './server.js';
export { catalogTools, createToolset, type Toolset } from './tools.js';
export { templateTools } from './templates.js';
export { INSTRUCTIONS, SERVER_NAME, VERSION } from './info.js';
export type {
  Catalog,
  CatalogDesign,
  CatalogOption,
  TemplateCatalog,
  TemplateCatalogEntry,
  TemplateSpec,
  Tool,
  ToolContent,
  ToolContext,
  ToolDefinition,
  ToolResult,
} from './types.js';
