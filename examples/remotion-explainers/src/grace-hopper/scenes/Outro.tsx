import {
  bracket,
  capstan,
  cascade,
  coil,
  epicentre,
  flux,
  foliage,
  frond,
  isometry,
  pivot,
  raking,
  spark,
  sunsetrings,
  torsion,
  windowpane,
  ziggurat,
} from 'tabbied/patterns';
import { Montage } from '../../components/Montage';
import { MONTAGE } from '../palettes';

const DESIGNS = [
  windowpane, coil, isometry, epicentre,
  foliage, torsion, cascade, flux,
  bracket, capstan, raking, ziggurat,
  spark, sunsetrings, frond, pivot,
];

// The 1906 scene's pattern, written the way that scene writes it.
const SNIPPET = [
  ['const ', 'frame', ' = useCurrentFrame();'],
  ['<TabbiedPattern pattern={', 'gyre', '} palette={', 'GASLIGHT', '}'],
  ['  seed={`1906-${', 'Math.floor(frame / 15)', '}`} />'],
];

export const Outro: React.FC = () => (
  <Montage
    designs={DESIGNS}
    palettes={MONTAGE}
    snippet={SNIPPET}
    stats="25 designs / 21 palettes / 8 GPT Image cut-outs"
    accent="#3fffb2"
    highlight="#ff3d8b"
  />
);
