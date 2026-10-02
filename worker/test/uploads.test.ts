import { SELF, env } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { ORIGIN, json, signIn } from './helpers';

// The smallest valid PNG: a 1x1 transparent pixel.
const PNG = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='),
  (c) => c.charCodeAt(0)
);

const post = (cookie: string, blob: Blob, name = 'ref.png', note?: string) => {
  const form = new FormData();
  form.append('file', blob, name);
  if (note) form.append('note', note);
  return SELF.fetch(`${ORIGIN}/api/uploads`, { method: 'POST', headers: { cookie, origin: ORIGIN }, body: form });
};

describe('uploads', () => {
  let cookie: string;

  beforeAll(async () => {
    cookie = await signIn('uploader@example.com');
  });

  it('judges the bytes, not the label', async () => {
    // Text with an image content-type is not an image.
    const fake = await post(cookie, new Blob(['hello'], { type: 'image/png' }));
    expect(fake.status).toBe(415);
  });

  it('stores a picture, lists it, serves it, and removes it', async () => {
    const made = await post(cookie, new Blob([PNG], { type: 'image/png' }), 'ref.png', 'the shopfront');
    expect(made.status, await made.clone().text()).toBe(200);
    const { id, src, contentType } = (await made.json()) as { id: string; src: string; contentType: string };
    expect(contentType).toBe('image/png');
    expect(src).toMatch(/^\/api\/media\/up\//);

    const list = (await SELF.fetch(`${ORIGIN}/api/uploads`, { headers: { cookie } }).then((r) => r.json())) as {
      uploads: { id: string; note: string | null }[];
    };
    expect(list.uploads.map((u) => u.id)).toEqual([id]);
    expect(list.uploads[0].note).toBe('the shopfront');

    const served = await SELF.fetch(`${ORIGIN}${src}`);
    expect(served.status).toBe(200);
    expect(served.headers.get('content-type')).toBe('image/png');

    // Someone else neither sees it nor can remove it.
    const other = await signIn('someone-else@example.com');
    const theirs = (await SELF.fetch(`${ORIGIN}/api/uploads`, { headers: { cookie: other } }).then((r) => r.json())) as { uploads: unknown[] };
    expect(theirs.uploads).toHaveLength(0);
    expect((await SELF.fetch(`${ORIGIN}/api/uploads/${id}`, { method: 'DELETE', headers: { cookie: other, origin: ORIGIN } })).status).toBe(404);

    const gone = await SELF.fetch(`${ORIGIN}/api/uploads/${id}`, { method: 'DELETE', headers: { cookie, origin: ORIGIN } });
    expect(gone.status).toBe(200);
    expect((await SELF.fetch(`${ORIGIN}${src}`)).status).toBe(404);
  });

  it('go with the account when its owner deletes it', async () => {
    const leaver = await signIn('leaver@example.com');
    const { id: userId } = (await env.DB.prepare('SELECT id FROM user WHERE email = ?').bind('leaver@example.com').first<{ id: string }>())!;

    const made = await post(leaver, new Blob([PNG], { type: 'image/png' }));
    const upload = ((await made.json()) as { src: string }).src.replace(/^\/api\/media\//, '');

    // A direction's image and a site's picture: the rows cascade, the bytes
    // only go because they were looked up before the rows did.
    await env.DB.prepare('INSERT INTO generation (id, user_id, description, result, source, model) VALUES (?, ?, ?, ?, ?, ?)')
      .bind('gen-leaver', userId, 'A bakery', '{}', 'matcher', 'none')
      .run();
    await env.DB.prepare('INSERT INTO site (id, user_id, slug, title, spec_version, template_hash) VALUES (?, ?, ?, ?, ?, ?)')
      .bind('site-leaver', userId, 'verdant', 'Bakery', 1, 'hash')
      .run();
    const pictures = [upload, 'gen/gen-leaver/hero.webp', 'gen/site/site-leaver/1/hero.webp'];
    await env.MEDIA.put(pictures[1], new Uint8Array([1]));
    await env.MEDIA.put(pictures[2], new Uint8Array([1]));
    for (const key of pictures) expect(await env.MEDIA.get(key), key).not.toBeNull();

    const deleted = await SELF.fetch(`${ORIGIN}/api/auth/delete-user`, {
      method: 'POST',
      headers: { ...json, cookie: leaver },
      body: JSON.stringify({ password: 'correct horse battery staple' }),
    });
    expect(deleted.status, await deleted.clone().text()).toBe(200);

    expect(await env.DB.prepare('SELECT id FROM user WHERE id = ?').bind(userId).first()).toBeNull();
    expect(await env.DB.prepare('SELECT id FROM site WHERE id = ?').bind('site-leaver').first()).toBeNull();
    for (const key of pictures) expect(await env.MEDIA.get(key), key).toBeNull();
  });
});
