// The homepage's templates, resolved: homeData.ts names each one by slug, and
// this reads the rest off the registries, the category table and the
// committed screenshots, so a card's picture, name, kind and link all come
// from the template it opens. A slug no template has, or a template with no
// screenshot, fails the export rather than shipping a card that leads
// somewhere else, which is what the designs' mockups did.
//
// Server-only: the registries carry their pattern definitions, and the file
// system is read for the pattern strips. Pages pass the result down as plain
// data.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { TEMPLATE_INDEX } from 'lib/templateIndex';
import { templateShot } from 'lib/templateShots';
import { PALETTE_LIBRARY } from 'lib/paletteLibrary';
import { DESIGN_CHOICES } from 'lib/designCatalog';
import { withArticle } from 'lib/article';
import { MAKE_IT_YOURS, SLIDES } from './homeData';
// What scripts/capture-home-showcase.mjs read off each page: the h1's face.
import captured from './homeShowcase.json';

/** A template as the homepage shows it. */
export type ShowcaseTemplate = {
  slug: string;
  name: string;
  /** "a hair salon", for the sentences and labels that name it. */
  kind: string;
  /** The site's own colors, ground first. */
  colors: string[];
  /** Its screenshot, 960x720 (public/template-shots). */
  shot: string;
  /** The customizer, opened on a draft of it. */
  href: string;
  /** A strip of the pattern it wears: captured from the page, else the design's preview. */
  strip: string;
  /** The face its headline is set in, when it was captured. */
  display: string | null;
};

const BY_SLUG = new Map(TEMPLATE_INDEX.map((entry) => [entry.slug, entry]));
const STRIPS_DIR = path.join(process.cwd(), 'public', 'images', 'home', 'strips');
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

  const strip = existsSync(path.join(STRIPS_DIR, `${slug}.webp`))
    ? `/images/home/strips/${slug}.webp`
    : `/previews/${entry.pattern}.webp`;

  return {
    slug,
    name: entry.name,
    kind: withArticle(entry.topic.toLowerCase()),
    colors: entry.colors,
    shot,
    href: `/studio/customize/?slug=${slug}`,
    strip,
    display: DISPLAY[slug]?.display ?? null,
  };
}

export type SlideView = ShowcaseTemplate & { photo: string; trade: string; description: string };

export const homeSlides = (): SlideView[] =>
  SLIDES.map((slide) => ({
    ...showcaseTemplate(slide.slug),
    photo: slide.photo,
    trade: slide.trade,
    description: slide.description,
  }));

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
