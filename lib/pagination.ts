/** Slots a pager draws at 768px and up, and below it. Both odd: see below. */
export const PAGER_SLOTS = 11;
export const PAGER_SLOTS_NARROW = 7;
export const PAGER_WIDE_QUERY = '(min-width: 768px)';

/**
 * Page numbers to render in a pager, with `null` standing in for a collapsed
 * range (drawn as an ellipsis). Shared by the pattern and template galleries,
 * so the two pagers window the same way.
 *
 * The pager always draws `slots` items, ellipses included, once there are
 * more pages than that, so it keeps one width while a person pages through
 * and the numbers under the pointer do not jump. The first and last pages are
 * always there; the rest go to the current page and its neighbors, and near
 * either end to a longer run from that end. An ellipsis always stands for at
 * least two pages: one that hid a single page would take the slot the number
 * needed. That holds for an odd `slots`, which is why both counts are odd.
 */
export function paginationWindow(
  page: number,
  pageCount: number,
  slots: number = PAGER_SLOTS
): (number | null)[] {
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (pageCount <= slots) return range(1, pageCount);

  // The run that sits between two ellipses: the page and `side` each way.
  const side = Math.floor((slots - 5) / 2);
  // A run that starts or ends at a boundary, beside a single ellipsis.
  const run = slots - 2;

  if (page <= run - side) return [...range(1, run), null, pageCount];
  if (page > pageCount - run + side) return [1, null, ...range(pageCount - run + 1, pageCount)];

  return [1, null, ...range(page - side, page + side), null, pageCount];
}
