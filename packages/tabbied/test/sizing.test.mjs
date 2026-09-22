import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_CELL_PX,
  densityFromGrid,
  densityToCellPx,
  deriveGridForBox,
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
