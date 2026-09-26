import type { CSSProperties, ReactNode } from 'react';
import { tokenize, type TokenKind } from '../../components/react-docs-page/highlight';
import { C, F } from './brand';

// A browser window around a screenshot: the product scenes show the site as a
// person meets it, in a window, not as a bare image.
export function BrowserFrame({
  url,
  width,
  height,
  children,
  style,
}: {
  url: string;
  width: number;
  /** Height of the page area, not counting the bar. */
  height: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const bar = 46;
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height: height + bar,
        borderRadius: 16,
        overflow: 'hidden',
        background: C.card,
        boxShadow: '0 40px 120px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '0 18px',
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.14)' }} />
        ))}
        <span
          style={{
            marginLeft: 18,
            flex: 1,
            maxWidth: 520,
            height: 28,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            color: '#9a9ea8',
            fontFamily: F.mono,
            fontSize: 15,
            lineHeight: '28px',
            paddingLeft: 14,
          }}
        >
          {url}
        </span>
      </div>
      <div style={{ position: 'relative', width, height, overflow: 'hidden', background: '#fff' }}>
        {children}
      </div>
    </div>
  );
}

// A pointer, and the ring a click leaves (`press` runs 0 -> 1 after a click).
export function Pointer({ x, y, press }: { x: number; y: number; press: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      {press > 0 && press < 1 ? (
        <span
          style={{
            position: 'absolute',
            left: -26,
            top: -26,
            width: 52,
            height: 52,
            borderRadius: 26,
            border: `3px solid ${C.cyan}`,
            opacity: 1 - press,
            transform: `scale(${0.4 + press})`,
          }}
        />
      ) : null}
      <svg width="30" height="38" viewBox="0 0 15 19" style={{ position: 'absolute', left: -3, top: -2 }}>
        <path
          d="M1 1 L1 15.5 L4.8 12.2 L7.4 18 L9.9 16.9 L7.4 11.2 L12.6 11.2 Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// The docs page's code panel (components/react-docs-page), colored by the same
// tokenizer, showing the first `chars` characters with a caret after them.
const TOKEN_COLOR: Record<TokenKind, string> = {
  plain: '#dadde4',
  comment: '#80838c',
  string: C.mint,
  keyword: C.cyan,
  tag: C.fg,
};

export function CodePanel({
  title,
  code,
  chars,
  caret,
  style,
}: {
  title: string;
  code: string;
  chars: number;
  caret: boolean;
  style?: CSSProperties;
}) {
  const tokens = tokenize(code);
  let left = chars;
  const shown = [];
  for (const [i, token] of tokens.entries()) {
    if (left <= 0) break;
    const text = token.text.slice(0, left);
    left -= text.length;
    shown.push(
      <span key={i} style={{ color: TOKEN_COLOR[token.kind] }}>
        {text}
      </span>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: 18,
        overflow: 'hidden',
        background: C.bg,
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 30px 90px rgba(0, 0, 0, 0.5)',
        ...style,
      }}
    >
      <div
        style={{
          height: 54,
          display: 'flex',
          alignItems: 'center',
          padding: '0 26px',
          background: C.card,
          borderBottom: `1px solid ${C.rule}`,
          fontFamily: F.mono,
          fontSize: 16,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#8d919b',
        }}
      >
        {title}
      </div>
      <pre
        style={{
          margin: 0,
          padding: '28px 32px',
          fontFamily: F.mono,
          fontSize: 28,
          lineHeight: 1.7,
          whiteSpace: 'pre',
        }}
      >
        {shown}
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: '1.1em',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            background: C.cyan,
            opacity: caret ? 1 : 0,
          }}
        />
      </pre>
    </div>
  );
}
