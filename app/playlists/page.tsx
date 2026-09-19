"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {Shell,ReleaseCard} from "../components";
import {countryPlaylists,genrePlaylists,releases} from "../data";

export default function PlaylistsPage(){
 const[selected,setSelected]=useState("INT");
 const playlist=countryPlaylists.find(p=>p.code===selected)??countryPlaylists[0];
 const tracks=useMemo(()=>playlist.releaseIds.map(id=>releases.find(r=>r.id===id)).filter(Boolean),[playlist]);
 return <Shell active="playlists">
  <section className="playlist-page page-wrap">
   <div className="playlist-hero">
    <div><p className="page-kicker">MOCIFY PLAYLISTS</p><h1>Music from <span>everywhere.</span></h1><p>Start with the international playlist or choose a country. MOCIFY playlists bring together AI music by country, scene and genre.</p></div>
    <label className="playlist-country-picker"><small>SELECT COUNTRY</small><select value={selected} onChange={e=>setSelected(e.target.value)}>{countryPlaylists.map(p=><option value={p.code} key={p.code}>{p.flag} {p.country}</option>)}</select></label>
   </div>
   <div className="playlist-heading"><div><p className="page-kicker">{playlist.flag} {playlist.country}</p><h2>{playlist.title}</h2><p>{playlist.subtitle}</p></div><button className="m-primary" type="button">▶ Play playlist</button></div>
   <div className="release-grid playlist-track-grid">{tracks.map((r,i)=><ReleaseCard key={r!.id} r={r!} index={i}/>)}</div>
   <section className="playlist-section"><div className="home-heading"><div><p className="page-kicker">BY COUNTRY</p><h2>Choose a country</h2></div></div><div className="playlist-country-grid">{countryPlaylists.map(p=><button type="button" key={p.code} className={selected===p.code?"active":""} onClick={()=>setSelected(p.code)}><span>{p.flag}</span><div><b>{p.country}</b><small>{p.subtitle}</small></div></button>)}</div></section>
   <section className="playlist-section"><div className="home-heading"><div><p className="page-kicker">BY GENRE</p><h2>Explore by genre</h2></div></div><div className="playlist-genre-grid">{genrePlaylists.map((p,i)=><article key={p.slug}><span>{String(i+1).padStart(2,"0")}</span><div><b>{p.title}</b><small>{p.subtitle}</small></div><Link href={"/explore?genre="+encodeURIComponent(p.slug)}>Explore →</Link></article>)}</div></section>
  </section>
 </Shell>
}