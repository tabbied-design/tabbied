import type { CSSProperties } from 'react';
import styles from './PaletteListRow.module.css';

/**
 * "Mixed": the random spread's swatches, drawn where a palette row draws its
 * inks. Four chips, each split corner to corner between two colors from two
 * different palettes in the spread, so the row says "several palettes"
 * rather than naming one. The chips are the rows' own (PaletteListRow), so
 * the option lines up with the palettes under it.
 */
export function mixedPairs(palettes: readonly (readonly string[] | undefined)[]): [string, string][] {
  const picks: string[] = [];
  const seen = new Set<string>();

  for (const colors of palettes) {
    if (!colors || picks.length >= 4) continue;
    const key = colors.join();
    if (seen.has(key)) continue;
    seen.add(key);
    const inks = colors.slice(1);
    picks.push(inks[(picks.length + 1) % Math.max(1, inks.length)] ?? colors[0]);
  }

  while (picks.length < 4) picks.push(['#c23bd4', '#3eecff', '#3fffb2', '#7c5cff'][picks.length]);

  return picks.map((color, index) => [color, picks[(index + 2) % picks.length]]);
}

export default function MixedSwatches({ pairs, className }: { pairs: [string, string][]; className?: string }) {
  return (
    <span className={className ?? styles.chips} aria-hidden="true">
      {pairs.map(([a, b], index) => (
        <span
          key={index}
          style={{ background: `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)` } as CSSProperties}
        />
      ))}
    </span>
  );
}
