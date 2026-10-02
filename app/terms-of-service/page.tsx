import type { Metadata } from 'next';
import LegalPage, { InShort } from 'components/legal/LegalPage';
import { pageMetadata } from 'lib/seo';

// The rules for using Tabbied, kept in step with what the product does: the
// template allowance (worker/lib/templates.ts), AI usage limits
// (worker/lib/quota.ts), uploads, sharing by link, and admin actions on
// accounts. The data side is the Privacy Policy, linked from here.
//
// The Template License (section 7) is restated in every download's LICENSE.md
// (TEMPLATE_LICENSE in scripts/package-templates.mjs) and summed up in the
// notice the Worker adds to the live template pages (worker/lib/notice.ts).
// Change one and the others in the same commit. #template-license is linked
// from all three, so the id stays.

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service - Tabbied',
  description:
    'The terms for using Tabbied: accounts, plans, the patterns and templates you can use, AI-generated content, and acceptable use.',
  path: '/terms-of-service/',
});

const EMAIL = 'hello@tabbied.com';

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" updated="October 2, 2026">
      <InShort>
        <ul>
          <li>
            Patterns you make with Tabbied are yours to use, including
            commercially.
          </li>
          <li>
            Templates you choose can be used to build and publish websites for
            yourself or your clients. Each template is licensed to the account
            that chose it.
          </li>
          <li>
            Don&apos;t resell, share or redistribute templates, and don&apos;t
            copy them from their previews, by hand or with an AI tool.
          </li>
          <li>
            You own what you put into Tabbied and, as between you and us, what
            our AI features make for you. Check AI output before you publish
            it.
          </li>
          <li>
            Free accounts have limits. Paid plans renew until you cancel.
          </li>
          <li>
            Don&apos;t misuse Tabbied, get around its limits, or upload
            content you don&apos;t have the right to use.
          </li>
        </ul>
      </InShort>

      <h2>1. Agreeing to these terms</h2>
      <p>
        These terms are an agreement between you and Sy Hong and Ye Joo Park,
        who run Tabbied (&quot;Tabbied&quot;, &quot;we&quot;,
        &quot;us&quot;). They apply when you use tabbied.com, your Tabbied
        account, our API and MCP server, the template previews, and the
        templates and files you download from us. By using Tabbied you agree to them. If you use
        Tabbied for an organization, you agree for that organization and
        confirm you can.
      </p>
      <p>
        You must be at least 13 years old to use Tabbied. If you are under 18,
        you need permission from a parent or guardian, who also agrees to
        these terms.
      </p>
      <p>
        Our <a href="/privacy-policy/">Privacy Policy</a> explains what we
        collect and how we use it.
      </p>

      <h2>2. What Tabbied is</h2>
      <p>
        Tabbied lets you create generative patterns, browse and customize
        website templates built around them, save and share the sites you
        make, and use AI features that write, design and illustrate a site
        from your description. Some features need an account, and some may
        need a paid plan.
      </p>
      <p>
        Tabbied is in active development. We may add, change or remove
        features, and change the limits that apply to them. If we remove a
        feature you pay for, we will tell you in advance and, where
        appropriate, give you a prorated refund.
      </p>

      <h2>3. Your account</h2>
      <ul>
        <li>Give us accurate information and keep your email address current.</li>
        <li>
          Keep your password secure. You are responsible for what happens
          under your account. Tell us at{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> if you think someone else
          has used it.
        </li>
        <li>
          An account is for one person. Don&apos;t share it, and don&apos;t
          create more than one to get around a limit.
        </li>
        <li>
          You can delete your account at any time in your account settings.
        </li>
      </ul>

      <h2>4. Plans, limits and payments</h2>
      <h3>Free use</h3>
      <p>
        Free accounts have limits, such as the number of templates you can
        choose and how much you can use AI features each day. The limits that
        apply to you are shown in your account. We may change them.
      </p>
      <h3>Paid plans</h3>
      <ul>
        <li>
          Prices, what each plan includes, and its billing period are shown
          before you buy. Prices may not include taxes, which we add where
          required.
        </li>
        <li>
          Payment is taken in advance by our payment processor. A subscription
          renews automatically at the end of each billing period until you
          cancel.
        </li>
        <li>
          You can cancel at any time in your account. Cancelling stops the
          next renewal; you keep the plan until the end of the period you have
          paid for.
        </li>
        <li>
          Payments are non-refundable except where the law requires a refund
          or these terms say otherwise.
        </li>
        <li>
          If we change the price of your plan, we will tell you at least 30
          days before it applies, and the new price starts at your next
          renewal. You can cancel before then.
        </li>
        <li>
          If a payment fails, we may move your account to the free plan until
          it is paid.
        </li>
      </ul>

      <h2>5. Your content</h2>
      <p>
        &quot;Your content&quot; is what you put into Tabbied: the
        descriptions and instructions you write, the pictures you upload, and
        the text and changes you add to a site. You keep ownership of it.
      </p>
      <p>
        You give us a worldwide, non-exclusive, royalty-free license to host,
        store, copy, process and display your content, and to send it to our
        service providers, as needed to run Tabbied for you and for the
        people you share it with, and to improve Tabbied as described in our
        Privacy Policy. This license ends when you delete the content or your
        account, except for copies we keep as the Privacy Policy describes.
      </p>
      <p>
        You confirm that you have the rights to your content and that using
        it with Tabbied doesn&apos;t infringe anyone&apos;s rights or break
        the law. Don&apos;t upload other people&apos;s personal information
        unless you are allowed to.
      </p>
      <p>
        A site or generation you share by link can be seen by anyone who has
        the link.
      </p>

      <h2>6. AI-generated content</h2>
      <p>
        Our AI features generate text, designs and images
        (&quot;output&quot;) from your content, using third-party AI models.
        As between you and us, you own the output we generate for you, and
        you may use it for any lawful purpose, subject to these terms and to
        our rights in the templates it is built on (section 7).
      </p>
      <ul>
        <li>
          Output can be wrong, incomplete or unsuitable. Review it, including
          names, facts, prices and claims about your business, before you
          publish it.
        </li>
        <li>
          Output may be similar to output generated for others, and we
          can&apos;t promise it is unique or that it can be protected by
          copyright.
        </li>
        <li>
          Don&apos;t use AI features to create content that breaks these
          terms or the usage policies of our AI providers.
        </li>
      </ul>

      <h2>7. Patterns, templates and licenses</h2>
      <h3>Patterns</h3>
      <p>
        Patterns you create and export with Tabbied are yours to use in
        personal and commercial projects, without attribution.
      </p>
      <h3 id="template-license">Template License</h3>
      <p>
        Our website templates are licensed, not sold. A template is its code,
        stylesheets, design and layout, sample text and the pictures that come
        with it, in every form we offer it: the live preview, the downloads
        and the customizer.
      </p>
      <p>
        When you choose a template with your account, we grant you a
        worldwide, non-exclusive, non-transferable, perpetual license to use
        it to make websites (&quot;end products&quot;) for yourself or for
        clients, including commercially. You may:
      </p>
      <ul>
        <li>
          change the template, combine it with your own work, and publish as
          many end products from it as you like;
        </li>
        <li>
          build an end product for a client and hand it over, source included.
          Your client may use, change and host that website, but gets no
          license to the template for anything else; and
        </li>
        <li>
          let the people who work with you on an end product, such as
          contractors, use the template files for that work only.
        </li>
      </ul>
      <p>
        The license belongs to the account that chose the template. It is the
        same on every plan unless your plan says otherwise, and changing or
        cancelling a plan doesn&apos;t take back a template you have already
        chosen. You don&apos;t have to show a credit or notice on the websites
        you publish.
      </p>
      <p>Unless we agree otherwise in writing, you may not:</p>
      <ul>
        <li>
          sell, sublicense, rent, share, give away or otherwise make a template
          available as a template, theme, starter kit, UI kit, design file or
          similar product, free or paid, whether or not you have changed it;
        </li>
        <li>
          offer a template, or something substantially similar to one, in a
          marketplace, a collection of templates or themes, a website builder,
          or any other product or service that lets others make websites from
          it;
        </li>
        <li>
          publish a template&apos;s download files, or its source apart from
          an end product, for example on a file share or in a code sandbox;
        </li>
        <li>
          use a template&apos;s pictures outside the end products made from
          that template, for example as stock images or in another template;
        </li>
        <li>
          copy or recreate a template from its preview or from our site, by
          hand, with automated tools or with an AI agent, instead of choosing
          it with your account. A close recreation of a template counts as
          using it;
        </li>
        <li>
          use templates, or any part of them, to train, fine-tune or evaluate
          AI models, or to build datasets;
        </li>
        <li>
          remove or change the copyright and license notices in a
          template&apos;s files, including its LICENSE.md file; or
        </li>
        <li>
          use templates to offer a service that competes with Tabbied.
        </li>
      </ul>
      <p>
        The previews on tabbied.com are there so you can see a template before
        you choose it. Viewing a preview, or having its code because your
        browser or a tool downloaded the page, gives you no license to use the
        template.
      </p>
      <p>
        If you break this license, it ends for the templates involved, and we
        may end it for all of your templates by closing your account (section
        9). You must then stop using those templates, delete your copies of
        them, and remove any copies you made available to others. Websites you
        finished and handed over to clients before then, in line with this
        license, may stay in use.
      </p>
      <p>
        If you find a Tabbied template being resold or shared, please tell us
        at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may ask marketplaces
        and hosts to take copies down.
      </p>
      <p>
        The images in our templates are AI-generated. Downloaded templates may
        load fonts from Google Fonts and the Tabbied pattern library from
        esm.sh. Your use of those resources is subject to their providers&apos;
        terms; you can host the fonts yourself instead.
      </p>
      <h3>Open-source software and our source code</h3>
      <p>
        Parts of Tabbied, including the tabbied pattern library and our MCP
        server, are released under open-source licenses such as the MIT
        License. Where an open-source license applies to software you receive,
        that license governs your use of that software, and these terms
        don&apos;t limit it.
      </p>
      <p>
        Some of our other source code, including the source of our templates,
        can be read publicly, for example on GitHub. Being able to read it
        doesn&apos;t give you a license to use it: only the open-source
        licenses that come with particular parts of it, and the Template
        License above, do.
      </p>
      <h3>Our service and brand</h3>
      <p>
        Apart from the licenses in these terms, we keep all rights in
        Tabbied, including its design, templates and software. The Tabbied
        name and logo are ours; don&apos;t use them in a way that suggests we
        endorse you.
      </p>

      <h2>8. Acceptable use</h2>
      <p>Don&apos;t use Tabbied to:</p>
      <ul>
        <li>
          break the law, or create or share content that is unlawful,
          infringing, deceptive, harassing, hateful or sexually exploitative;
        </li>
        <li>
          build phishing, malware or scam sites, or sites that impersonate
          someone else;
        </li>
        <li>
          get around limits or access controls, for example with multiple
          accounts, shared accounts or automated downloads;
        </li>
        <li>
          scrape or bulk-download Tabbied, including its templates and
          previews, or use our API or MCP server in a way that disrupts the
          service for others;
        </li>
        <li>
          share your account, your downloads or a template&apos;s files so
          that others can use templates they haven&apos;t chosen;
        </li>
        <li>
          probe, attack or interfere with Tabbied&apos;s security or
          infrastructure; or
        </li>
        <li>
          copy or reverse engineer Tabbied, except as an open-source license
          or the law allows.
        </li>
      </ul>

      <h2>9. Suspension and termination</h2>
      <p>
        We may suspend or close your account, or remove content, if you break
        these terms, if your use creates a risk for Tabbied or others, or if
        the law requires it. Where it is reasonable, we will tell you why and
        give you a chance to respond. If we close a paid account for reasons
        other than a breach of these terms, we will refund the unused part of
        your current billing period.
      </p>
      <p>
        You can stop using Tabbied and delete your account at any time. When
        your account ends, the licenses for templates you chose and websites
        you made continue, unless we closed the account because you broke
        these terms (see the Template License in section 7 for what happens
        then). Sections 5 to 7 and 10 to 15 survive the end of this
        agreement.
      </p>

      <h2>10. Feedback</h2>
      <p>
        If you send us ideas or feedback, we may use them without any
        obligation to you.
      </p>

      <h2>11. Disclaimers</h2>
      <p>
        Tabbied is provided &quot;as is&quot; and &quot;as available&quot;. To
        the extent the law allows, we make no warranties of any kind, express
        or implied, including merchantability, fitness for a particular
        purpose and non-infringement. We don&apos;t promise that Tabbied will
        be uninterrupted or error-free, that it will keep your content safe
        from loss, or that AI output will be accurate. Keep your own copies of
        anything important.
      </p>

      <h2>12. Limitation of liability</h2>
      <p>
        To the extent the law allows, we are not liable for indirect,
        incidental, special, consequential or punitive damages, or for lost
        profits, revenue, data or goodwill. Our total liability for any claim
        about Tabbied is limited to the greater of the amount you paid us in
        the 12 months before the claim and US$50.
      </p>

      <h2>13. Indemnity</h2>
      <p>
        You will defend and compensate us against claims, losses and costs
        (including reasonable legal fees) arising from your content, your
        websites, or your breach of these terms.
      </p>

      <h2>14. Changes to these terms</h2>
      <p>
        We may update these terms. If a change is significant, we will tell
        you by email or on the site at least 14 days before it takes effect,
        unless it is needed sooner for legal or security reasons. If you keep
        using Tabbied after a change takes effect, the new terms apply. If you
        don&apos;t agree, stop using Tabbied and, if you have a paid plan,
        cancel it.
      </p>

      <h2>15. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Texas, United
        States, without regard to its conflict-of-law rules, and disputes
        will be resolved in the state or federal courts located in Texas. If
        you are a consumer, nothing in these terms takes away the rights you
        have under the laws of the country where you live.
      </p>

      <h2>16. General</h2>
      <p>
        These terms and the Privacy Policy are the whole agreement between
        you and us about Tabbied. If a part of these terms can&apos;t be
        enforced, the rest still applies. If we don&apos;t enforce a part
        right away, we haven&apos;t given up the right to. You can&apos;t
        transfer these terms to someone else without our consent; we may
        transfer them as part of a merger, acquisition or sale of Tabbied.
      </p>

      <h2>17. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
