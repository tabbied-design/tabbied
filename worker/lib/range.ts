import { and, gte, lt, sql, type Column } from 'drizzle-orm';
import { z } from 'zod';

// The window the admin overview and Downloads pages read, and the bars their
// charts cut it into. A preset (`period`) counts back from now: the last 24
// hours by the hour, or the last N UTC days, today included, by the day. A
// custom range (`from` and `to`, both UTC dates, both included) is whole days.
// Either way the span picks the bar: an hour up to two days, a day up to 92,
// then a week, or as many weeks as keep the chart to MAX_BARS bars. Every
// figure on a page is counted over the same window as its charts, so the bars
// add up to the totals beside them.

export const PERIODS = ['1', '7', '30', '90', '365', 'all'] as const;

export type Period = (typeof PERIODS)[number];

const HOUR = 3600;
const DAY = 86_400;
const WEEK = 7 * DAY;

/** The most bars a chart draws: past two years, a bar is several weeks. */
const MAX_BARS = 104;

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const rangeQuery = z.union([
  z.object({ from: isoDay, to: isoDay }),
  z.object({ from: z.undefined(), to: z.undefined(), period: z.enum(PERIODS).optional() }),
]);

/** What was asked for, before "all" knows when the first row was written. */
export type RangeAsk = { period: Period } | { period: 'custom'; from: string; to: string };

export type Range = {
  period: Period | 'custom';
  /** Unix seconds, included. */
  start: number;
  /** Unix seconds, excluded: the end of the last bar. */
  end: number;
  bucket: 'hour' | 'day' | 'week';
  bucketSeconds: number;
  buckets: number;
};

/** 00:00 UTC on a YYYY-MM-DD, in unix seconds, or null for a date that is not one (2026-02-30). */
function dayStart(value: string): number | null {
  const ms = Date.parse(`${value}T00:00:00Z`);

  return Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== value ? null : ms / 1000;
}

/**
 * The query's range, or null for one that does not parse: a period not in
 * PERIODS, half a custom pair, a date that does not exist, or `from` after
 * `to`. A preset is the default when nothing is asked.
 */
export function askedRange(query: Record<string, string | undefined>, fallback: Period): RangeAsk | null {
  const parsed = rangeQuery.safeParse({ period: query.period, from: query.from, to: query.to });

  if (!parsed.success) return null;

  if (parsed.data.from === undefined) return { period: parsed.data.period ?? fallback };

  const { from, to } = parsed.data;
  const [start, end] = [dayStart(from), dayStart(to)];

  return start === null || end === null || start > end ? null : { period: 'custom', from, to };
}

/**
 * The window in unix seconds and its bars, at `now` (ms). "All time" starts
 * on the day of `earliest`, the first row the page counts (unix seconds; null
 * when there are none, which charts today). A custom range that runs past
 * today stops at the end of today, and one that starts after it is null.
 */
export function resolveRange(ask: RangeAsk, now: number, earliest: number | null = null): Range | null {
  const seconds = Math.floor(now / 1000);
  const tomorrow = Math.floor(seconds / DAY) * DAY + DAY;
  let start: number;
  let end = tomorrow;

  if (ask.period === 'custom') {
    start = dayStart(ask.from)!;
    end = Math.min(dayStart(ask.to)! + DAY, tomorrow);
  } else if (ask.period === '1') {
    // The hour now running and the 23 before it.
    end = Math.floor(seconds / HOUR) * HOUR + HOUR;
    start = end - 24 * HOUR;
  } else if (ask.period === 'all') {
    start = Math.min(Math.floor((earliest ?? seconds) / DAY) * DAY, tomorrow - DAY);
  } else {
    start = tomorrow - Number(ask.period) * DAY;
  }

  if (start >= end) return null;

  const span = end - start;
  const bucketSeconds = span <= 2 * DAY ? HOUR : span <= 92 * DAY ? DAY : WEEK * Math.ceil(span / WEEK / MAX_BARS);

  return {
    period: ask.period,
    start,
    end,
    bucket: bucketSeconds === HOUR ? 'hour' : bucketSeconds === DAY ? 'day' : 'week',
    bucketSeconds,
    buckets: Math.ceil(span / bucketSeconds),
  };
}

/** The rows a timestamp column puts inside the range. */
export const within = (column: Column, range: Range) =>
  and(gte(column, new Date(range.start * 1000)), lt(column, new Date(range.end * 1000)));

/**
 * The bar a timestamp column falls in, 0 for the first. The numbers are the
 * Worker's own integers, written into the SQL rather than bound, so the
 * division is an integer's and the select and the GROUP BY are one expression.
 */
export const barOf = (column: Column, range: Range) =>
  sql<number>`((${column} - ${sql.raw(String(range.start))}) / ${sql.raw(String(range.bucketSeconds))})`;

/** The range as the pages read it: ISO times, so the browser labels the bars. */
export const rangeJson = (range: Range) => ({
  ...range,
  start: new Date(range.start * 1000).toISOString(),
  end: new Date(range.end * 1000).toISOString(),
});
