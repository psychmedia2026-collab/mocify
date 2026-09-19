"use client";
import {useMemo,useState} from "react";
import {Shell} from "../components";
import {countryPlaylists,genrePlaylists,releases} from "../data";

const top40Ids=["toca-bonbon","bella-ciao","fara-mine","money-money","kill-the-beat","digital-touch","after-you","zero-gravity","afterlight"];
function getTracks(ids:readonly string[]){return ids.map(id=>releases.find(r=>r.id===id)).filter((r):r is (typeof releases)[number]=>Boolean(r));}
export default function PlaylistsPage(){
 const[selectedCountry,setSelectedCountry]=useState("INT");
 const country=countryPlaylists.find(p=>p.code===selectedCountry)??countryPlaylists[0];
 const playlistColumns=useMemo(()=>[
  {slug:"top40",title:selectedCountry==="INT"?"MOCIFY Top 40":country.country+" Top 40",kicker:selectedCountry==="INT"?"INTERNATIONAL":"COUNTRY CHART",releaseIds:selectedCountry==="INT"?top40Ids:country.releaseIds},
  ...genrePlaylists.map(p=>({...p,kicker:"GENRE"})),
 ],[selectedCountry,country]);
 return <Shell active="playlists">
  <section className="playlist-page page-wrap">
   <header className="playlist-page-intro"><div><p className="page-kicker">MOCIFY PLAYLISTS</p><h1>Charts & <span>genres.</span></h1><p>Browse the Top 40 and genre playlists. Choose International or select a country to view its chart.</p></div>
    <label className="playlist-country-select"><small>SELECT COUNTRY</small><select value={selectedCountry} onChange={e=>setSelectedCountry(e.target.value)}>{countryPlaylists.map(p=><option key={p.code} value={p.code}>{p.flag} {p.country}</option>)}</select></label>
   </header>
   <div className="playlist-board" aria-label="MOCIFY playlists">
    {playlistColumns.map(column=><section className="playlist-column" id={column.slug} key={column.slug}>
      <header><div><small>{column.kicker}</small><h2>{column.title}</h2></div><button type="button" aria-label={"Play "+column.title}>▶</button></header>
      <div className="playlist-song-list">{getTracks(column.releaseIds).map((track,index)=><article className="playlist-song" key={track.id}>
       <span className="playlist-rank">{index+1}</span><div className={"playlist-song-cover "+track.art} aria-hidden="true"/><div className="playlist-song-copy"><b>{track.title}</b><span>{track.artist}</span></div>
      </article>)}</div>
    </section>)}
   </div>
  </section>
 </Shell>
}