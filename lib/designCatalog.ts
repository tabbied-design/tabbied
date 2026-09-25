// The design library as the customizer offers it: each catalog design's slug,
// name and density. Server-only, like lib/siteCounts.ts: the full catalog is
// 384 KB, so the page's server component passes this reduced list down.
import catalog from 'tabbied/catalog.json';

type DesignDensity = 'sparse' | 'medium' | 'dense';

/** One design a pattern field may be swapped to. */
export type DesignChoice = {
  slug: string;
  name: string;
  density: DesignDensity;
};

type CatalogDesign = { slug: string; name: string; density: string };

export const DESIGN_CHOICES: DesignChoice[] = (catalog.designs as CatalogDesign[]).map(
  (design) => ({
    slug: design.slug,
    name: design.name,
    density: design.density as DesignDensity,
  })
);
