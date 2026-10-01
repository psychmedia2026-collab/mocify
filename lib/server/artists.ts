import 'server-only';
import { query } from '@/lib/server/database';

export type AdminArtist = {
  id: string;
  name: string;
  email: string;
  plan: 'ARTIST_FREE' | 'ARTIST_PRO' | 'ARTIST_MAX';
  verification: string;
  status: string;
  countryCode: string | null;
  trackCount: number;
  totalStreams: number;
};

type ArtistRow = {
  artist_id: string;
  display_name: string;
  email: string;
  plan: AdminArtist['plan'];
  verification_status: string;
  account_status: string;
  country_code: string | null;
  track_count: string;
  total_streams: string;
};

export async function listAdminArtists(): Promise<AdminArtist[]> {
  const result = await query<ArtistRow>(`
    SELECT artist_id, display_name, email, plan, verification_status,
           account_status, country_code, track_count, total_streams
    FROM admin_artist_directory
    ORDER BY artist_id ASC
  `);
  return result.rows.map((row) => ({
    id: row.artist_id,
    name: row.display_name,
    email: row.email,
    plan: row.plan,
    verification: row.verification_status,
    status: row.account_status,
    countryCode: row.country_code,
    trackCount: Number(row.track_count),
    totalStreams: Number(row.total_streams),
  }));
}

export async function createArtist(input: {
  email: string;
  displayName: string;
  plan?: AdminArtist['plan'];
  countryCode?: string | null;
}) {
  const result = await query<{ account_public_id: string; artist_public_id: string }>(
    `SELECT * FROM create_artist_account($1,$2,$3::artist_plan,$4::char(2))`,
    [input.email, input.displayName, input.plan ?? 'ARTIST_FREE', input.countryCode ?? null],
  );
  return result.rows[0];
}
