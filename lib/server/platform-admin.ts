import 'server-only';
import {query} from '@/lib/server/database';
export async function platformSummary(){return (await query(`SELECT * FROM admin_platform_summary`)).rows[0];}
export async function financeSummary(){return (await query(`SELECT * FROM admin_finance_summary`)).rows[0];}
export async function artistDetail(id:string){const a=await query(`SELECT * FROM admin_artist_directory WHERE artist_id=$1`,[id]);if(!a.rows[0])return null;const tracks=await query(`SELECT * FROM admin_track_directory WHERE artist_id=$1 ORDER BY created_at DESC`,[id]);const releases=await query(`SELECT * FROM admin_release_directory WHERE artist_id=$1 ORDER BY created_at DESC`,[id]);return {...a.rows[0],tracks:tracks.rows,releases:releases.rows};}
export async function trackDetail(id:string){return (await query(`SELECT * FROM admin_track_directory WHERE track_id=$1`,[id])).rows[0]??null;}
export async function releaseDetail(id:string){return (await query(`SELECT * FROM admin_release_directory WHERE release_id=$1`,[id])).rows[0]??null;}
