#!/usr/bin/env node
// Codemod: add editable-section annotations to the bespoke template pages. Run
// it after adding a new bespoke template. It relies on three regularities:
//
//   1. Every page declares its color once, as custom properties on its root
//      rule (`--paper`, `--ink`, ...), and the stylesheet only reads
//      `var(--...)`. A re-color just needs those properties set *inline*.
//   2. A pattern slot goes on the wrapper, so a wrapper holding two
//      <TabbiedPattern>s is reported rather than annotated.
//   3. Copy is a text literal or a single expression inside a small set of
//      content tags.
//
// **It writes to source.** The annotations are committed and then maintained
// by hand, which keeps slot ids stable for saved edits documents. A page that
// already carries `data-edit-root` is left alone, so a re-run is safe.
//
// `--patterns` is the one way back into an annotated page: it annotates only
// the pattern fields that have no slot yet (a field added after the page was
// annotated) and touches nothing else, so every existing id stays put.
//
//   node scripts/annotate-templates.mjs            every un-annotated page
//   node scripts/annotate-templates.mjs grafit     one page
//   node scripts/annotate-templates.mjs --dry-run  report, write nothing
//   node scripts/annotate-templates.mjs --patterns grafit   new pattern fields only
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

// @babel/parser rather than the TypeScript compiler API, which typescript@7 no
// longer exposes to JS. The parse has to be real: a regex that mis-reads a
// page rewrites it wrongly and silently.

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const templateDir = path.join(repoRoot, 'app', 'templates');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const patternsOnly = args.includes('--patterns');
const only = args.filter((arg) => !arg.startsWith('-'));

// Tags whose text is page copy. A closed list: a slot on a layout <div> would
// delete its children when edited.
const CONTENT_TAGS = new Set([
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'dt', 'dd',
  'cite', 'blockquote', 'figcaption', 'summary', 'strong', 'small', 'time',
  'label', 'button', 'th', 'td', 'caption', 'legend',
]);

const SECTION_TAGS = ['section', 'header', 'footer', 'main', 'article', 'aside'];

// Roughly what the design was set for: a soft warning in an editor, never a
// limit.
const MAX_CHARS = {
  h1: 70, h2: 60, h3: 40, h4: 36, h5: 32, h6: 32,
  p: 240, blockquote: 240, dd: 200, li: 80, a: 28, button: 24,
  span: 60, dt: 28, cite: 48, figcaption: 120, summary: 80,
};

const MULTILINE_TAGS = new Set(['p', 'blockquote', 'dd', 'figcaption']);

// What to call a slot whose element has no class name to borrow:
// `faq.0.answer` says what it is where `faq.0.p` does not, and agents read
// these ids.
const TAG_WORDS = {
  a: 'link', p: 'body', span: 'text', li: 'item', dt: 'term', dd: 'body',
  h1: 'title', h2: 'title', h3: 'title', h4: 'title', h5: 'title', h6: 'title',
  blockquote: 'quote', cite: 'attribution', figcaption: 'caption',
  summary: 'question', button: 'action', label: 'label', small: 'note',
  strong: 'emphasis', time: 'date', th: 'heading', td: 'cell',
  caption: 'caption', legend: 'legend',
};

const camel = (value) =>
  value.replace(/[-_ ]+(.)/g, (_m, c) => c.toUpperCase()).replace(/[^\w]/g, '');

// ---- AST helpers ----------------------------------------------------------

/** Parse a page, and give every node a `parent` so ancestors are walkable. */
function parsePage(code) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const link = (node, parent) => {
    if (!node || typeof node.type !== 'string') return;

    node.parent = parent;

    for (const key of Object.keys(node)) {
      if (key === 'parent' || key === 'loc') continue;

      const value = node[key];

      if (Array.isArray(value)) {
        for (const entry of value) {
          if (entry && typeof entry.type === 'string') link(entry, node);
        }
      } else if (value && typeof value.type === 'string') {
        link(value, node);
      }
    }
  };

  link(ast.program, null);

  return ast.program;
}

/** Every node, depth first. */
function walk(node, visit) {
  if (!node || typeof node.type !== 'string') return;

  visit(node);

  for (const key of Object.keys(node)) {
    if (key === 'parent' || key === 'loc') continue;

    const value = node[key];

    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry && typeof entry.type === 'string') walk(entry, visit);
      }
    } else if (value && typeof value.type === 'string') {
      walk(value, visit);
    }
  }
}

const openingOf = (node) => node.openingElement ?? node;

const attributeNamed = (element, name) =>
  (openingOf(element).attributes ?? []).find(
    (attribute) =>
      attribute.type === 'JSXAttribute' &&
      attribute.name &&
      attribute.name.name === name
  );

function tagNameOf(node) {
  if (!node || node.type !== 'JSXElement') return null;

  const name = node.openingElement.name;

  return name.type === 'JSXIdentifier' ? name.name : null;
}

const sourceOf = (code, node) => code.slice(node.start, node.end);

// ---- reading a page's palette --------------------------------------------

/**
 * The page's palette: the custom properties its root rule declares, in
 * declaration order, with role 0 the page ground. Read from the stylesheet,
 * not the page's `const INK = ...`, because most pages have CSS colors (the
 * paper) with no JS constant.
 */
function readPalette(cssPath) {
  if (!existsSync(cssPath)) return null;

  const css = readFileSync(cssPath, 'utf8');
  // The first rule declaring color custom properties is the page root by
  // construction: these stylesheets open with `.page { --...: #...; }`.
  const rule = /\{([^}]*--[a-z][\w-]*\s*:\s*#[0-9a-f]{3,8}[^}]*)\}/i.exec(css);

  if (!rule) return null;

  const entries = [
    ...rule[1].matchAll(/--([a-z][\w-]*)\s*:\s*(#[0-9a-f]{3,8})\b/gi),
  ];

  if (entries.length < 2) return null;

  return {
    varNames: entries.map((entry) => entry[1]),
    colors: entries.map((entry) => entry[2]),
  };
}

/**
 * Module-scope color constants, by identifier. Aliases are resolved:
 * `const TILE_A = STEEL` is as much a color constant as
 * `const STEEL = '#9C9C98'`, and many pages name their tile colors that way.
 */
function readColorConstants(program) {
  const literals = new Map();
  const aliases = new Map();

  for (const statement of program.body) {
    if (statement.type !== 'VariableDeclaration') continue;

    for (const declaration of statement.declarations) {
      if (declaration.id.type !== 'Identifier' || !declaration.init) continue;

      const { name } = declaration.id;
      const init = declaration.init;

      if (init.type === 'StringLiteral' && /^#[0-9a-f]{3,8}$/i.test(init.value)) {
        literals.set(name, init.value);
      } else if (init.type === 'Identifier') {
        aliases.set(name, init.name);
      }
    }
  }

  // Chase alias chains, with a bound so a cycle cannot hang the migration.
  for (const [name, target] of aliases) {
    let current = target;

    for (let hop = 0; hop < 8; hop += 1) {
      if (literals.has(current)) {
        literals.set(name, literals.get(current));
        break;
      }

      if (!aliases.has(current)) break;

      current = aliases.get(current);
    }
  }

  return literals;
}

/**
 * Module-scope arrays of colors, by identifier (`const FULL = [NAVY, ICE]`),
 * so a pattern passed one (`palette={FULL}`) can follow a re-color.
 */
function readColorArrays(program, constants) {
  const arrays = new Map();

  for (const statement of program.body) {
    if (statement.type !== 'VariableDeclaration') continue;

    for (const declaration of statement.declarations) {
      if (
        declaration.id.type !== 'Identifier' ||
        !declaration.init ||
        declaration.init.type !== 'ArrayExpression'
      ) {
        continue;
      }

      const entries = [];
      let usable = declaration.init.elements.length > 0;

      for (const entry of declaration.init.elements) {
        if (entry && entry.type === 'StringLiteral') {
          entries.push(entry.value);
        } else if (entry && entry.type === 'Identifier' && constants.has(entry.name)) {
          entries.push(constants.get(entry.name));
        } else {
          usable = false;
          break;
        }
      }

      if (usable) arrays.set(declaration.id.name, entries);
    }
  }

  return arrays;
}

/**
 * The identifier a page imports its stylesheet as (`s` or `styles`, among
 * others), read per file rather than assumed.
 */
function styleAliasOf(program) {
  for (const statement of program.body) {
    if (
      statement.type === 'ImportDeclaration' &&
      statement.source.value.endsWith('.module.css')
    ) {
      const [specifier] = statement.specifiers;

      if (specifier && specifier.type === 'ImportDefaultSpecifier') {
        return specifier.local.name;
      }
    }
  }

  return null;
}

/** `className={s.heroField}` -> "heroField". */
function classKeyOf(code, node, alias) {
  const attribute = attributeNamed(node, 'className');

  if (!attribute || !attribute.value) return null;

  const match = new RegExp(`\\b${alias}\\.([A-Za-z0-9_]+)`).exec(
    sourceOf(code, attribute.value)
  );

  return match ? match[1] : null;
}

/**
 * The `.map()` callbacks this node sits inside, outermost first, with the name
 * of each one's index parameter.
 *
 * A slot inside a map is rendered N times, so its id has to carry the index or
 * every copy would claim the same one. Where the callback has no index
 * parameter, one is added - an edit to the *callback*, recorded here and
 * applied with the rest.
 */
function enclosingMaps(node, pendingParams) {
  // Collect the whole chain before naming anything, or an inner callback can
  // take a name the outer one already binds and an id reads `${i}.${i}`.
  const chain = [];
  let current = node.parent;

  while (current) {
    if (
      (current.type === 'ArrowFunctionExpression' ||
        current.type === 'FunctionExpression') &&
      current.parent &&
      current.parent.type === 'CallExpression' &&
      current.parent.callee.type === 'MemberExpression' &&
      current.parent.callee.property.name === 'map'
    ) {
      chain.unshift(current);
    }

    current = current.parent;
  }

  // Every name bound anywhere in the chain, including the ones this run has
  // already promised to add.
  const taken = new Set();

  for (const callback of chain) {
    for (const parameter of callback.params) {
      if (parameter.type === 'Identifier') taken.add(parameter.name);
    }

    const pending = pendingParams.get(callback);

    if (pending) taken.add(pending);
  }

  const maps = [];

  for (const callback of chain) {
    const parameters = callback.params;

    if (parameters.length >= 2) {
      if (parameters[1].type === 'Identifier') {
        maps.push({ name: parameters[1].name });
      }
      continue;
    }

    if (parameters.length !== 1) continue;

    const existing = pendingParams.get(callback);

    if (existing) {
      maps.push({ name: existing });
      continue;
    }

    let name = 'i';
    let suffix = 2;

    while (taken.has(name)) name = `i${suffix++}`;

    taken.add(name);
    pendingParams.set(callback, name);
    maps.push({ name });
  }

  // A name bound twice in the chain means the outer binding is shadowed and
  // genuinely unreachable, so an id built from both would repeat one value.
  const names = maps.map((map) => map.name);

  if (new Set(names).size !== names.length) return null;

  return maps;
}

/**
 * Components declared in this file and rendered more than once. No static id
 * can name each instance of their contents, so those subtrees are left
 * un-annotated rather than annotated wrongly.
 */
function repeatedComponents(program) {
  const declared = new Set();

  for (const statement of program.body) {
    if (statement.type === 'FunctionDeclaration' && statement.id) {
      declared.add(statement.id.name);
    }

    if (statement.type === 'VariableDeclaration') {
      for (const declaration of statement.declarations) {
        if (
          declaration.id.type === 'Identifier' &&
          declaration.init &&
          (declaration.init.type === 'ArrowFunctionExpression' ||
            declaration.init.type === 'FunctionExpression')
        ) {
          declared.add(declaration.id.name);
        }
      }
    }
  }

  const uses = new Map();

  walk(program, (node) => {
    if (node.type !== 'JSXElement') return;

    const name = node.openingElement.name;

    if (name.type === 'JSXIdentifier' && declared.has(name.name)) {
      uses.set(name.name, (uses.get(name.name) ?? 0) + 1);
    }
  });

  return new Set(
    [...uses].filter(([, count]) => count > 1).map(([name]) => name)
  );
}

/** The name of the function whose body this node sits in, if any. */
function enclosingFunctionName(node) {
  let current = node.parent;

  while (current) {
    if (current.type === 'FunctionDeclaration' && current.id) {
      return current.id.name;
    }

    if (
      (current.type === 'ArrowFunctionExpression' ||
        current.type === 'FunctionExpression') &&
      current.parent &&
      current.parent.type === 'VariableDeclarator' &&
      current.parent.id.type === 'Identifier'
    ) {
      return current.parent.id.name;
    }

    current = current.parent;
  }

  return null;
}

/**
 * What to call one text slot: the element's own class name (`heroKicker`),
 * else a link's anchor (`bar.making` rather than `bar.link2`), else the tag's
 * semantic word.
 */
function keyFor(code, node, alias, tag) {
  const own = classKeyOf(code, node, alias);

  if (own) return own;

  if (tag === 'a') {
    const href = attributeNamed(node, 'href');

    if (href && href.value && href.value.type === 'StringLiteral') {
      const anchor = href.value.value;

      if (anchor.startsWith('#') && anchor.length > 1) {
        return camel(anchor.slice(1));
      }
    }
  }

  return TAG_WORDS[tag] ?? tag;
}

/** Nearest ancestor that names a region of the page. */
function sectionKeyOf(code, node, alias) {
  let current = node.parent;

  while (current) {
    if (current.type === 'JSXElement') {
      const tag = tagNameOf(current);

      if (SECTION_TAGS.includes(tag)) {
        const id = attributeNamed(current, 'id');

        if (id && id.value && id.value.type === 'StringLiteral') {
          return camel(id.value.value);
        }

        const labelled = attributeNamed(current, 'aria-labelledby');

        if (labelled && labelled.value && labelled.value.type === 'StringLiteral') {
          return camel(labelled.value.value.replace(/-(title|h|heading)$/, ''));
        }

        const key = classKeyOf(code, current, alias);

        if (key) return key;

        if (tag !== 'article') return tag;
      }
    }

    current = current.parent;
  }

  return 'page';
}

/** True when a content element holds exactly one text run or one expression. */
function isSimpleText(node) {
  const children = (node.children ?? []).filter(
    (child) => !(child.type === 'JSXText' && child.value.trim() === '')
  );

  if (children.length !== 1) return false;

  const [child] = children;

  if (child.type === 'JSXText') return child.value.trim().length > 0;

  if (child.type === 'JSXExpressionContainer') {
    const expression = child.expression;

    return (
      expression.type === 'Identifier' || expression.type === 'MemberExpression'
    );
  }

  return false;
}

// ---- the migration --------------------------------------------------------

function annotate(slug) {
  const pagePath = path.join(templateDir, slug, 'site', 'page.tsx');
  const cssPath = path.join(templateDir, slug, 'site', `${slug}.module.css`);

  if (!existsSync(pagePath)) return { slug, skipped: 'no page.tsx' };

  const code = readFileSync(pagePath, 'utf8');

  const annotated = code.includes('data-edit-root');

  if (annotated && !patternsOnly) {
    return { slug, skipped: 'already annotated' };
  }

  if (!annotated && patternsOnly) {
    return { slug, skipped: 'not annotated yet - run it without --patterns first' };
  }

  const palette = readPalette(cssPath);

  if (!palette) return { slug, skipped: 'no custom-property palette in its CSS' };

  const program = parsePage(code);
  const alias = styleAliasOf(program);

  if (!alias) return { slug, skipped: 'no CSS module import' };

  const constants = readColorConstants(program);
  const repeated = repeatedComponents(program);

  // Which role each color is, so a pattern's palette can be a role map
  // instead of frozen hexes.
  const roleOfHex = new Map(
    palette.colors.map((color, index) => [color.toLowerCase(), index])
  );
  const colorArrays = readColorArrays(program, constants);

  const edits = [];
  const pendingParams = new Map();
  const usedIds = new Set();
  // In --patterns mode the page already holds pattern slots, and a new one
  // must not take an id they carry.
  const takenPatternIds = new Set(
    [...code.matchAll(/data-edit-pattern=(?:"([^"]+)"|\{`([^`]+)`\})/g)].map(
      (match) => match[1] ?? match[2]
    )
  );
  const counters = new Map();
  const notes = [];
  const skippedComponents = new Set();

  const idFor = (base, maps) => {
    const suffix = maps.map((map) => `\${${map.name}}`).join('.');
    const count = counters.get(base) ?? 0;

    counters.set(base, count + 1);

    const numbered = count === 0 ? base : `${base}${count + 1}`;

    return {
      id: suffix ? `${numbered}.${suffix}` : numbered,
      templated: maps.length > 0,
    };
  };

  // Insert straight after the tag name, so the attribute lands beside the tag
  // and the rest of the element - including its comments - is untouched.
  const addAttributes = (element, attributes) => {
    edits.push({
      position: openingOf(element).name.end,
      text: ` ${attributes}`,
    });
  };

  /** The indentation of the line an element starts on. */
  const indentOf = (node) => {
    const lineStart = code.lastIndexOf('\n', node.start) + 1;

    return code.slice(lineStart, node.start).match(/^\s*/)[0];
  };

  /**
   * A multi-line attribute block, replacing the run of whitespace after the tag
   * name so the remaining attributes stay on the grid rather than being pushed
   * off it by the insertion.
   */
  const addBlock = (element, lines) => {
    const opening = openingOf(element);
    const position = opening.name.end;
    const following = code.slice(position).match(/^[ \t]*/)[0];
    const indent = `${indentOf(element)}  `;

    edits.push({
      position,
      length: following.length,
      text: `\n${indent}${lines.join(`\n${indent}`)}\n${indent}`,
    });
  };

  // A color becomes a role when it is one of the page's and stays a literal
  // when it is not, so an off-palette accent does not move with the brand.
  // `transparent` must stay literal: it lets a field read over what is beneath.
  const roleOfColor = (value) => {
    const role = roleOfHex.get(String(value).toLowerCase());

    return role == null ? value : String(role);
  };

  const patternRoles = (element) => {
    const attribute = attributeNamed(element, 'palette');

    if (
      !attribute ||
      !attribute.value ||
      attribute.value.type !== 'JSXExpressionContainer'
    ) {
      return null;
    }

    const expression = attribute.value.expression;

    // `palette={FULL}` - a module-scope array, resolved above.
    if (expression.type === 'Identifier') {
      const entries = colorArrays.get(expression.name);

      return entries ? entries.map(roleOfColor).join(',') : null;
    }

    if (expression.type !== 'ArrayExpression') return null;

    const roles = [];

    for (const entry of expression.elements) {
      if (!entry) return null;

      if (entry.type === 'StringLiteral') {
        roles.push(roleOfColor(entry.value));
        continue;
      }

      if (entry.type === 'Identifier') {
        const hex = constants.get(entry.name);

        if (hex == null) return null;

        roles.push(roleOfColor(hex));
        continue;
      }

      // A conditional or a per-item palette (`eau.palette`) genuinely varies
      // per render, so no static role map can describe it.
      return null;
    }

    return roles.join(',');
  };

  let root = null;
  let patterns = 0;
  let images = 0;
  let texts = 0;

  walk(program, (node) => {
    if (node.type !== 'JSXElement') return;

    const tag = tagNameOf(node);

    // Inside a component this page renders more than once: no static id can
    // name each instance, so annotate nothing here.
    if (repeated.has(enclosingFunctionName(node))) {
      if (!skippedComponents.has(enclosingFunctionName(node))) {
        skippedComponents.add(enclosingFunctionName(node));
        notes.push(
          `${slug}: <${enclosingFunctionName(node)}> is rendered more than once, so its contents were not annotated`
        );
      }

      return;
    }

    // ---- the root ---------------------------------------------------------
    if (
      !patternsOnly &&
      !root &&
      (tag === 'div' || tag === 'main') &&
      classKeyOf(code, node, alias)
    ) {
      root = node;

      addBlock(node, [
        '// Color, declared inline so an edit can override it. The authored',
        '// defaults stay in the stylesheet as the fallback.',
        'style={{',
        ...palette.varNames.map(
          (name, index) => `  '--${name}': '${palette.colors[index]}',`
        ),
        '} as React.CSSProperties}',
        'data-edit-root="vars"',
        `data-edit-vars="${palette.varNames.join(',')}"`,
      ]);
    }

    // ---- pattern fields ----------------------------------------------------
    if (tag === 'TabbiedPattern') {
      const host = node.parent;
      const roles = patternRoles(node);

      if (host && host.type === 'JSXElement' && attributeNamed(host, 'data-edit-pattern')) {
        return;
      }

      if (host && host.type === 'JSXFragment') {
        notes.push(
          `${slug}: a pattern is wrapped in a fragment, so there is no element to annotate - needs a wrapper by hand`
        );
      } else if (host && host.type === 'JSXElement') {
        const siblings = (host.children ?? []).filter(
          (child) => tagNameOf(child) === 'TabbiedPattern'
        );

        if (siblings.length > 1) {
          // Ambiguous: applying an edit takes the first [data-pattern] inside
          // a slot.
          notes.push(
            `${slug}: ${siblings.length} patterns share one wrapper - not annotated`
          );
        } else {
          const maps = enclosingMaps(node, pendingParams);

          if (!maps) {
            notes.push(`${slug}: a pattern sits under two maps sharing an index name - not annotated`);
            return;
          }

          const base = `${sectionKeyOf(code, node, alias)}.field`;
          let next = idFor(base, maps);

          while (takenPatternIds.has(next.id)) next = idFor(base, maps);
          takenPatternIds.add(next.id);

          const { id, templated } = next;

          addAttributes(
            host,
            `data-edit-pattern${templated ? `={\`${id}\`}` : `="${id}"`}` +
              `${roles ? ` data-edit-roles="${roles}"` : ''}`
          );

          if (!roles) {
            notes.push(
              `${slug}: the pattern in ${base} has a palette that maps to no roles - it will not re-color`
            );
          }

          patterns += 1;
        }
      }
    }

    // Everything below is text and pictures, which a --patterns run leaves be.
    if (patternsOnly) return;

    // ---- images ------------------------------------------------------------
    if (tag === 'Figure' && !attributeNamed(node, 'editId')) {
      const slugAttribute = attributeNamed(node, 'slug');
      const literalSlug =
        slugAttribute &&
        slugAttribute.value &&
        slugAttribute.value.type === 'StringLiteral'
          ? slugAttribute.value.value
          : null;

      if (literalSlug) {
        // An image's committed slug is distinct on the page and, unlike a
        // positional id, survives reordering.
        const id = `photo.${literalSlug}`;

        if (!usedIds.has(id)) {
          usedIds.add(id);
          addAttributes(node, `editId="${id}"`);
          images += 1;
        }
      } else {
        const maps = enclosingMaps(node, pendingParams);

        if (maps) {
          const { id, templated } = idFor(
            `${sectionKeyOf(code, node, alias)}.photo`,
            maps
          );

          addAttributes(node, `editId={${templated ? `\`${id}\`` : `'${id}'`}}`);
          images += 1;
        }
      }
    }

    // ---- text ---------------------------------------------------------------
    if (
      CONTENT_TAGS.has(tag) &&
      !attributeNamed(node, 'data-edit') &&
      !attributeNamed(node, 'aria-hidden') &&
      isSimpleText(node)
    ) {
      const maps = enclosingMaps(node, pendingParams);

      if (!maps) return;

      const key = keyFor(code, node, alias, tag);
      const { id, templated } = idFor(
        `${sectionKeyOf(code, node, alias)}.${key}`,
        maps
      );

      if (!usedIds.has(id)) {
        usedIds.add(id);

        const max = MAX_CHARS[tag];

        addAttributes(
          node,
          `data-edit${templated ? `={\`${id}\`}` : `="${id}"`}` +
            (max ? ` data-edit-max="${max}"` : '') +
            (MULTILINE_TAGS.has(tag) ? ' data-edit-multiline' : '')
        );
        texts += 1;
      }
    }
  });

  if (!root && !patternsOnly) return { slug, skipped: 'no root element found' };

  // Adding the index parameter a templated id refers to. Recorded last so the
  // positions above were all computed against the original text.
  for (const [callback, name] of pendingParams) {
    edits.push({ position: callback.params[0].end, text: `, ${name}` });
  }

  // Applied back to front, so every recorded position stays valid.
  let output = code;

  for (const edit of edits.sort((a, b) => b.position - a.position)) {
    output =
      output.slice(0, edit.position) +
      edit.text +
      output.slice(edit.position + (edit.length ?? 0));
  }

  if (!dryRun) writeFileSync(pagePath, output);

  return { slug, patterns, images, texts, notes };
}

const slugs = readdirSync(templateDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => existsSync(path.join(templateDir, slug, 'site', 'page.tsx')))
  .filter((slug) => only.length === 0 || only.includes(slug))
  .sort();

let annotated = 0;
const skipped = [];
const allNotes = [];
const totals = { patterns: 0, images: 0, texts: 0 };

for (const slug of slugs) {
  let result;

  try {
    result = annotate(slug);
  } catch (error) {
    skipped.push(`${slug} (${error instanceof Error ? error.message : error})`);
    continue;
  }

  if (result.skipped) {
    skipped.push(`${slug} (${result.skipped})`);
    continue;
  }

  annotated += 1;
  totals.patterns += result.patterns;
  totals.images += result.images;
  totals.texts += result.texts;
  allNotes.push(...result.notes);

  console.log(
    `annotate: ${slug} - ${result.texts} text, ${result.images} image, ${result.patterns} pattern`
  );
}

for (const note of allNotes) console.warn(`annotate: ${note}`);

console.log(
  `annotate: ${annotated} page(s)${dryRun ? ' (dry run)' : ''} - ${totals.texts} text, ` +
    `${totals.images} image, ${totals.patterns} pattern slots; ${skipped.length} skipped`
);

if (skipped.length > 0) {
  for (const entry of skipped) console.log(`annotate: skipped ${entry}`);
}
