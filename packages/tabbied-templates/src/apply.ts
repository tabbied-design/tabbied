// Executing an edit plan against a live document. Every decision was made in
// plan.ts; this finds each annotated element and writes to it.
//
// **This never touches classes**, only text, attributes, and inline custom
// properties. The HTML download ships a stylesheet trimmed to the classes its
// markup uses (`trimUnusedRules` in scripts/package-templates.mjs), and that
// trim is only safe because nothing adds a class after load.

import type { EditOperation, EditPlan } from './plan.js';
import { planEdits } from './plan.js';
import { parseEmphasis } from './text.js';
import {
  EDIT_IMAGE_ATTRIBUTE,
  EDIT_PATTERN_ATTRIBUTE,
  EDIT_ROOT_ATTRIBUTE,
  EDIT_TEXT_ATTRIBUTE,
} from './spec.js';
import type { EditsDocument, Problem, TemplateSpec } from './spec.js';

export type ApplyResult = {
  /** Operations that found their element and were written. */
  applied: number;
  /**
   * Validation problems, plus an error naming the slot for each operation
   * whose element was missing.
   */
  problems: Problem[];
};

type Root = ParentNode;

/**
 * Every element carrying a slot id, not just the first. One piece of content
 * may appear in several places (the brand name in the masthead and the
 * footer), so they share an id and an edit reaches all of them; the generator
 * checks that they currently agree.
 */
const queryAll = (root: Root, selector: string): Element[] =>
  Array.from(root.querySelectorAll(selector));

/**
 * The pattern host inside a slot: the element carrying `data-pattern`, which
 * is either the annotated element itself or the placeholder inside it.
 */
function patternHost(element: Element): Element | null {
  if (element.hasAttribute('data-pattern')) return element;

  return element.querySelector('[data-pattern]');
}

function imageElement(element: Element): Element | null {
  if (element.tagName.toLowerCase() === 'img') return element;

  return element.querySelector('img');
}

/**
 * Write a text value, rebuilding the `{em}` accent as real elements.
 *
 * Nodes rather than innerHTML: the value is user (or model) input, and text
 * nodes leave no markup path into the page at all.
 *
 * The accent's class is read off the element being replaced when there is one,
 * because class names are hashed in the export and rewritten again in the
 * download package; the spec's captured class is the fallback for a headline
 * that had no accent until now.
 */
function writeText(
  element: Element,
  value: string,
  format: string,
  emphasisClass: string | undefined,
  emphasisTag: string | undefined
): void {
  if (format !== 'emphasis') {
    element.textContent = value;
    return;
  }

  const segments = parseEmphasis(value);
  // The page's own accent tag: rebuilding the run as an `<em>` on a page that
  // styles another tag drops the accent's styling without erroring.
  const tag = emphasisTag ?? 'em';
  const existing = element.querySelector(tag);
  const className = existing?.getAttribute('class') ?? emphasisClass ?? null;
  const document = element.ownerDocument;

  if (!document) {
    element.textContent = value;
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const segment of segments) {
    if (!segment.emphasis) {
      fragment.appendChild(document.createTextNode(segment.text));
      continue;
    }

    const accent = document.createElement(tag);

    if (className) accent.setAttribute('class', className);
    accent.textContent = segment.text;
    fragment.appendChild(accent);
  }

  element.textContent = '';
  element.appendChild(fragment);
}

function runOperation(root: Root, operation: EditOperation): Problem | null {
  switch (operation.type) {
    case 'properties': {
      const target =
        root.querySelector(`[${EDIT_ROOT_ATTRIBUTE}]`) ??
        ((root as Document).documentElement ?? null);

      if (!target) {
        return {
          level: 'error',
          path: 'palette',
          message: `no [${EDIT_ROOT_ATTRIBUTE}] element to write brand colors onto`,
        };
      }

      const style = (target as HTMLElement).style;

      for (const [property, value] of Object.entries(operation.properties)) {
        style.setProperty(property, value);
      }

      return null;
    }

    case 'text': {
      const elements = queryAll(
        root,
        `[${EDIT_TEXT_ATTRIBUTE}="${operation.id}"]`
      );

      if (elements.length === 0) {
        return {
          level: 'error',
          path: `text.${operation.id}`,
          message: `no element carrying ${EDIT_TEXT_ATTRIBUTE}="${operation.id}"`,
        };
      }

      for (const element of elements) {
        writeText(
          element,
          operation.value,
          operation.format,
          operation.emphasisClass,
          operation.emphasisTag
        );
      }

      return null;
    }

    case 'image': {
      const slots = queryAll(root, `[${EDIT_IMAGE_ATTRIBUTE}="${operation.id}"]`);
      const elements = slots
        .map((slot) => imageElement(slot))
        .filter((element): element is Element => element != null);

      if (elements.length === 0) {
        return {
          level: 'error',
          path: `images.${operation.id}`,
          message:
            slots.length > 0
              ? `slot "${operation.id}" contains no <img>`
              : `no element carrying ${EDIT_IMAGE_ATTRIBUTE}="${operation.id}"`,
        };
      }

      for (const element of elements) {
        element.setAttribute('src', operation.src);
        if (operation.alt != null) element.setAttribute('alt', operation.alt);
        // A stale srcset would win over the new src.
        element.removeAttribute('srcset');
      }

      return null;
    }

    case 'pattern': {
      const slots = queryAll(
        root,
        `[${EDIT_PATTERN_ATTRIBUTE}="${operation.id}"]`
      );
      const elements = slots
        .map((slot) => patternHost(slot))
        .filter((element): element is Element => element != null);

      if (elements.length === 0) {
        return {
          level: 'error',
          path: `patterns.${operation.id}`,
          message:
            slots.length > 0
              ? `slot "${operation.id}" contains no [data-pattern] host`
              : `no element carrying ${EDIT_PATTERN_ATTRIBUTE}="${operation.id}"`,
        };
      }

      for (const element of elements) {
        for (const [name, value] of Object.entries(operation.attributes)) {
          if (value == null) element.removeAttribute(name);
          else element.setAttribute(name, value);
        }
      }

      return null;
    }
  }
}

/**
 * Run a plan against a document (or any subtree).
 *
 * It rewrites `data-*` and does not re-mount patterns: that is
 * `hydratePatterns()`'s job in a packaged template and the live controller's
 * `update()` in the editor, which is what lets this serve a detached DOM in a
 * build script and a running page alike.
 */
export function applyPlan(root: Root, plan: EditPlan): ApplyResult {
  const problems = [...plan.problems];
  let applied = 0;

  for (const operation of plan.operations) {
    const problem = runOperation(root, operation);

    if (problem) problems.push(problem);
    else applied += 1;
  }

  return { applied, problems };
}

/** Plan and apply in one step - the common case. */
export function applyEdits(
  root: Root,
  spec: TemplateSpec,
  document: EditsDocument
): ApplyResult {
  return applyPlan(root, planEdits(spec, document));
}
