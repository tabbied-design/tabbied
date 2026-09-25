import type { Env } from '../env';

// The pool types `env` from `cloudflare:test` as `Cloudflare.Env`, the global
// interface `wrangler types` would generate. worker/env.ts stays the source of
// truth (it records which secrets are optional, which a generated file cannot
// say), so it is bridged here: a binding added there is visible to every test,
// and one renamed there breaks them at compile time.
declare global {
  namespace Cloudflare {
    interface Env extends WorkerEnv {
      /** Injected by worker/vitest.config.mts, applied in setup.ts. */
      TEST_MIGRATIONS: D1Migration[];
    }
  }
}

type WorkerEnv = Env;

export {};
