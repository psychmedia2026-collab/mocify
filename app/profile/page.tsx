"use client";
import {FormEvent,useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Shell} from "../components";
import {clearListenerSession,readListenerAccount,readListenerSession,saveListenerAccount,type ListenerAccount} from "../listener-account";

export default function Profile(){
 const router=useRouter();
 const [account,setAccount]=useState<ListenerAccount|null>(null);
 const [saved,setSaved]=useState(false);
 useEffect(()=>{if(!readListenerSession()){router.replace("/login?next=/profile");return}setAccount(readListenerAccount())},[router]);
 if(!account)return <Shell><section className="page-wrap listener-profile"><p>Loading account…</p></section></Shell>;
 const sub=account.subscription||{plan:"free" as const};
 const date=(v?:number)=>v?new Intl.DateTimeFormat(undefined,{dateStyle:"long"}).format(new Date(v)):"—";
 function save(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const next={...account!,displayName:String(f.get("displayName")||account!.displayName)};saveListenerAccount(next);setAccount(next);setSaved(true);window.setTimeout(()=>setSaved(false),2200)}
 function cancelSubscription(){if(sub.plan==="free")return;const next={...account!,subscription:{...sub,cancelAtPeriodEnd:true}};saveListenerAccount(next);setAccount(next)}
 return <Shell><section className="page-wrap listener-profile"><p className="page-kicker">LISTENER PROFILE</p><h1>Your profile</h1><div className="listener-profile-layout"><aside><div className="listener-avatar">{account.avatar?<img src={account.avatar} alt=""/>:account.displayName.slice(0,2).toUpperCase()}</div><b>{account.displayName}</b><span>{account.email}</span><Link className="m-secondary" href="/settings">⚙ Settings</Link></aside><form onSubmit={save}><label>Display name<input name="displayName" defaultValue={account.displayName}/></label><label>Profile photo<input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>setAccount(a=>a?{...a,avatar:String(reader.result)}:a);reader.readAsDataURL(file)}}/></label><button className="m-primary" type="submit">{saved?"✓ Profile saved":"Save profile"}</button>{saved&&<p role="status" className="listener-settings-saved">Your profile has been saved.</p>}<section className="listener-subscription-card"><div className="listener-subscription-head"><div><p className="page-kicker">SUBSCRIPTION</p><h2>{sub.plan==="free"?"MOCIFY Free":"MOCIFY Premium"}</h2></div><span className="listener-plan-badge">{sub.plan==="free"?"FREE":"ACTIVE"}</span></div>{sub.plan==="free"?<div className="listener-subscription-grid"><div><span>Member since</span><strong>{date(account.registeredAt)}</strong></div><div><span>Billing</span><strong>No recurring payment</strong></div></div>:<><div className="listener-subscription-grid"><div><span>Started</span><strong>{date(sub.startedAt)}</strong></div><div><span>Next billing period</span><strong>{date(sub.renewsAt)}</strong></div></div><div className="listener-subscription-footer">{sub.cancelAtPeriodEnd?<p>Ends at the close of the current billing period.</p>:<button className="m-secondary" type="button" onClick={cancelSubscription}>Cancel subscription</button>}</div></>}</section><button className="m-secondary" type="button" onClick={()=>{clearListenerSession();router.push("/")}}>Sign out</button></form></div></section></Shell>;
}