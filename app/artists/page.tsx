"use client";
import{useEffect,useMemo,useState}from"react";
import{artists}from"../data";
import Link from"next/link";
import{Shell}from"../components";
import SectionHero from"../section-hero";
import{useLanguage}from"../i18n/language-provider";
import{readPublicPublishedReleases,type PublishedRelease}from"../listener-account";
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export default function ArtistsPage(){
 const{dictionary}=useLanguage(),h=dictionary.heroes.artists,[published,setPublished]=useState<PublishedRelease[]>([]),[search,setSearch]=useState("");
 useEffect(()=>{const sync=()=>setPublished(readPublicPublishedReleases());sync();addEventListener("mocify-library-change",sync);return()=>removeEventListener("mocify-library-change",sync)},[]);
 const uploadedArtists=useMemo(()=>Array.from(new Map(published.map(r=>[r.artist,r])).values()).filter(r=>!artists.some(a=>a.name.toLowerCase()===r.artist.toLowerCase())),[published]);const q=search.trim().toLocaleLowerCase(),visibleArtists=q?artists.filter(a=>`${a.name} ${a.genre}`.toLocaleLowerCase().includes(q)):artists,visibleUploaded=q?uploadedArtists.filter(r=>`${r.artist} ${r.genre}`.toLocaleLowerCase().includes(q)):uploadedArtists;
 return <Shell active="artists"><div className="page-wrap mockup-page-top"><SectionHero theme="artists" {...h} href="#artist-list"/></div><div className="page-wrap"><div className="subpage-search-row"><div className="section-local-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={dictionary.common.searchPlaceholder} aria-label={dictionary.common.searchMocify}/>{search&&<button type="button" onClick={()=>setSearch("")} aria-label={dictionary.common.search}>×</button>}</div></div></div><section id="artist-list" className="page-wrap mockup-section scroll-mt-24"><div className="mockup-heading"><h2>{dictionary.pages.artists.popular}</h2></div><div className="mockup-artist-row">{visibleArtists.slice(0,8).map(({name,genre,initials,avatarCss,href},i)=>{const face=<><span className="mockup-artist-avatar" style={{background:avatarCss}}><span className="mockup-avatar-face" aria-hidden="true">{initials}</span>{i<6&&<i/>}</span><b>{name}</b><small>{genre}</small></>;return <Link href={href} className="mockup-artist-pill" key={name}>{face}</Link>})}{visibleUploaded.map(r=><Link href={`/artist/${slugify(r.artist)}`} className="mockup-artist-pill" key={r.artist}><span className={"mockup-artist-avatar "+r.art}><span className="mockup-avatar-face" aria-hidden="true">{r.artist.slice(0,2).toUpperCase()}</span><i/></span><b>{r.artist}</b><small>{r.genre}</small></Link>)}</div></section></Shell>
}