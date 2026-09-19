/**
 * Split a list on a separator at paren depth zero, so a CSS colour that
 * carries the separator inside its own parentheses - `rgb(0, 0, 0)` - stays
 * one item. Shared by the declarative attributes (hydrate.ts) and the CLI's
 * `--palette`; the SVG exporter keeps its own copy because that module
 * carries no imports at all.
 */
export const splitTopLevel = (value: string, separator: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const char of value) {
    if (char === '(') depth += 1;
    else if (char === ')') depth = Math.max(0, depth - 1);

    if (char === separator && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  parts.push(current);

  return parts.map((part) => part.trim()).filter((part) => part.length > 0);
};
