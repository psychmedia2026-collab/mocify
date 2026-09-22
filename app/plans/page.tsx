"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Shell} from "../components";
import SectionHero from "../section-hero";
import {useLanguage} from "../i18n/language-provider";
import {readListenerSession} from "../listener-account";

const rows=[
 ["Play music",true,true,true],
 ["MOCIFY Radio",true,true,true],
 ["Explore & Charts",true,true,true],
 ["Public playlists",true,true,true],
 ["Search & discover artists",true,true,true],
 ["Listening with ads",true,true,false],
 ["Like & save tracks",false,true,true],
 ["Follow artists",false,true,true],
 ["Create your own playlists",false,true,true],
 ["Add tracks to playlists",false,true,true],
 ["Personal Library",false,true,true],
 ["Listening history",false,true,true],
 ["Save preferences & settings",false,true,true],
 ["Ad-free listening",false,false,true],
] as const;

export default function PlansPage(){
 const {dictionary}=useLanguage();const [signedIn,setSignedIn]=useState(false);
 useEffect(()=>{setSignedIn(Boolean(readListenerSession()))},[]);
 const mark=(v:boolean)=><span className={v?"plan-yes":"plan-no"} aria-label={v?"Included":"Not included"}>{v?"✓":"—"}</span>;
 return <Shell active="plans">
  <div className="page-wrap mockup-page-top"><SectionHero theme="premium" {...dictionary.heroes.premium} href="#listener-plans"/></div>
  <section id="listener-plans" className="page-wrap mockup-section listener-pricing scroll-mt-24">
   <div className="mockup-heading listener-pricing-heading"><div><p className="page-kicker">MOCIFY PLANS</p><h2>Choose how you listen</h2><p>{signedIn?"Upgrade your existing account without losing your profile, playlists, likes or settings.":"Listen instantly as a guest, create a free account, or go ad-free with Premium."}</p></div></div>
   <div className="listener-plan-grid listener-plan-grid-three">
    <article className="listener-plan-card"><h3>Guest</h3><div className="listener-plan-price"><strong>€0</strong><span>no account</span></div><p className="listener-plan-copy">Start listening immediately. Discover MOCIFY without registering.</p><ul><li><span>✓</span>Play music, Radio, Explore & Charts</li><li><span>✓</span>Public playlists and artist discovery</li><li><span>✓</span>Music with ads</li><li><span>—</span>No personal Library or saved activity</li></ul><Link className="listener-plan-cta" href="/explore">Start listening</Link></article>
    <article className="listener-plan-card"><h3>MOCIFY Free</h3><div className="listener-plan-price"><strong>€0</strong><span>free account</span></div><p className="listener-plan-copy">Save your MOCIFY experience and keep your music organized.</p><ul><li><span>✓</span>Everything available to Guests</li><li><span>✓</span>Likes, follows and personal playlists</li><li><span>✓</span>Library, history and saved preferences</li><li><span>✓</span>Music with ads</li></ul>{signedIn?<span className="listener-plan-cta listener-plan-current">Your current Free option</span>:<Link className="listener-plan-cta" href="/signup">Create Free account</Link>}</article>
    <article className="listener-plan-card featured"><span className="listener-plan-badge">PREMIUM</span><h3>MOCIFY Premium</h3><div className="listener-plan-price"><strong>Monthly</strong><span>subscription</span></div><p className="listener-plan-copy">Your personal MOCIFY experience without advertising interruptions.</p><ul><li><span>✓</span>Everything in MOCIFY Free</li><li><span>✓</span>Ad-free listening</li><li><span>✓</span>Same MOCIFY music catalog and audio</li><li><span>✓</span>Cancel anytime; Premium remains active through the paid period</li></ul><Link className="listener-plan-cta" href={signedIn?"/checkout?plan=MOCIFY%20Premium":"/signup?plan=MOCIFY%20Premium"}>{signedIn?"Continue to payment":"Get Premium"}</Link></article>
   </div>
   <p className="listener-plan-note">Premium does not use a separate higher-quality audio catalog. Available tracks use the same MOCIFY audio source across plans.</p>
  </section>
  <section className="page-wrap mockup-section plan-compare-section"><div className="mockup-heading"><div><p className="page-kicker">COMPARE</p><h2>See exactly what you get</h2><p>Personal features require a Free or Premium account. Guest and Free listening includes advertising.</p></div></div><div className="plan-compare-wrap"><table className="plan-compare"><thead><tr><th>Feature</th><th>Guest<small>No account</small></th><th>MOCIFY Free<small>Free account</small></th><th className="premium-col">Premium<small>Monthly</small></th></tr></thead><tbody>{rows.map(([label,g,f,p])=><tr key={label}><th>{label}</th><td>{mark(g)}</td><td>{mark(f)}</td><td className="premium-col">{mark(p)}</td></tr>)}</tbody></table></div></section>
 </Shell>
}