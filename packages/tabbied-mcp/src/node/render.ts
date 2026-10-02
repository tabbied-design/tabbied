// `render_design`, the one tool that only exists over stdio.
//
// It shells out to the `tabbied` CLI: the only faithful renderer for a
// css-doodle pattern is css-doodle in a real browser (see docs/svg-export.md),
// and the CLI already owns the headless browser, the SVG converter, and the
// option parsing. A Worker has no browser, so it doesn't offer the tool.
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import type { Catalog, Tool, ToolResult } from '../types.js';
import { tabbiedRoot } from './resources.js';

const run = promisify(execFile);

// Rendering launches a browser and waits for the first arrangement to settle.
const RENDER_TIMEOUT_MS = 180_000;

// A PNG returned inline is spent context. Past this the file stays on disk and
// the agent gets the path - better a usable pointer than a truncated image.
const INLINE_BYTE_BUDGET = 1_500_000;

// Past these a PNG is tens of megapixels (or a browser canvas limit), which
// no asset this tool exists for needs.
const SIZE_MAX = 4096;
const SCALE_MAX = 4;

const text = (value: string) => ({ type: 'text' as const, text: value });

const toolError = (message: string): ToolResult => ({
  content: [text(message)],
  isError: true,
});

/** A whole number in [min, max], the default when absent, or null when invalid. */
function integerArg(value: unknown, fallback: number, min: number, max: number): number | null {
  if (value === undefined) return fallback;
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max
    ? value
    : null;
}

/**
 * The CLI's own message out of its stderr: each `tabbied:` line and the
 * indented lines that continue it. Anything else there (Node's warnings, a
 * deprecation notice from a dependency) is noise to the agent. When there is
 * no such line, the CLI died some other way, and the tail is the best guess.
 */
function cliMessage(stderr: string): string {
  const lines = stderr.split('\n');
  const kept: string[] = [];
  let continuing = false;
  for (const line of lines) {
    if (line.startsWith('tabbied:')) {
      kept.push(line);
      continuing = true;
    } else if (continuing && /^\s+\S/.test(line)) {
      kept.push(line);
    } else {
      continuing = false;
    }
  }
  return kept.length > 0
    ? kept.join('\n')
    : lines.filter((line) => line.trim()).slice(-5).join('\n');
}

export function renderTool(catalog: Catalog): Tool {
  return {
    definition: {
      name: 'render_design',
      title: 'Render a design to a file',
      description:
        'Render a design to SVG or PNG with a real browser, at any size, seed, ' +
        'palette, and option set. Use this to produce an actual asset - or to ' +
        'preview a *customized* configuration, which preview_design cannot show ' +
        'you (it only has the stock palette and defaults). Needs Playwright ' +
        'where this server runs (start it as `npx -y -p tabbied-mcp -p ' +
        'playwright tabbied-mcp`, with `npx playwright install chromium` once). ' +
        'Without "out" the image comes back inline; with it, the file is ' +
        'written where you ask, replacing any file already there.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: { type: 'string', minLength: 1, description: 'The design to render.' },
          format: {
            type: 'string',
            enum: ['svg', 'png'],
            description:
              'Vector or raster. A few designs cannot be vectorized - check ' +
              'svgExport on the design first.',
          },
          out: {
            type: 'string',
            minLength: 1,
            description:
              'Absolute path to write to, ending in .svg or .png to match ' +
              '"format". Omit to get the image back inline instead of on disk.',
          },
          seed: {
            type: 'string',
            minLength: 1,
            description:
              'Fixed seed - the same seed always gives the same image. Random ' +
              'when omitted.',
          },
          palette: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            minItems: 1,
            description:
              "CSS colors, background first. Omit for the design's authored palette.",
          },
          options: {
            type: 'object',
            additionalProperties: { type: ['string', 'number', 'boolean'] },
            description:
              'Option values keyed by option id, e.g. {"frequency": 0.6}. Read ' +
              'the ids, ranges, and choices off get_design.',
          },
          width: {
            type: 'integer',
            minimum: 1,
            maximum: SIZE_MAX,
            description: 'Pixels wide (default 960).',
          },
          height: {
            type: 'integer',
            minimum: 1,
            maximum: SIZE_MAX,
            description: 'Pixels tall (default 960).',
          },
          fit: {
            type: 'string',
            enum: ['grid', 'cover', 'fixed'],
            description: 'Sizing mode (default grid).',
          },
          scale: {
            type: 'integer',
            minimum: 1,
            maximum: SCALE_MAX,
            description:
              'PNG device-scale factor. Defaults to 2 when writing a file and ' +
              '1 when returning inline, to keep the response small.',
          },
        },
        required: ['slug', 'format'],
        additionalProperties: false,
      },
      // It writes a file, so it is not read-only; it only ever adds or
      // replaces the one file it was asked for.
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },

    async run(args): Promise<ToolResult> {
      const slug = typeof args.slug === 'string' ? args.slug : '';
      const design = catalog.designs.find((entry) => entry.slug === slug);
      if (!design) {
        return toolError(
          `No design with slug "${slug}". Use search_designs to find one.`
        );
      }

      const format = args.format === 'png' ? 'png' : 'svg';
      if (format === 'svg' && !design.svgExport.supported) {
        return toolError(
          `"${slug}" paints effects SVG cannot represent, so it has no vector ` +
            'export. Render it as PNG instead.'
        );
      }

      // The schema states these, but a host that skips validation (or calls
      // run() directly) must not hand the CLI a path it would resolve against
      // whatever directory the server happened to start in.
      const out = typeof args.out === 'string' && args.out.length > 0 ? args.out : null;
      if (out !== null && !path.isAbsolute(out)) {
        return toolError(
          `"out" must be an absolute path, got "${out}". A relative one would ` +
            "land in the server's working directory, not yours."
        );
      }
      if (out !== null && path.extname(out).toLowerCase() !== `.${format}`) {
        return toolError(
          `"out" must end in .${format} to match format "${format}", got "${out}".`
        );
      }

      const inline = out === null;
      const width = integerArg(args.width, 960, 1, SIZE_MAX);
      const height = integerArg(args.height, 960, 1, SIZE_MAX);
      const scale = integerArg(args.scale, inline ? 1 : 2, 1, SCALE_MAX);
      if (width === null || height === null) {
        return toolError(`"width" and "height" must be whole pixels from 1 to ${SIZE_MAX}.`);
      }
      if (scale === null) {
        return toolError(`"scale" must be a whole number from 1 to ${SCALE_MAX}.`);
      }

      // Options reach the CLI as one "id: value; id: value" string, so a `;`
      // inside a value would end it and start an option of its own, past
      // every check on the first. Ranges and choices are the CLI's to check.
      let options: string | null = null;
      if (args.options !== undefined) {
        if (!args.options || typeof args.options !== 'object' || Array.isArray(args.options)) {
          return toolError('"options" must be an object of option values keyed by id.');
        }
        const ids = design.options.map((option) => option.id);
        const pairs: string[] = [];
        for (const [id, value] of Object.entries(args.options as Record<string, unknown>)) {
          if (!ids.includes(id)) {
            return toolError(
              `"${slug}" has no option "${id}" (has: ${ids.join(', ') || 'none'}).`
            );
          }
          if (!['string', 'number', 'boolean'].includes(typeof value) || /[;\n]/.test(String(value))) {
            return toolError(
              `Option "${id}" must be a single string, number, or boolean value ` +
                '(no ";" or line breaks).'
            );
          }
          pairs.push(`${id}: ${String(value)}`);
        }
        if (pairs.length > 0) options = pairs.join('; ');
      }

      const root = tabbiedRoot();
      if (!root) {
        return toolError(
          'The `tabbied` package is not installed next to this server, so the ' +
            'renderer is unavailable. Run `npm install tabbied`.'
        );
      }

      // An inline render gets a scratch directory, removed once its bytes
      // have been read back, or once the render has failed.
      const scratch = inline ? await mkdtemp(path.join(tmpdir(), 'tabbied-')) : null;
      const outPath = scratch ? path.join(scratch, `${slug}.${format}`) : (out as string);
      let keepScratch = false;

      // A value that starts with "-" (a seed of "--browser", say) would read
      // as the next flag, so it goes as --flag=value, which the CLI takes
      // from tabbied 0.7.1. Everything else stays two arguments, which every
      // version of the CLI reads.
      const flag = (name: string, value: string) =>
        value.startsWith('-') ? [`--${name}=${value}`] : [`--${name}`, value];
      const argv = [
        path.join(root, 'dist', 'cli.js'),
        'render',
        slug,
        ...flag('out', outPath),
        ...flag('format', format),
        ...flag('scale', String(scale)),
        ...flag('size', `${width}x${height}`),
      ];
      if (typeof args.seed === 'string' && args.seed) argv.push(...flag('seed', args.seed));
      if (typeof args.fit === 'string') argv.push(...flag('fit', args.fit));
      if (Array.isArray(args.palette)) {
        const colors = args.palette.filter(
          (color): color is string => typeof color === 'string' && color.trim().length > 0
        );
        if (colors.length > 0) argv.push(...flag('palette', colors.join(',')));
      }
      if (options) argv.push(...flag('options', options));

      try {
        let stderr = '';
        try {
          // No shell: argv goes straight to node, so a palette or option value
          // can't be read as shell syntax.
          ({ stderr } = await run(process.execPath, argv, {
            timeout: RENDER_TIMEOUT_MS,
            maxBuffer: 8 * 1024 * 1024,
          }));
        } catch (error) {
          const failure = error as { killed?: boolean; stderr?: unknown; message?: string };
          if (failure.killed) {
            return toolError(
              `Rendering timed out after ${RENDER_TIMEOUT_MS / 1000}s. Try a smaller ` +
                'width/height or scale.'
            );
          }
          const detail =
            typeof failure.stderr === 'string' && failure.stderr.trim()
              ? cliMessage(failure.stderr)
              : (failure.message ?? String(error));
          return toolError(`Rendering failed:\n${detail}`);
        }

        // The CLI reports SVG-fidelity caveats on stderr; they matter enough to
        // pass through rather than swallow.
        const notes = stderr
          .split('\n')
          .filter((line) => line.trim().startsWith('note:'))
          .join('\n');

        if (!inline) {
          const { size } = await stat(outPath);
          return {
            content: [
              text(
                `Rendered ${slug} to ${outPath} (${width}x${height}` +
                  (format === 'png' ? ` @${scale}x` : '') +
                  `, ${Math.round(size / 1024)} KB).` +
                  (notes ? `\n${notes}` : '')
              ),
            ],
          };
        }

        if (format === 'svg') {
          const svg = await readFile(outPath, 'utf-8');
          return {
            content: [
              text(
                `Rendered ${slug} as SVG (${width}x${height}).` +
                  (notes ? `\n${notes}` : '')
              ),
              text(svg),
            ],
          };
        }

        const png = await readFile(outPath);
        const data = png.toString('base64');
        if (data.length > INLINE_BYTE_BUDGET) {
          // Kept: the answer tells the agent to read it from that path.
          keepScratch = true;
          return {
            content: [
              text(
                `Rendered ${slug} to ${outPath} - ${Math.round(
                  png.byteLength / 1024
                )} KB, too large to return inline. Read it from that path, or ` +
                  're-render smaller (lower "scale", or a smaller width/height).'
              ),
            ],
          };
        }

        return {
          content: [
            text(
              `Rendered ${slug} (${width}x${height} @${scale}x).` +
                (notes ? `\n${notes}` : '')
            ),
            { type: 'image', data, mimeType: 'image/png' },
          ],
        };
      } finally {
        if (scratch && !keepScratch) await rm(scratch, { recursive: true, force: true });
      }
    },
  };
}
