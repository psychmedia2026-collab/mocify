"use client";
import Link from "next/link";
import {useMemo,useRef,useState} from "react";
import {Shell} from "../components";
import {countryGenreMap,countryPlaylists,genrePlaylists,regionalGenres,releases} from "../data";
import {useListenerPlayer} from "../listener-player";

const top40Ids=["toca-bonbon","bella-ciao","fara-mine","money-money","kill-the-beat","digital-touch","after-you","zero-gravity","afterlight"];
function getTracks(ids:readonly string[]){return ids.map(id=>releases.find(r=>r.id===id)).filter((r):r is (typeof releases)[number]=>Boolean(r));}
function titleForCountry(code:string,name:string){if(code==="INT")return"MOCIFY Top 40";if(code==="GB")return"UK Top 40";if(code==="US")return"US Top 40";return name+" Top 40";}
export default function PlaylistsPage(){
 const[selectedCountry,setSelectedCountry]=useState("INT"),[query,setQuery]=useState("");
 const boardRef=useRef<HTMLDivElement>(null),player=useListenerPlayer();
 const country=countryPlaylists.find(p=>p.code===selectedCountry)??countryPlaylists[0];
 const allGenres=useMemo(()=>[...genrePlaylists,...Object.values(regionalGenres).flat()],[]);
 const playlistColumns=useMemo(()=>{const wanted=countryGenreMap[selectedCountry]??countryGenreMap.INT;const selectedGenres=wanted.map(slug=>allGenres.find(g=>g.slug===slug)).filter((g):g is NonNullable<typeof g>=>Boolean(g));return[{slug:"top40",title:titleForCountry(selectedCountry,country.country),subtitle:country.subtitle,kicker:selectedCountry==="INT"?"INTERNATIONAL":"COUNTRY CHART",releaseIds:selectedCountry==="INT"?top40Ids:country.releaseIds},...selectedGenres.map(g=>({...g,kicker:"GENRE"}))]},[selectedCountry,country,allGenres]);
 const filtered=playlistColumns.filter(p=>!query.trim()||p.title.toLowerCase().includes(query.toLowerCase())||p.subtitle.toLowerCase().includes(query.toLowerCase()));
 const playable=(ids:readonly string[])=>getTracks(ids).filter(track=>"audioSrc"in track&&Boolean(track.audioSrc));
 const playList=(ids:readonly string[],shuffle=false)=>{let tracks=playable(ids);if(shuffle)tracks=[...tracks].sort(()=>Math.random()-.5);if(tracks[0])player.selectTrack(tracks[0],tracks,true)};
 const playTrack=(id:string,ids:readonly string[])=>{const tracks=playable(ids),track=tracks.find(r=>r.id===id);if(track)player.selectTrack(track,tracks,true)};
 return <Shell active="playlists"><section className="playlist-page page-wrap">
  <header className="playlist-page-intro"><div><p className="page-kicker">MOCIFY PLAYLISTS</p><h1>Charts & <span>genres.</span></h1><p>Choose a country for its chart, major genres and local music styles.</p></div><label className="playlist-country-select"><small>SELECT COUNTRY</small><select value={selectedCountry} onChange={e=>setSelectedCountry(e.target.value)}>{countryPlaylists.map(p=><option key={p.code} value={p.code}>{p.flag} {p.country}</option>)}</select></label></header>
  <div className="playlist-filterbar"><div className="playlist-filter-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search playlists, genres or styles..." aria-label="Search playlists"/><Link className="personal-playlists-button" href="/library#personal-playlists">Personal playlists</Link></div><span>{country.flag} {country.country} · {filtered.length} playlists</span></div>
  <div className="playlist-board-tools"><span>Browse playlists</span><div><button onClick={()=>boardRef.current?.scrollBy({left:-346,behavior:"smooth"})}>←</button><button onClick={()=>boardRef.current?.scrollBy({left:346,behavior:"smooth"})}>→</button></div></div>
  <div className="playlist-board" ref={boardRef}>{filtered.map(column=><section className="playlist-column" key={column.slug}><header><Link href={"/playlists/"+selectedCountry.toLowerCase()+"/"+column.slug}><small>{column.kicker}</small><h2>{column.title}</h2></Link><button onClick={()=>playList(column.releaseIds)} aria-label={"Play "+column.title}>▶</button></header><div className="playlist-song-list">{getTracks(column.releaseIds).length?getTracks(column.releaseIds).map((track,index)=><button className="playlist-song" key={track.id} onClick={()=>playTrack(track.id,column.releaseIds)}><span className="playlist-rank">{index+1}</span><span className={"playlist-song-cover "+track.art}/><span className="playlist-song-copy"><b>{track.title}</b><span>{track.artist}</span></span><span className="playlist-row-play">▶</span></button>):<div className="playlist-empty">No releases yet.<small>This playlist will fill as matching music is released.</small></div>}</div><Link className="playlist-open" href={"/playlists/"+selectedCountry.toLowerCase()+"/"+column.slug}>Open playlist →</Link></section>)}</div>
  {filtered.length===0&&<div className="playlist-no-results">No playlists match “{query}”.</div>}
 </section></Shell>
}