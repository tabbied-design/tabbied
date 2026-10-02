// Turns the runtime-agnostic toolset into an SDK `McpServer`. The Worker hands
// the factory to `createMcpHandler` and the bin hands it to `serveStdio`, so
// both transports get the same tools, instructions, and era handling.
//
// A *factory*, not an instance: MCP v2 is stateless and the SDK builds one
// server per request (per connection on stdio). Nothing here may capture
// per-request state.
import { McpServer, fromJsonSchema } from '@modelcontextprotocol/server';

import { INSTRUCTIONS, SERVER_NAME, VERSION } from './info.js';
import type { Tool } from './types.js';

/**
 * Register a toolset onto a fresh `McpServer`.
 *
 * Tool schemas stay plain JSON Schema, adapted by `fromJsonSchema`, because
 * `search_designs`'s enums are derived from the catalog being served and so
 * cannot be static Zod. Registering the schema also makes the SDK validate
 * arguments: a bad enum value comes back as a tool error naming the allowed
 * values instead of silently matching nothing.
 */
export function buildServer(tools: Tool[]): McpServer {
  // `listChanged: false` because the list never changes: a server is built
  // per request (per connection on stdio) with its tools fixed, and nothing
  // ever sends the notification. Left unset, the SDK advertises it as true the
  // moment the first tool registers, inviting a modern client to listen for
  // a change that cannot come.
  const server = new McpServer(
    { name: SERVER_NAME, version: VERSION },
    { capabilities: { tools: { listChanged: false } }, instructions: INSTRUCTIONS }
  );

  for (const tool of tools) {
    server.registerTool(
      tool.definition.name,
      {
        title: tool.definition.title,
        description: tool.definition.description,
        inputSchema: fromJsonSchema<Record<string, unknown>>(
          tool.definition.inputSchema
        ),
        ...(tool.definition.annotations
          ? { annotations: tool.definition.annotations }
          : {}),
      },
      async (args) => (await tool.run(args ?? {})) as never
    );
  }

  return server;
}
