import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TEMPLATE_SITES } from 'components/template/templateData';
import { NEW_TEMPLATE_SITES } from 'lib/templateSites';
import TemplatePreview from 'components/template/TemplatePreview';
import { pageMetadata, previewImage } from 'lib/seo';

// A template, framed: the live page in a browser chrome under a bar with the
// two things a person does with a template - customize it, or download it as
// it is. The page itself stays at /template/<slug>/, unframed, which is what
// the packager derives the download from; this route adds chrome *around*
// it, so nothing here can end up inside a download.

type Entry = { slug: string; name: string; topic: string; pattern: string };

const ENTRIES: Entry[] = [
  ...TEMPLATE_SITES.map((site) => ({ slug: site.slug, name: site.brand, topic: site.topic, pattern: site.pattern })),
  ...NEW_TEMPLATE_SITES.map((site) => ({
    slug: site.slug,
    name: site.name,
    topic: site.topic,
    pattern: site.patternSlug,
  })),
];

export const dynamicParams = false;

export function generateStaticParams() {
  return ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = ENTRIES.find((candidate) => candidate.slug === slug);

  if (!entry) return { title: 'Template preview - Tabbied' };

  return {
    ...pageMetadata({
      title: `${entry.name} - Template preview - Tabbied`,
      description: `${entry.name}, a ${entry.topic.toLowerCase()} website template built on a Tabbied pattern. Customize its colors and patterns, or download it as it is.`,
      path: `/templates/${entry.slug}/`,
      image: previewImage(entry.pattern, entry.name),
    }),
    // The name the gallery shows, for scripts/generate-editable.mjs: the
    // template's own <title> is a whole line ("Hopscotch - The Children's
    // Discovery Museum"), and this is what the account's downloads list, the
    // customizer and the MCP catalog should call it.
    other: { 'tabbied:template-name': entry.name },
  };
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = ENTRIES.find((candidate) => candidate.slug === slug);

  if (!entry) notFound();

  return <TemplatePreview slug={entry.slug} name={entry.name} topic={entry.topic} />;
}
