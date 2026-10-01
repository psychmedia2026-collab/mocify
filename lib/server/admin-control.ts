import 'server-only';
import {query} from '@/lib/server/database';
export async function updateArtist(id:string,input:{plan?:string;verification?:string}){if(input.plan)await query(`SELECT set_artist_plan($1,$2::artist_plan)`,[id,input.plan]);if(input.verification)await query(`SELECT set_artist_verification($1,$2::verification_status)`,[id,input.verification]);return true;}
export async function updateTrack(id:string,status:string){await query(`SELECT set_track_status($1,$2::record_status)`,[id,status]);}
export async function updateRelease(id:string,status:string){await query(`SELECT set_release_status($1,$2::record_status)`,[id,status]);}
export async function listAdmins(){return (await query(`SELECT * FROM admin_member_directory ORDER BY created_at`)).rows;}
