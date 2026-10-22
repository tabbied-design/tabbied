// The range the overview and Downloads pages read, as the browser holds it: a
// preset or a custom pair of UTC dates, the query string that asks the Worker
// for it, and the words and bars for the window the Worker answers with.
// worker/lib/range.ts decides that window and how long a bar is; the page
// only labels what it is given, so the two cannot disagree about an edge.

export type Period = '1' | '7' | '30' | '90' | '365' | 'all';

export type RangeChoice = { period: Period } | { period: 'custom'; from: string; to: string };

/** The window as the Worker resolved it: ISO times, the end excluded. */
export type ResolvedRange = {
  period: Period | 'custom';
  start: string;
  end: string;
  bucket: 'hour' | 'day' | 'week';
  bucketSeconds: number;
  buckets: number;
};

/** The presets: the pill's words, and the figures' ("Last 7 days, ..."). */
export const PRESETS: { period: Period; pill: string; label: string }[] = [
  { period: '1', pill: '1 day', label: 'Last 24 hours' },
  { period: '7', pill: '7 days', label: 'Last 7 days' },
  { period: '30', pill: '30 days', label: 'Last 30 days' },
  { period: '90', pill: '90 days', label: 'Last 90 days' },
  { period: '365', pill: '1 year', label: 'Last 365 days' },
  { period: 'all', pill: 'All time', label: 'All time' },
];

const DAY = 86_400_000;

export const rangeQuery = (choice: RangeChoice) =>
  choice.period === 'custom' ? `from=${choice.from}&to=${choice.to}` : `period=${choice.period}`;

/** A YYYY-MM-DD in UTC, as the date inputs and the Worker take one. */
export const isoDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** The first and last UTC days a range touches. */
export const rangeDays = (range: ResolvedRange) => ({
  from: isoDay(Date.parse(range.start)),
  to: isoDay(Date.parse(range.end) - 1),
});

const utc = (ms: number, options: Intl.DateTimeFormatOptions) =>
  new Date(ms).toLocaleDateString(undefined, { ...options, timeZone: 'UTC' });

const MONTH_DAY = { month: 'short', day: 'numeric' } as const;
const FULL_DAY = { month: 'short', day: 'numeric', year: 'numeric' } as const;

/** Two days as one span, the year said once when they share it. */
function span(first: number, last: number) {
  if (first === last) return utc(first, FULL_DAY);

  const oneYear = new Date(first).getUTCFullYear() === new Date(last).getUTCFullYear();

  return `${utc(first, oneYear ? MONTH_DAY : FULL_DAY)} to ${utc(last, FULL_DAY)}`;
}

/** What the figures cover: "Last 30 days", or a custom range's days. */
export function rangeLabel(range: ResolvedRange) {
  const preset = PRESETS.find((entry) => entry.period === range.period);

  return preset ? preset.label : span(Date.parse(range.start), Date.parse(range.end) - DAY);
}

/** The same, inside a sentence: "last 30 days", "all time", or the days. */
export const rangePhrase = (range: ResolvedRange) =>
  range.period === 'custom' ? rangeLabel(range) : rangeLabel(range).toLowerCase();

/** How long a bar is, for a subtitle: "", or ", each bar 6 weeks" past two years. */
export function barNote(range: ResolvedRange) {
  const weeks = range.bucketSeconds / (7 * 86_400);

  return range.bucket === 'week' && weeks > 1 ? `, each bar ${weeks} weeks` : '';
}

/** For a CSV's name: "30-days", "all-time", "2026-10-01-to-2026-10-14". */
export function rangeSlug(range: ResolvedRange) {
  if (range.period === 'all') return 'all-time';
  if (range.period === '1') return '24-hours';
  if (range.period !== 'custom') return `${range.period}-days`;

  const { from, to } = rangeDays(range);

  return `${from}-to-${to}`;
}

export type Slot = {
  /** The bar's number, as the Worker's series count it from 0. */
  i: number;
  /** Under the bar. */
  tick: string;
  /** The readout's first line: the hour, the day, or the week's days. */
  heading: string;
};

const hh = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

/** Every bar in the range, oldest first, with the words that label it. */
export function slotsOf(range: ResolvedRange): Slot[] {
  const start = Date.parse(range.start);
  const end = Date.parse(range.end);
  const size = range.bucketSeconds * 1000;

  return Array.from({ length: range.buckets }, (_, i) => {
    const from = start + i * size;

    if (range.bucket === 'hour') {
      const hour = new Date(from).getUTCHours();

      return { i, tick: hh(hour), heading: `${utc(from, MONTH_DAY)}, ${hh(hour)}-${hh(hour + 1)} UTC` };
    }

    if (range.bucket === 'day') {
      return {
        i,
        // A fortnight or less has room for the day of the month alone.
        tick: range.buckets > 14 ? utc(from, MONTH_DAY) : String(new Date(from).getUTCDate()),
        heading: utc(from, { weekday: 'short', ...FULL_DAY }),
      };
    }

    // The last week can run past the range; its days stop where the range does.
    return { i, tick: utc(from, MONTH_DAY), heading: span(from, Math.min(from + size, end) - DAY) };
  });
}
