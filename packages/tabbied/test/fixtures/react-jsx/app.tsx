// Compiled by test/react-jsx.test.mjs: <tabbied-pattern> in a React app's
// TSX once tabbied/element/react-jsx is imported, as the web component docs
// show it. Nothing here runs.
import 'tabbied/element';
import 'tabbied/element/react-jsx';
import { radius } from 'tabbied/patterns';

export function Hero() {
  return (
    <>
      <tabbied-pattern
        pattern="radius"
        seed="k9Pz"
        palette="#0B1020, #3E8BFF"
        options="frequency: 0.8"
        density={0.5}
        style={{ display: 'block', aspectRatio: '3 / 2', background: '#0B1020' }}
      />
      <tabbied-pattern pattern={radius} palette={['#0B1020', '#3E8BFF']} fit="cover" paused />
    </>
  );
}

// A misspelled value is still caught.
// @ts-expect-error fit is grid, cover or fixed
export const wrong = <tabbied-pattern pattern="radius" fit="stretch" />;
