/**
 * Page numbers to render in a pager: the first two, the last two, and the
 * current page +-2, with `null` standing in for a collapsed range (drawn as
 * an ellipsis). Shared by the pattern and template galleries, so the two
 * pagers window the same way.
 */
export function paginationWindow(page: number, pageCount: number): (number | null)[] {
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
}
