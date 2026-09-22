"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Shell} from "../components";
import SectionHero from "../section-hero";
import {useLanguage} from "../i18n/language-provider";
import {readListenerSession} from "../listener-account";
const benefitIcons=["♕","◇","⇩","♔"];
export default function PremiumPage(){
 const {dictionary}=useLanguage();const t=dictionary.pages.premium;const [signedIn,setSignedIn]=useState(false);
 useEffect(()=>{setSignedIn(Boolean(readListenerSession()))},[]);
 return <Shell active="premium"><div className="page-wrap mockup-page-top"><SectionHero theme="premium" {...dictionary.heroes.premium} href="#listener-plans"/></div><section id="premium-benefits" className="page-wrap mockup-section scroll-mt-24"><div className="mockup-heading"><h2>{t.benefitsTitle}</h2></div><div className="mockup-benefits">{t.benefits.map(([title,text],i)=><article className="mockup-benefit" key={title}><span aria-hidden="true">{benefitIcons[i]}</span><div><b>{title}</b><p>{text}</p></div></article>)}</div></section><section id="listener-plans" className="page-wrap mockup-section listener-pricing scroll-mt-24"><div className="mockup-heading listener-pricing-heading"><div><h2>{t.choose}</h2><p>{signedIn?"Choose Premium for your existing MOCIFY account. Your profile, playlists, likes and settings stay with you.":t.subtitle}</p></div></div><div className="listener-plan-grid">{t.plans.map((plan,i)=>({plan,i})).filter(({i})=>!signedIn||i!==0).map(({plan,i})=><article className={`listener-plan-card${i===1?" featured":""}`} key={plan.name}>{i===1&&<span className="listener-plan-badge">{t.popular}</span>}<h3>{plan.name}</h3><div className="listener-plan-price"><strong>{plan.price}</strong><span>{plan.period}</span></div><p className="listener-plan-copy">{plan.text}</p><ul>{plan.features.map(feature=><li key={feature}><span>✓</span>{feature}</li>)}</ul>{signedIn?<Link className="listener-plan-cta" href={`/checkout?plan=${encodeURIComponent(plan.name)}`}>{i===0?"Current / Free plan":"Continue to payment"}</Link>:<Link className="listener-plan-cta" href="/signup">{plan.cta}</Link>}</article>)}</div><p className="listener-plan-note">{signedIn?"You stay signed in. No new listener account is created.":t.note}</p></section></Shell>
}