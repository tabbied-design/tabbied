import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { plexMono, plexSans } from 'lib/fonts';
import { MCP_VERSION, PATTERN_COUNT, TEMPLATE_COUNT } from 'lib/siteCounts';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
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

const claudeCodeLocal = `claude mcp add tabbied -- npx -y tabbied-mcp`;

const localConfig = `{
  "mcpServers": {
    "tabbied": { "command": "npx", "args": ["-y", "tabbied-mcp"] }
  }
}`;

const programmaticCode = `import { createMcpHandler } from '@modelcontextprotocol/server';
import { buildServer, catalogTools } from 'tabbied-mcp';

const tools = catalogTools({ catalog, fetchPreview, fetchDocs });

export default {
  // The factory, not a built server: one server per request.
  fetch: createMcpHandler(() => buildServer(tools)).fetch,
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
        default, and code for React, plain JavaScript and the CLI.
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
    description: <>The website templates, with each one&apos;s palette, patterns and editable parts.</>,
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
  'Which Tabbied patterns export cleanly to SVG and would work as a print poster? Show me the previews.',
  'Render radius as a 1600 by 900 SVG in #0f172a, #38bdf8 and #f8fafc.',
  'Which Tabbied website template suits a family bakery? Show me what I can change on it.',
];

export default function McpDocsPage() {
  return (
    // The same shell as /docs/react: the homepage's tokens, the masthead in
    // its light tone, a white article, and the dark footer.
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
                      <code className={styles.entryName}>npx -y tabbied-mcp</code>
                      <p>
                        On your own machine, with Node 18 or later. Adds{' '}
                        <Code>render_design</Code>, which writes SVG and PNG
                        files.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section id="connect" title="Connect a client">
                  <h3 className={styles.minihead}>Claude Code</h3>
                  <CodeBlock
                    code={claudeCodeRemote}
                    title="terminal"
                    lang="sh"
                    className={styles.codeStandalone}
                  />

                  <h3 className={styles.minihead}>Claude (web and desktop)</h3>
                  <p>
                    Add a custom connector in Settings, under Connectors, with
                    the URL <Code>{ENDPOINT}</Code>.
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
                  <CodeBlock
                    code={claudeCodeLocal}
                    title="Claude Code"
                    lang="sh"
                    className={styles.codeStandalone}
                  />
                  <CodeBlock
                    code={localConfig}
                    title="mcp.json"
                    lang="json"
                    className={styles.codeStandalone}
                  />
                  <p>
                    For <Code>render_design</Code>, install Playwright beside it
                    (<Code>npm i -D playwright</Code>), or point{' '}
                    <Code>TABBIED_CHROMIUM</Code> at a Chromium binary. The
                    other six tools need neither.
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
                    The <Code>tabbied-mcp</Code> package&apos;s main entry point
                    has no Node imports, so the same tools can be served from a
                    Cloudflare Worker or any Web-standard server. It exports the
                    tools and a server factory; the transport comes from the
                    MCP SDK:
                  </p>
                  <CodeBlock
                    code={programmaticCode}
                    title="worker.ts"
                    lang="ts"
                    className={styles.codeStandalone}
                  />
                  <p>
                    This is how the hosted server at <Code>{ENDPOINT}</Code> is
                    built. The{' '}
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
                      GitHub
                    </a>
                    . The MCP server is MIT-licensed, like the{' '}
                    <a href="/docs/react/">tabbied package</a> it serves.
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
