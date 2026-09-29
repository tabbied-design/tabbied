// R2 does not cascade: when a row that owns pictures goes, its bytes are
// deleted by prefix. The keys are laid out so each owner has one:
//
//   up/<userId>/          a person's uploads (routes/uploads.ts)
//   gen/<generationId>/   a Studio direction's images (routes/studio.ts)
//   gen/site/<siteId>/    a site's generated pictures (routes/sites.ts)

/** Delete every object under `prefix`, a listing page (up to 1,000 keys) at a time. */
export async function deletePrefix(bucket: R2Bucket, prefix: string): Promise<void> {
  let cursor: string | undefined;

  do {
    const listed = await bucket.list({ prefix, cursor });

    if (listed.objects.length > 0) {
      await bucket.delete(listed.objects.map((object) => object.key));
    }

    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);
}
