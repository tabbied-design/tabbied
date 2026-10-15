// The template gallery's search against the real registries: the trades the
// site's own copy names find the templates made for them, and a word inside
// another word is not a match. Appendix A of the 2026-10-15 guest audit is
// the list: every one of these came back empty or wrong. Run with
// `npm run test:lib` after `npm run build:packages`.
import test from 'node:test';
import assert from 'node:assert/strict';

import { indexTemplate, searchTemplates, stem, suggestQueries } from './catalogSearch.ts';
import { NEW_TEMPLATE_SITES } from './templateSites.ts';
import { categoryOf } from './templateCategories.ts';
import { TEMPLATE_SITES } from '../components/template/templateData.ts';

const templates = [
  ...TEMPLATE_SITES.map((site) => ({ slug: site.slug, name: site.brand, topic: site.topic })),
  ...NEW_TEMPLATE_SITES.map((site) => ({ slug: site.slug, name: site.name, topic: site.topic })),
].map((site) => ({ ...site, category: categoryOf(site.slug) }));

const indexes = new Map(templates.map((site) => [site.slug, indexTemplate(site)]));
const search = (query) => searchTemplates(templates, (site) => indexes.get(site.slug), query).map((site) => site.slug);

test('the trades the site names find their templates', () => {
  const expected = {
    plumber: ['northside-plumbing'],
    plumbing: ['northside-plumbing'],
    landscaper: ['fernhill-gardens'],
    landscaping: ['fernhill-gardens'],
    'dog groomer': ['muddy-paws-mobile', 'pawsh-grooming'],
    groomer: ['muddy-paws-mobile', 'pawsh-grooming', 'velvet-cat-grooming'],
    grooming: ['muddy-paws-mobile', 'pawsh-grooming', 'velvet-cat-grooming'],
    electrician: ['live-wire-electric'],
    baker: ['crumb-bakehouse', 'rye-and-levain', 'zaatar-and-co'],
    bakery: ['crumb-bakehouse', 'rye-and-levain', 'zaatar-and-co'],
    florist: ['wild-stem', 'posy-wedding-flowers'],
    barber: ['stropline-barbers'],
    salon: ['fringe-salon', 'polish-nail-bar'],
    'food truck': ['el-farolito-truck'],
    tattoo: ['inkwell-tattoo'],
    accountant: ['tally-and-co', 'ledgerwood-pike-cpas'],
    hair: ['fringe-salon', 'ringlet-curl-studio'],
    upholsterer: ['tack-and-button'],
    locksmith: ['keyway-locksmiths'],
    joiner: ['true-grain-carpentry'],
    hvac: ['northwind-heating-air'],
    lawyer: ['ashby-crane-law', 'maren-cole-defense'],
    dentist: ['clearwater-dental', 'gentle-dental'],
    'café': ['morrow-coffee'],
  };

  for (const [query, slugs] of Object.entries(expected)) {
    const found = search(query);
    for (const slug of slugs) assert.ok(found.includes(slug), `"${query}" misses ${slug} (found ${found.join(', ') || 'nothing'})`);
  }
});

test('a word is matched by word, not inside another one', () => {
  // "chairs" holds "hair"; "Plumbline Payroll" starts like "plumber" but is not one.
  assert.ok(!search('hair').includes('two-chairs-counseling'));
  assert.ok(!search('plumber').includes('plumbline-payroll'));
  // A word still being typed finds what it starts.
  assert.ok(search('plum').includes('northside-plumbing'));
});

test('a stem match ranks above a word that only starts the same', () => {
  const found = search('car');
  assert.equal(found[0], 'suds-car-wash');
});

test('every word must match, in any case; an empty query is everything', () => {
  assert.deepEqual(search('DOG Groomer'), search('dog groomer'));
  assert.equal(search('').length, templates.length);
  assert.deepEqual(search('zzzznothing'), []);
});

test('the forms of a trade share a stem', () => {
  for (const group of [
    ['plumber', 'plumbers', 'plumbing'],
    ['baker', 'bakery', 'bakeries'],
    ['groomer', 'grooming', 'groomers'],
    ['upholsterer', 'upholstery'],
    ['electrician', 'electricians'],
  ]) {
    assert.equal(new Set(group.map(stem)).size, 1, group.join(', '));
  }
});

test('a search that finds nothing is offered the nearest one that does', () => {
  const pool = [...indexes.values()];

  assert.ok(suggestQueries(pool, 'plumer').includes('plumber'));
  assert.ok(suggestQueries(pool, 'lanscaper').includes('landscaping'));
  assert.ok(suggestQueries(pool, 'dog grommer').includes('dog grooming'));
  for (const offer of suggestQueries(pool, 'electrishan')) assert.ok(search(offer).length > 0, offer);
  assert.deepEqual(suggestQueries(pool, 'zzzzzzzz'), []);
});
