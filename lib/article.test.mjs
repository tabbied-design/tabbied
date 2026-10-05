import test from 'node:test';
import assert from 'node:assert/strict';

import { withArticle } from './article.ts';

test('an before a vowel sound, a before a consonant sound', () => {
  assert.equal(withArticle('indoor plant shop'), 'an indoor plant shop');
  assert.equal(withArticle('urgent care walk-in clinic'), 'an urgent care walk-in clinic');
  assert.equal(withArticle('heirloom seed company'), 'an heirloom seed company');
  assert.equal(withArticle('hair salon'), 'a hair salon');
  assert.equal(withArticle('university bookshop'), 'a university bookshop');
  assert.equal(withArticle('bakery'), 'a bakery');
});
