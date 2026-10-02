// Starts zod before anything that builds schemas while it loads. Imported
// first by worker/index.ts; keep it there.
//
// better-auth loads two of its database adapters with a dynamic import(), and
// they import zod, so wrangler's bundler (esbuild) puts zod behind a lazy
// initializer that runs only where an importer calls it. The MCP SDK builds
// its schemas at module scope and was bundled ahead of the first such call,
// so it reached z.lazy() before ZodLazy existed. The Worker then failed to
// start: "Uncaught TypeError: ZodLazy is not a constructor", which Workers
// Builds reports as a rejected upload (code 10021). The worker tests bundle
// with Vite and never saw it; `wrangler dev` does.
//
// A schema built here is a use esbuild cannot drop, so the initializer runs
// before the SDK's module does.
import { z } from 'zod';

export const ZOD_READY = z.lazy(() => z.never());
