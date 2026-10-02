// The template sites at /templates/<slug>/site/ are previews of fictional
// businesses: a "Corner Pharmacy" with a street address and a 555 number. In
// a search index they read as real places, and as copies of the template
// pages that frame them, so they are kept out of it: an `X-Robots-Tag`
// header and the same rule as a meta tag, for a crawler that reads only one.
//
// Added here, on the way out, never by the export, for the reason the license
// notice is (worker/lib/notice.ts): the downloads are derived from the export,
// and a `noindex` in a download would keep the licensee's own site out of
// search. No canonical link either: pointing a noindexed page's canonical at
// another page is the mixed signal search engines say to avoid, and the
// framed preview already links here.

/** Whether a template path is the bare site rather than its framed preview. */
export const isTemplateSite = (pathname: string): boolean =>
  /^\/templates\/[a-z0-9-]+\/site\/$/.test(pathname);

export function withNoindex(response: Response): Response {
  const transformed = new HTMLRewriter()
    .on('head', {
      element(head) {
        head.append('<meta name="robots" content="noindex"/>', { html: true });
      },
    })
    .transform(response);

  const headers = new Headers(transformed.headers);
  headers.delete('content-length');
  headers.set('x-robots-tag', 'noindex');

  return new Response(transformed.body, {
    status: transformed.status,
    statusText: transformed.statusText,
    headers,
  });
}
