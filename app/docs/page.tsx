import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BookOpen, type LucideIcon } from 'lucide-react';
import { bauhaus, chamfer, cleat, epicentre, merlon, mixtape, prisma, radius, truchetrings, wander } from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';
import type { PaletteName } from 'components/main-page/homeMotion';
import { MCP_VERSION, PACKAGE_VERSION, PATTERN_COUNT } from 'lib/siteCounts';
import CodeBlock from 'components/react-docs-page/CodeBlock';
import DocsShell from 'components/react-docs-page/DocsShell';
import { Code } from 'components/react-docs-page/parts';
import SetupIconMark, { type SetupIcon } from 'components/react-docs-page/SetupIcon';
import PatternBand from 'components/react-docs-page/PatternBand';
import { homePalette } from 'components/react-docs-page/homePalettes';
import styles from 'components/react-docs-page/ReactDocs.module.css';
import { pageMetadata } from 'lib/seo';

// The Developers landing page, which the masthead's "Developers" leads to:
// one card per way of putting a pattern on a page, then what every setup
// shares. A new entry point (a framework, a tool) gets a card here, a page
// under /docs, a footer link and an entry in the sitemap.
//
// The page is a menu, not a procedure, so it has no contents rail and its
// sections are not numbered: numbers read as steps 1 to 4, and a reader
// needs one setup, not all of them.

export const metadata: Metadata = pageMetadata({
  title: 'Developers - Tabbied',
  description:
    'Use Tabbied generative patterns in React, Vue and Nuxt, Svelte and SvelteKit, plain HTML or any page with the web component, and connect AI assistants over MCP.',
  path: '/docs/',
});

const README_URL = 'https://github.com/tabbied-design/tabbied/tree/main/packages/tabbied#readme';

// A card's mark: a setup's own (SetupIcon), or a drawn one for a page that
// has no logo of its own (Concepts).
type Card = { href: string; name: string; icon: SetupIcon | LucideIcon; children: ReactNode; meta: string };

const SETUPS: Card[] = [
  {
    href: '/docs/react/',
    icon: 'react',
    name: 'React',
    children: <>The TabbiedPattern component, with live examples of every prop.</>,
    meta: 'tabbied/react',
  },
  {
    href: '/docs/vue/',
    icon: 'vue',
    name: 'Vue and Nuxt',
    children: <>The same component for Vue 3, drawn at its final size on the server.</>,
    meta: 'tabbied/vue',
  },
  {
    href: '/docs/svelte/',
    icon: 'svelte',
    name: 'Svelte and SvelteKit',
    children: <>An action, plus the attributes a SvelteKit server render needs.</>,
    meta: 'tabbied/svelte',
  },
  {
    href: '/docs/web-component/',
    icon: 'element',
    name: 'Web component',
    children: <>One tag for any page or framework, loading only the designs it names.</>,
    meta: '<tabbied-pattern>',
  },
  {
    href: '/docs/html/',
    icon: 'html',
    name: 'Plain HTML',
    children: <>Markup with data attributes and one script, with no build step.</>,
    meta: 'hydratePatterns()',
  },
  {
    href: '/docs/javascript/',
    icon: 'javascript',
    name: 'JavaScript',
    children: <>The framework-free controller every setup is built on.</>,
    meta: 'createPattern()',
  },
];

const ASSISTANTS: Card[] = [
  {
    href: '/docs/mcp/',
    icon: 'mcp',
    name: 'MCP server',
    children: (
      <>Lets an assistant search the designs, look at them, and write the code for the one it picks.</>
    ),
    meta: `tabbied-mcp v${MCP_VERSION}`,
  },
  {
    href: '/llms-full.txt',
    icon: 'llms',
    name: 'llms-full.txt',
    children: <>The whole API and every design as one text file, for an assistant without MCP.</>,
    meta: '/llms.txt for the index',
  },
  {
    href: '/catalog.json',
    icon: 'catalog',
    name: 'catalog.json',
    children: <>Every design as data: tags, moods, palette, options and a preview image.</>,
    meta: 'also tabbied/catalog.json',
  },
];

// What every setup shares, each with its place on the Concepts page.
const SHARED: { id: string; name: string; says: string }[] = [
  { id: 'designs', name: 'Designs', says: `${PATTERN_COUNT} presets, imported one by one.` },
  { id: 'sizing', name: 'Sizing and fit', says: 'A box of your choosing, filled edge to edge.' },
  { id: 'colors', name: 'Colors', says: 'A palette: the ground first, then the inks.' },
  { id: 'options', name: 'Options', says: 'The controls each design offers.' },
  { id: 'seeds', name: 'Seeds and export', says: 'One arrangement to keep, as PNG or SVG.' },
  { id: 'motion', name: 'Motion', says: 'A slow reseed that respects reduced motion.' },
  { id: 'accessibility', name: 'Accessibility', says: 'Decorative by default, or an image with a label.' },
  { id: 'names', name: 'Names in each setup', says: 'Every setting, spelled the way each setup spells it.' },
];

// The Concepts page itself, as a card beside the list of what it covers, so
// this part leads with a card as the others do.
const CONCEPTS: Card = {
  href: '/docs/concepts/',
  icon: BookOpen,
  name: 'Concepts',
  children: <>Each setting explained once, with live examples and its name in every setup.</>,
  meta: `${SHARED.length} topics, ${SETUPS.length} setups each`,
};

const cliCode = `npx tabbied list --good-for hero-background --density sparse
npx tabbied render radius --seed k9Pz --size 1600x900 --out hero.svg`;

// The page's decoration, every piece of it Tabbied: a banner under the
// heading, a band between sections and a strip of six tiles before the last,
// each a different design in one of the homepage's four palettes on the
// page's own white, so the page is drawn by the package it documents. Each
// runs the window's full width. Decorative only (aria-hidden), built as each
// nears the viewport.
type Art = { pattern: PatternDefinition; palette: PaletteName; seed: string; density?: number };

const BANNER: Art = { pattern: radius, palette: 'Mint', seed: 'developers', density: 0.3 };

const BANDS: Record<'setup' | 'assistants', Art> = {
  setup: { pattern: prisma, palette: 'Ocean', seed: 'setups', density: 0.45 },
  assistants: { pattern: truchetrings, palette: 'Lilac', seed: 'assistants', density: 0.35 },
};

const MOSAIC: Art[] = [
  { pattern: mixtape, palette: 'Mint', seed: 'mosaic-1', density: 0.35 },
  { pattern: chamfer, palette: 'Sunset', seed: 'mosaic-2', density: 0.35 },
  { pattern: wander, palette: 'Ocean', seed: 'mosaic-3', density: 0.3 },
  { pattern: merlon, palette: 'Lilac', seed: 'mosaic-4', density: 0.35 },
  { pattern: epicentre, palette: 'Sunset', seed: 'mosaic-5', density: 0.4 },
  { pattern: cleat, palette: 'Ocean', seed: 'mosaic-6', density: 0.3 },
];

/** The band after the command line, a design the strip does not use. */
const CLI_BAND: Art = { pattern: bauhaus, palette: 'Sunset', seed: 'cli', density: 0.45 };

function ArtPiece({ art, className, caption }: { art: Art; className: string; caption?: boolean }) {
  return (
    <PatternBand
      pattern={art.pattern}
      palette={homePalette(art.palette, art.pattern, { transparent: true })}
      seed={art.seed}
      density={art.density}
      className={className}
    >
      {caption ? (
        <span className={styles.artCaption}>
          {art.pattern.slug} / {art.palette}
        </span>
      ) : null}
    </PatternBand>
  );
}

/** A band the window's full width, between two sections. */
function Band({ art }: { art: Art }) {
  return (
    <div className={styles.bleed} aria-hidden="true">
      <ArtPiece art={art} className={styles.docsBand} />
    </div>
  );
}

function Cards({ cards }: { cards: Card[] }) {
  return (
    <div className={`${styles.entries} ${styles.landingEntries}`}>
      {cards.map((card) => (
        <CardLink key={card.href} card={card} />
      ))}
    </div>
  );
}

function CardLink({ card }: { card: Card }) {
  const { icon: Mark } = card;
  return (
    <a href={card.href} className={`${styles.entry} ${styles.setupCard}`}>
      <span className={styles.setupIcon}>
        {typeof Mark === 'string' ? (
          <SetupIconMark icon={Mark} />
        ) : (
          <Mark size={22} strokeWidth={1.75} aria-hidden="true" />
        )}
      </span>
      <span className={styles.entryName}>{card.name}</span>
      <p>{card.children}</p>
      <span className={styles.setupMeta}>{card.meta}</span>
    </a>
  );
}

/** A part of the page: its heading and a few words beside what it offers. */
function Part({ id, title, intro, children }: { id: string; title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className={styles.landingSection}>
      <div className={styles.landingIntro}>
        <h2 className={styles.subhead}>{title}</h2>
        {intro}
      </div>
      <div className={styles.landingBody}>{children}</div>
    </section>
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
      layout="wide"
      banner={
        <div className={styles.bleed} aria-hidden="true">
          <ArtPiece art={BANNER} className={styles.docsBannerArt} caption />
        </div>
      }
    >
      <Part
        id="setup"
        title="Choose your setup"
        intro={
          <p>
            Each one is a whole way in, with the same designs and the same
            settings. You need only the one that fits your project.
          </p>
        }
      >
        <Cards cards={SETUPS} />
      </Part>

      <Band art={BANDS.setup} />

      <Part
        id="assistants"
        title="AI assistants"
        intro={
          <p>
            A design&apos;s name says nothing about how it looks, so an
            assistant does best when it can look at the designs before it
            chooses one.
          </p>
        }
      >
        <Cards cards={ASSISTANTS} />
      </Part>

      <Band art={BANDS.assistants} />

      <Part
        id="cli"
        title="Command line"
        intro={
          <p>
            The package has a <Code>tabbied</Code> command that searches the
            designs and renders them to SVG, PNG or a numbered sequence of
            frames for video, with no app. Rendering needs Playwright; the{' '}
            <a href={README_URL} target="_blank" rel="noreferrer">
              package README
            </a>{' '}
            has the setup and every flag.
          </p>
        }
      >
        <CodeBlock code={cliCode} title="terminal" lang="sh" className={styles.landingCode} />
      </Part>

      <Band art={CLI_BAND} />

      <Part
        id="shared"
        title="In every setup"
        intro={<p>These work the same way whichever setup you pick.</p>}
      >
        <div className={`${styles.entries} ${styles.landingEntries} ${styles.sharedEntries}`}>
          <CardLink card={CONCEPTS} />
          <ul className={styles.sharedList}>
            {SHARED.map((item) => (
              <li key={item.id}>
                <a href={`/docs/concepts/#${item.id}`} className={styles.sharedLink}>
                  <span className={styles.sharedName}>{item.name}</span>
                  <span className={styles.sharedSays}>{item.says}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Part>

      <div className={styles.bleed} aria-hidden="true">
        <div className={styles.docsMosaic}>
          {MOSAIC.map((art) => (
            <ArtPiece key={art.seed} art={art} className={styles.docsTile} caption />
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
