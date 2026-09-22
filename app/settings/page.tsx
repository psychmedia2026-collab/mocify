"use client";
import {FormEvent,useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Shell} from "../components";
import {readListenerAccount,readListenerSession,saveListenerAccount,type ListenerAccount} from "../listener-account";

const countries=[["NL","🇳🇱 Netherlands"],["RO","🇷🇴 Romania"],["GB","🇬🇧 United Kingdom"],["US","🇺🇸 United States"],["DE","🇩🇪 Germany"],["FR","🇫🇷 France"],["ES","🇪🇸 Spain"]] as const;
const languages=[["nl","Nederlands"],["en","English"],["ro","Română"],["de","Deutsch"],["fr","Français"],["es","Español"]] as const;

export default function Settings(){
 const router=useRouter(),[account,setAccount]=useState<ListenerAccount|null>(null),[saved,setSaved]=useState(false),[autoplay,setAutoplay]=useState(true),[explicit,setExplicit]=useState(true),[emails,setEmails]=useState(true);
 useEffect(()=>{if(!readListenerSession()){router.replace("/login?next=/settings");return}setAccount(readListenerAccount())},[router]);
 if(!account)return <Shell><section className="page-wrap listener-profile"><p>Loading settings…</p></section></Shell>;
 function save(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget),next={...account!,country:String(f.get("country")),language:String(f.get("language")),radioCountry:String(f.get("radioCountry")),playlistCountry:String(f.get("playlistCountry"))};saveListenerAccount(next);setAccount(next);setSaved(true);window.setTimeout(()=>setSaved(false),2200)}
 return <Shell><section className="page-wrap listener-profile"><p className="page-kicker">ACCOUNT SETTINGS</p><h1>Settings</h1><div className="listener-profile-layout"><aside><div className="listener-avatar">⚙</div><b>Preferences</b><span>{account.email}</span><Link className="m-secondary" href="/profile">← Back to profile</Link></aside><form className="mocify-settings-form" onSubmit={save}><section className="mocify-settings-section"><div className="mocify-settings-heading"><span>01</span><div><h2>Region & language</h2><p>Choose how MOCIFY is localized for you.</p></div></div><div className="mocify-settings-fields">
  <label>Account country<select name="country" defaultValue={account.country}>{countries.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
  <label>Interface language<select name="language" defaultValue={account.language}>{languages.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
  <label>Default Radio country<select name="radioCountry" defaultValue={account.radioCountry||account.country}>{countries.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
  <label>Default playlist country<select name="playlistCountry" defaultValue={account.playlistCountry||account.country}>{countries.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
</div></section><div className="mocify-settings-columns"><section className="mocify-settings-section"><div className="mocify-settings-heading"><span>02</span><div><h2>Playback & content</h2><p>Control how music continues and what can be played.</p></div></div><fieldset className="listener-settings-group"><label><input type="checkbox" checked={autoplay} onChange={e=>setAutoplay(e.target.checked)}/> Autoplay similar music</label><label><input type="checkbox" checked={explicit} onChange={e=>setExplicit(e.target.checked)}/> Allow explicit content</label></fieldset></section><section className="mocify-settings-section"><div className="mocify-settings-heading"><span>03</span><div><h2>Notifications & privacy</h2><p>Choose which MOCIFY updates you want to receive.</p></div></div><fieldset className="listener-settings-group"><label><input type="checkbox" checked={emails} onChange={e=>setEmails(e.target.checked)}/> Product and music email updates</label><Link className="mocify-settings-account-link" href="/profile">Manage profile and subscription <span>→</span></Link></fieldset></section></div><div className="mocify-settings-save"><button className="m-primary" type="submit">{saved?"✓ Settings saved":"Save settings"}</button>{saved&&<p role="status" className="listener-settings-saved">Your settings have been saved.</p>}</div>
 </form></div></section></Shell>
}