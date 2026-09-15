"use client";

import Image from "next/image";
import hero from "../public/mocify-hero.webp";
import { artists, releases } from "./data";
import Link from "next/link";
import {Shell,ReleaseCard} from "./components";
import {useLanguage} from "./i18n/language-provider";

const featureIcons=["✦","♫","♢","◎"];

export default function Home(){
  const {dictionary}=useLanguage(); const t=dictionary.pages.home;
  return <Shell active="home">
    <section className="home-hero page-wrap"><div className="home-copy"><h1>AI MUSIC.<br/><span>INFINITE<br/>POSSIBILITIES.</span></h1><p>{t.intro}</p><div className="home-actions"><Link className="m-primary hero-cta" href="/explore">{t.start} <b>→</b></Link></div></div>
      <div className="hero-portrait"><div className="hero-glow"/><Image className="hero-photo" src={hero} unoptimized preload alt="Woman wearing futuristic neon headphones"/></div>
      <div className="feature-strip hero-feature-strip" aria-label="MOCIFY highlights">{t.features.map(([title,text],i)=><div className="feature-item" key={title}><span className="feature-icon" aria-hidden="true">{featureIcons[i]}</span><div><b>{title}</b><p>{text}</p></div></div>)}</div>
    </section>
    <section className="home-section page-wrap"><div className="home-heading"><div><p className="page-kicker">{t.discover}</p><h2>{t.trending}</h2></div><Link href="/explore">{t.viewAll} →</Link></div><div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div></section>
    <section className="home-section page-wrap"><div className="home-heading"><div><p className="page-kicker">{t.popular}</p><h2>{t.popularArtists}</h2></div><Link href="/artists">{t.viewAll} →</Link></div><div className="artist-row">{artists.map(({name,initials,avatarCss,href,profileReady})=>profileReady?<Link href={href} className="artist-mini" key={name}><span className="artist-avatar" style={{background:avatarCss}}>{initials}</span><b>{name}</b></Link>:<div className="artist-mini artist-mini-unavailable" aria-label={`${name} ${dictionary.pages.artists.profileSoon}`} key={name}><span className="artist-avatar" style={{background:avatarCss}}>{initials}</span><b>{name}</b><small>{dictionary.common.comingSoon}</small></div>)}</div></section>
  </Shell>
}
