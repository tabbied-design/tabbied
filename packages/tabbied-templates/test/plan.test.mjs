// The edit engine's decisions, with no DOM in sight.
//
// planEdits is where every judgment lives (what validates, what a palette
// change implies for a pattern field, which attributes get written). Pinning
// it here lets apply.ts be covered by one e2e case rather than a matrix.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  planEdits,
  applyPlan,
  validateEdits,
  validateSpec,
  hasErrors,
  SPEC_VERSION,
} from '../dist/index.js';

const spec = {
  specVersion: SPEC_VERSION,
  site: { slug: 'solstice', name: 'Solstice', topic: 'Wellness studio' },
  palette: {
    colors: ['#F5F1E8', '#2E2A25', '#A9713C'],
    derivation: 'templateSite',
  },
  slots: [
    {
      id: 'hero.title',
      kind: 'text',
      value: 'Mornings that {em}start slow{/em}.',
      format: 'emphasis',
      maxChars: 60,
      emphasisClass: 'em',
    },
    { id: 'hero.lede', kind: 'text', value: 'A studio for slow mornings.', format: 'plain' },
    {
      id: 'hero.photo',
      kind: 'image',
      src: '/images/template/react__solstice__hero-0.webp',
      alt: 'A sunlit studio',
    },
    {
      id: 'hero.field',
      kind: 'pattern',
      config: { slug: 'lobe', palette: ['transparent', '#2E2A25'], seed: 'sol-1' },
      paletteRoles: ['transparent', 1],
      options: [
        {
          id: 'grid',
          label: 'Columns and rows',
          type: 'ButtonSelectGroup',
          default: '6x9',
          values: ['2x3', '4x6', '6x9'],
        },
        {
          id: 'frequency',
          label: 'Frequency',
          type: 'Slider',
          default: 1,
          min: 0.2,
          max: 1,
          step: 0.1,
        },
      ],
    },
    {
      id: 'band.field',
      kind: 'pattern',
      config: { slug: 'blossom', palette: ['#F5F1E8', '#A9713C'] },
      // No paletteRoles: a literal field a re-color must leave alone.
    },
    {
      id: 'coda.field',
      kind: 'pattern',
      // Authored with options of its own, the way most fields are.
      config: { slug: 'weave', options: { grid: '10x15', frequency: 0.8 } },
      options: [
        {
          id: 'grid',
          label: 'Columns and rows',
          type: 'ButtonSelectGroup',
          default: '10x15',
          values: ['5x8', '10x15'],
        },
        {
          id: 'frequency',
          label: 'Frequency',
          type: 'Slider',
          default: 1,
          min: 0.2,
          max: 1,
          step: 0.1,
        },
      ],
    },
  ],
};

const document = (edits) => ({
  specVersion: SPEC_VERSION,
  slug: 'solstice',
  edits,
});

const operationFor = (plan, type, id) =>
  plan.operations.find((op) => op.type === type && (id == null || op.id === id));

test('an empty document plans nothing', () => {
  const plan = planEdits(spec, document({}));

  assert.deepEqual(plan.operations, []);
  assert.deepEqual(plan.problems, []);
});

test('a text edit plans one operation carrying the slot format', () => {
  const plan = planEdits(
    spec,
    document({ text: { 'hero.title': 'Evenings that {em}wind down{/em}.' } })
  );

  assert.equal(plan.problems.length, 0);
  assert.deepEqual(operationFor(plan, 'text', 'hero.title'), {
    type: 'text',
    id: 'hero.title',
    value: 'Evenings that {em}wind down{/em}.',
    format: 'emphasis',
    emphasisClass: 'em',
  });
});

test('an unknown slot id is an error, and the rest still applies', () => {
  const plan = planEdits(
    spec,
    document({ text: { 'hero.nope': 'x', 'hero.lede': 'A quieter studio.' } })
  );

  assert.ok(hasErrors(plan.problems));
  assert.match(plan.problems[0].message, /no slot "hero\.nope"/);
  assert.ok(operationFor(plan, 'text', 'hero.lede'));
});

test('editing a slot as the wrong kind is an error', () => {
  const plan = planEdits(spec, document({ text: { 'hero.photo': 'x' } }));

  assert.ok(hasErrors(plan.problems));
  assert.match(plan.problems[0].message, /is an image slot/);

  const asImage = planEdits(spec, document({ images: { 'hero.lede': { src: '/a.webp' } } }));
  assert.match(asImage.problems[0].message, /is a text slot/);

  const asText = planEdits(spec, document({ text: { 'hero.field': 'x' } }));
  assert.match(asText.problems[0].message, /is a pattern slot/);
});

test('overrunning maxChars warns but still applies', () => {
  const plan = planEdits(
    spec,
    document({ text: { 'hero.title': 'x'.repeat(120) } })
  );

  assert.equal(plan.problems.length, 1);
  assert.equal(plan.problems[0].level, 'warning');
  assert.ok(operationFor(plan, 'text', 'hero.title'));
});

test('a palette edit writes the brand roles', () => {
  const plan = planEdits(
    spec,
    document({ palette: ['#0B2545', '#EEF4ED', '#13A8A8'] })
  );

  const properties = operationFor(plan, 'properties').properties;

  assert.equal(properties['--brand-0'], '#0B2545');
  assert.equal(properties['--brand-2'], '#13A8A8');
});

test('a re-color moves pattern fields that follow the brand palette', () => {
  const plan = planEdits(
    spec,
    document({ palette: ['#0B2545', '#EEF4ED', '#13A8A8'] })
  );

  // hero.field declares roles, so it re-colors; its literal `transparent`
  // survives, which is what keeps the field readable over a photograph.
  assert.deepEqual(operationFor(plan, 'pattern', 'hero.field').attributes, {
    'data-palette': 'transparent, #EEF4ED',
  });

  // band.field declares none, so nothing is planned for it at all.
  assert.equal(operationFor(plan, 'pattern', 'band.field'), undefined);
});

test('an explicit field palette wins over the brand palette', () => {
  const plan = planEdits(
    spec,
    document({
      palette: ['#0B2545', '#EEF4ED', '#13A8A8'],
      patterns: { 'hero.field': { palette: ['#000000', '#FFFFFF'] } },
    })
  );

  assert.deepEqual(operationFor(plan, 'pattern', 'hero.field').attributes, {
    'data-palette': '#000000, #FFFFFF',
  });
});

test('a short or non-hex palette is rejected', () => {
  assert.ok(hasErrors(validateEdits(spec, document({ palette: ['#000000'] }))));
  assert.ok(
    hasErrors(validateEdits(spec, document({ palette: ['#000000', 'navy'] })))
  );
});

test('option values are checked against the catalog ranges', () => {
  const ok = planEdits(
    spec,
    document({ patterns: { 'hero.field': { options: { grid: '4x6' } } } })
  );

  assert.equal(ok.problems.length, 0);
  assert.deepEqual(operationFor(ok, 'pattern', 'hero.field').attributes, {
    'data-options': 'grid: 4x6',
  });

  const badChoice = validateEdits(
    spec,
    document({ patterns: { 'hero.field': { options: { grid: '99x99' } } } })
  );
  assert.ok(hasErrors(badChoice));
  assert.match(badChoice[0].message, /must be one of/);

  const outOfRange = validateEdits(
    spec,
    document({ patterns: { 'hero.field': { options: { frequency: 4 } } } })
  );
  assert.ok(hasErrors(outOfRange));
  assert.match(outOfRange[0].message, /above its maximum/);

  const unknown = validateEdits(
    spec,
    document({ patterns: { 'hero.field': { options: { nope: 1 } } } })
  );
  assert.ok(hasErrors(unknown));
  assert.match(unknown[0].message, /has no option "nope"/);
});

test('a rejected option value plans no attribute at all', () => {
  const plan = planEdits(
    spec,
    document({ patterns: { 'hero.field': { options: { grid: '99x99' } } } })
  );

  assert.equal(operationFor(plan, 'pattern', 'hero.field'), undefined);
});

test('swapping the design clears the old options and warns about new ones', () => {
  const swap = planEdits(
    spec,
    document({ patterns: { 'hero.field': { slug: 'frond' } } })
  );

  assert.deepEqual(operationFor(swap, 'pattern', 'hero.field').attributes, {
    'data-pattern': 'frond',
    'data-options': null,
  });

  const withOptions = planEdits(
    spec,
    document({
      patterns: { 'hero.field': { slug: 'frond', options: { scale: 3 } } },
    })
  );

  assert.equal(withOptions.problems[0].level, 'warning');
  assert.match(withOptions.problems[0].message, /were not validated/);
  assert.equal(
    withOptions.operations.find((op) => op.type === 'pattern').attributes[
      'data-options'
    ],
    'scale: 3'
  );
});

test('editing one option keeps the options the field already has', () => {
  const plan = planEdits(
    spec,
    document({ patterns: { 'coda.field': { options: { frequency: 0.5 } } } })
  );

  // Written alone, `frequency: 0.5` would drop the authored grid and change
  // the layout.
  assert.deepEqual(plan.problems, []);
  assert.deepEqual(operationFor(plan, 'pattern', 'coda.field').attributes, {
    'data-options': 'grid: 10x15; frequency: 0.5',
  });

  // Naming the slot's own design is not a swap, so it merges too.
  const same = planEdits(
    spec,
    document({
      patterns: { 'coda.field': { slug: 'weave', options: { grid: '5x8' } } },
    })
  );

  assert.deepEqual(operationFor(same, 'pattern', 'coda.field').attributes, {
    'data-options': 'grid: 5x8; frequency: 0.8',
  });
});

test('a swap replaces the options: the old design\'s never reach the new one', () => {
  const bare = planEdits(
    spec,
    document({ patterns: { 'coda.field': { slug: 'frond' } } })
  );

  assert.deepEqual(operationFor(bare, 'pattern', 'coda.field').attributes, {
    'data-pattern': 'frond',
    'data-options': null,
  });

  const withOptions = planEdits(
    spec,
    document({
      patterns: { 'coda.field': { slug: 'frond', options: { scale: 3 } } },
    })
  );

  assert.deepEqual(operationFor(withOptions, 'pattern', 'coda.field').attributes, {
    'data-pattern': 'frond',
    'data-options': 'scale: 3',
  });

  // Options that are not even values are refused, and the swap still clears
  // the old set.
  const refused = planEdits(
    spec,
    document({
      patterns: { 'coda.field': { slug: 'frond', options: { scale: { x: 1 } } } },
    })
  );

  assert.ok(hasErrors(refused.problems));
  assert.equal(refused.problems[0].path, 'patterns.coda.field.options.scale');
  assert.deepEqual(operationFor(refused, 'pattern', 'coda.field').attributes, {
    'data-pattern': 'frond',
    'data-options': null,
  });
});

test('a swap is held to the catalog when one is given', () => {
  const known = planEdits(
    spec,
    document({ patterns: { 'hero.field': { slug: 'frond' } } }),
    { designs: ['lobe', 'frond'] }
  );

  assert.equal(known.problems.length, 0);
  assert.equal(
    operationFor(known, 'pattern', 'hero.field').attributes['data-pattern'],
    'frond'
  );

  // An unknown slug hydrates to nothing - a blank field with a console
  // warning - so it is refused outright, and nothing else in the slot's edit
  // is written either.
  const unknown = planEdits(
    spec,
    document({ patterns: { 'hero.field': { slug: 'nonesuch', seed: 'x' } } }),
    { designs: new Set(['lobe', 'frond']) }
  );

  assert.equal(unknown.problems.length, 1);
  assert.equal(unknown.problems[0].level, 'error');
  assert.equal(unknown.problems[0].path, 'patterns.hero.field.slug');
  assert.match(unknown.problems[0].message, /no design "nonesuch"/);
  assert.equal(operationFor(unknown, 'pattern', 'hero.field'), undefined);

  // The slot's own design is never a swap, so it needs no entry in the set.
  const same = planEdits(
    spec,
    document({ patterns: { 'hero.field': { slug: 'lobe', seed: 'sol-2' } } }),
    { designs: ['frond'] }
  );

  assert.equal(same.problems.length, 0);
  assert.deepEqual(operationFor(same, 'pattern', 'hero.field').attributes, {
    'data-seed': 'sol-2',
  });
});

test('an image edit keeps the existing alt when none is given', () => {
  const plan = planEdits(
    spec,
    document({ images: { 'hero.photo': { src: '/uploads/a.webp' } } })
  );

  assert.deepEqual(operationFor(plan, 'image', 'hero.photo'), {
    type: 'image',
    id: 'hero.photo',
    src: '/uploads/a.webp',
    alt: 'A sunlit studio',
  });
});

test('an image src that is not a picture is refused, and the rest still applies', () => {
  for (const src of [
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    '  javascript:alert(1)',
    'java\tscript:alert(1)',
    '\u0001javascript:alert(1)',
    'vbscript:msgbox(1)',
    'data:text/html,<script>alert(1)</script>',
    'data:,hello',
    'file:///etc/passwd',
  ]) {
    const plan = planEdits(
      spec,
      document({
        images: { 'hero.photo': { src } },
        text: { 'hero.lede': 'Still here.' },
      })
    );

    assert.ok(hasErrors(plan.problems), src);
    assert.equal(plan.problems[0].path, 'images.hero.photo.src', src);
    assert.equal(operationFor(plan, 'image', 'hero.photo'), undefined, src);
    assert.ok(operationFor(plan, 'text', 'hero.lede'), src);
  }

  // What the site and Studio actually write, and the ordinary URL shapes.
  for (const src of [
    '/images/template/react__solstice__hero-0.webp',
    '/api/media/gen/site/abc/hero.webp',
    'images/hero.webp',
    './images/hero.webp',
    '../hero.webp',
    'hero.webp?v=2#top',
    'https://example.com/a.png',
    'HTTP://example.com/a.png',
    '//cdn.example.com/a.png',
    'data:image/png;base64,iVBORw0KGgo=',
    'DATA:image/svg+xml,<svg/>',
    'blob:https://tabbied.com/6f1c',
  ]) {
    const plan = planEdits(spec, document({ images: { 'hero.photo': { src } } }));

    assert.deepEqual(plan.problems, [], src);
    assert.equal(operationFor(plan, 'image', 'hero.photo').src, src);
  }
});

test('applyPlan never writes an unsafe src, even from a hand-built plan', () => {
  const written = [];
  const img = {
    tagName: 'IMG',
    setAttribute: (name, value) => written.push([name, value]),
    removeAttribute: () => {},
  };
  const root = { querySelectorAll: () => [img], querySelector: () => null };

  const result = applyPlan(root, {
    problems: [],
    operations: [
      { type: 'image', id: 'hero.photo', src: 'javascript:alert(1)', alt: 'x' },
    ],
  });

  assert.equal(result.applied, 0);
  assert.equal(result.problems[0].path, 'images.hero.photo.src');
  assert.deepEqual(written, []);

  const safe = applyPlan(root, {
    problems: [],
    operations: [{ type: 'image', id: 'hero.photo', src: '/a.webp', alt: 'x' }],
  });

  assert.equal(safe.applied, 1);
  assert.deepEqual(written, [
    ['src', '/a.webp'],
    ['alt', 'x'],
  ]);
});

test('any JSON as an edits document comes back as problems, never a throw', () => {
  for (const candidate of [
    null,
    undefined,
    [],
    5,
    'edits',
    true,
    {},
    { specVersion: SPEC_VERSION },
    { specVersion: SPEC_VERSION, slug: 'solstice', edits: null },
  ]) {
    const label = JSON.stringify(candidate) ?? String(candidate);
    const problems = validateEdits(spec, candidate);

    // The last one is a valid, empty document; everything else is an error.
    if (candidate?.slug === 'solstice') assert.deepEqual(problems, [], label);
    else assert.ok(hasErrors(problems), label);
  }

  for (const edits of [
    'edits',
    [],
    5,
    { text: 'x' },
    { text: ['x'] },
    { images: 5 },
    { images: { 'hero.photo': 'x' } },
    { images: { 'hero.photo': null } },
    { images: { 'hero.photo': { src: '/a.webp', alt: 5 } } },
    { patterns: 'x' },
    { patterns: { 'hero.field': 'x' } },
    { patterns: { 'hero.field': [] } },
    { patterns: { 'hero.field': { options: 'grid: 4x6' } } },
    { patterns: { 'hero.field': { options: [1] } } },
    { patterns: { 'hero.field': { options: { grid: null } } } },
    { patterns: { 'hero.field': { palette: 'navy' } } },
    { patterns: { 'hero.field': { slug: 5 } } },
    { patterns: { 'hero.field': { seed: 5 } } },
    { palette: { 0: '#000000' } },
    { text: { 'hero.lede': { value: 'x' } } },
  ]) {
    const label = JSON.stringify(edits);
    const problems = validateEdits(spec, document(edits));

    assert.ok(hasErrors(problems), label);
  }

  // Nor does a spec that is not one.
  for (const bad of [null, {}, [], 'spec', { site: {}, palette: {}, slots: 'x' }]) {
    assert.ok(hasErrors(validateEdits(bad, document({}))), JSON.stringify(bad));
  }
});

test('a mismatched slug or spec version stops everything', () => {
  const wrongSlug = planEdits(spec, {
    specVersion: SPEC_VERSION,
    slug: 'facet',
    edits: { text: { 'hero.lede': 'x' } },
  });

  assert.ok(hasErrors(wrongSlug.problems));
  assert.deepEqual(wrongSlug.operations, []);

  const wrongVersion = planEdits(spec, {
    specVersion: SPEC_VERSION + 1,
    slug: 'solstice',
    edits: { text: { 'hero.lede': 'x' } },
  });

  assert.ok(hasErrors(wrongVersion.problems));
  assert.deepEqual(wrongVersion.operations, []);
});

test('validateSpec catches the failures that would rot silently', () => {
  assert.deepEqual(validateSpec(spec), []);

  const duplicated = {
    ...spec,
    slots: [...spec.slots, { id: 'hero.lede', kind: 'text', value: 'x', format: 'plain' }],
  };

  assert.ok(hasErrors(validateSpec(duplicated)));
  assert.match(validateSpec(duplicated)[0].message, /duplicate slot id/);

  const badRole = {
    ...spec,
    slots: [
      {
        id: 'x',
        kind: 'pattern',
        config: { slug: 'lobe' },
        paletteRoles: [-1],
      },
    ],
  };

  assert.ok(hasErrors(validateSpec(badRole)));
});

test('validateSpec checks the derivation, the slot kinds and the role range', () => {
  const badDerivation = {
    ...spec,
    palette: { ...spec.palette, derivation: 'cmyk' },
  };

  assert.deepEqual(validateSpec(badDerivation), [
    {
      level: 'error',
      path: 'palette.derivation',
      message: 'derivation must be one of: direct, templateSite, vars',
    },
  ]);

  const badKind = {
    ...spec,
    slots: [{ id: 'hero.video', kind: 'video', src: '/a.mp4' }],
  };

  assert.ok(hasErrors(validateSpec(badKind)));
  assert.equal(validateSpec(badKind)[0].path, 'hero.video.kind');
  assert.match(validateSpec(badKind)[0].message, /"video" is not one of/);

  // Three colors, so role 3 is past the end; resolvePaletteRoles would wrap it
  // onto role 0 without a word.
  const pastEnd = {
    ...spec,
    slots: [
      {
        id: 'x',
        kind: 'pattern',
        config: { slug: 'lobe' },
        paletteRoles: ['transparent', 2, 3],
      },
    ],
  };

  assert.deepEqual(validateSpec(pastEnd), [
    {
      level: 'error',
      path: 'x.paletteRoles[2]',
      message: 'role 3 is past the end of the palette (3 colors)',
    },
  ]);

  const missingFields = {
    ...spec,
    slots: [
      { id: 'a', kind: 'text', value: 5, format: 'bold' },
      { id: 'b', kind: 'image' },
      { id: 'c', kind: 'pattern', config: {}, options: {}, paletteRoles: 'x' },
      { id: 'd', kind: 'pattern', config: { slug: 'lobe', options: 'grid: 4x6' }, options: [null] },
    ],
  };

  assert.deepEqual(
    validateSpec(missingFields).map((problem) => problem.path),
    [
      'a.value',
      'a.format',
      'b.src',
      'c.config.slug',
      'c.options',
      'c.paletteRoles',
      'd.config.options',
      'd.options',
    ]
  );
});

test('validateSpec returns problems for any JSON, never a throw', () => {
  for (const candidate of [
    null,
    undefined,
    [],
    5,
    'spec',
    {},
    { specVersion: SPEC_VERSION },
    { ...spec, site: null },
    { ...spec, site: { slug: 5 } },
    { ...spec, palette: null },
    { ...spec, palette: { colors: 'navy', derivation: 'direct' } },
    { ...spec, slots: null },
    { ...spec, slots: [null, 5, 'x', [], { kind: 'text' }, { id: 5 }] },
  ]) {
    const label = JSON.stringify(candidate) ?? String(candidate);
    let problems;

    assert.doesNotThrow(() => {
      problems = validateSpec(candidate);
    }, label);
    assert.ok(hasErrors(problems), label);
  }
});
