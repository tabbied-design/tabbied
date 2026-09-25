// The shapes this server reads and writes.
import type { JsonSchemaType } from '@modelcontextprotocol/server';

// The catalog types mirror what packages/tabbied/scripts/codegen.mjs emits into
// catalog.json. They are structural rather than imported so the server can
// read a catalog fetched from an older or newer version of the site.

/** One design, as it appears in catalog.json. */
export type CatalogDesign = {
  slug: string;
  name: string;
  description?: string;
  tags: string[];
  mood: string[];
  density: string;
  goodFor: string[];
  preview: string;
  palette: string[];
  colors?: unknown;
  options: CatalogOption[];
  /** An aspect-ratio id such as `2:3`, as codegen emits it. */
  defaultAspectRatio?: string;
  svgExport: { supported: boolean; note?: string };
};

export type CatalogOption = {
  id: string;
  label: string;
  type: string;
  default: unknown;
  values?: string[];
  min?: number;
  max?: number;
  step?: number;
  svgExportNote?: string;
};

export type Catalog = {
  package: string;
  version: string;
  count: number;
  docs: string;
  usage: Record<string, string>;
  designs: CatalogDesign[];
};

// ---- template sites --------------------------------------------------------
//
// Mirrors what scripts/generate-editable.mjs emits into
// public/editable-catalog.json and public/editable/<slug>.json. Structural
// rather than imported from `tabbied-templates`, for the same reason as the
// design catalog.

export type TemplateCatalogEntry = {
  slug: string;
  name: string;
  href: string;
  spec: string;
  palette: string[];
  patterns: string[];
  slots: { text: number; image: number; pattern: number };
  downloads: { html: string; react: string };
};

export type TemplateCatalog = {
  specVersion: number;
  generated: number;
  templates: TemplateCatalogEntry[];
};

/** One site's editable-section spec. Slots stay opaque here - the tool passes
 * them through, and their shape is owned by `tabbied-templates`. */
export type TemplateSpec = {
  specVersion: number;
  site: { slug: string; name: string; topic?: string };
  palette: { colors: string[]; derivation: string; flatSections?: boolean };
  fonts?: Record<string, string>;
  slots: unknown[];
};

// ---- tools -----------------------------------------------------------------

/**
 * A content block in a tool result. This is the subset of MCP's content types
 * the Tabbied tools actually produce; the shape is identical in both protocol
 * eras (see docs/mcp-server.md).
 */
export type ToolContent =
  | { type: 'text'; text: string }
  | { type: 'image'; data: string; mimeType: string };

export type ToolResult = {
  content: ToolContent[];
  /**
   * A *tool execution* error (bad slug, unrenderable design), not a JSON-RPC
   * protocol error: the spec asks clients to feed these back to the model so
   * it can self-correct.
   */
  isError?: boolean;
};

export type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  /**
   * Plain JSON Schema, not Zod (see server.ts). Typed as the SDK's own type
   * (a type-only import) so a schema the SDK cannot register fails at `tsc`
   * rather than at the first `tools/list`.
   */
  inputSchema: JsonSchemaType;
};

export type Tool = {
  definition: ToolDefinition;
  run(args: Record<string, unknown>): ToolResult | Promise<ToolResult>;
};

/**
 * Everything the catalog tools need from their host. The fetchers are injected
 * rather than imported because they differ per runtime: the Worker reads its
 * own static assets, the stdio server the local package and the network.
 */
export type ToolContext = {
  catalog: Catalog;
  /** Resolves a design's preview image to base64. Omit to drop `preview_design`. */
  fetchPreview?: (
    design: CatalogDesign
  ) => Promise<{ data: string; mimeType: string }>;
  /** Resolves the llms-full.txt reference. Omit to drop `get_docs`. */
  fetchDocs?: () => Promise<string>;
  /** Resolves the editable-template index. Omit to drop both template tools. */
  fetchTemplateCatalog?: () => Promise<TemplateCatalog>;
  /** Resolves one template's spec. Omit (with the above) to drop `get_template`. */
  fetchTemplate?: (slug: string) => Promise<TemplateSpec>;
};
