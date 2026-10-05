// Ids for the per-instance <style> scope (css-doodle[data-tabbied="t-0"]),
// unique per page rather than per copy of this module.
//
// Two copies of the library on one page are ordinary: the CDN element beside
// an esm.sh import, or two bundles on a CMS page. With a counter of its own in
// each copy, both first patterns were "t0", so each matched the other's rule
// and one drew in the other's palette. The counter lives on globalThis under a
// registry symbol, which every copy resolves to the same key. The hyphen keeps
// these ids apart from 0.8.0 and earlier, whose own counters still start at
// "t0" on a page that mixes versions.

const COUNTER = Symbol.for('tabbied.instanceCounter');

type CounterScope = typeof globalThis & { [COUNTER]?: number };

export function nextInstanceId(): string {
  const scope = globalThis as CounterScope;
  const n = scope[COUNTER] ?? 0;

  scope[COUNTER] = n + 1;
  return `t-${n}`;
}
