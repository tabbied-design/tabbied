'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Search, X } from 'lucide-react';
import type { PatternDefinition } from 'tabbied';
import {
  TEMPLATE_CATEGORIES,
  categoryFromSlug,
  categorySlug,
  type TemplateCategory,
} from 'lib/templateCategories';
import {
  paginationWindow,
  PAGER_SLOTS,
  PAGER_SLOTS_NARROW,
  PAGER_WIDE_QUERY,
} from 'lib/pagination';
import useMediaQuery from 'lib/useMediaQuery';
import { indexTemplate, matchesTemplate, searchTemplates, suggestQueries, type TemplateIndex } from 'lib/catalogSearch';
import { customizeHref, savedOf, savedSlugs, useSavedTemplates } from 'lib/savedTemplates';
import LazyPattern from './LazyPattern';
import s from './TemplatesGrid.module.css';

// The template gallery: the hero with its search box, a row of category
// chips, a page of the cards they filter, and the pager. The search reads the
// fields the MCP server's list_templates does, matched by word and stem
// (lib/catalogSearch.ts), so the trade a person types ("plumber", "dog
// groomer") finds the template that names its work ("Plumbing and heating
// contractor"), and one that finds nothing offers the nearest that does.
// Client-side for the search, the chips and the pages, and for the one thing
// the server cannot know, which templates the visitor has saved
// (lib/savedTemplates.ts).
//
// Nothing here asks for an account: every template is free to customize and
// download, so a card is one link, straight into the customizer (the 14
// October designs). A template the person saved a customization of opens on
// their newest saved site instead, and says "Saved".

export type TemplateCard = {
  slug: string;
  n: number;
  name: string;
  topic: string;
  art: PatternDefinition;
  colors: string[];
  seed: string;
  category: TemplateCategory;
  /** A screenshot of the site's first screen, where one has been taken. */
  shot?: string;
};

/** The most swatches a card shows; the inks, never the ground. */
const MAX_SWATCHES = 4;

/** Cards per page: a multiple of 3, 2 and 1, the grid's columns, so no row is short. */
const PER_PAGE = 48;

/**
 * What an empty search offers when no word is near the one typed: trades the
 * site's own copy names, each shown only where it finds something.
 */
const COMMON_SEARCHES = ['plumber', 'electrician', 'florist', 'bakery', 'hair salon', 'landscaper'];

/**
 * A card. Each carries its accent as a custom property, which tints the
 * hover, so mousing across the grid previews each site's color.
 */
function Card({ c, savedId }: { c: TemplateCard; savedId: string | null }) {
  const vars = { '--accent': c.colors[1] ?? c.colors[0] } as CSSProperties;
  const href = customizeHref(c.slug, savedId ? { id: savedId } : null);

  return (
    <a className={s.card} style={vars} href={href} aria-label={`Customize ${c.name}, ${c.topic.toLowerCase()}`}>
      {/* A browser's title bar over the site's first screen. */}
      <span className={s.chrome} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <div className={s.thumb}>
        {c.shot ? (
          // The site itself, with its pattern as the accent in the corner;
          // a template with no shot is the pattern alone
          // (scripts/generate-template-shots.mjs).
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- a committed file under public/ */}
            <img
              className={s.shot}
              src={c.shot}
              alt={`Screenshot of the ${c.name} website template`}
              loading="lazy"
              decoding="async"
            />
            <span className={s.accent} aria-hidden="true">
              <LazyPattern pattern={c.art} palette={c.colors} seed={c.seed} />
            </span>
          </>
        ) : (
          <LazyPattern pattern={c.art} palette={c.colors} seed={c.seed} />
        )}
        <span className={s.num}>
          <span className={s.numN}>{String(c.n).padStart(2, '0')}</span>
          {savedId ? (
            <span className={s.saved}>
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5L20 7" />
              </svg>
              Saved
            </span>
          ) : null}
        </span>
      </div>
      <div className={s.body}>
        <h3>{c.name}</h3>
        <p>{c.topic}</p>
        <div className={s.sw} aria-hidden="true">
          {c.colors.slice(1, 1 + MAX_SWATCHES).map((col, i) => (
            <span key={i} style={{ background: col }} />
          ))}
        </div>
      </div>
    </a>
  );
}

type Filter = TemplateCategory | 'All' | 'Saved';

/**
 * The gallery's address for a filter, a page and a search: `?category=`,
 * `?page=` and `?q=`, each left out at its default, so All on page 1 with
 * nothing typed is plain `/templates/`.
 */
function galleryHref(filter: Filter, page: number, query = ''): string {
  const params = new URLSearchParams();
  if (filter !== 'All') params.set('category', filter === 'Saved' ? 'saved' : categorySlug(filter));
  if (query.trim()) params.set('q', query.trim());
  if (page > 1) params.set('page', String(page));
  const search = params.toString();

  return search ? `/templates/?${search}` : '/templates/';
}

/** The filter, page and search a query string names; anything unknown is the default. */
function readLocation(search: string): { filter: Filter; page: number; query: string } {
  const params = new URLSearchParams(search);
  const category = params.get('category') ?? '';
  // `yours` is the address the filter had while templates were chosen.
  const filter: Filter =
    category === 'saved' || category === 'yours' ? 'Saved' : (categoryFromSlug(category) ?? 'All');
  const page = parseInt(params.get('page') ?? '', 10);

  return { filter, page: Number.isFinite(page) && page >= 1 ? page : 1, query: params.get('q') ?? '' };
}

/** A plain left click, which the page handles; anything else is the browser's. */
const plainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export default function TemplatesGrid({
  cards,
  title,
  lede,
}: {
  cards: TemplateCard[];
  title: string;
  lede: string;
}) {
  // The filter and page live in the URL, so a view can be shared, reloaded
  // and walked with back and forward. They are read after mount rather than
  // with useSearchParams, which would drop the prerendered grid and render
  // the page on the client alone; the first paint is All, page 1, and a
  // deep link moves to its view once the script runs.
  const [filter, setFilter] = useState<Filter>('All');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const saved = useSavedTemplates();
  // Each card's words and stems, worked out once rather than per keystroke.
  const indexes = useMemo(
    () => new Map<string, TemplateIndex>(cards.map((c) => [c.slug, indexTemplate(c)])),
    [cards]
  );

  useEffect(() => {
    const read = () => {
      const next = readLocation(window.location.search);
      setFilter(next.filter);
      setPage(next.page);
      setQuery(next.query);
    };

    read();
    window.addEventListener('popstate', read);

    return () => window.removeEventListener('popstate', read);
  }, []);

  const go = (nextFilter: Filter, nextPage: number) => {
    setFilter(nextFilter);
    setPage(nextPage);
    window.history.pushState(null, '', galleryHref(nextFilter, nextPage, query));
  };

  // Typing replaces the address rather than pushing one per keystroke, and
  // starts the matches from their first page.
  const search = (nextQuery: string) => {
    setQuery(nextQuery);
    setPage(1);
    window.history.replaceState(null, '', galleryHref(active, 1, nextQuery));
  };

  // Only the categories that have a site, in the vocabulary's order.
  const categories = TEMPLATE_CATEGORIES.filter((category) =>
    cards.some((c) => c.category === category)
  );
  const savedSet = savedSlugs(saved);
  // "Saved" means nothing until the account has answered, and nothing at all
  // to a visitor who is signed out: both see All.
  const active: Filter = filter === 'Saved' && saved.status !== 'ready' ? 'All' : filter;
  const inFilter =
    active === 'All'
      ? cards
      : active === 'Saved'
        ? cards.filter((c) => savedSet.has(c.slug))
        : cards.filter((c) => c.category === active);
  const matching = query.trim() ? searchTemplates(inFilter, (c) => indexes.get(c.slug)!, query) : inFilter;
  const filters: Filter[] = saved.status === 'ready' ? ['All', 'Saved', ...categories] : ['All', ...categories];

  // A page past the end (a link from before a category shrank, or a typed
  // number) shows the last page rather than an empty grid.
  const pageCount = Math.max(1, Math.ceil(matching.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  // Narrow until mounted, so the prerendered pager fits a phone.
  const widePager = useMediaQuery(PAGER_WIDE_QUERY);
  // The design's placeholder is cut off on a phone, so a phone gets a
  // shorter one (about 224px of the field is left for it at 390px wide, and
  // "Search by trade, e.g. plumber" lost its last letter); the export draws
  // the long one.
  const narrowSearch = useMediaQuery('(max-width: 559.98px)');
  const shown = matching.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const here = galleryHref(active, current, query);

  // Only worked out for a search that found nothing, over the cards the
  // filter holds, so every offer finds something where the person is.
  const empty = matching.length === 0 && query.trim() !== '';
  const offers = useMemo(() => {
    if (!empty) return { near: [], common: [] };

    const pool = inFilter.map((c) => indexes.get(c.slug)!);
    const near = suggestQueries(pool, query, 2);
    const common = near.length > 0 ? [] : COMMON_SEARCHES.filter((term) => pool.some((index) => matchesTemplate(index, term)));

    return { near, common };
  }, [empty, inFilter, indexes, query]);

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
      <header className={s.hero}>
        <div className={s.heroScrim} />
        <div className={s.heroInner}>
          <h1>{title}</h1>
          <p>{lede}</p>
          <label className={s.search}>
            <Search className={s.searchIcon} size={22} strokeWidth={1.8} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => search(event.target.value)}
              placeholder={narrowSearch ? 'Your trade, e.g. plumber' : 'Search by trade or business, e.g. plumber'}
              aria-label="Search templates"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button type="button" className={s.clear} onClick={() => search('')} aria-label="Clear search" title="Clear search">
                <X size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ) : null}
          </label>
        </div>
      </header>

      <div className={s.wrap}>
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
                {category === 'Saved' ? `Saved (${savedSet.size})` : category}
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
            <Card key={c.slug} c={c} savedId={savedOf(saved, c.slug)?.id ?? null} />
          ))}
        </div>
        {matching.length === 0 && query.trim() ? (
          <div className={s.none} role="status">
            <p className={s.noneTitle}>
              No templates for &quot;{query.trim()}&quot;{active === 'All' ? ' yet' : ` in ${active === 'Saved' ? 'your saved ones' : active}`}
            </p>
            {offers.near.length > 0 ? (
              <p>
                Did you mean{' '}
                {offers.near.map((term, i) => (
                  <span key={term}>
                    {i > 0 ? ' or ' : null}
                    <button type="button" className={s.clearSearch} onClick={() => search(term)}>
                      {term}
                    </button>
                  </span>
                ))}
                ?
              </p>
            ) : offers.common.length > 0 ? (
              <p>
                Try{' '}
                {offers.common.map((term, i) => (
                  <span key={term}>
                    {i > 0 ? ', ' : null}
                    <button type="button" className={s.clearSearch} onClick={() => search(term)}>
                      {term}
                    </button>
                  </span>
                ))}
                .
              </p>
            ) : null}
            <p>
              Or{' '}
              <button type="button" className={s.clearSearch} onClick={() => search('')}>
                clear the search
              </button>
              , or <a href="mailto:hello@tabbied.com">tell us which trade to add</a>.
            </p>
          </div>
        ) : active === 'Saved' && matching.length === 0 ? (
          <div className={s.none}>
            <p>Nothing saved yet. Customize any template and press Save to keep it here.</p>
          </div>
        ) : null}

        {/* Real links, so every page is an address a person can open in a tab
            and a crawler can follow; a plain click stays in the page. */}
        {pageCount > 1 ? (
          <nav className={s.pagination} aria-label="Pages">
            {paginationWindow(
              current,
              pageCount,
              widePager ? PAGER_SLOTS : PAGER_SLOTS_NARROW
            ).map((p, index) =>
              p === null ? (
                <span key={`gap-${index}`} className={s.pageGap} aria-hidden="true">
                  ...
                </span>
              ) : (
                <a
                  key={p}
                  href={galleryHref(active, p, query)}
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
      </div>
    </>
  );
}
