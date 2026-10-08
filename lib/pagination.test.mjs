import test from 'node:test';
import assert from 'node:assert/strict';

import { paginationWindow, PAGER_SLOTS, PAGER_SLOTS_NARROW } from './pagination.ts';

const draw = (items) => items.map((p) => (p === null ? '...' : p)).join(' ');

test('every page is drawn while they fit', () => {
  assert.equal(draw(paginationWindow(1, 1)), '1');
  assert.equal(draw(paginationWindow(3, 6)), '1 2 3 4 5 6');
  assert.equal(draw(paginationWindow(11, 11)), '1 2 3 4 5 6 7 8 9 10 11');
  assert.equal(draw(paginationWindow(2, 7, 7)), '1 2 3 4 5 6 7');
});

test('the long run follows the end the page is near', () => {
  assert.equal(draw(paginationWindow(1, 27)), '1 2 3 4 5 6 7 8 9 ... 27');
  assert.equal(draw(paginationWindow(6, 27)), '1 2 3 4 5 6 7 8 9 ... 27');
  assert.equal(draw(paginationWindow(7, 27)), '1 ... 4 5 6 7 8 9 10 ... 27');
  assert.equal(draw(paginationWindow(14, 27)), '1 ... 11 12 13 14 15 16 17 ... 27');
  assert.equal(draw(paginationWindow(21, 27)), '1 ... 18 19 20 21 22 23 24 ... 27');
  assert.equal(draw(paginationWindow(22, 27)), '1 ... 19 20 21 22 23 24 25 26 27');
  assert.equal(draw(paginationWindow(27, 27)), '1 ... 19 20 21 22 23 24 25 26 27');
});

test('the narrow pager keeps one neighbor each way', () => {
  assert.equal(draw(paginationWindow(1, 27, 7)), '1 2 3 4 5 ... 27');
  assert.equal(draw(paginationWindow(14, 27, 7)), '1 ... 13 14 15 ... 27');
  assert.equal(draw(paginationWindow(27, 27, 7)), '1 ... 23 24 25 26 27');
});

test('a constant width, the current page, and no ellipsis standing for one page', () => {
  for (const slots of [PAGER_SLOTS, PAGER_SLOTS_NARROW]) {
    for (let count = 1; count <= 60; count += 1) {
      for (let page = 1; page <= count; page += 1) {
        const items = paginationWindow(page, count, slots);
        const label = `page ${page} of ${count} in ${slots}: ${draw(items)}`;

        assert.equal(items.length, Math.min(count, slots), label);
        assert.ok(items.includes(page), label);
        assert.equal(items[0], 1, label);
        assert.equal(items.at(-1), count, label);

        items.forEach((p, i) => {
          if (p !== null) return;
          assert.ok(items[i + 1] - items[i - 1] > 2, label);
        });

        const numbers = items.filter((p) => p !== null);
        assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), label);
      }
    }
  }
});
