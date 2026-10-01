import 'server-only';

import { Pool, type QueryResultRow } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured. Add it to .env.local.');
}

declare global {
  // eslint-disable-next-line no-var
  var __mocifyPgPool: Pool | undefined;
}

export const db =
  global.__mocifyPgPool ??
  new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

if (process.env.NODE_ENV !== 'production') {
  global.__mocifyPgPool = db;
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  return db.query<T>(text, values);
}
