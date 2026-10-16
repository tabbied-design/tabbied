// The homepage's templates, resolved: homeData.ts names each one by slug, and
// this reads the rest off the registries, the category table and the
// committed screenshots, so a card's picture, name, kind and link all come
// from the template it opens. A slug no template has, or a template with no
// screenshot, fails the export rather than shipping a card that leads
// somewhere else, which is what the 14 October design's mockups did.
//
// Server-only: the registries carry their pattern definitions, and the file
// system is read for the tab strips. Pages pass the result down as plain data.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { TEMPLATE_INDEX } from 'lib/templateIndex';
import {
  categoryOf,
  categorySlug,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from 'lib/templateCategories';
import { templateShot } from 'lib/templateShots';
import { PALETTE_LIBRARY } from 'lib/paletteLibrary';
import { DESIGN_CHOICES } from 'lib/designCatalog';
import { withArticle } from 'lib/article';
import { HERO_TRADES, MAKE_IT_YOURS, SLIDES } from './homeData';
// What scripts/capture-home-tabs.mjs read off each page: the h1's face.
import captured from './homeShowcase.json';

/** A template as the homepage shows it. */
export type ShowcaseTemplate = {
  slug: string;
  name: string;
  /** "a hair salon", for the sentences and labels that name it. */
  kind: string;
  category: TemplateCategory;
  /** The site's own colors, ground first. */
  colors: string[];
  /** Its screenshot, 960x720 (public/template-shots). */
  shot: string;
  /** Its framed preview, the page with "Use this template" on it. */
  href: string;
  /** A strip of the pattern it wears: captured from the page, else the design's preview. */
  tab: string;
  /** The face its headline is set in, when it was captured. */
  display: string | null;
};

const BY_SLUG = new Map(TEMPLATE_INDEX.map((entry) => [entry.slug, entry]));
const TABS_DIR = path.join(process.cwd(), 'public', 'images', 'home', 'tabs');
const DISPLAY = captured as Record<string, { display?: string | null }>;

function showcaseTemplate(slug: string): ShowcaseTemplate {
  const entry = BY_SLUG.get(slug);

  if (!entry) {
    throw new Error(`homeShowcase: components/main-page/homeData.ts names "${slug}", which no template has`);
  }

  const shot = templateShot(slug);

  if (!shot) {
    throw new Error(
      `homeShowcase: "${slug}" has no screenshot - run scripts/generate-template-shots.mjs ${slug} before the homepage shows it`
    );
  }

  const tab = existsSync(path.join(TABS_DIR, `${slug}.webp`))
    ? `/images/home/tabs/${slug}.webp`
    : `/previews/${entry.pattern}.webp`;

  return {
    slug,
    name: entry.name,
    kind: withArticle(entry.topic.toLowerCase()),
    category: categoryOf(slug),
    colors: entry.colors,
    shot,
    href: `/templates/${slug}/`,
    tab,
    display: DISPLAY[slug]?.display ?? null,
  };
}

export type HeroTradeView = ShowcaseTemplate & { label: string; tabHeight: number };

export const heroTrades = (): HeroTradeView[] =>
  HERO_TRADES.map((trade) => ({ ...showcaseTemplate(trade.slug), label: trade.label, tabHeight: trade.tabHeight }));

export type SlideView = ShowcaseTemplate & { photo: string; description: string };

export const homeSlides = (): SlideView[] =>
  SLIDES.map((slide) => ({ ...showcaseTemplate(slide.slug), photo: slide.photo, description: slide.description }));

/** A filter chip over the carousel: a gallery category, its address there, and how many templates it holds. */
export type SlideCategory = { name: TemplateCategory; slug: string; count: number };

/** The gallery's categories the slides fall in, in the gallery's own order. */
export function slideCategories(slides: readonly SlideView[]): SlideCategory[] {
  const shown = new Set(slides.map((slide) => slide.category));

  return TEMPLATE_CATEGORIES.filter((name) => shown.has(name)).map((name) => ({
    name,
    slug: categorySlug(name),
    count: TEMPLATE_INDEX.filter((entry) => categoryOf(entry.slug) === name).length,
  }));
}

export type DemoPalette = { id: string; name: string; colors: string[] };
export type DemoDesign = { slug: string; name: string; preview: string };

export type MakeItYoursView = {
  template: ShowcaseTemplate;
  palettes: DemoPalette[];
  designs: DemoDesign[];
};

export function makeItYours(): MakeItYoursView {
  const palettes = MAKE_IT_YOURS.palettes.map((id) => {
    const palette = PALETTE_LIBRARY.find((candidate) => candidate.id === id);
    if (!palette) throw new Error(`homeShowcase: MAKE_IT_YOURS names palette "${id}", which the library does not have`);
    return { id: palette.id, name: palette.name, colors: [...palette.colors] };
  });

  const designs = MAKE_IT_YOURS.designs.map((slug) => {
    const design = DESIGN_CHOICES.find((candidate) => candidate.slug === slug);
    if (!design) throw new Error(`homeShowcase: MAKE_IT_YOURS names design "${slug}", which the catalog does not have`);
    return { slug: design.slug, name: design.name, preview: `/previews/${design.slug}.webp` };
  });

  return { template: showcaseTemplate(MAKE_IT_YOURS.slug), palettes, designs };
}
