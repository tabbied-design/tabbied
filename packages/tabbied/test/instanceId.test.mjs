// Two copies of the library on one page (the CDN element beside an esm.sh
// import) must not hand out the same id: the per-instance <style> is scoped by
// it, and a shared id put one pattern in the other's palette. A query string
// makes Node load a module a second time, the way a second bundle would.
import test from 'node:test';
import assert from 'node:assert/strict';

test('separate copies of the module share one counter', async () => {
  const first = await import('../dist/core/instanceId.js?copy=1');
  const second = await import('../dist/core/instanceId.js?copy=2');

  assert.notEqual(first, second, 'the two imports are one module instance');

  const ids = [
    first.nextInstanceId(),
    second.nextInstanceId(),
    first.nextInstanceId(),
    second.nextInstanceId(),
  ];
  assert.equal(new Set(ids).size, ids.length, `ids repeat: ${ids.join(', ')}`);
});

test('ids never take the shape 0.8.0 and earlier used ("t0")', async () => {
  const { nextInstanceId } = await import('../dist/core/instanceId.js');

  assert.match(nextInstanceId(), /^t-\d+$/);
});

test('createPattern takes its id from the shared counter', async () => {
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(new URL('../dist/core/createPattern.js', import.meta.url), 'utf8');

  assert.match(source, /nextInstanceId\(\)/);
  assert.doesNotMatch(source, /instanceCounter\+\+/);
});
