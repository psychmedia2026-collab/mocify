"use client";
import{useEffect,useMemo,useState}from"react";
import{artists}from"../data";
import Link from"next/link";
import{Shell}from"../components";
import SectionHero from"../section-hero";
import{useLanguage}from"../i18n/language-provider";
import{readPublishedReleases,type PublishedRelease}from"../listener-account";

export default function ArtistsPage(){
 const{dictionary}=useLanguage(),h=dictionary.heroes.artists,[published,setPublished]=useState<PublishedRelease[]>([]);
 useEffect(()=>{const sync=()=>setPublished(readPublishedReleases());sync();addEventListener("mocify-library-change",sync);return()=>removeEventListener("mocify-library-change",sync)},[]);
 const uploadedArtists=useMemo(()=>Array.from(new Map(published.map(r=>[r.artist,r])).values()).filter(r=>!artists.some(a=>a.name.toLowerCase()===r.artist.toLowerCase())),[published]);
 return <Shell active="artists"><div className="page-wrap mockup-page-top"><SectionHero theme="artists" {...h} href="#artist-list"/></div><section id="artist-list" className="page-wrap mockup-section scroll-mt-24"><div className="mockup-heading"><h2>{dictionary.pages.artists.popular}</h2></div><div className="mockup-artist-row">{artists.slice(0,8).map(({name,genre,initials,avatarCss,href,profileReady},i)=>{const face=<><span className="mockup-artist-avatar" style={{background:avatarCss}}><span className="mockup-avatar-face" aria-hidden="true">{initials}</span>{i<6&&<i/>}</span><b>{name}</b><small>{genre}</small>{!profileReady&&<span className="artist-availability">{dictionary.common.comingSoon}</span>}</>;return profileReady?<Link href={href} className="mockup-artist-pill" key={name}>{face}</Link>:<article id={href.split("#")[1]} className="mockup-artist-pill artist-unavailable" aria-label={`${name} ${dictionary.pages.artists.profileSoon}`} key={name}>{face}</article>})}{uploadedArtists.map(r=><Link href={`/explore?q=${encodeURIComponent(r.artist)}`} className="mockup-artist-pill" key={r.artist}><span className={"mockup-artist-avatar "+r.art}><span className="mockup-avatar-face" aria-hidden="true">{r.artist.slice(0,2).toUpperCase()}</span><i/></span><b>{r.artist}</b><small>{r.genre}</small></Link>)}</div></section></Shell>
}