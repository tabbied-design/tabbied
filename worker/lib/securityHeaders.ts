// The security headers every response carries. Most of the site is served
// by the asset router straight from out/, which takes its headers from
// public/_headers; but `_headers` is not applied to a response the Worker
// produces (Cloudflare's docs say so, and run_worker_first routes are all
// Worker), so the same set is added here to everything that passes through
// it. Keep the two in step.
//
//   Strict-Transport-Security   HTTPS only, for a year. No includeSubDomains:
//                               the subdomains are not all this Worker's.
//   X-Frame-Options and         framed by this site and nothing else, which
//   frame-ancestors             is what stops a signed-in page (the account,
//                               the customizer) being framed for clickjacking
//                               while the template preview can still frame
//                               /templates/<slug>/site/. The CSP sets nothing
//                               else: scripts and styles are not restricted.
//   Referrer-Policy             the origin, not the path, to other sites.
//   Permissions-Policy          no camera, microphone, location or payment,
//                               which nothing here uses.
export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'strict-transport-security': 'max-age=31536000',
  'x-frame-options': 'SAMEORIGIN',
  'content-security-policy': "frame-ancestors 'self'",
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'x-content-type-options': 'nosniff',
};

/** The response with any of the headers it lacks; one that sets its own keeps it. */
export function withSecurityHeaders(response: Response): Response {
  const missing = Object.entries(SECURITY_HEADERS).filter(
    ([name]) => !response.headers.has(name)
  );

  if (missing.length === 0) return response;

  // A response from the assets binding has immutable headers, so it is
  // re-made rather than edited.
  const headers = new Headers(response.headers);

  for (const [name, value] of missing) headers.set(name, value);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
