// Svelte and SvelteKit: an action that mounts the pattern, and the attributes
// that let the server render draw its box first.
//
//   <script>
//     import { tabbied, tabbiedAttributes } from 'tabbied/svelte';
//     import { radius } from 'tabbied/patterns';
//
//     const props = { pattern: radius, seed: 'k9Pz', aspectRatio: '3 / 2' };
//   </script>
//
//   <div {...tabbiedAttributes(props)} use:tabbied={props}></div>
//
// An action runs only in the browser, so on its own it leaves a SvelteKit
// server render with an unsized, empty <div> and the page shifts when the
// pattern mounts. tabbiedAttributes() is pure and runs on the server: the box,
// the ground color and the data-* config, the same placeholder the React
// component renders. The action then mounts into it.
//
// Nothing here imports Svelte. An action is a function that returns
// { update, destroy }, which works the same in Svelte 4 and 5, so the package
// takes no Svelte dependency and needs no Svelte compiler to build.
import {
  createPattern,
  type PatternConfig,
  type PatternController,
} from '../core/index.js';
import {
  placeholderAttributes,
  placeholderStyle,
  sameConfig,
  snapshotConfig,
  styleToString,
  wrapperConfig,
  type WrapperProps,
} from '../shared/placeholder.js';

export type TabbiedProps = WrapperProps & {
  /**
   * More inline style, written after the box's own, so it can override any
   * of it. Put a pattern's style here rather than in a `style` attribute
   * beside the spread: Svelte keeps whichever comes last, and the box's
   * clipping is in the spread.
   */
  style?: string;
};

/** The action's return, as Svelte 4 and 5 both read it. */
export type TabbiedActionReturn = {
  update(props: TabbiedProps): void;
  destroy(): void;
};

// The controller each node is driven by, for patternController(). Weak, so a
// node Svelte has dropped stays collectable.
const controllers = new WeakMap<Element, PatternController>();

/**
 * The placeholder's attributes, to spread onto the element the action is on:
 * `style` (the box from the box props, the pattern's background color, and
 * the clipping a measured fit needs), the config as `data-*`, and
 * `aria-hidden` (or `role="img"` and `aria-label` when `decorative` is
 * false). Pure, so it runs in a SvelteKit server render and the box is the
 * right size before any script loads.
 */
export function tabbiedAttributes(props: TabbiedProps): Record<string, string> {
  const ownStyle = styleToString(placeholderStyle(props));
  const style = props.style ? `${ownStyle}; ${props.style}` : ownStyle;

  return { ...placeholderAttributes(props), style };
}

/**
 * Mounts the pattern into the node, forwards changed props to it, and tears
 * it down when the node goes. Pass the same object given to
 * tabbiedAttributes(); the box props and `style` are read from the
 * attributes, the rest drives the controller.
 */
export function tabbied(node: HTMLElement, props: TabbiedProps): TabbiedActionReturn {
  let current: PatternConfig = snapshotConfig(wrapperConfig(props));
  const controller = createPattern(node, current);

  controllers.set(node, controller);

  return {
    update(next: TabbiedProps) {
      const config = wrapperConfig(next);

      if (sameConfig(current, config)) return;

      current = snapshotConfig(config);
      controller.update(config);
    },
    destroy() {
      controllers.delete(node);
      controller.destroy();
    },
  };
}

/**
 * The controller driving a node the action is on, for `redraw()`,
 * `exportImage()` and `exportSvg()`. Null before the action has run (on the
 * server, say) and after it is destroyed.
 *
 * ```svelte
 * <div bind:this={host} {...tabbiedAttributes(props)} use:tabbied={props}></div>
 * <button onclick={() => patternController(host)?.redraw()}>Redraw</button>
 * ```
 */
export function patternController(node: Element | null | undefined): PatternController | null {
  return (node && controllers.get(node)) ?? null;
}
