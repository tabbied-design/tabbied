import type { Metadata } from 'next';
import type { PatternDefinition } from 'tabbied';
import {
  lobe, windowpane, prisma, foliage, veil, blossom, spark, frond, chamfer,
  fluting, merlon, diadem, vitrail, ivy, bokeh, lunette,
} from 'tabbied/patterns';
import SiteNav from 'components/nav';
import HomeFooter from 'components/main-page/HomeFooter';
import TemplatesGrid, { type TemplateCard } from 'components/template/TemplatesGrid';
import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';
import { categoryOf } from 'lib/templateCategories';
import { templateShot } from 'lib/templateShots';
import { plexMono, plexSans } from 'lib/fonts';
import { pageMetadata } from 'lib/seo';
import home from 'components/main-page/home.module.css';
import s from './templates.module.css';

// Derived, never written out: adding a site can't leave a stale number behind.
const TOTAL = TEMPLATE_SITES.length + NEW_TEMPLATE_SITES.length;

export const metadata: Metadata = pageMetadata({
  title: 'Website templates - Tabbied',
  description: `${TOTAL} free website templates, each built around a Tabbied generative pattern. Preview them, customize their colors and patterns, or download them as HTML or React.`,
  path: '/templates/',
});

const ART: Record<string, PatternDefinition> = {
  lobe, windowpane, prisma, foliage, veil, blossom, spark, frond, chamfer,
  fluting, merlon, diadem, vitrail, ivy, bokeh, lunette,
  // The second collection's patterns, keyed by preset slug.
  ...Object.fromEntries(NEW_TEMPLATE_SITES.map((x) => [x.patternSlug, x.pattern])),
};

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
    shot: templateShot(c.slug),
    art: ART[c.pattern],
    // Throws for a site the category table has not met, which fails the
    // export rather than shipping a card no filter reaches.
    category: categoryOf(c.slug),
  }));

  return (
    // The homepage's dark tokens, so the masthead, the footer and the cards
    // read from the same set.
    <div className={`${home.home} ${plexMono.variable} ${plexSans.variable} ${s.page}`}>
      <SiteNav tone="dark" />

      <main>
        <header className={s.hero}>
          {/* The design's backdrop grid renders no cells, so the hero is the
              flat ground with only its vignette over it. */}
          <div className={s.heroScrim} />
          <div className={s.heroInner}>
            <p className={s.eyebrow}>Website templates</p>
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
