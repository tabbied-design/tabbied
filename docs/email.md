# Sending mail from the Worker

The Worker sends two kinds of message, both through `worker/lib/mail.ts`:

| Message | To | When |
| --- | --- | --- |
| Confirm your Tabbied account | the person | sign-up (better-auth); HTML, with a link that lasts `AUTH_LINK_HOURS` |
| Reset your Tabbied password | the person | "Forgot password" (better-auth); HTML, with a single-use link that lasts `AUTH_LINK_HOURS` |

The template allowance's messages (the "Request more" link, the team's
review notice, the grant and decline replies) went with the allowance in
October 2026: templates are free to download without an account, and an
account is only needed to save a customization.

Both messages are designed, and share one layout, `designedHtml` in
`mail.ts`: the mark, a mono eyebrow, a heading, a black pill button, a note
under it, a rule, and the sign-off, with inline styles and tables because a
mail client reads no stylesheet. Each also writes its link out under the
button, for a client that will not follow it, and says how long it lasts:
`AUTH_LINK_HOURS`, which `worker/auth.ts` hands to better-auth as both
lifetimes, so the sentence and the link cannot disagree. Every message keeps
a plain-text part that says the same thing.

The lockup at the top is a hosted picture, `public/email/tabbied-lockup.png`,
not the inline SVG and web font the site draws it with: Gmail strips `<svg>`
from mail and ignores web fonts, which left a Gmail reader with the word
"tabbied" in Georgia and no mark. It is served from `PUBLIC_ORIGIN` in real
mail (the Email preview, and its test sends, take it from whichever host the
admin is on, so a PR preview shows it before it is live). The PNG is a 3x
capture of `components/logo/Logo`, on white so a client's dark mode cannot
lose the ink; after the mark changes, recapture it with
`npm run build && node scripts/capture-email-lockup.mjs`.

Each message is built by its own function in `mail.ts` (`verificationEmail`,
`resetPasswordEmail`) and sent separately, so the
admin's **Email preview** (`/admin/emails/`) can render every one with the
same code, from sample data, and send a test copy of any of them to the
admin's own address. A message added to `mail.ts` needs an entry in
`worker/lib/emailPreview.ts` too.

In dev (no key) every message is written to `dev_mail` instead, with its
link in the `url` column, which is how the tests follow it.

The provider is [Resend](https://resend.com), over its HTTP API. Receiving
mail at hello@tabbied.com is a separate setup on Cloudflare Email Routing,
described in `docs/hello-email.md`; the two do not conflict (below).

## Settings

| Name | Kind | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | Turns sending on. Without it, dev writes every message to the `dev_mail` table, and production *throws* on sign-up, because a verification mail that silently goes nowhere strands the account. |
| `MAIL_FROM` | Secret (optional) | The From line, e.g. `Tabbied <hello@tabbied.com>`. That is also the default. Its domain has to be verified in Resend. |

Put both as **Secrets**, not dashboard Text variables: a Text variable
is replaced by `wrangler.jsonc`'s own `vars` on the next `wrangler deploy`
(the same trap `ADMIN_EMAILS` fell into).

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put MAIL_FROM      # optional
```

`TEAM_EMAIL`, which named who heard about "Request more", is read by nothing
now; a Worker that still has it set can have it deleted
(`npx wrangler secret delete TEAM_EMAIL`).

`GET /api/health` reports the result without revealing anything:
`mail.provider` is `resend`, `dev-mail` or `none`. `none` in production is
the whole diagnosis of a sign-up that answers 500.

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
The admin's test copies (`/admin/emails/`) report a failed send in the
answer, with Resend's own reason.
