// What every framework wrapper needs besides its own lifecycle: the props a
// wrapper takes, the config they make, the box and the data-* attributes the
// server render paints before the controller mounts, and the comparison that
// keeps a re-render from reaching the controller when nothing changed.
//
// Internal: not an entry point. tabbied/svelte and tabbied/vue are built on
// it; tabbied/react takes `sameConfig` from it and keeps its own placeholder,
// which the packaged templates were derived from.
import {
  patternConfigToAttributes,
  resolveBoxStyle,
  DEFAULT_FIT_MODE,
  DEFAULT_FIXED_SIZE,
  type PatternAttributes,
  type PatternBoxSize,
  type PatternBoxStyle,
  type PatternConfig,
} from '../core/index.js';

/**
 * The props a wrapper takes: the controller's config plus the box props.
 * `width` and `height` are box props here, as they are on the React
 * component; under `fit: "fixed"` their numeric form is also the canvas size.
 */
export type WrapperProps = Omit<PatternConfig, 'width' | 'height'> &
  PatternBoxSize & {
    /**
     * true (default): an aria-hidden decorative image.
     * false: role="img" with ariaLabel (defaults to the pattern name).
     */
    decorative?: boolean;
    ariaLabel?: string;
  };

/** The placeholder's inline style: the box, its ground, and its clipping. */
export type PlaceholderStyle = PatternBoxStyle & {
  backgroundColor?: string;
  position?: string;
  overflow?: string;
};

/**
 * The controller's config from a wrapper's props. fit:"fixed" draws its
 * canvas at an explicit pixel size, so it takes only the numeric form of
 * width/height; a CSS length still sizes the box.
 */
export function wrapperConfig(props: WrapperProps): PatternConfig {
  const {
    fill: _fill,
    width,
    height,
    maxWidth: _maxWidth,
    maxHeight: _maxHeight,
    aspectRatio: _aspectRatio,
    decorative: _decorative,
    ariaLabel: _ariaLabel,
    ...config
  } = props;

  return {
    ...config,
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
  };
}

/**
 * The placeholder's style. The same box the React component draws, on the
 * pattern's background color, plus the clipping the controller gives a
 * measured fit (`position: relative; overflow: hidden`) written up front.
 *
 * The clipping is what makes this safe in a template that re-renders its
 * `style`: the controller sets those two on the host when it mounts, and a
 * framework that writes the whole attribute again on a prop change would
 * otherwise take them away and let the oversized canvas spill out of the box.
 */
export function placeholderStyle(props: WrapperProps): PlaceholderStyle {
  const { fill, width, height, maxWidth, maxHeight, aspectRatio } = props;
  const fit = props.fit ?? DEFAULT_FIT_MODE;
  // fit:"fixed" is the one strategy with an inherent size, so its box
  // defaults to the canvas rather than to filling the parent.
  const box = resolveBoxStyle(
    fit === 'fixed'
      ? {
          fill: false,
          width: width ?? DEFAULT_FIXED_SIZE.width,
          height: height ?? DEFAULT_FIXED_SIZE.height,
          maxWidth,
          maxHeight,
          aspectRatio,
        }
      : { fill, width, height, maxWidth, maxHeight, aspectRatio }
  );
  const background = (props.palette ?? props.pattern.palette)?.[0];

  return {
    ...(background ? { backgroundColor: background } : {}),
    ...box,
    ...(fit === 'fixed' ? {} : { position: 'relative', overflow: 'hidden' }),
  };
}

/** `maxWidth: 720px` -> `max-width: 720px; ...`, for a `style` attribute. */
export function styleToString(style: Record<string, string | undefined>): string {
  return Object.entries(style)
    .filter(([, value]) => value != null && value !== '')
    .map(
      ([name, value]) =>
        `${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value}`
    )
    .join('; ');
}

/**
 * Every attribute the placeholder carries except its style: the config as
 * data-* (inert while a wrapper drives the controller, but what lets
 * hydratePatterns() re-mount the same markup with no framework), and the
 * accessibility attributes.
 */
export function placeholderAttributes(props: WrapperProps): PatternAttributes {
  const attributes = patternConfigToAttributes(wrapperConfig(props));

  if (props.decorative ?? true) {
    attributes['aria-hidden'] = 'true';
  } else {
    attributes.role = 'img';
    attributes['aria-label'] = props.ariaLabel ?? props.pattern.name;
  }

  return attributes;
}

/** The same list, entry for entry. */
const sameList = (a: readonly unknown[] | undefined, b: readonly unknown[] | undefined) =>
  a === b || (a !== undefined && b !== undefined && a.length === b.length && a.every((v, i) => v === b[i]));

/** The same record, key for key. */
const sameRecord = (a: Record<string, unknown> | undefined, b: Record<string, unknown> | undefined) => {
  if (a === b) return true;
  if (!a || !b) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((key) => a[key] === b[key]);
};

/**
 * Whether two configs would build the same pattern; callbacks are not
 * compared. A wrapper forwards a config to the controller only when this is
 * false: the controller's own diff rebuilds the whole css-doodle source to
 * find nothing changed, and a parent that re-renders on hover would pay that
 * for every pattern on every render.
 */
export function sameConfig(a: PatternConfig, b: PatternConfig): boolean {
  return (
    a.pattern === b.pattern &&
    a.seed === b.seed &&
    a.fit === b.fit &&
    a.cellSize === b.cellSize &&
    a.density === b.density &&
    a.width === b.width &&
    a.height === b.height &&
    a.redrawInterval === b.redrawInterval &&
    a.paused === b.paused &&
    sameList(a.palette, b.palette) &&
    sameRecord(a.options as Record<string, unknown> | undefined, b.options as Record<string, unknown> | undefined) &&
    sameRecord(
      a.coverRender as unknown as Record<string, unknown> | undefined,
      b.coverRender as unknown as Record<string, unknown> | undefined
    )
  );
}

/**
 * A copy that a later in-place edit of the caller's arrays and records cannot
 * reach, so the next comparison sees what was actually given to the
 * controller. Svelte and Vue both make mutating a prop's array the natural
 * way to change it, which `===` on the same array would never notice.
 */
export function snapshotConfig(config: PatternConfig): PatternConfig {
  return {
    ...config,
    palette: config.palette ? [...config.palette] : undefined,
    options: config.options ? { ...config.options } : undefined,
    coverRender: config.coverRender ? { ...config.coverRender } : undefined,
  };
}
