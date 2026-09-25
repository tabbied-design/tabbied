'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from 'lib/useMediaQuery';
import type { GalleryItem } from 'lib/pattern';
import {
  deletePalette,
  previewPalette,
  RANDOM_PALETTE_ID,
  setActivePalette,
  useBrandPalettes,
  type BrandPalette,
} from 'lib/brandPalettes';
import { PALETTE_LIBRARY, type LibraryPalette } from 'lib/paletteLibrary';
import {
  assignRandomPalettes,
  fitToColorBounds,
  rerollRandomSeed,
  sessionRandomSeed,
} from 'lib/randomPalettes';
import { usePaletteEditor } from 'components/palette/usePaletteEditor';
import PaletteEditorDialog from 'components/palette/PaletteEditorDialog';
import GalleryTopBar from './GalleryTopBar';
import { mixedPairs } from 'components/palette/MixedSwatches';
import GalleryRail from './GalleryRail';
import GalleryMobileHeader from './GalleryMobileHeader';
import GalleryChipShelf from './GalleryChipShelf';
import GalleryCard from './GalleryCard';
import GalleryScrollRestorer from './GalleryScrollRestorer';
import { flushGridBottom } from './flushGridBottom';
import styles from './SelectPattern.module.css';

const PER_PAGE = 24;

/**
 * Row spans for the masonry, in 52px rows: every card is one column wide and
 * three, four or five rows tall, and the grid's dense placement puts each one
 * under the shortest column. The sequence is the design's and repeats per
 * page; at 196-340px tall, a card never reads as a strip.
 */
const ROW_SPANS: readonly number[] = [
  3, 5, 4, 5,
  4, 5, 3,
  4, 3, 5, 4, 5,
  3,
  5, 4, 3, 4, 5, 3, 4,
  3, 5, 4, 5,
];

// Wait after the last palette pick before recoloring the grid, so rapidly
// clicking through palettes recolors the thumbnails once, not once per click.
const APPLY_DEBOUNCE_MS = 150;

// Page numbers to render: the first two, last two, and current +-2, with `null`
// standing in for a collapsed range (an ellipsis).
const paginationWindow = (page: number, pageCount: number): (number | null)[] => {
  const nums: number[] = [];

  for (let p = 1; p <= pageCount; p += 1) {
    if (p <= 2 || p > pageCount - 2 || Math.abs(p - page) <= 2) nums.push(p);
  }

  const out: (number | null)[] = [];
  let last = 0;

  nums.forEach((p) => {
    if (last && p - last > 1) out.push(null);
    out.push(p);
    last = p;
  });

  return out;
};

export default function SelectPattern({ gallery }: { gallery: GalleryItem[] }) {
  const brandState = useBrandPalettes();
  const savedPalettes = brandState.palettes;

  // Below the two-column breakpoint the fixed rail is replaced by the mobile
  // header. Rendering it only on mobile keeps its palette shelf out of the
  // desktop DOM; the `&&` placeholder holds the slot so the grid (a later
  // sibling) never remounts when this toggles.
  const isMobile = useMediaQuery('(max-width: 991.98px)');

  const [search, setSearch] = useState('');
  // The gallery page lives in the URL (?page=N) so it's shareable and works
  // with back/forward. It's read client-side (not useSearchParams) so the page
  // keeps its server-rendered first paint instead of deopting to client-only
  // rendering. Starts at 1 for SSR.
  const [page, setPage] = useState(1);
  // Mobile only: the "All >" chip-shelf pill swaps in the embedded browser.
  const [browserOpen, setBrowserOpen] = useState(false);

  useEffect(() => {
    const readPage = () => {
      const raw = new URLSearchParams(window.location.search).get('page');
      const n = raw ? parseInt(raw, 10) : 1;
      setPage(Number.isFinite(n) && n >= 1 ? n : 1);
    };

    readPage();
    window.addEventListener('popstate', readPage);

    return () => window.removeEventListener('popstate', readPage);
  }, []);

  // Write ?page=N to the URL (dropping it for page 1). replace: for changes that
  // aren't a deliberate page navigation (e.g. a search resetting to page 1).
  const writePageToUrl = (nextPage: number, replace = false) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (nextPage <= 1) params.delete('page');
    else params.set('page', String(nextPage));

    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;

    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  };

  // The rail's highlighted row. Local so it updates instantly on click, while
  // the applied palette (which recolors the grid, read from the store by each
  // card) is written after a short debounce.
  const [selectedId, setSelectedId] = useState<string | null>(RANDOM_PALETTE_ID);
  const applyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (applyTimer.current) return;
    // A null active id is a stored id that no longer names anything; the rail
    // lights the random spread rather than nothing.
    setSelectedId(brandState.activePaletteId ?? RANDOM_PALETTE_ID);
  }, [brandState.activePaletteId]);

  useEffect(
    () => () => {
      if (applyTimer.current) clearTimeout(applyTimer.current);
    },
    []
  );

  const applyPalette = (id: string | null, immediate = false) => {
    setSelectedId(id);

    if (applyTimer.current) {
      clearTimeout(applyTimer.current);
      applyTimer.current = null;
    }

    if (immediate) {
      setActivePalette(id);
      return;
    }

    applyTimer.current = setTimeout(() => {
      setActivePalette(id);
      applyTimer.current = null;
    }, APPLY_DEBOUNCE_MS);
  };

  // "Random per pattern": one library palette per card, drawn for the session
  // and kept until the option is chosen again. The seed starts fixed so the
  // prerendered grid and the first client render agree, and the session's
  // seed lands after mount.
  const randomMode = selectedId === RANDOM_PALETTE_ID;
  const [randomSeed, setRandomSeed] = useState(0);

  useEffect(() => {
    setRandomSeed(sessionRandomSeed());
  }, []);

  const randomSpread = useMemo(
    () => assignRandomPalettes(gallery.length, PALETTE_LIBRARY, randomSeed),
    [gallery.length, randomSeed]
  );

  // The spread is keyed by the card's place in the whole catalog, not on the
  // page, so a search or a page change keeps each design in its own palette.
  // Fitted once per spread: a fresh array per render reaches TabbiedPattern as
  // a changed palette and rebuilds every visible doodle's source.
  const spreadPalettes = useMemo(
    () =>
      new Map(
        gallery.map((item, index) => {
          const palette = randomSpread[index];

          return [
            item.slug,
            palette
              ? fitToColorBounds(palette.colors, item.colors?.min, item.colors?.max)
              : undefined,
          ] as const;
        })
      ),
    [gallery, randomSpread]
  );

  // The "Mixed" option's swatches: two colors each from the spread's first
  // few palettes, so the option shows the spread it will apply.
  const mixed = useMemo(
    () => mixedPairs(randomSpread.slice(0, 12).map((palette) => palette?.colors)),
    [randomSpread]
  );

  // The palette every card wears when the spread is off, resolved once here
  // rather than by each card from the same store snapshot.
  const activePalette = useMemo(() => previewPalette(brandState), [brandState]);

  const chooseRandom = () => {
    setRandomSeed(rerollRandomSeed());
    applyPalette(RANDOM_PALETTE_ID, true);
  };

  const editor = usePaletteEditor({
    // Saving applies the palette; a freshly saved one is already at the top of
    // the rail's full list, so there is no page to jump to.
    onSaved: (palette) => applyPalette(palette.id, true),
  });

  // Delete a custom palette on the first click of its delete mark (no confirm step).
  // The store reverts the active palette to the random spread itself; the rail
  // follows at once rather than after the apply debounce.
  const removePalette = (id: string) => {
    deletePalette(id);
    if (selectedId === id) setSelectedId(RANDOM_PALETTE_ID);
  };

  const filtered = useMemo(
    () =>
      gallery.filter(
        (item) =>
          !search || item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [gallery, search]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const clampedPage = Math.min(page, pageCount);
  // Memoized because the flush effect below is keyed on it: a fresh slice per
  // render would measure the grid again on every palette click.
  const visible = useMemo(
    () => filtered.slice((clampedPage - 1) * PER_PAGE, clampedPage * PER_PAGE),
    [filtered, clampedPage]
  );
  const pages = paginationWindow(clampedPage, pageCount);

  // The masonry ends on one line: the lowest card in each column is stretched
  // to the last row (see flushGridBottom), again whenever the grid's width
  // changes, since that moves the cards between columns.
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    flushGridBottom(grid);

    const observer = new ResizeObserver(() => flushGridBottom(grid));
    observer.observe(grid);

    return () => observer.disconnect();
  }, [visible]);

  // A page change or a search brings the column's heading back into view, since
  // a page number is clicked at the foot of the grid. The heading's
  // scroll-margin keeps it clear of the pinned bar (and, on a phone, the shelf).
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pendingScroll = useRef<'page' | 'search' | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const reason = pendingScroll.current;

    pendingScroll.current = null;
    if (!header || !reason) return;

    if (reason === 'page') {
      header.scrollIntoView({ block: 'start' });
      // Keyboard and screen-reader users land on the new page, not on a
      // page number that has moved.
      titleRef.current?.focus({ preventScroll: true });
      return;
    }

    // A search that shortens the grid can leave the heading under the bar.
    const margin = parseFloat(getComputedStyle(header).scrollMarginTop) || 0;
    if (header.getBoundingClientRect().top < margin) {
      header.scrollIntoView({ block: 'start' });
    }
  }, [page, search]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), pageCount);
    if (clamped !== page) pendingScroll.current = 'page';
    setPage(clamped);
    writePageToUrl(clamped);
  };

  const onSearchChange = (value: string) => {
    pendingScroll.current = 'search';
    setSearch(value);
    // A new search resets to page 1, replacing the URL rather than pushing.
    setPage(1);
    writePageToUrl(1, true);
  };

  const onEditCustom = (palette: BrandPalette) => editor.openEditor(palette);
  const onEditLibrary = (palette: LibraryPalette) =>
    editor.openEditorAsCopy(palette);

  const hasResults = filtered.length > 0;

  return (
    <main className={styles.gallery}>
      <GalleryScrollRestorer />

      <GalleryTopBar />

      {!isMobile && (
      <GalleryRail
        search={search}
        onSearchChange={onSearchChange}
        palettes={savedPalettes}
        library={PALETTE_LIBRARY}
        selectedId={selectedId}
        onApply={(id) => applyPalette(id)}
        onRandom={chooseRandom}
        mixed={mixed}
        onEditCustom={onEditCustom}
        onEditLibrary={onEditLibrary}
        onDelete={removePalette}
      />
      )}

      {isMobile && (
      <GalleryMobileHeader
        search={search}
        onSearchChange={onSearchChange}
        palettes={savedPalettes}
        library={PALETTE_LIBRARY}
        selectedId={selectedId}
        onApply={(id) => applyPalette(id)}
        onEditCustom={onEditCustom}
        onEditLibrary={onEditLibrary}
        onDelete={removePalette}
        browserOpen={browserOpen}
        onCloseBrowser={() => setBrowserOpen(false)}
      />
      )}

      {/* A direct child of the document-scrolled gallery, so `position:
          sticky` pins it across the whole grid scroll; inside the header
          wrapper it could only stick within that short box. */}
      {isMobile && !browserOpen && (
        <GalleryChipShelf
          className={styles.mobileShelf}
          palettes={savedPalettes}
          library={PALETTE_LIBRARY}
          selectedId={selectedId}
          onApply={(id) => applyPalette(id)}
          onRandom={chooseRandom}
          mixed={mixed}
          onEditCustom={onEditCustom}
          onEditLibrary={onEditLibrary}
          onDelete={removePalette}
          onBrowse={() => setBrowserOpen(true)}
        />
      )}

      <div className={styles.mainColumn}>
        <div ref={headerRef} className={styles.mainHeader}>
          <h1 ref={titleRef} className={styles.title} tabIndex={-1}>
            Pick a pattern
          </h1>
          <p className={styles.intro}>
            {filtered.length} {filtered.length === 1 ? 'pattern' : 'patterns'},
            each drawn live in your browser. Pick a color palette to recolor
            the library (edit its colors if you want your own), then choose
            a pattern to customize.
          </p>
        </div>

        {hasResults ? (
          <>
            <div ref={gridRef} className={styles.grid}>
              {visible.map((item, index) => (
                <GalleryCard
                  key={item.slug}
                  item={item}
                  palette={randomMode ? spreadPalettes.get(item.slug) : undefined}
                  fallbackPalette={activePalette}
                  className={styles[`rows${ROW_SPANS[index % ROW_SPANS.length]}`]}
                />
              ))}
            </div>

            {/* Numbers only, as the design draws it: the window always shows
                the current page's neighbors. Real links, so each page is a URL
                a crawler can follow and a person can open in a tab; a plain
                click stays in the page. */}
            {pageCount > 1 && (
              <nav className={styles.pagination} aria-label="Pages">
                {pages.map((p, index) =>
                  p === null ? (
                    <span
                      key={`gap-${index}`}
                      className={styles.pageGap}
                      aria-hidden="true"
                    >
                      ...
                    </span>
                  ) : (
                    <a
                      key={p}
                      href={p === 1 ? '/patterns/' : `/patterns/?page=${p}`}
                      className={
                        p === clampedPage
                          ? `${styles.pageNumber} ${styles.pageNumberCurrent}`
                          : styles.pageNumber
                      }
                      onClick={(event) => {
                        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                          return;
                        }
                        event.preventDefault();
                        goToPage(p);
                      }}
                      aria-label={`Page ${p}`}
                      aria-current={p === clampedPage ? 'page' : undefined}
                    >
                      {p}
                    </a>
                  )
                )}
              </nav>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            <p>No designs match your search.</p>
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => onSearchChange('')}
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <PaletteEditorDialog
        draft={editor.draft}
        setDraft={editor.setDraft}
        draftError={editor.draftError}
        onClose={editor.closeEditor}
        onSave={editor.saveDraft}
        onDelete={editor.removeDraftPalette}
        onRandomize={editor.randomizeDraft}
        setDraftColor={editor.setDraftColor}
      />
    </main>
  );
}
