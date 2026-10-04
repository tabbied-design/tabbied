'use client';

import { useEffect, useRef } from 'react';
import { createApp, h, reactive, ref } from 'vue';
import { tabbied, tabbiedAttributes, patternController, type TabbiedProps } from 'tabbied/svelte';
import { TabbiedPattern, type TabbiedPatternExposed } from 'tabbied/vue';
import { radius } from 'tabbied/patterns';

type Hooks = {
  update: (next: Partial<TabbiedProps>) => void;
  destroy: () => void;
  controllerSeed?: () => string | undefined;
  redraw?: (seed: string) => void;
};

declare global {
  interface Window {
    __wrappers?: { svelte?: Hooks; vue?: Hooks };
  }
}

const START: TabbiedProps = {
  pattern: radius,
  seed: 'k9Pz',
  palette: ['#0B1020', '#3E8BFF', '#3FFFB2'],
  aspectRatio: '3 / 2',
  maxWidth: 480,
};

// Writes the attributes the way a Svelte spread does: the whole `style`
// attribute again on every change, which is what would take the controller's
// clipping away if the placeholder did not carry it.
const writeAttributes = (node: HTMLElement, props: TabbiedProps) => {
  for (const [name, value] of Object.entries(tabbiedAttributes(props))) {
    node.setAttribute(name, value);
  }
};

/**
 * tabbied/svelte and tabbied/vue driven from the built package in a real
 * browser. Neither framework compiles here: the Svelte action is a plain
 * function, called the way Svelte calls it, and the Vue component is mounted
 * with Vue's own createApp. e2e/wrappers.spec.ts drives both through
 * window.__wrappers, and proves the server half is the same placeholder.
 */
export function WrappersProbe() {
  const svelteRef = useRef<HTMLDivElement>(null);
  const vueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svelteNode = svelteRef.current;
    const vueNode = vueRef.current;

    if (!svelteNode || !vueNode) return;

    // Svelte: attributes first (the server render), then the action.
    let props: TabbiedProps = { ...START };
    writeAttributes(svelteNode, props);
    const action = tabbied(svelteNode, props);

    // Vue: the component, mounted on a reactive set of props.
    const state = reactive<Record<string, unknown>>({ ...START });
    const component = ref<TabbiedPatternExposed | null>(null);
    const app = createApp({
      render: () => h(TabbiedPattern, { ...(state as unknown as TabbiedProps), ref: component }),
    });
    app.mount(vueNode);

    window.__wrappers = {
      svelte: {
        update: (next) => {
          props = { ...props, ...next };
          writeAttributes(svelteNode, props);
          action.update(props);
        },
        destroy: () => action.destroy(),
        controllerSeed: () =>
          patternController(svelteNode)?.element?.getAttribute('data-seed') ?? undefined,
        redraw: (seed) => patternController(svelteNode)?.redraw(seed),
      },
      vue: {
        update: (next) => Object.assign(state, next),
        destroy: () => app.unmount(),
        controllerSeed: () => component.value?.element?.getAttribute('data-seed') ?? undefined,
        redraw: (seed) => component.value?.redraw(seed),
      },
    };

    return () => {
      delete window.__wrappers;
      action.destroy();
      app.unmount();
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div id="wrapper-svelte" ref={svelteRef} />
      <div ref={vueRef} id="wrapper-vue-root" />
    </div>
  );
}
