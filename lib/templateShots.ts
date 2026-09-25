// Screenshots of the template sites (scripts/generate-template-shots.mjs),
// read off public/template-shots at build time, so a shot added there reaches
// the gallery's cards and the homepage's rails with nothing else to change.
//
// Server-only: it reads the file system during the export.
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SHOTS_DIR = path.join(process.cwd(), 'public', 'template-shots');

const SHOTS = new Set(
  existsSync(SHOTS_DIR)
    ? readdirSync(SHOTS_DIR)
        .filter((file) => file.endsWith('.webp'))
        .map((file) => file.slice(0, -'.webp'.length))
    : []
);

/** A template's screenshot URL, or undefined for a template not shot yet. */
export const templateShot = (slug: string): string | undefined =>
  SHOTS.has(slug) ? `/template-shots/${slug}.webp` : undefined;
