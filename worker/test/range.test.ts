import { describe, expect, it } from 'vitest';
import { askedRange, resolveRange, type RangeAsk } from '../lib/range';

// The admin pages' window: what each preset and a custom pair cover, and the
// bars the span is cut into. Pinned to one moment so the edges are exact.

const NOW = Date.parse('2026-10-22T15:30:00Z');
const at = (iso: string) => Date.parse(iso) / 1000;
const range = (ask: RangeAsk, earliest: number | null = null) => resolveRange(ask, NOW, earliest)!;

describe('askedRange', () => {
  it('reads a preset, a custom pair, and nothing as the fallback', () => {
    expect(askedRange({}, '30')).toEqual({ period: '30' });
    expect(askedRange({ period: '1' }, '30')).toEqual({ period: '1' });
    expect(askedRange({ period: 'all' }, '30')).toEqual({ period: 'all' });
    expect(askedRange({ from: '2026-10-01', to: '2026-10-14' }, '30')).toEqual({
      period: 'custom',
      from: '2026-10-01',
      to: '2026-10-14',
    });
    // The dates win over a period sent beside them.
    expect(askedRange({ period: '7', from: '2026-10-01', to: '2026-10-01' }, '30')).toMatchObject({ period: 'custom' });
  });

  it('refuses what does not parse', () => {
    for (const query of [
      { period: '12' },
      { from: '2026-10-01' },
      { to: '2026-10-01' },
      { from: '2026-10-14', to: '2026-10-01' },
      { from: '2026-02-30', to: '2026-03-02' },
      { from: '1 Oct 2026', to: '2026-10-14' },
    ]) {
      expect(askedRange(query, '30'), JSON.stringify(query)).toBeNull();
    }
  });
});

describe('resolveRange', () => {
  it('counts a day preset back from the end of today, by the day', () => {
    expect(range({ period: '7' })).toEqual({
      period: '7',
      start: at('2026-10-16T00:00:00Z'),
      end: at('2026-10-23T00:00:00Z'),
      bucket: 'day',
      bucketSeconds: 86_400,
      buckets: 7,
    });
    expect(range({ period: '90' })).toMatchObject({ bucket: 'day', buckets: 90 });
  });

  it('draws the last 24 hours by the hour, the running one last', () => {
    expect(range({ period: '1' })).toMatchObject({
      start: at('2026-10-21T16:00:00Z'),
      end: at('2026-10-22T16:00:00Z'),
      bucket: 'hour',
      buckets: 24,
    });
  });

  it('draws a year by the week', () => {
    expect(range({ period: '365' })).toMatchObject({
      start: at('2025-10-23T00:00:00Z'),
      bucket: 'week',
      bucketSeconds: 7 * 86_400,
      buckets: 53,
    });
  });

  it('starts all time on the day of the first row, or today when there is none', () => {
    expect(range({ period: 'all' }, at('2026-09-03T08:15:00Z'))).toMatchObject({
      start: at('2026-09-03T00:00:00Z'),
      bucket: 'day',
      buckets: 50,
    });
    expect(range({ period: 'all' })).toMatchObject({ start: at('2026-10-22T00:00:00Z'), bucket: 'hour', buckets: 24 });
  });

  it('takes a custom range as whole UTC days, both ends included', () => {
    expect(range({ period: 'custom', from: '2026-10-01', to: '2026-10-14' })).toMatchObject({
      start: at('2026-10-01T00:00:00Z'),
      end: at('2026-10-15T00:00:00Z'),
      bucket: 'day',
      buckets: 14,
    });
    // One day is its hours.
    expect(range({ period: 'custom', from: '2026-10-05', to: '2026-10-05' })).toMatchObject({ bucket: 'hour', buckets: 24 });
    // Past today it stops at the end of today; after today there is nothing to count.
    expect(range({ period: 'custom', from: '2026-10-20', to: '2026-12-31' })).toMatchObject({
      end: at('2026-10-23T00:00:00Z'),
      bucket: 'day',
      buckets: 3,
    });
    expect(resolveRange({ period: 'custom', from: '2026-10-23', to: '2026-10-30' }, NOW)).toBeNull();
  });

  it('keeps a long range to a readable number of bars', () => {
    const decade = range({ period: 'custom', from: '2016-10-22', to: '2026-10-21' });

    expect(decade.bucket).toBe('week');
    expect(decade.bucketSeconds % (7 * 86_400)).toBe(0);
    expect(decade.buckets).toBeLessThanOrEqual(104);
    expect(decade.start + decade.buckets * decade.bucketSeconds).toBeGreaterThanOrEqual(decade.end);
  });
});
