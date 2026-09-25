import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';

// Every template's name, kind and colors, for pages that list a person's
// templates by slug. Server-only: the two collections carry their pattern
// definitions, so pages pass what they need of this down as plain data.

export type TemplateIndexEntry = {
  slug: string;
  name: string;
  topic: string;
  /** Background first. */
  colors: string[];
};

export const TEMPLATE_INDEX: TemplateIndexEntry[] = [
  ...TEMPLATE_SITES.map((site) => ({ slug: site.slug, name: site.brand, topic: site.topic, colors: site.colors })),
  ...NEW_TEMPLATE_SITES.map((site) => ({ slug: site.slug, name: site.name, topic: site.topic, colors: site.palette })),
];

/** slug to name, for a choose dialog's list of chosen templates. */
export const TEMPLATE_NAMES: Record<string, string> = Object.fromEntries(
  TEMPLATE_INDEX.map((entry) => [entry.slug, entry.name])
);
