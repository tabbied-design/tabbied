import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_CELL_PX,
  densityFromGrid,
  densityToCellPx,
  deriveGridForBox,
  snapCellToBox,
  snapSpanToTracks,
} from '../dist/core/sizing.js';

// css-doodle lays a grid out as `repeat(n, 1fr)`. A container that isn't
// divisible by n puts every cell boundary on a sub-pixel and the browser
// draws a hairline seam at each one, so the canvas is rounded up to a whole
// multiple of the track count and the host clips the remainder.

test('snapSpanToTracks returns whole tracks', async (t) => {
  await t.test('leaves an already-divisible span alone', () => {
    assert.equal(snapSpanToTracks(1440, 12), 1440); // cell 120, even
    assert.equal(snapSpanToTracks(648, 9), 648); // cell 72, even
  });

  await t.test('rounds up to the next even-celled multiple', () => {
    assert.equal(snapSpanToTracks(1441, 12), 1464);
    assert.equal(snapSpanToTracks(1000, 7), 1008);
  });

  await t.test('every track is a whole, even number of pixels', () => {
    for (let span = 1; span <= 2000; span += 7) {
      for (const tracks of [1, 3, 7, 12, 22, 36, 64]) {
        const snapped = snapSpanToTracks(span, tracks);

        assert.equal(
          snapped % tracks,
          0,
          `${span}/${tracks} -> ${snapped} is not a whole number of tracks`
        );
        assert.ok(snapped >= span, `${snapped} must still cover ${span}`);
        assert.equal(
          (snapped / tracks) % 2,
          0,
          `${span}/${tracks} -> cell ${snapped / tracks} must be even so a ` +
            'design that halves its cell lands on a whole pixel'
        );
        assert.ok(
          snapped - span < tracks * 2,
          `overflow ${snapped - span} must stay under two cells (${tracks} tracks)`
        );
      }
    }
  });

  await t.test('degenerate spans and track counts stay finite', () => {
    assert.equal(snapSpanToTracks(0, 8), 0);
    assert.equal(snapSpanToTracks(-10, 8), 0);
    assert.equal(snapSpanToTracks(100, 0), 100);
  });
});

test('a snapped box divides evenly by its derived grid', () => {
  // The boxes that showed seams on the template pages: full-width bands and
  // content-height section fields at common viewport widths.
  const boxes = [
    [1440, 240],
    [1440, 355.78],
    [1280, 419],
    [1024, 613],
    [768, 297],
    [390, 812],
  ];

  for (const [width, height] of boxes) {
    for (const cell of [36, 48, 72, 104, 120, 144]) {
      const { cols, rows } = deriveGridForBox(width, height, cell);

      assert.equal((snapSpanToTracks(width, cols) / cols) % 2, 0);
      assert.equal((snapSpanToTracks(height, rows) / rows) % 2, 0);
    }
  }
});

// The cell both fits use, and the editor's plate: whole on both axes, and
// square, because a quarter-turned oblong cell leaves a strip of its box
// uncovered however exact the tracks are.
test('snapCellToBox is a whole, divisible, square cell that covers the box', async (t) => {
  await t.test('an exact, square grid is left alone', () => {
    assert.equal(snapCellToBox(780, 780, 13, 13), 60);
    assert.equal(snapCellToBox(1440, 240, 12, 2), 120);
  });

  await t.test('the editor plate that seamed: a 3:2 plate at 15x10', () => {
    // 873 / 15 and 582 / 10 are both 58.2: every boundary on a sub-pixel.
    const cell = snapCellToBox(873, 582, 15, 10);

    assert.equal(cell, 60);
    assert.ok(15 * cell >= 873);
    assert.ok(10 * cell >= 582);
  });

  await t.test('an oblong cell is squared to the larger axis', () => {
    // Cobalt Works' coda: 12 x 120 across and 2 x 124 down, both exact and
    // still seamed once the cells were rotated. The squared cell is 124.
    assert.equal(snapCellToBox(1440, 248, 12, 2), 124);
  });

  await t.test('the cell is a multiple of cellMultiple and the canvas covers the box', () => {
    const boxes = [
      [1440, 240],
      [1440, 355.78],
      [873, 582],
      [1024, 613],
      [768, 297],
      [390, 812],
    ];

    for (const [width, height] of boxes) {
      for (const target of [36, 48, 60, 72, 104, 120, 144]) {
        for (const multiple of [2, 3, 4]) {
          const { cols, rows } = deriveGridForBox(width, height, target);
          const cell = snapCellToBox(width, height, cols, rows, multiple);

          assert.equal(cell % multiple, 0);
          assert.ok(cols * cell >= width);
          assert.ok(rows * cell >= height);
          // Under a multiple beyond the larger of the two natural cells: the
          // overflow the host clips stays a sliver, not a whole cell.
          assert.ok(cell < Math.max(width / cols, height / rows) + multiple);
        }
      }
    }
  });

  await t.test('a degenerate grid is treated as one cell', () => {
    assert.equal(snapCellToBox(100, 50, 0, 0), 100);
  });
});


// `density` is one number from 0 (coarse) to 1 (fine), mapped onto the cell
// sizes the editor's original 360px plate drew at its five stops, so the
// former integer levels 0..4 sit at 0, 0.25, 0.5, 0.75 and 1 exactly.

test('densityToCellPx walks the original plate from 2 to 10 cells across', async (t) => {
  await t.test('the five former stops are exact', () => {
    assert.equal(densityToCellPx(0), 180);
    assert.equal(densityToCellPx(0.25), 90);
    assert.equal(densityToCellPx(0.5), 60);
    assert.equal(densityToCellPx(0.75), 45);
    assert.equal(densityToCellPx(1), 36);
  });

  await t.test('the package default is the finest stop', () => {
    assert.equal(DEFAULT_CELL_PX, densityToCellPx(1));
  });

  await t.test('values outside the range clamp', () => {
    assert.equal(densityToCellPx(-1), 180);
    assert.equal(densityToCellPx(2), 36);
    assert.equal(densityToCellPx(4), 36);
  });

  await t.test('the mapping is monotonic', () => {
    let previous = Infinity;

    for (let d = 0; d <= 1.0001; d += 0.05) {
      const cell = densityToCellPx(d);

      assert.ok(cell < previous, `${d} -> ${cell} should be finer than ${previous}`);
      previous = cell;
    }
  });
});

test('densityFromGrid reads an authored grid back as a density', async (t) => {
  await t.test('the original 2:3 grid list maps onto the five stops', () => {
    assert.equal(densityFromGrid('2x3'), 0);
    assert.equal(densityFromGrid('4x6'), 0.25);
    assert.equal(densityFromGrid('6x9'), 0.5);
    assert.equal(densityFromGrid('8x12'), 0.75);
    assert.equal(densityFromGrid('10x15'), 1);
  });

  await t.test('the long edge decides, whichever axis it is on', () => {
    assert.equal(densityFromGrid('9x9'), 0.5);
    assert.equal(densityFromGrid('9x6'), 0.5);
    assert.equal(densityFromGrid('7x7'), 0.33);
  });

  await t.test('anything finer than the finest stop clamps to 1', () => {
    assert.equal(densityFromGrid('80x1'), 1);
    assert.equal(densityFromGrid('16x16'), 1);
  });

  await t.test('a value that is not a colsxrows grid is null', () => {
    assert.equal(densityFromGrid('8'), null);
    assert.equal(densityFromGrid(''), null);
    assert.equal(densityFromGrid('axb'), null);
  });
});

// A design whose cells are a count of things (radiantswirl's rings) is held
// to the count it was drawn for, however fine the density asks for.
test('maxCells caps a derived grid at the design\'s own count', () => {
  const boxes = [
    [418, 646],
    [1440, 900],
    [300, 260],
    [2000, 120],
    [120, 2000],
    [5000, 40],
  ];

  for (const maxCells of [6, 16, 28, 120]) {
    for (const [width, height] of boxes) {
      for (const target of [36, 60, 180]) {
        const { cols, rows } = deriveGridForBox(width, height, target, { maxCells });

        assert.ok(cols >= 1 && rows >= 1);
        assert.ok(cols * rows <= maxCells, `${width}x${height} @${target}: ${cols}x${rows} > ${maxCells}`);
      }
    }
  }

  // The editor's densest plate: 187 rings uncapped, 28 at most capped, and
  // a coarse density under the cap is left as it was.
  assert.deepEqual(deriveGridForBox(418, 646, 36), { cols: 11, rows: 17 });
  const capped = deriveGridForBox(418, 646, 36, { maxCells: 28 });
  assert.ok(capped.cols * capped.rows <= 28 && capped.cols * capped.rows >= 20);
  assert.deepEqual(deriveGridForBox(418, 646, 180, { maxCells: 28 }), deriveGridForBox(418, 646, 180));
});
