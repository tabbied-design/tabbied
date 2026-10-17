'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch, ApiError } from 'lib/apiFetch';

/** One fetch, three states, a reload - what every admin panel needs and nothing else. */
export function useAdminData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    setError(null);
    apiFetch<T>(path)
      .then((body) => {
        if (live) setData(body);
      })
      .catch((cause) => {
        if (live) setError(cause instanceof ApiError ? cause.message : 'Could not load.');
      });
    return () => {
      live = false;
    };
  }, [path, tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  return { data, error, reload };
}

export const when = (value: string | Date) =>
  new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export const money = (value: number) => `$${value.toFixed(value < 1 ? 3 : 2)}`;

/**
 * A CSV cell: quoted when it has to be, doubled quotes inside. Names and
 * addresses are what people typed, and a spreadsheet runs a cell that starts
 * like a formula (`=HYPERLINK(...)`, `@SUM`, `+cmd|...`) when the file is
 * opened; a leading apostrophe is how every spreadsheet is told "text". A
 * carriage return breaks a row as surely as a newline, so it quotes too.
 */
export const cell = (value: unknown) => {
  const raw = value === null || value === undefined ? '' : String(value);
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** Lines of CSV, already joined by cell, as a file the browser saves. */
export function saveCsv(name: string, lines: string[]) {
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  // Revoking synchronously has cancelled the download in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
