import {
  apse,
  bauhaus,
  bothcut,
  caltrop,
  contourlines,
  crosslattice,
  curl,
  diamondconfetti,
  evolute,
  horizonbands,
  protractor,
  recession,
  seamband,
  spinningrings,
  squarelabyrinth,
  teardropleaves,
} from 'tabbied/patterns';
import { Montage } from '../../components/Montage';
import { MONTAGE } from '../palettes';

const DESIGNS = [
  horizonbands, curl, crosslattice, apse,
  protractor, seamband, squarelabyrinth, caltrop,
  evolute, bothcut, diamondconfetti, bauhaus,
  teardropleaves, recession, spinningrings, contourlines,
];

// The title scene's pattern, written the way that scene writes it.
const SNIPPET = [
  ['const ', 'frame', ' = useCurrentFrame();'],
  ['<TabbiedPattern pattern={', 'lobe', '} palette={', 'MARMOT', '}'],
  ['  seed={`marmot-${', 'Math.floor(frame / 12)', '}`} />'],
];

export const Outro: React.FC = () => (
  <Montage
    designs={DESIGNS}
    palettes={MONTAGE}
    snippet={SNIPPET}
    stats="26 designs / 22 palettes / 11 GPT Image cut-outs"
    accent="#a7c957"
    highlight="#f4a259"
  />
);
