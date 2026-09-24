# Sending mail from the Worker

The Worker sends four kinds of message, all through `worker/lib/mail.ts`:

| Message | To | When |
| --- | --- | --- |
| Confirm your Tabbied account | the person | sign-up (better-auth) |
| Reset your Tabbied password | the person | "Forgot password" (better-auth) |
| More templates: <name> | the team | a person at their five sends "Request more" |
| You have more Tabbied templates / About your request | the person | an admin grants or declines it |

The provider is [Resend](https://resend.com), over its HTTP API. Receiving
mail at hello@tabbied.com is a separate setup on Cloudflare Email Routing,
described in `docs/hello-email.md`; the two do not conflict (below).

## Settings

| Name | Kind | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | Turns sending on. Without it, dev writes every message to the `dev_mail` table, and production *throws* on sign-up, because a verification mail that silently goes nowhere strands the account. |
| `MAIL_FROM` | Secret (optional) | The From line, e.g. `Tabbied <hello@tabbied.com>`. That is also the default. Its domain has to be verified in Resend. |
| `TEAM_EMAIL` | Secret (optional) | Comma-separated inboxes that hear about "Request more". Falls back to `ADMIN_EMAILS`, then to `MAIL_FROM`'s address. |

Put all three as **Secrets**, not dashboard Text variables: a Text variable
is replaced by `wrangler.jsonc`'s own `vars` on the next `wrangler deploy`
(the same trap `ADMIN_EMAILS` fell into).

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put MAIL_FROM      # optional
npx wrangler secret put TEAM_EMAIL     # optional
```

`GET /api/health` reports the result without revealing anything:
`mail.provider` is `resend`, `dev-mail` or `none`, and `mail.teamInboxes`
counts who hears about requests. `none` in production is the whole
diagnosis of a sign-up that answers 500.

## Setting up Resend, once

1. **Create the account** at resend.com and add a team member for each of
   you, so the key is not one person's.
2. **Add the domain.** Domains, Add domain, `tabbied.com`. Pick the region
   closest to most readers (the choice is permanent for the domain).
3. **Add its DNS records on the Cloudflare zone.** Resend lists them; for
   tabbied.com they are:
   - a TXT record `resend._domainkey` holding the DKIM public key;
   - an MX record on `send` pointing at `feedback-smtp.<region>.amazonses.com`
     (priority 10), which receives bounces;
   - a TXT record on `send`, `v=spf1 include:amazonses.com ~all`.

   Add them as **DNS only** (grey cloud). They sit on the `send` subdomain and
   the `_domainkey` name, so they leave the apex's own MX and SPF records,
   which Email Routing owns, untouched: receiving at hello@ keeps working.
4. **Verify.** Back in Resend, Verify DNS records. It usually passes within
   minutes.
5. **Add DMARC** if the zone has none: a TXT record `_dmarc` with
   `v=DMARC1; p=none; rua=mailto:hello@tabbied.com`. Start at `p=none`,
   read the reports for a few weeks, then tighten to `quarantine`.
6. **Create an API key**: API Keys, Create, permission *Sending access*,
   domain `tabbied.com`. Copy it once into `wrangler secret put
   RESEND_API_KEY`. Keep a second key for local testing if you want real
   mail from `npm run dev:api`; otherwise leave `.dev.vars` without one and
   read `dev_mail`.
7. **Check it.** `curl https://tabbied.com/api/health` shows
   `"provider": "resend"`. Sign up with a fresh address and the
   confirmation arrives; a failed send is logged by the Worker with Resend's
   own reason (an unverified domain, a revoked key).

## What a failure costs

Sign-up and password mail are better-auth's, and a failed send fails the
request, which is right: the person has to hear that the link never went.

The team notice and the grant notice are courtesies. The request row and
the admin's decision are written first and are what the site reads, so a
failed send is logged and reported (`mailed: false` on a decision) rather
than undoing anything. The admin's Requests page is the source of truth
for who is waiting.

Replies: the team notice carries `Reply-To` set to the person, so answering
it in Gmail writes to them. The decision mail carries the first team inbox
as its `Reply-To`, so a person's answer lands with the team rather than at
the From address.
