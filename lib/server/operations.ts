import 'server-only';
import { query } from '@/lib/server/database';

export async function createListener(i:{email:string;displayName?:string;countryCode?:string}){const r=await query(`SELECT * FROM create_listener_account($1,$2,$3::char(2))`,[i.email,i.displayName??null,i.countryCode??null]);return r.rows[0];}
export async function createBusiness(i:{email:string;legalName:string;countryCode?:string}){const r=await query(`SELECT * FROM create_business_account($1,$2,$3::char(2))`,[i.email,i.legalName,i.countryCode??null]);return r.rows[0];}
export async function createRelease(i:{artistId:string;title:string;releaseType?:string;releaseDate?:string}){const r=await query<{id:string}>(`SELECT create_release($1,$2,$3,$4::date) id`,[i.artistId,i.title,i.releaseType??'SINGLE',i.releaseDate??null]);return r.rows[0];}
export async function createTrack(i:{artistId:string;title:string;releaseId?:string;durationSeconds?:number;explicit?:boolean;isrc?:string}){const r=await query<{id:string}>(`SELECT create_track($1,$2,$3,$4,$5,$6) id`,[i.artistId,i.title,i.releaseId??null,i.durationSeconds??null,i.explicit??false,i.isrc??null]);return r.rows[0];}
export async function listReleases(){return (await query(`SELECT * FROM admin_release_directory ORDER BY created_at DESC`)).rows;}
export async function listSubscriptions(){return (await query(`SELECT * FROM admin_subscription_directory ORDER BY created_at DESC`)).rows;}
export async function listSupport(){return (await query(`SELECT * FROM admin_support_directory ORDER BY created_at DESC`)).rows;}
export async function listModeration(){return (await query(`SELECT * FROM admin_moderation_directory ORDER BY created_at DESC`)).rows;}
export async function listRisk(){return (await query(`SELECT * FROM admin_risk_directory ORDER BY opened_at DESC`)).rows;}
