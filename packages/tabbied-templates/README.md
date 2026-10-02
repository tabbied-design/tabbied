# tabbied-templates

The editable-section spec for [Tabbied](https://tabbied.com) website templates,
and the engine that applies an edit: what a person or an agent may change
about a template, and the code that changes it.

Every Tabbied template marks its editable parts in its own markup:
`data-edit="<id>"` on a run of text, `data-edit-image="<id>"` on a picture,
`data-edit-pattern="<id>"` on a pattern field, and `data-edit-root` on the
element that holds the page's palette. A **spec** lists those slots with
their current values; an **edits document** says what to change. This package
validates a document against a spec and applies it to a DOM.

It is framework-free and has no dependencies, so the same code runs in a
browser, in Node with any DOM implementation, and in a Cloudflare Worker.

```bash
npm install tabbied-templates
```

## Apply an edit

```ts
import { applyEdits, formatProblems, hasErrors } from 'tabbied-templates';

// Each template's spec is published at https://tabbied.com/editable/<slug>.json
const spec = await (await fetch('https://tabbied.com/editable/verdant.json')).json();

const result = applyEdits(document, spec, {
  specVersion: spec.specVersion,
  slug: 'verdant',
  edits: {
    text: { 'brand.name': 'Fernhill Plants' },
    palette: ['#f4efe6', '#1f3a2c', '#c8643b'],
  },
});

if (hasErrors(result.problems)) console.warn(formatProblems(result.problems));
```

A document with one bad slot id still applies the rest, and every problem
comes back named by its slot, so a stale document or a partly wrong answer
from a model is recoverable. Errors are errors: an out-of-range value is
reported, never quietly clamped.

The engine writes only text, attributes and inline custom properties; it never
adds a class. Text is written as text nodes, never as HTML. Pattern fields
read their `data-*` attributes when `hydratePatterns()` from
[`tabbied`](https://www.npmjs.com/package/tabbied) mounts them, so apply an
edit before the patterns mount, or mount them again after.

## Plan first, apply later

`planEdits(spec, document)` is the pure half: it validates the document,
resolves the palette and the option ranges, and returns
`{ operations, problems }` without touching a DOM, so it can run on a server
before anything is shown. `applyPlan(root, plan)` executes a plan.
`validateEdits` and `validateSpec` check the two documents on their own.

The full reference, including the slot types and how a re-color reaches the
pattern fields, is
[`docs/editable-templates.md`](https://github.com/tabbied-design/tabbied/blob/main/docs/editable-templates.md)
in the repository.

## Templates are licensed separately

This package is open source. The Tabbied website templates it edits are not:
each one is licensed to the Tabbied account that chose it, under the
[Template License](https://tabbied.com/terms-of-service/#template-license).

## License

MIT
