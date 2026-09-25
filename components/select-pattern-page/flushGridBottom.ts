/**
 * Stretch the lowest card in each column of a masonry grid by whole rows to the
 * grid's last row line, so the page ends on one edge rather than a ragged one.
 *
 * The span is written inline as the `grid-row` shorthand: an inline
 * `grid-row-end` alone is ignored, because the card's class sets the start as
 * a span too and when both ends are spans the end one loses. It is cleared
 * first so a resize recomputes from the authored spans.
 */
export function flushGridBottom(grid: HTMLElement): void {
  const cards = Array.from(grid.children) as HTMLElement[];

  for (const card of cards) card.style.gridRow = '';

  if (cards.length === 0) return;

  const style = getComputedStyle(grid);
  const rowGap = parseFloat(style.rowGap) || 0;
  const rowUnit = (parseFloat(style.gridAutoRows) || 0) + rowGap;

  if (!rowUnit) return;

  const gridLeft = grid.getBoundingClientRect().left;
  const lowest = new Map<number, { card: HTMLElement; top: number; bottom: number }>();

  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const column = Math.round(rect.left - gridLeft);
    const seen = lowest.get(column);

    if (!seen || rect.bottom > seen.bottom) {
      lowest.set(column, { card, top: rect.top, bottom: rect.bottom });
    }
  }

  const floor = Math.max(...[...lowest.values()].map((entry) => entry.bottom));

  for (const { card, top, bottom } of lowest.values()) {
    const extra = Math.round((floor - bottom) / rowUnit);

    if (extra <= 0) continue;

    const rows = Math.round((bottom - top + rowGap) / rowUnit) + extra;
    card.style.gridRow = `span ${rows}`;
  }
}
