# Signing in with GitHub and Google

The code is all in place: `worker/auth.ts` turns a provider on when the
Worker holds both its client id and its secret, `GET /api/auth-providers`
lists the providers that are on, and the sign-in form draws a button for
each one it is told about. Turning a provider on is configuration only: an
OAuth app at the provider, and two secrets on the Worker.

A provider sends the person back to one address registered with it in
advance, `PUBLIC_ORIGIN` plus `/api/auth/callback/<provider>`:

| Where | GitHub | Google |
| --- | --- | --- |
| Production | `https://tabbied.com/api/auth/callback/github` | `https://tabbied.com/api/auth/callback/google` |
| Local | `http://localhost:8787/api/auth/callback/github` | `http://localhost:8787/api/auth/callback/google` |

The local address is the Worker's port, not the site's: the callback is built
from `PUBLIC_ORIGIN`, which `.dev.vars` sets to `http://localhost:8787`. PR
previews need no address of their own (see "Preview deployments" below).

## Setting up GitHub, once

1. Create an OAuth App (not a GitHub App): under the `tabbied-design`
   organization's settings, Developer settings, OAuth Apps, so the consent
   screen names the organization rather than a person.
2. Homepage URL `https://tabbied.com`, and both redirect URIs from the table
   above (an OAuth App takes up to ten), so one app serves production and
   local development alike.
3. Leave **Allow wildcard matching** off on both. It would let GitHub send
   codes to any subdomain or deeper path of the URI, and nothing here needs
   that: every sign-in, a preview's included, returns to the exact callback.
4. Leave **Enable Device Flow** off. It is for a CLI or a TV that shows a code
   to type in at github.com; sign-in here is a browser redirect.
5. Generate a client secret and copy it at once; GitHub shows it one time.

better-auth asks for `read:user` and `user:email`, which an OAuth App grants
with no further setup. It reads the address from `/user/emails` when the
profile's is private, and takes "verified" from the same list.

## Setting up Google, once

In the Google Cloud console, in a project for Tabbied, open Google Auth
Platform (formerly the OAuth consent screen):

1. **Branding**: the app name, a support address, `tabbied.com` as an
   authorized domain, and `https://tabbied.com/privacy-policy/` and
   `https://tabbied.com/terms-of-service/` as the two policy links.
2. **Audience**: External. Once it works, **Publish app**: while it is in
   Testing, only the test users listed there can sign in, and everyone else
   meets an "access blocked" page.
3. **Data access**: nothing to add. better-auth asks for `openid`, `email`
   and `profile`, which need no review.
4. **Clients**: a Web application client with both redirect URIs from the
   table above, so it too serves production and local development alike.

## Settings

| Name | Kind | What it is |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | secret | the OAuth App's client id |
| `GITHUB_CLIENT_SECRET` | secret | the OAuth App's client secret |
| `GOOGLE_CLIENT_ID` | secret | the Web client's id |
| `GOOGLE_CLIENT_SECRET` | secret | the Web client's secret |

All four are Secrets, the ids included, which are not secret in themselves: a
plain-text variable added in the dashboard is replaced by `wrangler.jsonc`'s
`vars` on the next deploy, the trap `ADMIN_EMAILS` fell into. A provider with
only one of its pair set stays off.

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET

curl https://tabbied.com/api/auth-providers
# {"providers":["google","github"]}
```

`wrangler secret put` deploys a version carrying the secret, so the buttons
appear on the next page load. Locally, the same four names go in `.dev.vars`,
and `wrangler dev` reads that file only when it starts. With the localhost URIs
on the production apps, that puts the production client secrets on the
machine; an app of each kind kept for development, with only the localhost URI,
keeps them off it.

## Preview deployments

A PR preview answers on a `*.workers.dev` host that is new for every
version, and neither provider accepts a wildcard, so a preview's own callback
can never be registered. better-auth's `oAuthProxy` plugin covers it, with
nothing more to register:

1. The preview starts the sign-in. The plugin keeps the redirect pointed at
   `PUBLIC_ORIGIN` and packs the sign-in's state into the request, encrypted.
2. The provider returns to `https://tabbied.com/api/auth/callback/<provider>`.
3. Production exchanges the code and reads the profile, makes no session,
   and redirects to the preview's `/api/auth/callback/<provider>/oauth-proxy`
   with the profile encrypted under `BETTER_AUTH_SECRET`.
4. The preview decrypts it, makes the user and the session on its own host,
   and lands on the page the sign-in started from.

The plugin stands aside wherever a request arrives on `PUBLIC_ORIGIN` itself,
which is production, and localhost in development. Four things it depends on:

- **Production runs it first.** Step 3 is production's code, so the plugin
  works for previews only once a deploy of `main` carries it, and only for
  branches that include it.
- **A preview shares production's secret and D1.** `wrangler versions upload`
  gives it both. A move to `wrangler preview` takes its secrets from the
  Previews Base config instead, which then needs the same
  `BETTER_AUTH_SECRET` and the four provider secrets, or production encrypts
  with a key the preview does not have.
- **A preview trusts its own host from the request's URL**, not from its
  `Origin` header (`trustedOrigins` in `worker/auth.ts`). Step 4 is a
  top-level redirect, which carries no `Origin`, and its `callbackURL` is
  checked all the same; trusting only a matching header refused it with 403
  "Invalid callbackURL". Production trusts no preview host, so it will not
  finish a sign-in there.
- **The profile lasts 60 seconds** in transit, so a stalled redirect chain
  ends in `payload_expired` rather than leaving it usable.

A sign-in on a preview makes a real account, in production's D1, as an email
sign-in there already did. `worker/test/api.test.ts` walks all four steps
with GitHub faked at the fetch boundary.

## When it does not work

The provider's error, or the `error=` better-auth puts on `/api/auth/error`:

- **`redirect_uri_mismatch`** (Google) or "The redirect_uri is not associated
  with this application" (GitHub): no URI registered with the app matches the
  table above exactly (a scheme, a port or a trailing slash), or the app in
  use has only the other environment's URI.
- **Access blocked** (Google): the app is still in Testing.
- **`account_not_linked`**: an account with that address already exists and
  is not linked. better-auth links a provider to an existing account only
  when the provider reports the address verified and the account has
  confirmed its own; an email sign-up that never followed its link has not.
- **`email_not_found`**: the GitHub account has no address better-auth can
  read.
- **No buttons at all**: `/api/auth-providers` answers `[]`, so the Worker
  holds neither pair in full.
