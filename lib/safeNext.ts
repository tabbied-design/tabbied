const PROBE = 'https://tabbied.invalid';

/**
 * Where to send a person after they sign in, or back out of the form: the
 * `?next=` a page put in the link when it is a path on this site, else the
 * fallback.
 *
 * Parsed, not prefix-checked: `/\\evil.com` starts with one slash, but the URL
 * parser reads a backslash as an authority separator, so it resolves (and
 * router.push navigates) to `https://evil.com/`, an open redirect. Resolving
 * against a fixed origin and requiring the result to stay on it catches every
 * such shape, and needs no `window`, so it is safe in a render.
 */
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
