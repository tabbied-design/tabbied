'use client';

import { useState, type CSSProperties } from 'react';
import type { PatternDefinition } from 'tabbied';
import {
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from 'lib/templateCategories';
import LazyPattern from './LazyPattern';
import s from './TemplatesGrid.module.css';

// The template gallery's body: a row of category chips and the cards they
// filter. Client-side for the one piece of state the chips hold; everything
// on a card was decided on the server and arrives as plain data.

export type TemplateCard = {
  slug: string;
  href: string;
  n: number;
  name: string;
  topic: string;
  pattern: string;
  art: PatternDefinition;
  paletteName: string;
  colors: string[];
  seed: string;
  category: TemplateCategory;
};

/** The most swatches a card shows; the inks, never the ground. */
const MAX_SWATCHES = 4;

/**
 * A card: the pattern takes the whole top, numbered; the name, the kind of
 * business and its inks sit under it with the palette and pattern named at
 * the right; the download row closes it. Each card carries its accent as a
 * custom property, which tints the hover, so mousing across the grid previews
 * each site's colour before you open it.
 */
function Card({ c }: { c: TemplateCard }) {
  const vars = { '--accent': c.colors[1] ?? c.colors[0] } as CSSProperties;

  return (
    // A <div>, not an <a>: the download row holds anchors of its own and an
    // anchor cannot nest inside another. The card link covers everything
    // above that row.
    <div className={s.card} style={vars}>
      <a className={s.cardLink} href={c.href}>
        <div className={s.thumb}>
          <LazyPattern pattern={c.art} palette={c.colors} seed={c.seed} />
          <span className={s.num}>{String(c.n).padStart(2, '0')}</span>
        </div>
        <div className={s.body}>
          <div className={s.main}>
            <h3>{c.name}</h3>
            <p>{c.topic}</p>
            <div className={s.sw} aria-hidden="true">
              {c.colors.slice(1, 1 + MAX_SWATCHES).map((col, i) => (
                <span key={i} style={{ background: col }} />
              ))}
            </div>
          </div>
          <div className={s.meta}>
            <span>{c.paletteName}</span>
            <span>{c.pattern}</span>
          </div>
        </div>
      </a>
      {/* Both formats are built by `npm run templates` into out/downloads/,
          so these are plain static files served next to the site. `download`
          saves the zip rather than navigating to it. The label sits hard left
          and the two pills hard right, which is the artboard's footer: taking
          a template from a card is downloading it, and the two formats are
          the whole of the choice. */}
      <div className={s.dl}>
        <span className={s.dlLabel}>Download</span>
        <div className={s.dlPills}>
          <a className={s.pill} href={`/downloads/${c.slug}-html.zip`} download>
            HTML
          </a>
          <a className={s.pill} href={`/downloads/${c.slug}-react.zip`} download>
            React
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesGrid({ cards }: { cards: TemplateCard[] }) {
  const [filter, setFilter] = useState<TemplateCategory | 'All'>('All');

  // Only the categories that have a site, in the vocabulary's order.
  const categories = TEMPLATE_CATEGORIES.filter((category) =>
    cards.some((c) => c.category === category)
  );
  const shown = filter === 'All' ? cards : cards.filter((c) => c.category === filter);

  return (
    <>
      <div className={s.filterWrap}>
        <div className={s.filters} role="group" aria-label="Filter by kind of site">
          {(['All', ...categories] as const).map((category) => (
            <button
              key={category}
              type="button"
              className={s.filter}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={s.filterFade} aria-hidden="true" />
      </div>

      <div className={s.grid}>
        {shown.map((c) => (
          <Card key={c.slug} c={c} />
        ))}
      </div>
    </>
  );
}
