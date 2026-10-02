import { patterns } from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';

// The catalog by slug, for designs named in generated/data.json.
export const designs = patterns as unknown as Record<string, PatternDefinition>;
