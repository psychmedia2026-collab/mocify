import 'server-only';
import { query } from '@/lib/server/database';

export async function listAdminTracks() {
  const { rows } = await query(`SELECT * FROM admin_track_directory ORDER BY created_at DESC, track_id ASC`);
  return rows;
}
export async function listAdminListeners() {
  const { rows } = await query(`SELECT * FROM admin_listener_directory ORDER BY created_at DESC, listener_id ASC`);
  return rows;
}
export async function listAdminBusinesses() {
  const { rows } = await query(`SELECT * FROM admin_business_directory ORDER BY created_at DESC, business_id ASC`);
  return rows;
}
export async function listAdminPayments() {
  const { rows } = await query(`SELECT * FROM admin_payment_directory ORDER BY created_at DESC, payment_id ASC`);
  return rows;
}
export async function listAdminPayouts() {
  const { rows } = await query(`SELECT * FROM admin_payout_directory ORDER BY created_at DESC, payout_id ASC`);
  return rows;
}
export async function getAdminDashboardSummary() {
  const { rows } = await query<{
    artists: string; listeners: string; businesses: string; tracks: string; streams: string;
    pending_payouts: string; open_risk_cases: string; open_tickets: string;
  }>(`SELECT
    (SELECT count(*) FROM artist_profiles)::text artists,
    (SELECT count(*) FROM accounts WHERE type='LISTENER' AND status <> 'DELETED')::text listeners,
    (SELECT count(*) FROM business_profiles)::text businesses,
    (SELECT count(*) FROM tracks)::text tracks,
    (SELECT count(*) FROM stream_events WHERE counted)::text streams,
    (SELECT count(*) FROM payouts WHERE status='PENDING')::text pending_payouts,
    (SELECT count(*) FROM risk_cases WHERE status <> 'RESOLVED')::text open_risk_cases,
    (SELECT count(*) FROM support_tickets WHERE status NOT IN ('RESOLVED','CLOSED'))::text open_tickets`);
  const r=rows[0];
  return Object.fromEntries(Object.entries(r).map(([k,v])=>[k,Number(v)]));
}
