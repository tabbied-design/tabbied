// tabbied/element/react-jsx types <tabbied-pattern> in React's JSX. The
// fixture is a .tsx file a React 19 app would write; it must compile, and
// without the import the same file must not (which is the error people hit).
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fixture = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'react-jsx');

// Absolute paths: npx runs from the workspace, not from `cwd`.
const tsc = (project) =>
  spawnSync('npx', ['tsc', '-p', path.join(fixture, project)], {
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

test('the tag type-checks in TSX once the types are imported', () => {
  const result = tsc('tsconfig.json');
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('without them, the tag is not a JSX element', () => {
  const source = readFileSync(path.join(fixture, 'app.tsx'), 'utf8');
  const bare = path.join(fixture, 'bare.tsx');
  const config = path.join(fixture, 'tsconfig.bare.json');

  writeFileSync(bare, source.replace("import 'tabbied/element/react-jsx';\n", ''));
  writeFileSync(
    config,
    JSON.stringify({ extends: './tsconfig.json', files: ['bare.tsx'] })
  );
  try {
    const result = tsc('tsconfig.bare.json');
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /tabbied-pattern/);
  } finally {
    rmSync(bare, { force: true });
    rmSync(config, { force: true });
  }
});
