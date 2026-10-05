// Types only: <tabbied-pattern> in React's JSX, for a TypeScript app that
// uses the tag directly (React 19 passes props to a custom element as
// properties, so a definition or an array works as well as a string).
//
//   import 'tabbied/element';           // defines the element
//   import 'tabbied/element/react-jsx'; // types the tag in JSX
//
// Without it, `<tabbied-pattern>` in a .tsx file is "Property
// 'tabbied-pattern' does not exist on type 'JSX.IntrinsicElements'". The
// attribute names are the element's (kebab-case, as in HTML); the compiled
// module is empty, so importing it costs nothing at runtime.
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { FitMode, OptionValue, PatternDefinition } from '../core/types.js';
import type { TabbiedPatternElement } from './index.js';

export type TabbiedPatternJsxProps = DetailedHTMLProps<
  HTMLAttributes<TabbiedPatternElement>,
  TabbiedPatternElement
> & {
  /** A slug the element loads, or a definition (set as a property). */
  pattern?: string | PatternDefinition;
  seed?: string;
  /** "#0B1020, #3E8BFF", or an array (set as a property). */
  palette?: string | string[];
  /** "frequency: 0.8; shape: arc", or an object (set as a property). */
  options?: string | Record<string, OptionValue>;
  fit?: FitMode;
  density?: number | string;
  'cell-size'?: number | string;
  width?: number | string;
  height?: number | string;
  /** "800x800": the render size under fit="cover". */
  'cover-render'?: string;
  'redraw-interval'?: number | string;
  paused?: boolean;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tabbied-pattern': TabbiedPatternJsxProps;
    }
  }
}
