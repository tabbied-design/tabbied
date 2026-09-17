// A small tokenizer for the code samples on the docs page: comments, strings,
// a handful of keywords and JSX tag names, and everything else left as it is.
//
// It runs at build time over samples the page authors itself, never over
// input, so it can afford to be conservative: a token it is not sure of stays
// plain, which reads as unhighlighted rather than wrong. A real highlighter
// would bring a grammar and a bundle to colour a dozen snippets.
//
// The scan is sequential, and that is what keeps it right: an apostrophe in
// a comment ("the box's shape") is never mistaken for a string opening,
// because the comment consumed the line first, and a `//` inside a string is
// never a comment because the string consumed it.

export type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'tag';

export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  'import', 'export', 'default', 'from', 'function', 'return', 'const', 'let',
  'var', 'async', 'await', 'new', 'if', 'else', 'true', 'false', 'null', 'type',
]);

const WORD = /[\w$]/;

const WORD_START = /[A-Za-z_$]/;

/** `<Name`, `</Name`, `<>` or `</>`: the opening of a JSX tag. */
const TAG = /^<\/?(?:[A-Za-z][\w.]*|>)/;

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let plainStart = 0;
  let i = 0;

  const emit = (kind: TokenKind, end: number) => {
    if (i > plainStart) {
      tokens.push({ kind: 'plain', text: code.slice(plainStart, i) });
    }
    tokens.push({ kind, text: code.slice(i, end) });
    i = end;
    plainStart = end;
  };

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    if (ch === '/' && next === '/') {
      const eol = code.indexOf('\n', i);
      emit('comment', eol === -1 ? code.length : eol);
      continue;
    }

    if (ch === '/' && next === '*') {
      const close = code.indexOf('*/', i + 2);
      emit('comment', close === -1 ? code.length : close + 2);
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      let end = i + 1;

      while (end < code.length) {
        const c = code[end];

        if (c === '\\') {
          end += 2;
          continue;
        }

        if (c === ch) {
          end += 1;
          break;
        }

        // An unescaped line break ends a single-line string, so a sample with
        // a missing quote cannot swallow the rest of itself.
        if (c === '\n' && ch !== '`') {
          break;
        }

        end += 1;
      }

      emit('string', Math.min(end, code.length));
      continue;
    }

    if (ch === '<') {
      const match = TAG.exec(code.slice(i));

      if (match) {
        emit('tag', i + match[0].length);
        continue;
      }
    }

    const previous = i > 0 ? code[i - 1] : '';

    if (WORD_START.test(ch) && !WORD.test(previous) && previous !== '.') {
      let end = i + 1;

      while (end < code.length && WORD.test(code[end])) {
        end += 1;
      }

      const word = code.slice(i, end);
      // `type: 'x'` is an object key and `import type` a keyword: the colon
      // after the word decides.
      const follows = /^\s*(\S)/.exec(code.slice(end))?.[1];

      if (KEYWORDS.has(word) && follows !== ':') {
        emit('keyword', end);
        continue;
      }

      i = end;
      continue;
    }

    i += 1;
  }

  if (plainStart < code.length) {
    tokens.push({ kind: 'plain', text: code.slice(plainStart) });
  }

  return tokens;
}
