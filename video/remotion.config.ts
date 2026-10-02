// Remotion's CLI config. Rendering needs a Chromium: by default Remotion
// downloads its own headless shell; set TABBIED_CHROMIUM (the same variable
// the `tabbied` CLI reads) to use one that is already installed.
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');

if (process.env.TABBIED_CHROMIUM) {
  Config.setBrowserExecutable(process.env.TABBIED_CHROMIUM);
}
