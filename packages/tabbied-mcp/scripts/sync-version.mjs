// Writes package.json's version into src/info.ts.
//
// VERSION is a literal there because the module is bundled into a Cloudflare
// Worker, which has no filesystem to read package.json from. `changeset
// version` bumps package.json and knows nothing of the literal, so the root
// `version-packages` script runs this straight after it, and the version
// commit (the "Version Packages" PR, or the weekly release's own commit)
// carries both. test/info.test.mjs still fails if they ever disagree.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const infoPath = path.join(packageRoot, 'src', 'info.ts');

const { version } = JSON.parse(
  fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf-8')
);

const LITERAL = /^export const VERSION = '([^']*)';$/m;
const source = fs.readFileSync(infoPath, 'utf-8');
const current = LITERAL.exec(source)?.[1];

if (current === undefined) {
  // Fail rather than skip: a version commit that silently left the literal
  // behind would publish a server that reports the wrong version.
  console.error(`sync-version: no "export const VERSION = '...';" line in ${infoPath}`);
  process.exit(1);
}

if (current === version) {
  console.log(`sync-version: src/info.ts already reports ${version}`);
} else {
  fs.writeFileSync(infoPath, source.replace(LITERAL, `export const VERSION = '${version}';`));
  console.log(`sync-version: src/info.ts ${current} -> ${version}`);
}
