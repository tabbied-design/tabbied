'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import type { PatternDefinition } from 'tabbied';
import {
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from 'lib/templateCategories';
import Toaster from 'components/Toaster';
import { chosenOf, customizeHref, type MyTemplatesState } from 'lib/myTemplates';
import { useTemplateGate, type TemplateAction } from './ChooseTemplate';
import DownloadMenu, { type DownloadMenuClasses } from './DownloadMenu';
import LazyPattern from './LazyPattern';
import s from './TemplatesGrid.module.css';

// The template gallery's body: a row of category chips and the cards they
// filter. Client-side for the chips and for the one thing the server cannot
// know, which templates are the visitor's: a card's footer is "Sign in to
// use" for a visitor, "Choose template" for a template a person may still
// choose, "Customize" and "Download" once it is theirs, and "Request more"
// when every one they may choose is chosen (lib/myTemplates.ts).

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
  /** A screenshot of the site's first screen, where one has been taken. */
  shot?: string;
};

/** The most swatches a card shows; the inks, never the ground. */
const MAX_SWATCHES = 4;

type Guard = (slug: string, name: string, action: TemplateAction, run: () => void) => void;

/** The Download menu in this module's shape; the menu itself is DownloadMenu's. */
const MENU: DownloadMenuClasses = {
  trigger: s.pill,
  caret: s.caret,
  positioner: s.positioner,
  menu: s.menu,
  menuLabel: s.menuLabel,
  menuItem: s.menuItem,
  menuRule: s.menuRule,
};

/**
 * The card's footer, in the four states the account puts it in. The zips
 * are links to the Worker's gated route, which makes the template the
 * person's on its first download; the dialog before that is the page's
 * courtesy, not the rule.
 */
function Footer({ c, templates, guard }: { c: TemplateCard; templates: MyTemplatesState; guard: Guard }) {
  const chosen = chosenOf(templates, c.slug);

  if (templates.status !== 'ready') {
    // Signed out, or not known yet: the artboard's guest footer. While the
    // session resolves it is drawn the same, so the row never jumps.
    const next = encodeURIComponent('/templates/');

    return (
      <div className={s.dl}>
        <span className={s.formats}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
          HTML &#xB7; React
        </span>
        {templates.status === 'signed-out' ? (
          <Link href={`/sign-in?next=${next}`} prefetch={false} className={s.pill}>
            Sign in to use
          </Link>
        ) : (
          <span className={`${s.pill} ${s.pillGhost}`} aria-hidden="true">
            Sign in to use
          </span>
        )}
      </div>
    );
  }

  if (chosen) {
    return (
      <div className={s.dl}>
        <Link href={customizeHref(c.slug, chosen)} prefetch={false} className={s.textLink}>
          Customize &#x2192;
        </Link>
        <DownloadMenu name={c.name} chosen={chosen} side="top" classes={MENU} />
      </div>
    );
  }

  if (templates.left > 0) {
    return (
      <div className={s.dl}>
        <a href={c.href} className={s.quietLink}>
          Preview &#x2192;
        </a>
        <button type="button" className={`${s.pill} ${s.pillSolid}`} onClick={() => guard(c.slug, c.name, 'choose', () => {})}>
          Choose template
        </button>
      </div>
    );
  }

  return (
    <div className={s.dl}>
      <span className={s.quiet}>All {templates.total} chosen</span>
      {/* The account page says where a request stands, so the card always
          leads there, open request or not. */}
      <Link href="/account/?request=1" prefetch={false} className={s.pill}>
        Request more
      </Link>
    </div>
  );
}

/**
 * A card: the pattern takes the whole top, numbered; the name, the kind of
 * business and its inks sit under it with the palette and pattern named at
 * the right; the footer closes it. Each card carries its accent as a custom
 * property, which tints the hover, so mousing across the grid previews each
 * site's color before you open it.
 */
function Card({ c, templates, guard }: { c: TemplateCard; templates: MyTemplatesState; guard: Guard }) {
  const vars = { '--accent': c.colors[1] ?? c.colors[0] } as CSSProperties;
  const mine = chosenOf(templates, c.slug) !== null;

  return (
    // A <div>, not an <a>: the footer holds anchors of its own and an anchor
    // cannot nest inside another. The card link covers everything above it.
    <div className={s.card} style={vars}>
      <a className={s.cardLink} href={c.href}>
        <div className={s.thumb}>
          {c.shot ? (
            // A pilot: the site itself, with its pattern as the accent in the
            // corner. A template with no shot is the pattern alone, as before
            // (scripts/generate-template-shots.mjs).
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- a committed file under public/ */}
              <img className={s.shot} src={c.shot} alt="" loading="lazy" decoding="async" />
              <span className={s.accent} aria-hidden="true">
                <LazyPattern pattern={c.art} palette={c.colors} seed={c.seed} />
              </span>
            </>
          ) : (
            <LazyPattern pattern={c.art} palette={c.colors} seed={c.seed} />
          )}
          <span className={s.num}>
            <span className={s.numN}>{String(c.n).padStart(2, '0')}</span>
            {mine ? (
              <span className={s.yours}>
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5L20 7" />
                </svg>
                Yours
              </span>
            ) : null}
          </span>
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
      <Footer c={c} templates={templates} guard={guard} />
    </div>
  );
}

type Filter = TemplateCategory | 'All' | 'Yours';

export default function TemplatesGrid({ cards }: { cards: TemplateCard[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const names = useMemo(() => Object.fromEntries(cards.map((c) => [c.slug, c.name])), [cards]);
  const { guard, dialog, templates } = useTemplateGate(names);

  // Only the categories that have a site, in the vocabulary's order.
  const categories = TEMPLATE_CATEGORIES.filter((category) =>
    cards.some((c) => c.category === category)
  );
  const yours = templates.status === 'ready' ? templates.chosen.length : 0;
  const shown =
    filter === 'All'
      ? cards
      : filter === 'Yours'
        ? cards.filter((c) => chosenOf(templates, c.slug))
        : cards.filter((c) => c.category === filter);
  const filters: Filter[] = templates.status === 'ready' ? ['All', 'Yours', ...categories] : ['All', ...categories];

  return (
    <>
      <div className={s.filterWrap}>
        <div className={s.filters} role="group" aria-label="Filter by kind of site">
          {filters.map((category) => (
            <button
              key={category}
              type="button"
              className={s.filter}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === 'Yours' ? `Yours (${yours})` : category}
            </button>
          ))}
        </div>
        <div className={s.filterFade} aria-hidden="true" />
      </div>

      <div className={s.grid}>
        {shown.map((c) => (
          <Card key={c.slug} c={c} templates={templates} guard={guard} />
        ))}
      </div>
      {filter === 'Yours' && shown.length === 0 ? (
        <p className={s.none}>No templates chosen yet. Choose one from All.</p>
      ) : null}

      {dialog}
      <Toaster />
    </>
  );
}
