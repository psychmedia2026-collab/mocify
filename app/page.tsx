"use client";

import Image from "next/image";
import hero from "../public/mocify-hero.webp";
import { artists, countryPlaylists, genrePlaylists, releases } from "./data";
import Link from "next/link";
import {Shell,ReleaseCard} from "./components";
import {useLanguage} from "./i18n/language-provider";
import {useEffect,useState} from "react";
import {hydratedPublishedReleases} from "./listener-account";

const featureIcons=["✦","♫","♢","◎"];
const playlistHomeCopy={en:["Playlists around the world","View all"],nl:["Playlists van over de hele wereld","Alles bekijken"],ro:["Playlisturi din întreaga lume","Vezi toate"],de:["Playlists aus aller Welt","Alle ansehen"],fr:["Playlists du monde entier","Tout voir"],es:["Playlists de todo el mundo","Ver todo"],it:["Playlist da tutto il mondo","Vedi tutte"],pt:["Playlists de todo o mundo","Ver todas"],pl:["Playlisty z całego świata","Zobacz wszystkie"],tr:["Dünyadan çalma listeleri","Tümünü gör"],id:["Playlist dari seluruh dunia","Lihat semua"],ja:["世界のプレイリスト","すべて見る"],ko:["전 세계 플레이리스트","모두 보기"],hi:["दुनिया भर की प्लेलिस्ट","सभी देखें"]} as const;

export default function Home(){
  const {dictionary,locale}=useLanguage(); const t=dictionary.pages.home; const playlistUi=playlistHomeCopy[locale]??playlistHomeCopy.en; const[catalog,setCatalog]=useState(()=>[...releases] as any[]);useEffect(()=>{const sync=()=>{void hydratedPublishedReleases().then(p=>setCatalog([...p,...releases]))};sync();addEventListener("mocify-library-change",sync);return()=>removeEventListener("mocify-library-change",sync)},[]);
  return <Shell active="home">
    <section className="home-hero page-wrap"><div className="home-copy"><h1>{t.heroLine1}<br/><span>{t.heroLine2}<br/>{t.heroLine3}</span></h1><p>{t.intro}</p><div className="home-actions"><Link className="m-primary hero-cta" href="/explore">{t.start} <b>→</b></Link></div></div>
      <div className="hero-portrait"><div className="hero-glow"/><Image className="hero-photo" src={hero} unoptimized preload alt={t.heroAlt}/></div>
      <div className="feature-strip hero-feature-strip" aria-label={t.highlights}>{t.features.map(([title,text],i)=><div className="feature-item" key={title}><span className="feature-icon" aria-hidden="true">{featureIcons[i]}</span><div><b>{title}</b><p>{text}</p></div></div>)}</div>
    </section>
    <section className="home-section page-wrap"><div className="home-heading"><div><p className="page-kicker">{t.discover}</p><h2>{t.trending}</h2></div><Link href="/explore">{t.viewAll} →</Link></div><div className="release-grid home-release-grid">{catalog.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div></section>
    <section className="home-section page-wrap"><div className="home-heading"><div><p className="page-kicker">MOCIFY PLAYLISTS</p><h2>{playlistUi[0]}</h2></div><Link href="/playlists">{playlistUi[1]} →</Link></div><div className="playlist-home-grid">{countryPlaylists.slice(0,4).map((p,i)=><Link href={"/playlists/"+p.code.toLowerCase()+"/top40"} className="playlist-home-card" key={p.code}><span className="playlist-home-number">{String(i+1).padStart(2,"0")}</span><strong>{p.flag}</strong><div><b>{p.title}</b><small>{p.subtitle}</small></div></Link>)}</div><div className="playlist-home-genres">{genrePlaylists.slice(0,4).map(p=><Link href={"/playlists/int/"+p.slug} key={p.slug}>{p.title}</Link>)}</div></section>
    <section className="home-section page-wrap"><div className="home-heading"><div><p className="page-kicker">{t.popular}</p><h2>{t.popularArtists}</h2></div><Link href="/artists">{t.viewAll} →</Link></div><div className="artist-row">{artists.map(({name,initials,avatarCss,href})=><Link href={href} className="artist-mini" key={name}><span className="artist-avatar" style={{background:avatarCss}}>{initials}</span><b>{name}</b></Link>)}</div></section>
  </Shell>
}
