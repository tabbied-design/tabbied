# hello@tabbied.com - a shared inbox on Cloudflare Email Routing

How to give tabbied.com a hello@ address that lands in personal Gmail
inboxes, and what it takes to reply from it. Nothing here touches the repo:
the whole setup is DNS and dashboard configuration on the tabbied.com zone,
which already lives in the Cloudflare account that runs the Worker.

## Receiving: Cloudflare Email Routing

Email Routing is free, receive-only, and built into the zone. It accepts
mail for the domain at Cloudflare's servers and forwards each message to a
destination address you have verified.

1. **Turn it on.** In the Cloudflare dashboard open the tabbied.com zone,
   then Email, then Email Routing, and click Get started. Cloudflare adds
   the records the zone needs: three MX records pointing at
   `route1.mx.cloudflare.net`, `route2.mx.cloudflare.net` and
   `route3.mx.cloudflare.net`, and an SPF TXT record,
   `v=spf1 include:_spf.mx.cloudflare.net ~all`. If the zone already has MX
   records from another provider, the wizard asks before replacing them.
2. **Add the destinations.** Under Destination addresses, add each personal
   Gmail account. Cloudflare sends a confirmation link to each one, and only
   an address that has confirmed can receive forwarded mail.
3. **Create the address.** Under Routing rules, add a custom address,
   `hello@tabbied.com`, with the action Send to an email and one confirmed
   destination. A catch-all rule (anything at tabbied.com that matches no
   custom address) is optional; if you add one, point it at the same inbox
   so a typo in the local part still reaches you.

Delivery is immediate once the records propagate. Send a test from an
outside address and check that it arrives with the original sender intact:
Cloudflare forwards the message as is, so replying in Gmail replies to the
person who wrote, not to Cloudflare.

## More than one Gmail inbox

A routing rule forwards to exactly one destination. Two ways to reach
several:

- **An Email Worker.** Under Email Routing, Email Workers, create a Worker
  and route `hello@tabbied.com` to it instead of to an address. The Worker
  calls `message.forward()` once per destination, and every destination it
  names must be a confirmed one:

  ```js
  export default {
    async email(message) {
      for (const to of ['first@gmail.com', 'second@gmail.com']) {
        await message.forward(to);
      }
    },
  };
  ```

- **Gmail's own forwarding.** Forward to one Gmail account, and in that
  account add a filter (Settings, Filters and Blocked Addresses) that
  forwards mail sent to hello@tabbied.com on to the other account. Gmail
  asks the other account to confirm before the filter forwards anything.

The Email Worker keeps the fan-out in one place and needs no Gmail
configuration; the filter needs nothing deployed.

## Replying as hello@tabbied.com

Email Routing does not send. To answer from the address rather than from a
personal one, Gmail's Send mail as (Settings, Accounts and Import) needs an
SMTP server to hand the message to, and the domain has to say that server
is allowed to send for it, or replies land in spam.

- **Through Resend.** The Worker already sends its verification mail with
  Resend, and Resend offers SMTP: server `smtp.resend.com`, port 465 (SSL)
  or 587 (TLS), username `resend`, password an API key. Verify tabbied.com
  in Resend's dashboard, which adds its DKIM records to the zone (and a
  Return-Path record for bounces), then add the address in Gmail with
  those SMTP settings. This is the recommended path: the domain is
  authenticated end to end and the same records serve the app's own mail.
- **Through Gmail's SMTP.** Send mail as can also use `smtp.gmail.com`
  with the personal account's address and an app password. Google then
  signs the message for gmail.com, not for tabbied.com, so the domain's SPF
  record would need `include:_spf.google.com` and receivers would still see
  a DKIM signature from a different domain. Fine for the odd reply; not
  something to rely on for anything that must arrive.

Either way, tick Treat as an alias in Gmail so replies to mail that arrived
at hello@ go out from hello@ by default.

## DMARC

Once SPF and DKIM are in place, add a DMARC record so receivers know how to
treat mail claiming to be from the domain:

```
_dmarc.tabbied.com  TXT  v=DMARC1; p=none; rua=mailto:hello@tabbied.com
```

`p=none` only asks for reports, which arrive at the address in the `rua`
tag (hello@ is fine, they are XML attachments a few times a week). Move to
`p=quarantine` once the reports show only your own senders passing.

## Checking it works

- `dig MX tabbied.com` lists the three Cloudflare hosts.
- `dig TXT tabbied.com` shows the SPF record, and `dig TXT _dmarc.tabbied.com`
  the DMARC one.
- A message from an outside address to hello@ arrives in every inbox it is
  routed to, with the original From intact.
- A reply sent from Gmail as hello@ arrives at an outside address with
  "mailed-by" and "signed-by" both naming the expected domain (Gmail shows
  them under the message's details); a warning about the sender there means
  the SPF or DKIM records are not yet right.
