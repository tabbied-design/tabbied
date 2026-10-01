import {
  blossom,
  crescendo,
  disque,
  eclipserings,
  isocube,
  lagoon,
  moire,
  moleskin,
  neon,
  peppering,
  ringfield,
  ripplering,
  spiralrosette,
  streaking,
  truchetrings,
  wavelet,
} from 'tabbied/patterns';
import { Montage } from '../../components/Montage';
import { MONTAGE } from '../palettes';

const DESIGNS = [
  eclipserings, truchetrings, ringfield, disque,
  isocube, wavelet, blossom, moire,
  ripplering, spiralrosette, streaking, lagoon,
  crescendo, neon, peppering, moleskin,
];

// The title scene's pattern, written the way that scene writes it.
const SNIPPET = [
  ['const ', 'frame', ' = useCurrentFrame();'],
  ['<TabbiedPattern pattern={', 'goldencoil', '} palette={', 'EMERALD', '}'],
  ['  seed={`swipe-${', 'Math.floor(frame / 12)', '}`} />'],
];

export const Outro: React.FC = () => (
  <Montage
    designs={DESIGNS}
    palettes={MONTAGE}
    snippet={SNIPPET}
    stats="31 designs / 23 palettes / 13 GPT Image cut-outs"
    accent="#0bd18a"
    highlight="#ffd23e"
  />
);
