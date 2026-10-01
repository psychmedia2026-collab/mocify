import { NextResponse } from 'next/server';

import { query } from '@/lib/server/database';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await query<{
      database_name: string;
      database_user: string;
      server_time: Date;
    }>(
      `SELECT
         current_database() AS database_name,
         current_user AS database_user,
         NOW() AS server_time`,
    );

    const connection = result.rows[0];

    return NextResponse.json({
      ok: true,
      service: 'mocify-backend',
      database: {
        connected: true,
        name: connection.database_name,
        user: connection.database_user,
        serverTime: connection.server_time,
      },
    });
  } catch (error) {
    console.error('MOCIFY database health check failed', error);

    return NextResponse.json(
      {
        ok: false,
        service: 'mocify-backend',
        database: { connected: false },
        error: 'Database connection failed',
      },
      { status: 503 },
    );
  }
}
