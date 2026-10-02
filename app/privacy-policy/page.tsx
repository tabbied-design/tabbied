import type { Metadata } from 'next';
import LegalPage, { InShort } from 'components/legal/LegalPage';
import { pageMetadata } from 'lib/seo';

// Written against what the code does (worker/db/schema.ts, worker/auth.ts,
// worker/ai/, worker/lib/mail.ts, wrangler.jsonc). A change to what is
// collected, where it goes or how long it stays is a change here too.

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy - Tabbied',
  description:
    'What Tabbied collects, why, who processes it, how long it is kept, and the choices you have.',
  path: '/privacy-policy/',
});

const EMAIL = 'hello@tabbied.com';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2, 2026">
      <InShort>
        <ul>
          <li>
            You can browse and export patterns without an account. We collect
            personal data when you create an account and use features such as
            templates, saved sites, uploads and AI generation.
          </li>
          <li>
            When you use AI features, we store your prompts, the AI responses,
            the websites you make and the images generated for you, and we
            send what is needed to OpenAI to produce them.
          </li>
          <li>
            We don&apos;t use advertising or analytics trackers, and we
            don&apos;t sell your personal information.
          </li>
          <li>
            You can delete your account, and what is stored with it, from your
            account settings at any time.
          </li>
        </ul>
      </InShort>

      <h2>Who we are</h2>
      <p>
        Tabbied (tabbied.com) is run by Sy Hong and Ye Joo Park
        (&quot;Tabbied&quot;, &quot;we&quot;, &quot;us&quot;). We are
        responsible for the personal data described in this policy. You can
        reach us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
      <p>
        This policy covers the Tabbied website, your Tabbied account, the
        Tabbied API and MCP server at tabbied.com, and the emails we send.
        Our <a href="/terms-of-service/">Terms of Service</a> govern your use
        of Tabbied.
      </p>

      <h2>What we collect</h2>

      <h3>Without an account</h3>
      <p>
        Patterns are drawn and exported in your browser. Browsing patterns
        and templates, customizing patterns and exporting them does not send
        what you make to us. Like any website, our hosting provider receives
        technical information with each request (see{' '}
        <a href="#technical">Technical information</a>).
      </p>

      <h3>Account information</h3>
      <ul>
        <li>
          Your email address and a password. We store the password only as a
          salted hash. Your display name starts as the part of your email
          address before the @.
        </li>
        <li>
          If you sign in with Google, Apple or GitHub (where we offer it), we
          receive your name, email address and profile picture from that
          provider, and the access tokens it issues.
        </li>
        <li>
          Account records: when you signed up, whether your email is verified,
          your role, and any restrictions on the account.
        </li>
      </ul>

      <h3>What you make and upload</h3>
      <ul>
        <li>
          The templates you choose, the sites you customize and save, every
          saved revision of them, and the names you give them.
        </li>
        <li>
          Pictures you upload (PNG, JPEG or WebP) and any note you add to
          them.
        </li>
        <li>
          Your answers when you ask for more templates: your role, what you
          build, how many sites you make, whether and what you would pay, a
          link to your work and any note you write.
        </li>
      </ul>

      <h3>AI features</h3>
      <p>
        When you use features that generate content with AI, we collect and
        store:
      </p>
      <ul>
        <li>
          your prompts, such as the description of your business and the
          changes you ask for;
        </li>
        <li>the responses the AI model returns;</li>
        <li>the websites you complete with them; and</li>
        <li>the images generated for you.</li>
      </ul>
      <p>
        We also record how much you use these features (for example the
        number of requests, model usage and estimated cost) to apply usage
        limits and, where a plan has them, to bill for usage.
      </p>

      <h3>Payments</h3>
      <p>
        If you buy a paid plan, payment is handled by our payment processor.
        We don&apos;t receive or store your full card number. We receive
        your plan, billing status, billing country and the last digits and
        expiry of your card, and we keep records of your purchases.
      </p>

      <h3 id="technical">Technical information</h3>
      <ul>
        <li>
          When you are signed in, the IP address and browser (user agent) of
          each session.
        </li>
        <li>
          Logs of requests to our servers, including the time, path and
          errors, kept by our hosting provider.
        </li>
        <li>
          Records of template downloads and short-lived counters we use to
          limit how often an account can call our API.
        </li>
      </ul>

      <h3>When you contact us</h3>
      <p>
        If you email us, we keep your message and our reply so we can help
        you.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>
          To provide Tabbied: your account, sign-in, saved sites, uploads,
          downloads and AI generation.
        </li>
        <li>
          To send the emails the service needs: confirming your address,
          resetting your password, and messages about your template requests
          and your account. We don&apos;t send marketing email; if we start,
          you will be able to opt out.
        </li>
        <li>
          To apply usage limits and plan entitlements, process payments, and
          prevent fraud and abuse.
        </li>
        <li>
          To support you. Our team can view your account, and see Tabbied as
          you see it, to answer a request or fix a problem.
        </li>
        <li>To keep Tabbied secure and to enforce our Terms of Service.</li>
        <li>
          To improve Tabbied, including the quality of our templates and of
          AI-generated results. We use AI prompts, responses, websites and
          images for this, in aggregated or de-identified form where we can.
          We will not publish your content as an example or showcase without
          your permission.
        </li>
        <li>To comply with the law.</li>
      </ul>
      <p>
        If you are in the European Economic Area or the United Kingdom, we
        rely on these legal bases: performing our contract with you
        (providing the service and processing payments), our legitimate
        interests (security, abuse prevention, support and improving
        Tabbied), your consent where we ask for it, and legal obligations.
      </p>

      <h2>Who receives your data</h2>
      <p>
        We don&apos;t sell your personal information, and we don&apos;t share
        it for advertising. We use these service providers, which process
        data for us under their own terms:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> hosts the website and API, stores our
          database and files, keeps request logs, and routes email sent to
          tabbied.com.
        </li>
        <li>
          <strong>OpenAI</strong> generates text and images for AI features.
          We send it your prompts, the content of the site being edited, and
          any pictures you choose to include; we don&apos;t send your name or
          email address. Under OpenAI&apos;s API policies, it does not use
          this data to train its models by default and keeps it for a limited
          time for abuse monitoring and the features we use.
        </li>
        <li>
          <strong>Resend</strong> sends our emails, with your email address
          and the message content.
        </li>
        <li>
          <strong>Our payment processor</strong>, when you buy a paid plan,
          receives your payment details and billing information.
        </li>
        <li>
          <strong>Google, Apple or GitHub</strong>, if you choose to sign in
          with them.
        </li>
        <li>
          <strong>Adobe Fonts and Google Fonts</strong> serve the typefaces on
          our pages and template previews, so your browser requests fonts
          from them and they receive your IP address and browser details.
          Downloaded templates load fonts the same way. The footer on some
          pages shows a badge image served by Product Hunt.
        </li>
      </ul>
      <p>
        We may also disclose information when the law requires it, to protect
        the rights, safety or property of our users or others, or as part of
        a merger, acquisition or sale of Tabbied, in which case this policy
        continues to apply to your data.
      </p>
      <p>
        Some things you make are shareable by link. Anyone with the link to a
        shared site or generation can view it, including the description it
        was made from.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        We use only the cookies Tabbied needs to work. We don&apos;t use
        analytics or advertising cookies.
      </p>
      <ul>
        <li>
          <code>__Secure-better-auth.session_token</code> keeps you signed in
          (7 days).
        </li>
        <li>
          <code>__Secure-better-auth.session_data</code> caches your session
          for a few minutes so pages load faster.
        </li>
        <li>
          <code>__Secure-better-auth.state</code> is set for a few minutes
          during a sign-in with Google, Apple or GitHub.
        </li>
      </ul>
      <p>
        We also keep a few things in your browser&apos;s local storage, which
        never leave your device: a note that you were signed in (so the page
        header doesn&apos;t flicker), palettes you create in the pattern
        gallery, your scroll position in the gallery, and an AI prompt you
        started before signing in.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          We keep your account and what you make while your account exists.
          You can delete individual sites and uploads at any time.
        </li>
        <li>
          When you delete your account, we delete your account, sites,
          revisions, uploads, generated images, AI history, template choices,
          requests and usage records.
        </li>
        <li>
          Some data outlasts that for a limited time: database backups, which
          our hosting provider keeps for up to 30 days; request logs; the
          counters we use for rate limits; copies
          our service providers keep under their own retention policies; and
          records we must keep for legal, tax or accounting reasons, such as
          purchase records.
        </li>
        <li>
          Information that no longer identifies you, such as aggregated usage
          statistics, may be kept longer.
        </li>
      </ul>

      <h2>Your choices and rights</h2>
      <ul>
        <li>
          <strong>Delete:</strong> delete your account in your account
          settings, or ask us to.
        </li>
        <li>
          <strong>Access and portability:</strong> ask us for a copy of the
          personal data we hold about you.
        </li>
        <li>
          <strong>Correct:</strong> ask us to fix information that is wrong.
        </li>
        <li>
          <strong>Object or restrict:</strong> ask us to stop or limit a use
          of your data, such as using your content to improve Tabbied.
        </li>
      </ul>
      <p>
        Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> from the address on your
        account, and we will respond within 30 days. Depending on where you
        live, you may have further rights under local law, such as the right
        to complain to a data protection authority. We don&apos;t sell or
        share personal information as those terms are defined in California
        law, and we won&apos;t treat you differently for using your rights.
      </p>

      <h2>Security</h2>
      <p>
        Tabbied is served over HTTPS. Passwords are stored as salted hashes,
        and access to account data is limited to our team. No system
        is perfectly secure; if a breach affects your personal data, we will
        tell you as the law requires.
      </p>

      <h2>Where your data is processed</h2>
      <p>
        We and our service providers process data in the United States and
        in other countries where they operate. Where the law requires it, we
        rely on safeguards such as the European Commission&apos;s standard
        contractual clauses for those transfers.
      </p>

      <h2>Children</h2>
      <p>
        Tabbied is not meant for children under 13, and we don&apos;t
        knowingly collect their personal data. If you believe a child has
        given us personal data, contact us and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this policy when what we collect or how we use it
        changes, and change the date at the top. If a change is significant,
        we will tell you by email or on the site before it takes effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data:{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
