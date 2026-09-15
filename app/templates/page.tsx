import type { Metadata } from 'next';
import { TabbiedPattern } from 'tabbied/react';
import type { PatternDefinition } from 'tabbied';
import {
  lobe, windowpane, prisma, foliage, veil, blossom, spark, frond, chamfer,
  fluting, merlon, diadem, vitrail, ivy, bokeh, lunette, neon, bauhaus, tetro,
} from 'tabbied/patterns';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
import TemplatesGrid, { type TemplateCard } from 'components/template/TemplatesGrid';
import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';
import { categoryOf } from 'lib/templateCategories';
import { plexMono } from 'lib/fonts';
import home from 'components/main-page/home.module.css';
import s from './templates.module.css';

// Derived, never written out: adding a site can't leave a stale number behind.
const TOTAL = TEMPLATE_SITES.length + NEW_TEMPLATE_SITES.length;

export const metadata: Metadata = {
  title: `Made with Tabbied, ${TOTAL} Template Websites`,
  description: `${TOTAL} sample websites using Tabbied generative patterns as design accents, each built with the TabbiedPattern React component.`,
};

const ART: Record<string, PatternDefinition> = {
  lobe, windowpane, prisma, foliage, veil, blossom, spark, frond, chamfer,
  fluting, merlon, diadem, vitrail, ivy, bokeh, lunette,
  // The second collection's patterns, keyed by preset slug.
  ...Object.fromEntries(NEW_TEMPLATE_SITES.map((x) => [x.patternSlug, x.pattern])),
};

// The hero backdrop is a contact sheet rather than one enlarged pattern: four
// different patterns on four different palettes, which states the premise of the
// page before a word is read.
const HERO_TILES: { art: PatternDefinition; palette: string[]; seed: string }[] = [
  { art: neon, palette: ['#0d0d12', '#3fffb2', '#3eecff', '#ff3d8b'], seed: 'H1' },
  { art: bauhaus, palette: ['#0d0d12', '#ff3d8b', '#ffd23e', '#3eecff'], seed: 'H2' },
  { art: tetro, palette: ['#0d0d12', '#7048e8', '#3eecff', '#3fffb2'], seed: 'H3' },
  { art: prisma, palette: ['#0d0d12', '#ffd23e', '#3fffb2', '#7048e8'], seed: 'H4' },
];

export default function TemplatesGallery() {
  // One list, numbered straight through: the gallery shows a single grid
  // rather than splitting the collections into separate batches.
  const cards: TemplateCard[] = [
    ...TEMPLATE_SITES.map((x, i) => ({
      slug: x.slug,
      href: `/templates/${x.slug}/`,
      name: x.brand,
      topic: x.topic,
      pattern: x.pattern,
      paletteName: x.paletteName,
      colors: x.colors,
      seed: `RCT${i}`,
    })),
    ...NEW_TEMPLATE_SITES.map((x) => ({
      slug: x.slug,
      href: `/templates/${x.slug}/`,
      name: x.name,
      topic: x.topic,
      pattern: x.patternSlug,
      paletteName: x.paletteName,
      colors: x.palette,
      seed: x.seed,
    })),
  ].map((c, i) => ({
    ...c,
    n: i + 1,
    art: ART[c.pattern],
    // Throws for a site the category table has not met, which fails the
    // export rather than shipping a card no filter reaches.
    category: categoryOf(c.slug),
  }));

  return (
    // The homepage's dark tokens, so the masthead, the footer and the cards
    // read from the same set.
    <div className={`${home.home} ${plexMono.variable} ${s.page}`}>
      <SiteNav tone="dark" />

      <main>
        <header className={s.hero}>
          <div className={s.heroArt} aria-hidden="true">
            {HERO_TILES.map((t) => (
              <div key={t.seed}>
                <TabbiedPattern
                  pattern={t.art}
                  palette={t.palette}
                  seed={t.seed}
                  fit="cover"
                  density={1}
                />
              </div>
            ))}
          </div>
          <div className={s.heroScrim} />
          <div className={s.heroInner}>
            <div className={s.pre}>Made with Tabbied</div>
            <h1>
              {TOTAL} sites,<br />
              <span>one pattern engine</span>
            </h1>
            <p>
              Every site below uses a <strong>Tabbied</strong> generative pattern as its
              main design accent, themed end to end with a single palette.
              Same component, {TOTAL} completely different moods.
            </p>
          </div>
        </header>

        <div className={s.wrap}>
          <TemplatesGrid cards={cards} />
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
