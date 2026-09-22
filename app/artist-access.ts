export type ArtistPlanTier="free"|"pro"|"max";
export type ArtistFeature="dashboard"|"music"|"upload"|"multiArtist"|"releaseScheduling"|"analytics"|"promote"|"earnings"|"studio";

export const ARTIST_ACCOUNT_KEY="mocify-artist-account";
export const ARTIST_SESSION_KEY="mocify-artist-session";
export const ARTIST_PLAN_KEY="mocify-artist-plan";
export const MANAGED_ARTISTS_KEY="mocify-managed-artists";
export const ACTIVE_ARTIST_KEY="mocify-active-artist";
export const ARTIST_BILLING_END_KEY="mocify-artist-billing-period-end";
export const ARTIST_PENDING_PLAN_KEY="mocify-artist-pending-plan";
export const ARTIST_AI_CREDITS_KEY="mocify-artist-ai-cover-credits";
export const ARTIST_AI_USAGE_KEY="mocify-artist-ai-cover-usage";

export const ARTIST_AI_COVER_MONTHLY_ALLOWANCE:Record<ArtistPlanTier,number>={free:1,pro:10,max:30};
export const ARTIST_AI_COVER_HARD_CAP:Record<ArtistPlanTier,number>={free:1,pro:10,max:30};
export type ArtistAiCoverUsage={period:string;used:number;estimatedCostUsd:number};
const aiPeriod=()=>new Date().toISOString().slice(0,7);
export function readArtistAiCoverUsage():ArtistAiCoverUsage{if(typeof window==="undefined")return{period:aiPeriod(),used:0,estimatedCostUsd:0};try{const raw=JSON.parse(localStorage.getItem(ARTIST_AI_USAGE_KEY)||"null");if(raw?.period===aiPeriod())return{period:raw.period,used:Number(raw.used)||0,estimatedCostUsd:Number(raw.estimatedCostUsd)||0}}catch{}return{period:aiPeriod(),used:0,estimatedCostUsd:0}}
export function getArtistAiCoverAllowance(plan:ArtistPlanTier){return Math.min(ARTIST_AI_COVER_MONTHLY_ALLOWANCE[plan],ARTIST_AI_COVER_HARD_CAP[plan])}
export function getArtistAiCoverBalance(plan:ArtistPlanTier){const usage=readArtistAiCoverUsage();return Math.max(0,getArtistAiCoverAllowance(plan)-usage.used)}
export function canGenerateArtistAiCover(plan:ArtistPlanTier){return getArtistAiCoverBalance(plan)>0}
export function recordArtistAiCoverGeneration(plan:ArtistPlanTier,estimatedCostUsd=0){if(typeof window==="undefined"||!canGenerateArtistAiCover(plan))return false;const usage=readArtistAiCoverUsage(),next={period:aiPeriod(),used:usage.used+1,estimatedCostUsd:usage.estimatedCostUsd+Math.max(0,estimatedCostUsd)};localStorage.setItem(ARTIST_AI_USAGE_KEY,JSON.stringify(next));window.dispatchEvent(new Event("mocify-ai-credit-change"));return true}


export const DEMO_ARTIST_ACCOUNTS={
 free:{email:"free@mocify.ai",password:"MocifyFree2026!",artistName:"Free Test Artist",plan:"free" as ArtistPlanTier,role:"artist" as const},
 pro:{email:"pro@mocify.ai",password:"MocifyPro2026!",artistName:"Pro Test Artist",plan:"pro" as ArtistPlanTier,role:"artist" as const},
 admin:{email:"admin@mocify.ai",password:"MocifyAdmin2026!",artistName:"MOCIFY Admin",plan:"max" as ArtistPlanTier,role:"admin" as const}
}as const;

const rank:Record<ArtistPlanTier,number>={free:0,pro:1,max:2};
export const featureMinimumPlan:Record<ArtistFeature,ArtistPlanTier>={
 dashboard:"free",music:"free",upload:"free",multiArtist:"pro",releaseScheduling:"pro",analytics:"pro",promote:"pro",earnings:"pro",studio:"max"
};

export function normalizeArtistPlan(value:string|null|undefined):ArtistPlanTier{
 if(value==="pro")return"pro";
 if(value==="max"||value==="studio")return"max";
 return"free";
}
export function hasArtistFeature(plan:ArtistPlanTier,feature:ArtistFeature){return rank[plan]>=rank[featureMinimumPlan[feature]]}
export function artistPlanRank(plan:ArtistPlanTier){return rank[plan]}
export function isArtistUpgrade(from:ArtistPlanTier,to:ArtistPlanTier){return rank[to]>rank[from]}
export function isArtistDowngrade(from:ArtistPlanTier,to:ArtistPlanTier){return rank[to]<rank[from]}

export type PrototypeArtistAccount={artistName:string;email:string;passwordHash:string};
export type PrototypeArtistSession={email:string;artistName:string;createdAt:number;role?:"artist"|"admin"};
export type ManagedArtist={id:string;name:string;genre:string;concept:string;createdAt:number;primary?:boolean};

export function readArtistAccount():PrototypeArtistAccount|null{
 if(typeof window==="undefined")return null;
 try{const raw=localStorage.getItem(ARTIST_ACCOUNT_KEY);if(!raw)return null;const parsed=JSON.parse(raw);if(typeof parsed?.email!=="string"||typeof parsed?.passwordHash!=="string")return null;return parsed}catch{return null}
}
export function readArtistSession():PrototypeArtistSession|null{
 if(typeof window==="undefined")return null;
 try{const raw=localStorage.getItem(ARTIST_SESSION_KEY);if(!raw)return null;const parsed=JSON.parse(raw);if(typeof parsed?.email!=="string")return null;return parsed}catch{return null}
}
export function writeArtistSession(account:PrototypeArtistAccount,role:"artist"|"admin"="artist"){
 const session:PrototypeArtistSession={email:account.email,artistName:account.artistName,createdAt:Date.now(),role};
 localStorage.setItem(ARTIST_SESSION_KEY,JSON.stringify(session));
 window.dispatchEvent(new Event("mocify-artist-session-change"));
 return session;
}
export function writeDemoSession(key:keyof typeof DEMO_ARTIST_ACCOUNTS){
 if(typeof window==="undefined")return null;
 const account=DEMO_ARTIST_ACCOUNTS[key];
 const session:PrototypeArtistSession={email:account.email,artistName:account.artistName,createdAt:Date.now(),role:account.role};
 localStorage.setItem(ARTIST_SESSION_KEY,JSON.stringify(session));
 window.dispatchEvent(new Event("mocify-artist-session-change"));
 localStorage.setItem(ARTIST_PLAN_KEY,account.plan);
 localStorage.removeItem(ARTIST_PENDING_PLAN_KEY);
 if(account.plan==="free")localStorage.removeItem(ARTIST_BILLING_END_KEY);else ensureArtistBillingEnd();
 window.dispatchEvent(new CustomEvent<ArtistPlanTier>("mocify-plan-change",{detail:account.plan}));
 return session;
}
export function matchDemoArtistCredentials(email:string,password:string){
 const normalized=email.trim().toLowerCase();
 const entry=(Object.entries(DEMO_ARTIST_ACCOUNTS) as [keyof typeof DEMO_ARTIST_ACCOUNTS,(typeof DEMO_ARTIST_ACCOUNTS)[keyof typeof DEMO_ARTIST_ACCOUNTS]][]).find(([,account])=>account.email===normalized&&account.password===password);
 return entry?.[0]??null;
}
export function clearArtistSession(){if(typeof window!=="undefined"){localStorage.removeItem(ARTIST_SESSION_KEY);window.dispatchEvent(new Event("mocify-artist-session-change"))}}
export function getStoredArtistPlan(){if(typeof window==="undefined")return"free" as ArtistPlanTier;applyPendingArtistPlanChange();return normalizeArtistPlan(localStorage.getItem(ARTIST_PLAN_KEY))}
export function ensureArtistBillingEnd(){
 if(typeof window==="undefined")return 0;
 const current=normalizeArtistPlan(localStorage.getItem(ARTIST_PLAN_KEY));
 if(current==="free"){localStorage.removeItem(ARTIST_BILLING_END_KEY);return 0}
 const saved=Number(localStorage.getItem(ARTIST_BILLING_END_KEY));
 if(Number.isFinite(saved)&&saved>Date.now())return saved;
 const next=Date.now()+30*24*60*60*1000;
 localStorage.setItem(ARTIST_BILLING_END_KEY,String(next));
 return next;
}
export function getArtistBillingEnd(){
 if(typeof window==="undefined")return 0;
 return ensureArtistBillingEnd();
}
export function getPendingArtistPlan():ArtistPlanTier|null{
 if(typeof window==="undefined")return null;
 const value=localStorage.getItem(ARTIST_PENDING_PLAN_KEY);
 return value==="free"||value==="pro"||value==="max"?value:null;
}
export function changeArtistPlanImmediate(target:ArtistPlanTier){
 if(typeof window==="undefined")return;
 const current=normalizeArtistPlan(localStorage.getItem(ARTIST_PLAN_KEY));
 const existingEnd=current==="free"?0:ensureArtistBillingEnd();
 localStorage.setItem(ARTIST_PLAN_KEY,target);
 localStorage.removeItem(ARTIST_PENDING_PLAN_KEY);
 if(target==="free")localStorage.removeItem(ARTIST_BILLING_END_KEY);
 else if(current==="free"||!existingEnd)localStorage.setItem(ARTIST_BILLING_END_KEY,String(Date.now()+30*24*60*60*1000));
 else localStorage.setItem(ARTIST_BILLING_END_KEY,String(existingEnd));
 window.dispatchEvent(new CustomEvent<ArtistPlanTier>("mocify-plan-change",{detail:target}));
}
export function scheduleArtistDowngrade(target:ArtistPlanTier){
 if(typeof window==="undefined")return;
 const current=normalizeArtistPlan(localStorage.getItem(ARTIST_PLAN_KEY));
 if(!isArtistDowngrade(current,target))return;
 ensureArtistBillingEnd();
 localStorage.setItem(ARTIST_PENDING_PLAN_KEY,target);
 window.dispatchEvent(new Event("mocify-plan-schedule-change"));
}
export function cancelArtistPendingPlan(){
 if(typeof window==="undefined")return;
 localStorage.removeItem(ARTIST_PENDING_PLAN_KEY);
 window.dispatchEvent(new Event("mocify-plan-schedule-change"));
}
export function applyPendingArtistPlanChange(){
 if(typeof window==="undefined")return;
 const pending=getPendingArtistPlan();
 if(!pending)return;
 const end=Number(localStorage.getItem(ARTIST_BILLING_END_KEY));
 if(!Number.isFinite(end)||Date.now()<end)return;
 localStorage.setItem(ARTIST_PLAN_KEY,pending);
 localStorage.removeItem(ARTIST_PENDING_PLAN_KEY);
 if(pending==="free")localStorage.removeItem(ARTIST_BILLING_END_KEY);
 else localStorage.setItem(ARTIST_BILLING_END_KEY,String(Date.now()+30*24*60*60*1000));
 window.dispatchEvent(new CustomEvent<ArtistPlanTier>("mocify-plan-change",{detail:pending}));
}

export function readManagedArtists():ManagedArtist[]{
 if(typeof window==="undefined")return[];
 try{const raw=localStorage.getItem(MANAGED_ARTISTS_KEY);if(!raw)return[];const parsed=JSON.parse(raw);return Array.isArray(parsed)?parsed.filter(x=>typeof x?.id==="string"&&typeof x?.name==="string"):[]}catch{return[]}
}
export function ensurePrimaryArtist(name="Andigo"){
 if(typeof window==="undefined")return[] as ManagedArtist[];
 const existing=readManagedArtists();
 if(existing.length){if(!localStorage.getItem(ACTIVE_ARTIST_KEY))localStorage.setItem(ACTIVE_ARTIST_KEY,existing[0].id);return existing}
 const primary:ManagedArtist={id:"andigo",name,genre:"AI Pop",concept:"Primary artist profile",createdAt:Date.now(),primary:true};
 localStorage.setItem(MANAGED_ARTISTS_KEY,JSON.stringify([primary]));
 localStorage.setItem(ACTIVE_ARTIST_KEY,primary.id);
 return[primary];
}
export function getActiveArtist(){
 if(typeof window==="undefined")return null;
 const artists=ensurePrimaryArtist(),activeId=localStorage.getItem(ACTIVE_ARTIST_KEY);
 return artists.find(x=>x.id===activeId)??artists[0]??null;
}
export function setActiveArtist(id:string){
 if(typeof window==="undefined")return;
 localStorage.setItem(ACTIVE_ARTIST_KEY,id);
 window.dispatchEvent(new CustomEvent("mocify-active-artist-change",{detail:id}));
}

export async function hashArtistPassword(value:string){
 const data=new TextEncoder().encode(value);
 const digest=await crypto.subtle.digest("SHA-256",data);
 return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join("");
}
