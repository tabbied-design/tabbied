/**
 * Everything the Worker is handed at runtime.
 *
 * Secrets are typed optional because they genuinely are: the Worker serves the
 * site with none of them set, and each feature degrades on its own (no AI key
 * -> the matcher answers; no mail key in dev -> verification links go to D1).
 */
export type Env = {
  ASSETS: { fetch(request: Request | string): Promise<Response> };

  DB: D1Database;
  MEDIA: R2Bucket;

  PUBLIC_ORIGIN: string;
  AI_BASE_URL: string;
  AI_MODEL: string;
  AI_IMAGE_MODEL: string;

  /**
   * Sent as `reasoning.effort` on every Responses call, and omitted when unset
   * (a non-reasoning model, and some compatible servers, reject the field).
   * The rungs are the GPT-5.6 family's, which has `none` where GPT-5 had
   * `minimal`.
   */
  AI_REASONING_EFFORT?: 'none' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';

  BETTER_AUTH_SECRET?: string;
  AI_API_KEY?: string;
  RESEND_API_KEY?: string;
  /**
   * The From line every message goes out as, e.g. `Tabbied <hello@tabbied.com>`.
   * Its domain has to be verified in Resend. Defaults to that address.
   */
  MAIL_FROM?: string;
  /**
   * Comma-separated inboxes that hear about "Request more" messages. Falls
   * back to ADMIN_EMAILS, then to MAIL_FROM's own address.
   */
  TEAM_EMAIL?: string;
  /**
   * Comma-separated emails that are admins by configuration: granted the role
   * when the account is created or, for an existing account, on its next
   * sign-in.
   */
  ADMIN_EMAILS?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  /**
   * Sign in with Apple. The "secret" is the signed JWT Apple has you mint
   * from your key, which expires every six months - rotate it like any
   * other secret.
   */
  APPLE_CLIENT_ID?: string;
  APPLE_CLIENT_SECRET?: string;

  /** Set only in .dev.vars. Relaxes cookie flags and opens CORS to loopback origins. */
  DEV?: string;
};

export const isDev = (env: Env) => env.DEV === '1';
