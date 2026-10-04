// <tabbied-pattern>: the patterns as a custom element, for plain HTML and for
// any framework that renders HTML.
//
//   <script type="module" src="https://cdn.jsdelivr.net/npm/tabbied@0.8/dist/element/tabbied-element.js"></script>
//
//   <tabbied-pattern pattern="radius" seed="k9Pz" palette="#0B1020, #3E8BFF"
//     style="display: block; aspect-ratio: 3 / 2; background: #0B1020"></tabbied-pattern>
//
// Two things a custom element does not get for free, and how this one gets
// them:
//
// - **A box before any script runs.** There is no server render to draw a
//   placeholder, but there does not need to be one: until it is defined,
//   <tabbied-pattern> is an unknown element, and its inline style already
//   applies. Size and ground color go in `style`, which the editor's snippet
//   writes, and every framework's server render passes through as written.
// - **A design by slug without the catalog.** Each design is also published
//   as its own module, `dist/patterns/<slug>.js`, with no imports in it. On
//   a CDN the element loads just the one it names, relative to its own URL.
//   In a bundled app it cannot know where those files ended up, so the app
//   registers what it uses - definePatterns({ radius }) - or sets the
//   `pattern` property to the definition itself; the bundler then ships
//   exactly those.
//
// The attributes are the names hydratePatterns() reads, without `data-`,
// and the same parser reads them (core/attributes.ts).
import {
  createPattern,
  type PatternConfig,
  type PatternController,
  type PatternDefinition,
  type PatternExportOptions,
  type PatternSvgExportOptions,
  type OptionValue,
  type SvgExportResult,
} from '../core/index.js';
import { readPatternConfig } from '../core/attributes.js';
import { sameConfig, snapshotConfig } from '../shared/placeholder.js';

/** The element's tag. */
export const TAG_NAME = 'tabbied-pattern';

/** The attributes the element reads; a change to any of them updates it. */
export const OBSERVED_ATTRIBUTES = [
  'pattern',
  'seed',
  'palette',
  'options',
  'fit',
  'cell-size',
  'density',
  'width',
  'height',
  'cover-render',
  'redraw-interval',
  'paused',
] as const;

// ---- where designs come from ---------------------------------------------

const registry = new Map<string, PatternDefinition>();
const loading = new Map<string, Promise<PatternDefinition>>();

// String arithmetic, not `new URL('../patterns/', import.meta.url)`, on
// purpose: Vite, webpack and Turbopack all treat that shape as a reference to
// a file to bundle, Turbopack even through a variable, and fail the build on
// a folder (or, worse, would pull in every design). This is a plain string
// the browser resolves, against wherever the module is actually served:
// `.../dist/element/x.js` -> `.../dist/patterns/`.
const defaultPatternsBase = () =>
  String(import.meta.url)
    .replace(/[?#].*$/, '')
    .replace(/[^/]*$/, '')
    .replace(/[^/]+\/$/, '') + 'patterns/';

let patternsBase: string | null = null;

// A slug becomes part of a URL, so only the shape the catalog uses is
// fetched: no slashes, dots or query.
const SLUG = /^[a-z][a-z0-9]*$/;

/**
 * Register designs by slug, for an app whose bundler should ship only these:
 *
 * ```js
 * import { definePatterns } from 'tabbied/element';
 * import { radius, windowpane } from 'tabbied/patterns';
 *
 * definePatterns({ radius, windowpane });
 * ```
 *
 * A registered slug is used as it is, with nothing fetched. Elements already
 * on the page that name it are drawn.
 */
export function definePatterns(
  patterns: Record<string, PatternDefinition> | readonly PatternDefinition[]
): void {
  const list = Array.isArray(patterns)
    ? patterns
    : Object.values(patterns as Record<string, PatternDefinition>);

  for (const definition of list) registry.set(definition.slug, definition);

  if (typeof document === 'undefined') return;

  for (const element of document.querySelectorAll<TabbiedPatternElement>(TAG_NAME)) {
    if (element instanceof TabbiedPatternElement) element.refresh();
  }
}

/**
 * Where unregistered slugs are loaded from: a folder holding `<slug>.js`
 * files, as the package's `dist/patterns/` does. Defaults to the one beside
 * this module, which is right for a CDN or a copy of the package served as
 * it is; set it when the files live somewhere else. A relative URL is read
 * against the page.
 */
export function setPatternsBase(url: string | URL): void {
  const href = new URL(url, typeof document === 'undefined' ? undefined : document.baseURI).href;

  // A folder: `/designs` and `/designs/` both mean the files inside it.
  patternsBase = href.endsWith('/') ? href : `${href}/`;
}

const designFor = (slug: string): PatternDefinition | Promise<PatternDefinition> => {
  const registered = registry.get(slug);
  if (registered) return registered;

  let pending = loading.get(slug);

  if (!pending) {
    if (!SLUG.test(slug)) {
      return Promise.reject(new Error(`[tabbied] "${slug}" is not a design slug`));
    }

    const href = `${patternsBase ?? defaultPatternsBase()}${slug}.js`;

    pending = (
      import(/* @vite-ignore */ /* webpackIgnore: true */ href) as Promise<{
        default?: PatternDefinition;
      }>
    ).then(
      (module) => {
        const definition = module.default;

        if (!definition || definition.slug !== slug) {
          throw new Error(`[tabbied] ${href} is not the "${slug}" design`);
        }

        registry.set(slug, definition);
        return definition;
      },
      () => {
        // A failed import is not cached, so a slug defined later, or a
        // corrected base, can still be loaded.
        loading.delete(slug);
        throw new Error(
          `[tabbied] could not load the "${slug}" design from ${href}. ` +
            `Check the slug, or, in a bundled app, register it first: ` +
            `definePatterns({ ${slug} }) ` +
            `with the design imported from 'tabbied/patterns'.`
        );
      }
    );
    loading.set(slug, pending);
  }

  return pending;
};

// ---- the default box ------------------------------------------------------

// Zero specificity, so any rule of the page's wins. `block` is what lets a
// width and an aspect-ratio apply; the clipping is what a measured fit draws
// into (the controller sets the same two inline when it mounts). A fixed fit
// is a canvas of its own size, so it sits inline and is not clipped.
const DEFAULT_STYLE = `:where(${TAG_NAME}){display:block;position:relative;overflow:hidden}
:where(${TAG_NAME}[fit="fixed"]){display:inline-block;overflow:visible}`;

let styleInjected = false;

const injectDefaultStyle = () => {
  if (styleInjected || typeof document === 'undefined') return;

  styleInjected = true;
  const style = document.createElement('style');
  style.dataset.tabbied = 'element';
  style.textContent = DEFAULT_STYLE;
  document.head.prepend(style);
};

// ---- the element ----------------------------------------------------------

// On a server there is no HTMLElement, and importing this module must still
// work there (Nuxt, SvelteKit and Astro all import it during a server render).
const BaseElement = (
  typeof HTMLElement === 'undefined' ? class {} : HTMLElement
) as typeof HTMLElement;

// A config with every key present: the controller merges an update into what
// it has, so an attribute that was removed has to be said out loud as
// undefined, which is "use the design's default".
const fullConfig = (config: PatternConfig): PatternConfig => ({
  seed: undefined,
  palette: undefined,
  options: undefined,
  fit: undefined,
  cellSize: undefined,
  density: undefined,
  width: undefined,
  height: undefined,
  coverRender: undefined,
  redrawInterval: undefined,
  paused: undefined,
  ...config,
});

export class TabbiedPatternElement extends BaseElement {
  static get observedAttributes(): readonly string[] {
    return OBSERVED_ATTRIBUTES;
  }

  #controller: PatternController | null = null;
  #current: PatternConfig | null = null;
  #patternProperty: PatternDefinition | null = null;
  #paletteProperty: string[] | undefined;
  #optionsProperty: Record<string, OptionValue> | undefined;
  // Bumped by every sync, so a design that finishes loading after a newer
  // change (or after the element left the page) is dropped.
  #generation = 0;
  #syncQueued = false;
  #leaving = false;

  /**
   * The design: a slug (the `pattern` attribute) or a definition object.
   * Setting an object draws it with nothing fetched or registered.
   */
  get pattern(): PatternDefinition | string | null {
    return this.#patternProperty ?? this.getAttribute('pattern');
  }

  set pattern(value: PatternDefinition | string | null) {
    if (typeof value === 'string') {
      this.#patternProperty = null;
      this.setAttribute('pattern', value);
    } else {
      this.#patternProperty = value;
      this.#queueSync();
    }
  }

  /** Colors, background first. As a property it takes an array. */
  get palette(): string[] | undefined {
    return this.#paletteProperty ?? this.#current?.palette;
  }

  set palette(value: string[] | string | undefined) {
    if (typeof value === 'string') {
      this.#paletteProperty = undefined;
      this.setAttribute('palette', value);
    } else {
      this.#paletteProperty = value ? [...value] : undefined;
      this.#queueSync();
    }
  }

  /** Option values by id. As a property it takes an object. */
  get options(): Record<string, OptionValue> | undefined {
    return this.#optionsProperty ?? this.#current?.options;
  }

  set options(value: Record<string, OptionValue> | string | undefined) {
    if (typeof value === 'string') {
      this.#optionsProperty = undefined;
      this.setAttribute('options', value);
    } else {
      this.#optionsProperty = value ? { ...value } : undefined;
      this.#queueSync();
    }
  }

  /** The controller drawing this element, or null before it has mounted. */
  get controller(): PatternController | null {
    return this.#controller;
  }

  /** Re-randomize (or set) the seed, animating designs with CSS transitions. */
  redraw(seed?: string): void {
    this.#controller?.redraw(seed);
  }

  /** PNG export via css-doodle's element.export(). */
  exportImage(options?: PatternExportOptions): Promise<unknown> {
    return this.#controller
      ? this.#controller.exportImage(options)
      : Promise.reject(new Error('[tabbied] exportImage() called before the pattern mounted'));
  }

  /** Native SVG export; not available for designs with `svgExport: false`. */
  exportSvg(options?: PatternSvgExportOptions): Promise<SvgExportResult> {
    return this.#controller
      ? this.#controller.exportSvg(options)
      : Promise.reject(new Error('[tabbied] exportSvg() called before the pattern mounted'));
  }

  /** Read the attributes again and draw what they say now. */
  refresh(): void {
    this.#queueSync();
  }

  connectedCallback(): void {
    this.#leaving = false;
    injectDefaultStyle();

    // Decorative unless the page names it. A label makes it an image.
    if (this.hasAttribute('aria-label')) {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'img');
    } else if (!this.hasAttribute('role') && !this.hasAttribute('aria-hidden')) {
      this.setAttribute('aria-hidden', 'true');
    }

    this.#queueSync();
  }

  disconnectedCallback(): void {
    // A move (a list reordered, a framework re-parenting) disconnects and
    // reconnects in the same task; only an element still out of the page a
    // microtask later is torn down, so a move does not rebuild the pattern.
    this.#leaving = true;
    queueMicrotask(() => {
      if (this.#leaving && !this.isConnected) this.#teardown();
    });
  }

  attributeChangedCallback(): void {
    // Upgrading an element with five attributes calls this five times before
    // it is connected; the queued sync reads them all once.
    if (this.isConnected) this.#queueSync();
  }

  #queueSync(): void {
    if (this.#syncQueued) return;

    this.#syncQueued = true;
    queueMicrotask(() => {
      this.#syncQueued = false;
      if (this.isConnected) void this.#sync();
    });
  }

  async #sync(): Promise<void> {
    const generation = ++this.#generation;
    const slug = this.getAttribute('pattern')?.trim();
    let definition = this.#patternProperty;

    if (!definition) {
      if (!slug) return;

      try {
        const found = designFor(slug);
        definition = found instanceof Promise ? await found : found;
      } catch (error) {
        if (generation !== this.#generation) return;
        this.#fail(error as Error);
        return;
      }
    }

    if (generation !== this.#generation || !this.isConnected) return;

    const config = fullConfig(readPatternConfig((name) => this.getAttribute(name), definition));
    if (this.#paletteProperty) config.palette = this.#paletteProperty;
    if (this.#optionsProperty) config.options = this.#optionsProperty;

    if (!this.#controller) {
      this.#current = snapshotConfig(config);
      this.#controller = createPattern(this, {
        ...config,
        onReady: () => this.dispatchEvent(new Event('ready')),
      });
      return;
    }

    if (this.#current && sameConfig(this.#current, config)) return;

    this.#current = snapshotConfig(config);
    this.#controller.update(config);
  }

  #fail(error: Error): void {
    console.warn(error.message);
    this.dispatchEvent(new CustomEvent('error', { detail: error }));
  }

  #teardown(): void {
    this.#generation += 1;
    this.#controller?.destroy();
    this.#controller = null;
    this.#current = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tabbied-pattern': TabbiedPatternElement;
  }
}

// Importing this module defines the element, once, wherever there is a
// registry to define it in.
if (typeof customElements !== 'undefined' && !customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, TabbiedPatternElement);
}
