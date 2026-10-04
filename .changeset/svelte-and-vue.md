---
"tabbied": minor
---

`tabbied/svelte` and `tabbied/vue`: the patterns in Svelte, SvelteKit, Vue and Nuxt, with the same props as the React component.

**Additions**

- `tabbied/svelte`: the `tabbied` action (`use:tabbied={props}`), `tabbiedAttributes(props)` to spread on the same element, and `patternController(element)` for `redraw()`, `exportImage()` and `exportSvg()`. `tabbiedAttributes` is pure, so a SvelteKit server render draws the box at its final size before the action mounts into it. It imports no Svelte and works in Svelte 4 and 5.
- `tabbied/vue`: the `TabbiedPattern` component for Vue 3.3 or later. A Nuxt server render is the sized placeholder; the template ref exposes `redraw()`, `exportImage()`, `exportSvg()` and `element`, and `onReady` is the `ready` event. Vue is an optional peer dependency, as React is.
