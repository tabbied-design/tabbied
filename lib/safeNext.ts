/**
 * Where to send a person after they sign in, or back out of the form: the
 * `?next=` a page put in the link, when it is a path on this site, and the
 * fallback otherwise.
 *
 * Parsed, not prefix-checked. `raw.startsWith('/') && !raw.startsWith('//')`
 * let `/\\evil.com` through: it starts with one slash, and the URL parser
 * reads a backslash in a special scheme as an authority separator, so
 * `new URL('/\\evil.com', origin)` is `https://evil.com/`. router.push
 * resolves the same way and then hard-navigates to the foreign origin - an
 * open redirect off a freshly signed-in session. Resolving against a fixed
 * origin here and requiring the result to stay on it catches that shape and
 * any other the parser knows about, and needs no `window`, so it is safe in
 * a render.
 */
const PROBE = 'https://tabbied.invalid';

export function safeNext(raw: string | null | undefined, fallback: string): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback;

  try {
    const url = new URL(raw, PROBE);

    if (url.origin !== PROBE) return fallback;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
