'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import Link from 'next/link';
import type { PatternDefinition } from 'tabbied';
import {
  TEMPLATE_CATEGORIES,
  categoryFromSlug,
  categorySlug,
  type TemplateCategory,
} from 'lib/templateCategories';
import { paginationWindow } from 'lib/pagination';
import Toaster from 'components/Toaster';
import { chosenOf, customizeHref, type MyTemplatesState } from 'lib/myTemplates';
import { useTemplateGate, type TemplateAction } from './ChooseTemplate';
import DownloadMenu, { type DownloadMenuClasses } from './DownloadMenu';
import LazyPattern from './LazyPattern';
import s from './TemplatesGrid.module.css';

// The template gallery's body: a row of category chips, a page of the cards
// they filter, and the pager. Client-side for the chips and pages, and for
// the one thing the server cannot know, which templates are the visitor's
// (lib/myTemplates.ts).

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

/** Cards per page: whole rows at three, two and one columns. */
const PER_PAGE = 24;

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
function Footer({ c, templates, guard, here }: { c: TemplateCard; templates: MyTemplatesState; guard: Guard; here: string }) {
  const chosen = chosenOf(templates, c.slug);

  if (templates.status !== 'ready') {
    // Signed out, or not known yet: the artboard's guest footer. While the
    // session resolves it is drawn the same, so the row never jumps. A
    // sign-in comes back to the category and page it left from.
    const next = encodeURIComponent(here);

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
 * A card. Each carries its accent as a custom property, which tints the
 * hover, so mousing across the grid previews each site's color.
 */
function Card({ c, templates, guard, here }: { c: TemplateCard; templates: MyTemplatesState; guard: Guard; here: string }) {
  const vars = { '--accent': c.colors[1] ?? c.colors[0] } as CSSProperties;
  const mine = chosenOf(templates, c.slug) !== null;

  return (
    // A <div>, not an <a>: the footer holds anchors of its own and an anchor
    // cannot nest inside another. The card link covers everything above it.
    <div className={s.card} style={vars}>
      <a className={s.cardLink} href={c.href}>
        <div className={s.thumb}>
          {c.shot ? (
            // The site itself, with its pattern as the accent in the corner;
            // a template with no shot is the pattern alone
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
      <Footer c={c} templates={templates} guard={guard} here={here} />
    </div>
  );
}

type Filter = TemplateCategory | 'All' | 'Yours';

/**
 * The gallery's address for a filter and a page: `?category=` and `?page=`,
 * each left out at its default, so All on page 1 is plain `/templates/`.
 */
function galleryHref(filter: Filter, page: number): string {
  const params = new URLSearchParams();
  if (filter !== 'All') params.set('category', filter === 'Yours' ? 'yours' : categorySlug(filter));
  if (page > 1) params.set('page', String(page));
  const query = params.toString();

  return query ? `/templates/?${query}` : '/templates/';
}

/** The filter and page a query string names; anything unknown is the default. */
function readLocation(search: string): { filter: Filter; page: number } {
  const params = new URLSearchParams(search);
  const category = params.get('category') ?? '';
  const filter: Filter = category === 'yours' ? 'Yours' : (categoryFromSlug(category) ?? 'All');
  const page = parseInt(params.get('page') ?? '', 10);

  return { filter, page: Number.isFinite(page) && page >= 1 ? page : 1 };
}

/** A plain left click, which the page handles; anything else is the browser's. */
const plainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export default function TemplatesGrid({ cards }: { cards: TemplateCard[] }) {
  // The filter and page live in the URL, so a view can be shared, reloaded
  // and walked with back and forward. They are read after mount rather than
  // with useSearchParams, which would drop the prerendered grid and render
  // the page on the client alone; the first paint is All, page 1, and a
  // deep link moves to its view once the script runs.
  const [filter, setFilter] = useState<Filter>('All');
  const [page, setPage] = useState(1);
  const names = useMemo(() => Object.fromEntries(cards.map((c) => [c.slug, c.name])), [cards]);
  const { guard, dialog, templates } = useTemplateGate(names);

  useEffect(() => {
    const read = () => {
      const next = readLocation(window.location.search);
      setFilter(next.filter);
      setPage(next.page);
    };

    read();
    window.addEventListener('popstate', read);

    return () => window.removeEventListener('popstate', read);
  }, []);

  const go = (nextFilter: Filter, nextPage: number) => {
    setFilter(nextFilter);
    setPage(nextPage);
    window.history.pushState(null, '', galleryHref(nextFilter, nextPage));
  };

  // Only the categories that have a site, in the vocabulary's order.
  const categories = TEMPLATE_CATEGORIES.filter((category) =>
    cards.some((c) => c.category === category)
  );
  const yours = templates.status === 'ready' ? templates.chosen.length : 0;
  // "Yours" means nothing until the account has answered, and nothing at all
  // to a visitor who is signed out: both see All.
  const active: Filter = filter === 'Yours' && templates.status !== 'ready' ? 'All' : filter;
  const matching =
    active === 'All'
      ? cards
      : active === 'Yours'
        ? cards.filter((c) => chosenOf(templates, c.slug))
        : cards.filter((c) => c.category === active);
  const filters: Filter[] = templates.status === 'ready' ? ['All', 'Yours', ...categories] : ['All', ...categories];

  // A page past the end (a link from before a category shrank, or a typed
  // number) shows the last page rather than an empty grid.
  const pageCount = Math.max(1, Math.ceil(matching.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = matching.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const here = galleryHref(active, current);

  // A page is chosen at the foot of the grid, so the new one is brought into
  // view from its top, and focus goes with it for a keyboard.
  const topRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    topRef.current?.scrollIntoView({ block: 'start' });
    gridRef.current?.focus({ preventScroll: true });
  }, [current]);

  const goToPage = (nextPage: number) => {
    if (nextPage !== current) pendingScroll.current = true;
    go(active, nextPage);
  };

  return (
    <>
      <div className={s.filterWrap} ref={topRef}>
        <div className={s.filters} role="group" aria-label="Filter by kind of site">
          {filters.map((category) => (
            <button
              key={category}
              type="button"
              className={s.filter}
              aria-pressed={active === category}
              onClick={() => go(category, 1)}
            >
              {category === 'Yours' ? `Yours (${yours})` : category}
            </button>
          ))}
        </div>
        <div className={s.filterFade} aria-hidden="true" />
      </div>

      <div
        ref={gridRef}
        className={s.grid}
        tabIndex={-1}
        role="region"
        aria-label={pageCount > 1 ? `Templates, page ${current} of ${pageCount}` : 'Templates'}
      >
        {shown.map((c) => (
          <Card key={c.slug} c={c} templates={templates} guard={guard} here={here} />
        ))}
      </div>
      {active === 'Yours' && matching.length === 0 ? (
        <p className={s.none}>No templates chosen yet. Choose one from All.</p>
      ) : null}

      {/* Real links, so every page is an address a person can open in a tab
          and a crawler can follow; a plain click stays in the page. */}
      {pageCount > 1 ? (
        <nav className={s.pagination} aria-label="Pages">
          {paginationWindow(current, pageCount).map((p, index) =>
            p === null ? (
              <span key={`gap-${index}`} className={s.pageGap} aria-hidden="true">
                ...
              </span>
            ) : (
              <a
                key={p}
                href={galleryHref(active, p)}
                className={s.pageNumber}
                aria-label={`Page ${p}`}
                aria-current={p === current ? 'page' : undefined}
                onClick={(event) => {
                  if (!plainClick(event)) return;
                  event.preventDefault();
                  goToPage(p);
                }}
              >
                {p}
              </a>
            )
          )}
        </nav>
      ) : null}

      {dialog}
      <Toaster />
    </>
  );
}
