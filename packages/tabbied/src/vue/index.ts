// Vue 3 and Nuxt: the TabbiedPattern component.
//
//   <script setup>
//   import { TabbiedPattern } from 'tabbied/vue';
//   import { radius } from 'tabbied/patterns';
//   </script>
//
//   <template>
//     <TabbiedPattern :pattern="radius" seed="k9Pz" aspect-ratio="3 / 2" />
//   </template>
//
// Written as a render function in plain TypeScript, so the package builds
// with tsc alone and needs no .vue compiler. The server render (Nuxt, or
// any Vue SSR) is the placeholder: the box, the ground color and the data-*
// config. The controller mounts in onMounted, which runs only in the browser.
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  type PropType,
} from 'vue';
import {
  createPattern,
  type CoverRender,
  type CssDoodleElement,
  type FitMode,
  type OptionValue,
  type PatternConfig,
  type PatternController,
  type PatternDefinition,
  type PatternExportOptions,
  type PatternSvgExportOptions,
  type SvgExportResult,
} from '../core/index.js';
import {
  placeholderAttributes,
  placeholderStyle,
  sameConfig,
  snapshotConfig,
  wrapperConfig,
  type WrapperProps,
} from '../shared/placeholder.js';

/**
 * What a template ref to the component exposes, the same as the React
 * component's handle.
 */
export type TabbiedPatternExposed = {
  /** Re-randomize (or set) the seed, animating designs with CSS transitions. */
  redraw: (seed?: string) => void;
  /** PNG export via css-doodle's element.export(). */
  exportImage: (options?: PatternExportOptions) => Promise<unknown>;
  /**
   * Native SVG export - real vector primitives, no foreignObject. Not
   * available for patterns with `svgExport: false` (see supportsSvgExport).
   */
  exportSvg: (options?: PatternSvgExportOptions) => Promise<SvgExportResult>;
  /** The raw <css-doodle> element, for power users. Null before mount. */
  readonly element: CssDoodleElement | null;
};

/** The props, as the React component names them. */
export type TabbiedPatternProps = Omit<WrapperProps, 'onReady'>;

const lengthProp = [Number, String] as PropType<number | string>;

export const TabbiedPattern = defineComponent({
  name: 'TabbiedPattern',
  props: {
    /**
     * The pattern to render, as a `PatternDefinition`. Import only the presets
     * you use from `tabbied/patterns` so the bundler ships just those.
     */
    pattern: { type: Object as PropType<PatternDefinition>, required: true },
    /** Randomization seed. Omit for a random seed per mount. */
    seed: String,
    /** Active colors, color0 (background) first. */
    palette: Array as PropType<string[]>,
    /** Option values keyed by option id; unset options use authored defaults. */
    options: Object as PropType<Record<string, OptionValue>>,
    /** `grid` (default), `cover` or `fixed`. */
    fit: String as PropType<FitMode>,
    /** fit:"grid" - target cell size in px (default 36). */
    cellSize: Number,
    /** fit:"grid" - 0 (coarse) to 1 (fine); an alternative to cellSize. */
    density: Number,
    // A Boolean prop that is absent is false unless its default says
    // otherwise, and an absent `fill` has to mean "fill", as it does in React.
    fill: { type: Boolean, default: undefined },
    width: lengthProp,
    height: lengthProp,
    maxWidth: lengthProp,
    maxHeight: lengthProp,
    aspectRatio: lengthProp,
    /** `cover` - render resolution override. */
    coverRender: Object as PropType<CoverRender>,
    /** Re-randomize the seed every N ms; skipped under reduced motion. */
    redrawInterval: Number,
    /** Hold `redrawInterval` ticks without tearing down the timer. */
    paused: { type: Boolean, default: false },
    /** true (default): aria-hidden. false: role="img" with ariaLabel. */
    decorative: { type: Boolean, default: true },
    ariaLabel: String,
  },
  emits: {
    /** Once the first pattern render has been committed. */
    ready: () => true,
  },
  setup(props, { emit, expose }) {
    const host = shallowRef<HTMLDivElement | null>(null);
    let controller: PatternController | null = null;
    let current: PatternConfig | null = null;

    // Vue's props object has every declared prop as a key, the absent ones
    // undefined, which is exactly what the controller's config reads as
    // "use the default".
    const configFromProps = (): PatternConfig =>
      wrapperConfig({ ...(props as TabbiedPatternProps), onReady: () => emit('ready') });

    onMounted(() => {
      if (!host.value) return;

      const config = configFromProps();
      current = snapshotConfig(config);
      controller = createPattern(host.value, config);
    });

    // A prop change re-renders the placeholder's attributes, so onUpdated is
    // where it reaches the controller - and only a config that differs from
    // the last one given (see sameConfig).
    onUpdated(() => {
      if (!controller || !current) return;

      const config = configFromProps();

      if (sameConfig(current, config)) return;

      current = snapshotConfig(config);
      controller.update(config);
    });

    onBeforeUnmount(() => {
      controller?.destroy();
      controller = null;
      current = null;
    });

    const exposed: TabbiedPatternExposed = {
      redraw: (seed?: string) => controller?.redraw(seed),
      exportImage: (options?: PatternExportOptions) =>
        controller
          ? controller.exportImage(options)
          : Promise.reject(new Error('[tabbied] exportImage() called before mount')),
      exportSvg: (options?: PatternSvgExportOptions) =>
        controller
          ? controller.exportSvg(options)
          : Promise.reject(new Error('[tabbied] exportSvg() called before mount')),
      get element() {
        return controller?.element ?? null;
      },
    };

    expose(exposed);

    // The div is all Vue renders, and it never has children of its own: the
    // controller appends the <css-doodle> after mount, and a re-render that
    // patches only this element's attributes leaves it alone. A `class` or
    // `style` given to the component falls through and merges onto it.
    return () =>
      h('div', {
        ref: host,
        ...placeholderAttributes(props as TabbiedPatternProps),
        style: placeholderStyle(props as TabbiedPatternProps),
      });
  },
});
