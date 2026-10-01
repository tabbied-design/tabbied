// Settings for `remotion render` and `remotion studio`. The composition
// itself (size, length, frame rate) is declared in src/Root.tsx.
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
