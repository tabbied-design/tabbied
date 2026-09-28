import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { tokenize } from '../../../components/react-docs-page/highlight';
import { C, F } from '../brand';
import { TOKEN_COLOR } from '../ui';
import { Slide } from './kit';

// The install line typed, then the component it gives you, colored by the
// docs page's own tokenizer.
const COMMAND = 'npm install tabbied';
const USAGE = '<TabbiedPattern pattern={radius} />';
export const INSTALL_FRAMES = 78;

export function Install() {
  const frame = useCurrentFrame();
  const typed = COMMAND.slice(0, Math.max(0, Math.floor((frame - 4) * 1.1)));
  const done = typed.length === COMMAND.length;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 360, top: 380, fontFamily: F.mono, color: C.fg }}>
        <div style={{ fontSize: 96, lineHeight: 1.1, whiteSpace: 'pre' }}>
          <span style={{ color: C.dim }}>$ </span>
          {typed}
          <span
            style={{
              display: 'inline-block',
              width: 50,
              height: 96,
              marginLeft: 6,
              verticalAlign: 'text-bottom',
              background: C.mint,
              opacity: !done || Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
            }}
          />
        </div>
        <Slide start={30} style={{ marginTop: 44 }}>
          <div style={{ fontSize: 52, whiteSpace: 'pre' }}>
            {tokenize(USAGE).map((token, i) => (
              <span key={i} style={{ color: TOKEN_COLOR[token.kind] }}>
                {token.text}
              </span>
            ))}
          </div>
        </Slide>
      </div>
    </AbsoluteFill>
  );
}
