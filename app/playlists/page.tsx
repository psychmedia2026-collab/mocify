"use client";
import {useMemo,useRef,useState} from "react";
import {Shell} from "../components";
import {countryGenreMap,countryPlaylists,genrePlaylists,regionalGenres,releases} from "../data";
import {useListenerPlayer} from "../listener-player";

const top40Ids=["toca-bonbon","bella-ciao","fara-mine","money-money","kill-the-beat","digital-touch","after-you","zero-gravity","afterlight"];
function getTracks(ids:readonly string[]){return ids.map(id=>releases.find(r=>r.id===id)).filter((r):r is (typeof releases)[number]=>Boolean(r));}
export default function PlaylistsPage(){
 const[selectedCountry,setSelectedCountry]=useState("INT");
 const boardRef=useRef<HTMLDivElement>(null);
 const player=useListenerPlayer();
 const country=countryPlaylists.find(p=>p.code===selectedCountry)??countryPlaylists[0];
 const allGenres=useMemo(()=>[...genrePlaylists,...Object.values(regionalGenres).flat()],[ ]);
 const playlistColumns=useMemo(()=>{
  const wanted=countryGenreMap[selectedCountry]??countryGenreMap.INT;
  const selectedGenres=wanted.map(slug=>allGenres.find(g=>g.slug===slug)).filter((g):g is NonNullable<typeof g>=>Boolean(g));
  return [{slug:"top40",title:selectedCountry==="INT"?"MOCIFY Top 40":selectedCountry==="GB"?"UK Top 40":country.country+" Top 40",kicker:selectedCountry==="INT"?"INTERNATIONAL":"COUNTRY CHART",releaseIds:selectedCountry==="INT"?top40Ids:country.releaseIds},...selectedGenres.map(g=>({...g,kicker:"GENRE"}))];
 },[selectedCountry,country,allGenres]);
 function playable(ids:readonly string[]){return getTracks(ids).filter(track=>"audioSrc" in track&&Boolean(track.audioSrc));}
 function playList(ids:readonly string[]){const tracks=playable(ids);if(tracks[0])player.selectTrack(tracks[0],tracks,true);}
 function playTrack(id:string,ids:readonly string[]){const tracks=playable(ids);const track=tracks.find(r=>r.id===id);if(track)player.selectTrack(track,tracks,true);}
 function scrollBoard(direction:number){boardRef.current?.scrollBy({left:direction*346,behavior:"smooth"});}
 return <Shell active="playlists">
  <section className="playlist-page page-wrap">
   <header className="playlist-page-intro"><div><p className="page-kicker">MOCIFY PLAYLISTS</p><h1>Charts & <span>genres.</span></h1><p>Choose a country to see its chart, major genres and music styles that belong to that country's own scene.</p></div>
    <label className="playlist-country-select"><small>SELECT COUNTRY</small><select value={selectedCountry} onChange={e=>setSelectedCountry(e.target.value)}>{countryPlaylists.map(p=><option key={p.code} value={p.code}>{p.flag} {p.country}</option>)}</select></label>
   </header>
   <div className="playlist-board-tools"><span>{country.flag} {selectedCountry==="INT"?"International":country.country} · {playlistColumns.length} playlists</span><div><button type="button" onClick={()=>scrollBoard(-1)} aria-label="Scroll playlists left">←</button><button type="button" onClick={()=>scrollBoard(1)} aria-label="Scroll playlists right">→</button></div></div>
   <div className="playlist-board" ref={boardRef} aria-label="MOCIFY playlists">
    {playlistColumns.map(column=><section className="playlist-column" id={column.slug} key={column.slug}>
      <header><div><small>{column.kicker}</small><h2>{column.title}</h2></div><button type="button" onClick={()=>playList(column.releaseIds)} aria-label={"Play "+column.title}>▶</button></header>
      <div className="playlist-song-list">{getTracks(column.releaseIds).map((track,index)=><button type="button" className="playlist-song" key={track.id} onClick={()=>playTrack(track.id,column.releaseIds)} aria-label={"Play "+track.title+" by "+track.artist}>
       <span className="playlist-rank">{index+1}</span><span className={"playlist-song-cover "+track.art} aria-hidden="true"/><span className="playlist-song-copy"><b>{track.title}</b><span>{track.artist}</span></span><span className="playlist-row-play">▶</span>
      </button>)}</div>
    </section>)}
   </div>
  </section>
 </Shell>
}