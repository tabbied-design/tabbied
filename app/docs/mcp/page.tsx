import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { plexMono, plexSans } from 'lib/fonts';
import { MCP_VERSION, PATTERN_COUNT, TEMPLATE_COUNT } from 'lib/siteCounts';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
import GitHubMark from 'components/GitHubMark';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsNav from 'components/react-docs-page/DocsNav';
import { Callout, Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import home from 'components/main-page/home.module.css';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The MCP server's page, a sibling of /docs/react in the same shell. The
// endpoint sends a browser here (worker/index.ts), so this is what a person
// who opens https://tabbied.com/mcp sees. The package README and
// docs/mcp-server.md say the same things for developers; keep the client
// setup and the tool list in step with them.

export const metadata: Metadata = pageMetadata({
  title: 'MCP server - Tabbied',
  description:
    'Connect an AI assistant to Tabbied over the Model Context Protocol: search and preview the generative patterns, render them to SVG or PNG, and find a website template.',
  path: '/docs/mcp/',
});

const ENDPOINT = 'https://tabbied.com/mcp';
const NPM_URL = 'https://www.npmjs.com/package/tabbied-mcp';
const GITHUB_URL = 'https://github.com/tabbied-design/tabbied/';
const PACKAGE_URL = `${GITHUB_URL}tree/main/packages/tabbied-mcp`;

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'connect', label: 'Connect a client' },
  { id: 'local', label: 'Run it locally' },
  { id: 'tools', label: 'Tools' },
  { id: 'prompts', label: 'Example prompts' },
  { id: 'templates', label: 'Website templates' },
  { id: 'programmatic', label: 'Programmatic use' },
];

const Section = docsSection(SECTIONS);

const claudeCodeRemote = `claude mcp add --transport http tabbied ${ENDPOINT}`;

const codexRemote = `codex mcp add tabbied --url ${ENDPOINT}`;

const codexRemoteConfig = `[mcp_servers.tabbied]
url = "${ENDPOINT}"`;

const cursorConfig = `{
  "mcpServers": {
    "tabbied": { "url": "${ENDPOINT}" }
  }
}`;

const vscodeConfig = `{
  "servers": {
    "tabbied": { "type": "http", "url": "${ENDPOINT}" }
  }
}`;

// The local server renders through Playwright, which it does not install, so
// every way of starting it puts Playwright beside it.
const installBrowser = `npx playwright install chromium`;

const claudeCodeLocal = `claude mcp add tabbied -- npx -y -p tabbied-mcp -p playwright tabbied-mcp`;

const codexLocal = `codex mcp add tabbied -- npx -y -p tabbied-mcp -p playwright tabbied-mcp`;

const codexLocalConfig = `[mcp_servers.tabbied]
command = "npx"
args = ["-y", "-p", "tabbied-mcp", "-p", "playwright", "tabbied-mcp"]`;

const localConfig = `{
  "mcpServers": {
    "tabbied": {
      "command": "npx",
      "args": ["-y", "-p", "tabbied-mcp", "-p", "playwright", "tabbied-mcp"]
    }
  }
}`;

const programmaticCode = `// On Node: the readers the local server itself uses.
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

export default {
  // The factory, not a built server: one server per request.
  fetch: createMcpHandler(() => buildServer(tools)).fetch,
};`;

// A Worker has no disk and no I/O outside a request, so it reads the same
// files over fetch, once, on the first request.
const workerCode = `import { createMcpHandler } from '@modelcontextprotocol/server';
import {
  buildServer,
  catalogTools,
  type Catalog,
  type TemplateCatalog,
  type TemplateSpec,
  type Tool,
} from 'tabbied-mcp';

const SITE = 'https://tabbied.com';

const get = async (path: string) => {
  const response = await fetch(new URL(path, SITE));
  if (!response.ok) throw new Error(\`\${path}: \${response.status}\`);
  return response;
};

const base64 = (bytes: Uint8Array) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

let tools: Promise<Tool[]> | undefined;

const load = async () =>
  catalogTools({
    catalog: (await (await get('/catalog.json')).json()) as Catalog,
    fetchDocs: async () => (await get('/llms-full.txt')).text(),
    fetchPreview: async (design) => {
      const response = await get(design.preview);
      return {
        data: base64(new Uint8Array(await response.arrayBuffer())),
        mimeType: response.headers.get('Content-Type') ?? 'image/webp',
      };
    },
    fetchTemplateCatalog: async () =>
      (await (await get('/editable-catalog.json')).json()) as TemplateCatalog,
    fetchTemplate: async (slug) =>
      (await (await get(\`/editable/\${encodeURIComponent(slug)}.json\`)).json()) as TemplateSpec,
  });

export default {
  async fetch(request: Request) {
    const ready = await (tools ??= load());
    return createMcpHandler(() => buildServer(ready)).fetch(request);
  },
};`;

type ToolRow = { name: string; where: 'Both' | 'Local'; description: ReactNode };

const TOOLS: ToolRow[] = [
  {
    name: 'search_designs',
    where: 'Both',
    description: (
      <>
        Filters the catalog by motif, mood, density, intended use, free text
        and SVG-export support. An empty result says which filter emptied it.
      </>
    ),
  },
  {
    name: 'preview_design',
    where: 'Both',
    description: <>The rendered preview of up to six designs, as images the assistant can look at.</>,
  },
  {
    name: 'get_design',
    where: 'Both',
    description: (
      <>
        One design in full: its palette, every option with its range and
        default, and the code for it in React, Vue, Svelte, the web
        component, plain HTML or plain JavaScript, plus a command for the
        CLI.
      </>
    ),
  },
  {
    name: 'get_docs',
    where: 'Both',
    description: (
      <>
        The complete reference for the <Code>tabbied</Code> package (
        <a href="/llms-full.txt">llms-full.txt</a>).
      </>
    ),
  },
  {
    name: 'list_templates',
    where: 'Both',
    description: (
      <>
        The website templates, a page at a time, by category or by the kind of
        business.
      </>
    ),
  },
  {
    name: 'get_template',
    where: 'Both',
    description: (
      <>
        One template&apos;s editable parts by id, its download links, and how
        to edit each format.
      </>
    ),
  },
  {
    name: 'render_design',
    where: 'Local',
    description: <>An SVG or PNG of any design at any size, seed, palette and set of options.</>,
  },
];

const PROMPTS = [
  'Find a calm, sparse Tabbied pattern for the header of a meditation app. Show me three, and give me the React code for the one I pick.',
  'This is a SvelteKit site. Find a bold Tabbied pattern for the pricing section and give me the Svelte code for it.',
  'Which Tabbied patterns export cleanly to SVG and would work as a print poster? Show me the previews.',
  'Render radius as a 1600 by 900 SVG in #0f172a, #38bdf8 and #f8fafc.',
  'Which Tabbied website template suits a family bakery? Show me what I can change on it.',
];

export default function McpDocsPage() {
  return (
    <div className={`${home.home} ${plexMono.variable} ${plexSans.variable} ${styles.page}`}>
      <div className={`${home.columnRule} ${home.columnRuleLeft}`} aria-hidden="true" />
      <div className={`${home.columnRule} ${home.columnRuleRight}`} aria-hidden="true" />

      <div className={styles.paper}>
        <SiteNav tone="light" />

        <main className={styles.main}>
          <div className={styles.inner}>
            <header className={styles.head}>
              <div>
                <p className={styles.eyebrow}>Documentation</p>
                <h1 className={styles.title}>The MCP server</h1>
              </div>
              <div>
                <p className={styles.lede}>
                  Connect your AI assistant to Tabbied. Over the{' '}
                  <a href="https://modelcontextprotocol.io">Model Context Protocol</a>{' '}
                  it can search all {PATTERN_COUNT} patterns, look at their
                  previews before it picks one, render them to SVG or PNG, and
                  find the website template that fits what you are building.
                </p>
                <div className={styles.meta}>
                  <span className={styles.chip}>tabbied-mcp v{MCP_VERSION}</span>
                  <span className={styles.chip}>MIT license</span>
                  <a className={styles.chipLink} href={NPM_URL} target="_blank" rel="noreferrer">
                    npm
                  </a>
                  <a className={styles.chipLink} href={PACKAGE_URL} target="_blank" rel="noreferrer">
                    <GitHubMark size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </header>

            <div className={styles.docs}>
              <DocsNav sections={SECTIONS} />

              <article className={styles.article}>
                <Section id="introduction" title="Introduction">
                  <p>
                    Tabbied&apos;s patterns are pictures, and their names (
                    <Code>cleat</Code>, <Code>karst</Code>, <Code>radius</Code>)
                    say nothing about what they look like. The MCP server gives
                    an assistant what it needs to choose well: a search over a
                    fixed vocabulary of motifs, moods and uses, the rendered
                    preview of every design to look at, and the exact code for
                    the one it picks.
                  </p>
                  <p>It runs in two places, with the same tools:</p>
                  <div className={styles.entries}>
                    <div className={styles.entry}>
                      <code className={styles.entryName}>{ENDPOINT}</code>
                      <p>
                        Hosted by Tabbied. Nothing to install: add the URL to
                        your client and it is ready.
                      </p>
                    </div>
                    <div className={styles.entry}>
                      <code className={styles.entryName}>
                        npx -y -p tabbied-mcp -p playwright tabbied-mcp
                      </code>
                      <p>
                        On your own machine, with Node 20 or later. With
                        Playwright beside it, it adds{' '}
                        <Code>render_design</Code>, which writes SVG and PNG
                        files.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section id="connect" title="Connect a client">
                  <p>
                    The hosted server needs no account and no key: give your
                    client the URL <Code>{ENDPOINT}</Code>.
                  </p>

                  <h3 className={styles.minihead}>Claude (web and desktop)</h3>
                  <ol className={styles.steps}>
                    <li>Open Customize, then Connectors.</li>
                    <li>Select + Add, then Add custom connector.</li>
                    <li>
                      Name it Tabbied, enter <Code>{ENDPOINT}</Code> and select
                      Continue.
                    </li>
                    <li>
                      For sign-in, choose No sign in (the server needs none),
                      then select Add.
                    </li>
                  </ol>
                  <p>
                    The connector then works in Claude on the web and in the
                    desktop app. A Free plan can add one custom connector; on a
                    Team or Enterprise plan, an owner adds it first, under
                    Organization settings and Connectors.
                  </p>

                  <h3 className={styles.minihead}>Claude Code</h3>
                  <CodeBlock
                    code={claudeCodeRemote}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>ChatGPT</h3>
                  <ol className={styles.steps}>
                    <li>In Settings, open Security and login, and turn on Developer mode.</li>
                    <li>
                      Open{' '}
                      <a href="https://chatgpt.com/plugins" target="_blank" rel="noreferrer">
                        Plugins
                      </a>{' '}
                      and select the + button.
                    </li>
                    <li>
                      Name it Tabbied, choose a public endpoint as the
                      connection, and enter <Code>{ENDPOINT}</Code>, with the{' '}
                      <Code>/mcp</Code> at the end.
                    </li>
                    <li>Check the six tools ChatGPT finds, and finish.</li>
                  </ol>
                  <p>
                    Whether you can turn on Developer mode depends on your plan
                    and, in a workspace, on its admins. ChatGPT reaches hosted
                    servers only, so it gets every tool but{' '}
                    <Code>render_design</Code>.
                  </p>

                  <h3 className={styles.minihead}>Codex</h3>
                  <CodeBlock
                    code={codexRemote}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />
                  <p>Or add it to Codex&apos;s configuration file yourself:</p>
                  <CodeBlock
                    code={codexRemoteConfig}
                    title="~/.codex/config.toml"
                    lang="toml"
                    className={styles.codeStandalone}
                  />
                  <p>
                    The Codex CLI, its IDE extension and the ChatGPT desktop
                    app share this configuration, so adding it once covers all
                    three.
                  </p>

                  <h3 className={styles.minihead}>Cursor</h3>
                  <CodeBlock
                    code={cursorConfig}
                    title="~/.cursor/mcp.json"
                    lang="json"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>VS Code</h3>
                  <CodeBlock
                    code={vscodeConfig}
                    title=".vscode/mcp.json"
                    lang="json"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>Other clients</h3>
                  <p>
                    Any client that speaks the protocol over HTTP (Streamable
                    HTTP) can use the URL as it is. Many read the same{' '}
                    <Code>mcpServers</Code> shape as Cursor.
                  </p>
                  <Callout>
                    <p>
                      Opening <Code>{ENDPOINT}</Code> in a browser brings you to
                      this page. The endpoint itself answers MCP clients only.
                    </p>
                  </Callout>
                </Section>

                <Section id="local" title="Run it locally">
                  <p>
                    Run the server on your own machine when you want files. It
                    adds <Code>render_design</Code>, which draws a design to SVG
                    or PNG at any size, seed, palette and set of options.
                    Drawing a css-doodle pattern needs a real browser, which is
                    why the hosted server cannot offer it.
                  </p>
                  <p>
                    The server draws with Chromium through Playwright, which it
                    does not install, so each command below starts it with
                    Playwright beside it. Download the browser once, with Node
                    20 or later:
                  </p>
                  <CodeBlock
                    code={installBrowser}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />
                  <h3 className={styles.minihead}>Claude Code</h3>
                  <CodeBlock
                    code={claudeCodeLocal}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>Codex</h3>
                  <CodeBlock
                    code={codexLocal}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />
                  <CodeBlock
                    code={codexLocalConfig}
                    title="~/.codex/config.toml"
                    lang="toml"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>Claude Desktop, Cursor and others</h3>
                  <p>
                    Clients that start local servers from a JSON file
                    (Claude Desktop&apos;s <Code>claude_desktop_config.json</Code>,
                    Cursor&apos;s <Code>mcp.json</Code>) take it in this shape:
                  </p>
                  <CodeBlock
                    code={localConfig}
                    title="claude_desktop_config.json"
                    lang="json"
                    className={styles.codeStandalone}
                  />
                  <p>
                    ChatGPT connects to hosted servers only, so it cannot run
                    the local one.
                  </p>
                  <p>
                    A Playwright installed in the project the server starts in
                    is found too, and <Code>TABBIED_CHROMIUM</Code> points it
                    at a Chromium binary of your own. Started as plain{' '}
                    <Code>npx -y tabbied-mcp</Code>, it serves the other six
                    tools, which need neither, and <Code>render_design</Code>{' '}
                    says what to install.
                  </p>
                </Section>

                <Section id="tools" title="Tools">
                  <div className={styles.tableScroll}>
                    <table className={styles.propsTable}>
                      <thead>
                        <tr>
                          <th>Tool</th>
                          <th>Where</th>
                          <th>What it does</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOOLS.map((tool) => (
                          <tr key={tool.name}>
                            <td className={styles.propName}>{tool.name}</td>
                            <td>{tool.where === 'Both' ? 'Hosted and local' : 'Local only'}</td>
                            <td>{tool.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>
                    The order that works is search, look, then use:{' '}
                    <Code>search_designs</Code> to narrow the field,{' '}
                    <Code>preview_design</Code> to see the shortlist, and{' '}
                    <Code>get_design</Code> for the code. Choosing from the tags
                    alone is the usual way it goes wrong, and the server tells
                    the assistant so when it connects.
                  </p>
                </Section>

                <Section id="prompts" title="Example prompts">
                  <p>Ask in your own words. A few to start from:</p>
                  <ul className={styles.list}>
                    {PROMPTS.map((prompt) => (
                      <li key={prompt}>&quot;{prompt}&quot;</li>
                    ))}
                  </ul>
                  <p>
                    The third one renders a file, so it needs the local server.
                  </p>
                </Section>

                <Section id="templates" title="Website templates">
                  <p>
                    <Code>list_templates</Code> and <Code>get_template</Code>{' '}
                    describe Tabbied&apos;s {TEMPLATE_COUNT} website templates
                    and how to edit one. Every text, picture and pattern on a
                    template has a stable id, and <Code>get_template</Code> lists
                    them with their current values, the palette and the fonts,
                    so an assistant can rebrand a downloaded template precisely.
                  </p>
                  <p>
                    The templates are licensed per Tabbied account, not with
                    the MCP server: to download one, choose it with your
                    account, and you can then build websites with it under the{' '}
                    <a href="/terms-of-service/#template-license">Template License</a>.
                    Copying a template from its preview is not covered by that
                    license, and the tools tell the assistant so.
                  </p>
                </Section>

                <Section id="programmatic" title="Programmatic use">
                  <p>
                    The <Code>tabbied-mcp</Code> package is ESM only. Its main
                    entry point has no Node imports, so the same tools can be
                    served from a Cloudflare Worker or any Web-standard server.
                    It exports the tools and a server factory; the transport
                    comes from the MCP SDK. On Node,{' '}
                    <Code>tabbied-mcp/node</Code> has the readers the local
                    server itself uses:
                  </p>
                  <CodeBlock
                    code={programmaticCode}
                    title="server.ts"
                    lang="ts"
                    className={styles.codeStandalone}
                  />
                  <p>
                    Only <Code>catalog</Code> is required. Each fetcher adds
                    tools, and one left out drops them:{' '}
                    <Code>fetchPreview</Code> gives <Code>preview_design</Code>,{' '}
                    <Code>fetchDocs</Code> gives <Code>get_docs</Code>,{' '}
                    <Code>fetchTemplateCatalog</Code> gives{' '}
                    <Code>list_templates</Code>, and with{' '}
                    <Code>fetchTemplate</Code> as well,{' '}
                    <Code>get_template</Code>. With all five, as here, it serves
                    the same six tools as the hosted server at{' '}
                    <Code>{ENDPOINT}</Code>.
                  </p>
                  <p>
                    The Node readers take the catalog from the installed{' '}
                    <Code>tabbied</Code> package. A Worker cannot read the
                    disk, so it passes fetchers of its own, each an async
                    function returning the same data, as the hosted server
                    does with its static files:
                  </p>
                  <CodeBlock
                    code={workerCode}
                    title="worker.ts"
                    lang="ts"
                    className={styles.codeStandalone}
                  />
                  <p>
                    The{' '}
                    <a href={NPM_URL} target="_blank" rel="noreferrer">
                      package README
                    </a>{' '}
                    has the rest.
                  </p>
                </Section>

                <footer className={styles.articleFooter}>
                  <p>
                    Found a problem or missing something? Open an issue on{' '}
                    <a href={`${GITHUB_URL}issues`} target="_blank" rel="noreferrer">
                      <GitHubMark size={14} className={styles.inlineMark} />
                      GitHub
                    </a>
                    . The MCP server is MIT-licensed, like the{' '}
                    <a href="/docs/">tabbied package</a> it serves.
                  </p>
                </footer>
              </article>
            </div>
          </div>
        </main>
      </div>

      <HomeFooter />
    </div>
  );
}
