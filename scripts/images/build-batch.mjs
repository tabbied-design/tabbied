// Step 2 of 4. Turn the prompt manifest into the list of tasks to submit.
//
//   node scripts/images/build-batch.mjs                 # only what is still missing
//   node scripts/images/build-batch.mjs --all           # include what is already on disk
//   node scripts/images/build-batch.mjs --only static   # one stack, site, or id substring
//   node scripts/images/build-batch.mjs --model z-image
//
// To redo a finished image, pair `--all --only <id>` here with
// `submit-batch.mjs --force`, which lets an id already recorded as successful
// be regenerated.
//
// KIE has no bulk-submit endpoint, so this writes a plain plan of one job per
// image. Each entry keeps the manifest id, the finished image's filename.
import path from 'node:path';
import fs from 'node:fs';
import { MANIFEST, MODEL, PROMPT_MAX, ROOT, TASKS, argv, imagePath, readJson, writeJson } from './common.mjs';

const args = argv();
const manifest = readJson(MANIFEST);

if (!manifest) {
  console.error('No manifest. Run: node scripts/images/extract-prompts.mjs');
  process.exit(1);
}

const model = typeof args.model === 'string' ? args.model : MODEL;
const only = typeof args.only === 'string' ? args.only : null;
// Aliases are matched too: slots that share a prompt collapse into one record,
// so the id you read off a page may be an alias of the one that generates it.
const matches = (p) =>
  !only ||
  p.stack === only ||
  p.site === only ||
  p.id.includes(only) ||
  (p.aliases ?? []).some((alias) => alias.includes(only));

const selected = manifest.prompts.filter(matches);
// --force is an alias of --all, so the regenerate chain reads the same in
// every step.
const all = Boolean(args.all || args.force);
const pending = all ? selected : selected.filter((p) => !fs.existsSync(imagePath(p.id)));

if (!pending.length) {
  console.log(`Nothing to generate (${selected.length} selected, all already in public/images/template).`);
  process.exit(0);
}

const overlong = pending.filter((p) => p.prompt.length > PROMPT_MAX);

if (overlong.length) {
  console.error(`${overlong.length} prompt(s) exceed the ${PROMPT_MAX}-character limit; shorten them first:`);
  for (const p of overlong) console.error(`  ${p.id} (${p.prompt.length})`);
  process.exit(1);
}

const tasks = pending.map((p) => ({
  id: p.id,
  maxWidth: p.maxWidth,
  aliases: p.aliases,
  // The request body KIE expects, ready to POST as-is.
  body: {
    model,
    input: {
      prompt: p.prompt,
      aspect_ratio: p.aspectRatio,
    },
  },
}));

writeJson(TASKS, { model, createdAt: new Date().toISOString(), tasks });

const ratios = tasks.reduce((acc, t) => {
  const r = t.body.input.aspect_ratio;
  return { ...acc, [r]: (acc[r] ?? 0) + 1 };
}, {});

console.log(`${tasks.length} task(s) -> ${path.relative(ROOT, TASKS)}`);
console.log(`  model ${model}, aspect ratios: ${Object.entries(ratios).map(([k, v]) => `${k} x${v}`).join(', ')}`);
console.log('Next: node scripts/images/submit-batch.mjs --watch');
