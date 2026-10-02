import type { CSSProperties } from 'react';
import { Img, staticFile } from 'remotion';

const channels = (hex: string) => {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((c) => (c / 255).toFixed(4));
};

/**
 * A cut-out recolored into the scene's palette.
 *
 * The images are generated in black and white, so one file serves every
 * palette: an SVG filter takes each pixel's lightness and maps it along
 * `tones`, darkest first (two colors for a duotone, three for a tritone).
 * Alpha passes through untouched, so the transparent background stays
 * transparent and the pattern shows around the subject.
 */
export const Tinted: React.FC<{
  src: string;
  tones: string[];
  style?: CSSProperties;
}> = ({ src, tones, style }) => {
  const id = `tint-${tones.map((tone) => tone.slice(1)).join('-')}`;
  const table = (index: number) => tones.map((tone) => channels(tone)[index]).join(' ');

  return (
    <>
      <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={table(0)} />
            <feFuncG type="table" tableValues={table(1)} />
            <feFuncB type="table" tableValues={table(2)} />
          </feComponentTransfer>
        </filter>
      </svg>
      <Img
        src={staticFile(`images/${src}.webp`)}
        style={{ ...style, filter: `url(#${id}) ${style?.filter ?? ''}` }}
      />
    </>
  );
};
