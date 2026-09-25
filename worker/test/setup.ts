import { applyD1Migrations, env } from 'cloudflare:test';
import { beforeAll } from 'vitest';

// The committed migrations are the schema under test: exactly the SQL a deploy
// would apply. The bindings are typed in ./env.d.ts.
beforeAll(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
});
