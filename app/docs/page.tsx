import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { MCP_VERSION, PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Code, docsSection } from 'components/react-docs-page/parts';
import type { DocsSection } from 'components/react-docs-page/sections';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The Developers landing page, which the masthead's "Developers" leads to:
// one card per way of putting a pattern on a page, then what every setup
// shares. A new entry point (a framework, a tool) gets a card here, a page
// under /docs, a footer link and an entry in the sitemap.

export const metadata: Metadata = pageMetadata({
  title: 'Developers - Tabbied',
  description:
    'Use Tabbied generative patterns in React, Vue and Nuxt, Svelte and SvelteKit, plain HTML or any page with the web component, and connect AI assistants over MCP.',
  path: '/docs/',
});

const SECTIONS: DocsSection[] = [
  { id: 'setup', label: 'Choose your setup' },
  { id: 'assistants', label: 'AI assistants' },
  { id: 'cli', label: 'Command line' },
  { id: 'shared', label: 'In every setup' },
];

const Section = docsSection(SECTIONS);

const README_URL = 'https://github.com/tabbied-design/tabbied/tree/main/packages/tabbied#readme';

type Card = { href: string; name: string; children: ReactNode; meta: string };

const SETUPS: Card[] = [
  {
    href: '/docs/react/',
    name: 'React',
    children: <>The TabbiedPattern component, with live examples of every prop.</>,
    meta: 'tabbied/react',
  },
  {
    href: '/docs/vue/',
    name: 'Vue and Nuxt',
    children: <>The same component for Vue 3, drawn at its final size on the server.</>,
    meta: 'tabbied/vue',
  },
  {
    href: '/docs/svelte/',
    name: 'Svelte and SvelteKit',
    children: <>An action, plus the attributes a SvelteKit server render needs.</>,
    meta: 'tabbied/svelte',
  },
  {
    href: '/docs/web-component/',
    name: 'Web component',
    children: <>One tag for any page or framework, loading only the designs it names.</>,
    meta: '<tabbied-pattern>',
  },
  {
    href: '/docs/html/',
    name: 'Plain HTML',
    children: <>Markup with data attributes and one script, with no build step.</>,
    meta: 'hydratePatterns()',
  },
  {
    href: '/docs/javascript/',
    name: 'JavaScript',
    children: <>The framework-free controller every setup is built on.</>,
    meta: 'createPattern()',
  },
];

const ASSISTANTS: Card[] = [
  {
    href: '/docs/mcp/',
    name: 'MCP server',
    children: (
      <>Lets an assistant search the designs, look at them, and write the code for the one it picks.</>
    ),
    meta: `tabbied-mcp v${MCP_VERSION}`,
  },
  {
    href: '/llms-full.txt',
    name: 'llms-full.txt',
    children: <>The whole API and every design as one text file, for an assistant without MCP.</>,
    meta: '/llms.txt for the index',
  },
  {
    href: '/catalog.json',
    name: 'catalog.json',
    children: <>Every design as data: tags, moods, palette, options and a preview image.</>,
    meta: 'also tabbied/catalog.json',
  },
];

const cliCode = `npx tabbied list --good-for hero-background --density sparse
npx tabbied render radius --seed k9Pz --size 1600x900 --out hero.svg`;

function Cards({ cards }: { cards: Card[] }) {
  return (
    <div className={styles.entries}>
      {cards.map((card) => (
        <a key={card.href} href={card.href} className={`${styles.entry} ${styles.setupCard}`}>
          <span className={styles.entryName}>{card.name}</span>
          <p>{card.children}</p>
          <span className={styles.setupMeta}>{card.meta}</span>
        </a>
      ))}
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <DocsShell
      title="Developers"
      lede={
        <>
          All {PATTERN_COUNT} patterns are one npm package, and every way of
          using them takes the same settings: a design, a seed, a palette and
          its options. Pick the setup that matches your project; the{' '}
          <a href="/docs/concepts/">Concepts</a> page covers what they share.
        </>
      }
      chips={[`tabbied v${PACKAGE_VERSION}`, 'MIT license']}
      sections={SECTIONS}
    >
      <Section id="setup" title="Choose your setup">
        <Cards cards={SETUPS} />
      </Section>

      <Section id="assistants" title="AI assistants">
        <p>
          A design&apos;s name says nothing about how it looks, so an
          assistant does best when it can look at the designs before it
          chooses one.
        </p>
        <Cards cards={ASSISTANTS} />
      </Section>

      <Section id="cli" title="Command line">
        <p>
          The package has a <Code>tabbied</Code> command that searches the
          designs and renders them to SVG, PNG or a numbered sequence of
          frames for video, with no app. Rendering needs Playwright; the{' '}
          <a href={README_URL} target="_blank" rel="noreferrer">
            package README
          </a>{' '}
          has the setup and every flag.
        </p>
        <CodeBlock code={cliCode} title="terminal" lang="sh" className={styles.codeStandalone} />
      </Section>

      <Section id="shared" title="In every setup">
        <p>
          Designs, sizing and fit modes, colors, options, seeds and export,
          motion and accessibility work the same way whichever setup you
          pick. The <a href="/docs/concepts/">Concepts</a> page explains each
          one once and gives its name in every setup, and the{' '}
          <a href="/docs/react/#fit-modes">React docs</a> show them as live
          examples.
        </p>
      </Section>
    </DocsShell>
  );
}
