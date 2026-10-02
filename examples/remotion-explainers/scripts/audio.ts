// Narration, music and the final mix for the films, through the ElevenLabs
// API, then onto the rendered video with ffmpeg.
//
//   npx tsx scripts/audio.ts <film|all> [--narrate] [--music] [--mix] [options]
//
// <film> is grace-hopper, credit-cards or marmots. With no step named, all
// three run:
//
//   --narrate   one Eleven v4 line per scene (scripts/narration/<film>.json),
//               written to public/audio/<film>/narration/
//   --music     one instrumental bed the length of the film (Eleven Music),
//               written to public/audio/<film>/music.mp3
//   --mix       the lines laid on the film's clock (src/<film>/timing.ts),
//               the music ducked under them, loudness-normalized, and muxed
//               onto out/<film>.mp4 as out/<film>-narrated.mp4
//
// Options:
//   --dry-run          print the plan and the character count; call nothing
//   --force            ask the API again even when a cached file matches
//   --key-file <path>  the API key file (default: ELEVENLABS_API_KEY.txt here
//                      or at the repo root; ELEVENLABS_API_KEY also works)
//   --video <path>     the render to mux onto (default: out/<film>.mp4)
//   voices [search]    list the account's voices, or search the library
//
// Every request is cached by a hash of what was asked for, in
// public/audio/<film>/manifest.json, so a rerun pays only for what changed.
// ELEVENLABS_BASE_URL points it elsewhere (a region, or the stub in
// scripts/elevenlabs-stub.ts that the tests run against).
//
// ffmpeg and ffprobe come from FFMPEG and FFPROBE when they are set, else from
// PATH, else from Remotion, which ships both with its renderer (they are what
// `npx remotion ffmpeg` runs), so a project that can render can also mix.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { TIMING as CREDIT_CARDS } from '../src/credit-cards/timing';
import { TIMING as GRACE_HOPPER } from '../src/grace-hopper/timing';
import { TIMING as MARMOTS } from '../src/marmots/timing';
import { FPS, sceneStarts, timelineDuration, type Timing } from '../src/timeline';

const run = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const FILMS: Record<string, Timing> = {
  'grace-hopper': GRACE_HOPPER,
  'credit-cards': CREDIT_CARDS,
  marmots: MARMOTS,
};

/** A line starts this many frames into its scene, once the transition in is mostly done. */
const LEAD_IN = 10;
/** And must be over this many frames before the next line starts. */
const GAP = 6;
/** The last line ends this many frames before the film does (the closing fade). */
const TAIL = 20;
/** For --dry-run only: a measured narrator's pace, to size lines before paying for them. */
const WORDS_PER_SECOND = 2.5;
/** Eleven v4 takes speeds from 0.7 to 1.2; a line that overruns is sped up, never past this. */
const MAX_SPEED = 1.15;
const OUTPUT_FORMAT = 'mp3_44100_128';

type Spec = {
  voice: { id: string; name: string };
  model: string;
  voiceSettings: {
    stability: number;
    similarity_boost: number;
    style: number;
    use_speaker_boost: boolean;
    speed: number;
  };
  music: { model: string; prompt: string; gainDb: number; seed?: number };
  lines: { scene: string; text: string }[];
};

type Cue = { scene: string; text: string; startFrame: number; windowFrames: number };

type Manifest = {
  voiceId?: string;
  lines: Record<string, { file: string; hash: string; seconds: number; speed: number }>;
  music?: { file: string; hash: string; seconds: number };
};

// ---------------------------------------------------------------- arguments

const argv = process.argv.slice(2);
const flag = (name: string) => argv.includes(`--${name}`);
const option = (name: string) => {
  const at = argv.indexOf(`--${name}`);
  return at >= 0 ? argv[at + 1] : undefined;
};
const positional = argv.filter((arg, i) => !arg.startsWith('--') && !argv[i - 1]?.match(/^--(key-file|video)$/));

const DRY_RUN = flag('dry-run');
const FORCE = flag('force');
const named = ['narrate', 'music', 'mix'].filter(flag);
const STEPS = new Set(named.length ? named : ['narrate', 'music', 'mix']);
const BASE = (process.env.ELEVENLABS_BASE_URL ?? 'https://api.elevenlabs.io').replace(/\/$/, '');

// ---------------------------------------------------------------- helpers

const exists = (file: string) => access(file).then(() => true, () => false);
// The host is part of every cache key, so audio made against the stub (or
// another region) is never taken for the real API's.
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify([BASE, value])).digest('hex').slice(0, 16);
const seconds = (frames: number) => frames / FPS;
const words = (text: string) => text.replace(/\[[^\]]*\]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const pauses = (text: string) => (text.match(/\[(long )?pause\]/g) ?? []).length;

async function apiKey(): Promise<string> {
  const candidates = [option('key-file'), path.join(root, 'ELEVENLABS_API_KEY.txt'), path.join(root, '../../ELEVENLABS_API_KEY.txt')];
  for (const file of candidates) {
    if (!file || !(await exists(file))) continue;
    const key = (await readFile(file, 'utf8')).trim();
    if (!key) throw new Error(`${file} is empty.`);
    return key;
  }
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  throw new Error('No API key: put it in ELEVENLABS_API_KEY.txt in this folder (it is gitignored), or pass --key-file.');
}

class ApiError extends Error {
  constructor(readonly status: number, readonly body: string, where: string) {
    super(`${where}: ${status} ${body.slice(0, 400)}`);
  }
}

/** One API call, with retries for rate limits and server errors. */
async function api(key: string, route: string, init: { method?: string; json?: unknown } = {}): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(`${BASE}${route}`, {
      method: init.method ?? 'GET',
      headers: { 'xi-api-key': key, ...(init.json ? { 'Content-Type': 'application/json' } : {}) },
      body: init.json ? JSON.stringify(init.json) : undefined,
    });
    if (response.ok) return response;
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 4) {
      throw new ApiError(response.status, await response.text(), `${init.method ?? 'GET'} ${route.split('?')[0]}`);
    }
    const wait = Number(response.headers.get('retry-after')) * 1000 || 2 ** attempt * 1000;
    console.warn(`  ${response.status}, retrying in ${wait / 1000}s`);
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
}

// ---------------------------------------------------------------- ffmpeg

type Tool = { name: string; command: string; prefix: string[] };
const tools: Partial<Record<'ffmpeg' | 'ffprobe', Tool>> = {};

/**
 * Finds ffmpeg or ffprobe: the environment variable, then PATH, then the copy
 * Remotion bundles (run through its CLI, which sets up the libraries it
 * needs). Called before any API request, so a missing tool costs nothing.
 */
async function resolveTool(name: 'ffmpeg' | 'ffprobe'): Promise<Tool> {
  if (tools[name]) return tools[name];
  const variable = name.toUpperCase();
  const candidates: Tool[] = [
    ...(process.env[variable] ? [{ name: process.env[variable]!, command: process.env[variable]!, prefix: [] }] : []),
    { name, command: name, prefix: [] },
    {
      name: `Remotion's ${name}`,
      command: process.execPath,
      prefix: [path.join(root, 'node_modules', '@remotion', 'cli', 'remotion-cli.js'), name],
    },
  ];
  for (const tool of candidates) {
    try {
      await run(tool.command, [...tool.prefix, '-version']);
      if (tool.prefix.length) console.log(`  (no ${name} on PATH; using ${tool.name})`);
      return (tools[name] = tool);
    } catch {
      // Not there; try the next.
    }
  }
  throw new Error(
    `No ${name} found. Install ffmpeg (brew install ffmpeg, or conda install -c conda-forge ffmpeg), ` +
      `set ${variable} to its path, or run npm install in this folder so Remotion's own copy is there.`
  );
}

const ffmpeg = async (args: string[]) => {
  const tool = await resolveTool('ffmpeg');
  return run(tool.command, [...tool.prefix, ...args], { maxBuffer: 16 * 1024 * 1024 });
};

async function duration(file: string): Promise<number> {
  const tool = await resolveTool('ffprobe');
  const { stdout } = await run(tool.command, [
    ...tool.prefix,
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file,
  ]);
  return Number(stdout.trim());
}

async function loadSpec(film: string): Promise<Spec> {
  return JSON.parse(await readFile(path.join(here, 'narration', `${film}.json`), 'utf8'));
}

async function loadManifest(dir: string): Promise<Manifest> {
  const file = path.join(dir, 'manifest.json');
  return (await exists(file)) ? JSON.parse(await readFile(file, 'utf8')) : { lines: {} };
}

/**
 * Each line on the film's clock: it starts LEAD_IN frames into its scene and
 * has until GAP frames before the next line starts (or TAIL before the end).
 */
function plan(film: string, spec: Spec): Cue[] {
  const timing = FILMS[film];
  const starts = sceneStarts(timing);
  const end = timelineDuration(timing);
  const index = new Map(timing.map((scene, i) => [scene.id as string, i]));
  let previous = -1;

  return spec.lines.map((line, i) => {
    const at = index.get(line.scene);
    if (at === undefined) throw new Error(`${film}: no scene "${line.scene}" in timing.ts`);
    if (at <= previous) throw new Error(`${film}: lines must follow the scenes' order, one per scene ("${line.scene}")`);
    previous = at;

    const next = spec.lines[i + 1];
    const startFrame = starts[at] + LEAD_IN;
    const until = next ? starts[index.get(next.scene)!] + LEAD_IN - GAP : end - TAIL;
    return { scene: line.scene, text: line.text, startFrame, windowFrames: until - startFrame };
  });
}

// ---------------------------------------------------------------- voices

/**
 * A Voice Library voice (Hope, Jarnathan) has to be in the account before
 * text-to-speech will take its id. Look it up, and add it from the library
 * when it is not there yet.
 */
async function ensureVoice(key: string, voice: Spec['voice']): Promise<string> {
  try {
    await api(key, `/v1/voices/${voice.id}`);
    return voice.id;
  } catch (error) {
    if (!(error instanceof ApiError) || ![400, 404].includes(error.status)) throw error;
  }

  const search = encodeURIComponent(voice.name.split(' - ')[0]);
  const { voices } = (await (await api(key, `/v1/shared-voices?search=${search}&page_size=100`)).json()) as {
    voices: { voice_id: string; public_owner_id: string; name: string }[];
  };
  const shared = voices.find((candidate) => candidate.voice_id === voice.id);
  if (!shared) throw new Error(`Voice ${voice.name} (${voice.id}) is neither in the account nor in the Voice Library search.`);

  const added = (await (
    await api(key, `/v1/voices/add/${shared.public_owner_id}/${voice.id}`, { method: 'POST', json: { new_name: voice.name } })
  ).json()) as { voice_id: string };
  console.log(`  added ${voice.name} to the account from the Voice Library`);
  return added.voice_id;
}

async function listVoices(key: string, search?: string) {
  if (search) {
    const { voices } = (await (await api(key, `/v1/shared-voices?search=${encodeURIComponent(search)}&page_size=30`)).json()) as {
      voices: { voice_id: string; name: string; accent?: string; descriptive?: string }[];
    };
    for (const voice of voices) console.log(`${voice.voice_id}  ${voice.name}  ${voice.accent ?? ''} ${voice.descriptive ?? ''}`);
    return;
  }
  const { voices } = (await (await api(key, '/v1/voices')).json()) as { voices: { voice_id: string; name: string }[] };
  for (const voice of voices) console.log(`${voice.voice_id}  ${voice.name}`);
}

// ---------------------------------------------------------------- steps

async function speak(key: string, voiceId: string, spec: Spec, cues: Cue[], i: number, speed: number): Promise<Buffer> {
  const body: Record<string, unknown> = {
    text: cues[i].text,
    model_id: spec.model,
    voice_settings: { ...spec.voiceSettings, speed },
    // The neighbors' words keep the delivery continuous from line to line.
    previous_text: cues[i - 1]?.text,
    next_text: cues[i + 1]?.text,
  };
  const route = `/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`;

  try {
    return Buffer.from(await (await api(key, route, { method: 'POST', json: body })).arrayBuffer());
  } catch (error) {
    // Context is a nicety; if the model refuses it, speak the line alone.
    if (error instanceof ApiError && [400, 422].includes(error.status) && /previous_text|next_text/.test(error.body)) {
      delete body.previous_text;
      delete body.next_text;
      return Buffer.from(await (await api(key, route, { method: 'POST', json: body })).arrayBuffer());
    }
    throw error;
  }
}

async function narrate(film: string, spec: Spec, cues: Cue[], key: string, dir: string, manifest: Manifest) {
  await mkdir(path.join(dir, 'narration'), { recursive: true });
  const voiceId = await ensureVoice(key, spec.voice);
  manifest.voiceId = voiceId;
  const overruns: string[] = [];

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const file = `narration/${String(i + 1).padStart(2, '0')}-${cue.scene}.mp3`;
    const window = seconds(cue.windowFrames);
    const ask = (speed: number) =>
      hash({ model: spec.model, voiceId, settings: { ...spec.voiceSettings, speed }, text: cue.text, context: [cues[i - 1]?.text, cues[i + 1]?.text] });

    const cached = manifest.lines[cue.scene];
    if (!FORCE && cached && cached.file === file && cached.hash === ask(cached.speed) && (await exists(path.join(dir, file)))) {
      console.log(`  ${cue.scene}: cached, ${cached.seconds.toFixed(2)}s of ${window.toFixed(2)}s`);
      if (cached.seconds > window) overruns.push(cue.scene);
      continue;
    }

    let speed = spec.voiceSettings.speed;
    await writeFile(path.join(dir, file), await speak(key, voiceId, spec, cues, i, speed));
    let length = await duration(path.join(dir, file));

    // Too long for its scene: say it once more, faster, by as much as it overran.
    if (length > window && speed < MAX_SPEED) {
      speed = Math.min(MAX_SPEED, Math.ceil(speed * (length / window) * 1.03 * 100) / 100);
      console.log(`  ${cue.scene}: ${length.toFixed(2)}s overruns ${window.toFixed(2)}s, again at speed ${speed}`);
      await writeFile(path.join(dir, file), await speak(key, voiceId, spec, cues, i, speed));
      length = await duration(path.join(dir, file));
    }

    manifest.lines[cue.scene] = { file, hash: ask(speed), seconds: length, speed };
    await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    console.log(`  ${cue.scene}: ${length.toFixed(2)}s of ${window.toFixed(2)}s at speed ${speed}`);
    if (length > window) overruns.push(cue.scene);
  }

  if (overruns.length) {
    console.warn(
      `  note: ${overruns.join(', ')} still run past their window; shorten the line in ` +
        `scripts/narration/${film}.json or lengthen the scene in src/${film}/timing.ts (then re-render).`
    );
  }
}

async function compose(spec: Spec, filmSeconds: number, key: string, dir: string, manifest: Manifest) {
  // A second longer than the film, so the mix can fade it out on the last frame.
  const lengthMs = Math.min(600_000, Math.max(3_000, Math.ceil(filmSeconds * 1000) + 1000));
  const body = {
    prompt: spec.music.prompt,
    music_length_ms: lengthMs,
    model_id: spec.music.model,
    force_instrumental: true,
    ...(spec.music.seed === undefined ? {} : { seed: spec.music.seed }),
  };
  const file = 'music.mp3';
  const ask = hash(body);

  if (!FORCE && manifest.music?.hash === ask && (await exists(path.join(dir, file)))) {
    console.log(`  music: cached, ${manifest.music.seconds.toFixed(2)}s`);
    return;
  }

  console.log(`  music: composing ${(lengthMs / 1000).toFixed(1)}s on ${spec.music.model}`);
  const response = await api(key, `/v1/music?output_format=${OUTPUT_FORMAT}`, { method: 'POST', json: body });
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, file), Buffer.from(await response.arrayBuffer()));
  manifest.music = { file, hash: ask, seconds: await duration(path.join(dir, file)) };
  await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  music: ${manifest.music.seconds.toFixed(2)}s`);
}

/** How much of the music is taken away under the voice: 0.65 is about -9 dB. */
const DUCK = 0.65;

/**
 * The lines at their cue times over the music, the music ducked under the
 * voice, the whole normalized to -16 LUFS, and the result muxed onto the
 * render with its video stream copied, not re-encoded.
 *
 * The ducking is a volume curve, not a compressor listening to the voice:
 * every line's start and length are known, so the bed eases down a quarter
 * second before each one and back up half a second after it. It also keeps
 * the graph to filters Remotion's own ffmpeg has (it leaves out
 * sidechaincompress, asplit and afade).
 */
async function mix(film: string, spec: Spec, cues: Cue[], filmSeconds: number, dir: string, manifest: Manifest) {
  const video = option('video') ?? path.join(root, 'out', `${film}.mp4`);
  if (!(await exists(video))) throw new Error(`No render at ${video}: run npm run render:${film} first.`);

  const rendered = await duration(video);
  if (Math.abs(rendered - filmSeconds) > 0.1) {
    throw new Error(
      `${video} is ${rendered.toFixed(2)}s but src/${film}/timing.ts adds up to ${filmSeconds.toFixed(2)}s: re-render it.`
    );
  }

  const lines = cues.map((cue) => manifest.lines[cue.scene]);
  if (lines.some((line) => !line) || !manifest.music) throw new Error(`Narration or music missing for ${film}: run --narrate and --music.`);

  const total = filmSeconds.toFixed(3);
  const format = 'aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo';
  const voices = cues.map((cue, i) => {
    const ms = Math.round(seconds(cue.startFrame) * 1000);
    return `[${i + 2}:a]${format},adelay=${ms}:all=1[l${i}]`;
  });

  // 1 while a line is speaking, easing in and out around it; the music's
  // gain is 1 - DUCK times that, inside a 1.5 s fade in and a 3 s fade out.
  const speaking = cues
    .map((cue, i) => {
      const from = seconds(cue.startFrame);
      const to = from + lines[i]!.seconds;
      return `clip((t-${(from - 0.25).toFixed(3)})/0.25,0,1)*clip((${(to + 0.5).toFixed(3)}-t)/0.5,0,1)`;
    })
    .reduce((all, one) => `max(${all},${one})`);
  const gain = `(1-${DUCK}*${speaking})*clip(t/1.5,0,1)*clip((${total}-t)/3,0,1)`;

  const graph = [
    ...voices,
    `${cues.map((_, i) => `[l${i}]`).join('')}amix=inputs=${cues.length}:normalize=0:duration=longest,apad=whole_dur=${total},atrim=0:${total}[voice]`,
    `[1:a]${format},atrim=0:${total},apad=whole_dur=${total},volume=${spec.music.gainDb}dB,volume='${gain}':eval=frame[bed]`,
    `[voice][bed]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11,atrim=0:${total}[out]`,
  ].join(';');

  const output = path.join(root, 'out', `${film}-narrated.mp4`);
  await ffmpeg([
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', video,
    '-i', path.join(dir, manifest.music.file),
    ...lines.flatMap((line) => ['-i', path.join(dir, line!.file)]),
    '-filter_complex', graph,
    '-map', '0:v', '-map', '[out]',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-movflags', '+faststart', '-shortest',
    output,
  ]);
  console.log(`  mix: ${path.relative(root, output)} (${(await duration(output)).toFixed(2)}s)`);
}

// ---------------------------------------------------------------- main

async function main() {
  if (positional[0] === 'voices') {
    await listVoices(await apiKey(), positional[1]);
    return;
  }

  const films = positional[0] === 'all' ? Object.keys(FILMS) : positional;
  if (!films.length || films.some((film) => !FILMS[film])) {
    console.error(`Usage: npx tsx scripts/audio.ts <${Object.keys(FILMS).join('|')}|all> [--narrate] [--music] [--mix] [--dry-run] [--force]`);
    process.exit(1);
  }

  // Only the steps that call the API need the key; a mix is all local. Every
  // step measures what it makes, so the tools are found first: a missing one
  // stops the run before anything is paid for.
  const calls = !DRY_RUN && (STEPS.has('narrate') || STEPS.has('music'));
  if (!DRY_RUN) {
    await resolveTool('ffprobe');
    if (STEPS.has('mix')) await resolveTool('ffmpeg');
  }
  const key = calls ? await apiKey() : '';

  for (const film of films) {
    const spec = await loadSpec(film);
    const cues = plan(film, spec);
    const filmSeconds = seconds(timelineDuration(FILMS[film]));
    const dir = path.join(root, 'public', 'audio', film);
    console.log(`${film}: ${filmSeconds.toFixed(2)}s, ${cues.length} lines, voice ${spec.voice.name} on ${spec.model}`);

    if (DRY_RUN) {
      let characters = 0;
      for (const cue of cues) {
        characters += cue.text.length;
        const estimate = words(cue.text) / WORDS_PER_SECOND / spec.voiceSettings.speed + pauses(cue.text) * 0.5;
        const window = seconds(cue.windowFrames);
        const fits = estimate <= window ? 'ok' : 'LONG';
        console.log(
          `  ${cue.scene.padEnd(12)} at ${seconds(cue.startFrame).toFixed(2).padStart(6)}s  ` +
            `~${estimate.toFixed(1)}s of ${window.toFixed(1)}s  ${fits}`
        );
      }
      console.log(`  ${characters} characters of narration; music ${(filmSeconds + 1).toFixed(1)}s on ${spec.music.model}`);
      continue;
    }

    const manifest = await loadManifest(dir);
    if (STEPS.has('narrate')) await narrate(film, spec, cues, key, dir, manifest);
    if (STEPS.has('music')) await compose(spec, filmSeconds, key, dir, manifest);
    if (STEPS.has('mix')) await mix(film, spec, cues, filmSeconds, dir, manifest);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
