'use client';

// Choosing the design one pattern field draws, for this site. Shuffle draws a
// new set for the whole page; this is the way to change one field to a design
// a person has in mind, which is what the gallery is for everywhere else on
// the site and was missing here.
//
// It applies on click and closes, like the rail's palette rows rather than
// the colour editor: a design is one choice, not a set of values that reads
// better committed together, and the canvas answering at once is the point of
// previewing. The list is the catalog the shuffle draws from, searched by
// name, each design shown by its committed preview.
import { useEffect, useMemo, useState } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { Search, X } from 'lucide-react';
import type { DesignChoice } from 'lib/designCatalog';
import styles from './DesignDialog.module.css';

export default function DesignDialog({
  open,
  onOpenChange,
  fieldLabel,
  designs,
  current,
  authored,
  onPick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The field being changed, for the title. */
  fieldLabel: string;
  designs: readonly DesignChoice[];
  /** The design the field draws now. */
  current: string;
  /** The design the template authored for it, named as such in the list. */
  authored: string;
  onPick: (slug: string) => void;
}) {
  const [query, setQuery] = useState('');

  // A fresh search each time it opens, or the second field opens on the
  // first one's filter.
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const listed = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return needle ? designs.filter((design) => design.name.toLowerCase().includes(needle)) : designs;
  }, [designs, query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <div className={styles.head}>
            <div>
              <Dialog.Title className={styles.title}>Change the {fieldLabel} pattern</Dialog.Title>
              <Dialog.Description className={styles.lede}>
                Pick a design from the pattern library. The page redraws as soon as you choose.
              </Dialog.Description>
            </div>
            <Dialog.Close className={styles.close} aria-label="Close">
              <X size={16} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <label className={styles.search}>
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder={`Search ${designs.length} patterns`}
              aria-label="Search patterns"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className={styles.scroll}>
            {listed.length === 0 ? (
              <p className={styles.empty}>No patterns match your search.</p>
            ) : (
              <ul role="list" className={styles.tiles} aria-label="Patterns">
                {listed.map((design) => {
                  const on = design.slug === current;

                  return (
                    <li key={design.slug}>
                      <button
                        type="button"
                        aria-pressed={on}
                        className={on ? `${styles.tile} ${styles.tileOn}` : styles.tile}
                        onClick={() => {
                          onPick(design.slug);
                          onOpenChange(false);
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- a committed preview under public/, no loader needed */}
                        <img
                          className={styles.thumb}
                          src={`/previews/${design.slug}.webp`}
                          alt=""
                          loading="lazy"
                          width="120"
                          height="90"
                        />
                        <span className={styles.name}>{design.name}</span>
                        {design.slug === authored ? (
                          <span className={styles.tag}>template&apos;s own</span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
