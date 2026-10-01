import 'server-only';
import crypto from 'node:crypto';import {query} from '@/lib/server/database';
const pepper=()=>process.env.AUTH_PEPPER||'mocify-local-development-only';
export const hashToken=(v:string)=>crypto.createHmac('sha256',pepper()).update(v).digest('hex');
export function hashPassword(password:string){if(password.length<10)throw new Error('Password must contain at least 10 characters');const salt=crypto.randomBytes(16).toString('hex');const derived=crypto.scryptSync(password,salt,64).toString('hex');return `scrypt$${salt}$${derived}`;}
export function verifyPassword(password:string,stored:string){try{const[,salt,expected]=stored.split('$');const actual=crypto.scryptSync(password,salt,64);return crypto.timingSafeEqual(actual,Buffer.from(expected,'hex'));}catch{return false;}}
export async function createAuthToken(accountId:string,purpose:'VERIFY_EMAIL'|'RESET_PASSWORD'|'CHANGE_EMAIL',minutes:number,newEmail?:string){const raw=crypto.randomBytes(32).toString('base64url');await query(`INSERT INTO auth_tokens(account_id,purpose,token_hash,new_email,expires_at) SELECT id,$2,$3,$4,now()+($5||' minutes')::interval FROM accounts WHERE public_id=$1`,[accountId,purpose,hashToken(raw),newEmail??null,minutes]);return raw;}
export async function createSession(accountUuid:string){const raw=crypto.randomBytes(32).toString('base64url');await query(`INSERT INTO auth_sessions(account_id,token_hash,expires_at) VALUES($1,$2,now()+interval '30 days')`,[accountUuid,hashToken(raw)]);return raw;}
export async function sessionAccount(raw:string){const r=await query(`SELECT a.* FROM auth_sessions s JOIN accounts a ON a.id=s.account_id WHERE s.token_hash=$1 AND s.revoked_at IS NULL AND s.expires_at>now() AND a.status='ACTIVE'`,[hashToken(raw)]);return r.rows[0]??null;}
export async function revokeSession(raw:string){await query(`UPDATE auth_sessions SET revoked_at=now() WHERE token_hash=$1`,[hashToken(raw)]);}
