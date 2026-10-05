'use client';

import {
  useId,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import styles from './ReactDocs.module.css';

// The switch between setups over an example on /docs/concepts: one tab per
// setup, each panel the same example in that setup's spelling. The panels
// are rendered on the server (CodeBlock), all of them; this only decides
// which one shows.
//
// A choice is the page's, not the switch's: picking Vue on one switches
// every switch on the page, and this browser remembers it for the next
// visit. The remembered choice is read after hydration, never during it:
// the export draws the first setup, and useSyncExternalStore's server
// snapshot keeps the first client render in step with it. Storage can throw
// (a private window, blocked site data), and then the choice lasts as long
// as the page.

const STORAGE_KEY = 'tabbied-docs-setup';

const listeners = new Set<() => void>();
let chosen: string | null = null;
let loaded = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string | null {
  if (!loaded) {
    loaded = true;
    try {
      chosen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // No storage: the first setup until one is picked.
    }
  }
  return chosen;
}

const getServerSnapshot = (): string | null => null;

function choose(id: string) {
  chosen = id;
  loaded = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Remembered for this page only.
  }
  for (const listener of listeners) listener();
}

/** The tab a key moves to, from the tab at `index` (the ARIA tabs pattern, wrapping). */
const KEY_STEPS: Record<string, (index: number, last: number) => number> = {
  ArrowRight: (index, last) => (index === last ? 0 : index + 1),
  ArrowLeft: (index, last) => (index === 0 ? last : index - 1),
  Home: () => 0,
  End: (_, last) => last,
};

export type SetupTab = { id: string; label: string; panel: ReactNode };

export default function SetupTabs({
  label,
  tabs,
}: {
  /** The tab list's accessible name. */
  label: string;
  tabs: SetupTab[];
}) {
  const base = useId();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const active = tabs.find((tab) => tab.id === stored)?.id ?? tabs[0].id;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Every switch on the page changes at once, so the examples above this
  // one may grow or shrink; the page is scrolled by as much, so the switch
  // the reader used stays where it was under the pointer.
  const select = (index: number) => {
    const button = buttons.current[index];
    const before = button?.getBoundingClientRect().top;

    flushSync(() => choose(tabs[index].id));

    if (button && before !== undefined) {
      const moved = button.getBoundingClientRect().top - before;
      if (moved !== 0) window.scrollBy({ top: moved, behavior: 'instant' });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = KEY_STEPS[event.key];
    if (!step) return;

    event.preventDefault();
    const next = step(index, tabs.length - 1);
    select(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className={styles.setupTabs}>
      <div role="tablist" aria-label={label} className={styles.setupTabList}>
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.setupTab}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
