'use client';

import {
  useId,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { Select } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { plexMono } from 'lib/fonts';
import SetupIconMark, { type SetupIcon } from './SetupIcon';
import styles from './ReactDocs.module.css';

// The switch between setups over an example on /docs/concepts: one tab per
// setup, each panel the same example in that setup's spelling. The panels
// are rendered on the server (CodeBlock), all of them; this only decides
// which one shows.
//
// Below 768px the row of tabs is a select instead, each setup beside its
// mark: six pills wrapped onto two rows there and pushed the code a screen
// further down. Both are rendered and the stylesheet shows one, so the
// export draws the right one at either width before any script runs. The
// select is not modal: a modal one locks the page's scroll while it is open,
// and the choice is made while it is open, so the scroll that keeps the
// trigger under the finger would be undone when the lock lifted.
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

export type SetupTab = { id: string; label: string; icon: SetupIcon; panel: ReactNode };

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
  const trigger = useRef<HTMLButtonElement>(null);

  // Every switch on the page changes at once, so the examples above this
  // one may grow or shrink; the page is scrolled by as much, so the control
  // the reader used (a tab, or the select's trigger) stays where it was
  // under the pointer.
  const select = (id: string, control: HTMLElement | null | undefined) => {
    const before = control?.getBoundingClientRect().top;

    flushSync(() => choose(id));

    if (control && before !== undefined) {
      const moved = control.getBoundingClientRect().top - before;
      if (moved !== 0) window.scrollBy({ top: moved, behavior: 'instant' });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = KEY_STEPS[event.key];
    if (!step) return;

    event.preventDefault();
    const next = step(index, tabs.length - 1);
    select(tabs[next].id, buttons.current[next]);
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
              onClick={() => select(tab.id, buttons.current[index])}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <Select.Root
        value={active}
        onValueChange={(value) => {
          if (value) select(value, trigger.current);
        }}
        modal={false}
      >
        <Select.Trigger ref={trigger} aria-label={label} className={styles.setupSelect}>
          <Select.Value className={styles.setupSelectValue}>
            {(value: string) => {
              const tab = tabs.find((candidate) => candidate.id === value) ?? tabs[0];
              return (
                <>
                  <span className={styles.setupSelectMark}>
                    <SetupIconMark icon={tab.icon} />
                  </span>
                  {tab.label}
                </>
              );
            }}
          </Select.Value>
          <Select.Icon className={styles.setupSelectCaret}>
            <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={6} alignItemWithTrigger={false} className={styles.setupSelectPositioner}>
            <Select.Popup className={`${plexMono.variable} ${styles.setupSelectPopup}`}>
              <Select.List className={styles.setupSelectList}>
                {tabs.map((tab) => (
                  <Select.Item key={tab.id} value={tab.id} className={styles.setupSelectItem}>
                    <span className={styles.setupSelectMark}>
                      <SetupIconMark icon={tab.icon} />
                    </span>
                    <Select.ItemText>{tab.label}</Select.ItemText>
                    <Select.ItemIndicator className={styles.setupSelectCheck}>
                      <Check size={16} strokeWidth={2} aria-hidden="true" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
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
