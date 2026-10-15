import { resetPasswordEmail, verificationEmail, type Message } from './mail';

// Every message the Worker sends, as the admin's Email preview shows it:
// built by the same functions that send it (lib/mail.ts), from sample data,
// on the configured origin. A message added to mail.ts belongs here too, or
// the page quietly stops describing what people receive.
//
// The links carry an obviously fake token, so a test copy followed from an
// inbox confirms and resets nothing. The links are built on PUBLIC_ORIGIN, as
// real mail's are; the lockup image comes from wherever the admin is looking
// (`imageOrigin`), so a PR preview deployment shows it, and sends it, before
// the image is live on the production host.

const TOKEN = 'PREVIEW-ONLY.not-a-real-token';

/** The person every sample is about. */
const SAMPLE = { name: 'Pat Lee' };

export type EmailPreview = {
  key: string;
  name: string;
  /** Who receives it for real. A test copy only ever goes to the admin asking. */
  to: 'person';
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
];
