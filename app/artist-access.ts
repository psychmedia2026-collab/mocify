export type ArtistPlanTier="free"|"pro"|"max";
export type ArtistFeature="dashboard"|"music"|"upload"|"releaseScheduling"|"analytics"|"promote"|"earnings"|"studio";

export const ARTIST_ACCOUNT_KEY="mocify-artist-account";
export const ARTIST_SESSION_KEY="mocify-artist-session";
export const ARTIST_PLAN_KEY="mocify-artist-plan";

const rank:Record<ArtistPlanTier,number>={free:0,pro:1,max:2};
export const featureMinimumPlan:Record<ArtistFeature,ArtistPlanTier>={
 dashboard:"free",music:"free",upload:"free",releaseScheduling:"pro",analytics:"pro",promote:"pro",earnings:"pro",studio:"max"
};

export function normalizeArtistPlan(value:string|null|undefined):ArtistPlanTier{
 if(value==="pro")return"pro";
 if(value==="max"||value==="studio")return"max";
 return"free";
}
export function hasArtistFeature(plan:ArtistPlanTier,feature:ArtistFeature){return rank[plan]>=rank[featureMinimumPlan[feature]]}

export type PrototypeArtistAccount={artistName:string;email:string;passwordHash:string};
export type PrototypeArtistSession={email:string;artistName:string;createdAt:number};

export function readArtistAccount():PrototypeArtistAccount|null{
 if(typeof window==="undefined")return null;
 try{const raw=localStorage.getItem(ARTIST_ACCOUNT_KEY);if(!raw)return null;const parsed=JSON.parse(raw);if(typeof parsed?.email!=="string"||typeof parsed?.passwordHash!=="string")return null;return parsed}catch{return null}
}
export function readArtistSession():PrototypeArtistSession|null{
 if(typeof window==="undefined")return null;
 try{const raw=localStorage.getItem(ARTIST_SESSION_KEY);if(!raw)return null;const parsed=JSON.parse(raw);if(typeof parsed?.email!=="string")return null;return parsed}catch{return null}
}
export function writeArtistSession(account:PrototypeArtistAccount){
 const session:PrototypeArtistSession={email:account.email,artistName:account.artistName,createdAt:Date.now()};
 localStorage.setItem(ARTIST_SESSION_KEY,JSON.stringify(session));
 return session;
}
export function clearArtistSession(){if(typeof window!=="undefined")localStorage.removeItem(ARTIST_SESSION_KEY)}
export function getStoredArtistPlan(){if(typeof window==="undefined")return"free" as ArtistPlanTier;return normalizeArtistPlan(localStorage.getItem(ARTIST_PLAN_KEY))}

export async function hashArtistPassword(value:string){
 const data=new TextEncoder().encode(value);
 const digest=await crypto.subtle.digest("SHA-256",data);
 return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join("");
}
