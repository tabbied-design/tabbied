import {
  adminGrantEmail,
  approvalEmail,
  requestDecisionEmail,
  resetPasswordEmail,
  templateRequestEmail,
  verificationEmail,
  type Message,
} from './mail';
import { FIRST_REQUEST_GRANT, FREE_TEMPLATES, activationUrl } from './templates';

// Every message the Worker sends, as the admin's Email preview shows it:
// built by the same functions that send it (lib/mail.ts), from sample data,
// on the configured origin. A message added to mail.ts belongs here too, or
// the page quietly stops describing what people receive.
//
// The links carry an obviously fake token, so a test copy followed from an
// inbox confirms, resets and grants nothing. The links are built on
// PUBLIC_ORIGIN, as real mail's are; the lockup image comes from wherever the
// admin is looking (`imageOrigin`), so a PR preview deployment shows it, and
// sends it, before the image is live on the production host.

const TOKEN = 'PREVIEW-ONLY.not-a-real-token';

/** The person every sample is about. */
const SAMPLE = { name: 'Pat Lee', email: 'pat@example.com' };

export type EmailPreview = {
  key: string;
  name: string;
  /** Who receives it for real. A test copy only ever goes to the admin asking. */
  to: 'person' | 'team';
  /** What sends it. */
  when: string;
  build: (origin: string, imageOrigin: string) => Message;
};

export const EMAIL_PREVIEWS: EmailPreview[] = [
  {
    key: 'verify',
    name: 'Account confirmation',
    to: 'person',
    when: 'Sign-up (better-auth)',
    // better-auth's own shape for the link: its endpoint, then where to land.
    build: (origin, imageOrigin) =>
      verificationEmail({
        origin: imageOrigin,
        name: SAMPLE.name,
        url: `${origin}/api/auth/verify-email?token=${TOKEN}&callbackURL=${encodeURIComponent(`${origin}/verify-email/`)}`,
      }),
  },
  {
    key: 'reset',
    name: 'Password reset',
    to: 'person',
    when: '"Forgot password" (better-auth)',
    build: (origin, imageOrigin) =>
      resetPasswordEmail({
        origin: imageOrigin,
        name: SAMPLE.name,
        url: `${origin}/api/auth/reset-password/${TOKEN}?callbackURL=${encodeURIComponent(`${origin}/reset-password/`)}`,
      }),
  },
  {
    key: 'approval',
    name: 'Extra templates link',
    to: 'person',
    when: 'Five minutes after a first "Request more"',
    build: (origin, imageOrigin) =>
      approvalEmail({
        origin: imageOrigin,
        name: SAMPLE.name,
        url: activationUrl(origin, TOKEN),
        granted: FIRST_REQUEST_GRANT,
        total: FREE_TEMPLATES + FIRST_REQUEST_GRANT,
      }),
  },
  {
    key: 'request',
    name: 'Request for review',
    to: 'team',
    when: 'A second or later "Request more"',
    build: (origin) =>
      templateRequestEmail({
        ...SAMPLE,
        note: 'Six cafe sites in Portland this spring, each on its own palette.',
        used: FREE_TEMPLATES + FIRST_REQUEST_GRANT,
        total: FREE_TEMPLATES + FIRST_REQUEST_GRANT,
        answers: [
          'Designer, Client sites, 3-10 sites in the next 3 months',
          'Needs 10 more. Would pay: Maybe ($10/month)',
          'Work: northfold.studio',
        ],
        origin,
      }),
  },
  {
    key: 'granted',
    name: 'Request granted',
    to: 'person',
    when: 'An admin grants a reviewed request',
    build: (origin) => requestDecisionEmail({ status: 'granted', granted: 5, total: 15, origin }),
  },
  {
    key: 'added',
    name: 'Templates added',
    to: 'person',
    when: 'An admin adds templates from the users page, with "Email them" ticked',
    build: (origin) => adminGrantEmail({ granted: 5, total: 10, origin }),
  },
  {
    key: 'declined',
    name: 'Request declined',
    to: 'person',
    when: 'An admin declines a reviewed request',
    build: (origin) => requestDecisionEmail({ status: 'declined', granted: 0, total: 10, origin }),
  },
];
