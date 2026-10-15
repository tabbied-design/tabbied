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
import { orderTemplates } from 'lib/templateOrder';
import { templateShot } from 'lib/templateShots';
import { plexMono, plexSans } from 'lib/fonts';
import { pageMetadata } from 'lib/seo';
import home from 'components/main-page/home.module.css';
import s from './templates.module.css';

// Derived, never written out: adding a site can't leave a stale number behind.
const TOTAL = TEMPLATE_SITES.length + NEW_TEMPLATE_SITES.length;

export const metadata: Metadata = pageMetadata({
  title: 'Free website templates for every trade - Tabbied',
  description: `${TOTAL} free website templates for florists, barbers, bakers, electricians and every trade in between. Customize their colors and patterns and download them as HTML or React, no account needed.`,
  path: '/templates/',
});

const ART: Record<string, PatternDefinition> = {
  lobe, windowpane, prisma, foliage, veil, blossom, spark, frond, chamfer,
  fluting, merlon, diadem, vitrail, ivy, bokeh, lunette,
  // The second collection's patterns, keyed by preset slug.
  ...Object.fromEntries(NEW_TEMPLATE_SITES.map((x) => [x.patternSlug, x.pattern])),
};

export default function TemplatesGallery() {
  // One list, in the gallery's committed order (lib/templateOrder.ts) rather
  // than the order the batches were made in, numbered straight through as
  // shown. After its hand-picked lead the order only grows at the end, so a
  // page keeps its cards.
  const sites = [
    ...TEMPLATE_SITES.map((x, i) => ({
      slug: x.slug,
      name: x.brand,
      topic: x.topic,
      pattern: x.pattern,
      colors: x.colors,
      seed: `RCT${i}`,
      family: 'first',
    })),
    ...NEW_TEMPLATE_SITES.map((x) => ({
      slug: x.slug,
      name: x.name,
      topic: x.topic,
      pattern: x.patternSlug,
      colors: x.palette,
      seed: x.seed,
      // The seed's prefix names the batch: dir, set, bold, img, min, art.
      family: x.seed.split('-')[0],
    })),
  ].map((c) => ({
    ...c,
    // Throws for a site the category table has not met, which fails the
    // export rather than shipping a card no filter reaches.
    category: categoryOf(c.slug),
  }));

  const cards: TemplateCard[] = orderTemplates(sites).map((c, i) => ({
    ...c,
    n: i + 1,
    shot: templateShot(c.slug),
    art: ART[c.pattern],
  }));

  return (
    // The homepage's dark tokens, so the masthead, the footer and the cards
    // read from the same set.
    <div className={`${home.home} ${plexMono.variable} ${plexSans.variable} ${s.page}`}>
      <SiteNav tone="dark" />

      <main>
        <TemplatesGrid
          cards={cards}
          title="A website for every trade, free"
          lede="Starting out as a florist, barber, baker, electrician, dog groomer or landscaper? Find a template made for your line of work, match it to your colors, and download it."
        />
      </main>

      <HomeFooter />
    </div>
  );
}
