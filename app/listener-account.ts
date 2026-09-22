"use client";
import type {Release} from "./data";
export const LISTENER_ACCOUNT_KEY="mocify-listener-account",LISTENER_SESSION_KEY="mocify-listener-session",LIKED_KEY="mocify-saved-track-ids",FOLLOWED_KEY="mocify-followed-artists",PLAYLIST_KEY="mocify-listener-playlists",SAVED_PLAYLIST_KEY="mocify-saved-playlists",HISTORY_KEY="mocify-listening-history",PUBLISHED_KEY="mocify-published-releases";
export type ListenerAccount={displayName:string;email:string;passwordHash:string;country:string;language:string;avatar?:string};
export type ListenerPlaylist={id:string;name:string;cover:string;trackIds:string[];createdAt:number};
export type PublishedRelease={id:string;title:string;artist:string;genre:string;art:string;audioSrc?:string;duration?:string;country?:string;href?:string;detailReady?:boolean;releaseDate?:string;status?:"published"|"scheduled"|"draft";createdAt?:number;tool?:string};
const read=<T,>(key:string,fallback:T):T=>{if(typeof window==="undefined")return fallback;try{const v=JSON.parse(localStorage.getItem(key)||"null");return v??fallback}catch{return fallback}};
const write=(key:string,value:unknown)=>{localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event("mocify-library-change"))};
export const hashListenerPassword=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");
export const readListenerAccount=()=>read<ListenerAccount|null>(LISTENER_ACCOUNT_KEY,null);
export const saveListenerAccount=(v:ListenerAccount)=>write(LISTENER_ACCOUNT_KEY,v);
export const readListenerSession=()=>read<{email:string;displayName:string}|null>(LISTENER_SESSION_KEY,null);
export const saveListenerSession=(v:{email:string;displayName:string})=>write(LISTENER_SESSION_KEY,v);
export const clearListenerSession=()=>{localStorage.removeItem(LISTENER_SESSION_KEY);window.dispatchEvent(new Event("mocify-library-change"))};
export const readIds=(key:string)=>read<string[]>(key,[]);
export const toggleId=(key:string,id:string)=>{const ids=readIds(key),next=ids.includes(id)?ids.filter(x=>x!==id):[...ids,id];write(key,next);return next.includes(id)};
export const readPlaylists=()=>read<ListenerPlaylist[]>(PLAYLIST_KEY,[]);
export const ensureStarterPlaylist=()=>{const list=readPlaylists();if(list.length)return list;const starter:ListenerPlaylist={id:"pl-mocify-favorites",name:"MOCIFY Mix",cover:"art-a",trackIds:["toca-bonbon","bella-ciao","fara-mine"],createdAt:Date.now()};savePlaylists([starter]);return[starter]};
export const savePlaylists=(v:ListenerPlaylist[])=>write(PLAYLIST_KEY,v);
export const playlistNameExists=(name:string,excludeId?:string)=>{const value=name.trim().toLocaleLowerCase();return Boolean(value)&&readPlaylists().some(p=>p.id!==excludeId&&p.name.trim().toLocaleLowerCase()===value)};
export const createPlaylist=(name:string,cover="art-a")=>{const list=readPlaylists(),value=name.trim()||"New playlist";if(playlistNameExists(value))return null;const p={id:"pl-"+Date.now(),name:value,cover,trackIds:[],createdAt:Date.now()};savePlaylists([p,...list]);return p};
export const toggleTrackInPlaylist=(playlistId:string,trackId:string)=>{savePlaylists(readPlaylists().map(p=>p.id===playlistId?{...p,trackIds:p.trackIds.includes(trackId)?p.trackIds.filter(x=>x!==trackId):[...p.trackIds,trackId]}:p))};
export const removePlaylist=(id:string)=>savePlaylists(readPlaylists().filter(p=>p.id!==id));
export const addHistory=(id:string)=>{const ids=readIds(HISTORY_KEY).filter(x=>x!==id);write(HISTORY_KEY,[id,...ids].slice(0,30))};
export const readPublishedReleases=()=>read<PublishedRelease[]>(PUBLISHED_KEY,[]);
const releaseIsVisible=(r:PublishedRelease)=>{if(r.status==="draft")return false;if(r.status==="scheduled"){if(!r.releaseDate)return false;const releaseAt=new Date(r.releaseDate+"T00:00:00").getTime();return Number.isFinite(releaseAt)&&releaseAt<=Date.now()}return !r.releaseDate||new Date(r.releaseDate+"T00:00:00").getTime()<=Date.now()};
export const readPublicPublishedReleases=()=>readPublishedReleases().filter(releaseIsVisible);
export const publishPrototypeRelease=(release:PublishedRelease)=>write(PUBLISHED_KEY,[release,...readPublishedReleases().filter(r=>r.id!==release.id)]);
export const removePublishedRelease=(id:string)=>{write(PUBLISHED_KEY,readPublishedReleases().filter(r=>r.id!==id));void deletePrototypeAudio(id)};
export const updatePublishedRelease=(id:string,patch:Partial<PublishedRelease>)=>write(PUBLISHED_KEY,readPublishedReleases().map(r=>r.id===id?{...r,...patch,id}:r));
export const combinedReleases=(base:readonly Release[])=>[...readPublicPublishedReleases(),...base] as readonly (Release|PublishedRelease)[];


const AUDIO_DB="mocify-prototype-audio",AUDIO_STORE="tracks";
function openAudioDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const request=indexedDB.open(AUDIO_DB,1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(AUDIO_STORE))request.result.createObjectStore(AUDIO_STORE)};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
export async function storePrototypeAudio(id:string,file:Blob){if(typeof indexedDB==="undefined")return;const db=await openAudioDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(AUDIO_STORE,"readwrite");tx.objectStore(AUDIO_STORE).put(file,id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close()}
export async function deletePrototypeAudio(id:string){if(typeof indexedDB==="undefined")return;const db=await openAudioDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(AUDIO_STORE,"readwrite");tx.objectStore(AUDIO_STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close()}
export async function readPrototypeAudio(id:string):Promise<Blob|null>{if(typeof indexedDB==="undefined")return null;const db=await openAudioDb();const blob=await new Promise<Blob|null>((resolve,reject)=>{const tx=db.transaction(AUDIO_STORE,"readonly"),request=tx.objectStore(AUDIO_STORE).get(id);request.onsuccess=()=>resolve(request.result instanceof Blob?request.result:null);request.onerror=()=>reject(request.error)});db.close();return blob}
export async function hydratedPublishedReleases(){const list=readPublicPublishedReleases();return Promise.all(list.map(async release=>{try{const blob=await readPrototypeAudio(release.id);return blob?{...release,audioSrc:URL.createObjectURL(blob)}:release}catch{return release}}))}
export const renamePlaylist=(id:string,name:string)=>{const value=name.trim();if(!value||playlistNameExists(value,id))return false;savePlaylists(readPlaylists().map(p=>p.id===id?{...p,name:value}:p));return true};
