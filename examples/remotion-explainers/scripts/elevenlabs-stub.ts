// A stand-in for the parts of the ElevenLabs API that scripts/audio.ts calls,
// so the whole pipeline (voice lookup, narration, music, mix) can be run and
// checked without a key or credits:
//
//   npx tsx scripts/elevenlabs-stub.ts            # listens on :8789
//   ELEVENLABS_BASE_URL=http://localhost:8789 ELEVENLABS_API_KEY=stub npx tsx scripts/audio.ts all
//
// It checks each request the way the API would refuse it (model ids, the
// voice being in the account, the music length) and answers with real MP3s
// made by ffmpeg: a tone for every line, as long as a narrator would take to
// say it at the requested speed, and a quiet chord for the music. Every
// library voice starts outside the account, so the add-from-library path runs.
// STUB_PACE (words per second, default 2.7) makes lines overrun on purpose,
// and STUB_REJECT_CONTEXT=1 refuses previous_text and next_text.
import { execFile } from 'node:child_process';
import { createServer, type IncomingMessage } from 'node:http';
import { promisify } from 'node:util';

const run = promisify(execFile);
const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const PORT = Number(process.env.PORT ?? 8789);
const WORDS_PER_SECOND = Number(process.env.STUB_PACE ?? 2.7);
const REJECT_CONTEXT = process.env.STUB_REJECT_CONTEXT === '1';
const TTS_MODELS = ['eleven_v4', 'eleven_v4_turbo'];
const MUSIC_MODELS = ['music_v1', 'music_v2', 'music_v2_5'];
const LIBRARY = [
  { voice_id: 'tnSpp4vdxKPjI9w0GnoV', public_owner_id: 'owner-hope', name: 'Hope - upbeat and clear' },
  { voice_id: 'c6SfcYrb2t09NHXiT80T', public_owner_id: 'owner-jarnathan', name: 'Jarnathan - Confident and Versatile' },
];
const account = new Set<string>();

const body = async (request: IncomingMessage) => {
  let text = '';
  for await (const chunk of request) text += chunk;
  return text ? JSON.parse(text) : {};
};

async function mp3(source: string, seconds: number): Promise<Buffer> {
  const { stdout } = await run(
    FFMPEG,
    ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', source, '-t', seconds.toFixed(3), '-ar', '44100', '-ac', '2', '-b:a', '128k', '-f', 'mp3', 'pipe:1'],
    { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 }
  );
  return stdout;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:${PORT}`);
  const send = (status: number, payload: unknown, type = 'application/json') => {
    response.writeHead(status, { 'Content-Type': type });
    response.end(type === 'application/json' ? JSON.stringify(payload) : payload);
  };

  try {
    if (!request.headers['xi-api-key']) {
      return send(401, { detail: { status: 'missing_api_key' } });
    }

    let match: RegExpMatchArray | null;

    if (request.method === 'GET' && (match = url.pathname.match(/^\/v1\/voices\/([\w-]+)$/))) {
      return account.has(match[1]) ? send(200, { voice_id: match[1] }) : send(404, { detail: { status: 'voice_not_found' } });
    }

    if (request.method === 'GET' && url.pathname === '/v1/voices') {
      return send(200, { voices: LIBRARY.filter((voice) => account.has(voice.voice_id)) });
    }

    if (request.method === 'GET' && url.pathname === '/v1/shared-voices') {
      const search = (url.searchParams.get('search') ?? '').toLowerCase();
      return send(200, { voices: LIBRARY.filter((voice) => voice.name.toLowerCase().includes(search)), has_more: false });
    }

    if (request.method === 'POST' && (match = url.pathname.match(/^\/v1\/voices\/add\/([\w-]+)\/([\w-]+)$/))) {
      const voice = LIBRARY.find((candidate) => candidate.voice_id === match![2] && candidate.public_owner_id === match![1]);
      if (!voice) return send(404, { detail: { status: 'voice_not_found' } });
      if (!(await body(request)).new_name) return send(422, { detail: 'new_name is required' });
      account.add(voice.voice_id);
      return send(200, { voice_id: voice.voice_id });
    }

    if (request.method === 'POST' && (match = url.pathname.match(/^\/v1\/text-to-speech\/([\w-]+)$/))) {
      const json = await body(request);
      if (!account.has(match[1])) return send(404, { detail: { status: 'voice_not_found' } });
      if (!TTS_MODELS.includes(json.model_id)) return send(422, { detail: `unknown model_id ${json.model_id}` });
      if (typeof json.text !== 'string' || !json.text.trim()) return send(422, { detail: 'text is required' });
      if (REJECT_CONTEXT && (json.previous_text || json.next_text)) {
        return send(422, { detail: 'previous_text and next_text are not supported for this model' });
      }
      const speed = json.voice_settings?.speed ?? 1;
      if (speed < 0.7 || speed > 1.2) return send(422, { detail: 'speed must be between 0.7 and 1.2' });
      const words = json.text.replace(/\[[^\]]*\]/g, ' ').trim().split(/\s+/).length;
      const pauses = (json.text.match(/\[(long )?pause\]/g) ?? []).length;
      const seconds = (words / WORDS_PER_SECOND) / speed + pauses * 0.5;
      // A voice-like tone: 180 Hz with a syllable-rate tremolo.
      return send(200, await mp3('sine=frequency=180:sample_rate=44100,tremolo=f=4:d=0.8', seconds), 'audio/mpeg');
    }

    if (request.method === 'POST' && url.pathname === '/v1/music') {
      const json = await body(request);
      if (!MUSIC_MODELS.includes(json.model_id)) return send(422, { detail: `unknown model_id ${json.model_id}` });
      if (json.prompt && json.composition_plan) return send(422, { detail: 'prompt and composition_plan are exclusive' });
      const ms = json.music_length_ms;
      if (!(ms >= 3000 && ms <= 600000)) return send(422, { detail: 'music_length_ms must be 3000-600000' });
      // A soft A minor chord, with a slow swell so ducking is audible.
      const chord = 'aevalsrc=0.2*(sin(2*PI*220*t)+sin(2*PI*261.63*t)+sin(2*PI*329.63*t))*(0.7+0.3*sin(2*PI*0.25*t)):s=44100';
      return send(200, await mp3(chord, ms / 1000), 'audio/mpeg');
    }

    send(404, { detail: `no route for ${request.method} ${url.pathname}` });
  } catch (error) {
    send(500, { detail: String(error) });
  }
});

server.listen(PORT, () => console.log(`ElevenLabs stub on http://localhost:${PORT}`));
