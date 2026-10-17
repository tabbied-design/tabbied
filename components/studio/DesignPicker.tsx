'use client';

// Choosing the design one pattern field draws, in the rail beside the page.
// It was a dialog over the page, which hid the very field being changed and
// showed every design in its own colors; here the page stays in view, scrolled
// to the field (the workspace does that when the picker opens), and every
// design is drawn in the colors the field wears, so a tile is what the page
// will look like.
//
// A pick applies at once and the picker stays open, so designs can be tried
// one after another against the page; "All patterns" (or Escape) goes back.
// The list is the catalog the shuffle draws from.
//
// 382 live patterns would be 382 css-doodles, so a tile draws only while it
// is in or near the list's scrolled view and lets go of its pattern when it
// leaves; until then it is the page's ground.
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern } from 'tabbied/react';
import type { DesignChoice } from 'lib/designCatalog';
import { usePatternCatalog } from './patternCatalog';
import styles from './SiteRail.module.css';

/** A tile's render box, the field thumbnail's proportions. */
const RENDER = { width: 280, height: 210 };

/** How far past the list's view a tile starts drawing, and stops. */
const NEAR = '160px 0px';

/** Every tile draws with the same seed, so the list holds still as it scrolls. */
const SEED = 'picker';

function DesignTile({
  pattern,
  palette,
  ground,
  root,
}: {
  pattern: PatternDefinition | undefined;
  palette: readonly string[] | undefined;
  ground: string;
  /** The scrolling list, which decides what is near. */
  root: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => setNear(entries[entries.length - 1].isIntersecting),
      { root: root.current, rootMargin: NEAR }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [root]);

  return (
    <span ref={ref} className={styles.tileArt} style={{ background: ground }}>
      {near && pattern ? (
        <TabbiedPattern
          pattern={pattern}
          palette={palette ? [...palette] : undefined}
          seed={SEED}
          fit="cover"
          coverRender={RENDER}
        />
      ) : null}
    </span>
  );
}

export default function DesignPicker({
  fieldLabel,
  designs,
  current,
  authored,
  palette,
  ground,
  onPick,
  onBack,
}: {
  /** The field being changed, for the heading. */
  fieldLabel: string;
  designs: readonly DesignChoice[];
  /** The design the field draws now. */
  current: string;
  /** The design the template authored for it, named as such in the list. */
  authored: string;
  /** The colors the field wears on the page, ground first. */
  palette: readonly string[] | undefined;
  /** The page's ground, behind a field whose own is transparent. */
  ground: string;
  onPick: (slug: string) => void;
  /** Back to the page's list of fields. */
  onBack: () => void;
}) {
  const [query, setQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const catalog = usePatternCatalog();

  const listed = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return needle ? designs.filter((design) => design.name.toLowerCase().includes(needle)) : designs;
  }, [designs, query]);

  return (
    <div
      className={styles.picker}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        onBack();
      }}
    >
      <button type="button" className={styles.pickerBack} onClick={onBack}>
        <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
        All patterns
      </button>
      <h2 className={styles.pickerTitle}>Change the {fieldLabel} pattern</h2>
      <p className={styles.hint}>Pick a design and the page redraws. Each is shown in your colors.</p>

      <label className={styles.pickerSearch}>
        <Search size={15} aria-hidden="true" />
        <input
          type="search"
          value={query}
          placeholder={`Search ${designs.length} patterns`}
          aria-label="Search patterns"
          autoComplete="off"
          // The picker opens from the field's pencil: the search is where a
          // keyboard goes next.
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className={styles.pickerScroll} ref={scrollRef}>
        {listed.length === 0 ? (
          <p className={styles.hint}>No patterns match your search.</p>
        ) : (
          <ul role="list" className={styles.tiles} aria-label="Pattern library">
            {listed.map((design) => {
              const on = design.slug === current;

              return (
                <li key={design.slug}>
                  <button
                    type="button"
                    aria-pressed={on}
                    className={on ? `${styles.tile} ${styles.tileOn}` : styles.tile}
                    onClick={() => onPick(design.slug)}
                  >
                    <DesignTile pattern={catalog?.[design.slug]} palette={palette} ground={ground} root={scrollRef} />
                    <span className={styles.tileName}>{design.name}</span>
                    {design.slug === authored ? <span className={styles.tileTag}>Template&apos;s own</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
