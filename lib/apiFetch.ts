// The one place that knows where the API is. In production the site and the
// Worker share an origin, so the base is empty and the session cookie needs no
// CORS. In development the Worker is on :8787 and `npm run dev` sets the base.
// Nothing else may hardcode a host.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

export const apiUrl = (path: string) => `${API_BASE}${path}`;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * A JSON call to the platform tier. Throws ApiError carrying the server's own
 * message, because every error the API returns is written to be read by a
 * person - a quota notice, a rate-limit notice, a sign-in prompt.
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    // The session is a cookie; a cross-port dev request drops it without this.
    credentials: 'include',
    headers: {
      // Only a request with a body gets a content type: on a GET it would make
      // every cross-port dev read a CORS preflight.
      ...(init.body !== undefined && init.body !== null
        ? { 'content-type': 'application/json' }
        : {}),
      ...init.headers,
    },
  });

  const body = (await response.json().catch(() => null)) as
    | (T & { error?: string })
    | null;

  if (!response.ok) {
    throw new ApiError(body?.error ?? `Request failed (${response.status})`, response.status);
  }

  return body as T;
}
